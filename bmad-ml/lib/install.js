const fs = require("fs");
const path = require("path");

const SKIP_PATTERNS = new Set([".DS_Store", "Thumbs.db", "desktop.ini"]);
const SKIP_SUFFIXES = ["~", ".swp", ".swo", ".bak"];

function shouldSkipName(name) {
  if (SKIP_PATTERNS.has(name)) {
    return true;
  }

  if (name.startsWith(".") && name !== ".gitkeep") {
    return true;
  }

  return SKIP_SUFFIXES.some((suffix) => name.endsWith(suffix));
}

function listSkillDirectories(skillsRoot) {
  if (!fs.existsSync(skillsRoot) || !fs.statSync(skillsRoot).isDirectory()) {
    throw new Error(`Skills source not found: ${skillsRoot}`);
  }

  const result = [];

  function walk(dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    let hasSkillMd = false;
    for (const entry of entries) {
      if (entry.isFile() && entry.name === "SKILL.md") {
        hasSkillMd = true;
        break;
      }
    }

    if (hasSkillMd) {
      result.push({
        name: path.basename(dirPath),
        dir: dirPath,
      });
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }
      if (shouldSkipName(entry.name)) {
        continue;
      }
      walk(path.join(dirPath, entry.name));
    }
  }

  walk(skillsRoot);
  result.sort((a, b) => a.name.localeCompare(b.name));

  if (result.length === 0) {
    throw new Error(`No skills found in: ${skillsRoot}`);
  }

  return result;
}

function copySkillDirectory(sourceDir, targetDir) {
  let copiedFiles = 0;

  function walkAndCopy(srcCurrent, dstCurrent) {
    fs.mkdirSync(dstCurrent, { recursive: true });
    const entries = fs.readdirSync(srcCurrent, { withFileTypes: true });

    for (const entry of entries) {
      if (shouldSkipName(entry.name)) {
        continue;
      }

      const srcPath = path.join(srcCurrent, entry.name);
      const dstPath = path.join(dstCurrent, entry.name);

      if (entry.isDirectory()) {
        walkAndCopy(srcPath, dstPath);
        continue;
      }

      if (!entry.isFile()) {
        continue;
      }

      fs.mkdirSync(path.dirname(dstPath), { recursive: true });
      fs.copyFileSync(srcPath, dstPath);
      copiedFiles += 1;
    }
  }

  walkAndCopy(sourceDir, targetDir);
  return copiedFiles;
}

function installSkills({ sourceRoot, targetRoot, force = false, dryRun = false }) {
  const skills = listSkillDirectories(sourceRoot);

  if (!dryRun) {
    fs.mkdirSync(targetRoot, { recursive: true });
  }

  const installed = [];
  const skipped = [];
  let filesCopied = 0;

  for (const skill of skills) {
    const destination = path.join(targetRoot, skill.name);
    const exists = fs.existsSync(destination);

    if (exists && !force) {
      skipped.push(skill.name);
      continue;
    }

    installed.push(skill.name);

    if (dryRun) {
      continue;
    }

    if (exists) {
      fs.rmSync(destination, { recursive: true, force: true });
    }

    filesCopied += copySkillDirectory(skill.dir, destination);
  }

  return {
    targetDir: targetRoot,
    installedCount: installed.length,
    skippedCount: skipped.length,
    filesCopied,
    installed,
    skipped,
  };
}

function installAgents({ sourceRoot, targetRoot, force = false, dryRun = false }) {
  if (!fs.existsSync(sourceRoot) || !fs.statSync(sourceRoot).isDirectory()) {
    throw new Error(`Agent source not found: ${sourceRoot}`);
  }

  const entries = fs
    .readdirSync(sourceRoot, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".md"))
    .sort((a, b) => a.name.localeCompare(b.name));

  if (!dryRun) {
    fs.mkdirSync(targetRoot, { recursive: true });
  }

  const installed = [];
  const skipped = [];

  for (const entry of entries) {
    const src = path.join(sourceRoot, entry.name);
    const dst = path.join(targetRoot, entry.name);
    const exists = fs.existsSync(dst);

    if (exists && !force) {
      skipped.push(entry.name);
      continue;
    }

    installed.push(entry.name);

    if (dryRun) {
      continue;
    }

    fs.copyFileSync(src, dst);
  }

  return {
    targetDir: targetRoot,
    installedCount: installed.length,
    skippedCount: skipped.length,
    installed,
    skipped,
  };
}

module.exports = {
  installSkills,
  installAgents,
};


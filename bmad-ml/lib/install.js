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

function listFilesRecursive(rootDir) {
  if (!fs.existsSync(rootDir) || !fs.statSync(rootDir).isDirectory()) {
    throw new Error(`Source directory not found: ${rootDir}`);
  }

  const results = [];

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (shouldSkipName(entry.name)) {
        continue;
      }

      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (entry.isFile()) {
        results.push(fullPath);
      }
    }
  }

  walk(rootDir);
  return results;
}

function installDirectory({ sourceRoot, targetRoot, force = false, dryRun = false }) {
  const files = listFilesRecursive(sourceRoot);
  const installed = [];
  const skipped = [];

  if (!dryRun) {
    fs.mkdirSync(targetRoot, { recursive: true });
  }

  for (const srcFile of files) {
    const relativePath = path.relative(sourceRoot, srcFile);
    const dstFile = path.join(targetRoot, relativePath);
    const exists = fs.existsSync(dstFile);

    if (exists && !force) {
      skipped.push(relativePath);
      continue;
    }

    installed.push(relativePath);

    if (dryRun) {
      continue;
    }

    fs.mkdirSync(path.dirname(dstFile), { recursive: true });
    fs.copyFileSync(srcFile, dstFile);
  }

  return {
    targetDir: targetRoot,
    installedCount: installed.length,
    skippedCount: skipped.length,
    installed,
    skipped,
  };
}

function installFile({ sourceFile, targetFile, force = false, dryRun = false }) {
  if (!fs.existsSync(sourceFile) || !fs.statSync(sourceFile).isFile()) {
    throw new Error(`Source file not found: ${sourceFile}`);
  }

  const exists = fs.existsSync(targetFile);
  if (exists && !force) {
    return {
      targetFile,
      installedCount: 0,
      skippedCount: 1,
      installed: [],
      skipped: [path.basename(targetFile)],
    };
  }

  if (!dryRun) {
    fs.mkdirSync(path.dirname(targetFile), { recursive: true });
    fs.copyFileSync(sourceFile, targetFile);
  }

  return {
    targetFile,
    installedCount: 1,
    skippedCount: 0,
    installed: [path.basename(targetFile)],
    skipped: [],
  };
}

function extractManagedBlock(content, startMarker, endMarker) {
  const start = content.indexOf(startMarker);
  const end = content.indexOf(endMarker);
  if (start === -1 || end === -1 || end < start) {
    return null;
  }
  return content.slice(start, end + endMarker.length);
}

function mergeAgentsMd({
  sourceFile,
  targetFile,
  force = false,
  dryRun = false,
  startMarker = "<!-- bmad-ml:start -->",
  endMarker = "<!-- bmad-ml:end -->",
}) {
  if (!fs.existsSync(sourceFile) || !fs.statSync(sourceFile).isFile()) {
    throw new Error(`AGENTS source not found: ${sourceFile}`);
  }

  const sourceText = fs.readFileSync(sourceFile, "utf8");
  const sourceBlock = extractManagedBlock(sourceText, startMarker, endMarker) ?? sourceText.trimEnd();

  let existing = "";
  if (fs.existsSync(targetFile)) {
    existing = fs.readFileSync(targetFile, "utf8");
  }

  let next = existing;
  let installedCount = 0;
  let skippedCount = 0;
  let action = "noop";

  const existingBlock = extractManagedBlock(existing, startMarker, endMarker);
  if (!existing) {
    next = sourceBlock.endsWith("\n") ? sourceBlock : `${sourceBlock}\n`;
    installedCount = 1;
    action = "created";
  } else if (existingBlock) {
    if (force) {
      next = existing.replace(existingBlock, sourceBlock);
      installedCount = 1;
      action = "replaced";
    } else {
      skippedCount = 1;
      action = "kept-existing";
    }
  } else {
    next = `${existing.trimEnd()}\n\n${sourceBlock}\n`;
    installedCount = 1;
    action = "appended";
  }

  if (!dryRun && installedCount > 0) {
    fs.mkdirSync(path.dirname(targetFile), { recursive: true });
    fs.writeFileSync(targetFile, next);
  }

  return {
    targetFile,
    installedCount,
    skippedCount,
    action,
  };
}

function ensurePiSettings({
  settingsPath,
  extensionName,
  force = false,
  dryRun = false,
}) {
  let parsed = {};
  if (fs.existsSync(settingsPath)) {
    try {
      parsed = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
    } catch {
      if (!force) {
        throw new Error(`Invalid JSON in settings file: ${settingsPath} (rerun with --force to replace)`);
      }
      parsed = {};
    }
  }

  const settings = parsed;
  settings.extensions = settings.extensions ?? {};
  settings.extensions.enabled = Array.isArray(settings.extensions.enabled)
    ? settings.extensions.enabled
    : [];

  const exists = settings.extensions.enabled.includes(extensionName);
  if (!exists) {
    settings.extensions.enabled.push(extensionName);
  }

  if (!dryRun && !exists) {
    fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
    fs.writeFileSync(settingsPath, `${JSON.stringify(settings, null, 2)}\n`);
  }

  return {
    targetFile: settingsPath,
    installedCount: exists ? 0 : 1,
    skippedCount: exists ? 1 : 0,
    changed: !exists,
  };
}

function mergeJsonPatch({
  targetFile,
  patchFile,
  force = false,
  dryRun = false,
}) {
  if (!fs.existsSync(patchFile) || !fs.statSync(patchFile).isFile()) {
    throw new Error(`JSON patch source not found: ${patchFile}`);
  }

  const patch = JSON.parse(fs.readFileSync(patchFile, "utf8"));
  let current = {};

  if (fs.existsSync(targetFile)) {
    try {
      current = JSON.parse(fs.readFileSync(targetFile, "utf8"));
    } catch {
      if (!force) {
        throw new Error(`Invalid JSON in target file: ${targetFile} (rerun with --force to replace)`);
      }
      current = {};
    }
  }

  const allowCurrent = current.permissions?.allow ?? [];
  const allowPatch = patch.permissions?.allow ?? [];
  const mergedAllow = Array.from(new Set([...(Array.isArray(allowCurrent) ? allowCurrent : []), ...(Array.isArray(allowPatch) ? allowPatch : [])]));

  const next = {
    ...current,
    permissions: {
      ...(current.permissions ?? {}),
      allow: mergedAllow,
    },
  };

  const changed = JSON.stringify(next) !== JSON.stringify(current);
  if (!dryRun && changed) {
    fs.mkdirSync(path.dirname(targetFile), { recursive: true });
    fs.writeFileSync(targetFile, `${JSON.stringify(next, null, 2)}\n`);
  }

  return {
    targetFile,
    installedCount: changed ? 1 : 0,
    skippedCount: changed ? 0 : 1,
    changed,
  };
}

module.exports = {
  installSkills,
  installAgents,
  installDirectory,
  installFile,
  mergeAgentsMd,
  ensurePiSettings,
  mergeJsonPatch,
};

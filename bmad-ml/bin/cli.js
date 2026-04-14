#!/usr/bin/env node

const path = require("path");
const { installSkills, installAgents } = require("../lib/install");
const {
  DOC_FLAGS,
  renderAbout,
  renderAgents,
  renderWorkflows,
  renderOpenCodeGuide,
  renderLearnMoreHint,
} = require("../lib/docs");

const IDE_FLAGS = ["--cursor", "--claude-code", "--opencode"];
const KNOWN_FLAGS = new Set([
  ...IDE_FLAGS,
  ...DOC_FLAGS,
  "--force",
  "--dry-run",
  "--help",
  "-h",
]);

function printUsage() {
  console.log(
    `Usage:\n  bmad-ml [--cursor|--claude-code|--opencode] [--force] [--dry-run]\n  bmad-ml [--about|--agents|--workflows|--opencode-guide]\n\nInstall options:\n  --cursor         Install skills to .cursor/skills/\n  --claude-code    Install skills to .claude/skills/\n  --opencode       Install skills to .opencode/skills/ and agent shims to .opencode/agents/\n  --force          Overwrite existing skill/agent directories\n  --dry-run        Preview changes without writing files\n\nDocs options:\n  --about          What BMad ML is and how it is organized\n  --agents         Agent roster by division\n  --workflows      Workflow map by phase and outputs\n  --opencode-guide OpenCode-specific install/runtime behavior\n\nOther:\n  --help           Show this help message`,
  );
}

function parseArgs(argv) {
  const rawFlags = argv.filter((arg) => arg.startsWith("-"));
  const positionalArgs = argv.filter((arg) => !arg.startsWith("-"));

  if (positionalArgs.length > 0) {
    throw new Error(`Unknown argument(s): ${positionalArgs.join(", ")}`);
  }

  const unknownFlags = rawFlags.filter((flag) => !KNOWN_FLAGS.has(flag));
  if (unknownFlags.length > 0) {
    throw new Error(`Unknown flag(s): ${unknownFlags.join(", ")}`);
  }

  const args = new Set(rawFlags);
  const hasHelp = args.has("--help") || args.has("-h");

  if (hasHelp) {
    if (rawFlags.length > 1) {
      throw new Error("--help cannot be combined with other flags");
    }
    return { mode: "help" };
  }

  const selectedInstallFlags = IDE_FLAGS.filter((flag) => args.has(flag));
  const selectedDocFlags = DOC_FLAGS.filter((flag) => args.has(flag));

  if (selectedInstallFlags.length > 1) {
    throw new Error("Select exactly one install target: --cursor, --claude-code, or --opencode");
  }

  if (selectedDocFlags.length > 1) {
    throw new Error("Select exactly one docs flag: --about, --agents, --workflows, or --opencode-guide");
  }

  if (selectedInstallFlags.length > 0 && selectedDocFlags.length > 0) {
    throw new Error("Do not mix install flags with docs flags");
  }

  if (selectedInstallFlags.length === 0 && selectedDocFlags.length === 0) {
    if (args.has("--force") || args.has("--dry-run")) {
      throw new Error("--force and --dry-run require an install target");
    }
    return { mode: "help" };
  }

  if (selectedDocFlags.length === 1) {
    if (args.has("--force") || args.has("--dry-run")) {
      throw new Error("--force and --dry-run are install-only flags");
    }
    return { mode: "docs", docFlag: selectedDocFlags[0] };
  }

  return {
    mode: "install",
    ide: selectedInstallFlags[0].slice(2),
    force: args.has("--force"),
    dryRun: args.has("--dry-run"),
  };
}

function printDocs(docFlag) {
  if (docFlag === "--about") {
    console.log(renderAbout());
  } else if (docFlag === "--agents") {
    console.log(renderAgents());
  } else if (docFlag === "--workflows") {
    console.log(renderWorkflows());
  } else if (docFlag === "--opencode-guide") {
    console.log(renderOpenCodeGuide());
  }

  console.log("");
  console.log(renderLearnMoreHint());
}

function resolvePaths(ide) {
  const packageRoot = path.resolve(__dirname, "..");
  const projectRoot = process.cwd();

  if (ide === "cursor") {
    return {
      skillsSource: path.join(packageRoot, "content", "bmad-ml-gen", "skills"),
      skillsTarget: path.join(projectRoot, ".cursor", "skills"),
    };
  }

  if (ide === "claude-code") {
    return {
      skillsSource: path.join(packageRoot, "content", "bmad-ml-gen", "skills"),
      skillsTarget: path.join(projectRoot, ".claude", "skills"),
    };
  }

  return {
    skillsSource: path.join(packageRoot, "content", "bmad-ml-oc", "skills"),
    skillsTarget: path.join(projectRoot, ".opencode", "skills"),
    agentsSource: path.join(packageRoot, "content", "bmad-ml-oc", "agents", "opencode"),
    agentsTarget: path.join(projectRoot, ".opencode", "agents"),
  };
}

function formatDryRunTag(dryRun) {
  return dryRun ? "[dry-run] " : "";
}

function printSkillSummary(result, dryRun) {
  const prefix = formatDryRunTag(dryRun);
  console.log(
    `${prefix}Skills: ${result.installedCount} installed, ${result.skippedCount} skipped -> ${result.targetDir}`,
  );

  if (result.skippedCount > 0 && !dryRun) {
    console.log("Hint: rerun with --force to overwrite existing directories.");
  }
}

function printAgentSummary(result, dryRun) {
  const prefix = formatDryRunTag(dryRun);
  console.log(
    `${prefix}Agents: ${result.installedCount} installed, ${result.skippedCount} skipped -> ${result.targetDir}`,
  );
}

function printNextSteps({ ide, paths, dryRun }) {
  console.log("");
  if (dryRun) {
    console.log("[dry-run] Preview complete. No files were written.");
    console.log("Recommended next steps after running without --dry-run:");
  } else {
    console.log("Next steps:");
  }

  console.log("1. Run `ml-setup` in your IDE to configure _bmad/config.yaml and _bmad/config.user.yaml.");
  if (ide === "cursor") {
    console.log('2. In Cursor, say: "use bmad-ml-nosh" (or "use ml-setup" first if needed).');
  } else if (ide === "claude-code") {
    console.log('2. In Claude Code, say: "load bmad-ml-nosh" (or "load ml-setup" first if needed).');
  } else {
    console.log("2. Start OpenCode in this project and press Tab to switch to Nosh.");
    console.log("3. OpenCode mode supports parallel subagent delegation via Task tool.");
    console.log("4. Use `@agent-name` to invoke a specialist directly when needed.");
  }

  console.log(`Skills location: ${paths.skillsTarget}`);
  if (ide === "opencode") {
    console.log(`Agent shims location: ${paths.agentsTarget}`);
  }

  console.log(renderLearnMoreHint());
}

function main() {
  let parsed;
  try {
    parsed = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    printUsage();
    process.exit(1);
  }

  if (parsed.mode === "help") {
    printUsage();
    return;
  }

  if (parsed.mode === "docs") {
    printDocs(parsed.docFlag);
    return;
  }

  const { ide, force, dryRun } = parsed;
  const paths = resolvePaths(ide);

  try {
    const skillResult = installSkills({
      sourceRoot: paths.skillsSource,
      targetRoot: paths.skillsTarget,
      force,
      dryRun,
    });

    printSkillSummary(skillResult, dryRun);

    if (ide === "opencode") {
      const agentResult = installAgents({
        sourceRoot: paths.agentsSource,
        targetRoot: paths.agentsTarget,
        force,
        dryRun,
      });

      printAgentSummary(agentResult, dryRun);
    }

    printNextSteps({ ide, paths, dryRun });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(2);
  }
}

main();




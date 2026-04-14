#!/usr/bin/env node

const path = require("path");
const {
  installSkills,
  installAgents,
  installDirectory,
  installFile,
  mergeAgentsMd,
  ensurePiSettings,
  mergeJsonPatch,
} = require("../lib/install");
const {
  DOC_FLAGS,
  renderAbout,
  renderAgents,
  renderWorkflows,
  renderOpenCodeGuide,
  renderPiGuide,
  renderLearnMoreHint,
} = require("../lib/docs");

const IDE_FLAGS = ["--cursor", "--claude-code", "--opencode", "--pi", "--cc-pi", "--cursor-pi"];
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
    `Usage:\n  bmad-ml [--cursor|--claude-code|--opencode|--pi|--cc-pi|--cursor-pi] [--force] [--dry-run]\n  bmad-ml [--about|--agents|--workflows|--opencode-guide|--pi-guide]\n\nInstall options:\n  --cursor         Install skills to .cursor/skills/\n  --claude-code    Install skills to .claude/skills/\n  --opencode       Install skills to .opencode/skills/ and agent shims to .opencode/agents/\n  --pi             Install pi-native assets to .pi/\n  --cc-pi          Install Claude Code orchestrator + pi subagent runtime\n  --cursor-pi      Install Cursor orchestrator rules + pi subagent runtime\n  --force          Overwrite existing installed files/directories\n  --dry-run        Preview changes without writing files\n\nDocs options:\n  --about          What BMad ML is and how it is organized\n  --agents         Agent roster by division\n  --workflows      Workflow map by phase and outputs\n  --opencode-guide OpenCode-specific install/runtime behavior\n  --pi-guide       pi / hybrid install and runtime behavior\n\nOther:\n  --help           Show this help message`,
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
    throw new Error("Select exactly one install target");
  }

  if (selectedDocFlags.length > 1) {
    throw new Error("Select exactly one docs flag");
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
  } else if (docFlag === "--pi-guide") {
    console.log(renderPiGuide());
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

  if (ide === "opencode") {
    return {
      skillsSource: path.join(packageRoot, "content", "bmad-ml-oc", "skills"),
      skillsTarget: path.join(projectRoot, ".opencode", "skills"),
      agentsSource: path.join(packageRoot, "content", "bmad-ml-oc", "agents", "opencode"),
      agentsTarget: path.join(projectRoot, ".opencode", "agents"),
    };
  }

  if (ide === "pi") {
    return {
      skillsSource: path.join(packageRoot, "content", "bmad-ml-pi", "skills"),
      skillsTarget: path.join(projectRoot, ".pi", "skills"),
      promptsSource: path.join(packageRoot, "content", "bmad-ml-pi", "prompts"),
      promptsTarget: path.join(projectRoot, ".pi", "prompts"),
      extensionSource: path.join(packageRoot, "content", "bmad-ml-pi", "extension", "dist"),
      extensionTarget: path.join(projectRoot, ".pi", "extensions", "bmad-ml"),
      agentsMdSource: path.join(packageRoot, "content", "bmad-ml-pi", "AGENTS.md"),
      agentsMdTarget: path.join(projectRoot, ".pi", "AGENTS.md"),
      agentsSource: path.join(packageRoot, "content", "bmad-ml-pi", "agents", "pi"),
      agentsTarget: path.join(projectRoot, ".pi", "agents", "bmad-ml"),
      systemSource: path.join(packageRoot, "content", "bmad-ml-pi", "SYSTEM.md"),
      systemTarget: path.join(projectRoot, ".pi", "APPEND_SYSTEM.md"),
      piSettingsTarget: path.join(projectRoot, ".pi", "settings.json"),
    };
  }

  if (ide === "cc-pi") {
    return {
      skillsSource: path.join(packageRoot, "content", "bmad-ml-pi", "skills"),
      skillsTarget: path.join(projectRoot, ".pi", "skills"),
      subagentExtensionSource: path.join(packageRoot, "content", "bmad-ml-pi", "subagent-extension", "dist"),
      subagentExtensionTarget: path.join(projectRoot, ".pi", "extensions", "bmad-ml-subagent"),
      dispatcherSource: path.join(packageRoot, "content", "bmad-ml-pi", "hybrid", "dispatch-pi.mjs"),
      dispatcherTarget: path.join(projectRoot, ".bmad-ml", "dispatch-pi.mjs"),
      dispatcherShSource: path.join(packageRoot, "content", "bmad-ml-pi", "hybrid", "dispatch-pi.sh"),
      dispatcherShTarget: path.join(projectRoot, ".bmad-ml", "dispatch-pi.sh"),
      ccSkillsSource: path.join(packageRoot, "content", "bmad-ml-pi", "hybrid", "cc", "skills"),
      ccSkillsTarget: path.join(projectRoot, ".claude", "skills"),
      ccAgentsSource: path.join(packageRoot, "content", "bmad-ml-pi", "hybrid", "cc", "agents"),
      ccAgentsTarget: path.join(projectRoot, ".claude", "agents"),
      ccSettingsPatch: path.join(packageRoot, "content", "bmad-ml-pi", "hybrid", "cc", "settings-patch.json"),
      ccSettingsTarget: path.join(projectRoot, ".claude", "settings.json"),
      piSettingsTarget: path.join(projectRoot, ".pi", "settings.json"),
    };
  }

  return {
    skillsSource: path.join(packageRoot, "content", "bmad-ml-pi", "skills"),
    skillsTarget: path.join(projectRoot, ".pi", "skills"),
    subagentExtensionSource: path.join(packageRoot, "content", "bmad-ml-pi", "subagent-extension", "dist"),
    subagentExtensionTarget: path.join(projectRoot, ".pi", "extensions", "bmad-ml-subagent"),
    dispatcherSource: path.join(packageRoot, "content", "bmad-ml-pi", "hybrid", "dispatch-pi.mjs"),
    dispatcherTarget: path.join(projectRoot, ".bmad-ml", "dispatch-pi.mjs"),
    dispatcherShSource: path.join(packageRoot, "content", "bmad-ml-pi", "hybrid", "dispatch-pi.sh"),
    dispatcherShTarget: path.join(projectRoot, ".bmad-ml", "dispatch-pi.sh"),
    cursorRulesSource: path.join(packageRoot, "content", "bmad-ml-pi", "hybrid", "cursor", "rules"),
    cursorRulesTarget: path.join(projectRoot, ".cursor", "rules"),
    piSettingsTarget: path.join(projectRoot, ".pi", "settings.json"),
  };
}

function formatDryRunTag(dryRun) {
  return dryRun ? "[dry-run] " : "";
}

function printSummary(label, result, dryRun) {
  const prefix = formatDryRunTag(dryRun);
  const target = result.targetDir || result.targetFile || "n/a";
  console.log(`${prefix}${label}: ${result.installedCount} installed, ${result.skippedCount} skipped -> ${target}`);
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
    console.log("2. In Cursor, say: \"use bmad-ml-nosh\".");
  } else if (ide === "claude-code") {
    console.log("2. In Claude Code, say: \"load bmad-ml-nosh\".");
  } else if (ide === "opencode") {
    console.log("2. Start OpenCode in this project and press Tab to switch to Nosh.");
    console.log("3. OpenCode mode supports parallel subagent delegation via Task tool.");
  } else if (ide === "pi") {
    console.log("2. Start pi in this project: `pi`.");
    console.log("3. Nosh boots from `.pi/AGENTS.md` and delegates using `bmad_task`.");
    console.log("4. Use `.pi/prompts/PI-MODELS.md` to review model bindings.");
  } else if (ide === "cc-pi") {
    console.log("2. Open Claude Code and load `bmad-ml-nosh` from `.claude/skills/`.");
    console.log("3. Nosh delegates specialists via Task shims that call `.bmad-ml/dispatch-pi.mjs`.");
  } else {
    console.log("2. Open Cursor Agent Mode.");
    console.log("3. `.cursor/rules/bmad-ml-nosh.mdc` orchestrates pi-backed specialist dispatch.");
    console.log("4. Parallel specialist work degrades to sequential in Cursor hybrid mode.");
  }

  console.log(`Skills location: ${paths.skillsTarget}`);
  if (paths.agentsTarget) {
    console.log(`Agent location: ${paths.agentsTarget}`);
  }
  if (paths.promptsTarget) {
    console.log(`Prompt templates: ${paths.promptsTarget}`);
  }
  if (paths.extensionTarget) {
    console.log(`Extension location: ${paths.extensionTarget}`);
  }
  if (paths.dispatcherTarget) {
    console.log(`Dispatcher script: ${paths.dispatcherTarget}`);
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
    printSummary("Skills", skillResult, dryRun);

    if (ide === "opencode") {
      const agentResult = installAgents({
        sourceRoot: paths.agentsSource,
        targetRoot: paths.agentsTarget,
        force,
        dryRun,
      });
      printSummary("Agents", agentResult, dryRun);
    }

    if (ide === "pi") {
      printSummary("Prompts", installDirectory({
        sourceRoot: paths.promptsSource,
        targetRoot: paths.promptsTarget,
        force,
        dryRun,
      }), dryRun);

      printSummary("Extension", installDirectory({
        sourceRoot: paths.extensionSource,
        targetRoot: paths.extensionTarget,
        force,
        dryRun,
      }), dryRun);

      printSummary("Agent refs", installDirectory({
        sourceRoot: paths.agentsSource,
        targetRoot: paths.agentsTarget,
        force,
        dryRun,
      }), dryRun);

      printSummary("AGENTS bootstrap", mergeAgentsMd({
        sourceFile: paths.agentsMdSource,
        targetFile: paths.agentsMdTarget,
        force,
        dryRun,
      }), dryRun);

      printSummary("System append", installFile({
        sourceFile: paths.systemSource,
        targetFile: paths.systemTarget,
        force,
        dryRun,
      }), dryRun);

      printSummary("pi settings", ensurePiSettings({
        settingsPath: paths.piSettingsTarget,
        extensionName: "bmad-ml",
        force,
        dryRun,
      }), dryRun);
    }

    if (ide === "cc-pi" || ide === "cursor-pi") {
      printSummary("Subagent extension", installDirectory({
        sourceRoot: paths.subagentExtensionSource,
        targetRoot: paths.subagentExtensionTarget,
        force,
        dryRun,
      }), dryRun);

      printSummary("pi settings", ensurePiSettings({
        settingsPath: paths.piSettingsTarget,
        extensionName: "bmad-ml-subagent",
        force,
        dryRun,
      }), dryRun);

      printSummary("Dispatcher", installFile({
        sourceFile: paths.dispatcherSource,
        targetFile: paths.dispatcherTarget,
        force,
        dryRun,
      }), dryRun);

      printSummary("Dispatcher shell", installFile({
        sourceFile: paths.dispatcherShSource,
        targetFile: paths.dispatcherShTarget,
        force,
        dryRun,
      }), dryRun);
    }

    if (ide === "cc-pi") {
      printSummary("Claude skills", installDirectory({
        sourceRoot: paths.ccSkillsSource,
        targetRoot: paths.ccSkillsTarget,
        force,
        dryRun,
      }), dryRun);

      printSummary("Claude agents", installDirectory({
        sourceRoot: paths.ccAgentsSource,
        targetRoot: paths.ccAgentsTarget,
        force,
        dryRun,
      }), dryRun);

      printSummary("Claude settings", mergeJsonPatch({
        patchFile: paths.ccSettingsPatch,
        targetFile: paths.ccSettingsTarget,
        force,
        dryRun,
      }), dryRun);
    }

    if (ide === "cursor-pi") {
      printSummary("Cursor rules", installDirectory({
        sourceRoot: paths.cursorRulesSource,
        targetRoot: paths.cursorRulesTarget,
        force,
        dryRun,
      }), dryRun);
    }

    printNextSteps({ ide, paths, dryRun });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(2);
  }
}

main();

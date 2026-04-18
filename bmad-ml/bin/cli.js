#!/usr/bin/env node

const path = require("path");
const {
  installSkills,
  installAgents,
  installDirectory,
  installFile,
  mergeAgentsMd,
  mergeJsonPatch,
} = require("../lib/install");
const {
  DOC_FLAGS,
  renderAbout,
  renderAgents,
  renderWorkflows,
  renderOpenCodeGuide,
  renderPiSubagentGuide,
  renderMatrix,
  renderLearnMoreHint,
} = require("../lib/docs");
const {
  readPackageVersion,
  writeInstalledManifest,
  computeAutoUpgrade,
} = require("../lib/install-manifest");

const ALIASES = {
  "--opencode": "--oc",
  "--cursor": "--cur",
  "--claude-code": "--cc",
  "--cursor-pi": "--cur-pi",
  "--claude-code-pi": "--cc-pi",
};

const REMOVED_PI_MESSAGE = [
  "--pi (standalone pi) has been removed in this release.",
  "Use --cc-pi for Claude Code + pi subagents, or --cur-pi for Cursor + pi subagents.",
].join("\n");

const IDE_FLAGS = ["--oc", "--cur", "--cc", "--cur-pi", "--cc-pi"];
const INSTALL_ONLY_FLAGS = [
  "--force",
  "--dry-run",
  "--with-project-instructions",
  "--no-project-instructions",
  "--logging",
  "--model-picker",
  "--no-refresh",
];

const KNOWN_FLAGS = new Set([
  ...IDE_FLAGS,
  ...DOC_FLAGS,
  ...INSTALL_ONLY_FLAGS,
  "--help",
  "-h",
]);

function normalizeFlag(flag) {
  return ALIASES[flag] || flag;
}

function printUsage() {
  console.log(
    `Usage:
  bmad-ml [--oc|--cur|--cc|--cur-pi|--cc-pi] [--force] [--dry-run]
  bmad-ml [--about|--agents|--workflows|--matrix|--opencode-guide|--pi-subagent-guide]

Install modes:
  --oc          OpenCode mode (alias: --opencode)
  --cur         Cursor subagent mode; Nosh persona via AGENTS.md, soft binding (alias: --cursor)
  --cc          Claude Code subagent mode; Nosh as main-thread agent, hard binding (alias: --claude-code)
  --cur-pi      Cursor + pi-backed specialists (alias: --cursor-pi)
  --cc-pi       Claude Code + pi-backed specialists (alias: --claude-code-pi)

Install options:
  --force                     Overwrite existing installed files/directories
  --dry-run                   Preview changes without writing files
  --with-project-instructions Install AGENTS.md / CLAUDE.md bootstrap (default for --cur/--cc)
  --no-project-instructions   Skip bootstrap install for --cur/--cc
  --logging                   Install optional subagent logging hook scripts
  --model-picker              Run the pi model picker during --cc-pi/--cur-pi install (default: use pi's own default model)
  --no-refresh                Disable auto-refresh of managed files on version upgrade

Docs options:
  --about                What BMad ML is and how it is organized
  --agents               Agent roster by division
  --workflows            Workflow map by phase and outputs
  --matrix               5-mode delivery matrix
  --opencode-guide       OpenCode-specific install/runtime behavior
  --pi-subagent-guide    pi hybrid subagent install/runtime behavior

Other:
  --help                 Show this help message`,
  );
}

function parseArgs(argv) {
  const rawFlags = argv.filter((arg) => arg.startsWith("-"));
  const positionalArgs = argv.filter((arg) => !arg.startsWith("-"));

  if (positionalArgs.length > 0) {
    throw new Error(`Unknown argument(s): ${positionalArgs.join(", ")}`);
  }

  const normalizedFlags = rawFlags.map((flag) => normalizeFlag(flag));

  if (normalizedFlags.includes("--pi")) {
    throw new Error(REMOVED_PI_MESSAGE);
  }

  const unknownFlags = normalizedFlags.filter((flag) => !KNOWN_FLAGS.has(flag));
  if (unknownFlags.length > 0) {
    throw new Error(`Unknown flag(s): ${unknownFlags.join(", ")}`);
  }

  const args = new Set(normalizedFlags);
  const hasHelp = args.has("--help") || args.has("-h");

  if (hasHelp) {
    if (normalizedFlags.length > 1) {
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
    if (
      args.has("--force") ||
      args.has("--dry-run") ||
      args.has("--with-project-instructions") ||
      args.has("--no-project-instructions") ||
      args.has("--logging") ||
      args.has("--model-picker") ||
      args.has("--no-refresh")
    ) {
      throw new Error("Install-only flags require an install target");
    }
    return { mode: "help" };
  }

  if (selectedDocFlags.length === 1) {
    if (
      args.has("--force") ||
      args.has("--dry-run") ||
      args.has("--with-project-instructions") ||
      args.has("--no-project-instructions") ||
      args.has("--logging") ||
      args.has("--model-picker") ||
      args.has("--no-refresh")
    ) {
      throw new Error("Install-only flags cannot be combined with docs flags");
    }
    return { mode: "docs", docFlag: selectedDocFlags[0] };
  }

  if (args.has("--with-project-instructions") && args.has("--no-project-instructions")) {
    throw new Error("Choose either --with-project-instructions or --no-project-instructions, not both");
  }

  return {
    mode: "install",
    ide: selectedInstallFlags[0].slice(2),
    force: args.has("--force"),
    dryRun: args.has("--dry-run"),
    withProjectInstructions: !args.has("--no-project-instructions"),
    withLogging: args.has("--logging"),
    skipPicker: !args.has("--model-picker"),
    noRefresh: args.has("--no-refresh"),
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
  } else if (docFlag === "--pi-subagent-guide") {
    console.log(renderPiSubagentGuide());
  } else if (docFlag === "--matrix") {
    console.log(renderMatrix());
  }

  console.log("");
  console.log(renderLearnMoreHint());
}

function resolvePaths(ide) {
  const packageRoot = path.resolve(__dirname, "..");
  const contentRoot = packageRoot;
  const projectRoot = process.cwd();

  if (ide === "oc") {
    return {
      skillsSource: path.join(contentRoot, "bmad-ml-oc", "skills"),
      skillsTarget: path.join(projectRoot, ".opencode", "skills"),
      agentsSource: path.join(contentRoot, "bmad-ml-oc", "agents", "opencode"),
      agentsTarget: path.join(projectRoot, ".opencode", "agents"),
    };
  }

  if (ide === "cur") {
    return {
      skillsSource: path.join(contentRoot, "bmad-ml-gen", "skills"),
      skillsTarget: path.join(projectRoot, ".cursor", "skills"),
      agentsSource: path.join(contentRoot, "bmad-ml-gen", "cursor", "agents"),
      agentsTarget: path.join(projectRoot, ".cursor", "agents"),
      bootstrapSource: path.join(contentRoot, "bmad-ml-gen", "cursor", "bootstrap", "AGENTS.md"),
      bootstrapTarget: path.join(projectRoot, "AGENTS.md"),
      rulesSource: path.join(contentRoot, "bmad-ml-gen", "cursor", "rules"),
      rulesTarget: path.join(projectRoot, ".cursor", "rules"),
      hooksSource: path.join(contentRoot, "bmad-ml-gen", "cursor", "hooks"),
      hooksTarget: path.join(projectRoot, ".cursor", "hooks"),
      hooksManifestSource: path.join(contentRoot, "bmad-ml-gen", "cursor", "hooks.json"),
      hooksManifestTarget: path.join(projectRoot, ".cursor", "hooks.json"),
    };
  }

  if (ide === "cc") {
    return {
      skillsSource: path.join(contentRoot, "bmad-ml-gen", "skills"),
      skillsTarget: path.join(projectRoot, ".claude", "skills"),
      agentsSource: path.join(contentRoot, "bmad-ml-gen", "claude-code", "agents"),
      agentsTarget: path.join(projectRoot, ".claude", "agents"),
      bootstrapSource: path.join(contentRoot, "bmad-ml-gen", "claude-code", "bootstrap", "CLAUDE.md"),
      bootstrapTarget: path.join(projectRoot, "CLAUDE.md"),
      rulesSource: path.join(contentRoot, "bmad-ml-gen", "claude-code", "rules"),
      rulesTarget: path.join(projectRoot, ".claude", "rules"),
      settingsPatch: path.join(contentRoot, "bmad-ml-gen", "claude-code", "settings-patch.json"),
      settingsTarget: path.join(projectRoot, ".claude", "settings.json"),
      hooksSource: path.join(contentRoot, "bmad-ml-gen", "claude-code", "hooks"),
      hooksTarget: path.join(projectRoot, ".claude", "hooks"),
      delegationSource: path.join(
        contentRoot,
        "bmad-ml-gen",
        "skills",
        "bmad-ml-nosh",
        "DELEGATION.md",
      ),
      delegationTarget: path.join(projectRoot, ".claude", "skills", "bmad-ml-nosh", "DELEGATION.md"),
    };
  }

  if (ide === "cur-pi") {
    return {
      skillsSource: path.join(contentRoot, "bmad-ml-pi", "skills"),
      skillsTarget: path.join(projectRoot, ".pi", "skills"),
      dispatcherSource: path.join(contentRoot, "bmad-ml-pi", "hybrid", "dispatch-pi.mjs"),
      dispatcherTarget: path.join(projectRoot, ".bmad-ml", "dispatch-pi.mjs"),
      dispatcherShSource: path.join(contentRoot, "bmad-ml-pi", "hybrid", "dispatch-pi.sh"),
      dispatcherShTarget: path.join(projectRoot, ".bmad-ml", "dispatch-pi.sh"),
      cursorSkillsSource: path.join(contentRoot, "bmad-ml-pi", "hybrid", "cursor", "skills"),
      cursorSkillsTarget: path.join(projectRoot, ".cursor", "skills"),
      cursorAgentsSource: path.join(contentRoot, "bmad-ml-pi", "hybrid", "cursor", "agents"),
      cursorAgentsTarget: path.join(projectRoot, ".cursor", "agents"),
      cursorBootstrapSource: path.join(contentRoot, "bmad-ml-pi", "hybrid", "cursor", "bootstrap", "AGENTS.md"),
      cursorBootstrapTarget: path.join(projectRoot, "AGENTS.md"),
      cursorRulesSource: path.join(contentRoot, "bmad-ml-pi", "hybrid", "cursor", "rules"),
      cursorRulesTarget: path.join(projectRoot, ".cursor", "rules"),
      cursorHooksManifestSource: path.join(contentRoot, "bmad-ml-pi", "hybrid", "cursor", "hooks.json"),
      cursorHooksManifestTarget: path.join(projectRoot, ".cursor", "hooks.json"),
      cursorHooksSource: path.join(contentRoot, "bmad-ml-pi", "hybrid", "cursor", "hooks"),
      cursorHooksTarget: path.join(projectRoot, ".cursor", "hooks"),
    };
  }

  if (ide === "cc-pi") {
    return {
      skillsSource: path.join(contentRoot, "bmad-ml-pi", "skills"),
      skillsTarget: path.join(projectRoot, ".pi", "skills"),
      dispatcherSource: path.join(contentRoot, "bmad-ml-pi", "hybrid", "dispatch-pi.mjs"),
      dispatcherTarget: path.join(projectRoot, ".bmad-ml", "dispatch-pi.mjs"),
      dispatcherShSource: path.join(contentRoot, "bmad-ml-pi", "hybrid", "dispatch-pi.sh"),
      dispatcherShTarget: path.join(projectRoot, ".bmad-ml", "dispatch-pi.sh"),
      claudeSkillsSource: path.join(contentRoot, "bmad-ml-pi", "hybrid", "claude-code", "skills"),
      claudeSkillsTarget: path.join(projectRoot, ".claude", "skills"),
      claudeAgentsSource: path.join(contentRoot, "bmad-ml-pi", "hybrid", "claude-code", "agents"),
      claudeAgentsTarget: path.join(projectRoot, ".claude", "agents"),
      claudeBootstrapSource: path.join(contentRoot, "bmad-ml-pi", "hybrid", "claude-code", "bootstrap", "CLAUDE.md"),
      claudeBootstrapTarget: path.join(projectRoot, "CLAUDE.md"),
      claudeRulesSource: path.join(contentRoot, "bmad-ml-pi", "hybrid", "claude-code", "rules"),
      claudeRulesTarget: path.join(projectRoot, ".claude", "rules"),
      claudeSettingsPatch: path.join(contentRoot, "bmad-ml-pi", "hybrid", "claude-code", "settings-patch.json"),
      claudeSettingsTarget: path.join(projectRoot, ".claude", "settings.json"),
      claudeHooksSource: path.join(contentRoot, "bmad-ml-pi", "hybrid", "claude-code", "hooks"),
      claudeHooksTarget: path.join(projectRoot, ".claude", "hooks"),
      delegationSource: path.join(
        contentRoot,
        "bmad-ml-pi",
        "hybrid",
        "claude-code",
        "skills",
        "bmad-ml-nosh",
        "DELEGATION.md",
      ),
      delegationTarget: path.join(projectRoot, ".claude", "skills", "bmad-ml-nosh", "DELEGATION.md"),
    };
  }

  throw new Error(`Unknown install mode: ${ide}`);
}

function formatDryRunTag(dryRun) {
  return dryRun ? "[dry-run] " : "";
}

function printSummary(label, result, dryRun) {
  const prefix = formatDryRunTag(dryRun);
  const target = result.targetDir || result.targetFile || "n/a";
  console.log(`${prefix}${label}: ${result.installedCount} installed, ${result.skippedCount} skipped -> ${target}`);
}


function printNextSteps({ ide, paths, dryRun, withProjectInstructions, withLogging }) {
  console.log("");
  if (dryRun) {
    console.log("[dry-run] Preview complete. No files were written.");
    console.log("Recommended next steps after running without --dry-run:");
  } else {
    console.log("Next steps:");
  }

  console.log("1. Run `ml-setup` in your IDE to configure _bmad/config.yaml and _bmad/config.user.yaml.");

  if (ide === "oc") {
    console.log("2. Start OpenCode in this project and press Tab to switch to Nosh.");
    console.log("3. Delegate independent specialist tasks in parallel with the Task tool.");
  } else if (ide === "cur") {
    if (withProjectInstructions) {
      console.log("2. Open Cursor; AGENTS.md and .cursor/rules bootstrap Nosh as the main-chat persona.");
    } else {
      console.log("2. Open Cursor and invoke `bmad-ml-nosh` manually (project bootstrap was skipped).");
    }
    console.log("3. Delegate specialists via the Task tool with `subagent_type: \"bmad-<specialist>\"`.");
  } else if (ide === "cc") {
    console.log("2. Open Claude Code; `.claude/settings.json` binds Nosh as the session-default agent (see `@bmad-ml-nosh` in the startup header).");
    console.log("3. Delegate specialists via the Agent tool (aliased from Task) with `subagent_type: \"bmad-<specialist>\"`.");
    console.log("   Opt out of hard binding by removing the `\"agent\"` key from .claude/settings.json.");
  } else if (ide === "cur-pi") {
    console.log("2. Open Cursor; Nosh runs in main chat from AGENTS.md + .cursor/rules.");
    console.log("3. Delegate specialists via Cursor subagent shims that run `.bmad-ml/dispatch-pi.mjs`.");
  } else if (ide === "cc-pi") {
    console.log("2. Open Claude Code; Nosh runs in main chat from CLAUDE.md + .claude/rules.");
    console.log("3. Delegate specialists via Claude subagent shims that run `.bmad-ml/dispatch-pi.mjs`.");
  }

  console.log(`Skills location: ${paths.skillsTarget}`);

  if (paths.agentsTarget) {
    console.log(`Agent location: ${paths.agentsTarget}`);
  }
  if (paths.cursorAgentsTarget) {
    console.log(`Cursor shim location: ${paths.cursorAgentsTarget}`);
  }
  if (paths.claudeAgentsTarget) {
    console.log(`Claude shim location: ${paths.claudeAgentsTarget}`);
  }
  if (paths.dispatcherTarget) {
    console.log(`Dispatcher script: ${paths.dispatcherTarget}`);
  }

  if (withLogging) {
    if (paths.hooksTarget) {
      console.log(`Hooks location: ${paths.hooksTarget}`);
    }
    if (paths.cursorHooksTarget) {
      console.log(`Cursor hooks location: ${paths.cursorHooksTarget}`);
    }
    if (paths.claudeHooksTarget) {
      console.log(`Claude hooks location: ${paths.claudeHooksTarget}`);
    }
  }

  console.log(renderLearnMoreHint());
}

async function main() {
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

  const { ide, force: userForce, dryRun, withProjectInstructions, withLogging, skipPicker, noRefresh } = parsed;
  const paths = resolvePaths(ide);
  const projectRoot = process.cwd();
  const packageVersion = readPackageVersion(path.resolve(__dirname, "..", "package.json"));
  const upgradeInfo = computeAutoUpgrade({ ide, projectRoot, noRefresh, packageVersion });

  if (upgradeInfo.autoUpgrade && upgradeInfo.reason === "version-mismatch") {
    console.log(`[upgrade] Refreshing bmad-ml managed files: ${upgradeInfo.installedVersion} -> ${packageVersion}`);
  } else if (upgradeInfo.autoUpgrade && upgradeInfo.reason === "legacy") {
    console.log(`[upgrade] Legacy bmad-ml install detected (no manifest). Refreshing managed files to ${packageVersion}.`);
  }

  const force = userForce || upgradeInfo.autoUpgrade;

  try {
    const skillResult = installSkills({
      sourceRoot: paths.skillsSource,
      targetRoot: paths.skillsTarget,
      force,
      dryRun,
    });
    printSummary("Skills", skillResult, dryRun);

    if (ide === "oc") {
      printSummary("Agents", installAgents({
        sourceRoot: paths.agentsSource,
        targetRoot: paths.agentsTarget,
        force,
        dryRun,
      }), dryRun);
    }

    if (ide === "cur" || ide === "cc") {
      printSummary("Specialist agents", installAgents({
        sourceRoot: paths.agentsSource,
        targetRoot: paths.agentsTarget,
        force,
        dryRun,
      }), dryRun);

      if (withProjectInstructions) {
        printSummary("Project bootstrap", mergeAgentsMd({
          sourceFile: paths.bootstrapSource,
          targetFile: paths.bootstrapTarget,
          force,
          dryRun,
        }), dryRun);

        printSummary("Rules", installDirectory({
          sourceRoot: paths.rulesSource,
          targetRoot: paths.rulesTarget,
          force,
          dryRun,
        }), dryRun);
      } else {
        console.log(`${formatDryRunTag(dryRun)}Project bootstrap skipped (--no-project-instructions).`);
      }

      if (ide === "cc") {
        printSummary("Settings", mergeJsonPatch({
          patchFile: paths.settingsPatch,
          targetFile: paths.settingsTarget,
          force,
          dryRun,
        }), dryRun);

        printSummary("Nosh delegation overlay", installFile({
          sourceFile: paths.delegationSource,
          targetFile: paths.delegationTarget,
          force,
          dryRun,
        }), dryRun);
      }

      if (withLogging) {
        printSummary("Hooks", installDirectory({
          sourceRoot: paths.hooksSource,
          targetRoot: paths.hooksTarget,
          force,
          dryRun,
        }), dryRun);

        if (ide === "cur") {
          printSummary("Hooks manifest", installFile({
            sourceFile: paths.hooksManifestSource,
            targetFile: paths.hooksManifestTarget,
            force,
            dryRun,
          }), dryRun);
        }
      }
    }

    if (ide === "cur-pi" || ide === "cc-pi") {
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

      if (ide === "cur-pi") {
        printSummary("Cursor skills", installDirectory({
          sourceRoot: paths.cursorSkillsSource,
          targetRoot: paths.cursorSkillsTarget,
          force,
          dryRun,
        }), dryRun);

        printSummary("Cursor shims", installAgents({
          sourceRoot: paths.cursorAgentsSource,
          targetRoot: paths.cursorAgentsTarget,
          force,
          dryRun,
        }), dryRun);

        printSummary("Project bootstrap", mergeAgentsMd({
          sourceFile: paths.cursorBootstrapSource,
          targetFile: paths.cursorBootstrapTarget,
          force,
          dryRun,
        }), dryRun);

        printSummary("Cursor rules", installDirectory({
          sourceRoot: paths.cursorRulesSource,
          targetRoot: paths.cursorRulesTarget,
          force,
          dryRun,
        }), dryRun);

        if (withLogging) {
          printSummary("Cursor hooks", installDirectory({
            sourceRoot: paths.cursorHooksSource,
            targetRoot: paths.cursorHooksTarget,
            force,
            dryRun,
          }), dryRun);

          printSummary("Cursor hooks manifest", installFile({
            sourceFile: paths.cursorHooksManifestSource,
            targetFile: paths.cursorHooksManifestTarget,
            force,
            dryRun,
          }), dryRun);
        }
      }

      if (ide === "cc-pi") {
        printSummary("Claude skills", installDirectory({
          sourceRoot: paths.claudeSkillsSource,
          targetRoot: paths.claudeSkillsTarget,
          force,
          dryRun,
        }), dryRun);

        printSummary("Claude shims", installAgents({
          sourceRoot: paths.claudeAgentsSource,
          targetRoot: paths.claudeAgentsTarget,
          force,
          dryRun,
        }), dryRun);

        printSummary("Project bootstrap", mergeAgentsMd({
          sourceFile: paths.claudeBootstrapSource,
          targetFile: paths.claudeBootstrapTarget,
          force,
          dryRun,
        }), dryRun);

        printSummary("Claude rules", installDirectory({
          sourceRoot: paths.claudeRulesSource,
          targetRoot: paths.claudeRulesTarget,
          force,
          dryRun,
        }), dryRun);

        printSummary("Nosh delegation overlay", installFile({
          sourceFile: paths.delegationSource,
          targetFile: paths.delegationTarget,
          force,
          dryRun,
        }), dryRun);

        printSummary("Claude settings", mergeJsonPatch({
          patchFile: paths.claudeSettingsPatch,
          targetFile: paths.claudeSettingsTarget,
          force,
          dryRun,
        }), dryRun);

        if (withLogging) {
          printSummary("Claude hooks", installDirectory({
            sourceRoot: paths.claudeHooksSource,
            targetRoot: paths.claudeHooksTarget,
            force,
            dryRun,
          }), dryRun);
        }
      }

      const { runModelPicker } = require("../lib/pi-model-picker");
      await runModelPicker({
        settingsFile: path.join(process.cwd(), ".pi", "settings.json"),
        dryRun,
        force,
        skipPicker,
        stdin: process.stdin,
        stdout: process.stdout,
        stderr: process.stderr,
        env: process.env,
      });
    }

    if (dryRun) {
      console.log(`[dry-run] Would write _bmad/install-manifest.json (version ${packageVersion}, mode ${ide}).`);
    } else {
      writeInstalledManifest(projectRoot, { version: packageVersion, mode: ide });
    }

    printNextSteps({ ide, paths, dryRun, withProjectInstructions, withLogging });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(2);
  }
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exit(2);
});

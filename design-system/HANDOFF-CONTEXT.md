# Claude Design → Claude Code Handoff Context

When triggering the **"Handoff to Claude Code"** from Claude Design, include this block as context so Claude Code knows exactly what to do with the exported design.

---

## Copy-Paste This Block into the Handoff

```
You are receiving a Claude Design handoff for a Microsoft Fabric App.

PROJECT: [Sparklines | Bullet | <name>]
CONNECTION ALIAS: [sparklines | bullet | <alias from fabric.yaml>]
SEMANTIC MODEL: [workspace name] / [model name]
TARGET DIRECTORY: b:\VS Code Files\Fabric Apps\[ProjectName]

INSTRUCTIONS:
1. Read the HTML file from the export — find the <script id="data-manifest"> block and parse it
2. For each visual in the manifest, generate a .vl.json5 spec in mockups/ using the matching template from design-system/spec-templates/ as a starting point
3. Adapt each spec: replace placeholder field names with the names from the manifest's "fields" array
4. Run `npm run mockups:watch` and confirm each spec renders correctly in Vega Viewer
5. For each visual, run: npm run wire-spec -- mockups/<id>.vl.json5 --domain <section> --name <id>
6. Fill in the generated .ts factory files: map the placeholder columnMetadata keys to real DAX column names from the dax_hint values
7. Write the .dax query for each visual — use the schema-discovery skill if needed
8. Build the React page component following .agents/skills/app-design/SKILL.md
9. Deploy: npx rayfin up

SKILLS: All agent skills are in .agents/skills/
SPEC TEMPLATES: design-system/spec-templates/
IMPORT SCRIPT: npm run import-design -- --zip <path-to-zip>
```

---

## Filling In the Placeholders

| Placeholder | Where to find it |
|---|---|
| `[Sparklines \| Bullet \| <name>]` | The Fabric App project folder name |
| `[sparklines \| bullet \| <alias>]` | The alias in `fabric.yaml` under `semanticModels:` |
| `[workspace name]` | The Bi Nexus workspace (or whatever workspace the model is in) |
| `[model name]` | The published semantic model name |
| `b:\VS Code Files\Fabric Apps\[ProjectName]` | The full path to the project |

---

## ZIP Import Path (Alternative to Handoff)

If using the ZIP export instead of direct handoff:

1. Save the ZIP from Claude Design anywhere on disk
2. Run: `npm run import-design -- --zip "path/to/export.zip"`
3. This extracts to `design-imports/<export-name>/` and generates `manifest.json`
4. Then ask Claude Code: *"Process the Claude Design import in design-imports/<name>/"*

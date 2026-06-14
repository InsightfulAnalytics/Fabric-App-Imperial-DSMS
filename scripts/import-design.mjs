/**
 * import-design.mjs
 * Extracts a Claude Design ZIP export, parses its data manifest,
 * and generates a manifest.json summary for Claude Code to process.
 *
 * Usage:
 *   npm run import-design -- --zip "path/to/export.zip" [--name my-report]
 */

import { createReadStream, mkdirSync, writeFileSync, readdirSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join, resolve, basename, extname } from "node:path";
import { parseArgs } from "node:util";

// --- Argument parsing ---
const { values: args } = parseArgs({
    options: {
        zip:  { type: "string" },
        name: { type: "string" },
    },
    allowPositionals: false,
});

if (!args.zip) {
    console.error("Usage: npm run import-design -- --zip <path.zip> [--name <name>]");
    process.exit(1);
}

const zipPath = resolve(args.zip);
const exportName = args.name ?? basename(zipPath, extname(zipPath)).replace(/[^a-z0-9_-]/gi, "-");
const outDir = resolve(process.cwd(), "design-imports", exportName);

mkdirSync(outDir, { recursive: true });

// --- ZIP extraction ---
// We use the built-in unzip via node:child_process as a zero-dependency approach.
// Requires the system `unzip` utility (available on Windows via Git Bash, WSL, or PowerShell's Expand-Archive).
import { execSync } from "node:child_process";

console.log(`\n📦 Extracting ${basename(zipPath)} → design-imports/${exportName}/`);

try {
    // Try PowerShell Expand-Archive (Windows-native, no extra install needed)
    execSync(
        `powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${outDir}' -Force"`,
        { stdio: "inherit" }
    );
} catch {
    console.error("❌ Failed to extract ZIP. Make sure PowerShell is available, or extract the ZIP manually into:");
    console.error(`   ${outDir}`);
    console.error("Then re-run the script with: npm run import-design -- --name " + exportName);
    process.exit(1);
}

// --- Find HTML file ---
const htmlFiles = readdirSync(outDir).filter(f => f.endsWith(".html"));
if (htmlFiles.length === 0) {
    console.error("❌ No HTML file found in the extracted ZIP. The ZIP may not be a Claude Design export.");
    process.exit(1);
}
const htmlFile = join(outDir, htmlFiles[0]);
console.log(`📄 Found HTML: ${htmlFiles[0]}`);

// --- Parse data manifest ---
const html = await readFile(htmlFile, "utf8");
const manifestMatch = html.match(/<script[^>]+id=["']data-manifest["'][^>]*>([\s\S]*?)<\/script>/i);

if (!manifestMatch) {
    console.warn("⚠️  No <script id=\"data-manifest\"> block found in the HTML.");
    console.warn("   The design may not have been created with the Claude Design instructions.");
    console.warn("   You can still process this import manually — review the HTML at:");
    console.warn(`   ${htmlFile}`);

    writeFileSync(
        join(outDir, "manifest.json"),
        JSON.stringify({ _warning: "No data-manifest found. Review HTML manually.", htmlFile }, null, 2)
    );
    printNextSteps(exportName, false);
    process.exit(0);
}

let manifest;
try {
    manifest = JSON.parse(manifestMatch[1].trim());
} catch (err) {
    console.error("❌ Failed to parse data-manifest JSON:", err.message);
    process.exit(1);
}

// --- Write manifest.json ---
const manifestOut = join(outDir, "manifest.json");
writeFileSync(manifestOut, JSON.stringify(manifest, null, 2));
console.log(`✅ Manifest saved → design-imports/${exportName}/manifest.json`);

// --- Summary ---
const visuals = manifest.visuals ?? [];
console.log(`\n📊 Found ${visuals.length} visual(s):`);
for (const v of visuals) {
    const fields = (v.fields ?? []).map(f => f.name).join(", ");
    console.log(`   • [${v.type}] ${v.id} — fields: ${fields || "(none)"}`);
}

printNextSteps(exportName, true);

function printNextSteps(name, hasManifest) {
    console.log(`
────────────────────────────────────────────────────────
✅ Import complete: design-imports/${name}/

Next steps — ask Claude Code:
  "Process the Claude Design import in design-imports/${name}/"

Or follow manually:
  1. For each visual in manifest.json, create a .vl.json5 in mockups/
     using the matching template from design-system/spec-templates/
  2. npm run mockups:watch    ← preview specs in Vega Viewer
  3. For each visual:
     npm run wire-spec -- mockups/<id>.vl.json5 --domain <section> --name <id>
  4. Fill in .ts factory files + write .dax queries
  5. Build the React page component
  6. npx rayfin up
────────────────────────────────────────────────────────`);
}

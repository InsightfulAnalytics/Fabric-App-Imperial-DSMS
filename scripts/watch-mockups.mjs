import { watch } from "chokidar";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import JSON5 from "json5";

const ROOT = resolve(process.cwd(), "mockups");
const PREVIEW_DIR = join(ROOT, ".preview");

function outName(srcPath) {
    const name = basename(srcPath);
    if (name.endsWith(".jsonc")) return name.replace(/\.jsonc$/i, "_nc.vl.json");
    if (name.endsWith(".vl.json5")) return name.replace(/\.json5$/i, ".json");
    return null;
}

async function compile(srcPath) {
    const out = outName(srcPath);
    if (!out) return;
    try {
        const raw = await readFile(srcPath, "utf8");
        const parsed = JSON5.parse(raw);
        const outPath = join(PREVIEW_DIR, out);
        await mkdir(dirname(outPath), { recursive: true });
        await writeFile(outPath, JSON.stringify(parsed, null, 2));
        console.log(`✓ ${basename(srcPath)} → .preview/${out}`);
    } catch (err) {
        console.error(`✗ ${basename(srcPath)}: ${err.message}`);
    }
}

await mkdir(PREVIEW_DIR, { recursive: true });

const watcher = watch(ROOT, {
    ignoreInitial: false,
    ignored: (path) => path.includes(".preview"),
    usePolling: true,
    interval: 500,
});

const handle = (path) => {
    if (path.endsWith(".jsonc") || path.endsWith(".vl.json5")) compile(path);
};

watcher.on("add", handle);
watcher.on("change", handle);

console.log(`Watching ${ROOT} for *.jsonc and *.vl.json5 — Ctrl+C to stop.`);

// Builds the site that goes online into dist/ (no dependencies, Node 18+).
//
//   node scripts/build.mjs               the version named in release.json
//   node scripts/build.mjs pre-anuncio   only the public pre-announcement page
//   node scripts/build.mjs completo      the full site, after the official announcement
//
// The pre-announcement build takes its page, content and script from pre-anuncio/ and only
// the shared, content-free files from site/ (styles, 3D model, fonts and libraries, brand).
// Then it checks the output and fails if anything from the full site got in.
import { cp, rm, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { createHash } from "node:crypto";

const root = fileURLToPath(new URL("..", import.meta.url));
const site = join(root, "site");
const pre = join(root, "pre-anuncio");
const dist = join(root, "dist");

const release = JSON.parse(await readFile(join(root, "release.json"), "utf8"));
const target = process.argv[2] || release.versao;
if (!["pre-anuncio", "completo"].includes(target)) {
  console.error(`Versão desconhecida: "${target}". Use "pre-anuncio" ou "completo".`);
  process.exit(1);
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

if (target === "completo") {
  await cp(site, dist, { recursive: true });
  await bustCache();
} else {
  // Shared files: no event copy in any of them.
  for (const f of ["styles.css", "model.js", ".nojekyll", "assets", "vendor"]) {
    await cp(join(site, f), join(dist, f), { recursive: true });
  }
  // The stylesheet's comments describe the full site's chapters: they stay out.
  const css = await readFile(join(dist, "styles.css"), "utf8");
  await writeFile(join(dist, "styles.css"), css.replace(/\/\*[\s\S]*?\*\//g, ""), "utf8");
  await cp(pre, dist, { recursive: true });
  await bustCache();
  await checkPreBuild();
}
console.log(`dist/ pronto: versão "${target}".`);

// GitHub Pages lets browsers keep each file for 10 minutes. Every stylesheet and script is
// linked with a fingerprint of its content (styles.css?v=1a2b3c4d), so a new deploy is fetched
// at once and an unchanged file stays cached. The 3D model is fingerprinted first, because the
// page scripts import it.
async function bustCache() {
  const files = new Set(await readdir(dist));
  const stamp = async (f) => createHash("sha256").update(await readFile(join(dist, f))).digest("hex").slice(0, 10);
  const swap = async (f, pairs) => {
    let text = await readFile(join(dist, f), "utf8");
    for (const [from, to] of pairs) text = text.split(from).join(to);
    await writeFile(join(dist, f), text, "utf8");
  };
  if (files.has("model.js")) {
    const v = await stamp("model.js");
    for (const js of ["main.js", "pre.js"]) if (files.has(js)) await swap(js, [['import("./model.js")', `import("./model.js?v=${v}")`]]);
  }
  const pairs = [];
  for (const f of ["styles.css", "pre.css", "content.js", "main.js", "pre.js"]) {
    if (!files.has(f)) continue;
    const v = await stamp(f);
    const attr = f.endsWith(".css") ? "href" : "src";
    pairs.push([`${attr}="${f}"`, `${attr}="${f}?v=${v}"`]);
  }
  await swap("index.html", pairs);
}

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

async function checkPreBuild() {
  const files = (await walk(dist)).map((f) => relative(dist, f).split(sep).join("/"));
  const problems = [];

  // 1. Only the files the pre-announcement page needs.
  const allowed = /^(index\.html|content\.js|pre\.js|pre\.css|styles\.css|model\.js|\.nojekyll|assets\/.+|vendor\/.+)$/;
  for (const f of files) if (!allowed.test(f)) problems.push(`arquivo que não pertence à versão pré-anúncio: ${f}`);

  // 2. Every sentence of the full site that the pre-announcement source does not use.
  const fullContent = await readFile(join(site, "content.js"), "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(fullContent, sandbox);
  const strings = new Set();
  const collect = (v, into) => {
    if (typeof v === "string") into.add(v.trim());
    else if (v && typeof v === "object") Object.values(v).forEach((x) => collect(x, into));
  };
  const H = sandbox.window.HACKATHON;
  collect(H, strings);
  const fullHtml = await readFile(join(site, "index.html"), "utf8");
  for (const m of fullHtml.replace(/<script[\s\S]*?<\/script>/g, "").matchAll(/>([^<>]+)</g)) strings.add(m[1].replace(/\s+/g, " ").trim());
  // Sentences of the unreleased chapters are secret even if someone pastes them into pre-anuncio/.
  const sealed = new Set();
  ["ia", "projeto", "etapas", "pitch", "avaliacao", "faq", "regulamento"].forEach((k) => collect(H[k], sealed));
  // ...unless the same words are already public (the meeting, the team rules, the agenda).
  const open = new Set();
  ["evento", "sobre", "participacao", "revelacao", "cronograma"].forEach((k) => collect(H[k], open));
  const preSource = (await Promise.all(["index.html", "content.js", "pre.js"].map((f) => readFile(join(pre, f), "utf8")))).join("\n");
  const secret = [...strings].filter((s) => s.length >= 14 && !/^\[.*\]$/.test(s) && ((sealed.has(s) && !open.has(s)) || !preSource.includes(s)));

  // 3. Facts that must never reach the browser before the announcement, wherever they come from.
  const banned = [/Raul/, /Castanhari/, /medalha/i, /0 a 10/, /regulamento/i, /crit[ée]rio/i, /\bbanca\b/i, /pr[êe]mi/i,
    /intelig[êe]ncia artificial/i, /\bTCC\b/, /\bSTAR\b/, /audit[óo]rio/i, /homologad/i, /formul[áa]rio/i];

  const ownFiles = files.filter((f) => !f.startsWith("vendor/") && /\.(html|js|css|svg|json|txt)$/.test(f));
  for (const f of ownFiles) {
    const text = await readFile(join(dist, f), "utf8");
    for (const s of secret) if (text.includes(s)) problems.push(`${f}: contém texto do site completo: "${s.slice(0, 70)}"`);
    for (const re of banned) if (re.test(text)) problems.push(`${f}: contém termo reservado ao anúncio: ${re}`);
  }

  if (problems.length) {
    console.error("A versão pré-anúncio expõe conteúdo do anúncio:\n- " + problems.join("\n- "));
    process.exit(1);
  }
  console.log(`Verificação pré-anúncio: ${files.length} arquivos, ${secret.length} trechos do site completo e ${banned.length} termos reservados procurados, nada encontrado.`);
}

import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const publicDir = resolve(root, "public");

const [html, css, js, logo] = await Promise.all([
  readFile(resolve(publicDir, "mubader.html"), "utf8"),
  readFile(resolve(publicDir, "mubader.css"), "utf8"),
  readFile(resolve(publicDir, "mubader.js"), "utf8"),
  readFile(resolve(publicDir, "logo-mubader.png")),
]);

const logoDataUrl = `data:image/png;base64,${logo.toString("base64")}`;
const previewGuard = `
document.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link) return;
  const href = link.getAttribute("href") || "";
  if (/\\.html(?:#.*)?$/.test(href)) {
    event.preventDefault();
    alert("هذه نسخة معاينة مستقلة من الصفحة الرئيسية لمنصة مبادر.");
  }
});
`;

const standalone = html
  .replace('<link rel="stylesheet" href="./mubader.css">', `<style>\n${css}\n</style>`)
  .replace(/<link rel="preconnect"[^>]*>\s*/g, "")
  .replace(/<link href="https:\/\/fonts\.googleapis\.com[^>]*>\s*/g, "")
  .replace('<script src="./mubader.js"></script>', `<script>\n${js}\n${previewGuard}\n</script>`)
  .replaceAll("./logo-mubader.png", logoDataUrl)
  .replace("</head>", '<meta name="generator" content="Mubadir standalone preview">\n</head>');

const output = resolve(root, "Mubadir-Standalone.html");
await writeFile(output, standalone, "utf8");
console.log(output);

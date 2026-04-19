import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// ─────────────────────────────────────────────────────────────────────────────
// PATHING ROBUST
// process.cwd() pe Vercel returnează întotdeauna rădăcina proiectului.
// Folosim path.join cu segmente separate (nu "content/blog" ca string unic)
// pentru a evita eventuale probleme cu separatorul pe Windows local.
// ─────────────────────────────────────────────────────────────────────────────
const POSTS_DIR = path.join(process.cwd(), "content", "blog");

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: Normalizează CRLF → LF înainte de a pasa conținutul la gray-matter.
// gray-matter gestionează CRLF în general, DAR unele versiuni de js-yaml
// (dependență internă) pot produce rezultate inconsistente cu \r\n în valori
// string. Normalizarea e gratuită ca overhead și elimină orice risc.
// ─────────────────────────────────────────────────────────────────────────────
function readFileLF(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
}

export function getSortedPostsData() {
  // Logging detaliat — vizibil în Vercel → Functions → Logs
  console.log("[posts] POSTS_DIR:", POSTS_DIR);

  if (!fs.existsSync(POSTS_DIR)) {
    // Dacă folderul lipsește chiar și după fix-ul din next.config.js,
    // afișăm ce există în cwd() ca să localizăm problema exact.
    console.error("[posts] ❌ Folder inexistent:", POSTS_DIR);
    try {
      console.log("[posts] Conținut cwd():", fs.readdirSync(process.cwd()));
    } catch (_) {}
    return [];
  }

  const allFiles = fs.readdirSync(POSTS_DIR);
  console.log("[posts] Fișiere în folder:", allFiles);

  const mdFiles = allFiles.filter((f) => f.endsWith(".md"));

  if (mdFiles.length === 0) {
    console.warn("[posts] ⚠️  Nu există fișiere .md în", POSTS_DIR);
    return [];
  }

  const posts = mdFiles.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const filePath = path.join(POSTS_DIR, fileName);

    // ─────────────────────────────────────────────────────────────────────
    // DATA PARSING
    // Citim cu normalizare CRLF și extragem frontmatter prin gray-matter.
    // Furnizăm valori default explicite pentru fiecare câmp așteptat în UI,
    // astfel încât un articol cu frontmatter incomplet să nu spargă pagina.
    // ─────────────────────────────────────────────────────────────────────
    const raw = readFileLF(filePath);
    const { data } = matter(raw);

    if (!data.title) {
      console.warn(`[posts] ⚠️  Articolul "${slug}" nu are 'title' în frontmatter`);
    }

    return {
      slug,
      title:    data.title    ?? slug,
      date:     data.date     ?? "1970-01-01",
      category: data.category ?? "",
      tag:      data.tag      ?? "",
      featured: data.featured ?? false,
      excerpt:  data.excerpt  ?? "",
      readTime: data.readTime ?? "5 min",
      stats:    data.stats    ?? null,
    };
  });

  // Sortare sigură: date invalide sunt trimise la coada listei
  return posts.sort((a, b) => {
    const da = new Date(a.date);
    const db = new Date(b.date);
    if (isNaN(da)) return 1;
    if (isNaN(db)) return -1;
    return db - da;
  });
}

export async function getPostData(slug) {
  // Sanitizare: eliminăm orice tentativă de path traversal (ex: ../../etc/passwd)
  const safeSlug = path.basename(slug);
  const fullPath = path.join(POSTS_DIR, `${safeSlug}.md`);

  console.log("[posts] getPostData:", safeSlug);

  if (!fs.existsSync(fullPath)) {
    console.error("[posts] ❌ Fișier inexistent:", fullPath);
    return null;
  }

  const raw = readFileLF(fullPath);
  const { data, content } = matter(raw);

  // sanitize: false → permite tag-uri HTML inline în Markdown
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(content);

  return {
    slug:        safeSlug,
    contentHtml: processedContent.toString(),
    title:       data.title    ?? safeSlug,
    date:        data.date     ?? "",
    category:    data.category ?? "",
    tag:         data.tag      ?? "",
    featured:    data.featured ?? false,
    excerpt:     data.excerpt  ?? "",
    readTime:    data.readTime ?? "5 min",
    stats:       data.stats    ?? null,
  };
}
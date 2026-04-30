import { getPostData, getSortedPostsData } from "../../../lib/posts";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { notFound } from "next/navigation";

/* ─── SOCIAL LINK ─── */
function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 transition-all duration-200 hover:border-[#89AACC]/50 hover:text-[#89AACC] hover:bg-white/5"
    >
      {children}
    </a>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="border-t border-white/10 pt-10 pb-24 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="p-[1px] rounded-full" style={{ background: "linear-gradient(135deg, #89AACC, #4E85BF)" }}>
            <div className="bg-[#030303] rounded-full px-2.5 py-1 text-[11px] font-display italic font-bold text-white">CS</div>
          </div>
          <div>
            <p className="font-display italic text-sm text-white">CapeSystem</p>
            <p className="text-[9px] text-gray-500 font-body uppercase tracking-widest">azisunt.net</p>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-[10px] text-gray-500 font-body text-center order-last md:order-none">
          © {new Date().getFullYear()} CapeSystem · High-Performance Web Systems & Digital Marketing
        </p>

        {/* Social + contact */}
        <div className="flex items-center gap-2.5">
          <SocialLink href="https://www.tiktok.com/@capesystempower" label="TikTok">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/>
            </svg>
          </SocialLink>
          <SocialLink href="https://www.facebook.com/CSLEGION" label="Facebook">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </SocialLink>
          <SocialLink href="https://instagram.com/capesystemdesign" label="Instagram">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>
          </SocialLink>
          <div className="w-px h-4 bg-white/8 mx-1" />
          <SocialLink href="mailto:harapalb923@gmail.com" label="Email">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </SocialLink>
          <SocialLink href="tel:+40733874143" label="Telefon">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </SocialLink>
        </div>

      </div>
    </footer>
  );
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  console.log("[generateStaticParams] Sluguri generate:", posts.map((p) => p.slug));
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;
export const revalidate = false;

export default async function PostPage({ params }) {
  const { slug } = params;

  console.log("[PostPage] Slug primit:", slug);

  const post = await getPostData(slug);

  // ✅ Log-ul critic pentru debug: vedem ce citeste serverul din fisier
  console.log(
    "[PostPage] contentHtml preview:",
    post?.contentHtml?.slice(0, 50) ?? "NULL"
  );

  if (!post) {
    notFound();
  }

  return (
    <>
    <main className="bg-[#030303] min-h-screen pt-32 pb-20 px-6">
      <article className="max-w-3xl mx-auto">

        {/* Buton Înapoi */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 text-[10px] font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Înapoi la Hub
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 rounded-full bg-[#89AACC15] border border-[#89AACC30] text-[#89AACC] text-[9px] font-bold uppercase tracking-widest">
              {post.category || post.tag || "Insight"}
            </span>
            <span className="flex items-center gap-2 text-gray-500 text-[9px] uppercase tracking-widest">
              <Clock size={12} /> {post.readTime}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl text-white font-bold leading-[1.1] tracking-tighter mb-8 italic">
            {post.title}
          </h1>
        </header>

        {/* ✅ Conținut Markdown → HTML */}
        {post.contentHtml && post.contentHtml.length > 0 ? (
          <div
            className="prose prose-invert prose-blue max-w-none 
              prose-p:text-gray-400 prose-p:leading-relaxed prose-p:text-lg
              prose-headings:text-white prose-strong:text-[#89AACC]"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        ) : (
          <div className="p-6 border border-red-900/30 bg-red-900/10 rounded-xl">
            <p className="text-red-400 text-sm">
              ⚠️ Conținut lipsă în fișierul: <code className="font-mono bg-black/50 px-1">content/blog/{slug}.md</code>
              <br />
              Asigură-te că ai text scris după al doilea rând de <code className="font-mono">---</code>.
            </p>
          </div>
        )}

        {/* CTA final */}
        <footer className="mt-20 pt-10 border-t border-white/5">
          <div className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-10 text-center relative overflow-hidden">
            <h3 className="text-2xl text-white mb-4 relative z-10 italic">
              Vrei un sistem de autoritate similar?
            </h3>
            <Link
              href="/#contact"
              className="inline-block bg-white text-black px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform relative z-10"
            >
              Hai să vorbim ↗
            </Link>
          </div>
        </footer>

      </article>
    </main>

    <Footer />
    </>
  );
}
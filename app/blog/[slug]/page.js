import { getPostData, getSortedPostsData } from "../../../lib/posts";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { notFound } from "next/navigation";

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
  );
}
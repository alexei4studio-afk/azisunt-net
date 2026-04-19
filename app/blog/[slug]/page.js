import { getPostData, getSortedPostsData } from "../../../lib/posts";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

// Spune Next.js ce pagini să genereze (optimizare viteză)
export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }) {
  // Așteptăm preluarea datelor folosind slug-ul din URL
  const post = await getPostData(params.slug);

  return (
    <main className="bg-[hsl(var(--bg))] min-h-screen pt-32 pb-20 px-6">
      <article className="max-w-3xl mx-auto">
        
        {/* Buton Înapoi */}
        <Link 
          href="/blog" 
          className="group inline-flex items-center gap-2 text-[hsl(var(--muted))] hover:text-white transition-colors mb-12 text-[10px] font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Înapoi la Hub
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 rounded-full bg-[#89AACC15] border border-[#89AACC30] text-[#89AACC] text-[9px] font-bold uppercase tracking-widest">
              {post.category}
            </span>
            <span className="flex items-center gap-2 text-[hsl(var(--muted))] text-[9px] uppercase tracking-widest">
              <Clock size={12} /> {post.readTime}
            </span>
          </div>
          
          <h1 className="font-display italic text-4xl md:text-6xl text-white leading-[1.1] tracking-tighter mb-8">
            {post.title}
          </h1>
        </header>

        {/* Randare conținut HTML din Markdown */}
        <div 
          className="prose prose-invert prose-blue max-w-none 
          prose-p:text-[hsl(var(--muted))] prose-p:leading-relaxed prose-p:text-lg
          prose-headings:font-display prose-headings:italic prose-headings:text-white
          prose-strong:text-[#89AACC]"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
        />

        {/* CTA final */}
        <footer className="mt-20 pt-10 border-t border-white/5">
          <div className="bg-[hsl(var(--surface))] border border-[hsl(var(--stroke))] rounded-[2.5rem] p-10 text-center relative overflow-hidden">
             <h3 className="font-display italic text-2xl text-white mb-4 relative z-10">
               Vrei un sistem de autoritate similar?
             </h3>
             <Link href="/#contact" className="inline-block bg-white text-black px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform relative z-10">
               Hai să vorbim ↗
             </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}
import { getSortedPostsData } from "../lib/posts";
import HomeClient from "./HomeClient";

export default function Page() {
  const allPostsData = getSortedPostsData();
  
  return (
    <main className="min-h-screen">
      {/* Secțiunea Lead Qualifier AI - Integrată Curat */}
      <section className="w-full py-16 bg-white border-b">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              CapeSystem Lead Qualifier
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Analizăm proiectul tău în 30 de secunde pentru a stabili compatibilitatea cu soluțiile noastre de autonomie totală.
            </p>
          </div>
          
          <form action="/api/qualify" method="POST" className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-slate-700 mb-2 ml-1">Obiectiv Principal</label>
              <select name="goal" className="bg-white border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                <option>Magazin Afiliere</option>
                <option>SaaS</option>
                <option>Optimizare Performanță</option>
                <option>Altul</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-slate-700 mb-2 ml-1">Stadiu Proiect</label>
              <select name="stage" className="bg-white border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                <option>Idee nouă</option>
                <option>Business existent (Migrare)</option>
                <option>Audit tehnic</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-slate-700 mb-2 ml-1">Buget Estimativ</label>
              <select name="budget" className="bg-white border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                <option value="low">&lt; 500€</option>
                <option value="mid">500€ - 1500€</option>
                <option value="high">&gt; 1500€</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-slate-700 mb-2 ml-1">Urgență</label>
              <select name="urgency" className="bg-white border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                <option>Ieri</option>
                <option>2-4 săptămâni</option>
                <option>Doar explorez</option>
              </select>
            </div>

            <button type="submit" className="md:col-span-2 mt-4 bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition-all shadow-md transform active:scale-95">
              Start Analiză Proiect
            </button>
          </form>
        </div>
      </section>

      {/* Blog Feed */}
      <div className="bg-white">
        <HomeClient latestPosts={allPostsData.slice(0, 3)} />
      </div>
    </main>
  );
}
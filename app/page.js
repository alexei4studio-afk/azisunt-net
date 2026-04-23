import { getSortedPostsData } from "../lib/posts";
import HomeClient from "./HomeClient";

export default function Page() {
  // Luăm datele reale prin motorul lib/posts.js
  const allPostsData = getSortedPostsData();
  
  // Returnăm un singur bloc JSX care conține și Formularul și Blogul
  return (
    <main className="min-h-screen bg-white">
      {/* Secțiunea Lead Qualifier AI */}
      <section className="py-12 bg-slate-50 border-b">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
            Califică-ți Proiectul cu CapeSystem AI
          </h2>
          
          <form action="/api/qualify" method="POST" className="grid grid-cols-1 gap-4 bg-white p-8 rounded-xl shadow-md">
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Obiectiv Principal</label>
              <select name="goal" className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Magazin Afiliere</option>
                <option>SaaS</option>
                <option>Optimizare Performanță</option>
                <option>Altul</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Stadiu Proiect</label>
              <select name="stage" className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Idee nouă</option>
                <option>Business existent (Migrare)</option>
                <option>Audit tehnic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Buget Estimativ</label>
              <select name="budget" className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="low">&lt; 500€</option>
                <option value="mid">500€ - 1500€</option>
                <option value="high">&gt; 1500€</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Urgență</label>
              <select name="urgency" className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Ieri</option>
                <option>2-4 săptămâni</option>
                <option>Doar explorez</option>
              </select>
            </div>

            <button type="submit" className="mt-6 bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition shadow-lg active:transform active:scale-95">
              Trimite spre Analiză AI
            </button>
          </form>
        </div>
      </section>

      {/* Secțiunea de Blog (HomeClient) sub formular */}
      <div className="py-8">
        <HomeClient latestPosts={allPostsData.slice(0, 3)} />
      </div>
    </main>
  );
}
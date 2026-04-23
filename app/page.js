import { getSortedPostsData } from "../lib/posts";
import HomeClient from "./HomeClient";

export default function Page() {
  const allPostsData = getSortedPostsData();

  return (
    <main className="min-h-screen bg-white">
      {/* Secțiunea Lead Qualifier AI */}
      <section className="py-12 bg-slate-50 border-b">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Califică-ți Proiectul cu CapeSystem AI</h2>
          <form action="/api/qualify" method="POST" className="grid grid-cols-1 gap-4 bg-white p-6 rounded-lg shadow-sm">
            
            <div>
              <label className="block text-sm font-medium mb-1">Obiectiv Principal</label>
              <select name="goal" className="w-full border p-2 rounded">
                <option>Magazin Afiliere</option>
                <option>SaaS</option>
                <option>Optimizare Performanță</option>
                <option>Altul</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Stadiu Proiect</label>
              <select name="stage" className="w-full border p-2 rounded">
                <option>Idee nouă</option>
                <option>Business existent (Migrare)</option>
                <option>Audit tehnic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Buget Estimativ</label>
              <select name="budget" className="w-full border p-2 rounded">
                <option value="low">&lt; 500€</option>
                <option value="mid">500€ - 1500€</option>
                <option value="high">&gt; 1500€</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Urgență</label>
              <select name="urgency" className="w-full border p-2 rounded">
                <option>Ieri</option>
                <option>2-4 săptămâni</option>
                <option>Doar explorez</option>
              </select>
            </div>

            <button type="submit" className="mt-4 bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition">
              Trimite spre Analiză AI
            </button>
          </form>
        </div>
      </section>

      {/* Blog Feed */}
      <HomeClient latestPosts={allPostsData.slice(0, 3)} />
    </main>
  );
}
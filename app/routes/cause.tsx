import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Charity 2026 - Argentina FC" },
    { name: "description", content: "Welcome to the Charity tournament for 2026" },
  ];
}

export default function Cause() {
  return (
    <div className="space-y-6 max-w-md mx-auto animate-fade-in pb-6">

      {/* Organization Hero Block */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden text-center relative p-6">
        {/* Argentina Flag Motif Border at the top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#74ACDF] via-white to-[#74ACDF]" />

        <span className="text-4xl block mt-4 mb-2">🤝</span>
        <h2 className="text-xl font-black text-slate-800 tracking-tight">
          Asociación Generando Puentes
        </h2>
        <p className="text-xs font-bold uppercase tracking-widest text-[#74ACDF] mt-1">
          Estar • Escuchar • Ser Parte
        </p>

        <p className="text-sm text-slate-500 mt-4 leading-relaxed text-left bg-slate-50 p-4 rounded-xl border border-slate-100">
          Founded in Mendoza, Argentina, <strong>Generando Puentes</strong> is a youth-led NGO dedicated to breaking the cycle of extreme poverty and social exclusion. They work on the ground in vulnerable neighborhoods, creating community networks and connecting kids to real learning and developmental opportunities.
        </p>
      </div>

      {/* Featured Pillar Focus: Puentes Callejeros */}
      <div className="bg-gradient-to-br from-[#74ACDF]/10 to-transparent border border-[#74ACDF]/20 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">🎒</span>
          <h3 className="font-extrabold text-slate-800 text-base">
            Spotlight: Puentes Callejeros
          </h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          One of their primary active programs supports children and teenagers currently in street situations. Volunteers meet them directly in city squares, providing warm meals, emotional support, and mobile educational screens to ensure their fundamental right to learn and play is protected.
        </p>
      </div>

      {/* Core Action Pillars */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">
          Where They Make an Impact
        </h3>

        {/* Pillar 1 */}
        <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm flex gap-4 items-start">
          <span className="text-xl bg-amber-50 p-2 rounded-lg">📚</span>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Education & Skill Building</h4>
            <p className="text-xs text-slate-500 mt-0.5 leading-normal">
              Providing early childhood cognitive stimulation, literacy tutoring, digital learning workshops, and youth employment skills.
            </p>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm flex gap-4 items-start">
          <span className="text-xl bg-emerald-50 p-2 rounded-lg">⚽</span>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Social Inclusion & Sports</h4>
            <p className="text-xs text-slate-500 mt-0.5 leading-normal">
              Organizing community sports, cultural events, mental healthcare support, and targeted anti-bullying and inclusion initiatives.
            </p>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm flex gap-4 items-start">
          <span className="text-xl bg-sky-50 p-2 rounded-lg">🥦</span>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Nutrition & Better Habitat</h4>
            <p className="text-xs text-slate-500 mt-0.5 leading-normal">
              Running vital food security programs, nutritional education, and fostering sustainable community living practices.
            </p>
          </div>
        </div>
      </div>

      {/* Direct Fundraising Call to Action Table */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm text-center relative overflow-hidden">
        {/* Subtle accent flag stripe at the bottom of the page */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#74ACDF] via-white to-[#74ACDF]" />

        <h3 className="font-black text-slate-800 text-sm uppercase tracking-tight mb-1">
          Your Support in Action
        </h3>
        <p className="text-xs text-slate-400 mb-5">
          100% of tournament entry fees, canteen profits, and raffle sales flow directly to funding their Community Agents.
        </p>

        <div className="space-y-4 pb-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            Want to make an even bigger impact? You can support their educational workshops, street programs, and nutrition centers by making an additional personal donation directly to their official campaign channel.
          </p>

          {/* Call to Action Button */}
          <a
            href="https://www.peoplesfundraising.com/fundraising/el-charity-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full bg-[#F6B426] hover:bg-[#e0a11f] text-slate-900 font-black text-sm uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-md transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            💳 Donate via PeopleFundraising
          </a>

          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">
            🔒 Secure Donation Platform
          </span>
        </div>
      </div>


    </div>
  );
}

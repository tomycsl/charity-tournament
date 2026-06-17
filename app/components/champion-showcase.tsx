// app/components/ChampionsShowcase.tsx
import TeamBadge from "./team-badge";

interface ChampionsProps {
  menWinner: string;
  womenWinner: string;
}

export default function ChampionsShowcase({ menWinner, womenWinner }: ChampionsProps) {
  return (
    <div className="bg-gradient-to-b from-amber-500 to-amber-600 rounded-3xl p-6 text-center text-white shadow-xl relative overflow-hidden animate-fade-in my-4">
      {/* Decorative Background Confetti Shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none text-2xl select-none">
        ✨ 🎉 🏆 🌟 🥳 ⭐ 👑
      </div>

      <span className="text-4xl inline-block animate-bounce mb-2">🏆</span>
      <h2 className="text-xl font-black uppercase tracking-widest">
        ¡CAMPEONES 2026!
      </h2>
      <p className="text-amber-100 text-[10px] font-bold uppercase tracking-wider mb-6">
        El Charity Tournament Winners
      </p>

      {/* Grid Layout for the Two Categories */}
      <div className="grid grid-cols-2 gap-4 relative z-10">

        {/* Men's Category Champion Card */}
        <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-4 border border-white/10 flex flex-col items-center space-y-3">
          <span className="text-[10px] font-black tracking-widest text-amber-200 uppercase">
            Torneo Masculino
          </span>
          <div className="w-16 h-16 bg-white rounded-full p-2 shadow-md flex items-center justify-center">
            <TeamBadge teamName={menWinner} className="w-12 h-12" />
          </div>
          <h3 className="text-xs font-black uppercase tracking-wide leading-tight line-clamp-2 min-h-[2rem] flex items-center">
            {menWinner}
          </h3>
        </div>

        {/* Women's Category Champion Card */}
        <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-4 border border-white/10 flex flex-col items-center space-y-3">
          <span className="text-[10px] font-black tracking-widest text-amber-200 uppercase">
            Torneo Femenino
          </span>
          <div className="w-16 h-16 bg-white rounded-full p-2 shadow-md flex items-center justify-center">
            <TeamBadge teamName={womenWinner} className="w-12 h-12" />
          </div>
          <h3 className="text-xs font-black uppercase tracking-wide leading-tight line-clamp-2 min-h-[2rem] flex items-center">
            {womenWinner}
          </h3>
        </div>

      </div>
    </div>
  );
}
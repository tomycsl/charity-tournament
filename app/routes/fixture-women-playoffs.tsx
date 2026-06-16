import { useOutletContext } from 'react-router';
import type { TournamentWorkbook } from '~/types/tournament.types';
import MatchCard from '~/match-card/match-card';

export default function WomenPlayoffsPage() {
  // 1. Pull the typed single-burst data workbook directly from the layout shell context
  const workbook = useOutletContext<TournamentWorkbook>();
  const playoffMatches = workbook.women.playoff;

  // 2. Filter matches out by stage criteria if they share a single flat data tab list
  // (Adjust string matching to match what you input in your spreadsheet's "stage" column)
  const semifinalMatches = playoffMatches.filter(
    (m: any) => m.stage?.toLowerCase().includes('semi') || m.id?.toLowerCase().includes('sf')
  );

  const finalMatch = playoffMatches.find(
    (m: any) => m.stage?.toLowerCase().includes('final') || m.id?.toLowerCase().includes('f')
  );

  return (
    <div className="space-y-6 animate-fade-in pb-6">

      {/* Informative Header Summary Box */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-1.5">
          Women's Knockout Phase
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          The regular group stage is complete. The top 4 qualifying teams battle in single-elimination brackets for the Charity Cup.
        </p>
      </div>

      {/* --- SEMIFINALS STAGE SECTION --- */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 pl-1">
          <span className="text-xs bg-purple-100 text-purple-800 font-black px-2 py-0.5 rounded text-[10px] uppercase tracking-wide">
            Stage 1
          </span>
          <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">
            Semifinals
          </h4>
        </div>

        {semifinalMatches.length === 0 ? (
          <p className="text-center text-xs text-slate-400 bg-slate-50 border border-dashed py-6 rounded-xl font-medium">
            Semifinal fixtures haven't been generated yet.
          </p>
        ) : (
          <div className="space-y-3">
            {semifinalMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                groupLabel={match.id?.toUpperCase() === 'SF1' ? '1st vs 4th' : '2nd vs 3rd'}
              />
            ))}
          </div>
        )}
      </div>

      {/* --- GRAND FINAL STAGE SECTION --- */}
      <div className="space-y-2.5 pt-2">
        <div className="flex items-center gap-2 pl-1">
          <span className="text-xs bg-[#F6B426]/20 text-amber-800 font-black px-2 py-0.5 rounded text-[10px] uppercase tracking-wide">
            Stage 2
          </span>
          <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">
            Gran Final Femenina 🏆
          </h4>
        </div>

        {!finalMatch ? (
          <p className="text-center text-xs text-slate-400 bg-slate-50 border border-dashed py-6 rounded-xl font-medium">
            Awaiting Semifinal winners...
          </p>
        ) : (
          /* Highlighting the Final match card with an extra design lift */
          <div className="relative group">
            {/* Soft decorative glow behind the championship match card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#74ACDF] via-[#F6B426] to-[#74ACDF] rounded-2xl opacity-10 blur-sm transition duration-1000 group-hover:opacity-20 pointer-events-none" />

            <div className="relative">
              <MatchCard match={finalMatch} groupLabel="Championship" />
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
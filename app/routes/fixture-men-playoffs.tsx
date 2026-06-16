import { useOutletContext } from 'react-router';
import MatchCard from '~/match-card/match-card';
import type { TournamentWorkbook } from '~/types/tournament.types';

export default function MenPlayoffsPage() {
  const workbook = useOutletContext<TournamentWorkbook>();
  const playoffMatches = workbook.men.playoff;

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2">
          Men's Final Elimination Tree
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Top 2 from each group + 2 best overall third-placed teams advance to the Quarterfinals.
        </p>
      </div>

      <div className="space-y-3">
        {playoffMatches.map((match: any) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
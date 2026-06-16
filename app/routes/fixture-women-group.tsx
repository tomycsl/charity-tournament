import { useOutletContext } from 'react-router';
import type { TournamentWorkbook } from '~/types/tournament.types';
import MatchCard from '~/match-card/match-card';
import type { Match } from '~/types/tournament.types';

export default function WomenGroupPage() {
  const workbook = useOutletContext<TournamentWorkbook>();

  // Pluck the single group data for women
  const groupData = workbook.women.group;

  return (
    <div className="space-y-5 animate-fade-in">

      {/* Standings Card */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="mb-3 flex justify-between items-start">
          <div>
            <h3 className="font-black text-sm text-slate-800 uppercase tracking-wide text-[#74ACDF]">
              Group Table
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Top 4 teams advance to Semifinals</p>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-100">
            Rule: Top 4
          </span>
        </div>

        {/* Dense Table Layout for Mobile */}
        <div className="overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-2 pl-1 w-8">Pos</th>
                <th className="py-2">Team</th>
                <th className="py-2 text-center w-10">GD</th>
                <th className="py-2 text-center w-10">Pts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium">
              {groupData.standings.map((team, index) => {
                const position = index + 1;
                // Highlight rows 1 through 4 as qualified
                const isQualified = position <= 4;

                return (
                  <tr
                    key={team.Team || index}
                    className={`transition-colors ${isQualified ? 'bg-emerald-50/30 text-slate-900' : 'text-slate-400'}`}
                  >
                    <td className="py-2.5 pl-2 font-mono font-bold">
                      {position}
                    </td>
                    <td className="py-2.5 font-bold truncate max-w-[150px]">
                      {team.Team} {isQualified && <span className="text-emerald-600 ml-1">⭐</span>}
                    </td>
                    <td className="py-2.5 text-center font-mono text-slate-500">
                      {team.GD || 0}
                    </td>
                    <td className="py-2.5 text-center font-mono font-black text-slate-800">
                      {team.Pts || 0}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fixtures List */}
      <div className="space-y-2">
        <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">
          Group Phase Fixtures
        </h4>
        {groupData.fixtures.map((match: Match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
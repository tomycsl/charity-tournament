import { useParams, useOutletContext } from 'react-router';
import type { TournamentWorkbook } from '~/types/tournament.types';
import MatchCard from '~/match-card/match-card';
import type { Match } from '~/types/tournament.types';

export default function MenGroupPage() {
  const { groupId } = useParams<{ groupId: string }>();

  // Convert url parameter token "group-a" to match spreadsheet strings like "Group A"
  const groupFormattedName = groupId?.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase());

  const workbook = useOutletContext<TournamentWorkbook>();
  const activeGroup = workbook.men.groups.find((g) => g.name === groupFormattedName);

  if (!activeGroup) {
    return <p className="text-center text-xs text-slate-400 py-6">Group data not found.</p>;
  }

  return (
    <div className="space-y-5 animate-fade-in">

      {/* Qualification Quick Context Banner */}
      <div className="bg-slate-50 border border-slate-200/60 p-3 rounded-xl text-[11px] text-slate-600 leading-relaxed flex gap-2">
        <span>ℹ️</span>
        <p>
          <strong>Format:</strong> Top 2 teams qualify automatically (<span className="text-emerald-700 font-bold">✓</span>). The 2 best third-place teams across Groups A, B, and C also advance to Quarterfinals (<span className="text-amber-700 font-bold">⏳</span>).
        </p>
      </div>

      {/* Standings Table Card */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="font-black text-sm text-slate-800 mb-3 border-b pb-1.5 uppercase tracking-wide text-[#74ACDF]">
          {activeGroup.name} Table
        </h3>

        <div className="overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                <th className="pb-2 pl-1 w-8">Pos</th>
                <th className="pb-2">Team</th>
                <th className="pb-2 text-center w-10">GD</th>
                <th className="pb-2 text-center w-10">Pts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium">
              {activeGroup.standings.map((team, index) => {
                const position = index + 1;

                // Styles mapping based on qualification rules
                let rowBgClass = "text-slate-400";
                let statusIcon = null;

                if (position <= 2) {
                  rowBgClass = "bg-emerald-50/30 text-slate-900"; // Top 2 absolute qualification
                  statusIcon = <span className="text-emerald-600 ml-1 font-bold">✓</span>;
                } else if (position === 3) {
                  rowBgClass = "bg-amber-50/30 text-slate-800 font-semibold"; // Bubble position
                  statusIcon = <span className="text-amber-600 ml-1 font-bold">⏳</span>;
                }

                return (
                  <tr key={team.Team || index} className={`transition-colors ${rowBgClass}`}>
                    <td className="py-2.5 pl-2 font-mono font-bold">{position}</td>
                    <td className="py-2.5 font-bold truncate max-w-[150px]">
                      {team.Team} {statusIcon}
                    </td>
                    <td className="py-2.5 text-center font-mono text-slate-500">{team.GD || 0}</td>
                    <td className="py-2.5 text-center font-mono font-black text-slate-800">{team.Pts || 0}</td>
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
          Group Fixtures & Results
        </h4>
        {activeGroup.fixtures.map((match: Match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
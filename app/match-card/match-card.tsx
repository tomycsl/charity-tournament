import type { Match } from "~/types/tournament.types";

interface MatchCardProps {
  match: Match;
  groupLabel?: string;
}

export default function MatchCard({ match, groupLabel }: MatchCardProps) {
  // Automatically calculate game status based on whether scores are entered
  const isPlayed = match.scoreHome !== undefined && match.scoreHome !== "" &&
    match.scoreAway !== undefined && match.scoreAway !== "";

  // Helper to extract the core numeric score for win/loss highlighting
  const getNumericScore = (scoreStr: string) => {
    if (!scoreStr) return 0;
    // Cleans strings like "1 (3)" down to just "1" for calculation comparisons
    const coreNumber = scoreStr.split(' ')[0];
    return parseInt(coreNumber, 10) || 0;
  };

  const numscoreHome = getNumericScore(match.scoreHome);
  const numscoreAway = getNumericScore(match.scoreAway);

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden transition-all hover:border-slate-200">

      {/* Top Status Accent Line */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${isPlayed ? 'bg-slate-200' : 'bg-[#74ACDF]/40'}`} />

      {/* Card Metadata Header */}
      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2.5">
        <div className="flex items-center gap-1.5 truncate">
          <span>{match.time}</span>
          <span>•</span>
          <span className="text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
            {match.pitch}
          </span>
          {groupLabel && (
            <>
              <span>•</span>
              <span className="text-slate-500 truncate">{groupLabel}</span>
            </>
          )}
        </div>

        {/* Dynamic Display State Badge */}
        <span className={`px-2 py-0.5 rounded text-[9px] font-black tracking-widest border ${isPlayed
          ? 'bg-slate-100 text-slate-500 border-slate-200'
          : 'bg-slate-50 text-slate-400 border-slate-100'
          }`}>
          {isPlayed ? 'FT' : 'Upcoming'}
        </span>
      </div>

      {/* scoreAwayoard Grid Row */}
      <div className="grid grid-cols-7 items-center text-sm font-bold text-slate-800">

        {/* Team A Column Layout */}
        <div className={`text-[11px] col-span-2 text-right truncate flex flex-col items-end ${isPlayed && numscoreHome < numscoreAway ? 'text-slate-400 font-medium' : 'text-slate-800'}`}>
          <span>{match.home}</span>
          {/* Optional separate penalty sub-label */}
          {isPlayed && match.penaltiesA && (
            <span className="text-[10px] font-bold text-amber-600 font-mono">({match.penaltiesA} pen)</span>
          )}
        </div>

        {/* Central Score Display Box */}
        <div className="col-span-3 text-center mx-2">
          {!isPlayed ? (
            <span className="inline-block bg-slate-50 border border-slate-100 text-slate-400 text-xs font-mono font-bold py-1 px-3 rounded-lg min-w-[55px]">
              VS
            </span>
          ) : (
            <div className="inline-block bg-slate-50 border border-slate-100 text-slate-700 font-mono text-xs font-black py-1 px-2.5 rounded-lg min-w-[65px] shadow-sm select-none">
              {match.scoreHome} : {match.scoreAway}
            </div>
          )}
        </div>

        {/* Team B Column Layout */}
        <div className={`text-[11px] col-span-2 text-left truncate flex flex-col items-start ${isPlayed && numscoreAway < numscoreHome ? 'text-slate-400 font-medium' : 'text-slate-800'}`}>
          <span>{match.away}</span>
          {/* Optional separate penalty sub-label */}
          {isPlayed && match.penaltiesB && (
            <span className="text-[10px] font-bold text-amber-600 font-mono">({match.penaltiesB} pen)</span>
          )}
        </div>

      </div>
    </div>
  );
}
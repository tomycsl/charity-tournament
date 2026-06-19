import {
  NavLink,
  useLoaderData
} from "react-router";
import { TournamentProvider } from "~/context/tournament-context";
import type { Match, TeamMap, FoodItem, TimelineEvent } from "~/types/tournament.types";

export async function clientLoader() {
  const sheetId = import.meta.env.VITE_SPREADSHEET_ID;
  const apiKey = import.meta.env.VITE_API_KEY;

  const ranges = [
    "Women Group A!B3:I8",   // 0: Women Standings Table
    "Women Group A!L2:Q12",  // 1: Women Group Fixtures
    "Men Group A!B3:I7",     // 2: Men Group A Standings Table
    "Men Group A!L2:Q8",     // 3: Men Group A Fixtures
    "Men Group B!B3:I7",     // 4: Men Group B Standings Table
    "Men Group B!L2:Q8",     // 5: Men Group B Fixtures
    "Men Group C!B3:I7",     // 6: Men Group C Standings Table
    "Men Group C!L2:Q8",     // 7: Men Group C Fixtures
    "Playoffs!V2:AE9",       // 8: Men Playoffs
    "Playoffs!V14:AE17",     // 9: Women Playoffs
    "Teams!A1:B18",          // 10: Team Names & Badge Mappings
    "Playoffs!K11:M12",      // 11: Men Playoffs Champion
    "Playoffs!G28:I29",      // 12: Women Playoffs Champion
    "Raised!A1:A1",          // 13: Total raised
    "Food Menu!A1:C30",      // 14: Food Menu
    "Timeline!A1:C30"        // 15: Timeline
  ];

  const rangeParams = ranges.map(r => `ranges=${encodeURIComponent(r)}`).join('&');
  const URL = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchGet?${rangeParams}&key=${apiKey}`;

  const response = await fetch(URL);
  const data = await response.json();

  // valueRanges will contain an array of objects corresponding to your ranges array order
  const valueRanges = data.valueRanges;

  // Helper utility to convert raw Sheet matrix arrays into cleaner objects
  const parseSheetMatrix = (rows: string[][]) => {
    if (!rows || rows.length === 0) return [];
    const headers = rows[0];
    return rows.slice(1).map((row, idx) => {
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || "";
      });
      return obj;
    });
  };

  const parseTeamMap = (rows: string[][]): TeamMap => {
    const map: TeamMap = {};
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row && row[0] && row[1]) {
        const teamName = row[0].trim();
        const badgeFile = row[1].trim();
        if (teamName) {
          map[teamName] = badgeFile;
        }
      }
    }

    return map;
  };

  const parseChampion = (rows: string[][]): string => {
    if (!rows || rows.length === 0) return "";
    const [teamA, teamB] = rows;

    if (teamA.length < 2) return '';

    if (teamA[1] > teamB[1]) {
      return teamA[0];
    } else if (teamB[1] > teamA[1]) {
      return teamB[0];
    } else if (teamA[2] > teamB[2]) {
      return teamA[0];
    } else {
      return teamB[0];
    }
  };

  return {
    fixtureData: {
      teamMap: parseTeamMap(valueRanges[10].values),
      women: {
        group: {
          name: "Women's Group",
          standings: parseSheetMatrix(valueRanges[0].values), // Adjust ranges based on your row counts
          fixtures: parseSheetMatrix(valueRanges[1].values) as Match[]
        },
        playoff: parseSheetMatrix(valueRanges[9].values) as Match[],
        champion: parseChampion(valueRanges[12].values) as string
      },
      men: {
        groups: [
          {
            name: "Group A",
            standings: parseSheetMatrix(valueRanges[2].values),
            fixtures: parseSheetMatrix(valueRanges[3].values) as Match[]
          },
          {
            name: "Group B",
            standings: parseSheetMatrix(valueRanges[4].values),
            fixtures: parseSheetMatrix(valueRanges[5].values) as Match[]
          },
          {
            name: "Group C",
            standings: parseSheetMatrix(valueRanges[6].values),
            fixtures: parseSheetMatrix(valueRanges[7].values) as Match[]
          },
        ],
        playoff: parseSheetMatrix(valueRanges[8].values) as Match[],
        champion: parseChampion(valueRanges[11].values) as string
      }
    },
    foodMenu: {
      items: parseSheetMatrix(valueRanges[14].values) as FoodItem[]
    },
    raisedData: {
      totalRaised: valueRanges[13].values[0][0]
    },
    timeline: {
      events: parseSheetMatrix(valueRanges[15].values) as TimelineEvent[]
    }
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { fixtureData, foodMenu, raisedData, timeline } = useLoaderData<typeof clientLoader>();

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center gap-0.5 transition-colors ${isActive ? 'text-emerald-600 font-bold' : 'text-slate-400 font-medium'
    }`;

  return (
    <TournamentProvider data={{
      fixtureData,
      foodMenu,
      raisedData: raisedData,
      timeline
    }}>
      <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans">
        {/* Header Banner in Argentina Albiceleste Colors */}
        <header className="relative bg-gradient-to-b from-[#74ACDF] via-[#74ACDF] to-white px-6 pt-6 pb-8 text-center shadow-sm border-b-4 border-[#F6B426]">
          {/* Absolute centered Sun emblem decoration pattern behind text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none overflow-hidden">
            <span className="text-8xl">☀️</span>
          </div>

          <div className="relative z-10">
            <h1 className="text-2xl font-black tracking-tight uppercase text-slate-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              Charity 2026
            </h1>

            <p className="inline-block bg-[#F6B426] text-slate-900 text-[10px] font-black uppercase tracking-widest mt-2 px-3 py-1 rounded-full shadow-sm border border-white">
              Playing for Generando Puentes
            </p>
          </div>
        </header>

        <main className="max-w-md mx-auto p-4">
          {children}
        </main>

        {/* Persistent Bottom Mobile Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 h-16 flex items-center justify-around px-2 shadow-lg max-w-md mx-auto z-50">
          <NavLink to="/" className={navItemClass}>
            <span className="text-lg">🏠</span>
            <span className="text-[10px] tracking-tight">Home</span>
          </NavLink>

          <NavLink to="/fixture/men/group-a" className={navItemClass}>
            <span className="text-lg">⚽</span>
            <span className="text-[10px] tracking-tight">Fixtures</span>
          </NavLink>

          <NavLink to="/timeline" className={navItemClass}>
            <span className="text-lg">🗓️</span>
            <span className="text-[10px] tracking-tight">Timeline</span>
          </NavLink>

          <NavLink to="/canteen" className={navItemClass}>
            <span className="text-lg">🍔</span>
            <span className="text-[10px] tracking-tight">Canteen</span>
          </NavLink>

          <NavLink to="/cause" className={navItemClass}>
            <span className="text-lg">❤️</span>
            <span className="text-[10px] tracking-tight">Cause</span>
          </NavLink>
        </nav>
      </div>
    </TournamentProvider>
  );
}
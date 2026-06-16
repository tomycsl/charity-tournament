import { Outlet, NavLink, useLocation, useLoaderData } from 'react-router';
import { type TournamentWorkbook, type Match } from '../types/tournament.types';

export async function loader(): Promise<TournamentWorkbook> {
  const SPREADSHEET_ID = "12tGswY3H541_NTCQJPslBS93IscO3UnX__sje1Bc69Q";
  const API_KEY = "AIzaSyBqMQJPxjmapeDtXB8RD-TIx0Oj7riM_Rk";

  // Define every single range/tab name you need to fetch from the sheet
  const ranges = [
    "Women Group A!B3:I8",  // 0: Women Standings Table
    "Women Group A!L2:Q12",  // 1: Women Group Fixtures
    "Men Group A!B3:I7",   // 2: Men Group A Standings Table
    "Men Group A!L2:Q8",   // 3: Men Group A Fixtures
    "Men Group B!B3:I7",   // 4: Men Group B Standings Table
    "Men Group B!L2:Q8",   // 5: Men Group B Fixtures
    "Men Group C!B3:I7",   // 6: Men Group C Standings Table
    "Men Group C!L2:Q8",   // 7: Men Group C Fixtures
    "Playoffs!V2:AE9",     // 8: Men Playoffs
    "Playoffs!V14:AE17"     // 9: Women Playoffs
  ];

  const rangeParams = ranges.map(r => `ranges=${encodeURIComponent(r)}`).join('&');
  const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values:batchGet?${rangeParams}&key=${API_KEY}`;

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

  // --- Map your raw tab data into our structural state layout ---
  return {
    women: {
      group: {
        name: "Women's Group",
        standings: parseSheetMatrix(valueRanges[0].values), // Adjust ranges based on your row counts
        fixtures: parseSheetMatrix(valueRanges[1].values) as Match[]
      },
      playoff: parseSheetMatrix(valueRanges[9].values) as Match[] // Women Playoffs
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
      playoff: parseSheetMatrix(valueRanges[8].values) as Match[] // Quarterfinals grid matrix
    }
  };
}

export default function FixturesLayout() {
  const workbookData = useLoaderData() as TournamentWorkbook;
  const location = useLocation();
  const isMen = location.pathname.includes('/men');

  const tabClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isActive ? 'bg-slate-800 text-white' : 'bg-white text-slate-500 border border-slate-200'
    }`;

  return (
    <div className="space-y-4">
      {/* High-Level Gender Selector Toggles */}
      <div className="flex bg-slate-200 p-1 rounded-xl">
        <NavLink
          to="fixture/men/group-a"
          className={`flex-1 py-2 text-center text-xs font-black uppercase tracking-wider rounded-lg transition-all ${isMen ? 'bg-[#74ACDF] text-white shadow-sm' : 'text-slate-500'
            }`}
        >
          Men's Cup
        </NavLink>
        <NavLink
          to="fixture/women/group"
          className={`flex-1 py-2 text-center text-xs font-black uppercase tracking-wider rounded-lg transition-all ${!isMen ? 'bg-[#74ACDF] text-white shadow-sm' : 'text-slate-500'
            }`}
        >
          Women's Cup
        </NavLink>
      </div>

      {/* Secondary Contextual Tab Strip */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {isMen ? (
          <>
            <NavLink to="fixture/men/group-a" className={tabClass}>Group A</NavLink>
            <NavLink to="fixture/men/group-b" className={tabClass}>Group B</NavLink>
            <NavLink to="fixture/men/group-c" className={tabClass}>Group C</NavLink>
            <NavLink to="fixture/men/playoffs" className={tabClass}>🏆 Playoffs</NavLink>
          </>
        ) : (
          <>
            <NavLink to="fixture/women/group" className={tabClass}>Group Stage</NavLink>
            <NavLink to="fixture/women/playoffs" className={tabClass}>🏆 Playoffs</NavLink>
          </>
        )}
      </div>

      {/* 2. Render child routes and inject the workbook data context safely */}
      <div className="mt-2">
        <Outlet context={workbookData} />
      </div>
    </div>
  );
}
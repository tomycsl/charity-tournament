import { Outlet, NavLink, useLocation } from 'react-router';
import { TeamProvider } from '~/context/team-context';
import ChampionsShowcase from '~/components/champion-showcase';
import { useTournament } from '~/context/tournament-context';

export default function FixturesLayout() {
  const { fixtureData } = useTournament();
  const location = useLocation();
  const isMen = location.pathname.includes('/men');

  const tabClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isActive ? 'bg-slate-800 text-white' : 'bg-white text-slate-500 border border-slate-200'
    }`;

  return (
    <TeamProvider teams={fixtureData?.teamMap}>
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

        {/* ChampionShowcase */}
        {(fixtureData?.men.champion || fixtureData?.women.champion) && <ChampionsShowcase
          menWinner={fixtureData?.men.champion}
          womenWinner={fixtureData?.women.champion}
        />}

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
          <Outlet context={fixtureData} />
        </div>
      </div>
    </TeamProvider>
  );
}
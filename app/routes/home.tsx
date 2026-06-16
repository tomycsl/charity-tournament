import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Link } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Charity 2026 - Argentina FC" },
    { name: "description", content: "Welcome to the Charity tournament for 2026" },
  ];
}

export default function Home() {
  return (
    <div className="space-y-6 max-w-md mx-auto animate-fade-in">

      {/* Welcome Card Box */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-center relative overflow-hidden">
        {/* Subtle accent flag stripe at top of card */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#74ACDF]" />

        <h2 className="text-xl font-black text-slate-800 tracking-tight mt-2">
          Bienvenido al Torneo!
        </h2>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
          Welcome to the annual Charity Tournament. Track your group positions, check upcoming fixtures, and review the food stand menu directly from your phone all day.
        </p>
      </div>

      {/* Real-time Status Alert Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
        <span className="text-2xl animate-bounce">📢</span>
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-amber-800">
            Live Tournament Status
          </h4>
          <p className="text-sm font-medium text-amber-900 mt-0.5">
            Group Stages are currently active. Check the fixtures tab for pitch assignments.
          </p>
        </div>
      </div>

      {/* Quick Dashboard Info Metrics Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-slate-100 p-3 rounded-xl text-center shadow-sm">
          <span className="text-xl block mb-1">🏃‍♂️</span>
          <span className="block font-black text-slate-800 text-lg">17</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Teams</span>
        </div>
        <div className="bg-white border border-slate-100 p-3 rounded-xl text-center shadow-sm">
          <span className="text-xl block mb-1">🥅</span>
          <span className="block font-black text-slate-800 text-lg">5</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Pitches</span>
        </div>
        <div className="bg-white border border-slate-100 p-3 rounded-xl text-center shadow-sm">
          <span className="text-xl block mb-1">🍔</span>
          <span className="block font-black text-slate-800 text-lg">£5000</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Raised</span>
        </div>
      </div>

      {/* Main Navigation Matrix Blocks */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">
          Quick Access Dashboard
        </h3>

        {/* Button 1: Fixtures */}
        <Link
          to="/fixture/men/group-a"
          className="flex items-center justify-between bg-white hover:bg-slate-50 border border-slate-100 p-4 rounded-xl shadow-sm transition-all group"
        >
          <div className="flex items-center gap-4">
            <span className="text-2xl bg-[#74ACDF]/10 p-2 rounded-lg">⚽</span>
            <div className="text-left">
              <h4 className="font-bold text-slate-800 text-sm">Fixtures & Standings</h4>
              <p className="text-xs text-slate-400">Live scores, groups, and playoff brackets</p>
            </div>
          </div>
          <span className="text-slate-300 group-hover:text-[#74ACDF] font-bold transition-colors">→</span>
        </Link>

        {/* Button 2: Timeline */}
        <Link
          to="/timeline"
          className="flex items-center justify-between bg-white hover:bg-slate-50 border border-slate-100 p-4 rounded-xl shadow-sm transition-all group"
        >
          <div className="flex items-center gap-4">
            <span className="text-2xl bg-amber-500/10 p-2 rounded-lg">🗓️</span>
            <div className="text-left">
              <h4 className="font-bold text-slate-800 text-sm">Event Schedule</h4>
              <p className="text-xs text-slate-400">Timetable, speech breaks, and ceremonies</p>
            </div>
          </div>
          <span className="text-slate-300 group-hover:text-[#F6B426] font-bold transition-colors">→</span>
        </Link>

        {/* Button 3: Canteen */}
        <Link
          to="/canteen"
          className="flex items-center justify-between bg-white hover:bg-slate-50 border border-slate-100 p-4 rounded-xl shadow-sm transition-all group"
        >
          <div className="flex items-center gap-4">
            <span className="text-2xl bg-emerald-500/10 p-2 rounded-lg">🍔</span>
            <div className="text-left">
              <h4 className="font-bold text-slate-800 text-sm">Food & Drinks Bar</h4>
              <p className="text-xs text-slate-400">Menu prices for the charity grill tent</p>
            </div>
          </div>
          <span className="text-slate-300 group-hover:text-emerald-500 font-bold transition-colors">→</span>
        </Link>
      </div>

      {/* Footer Branding Credit Label */}
      <p className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-300 pt-4">
        Powered by Google Sheets & React
      </p>
    </div>
  );
}

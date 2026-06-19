import type { Route } from "./+types/home";
import Papa from 'papaparse';
import type { FoodItem } from "../types/tournament.types";
import { useTournament } from "~/context/tournament-context";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Charity 2026 - Argentina FC" },
    { name: "description", content: "Welcome to the Charity tournament for 2026" },
  ];
}

export default function Canteen() {
  const { foodMenu } = useTournament();

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
      <h2 className="text-lg font-bold mb-1 text-slate-800">Food & Drinks Menu</h2>
      <p className="text-xs text-slate-400 mb-4">100% of proceeds go directly to our charity partner.</p>

      <div className="divide-y divide-slate-100">

        {foodMenu.items.map((menu, index) => (
          <div key={index} className="flex justify-between py-3">
            <div>
              <h3 className="text-sm font-bold text-slate-800">{menu.item}</h3>
              <span className="text-[10px] uppercase bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-semibold">
                {menu.category}
              </span>
            </div>
            <span className="font-mono font-bold text-emerald-600">{menu.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

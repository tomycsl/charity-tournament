import { useLoaderData } from "react-router";
import type { Route } from "./+types/home";
import Papa from 'papaparse';

interface MenuItem {
  item: string;
  category: string;
  price: string;
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Charity 2026 - Argentina FC" },
    { name: "description", content: "Welcome to the Charity tournament for 2026" },
  ];
}

export async function clientLoader() {
  const MENU_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRLWTwqaGJ0x1frdwUY_f9MeUjNchwk-rved49nv--GyIjotENFWZ7ED5HBnieFwVz4o43YKKhXFDcx/pub?gid=1199963315&single=true&output=csv";
  const response = await fetch(MENU_CSV_URL);
  const rawText = await response.text();

  const parsed = Papa.parse(rawText, {
    header: true,
    skipEmptyLines: true
  });

  return parsed.data;
}

export default function Canteen() {
  const menuItems = useLoaderData() as MenuItem[];

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
      <h2 className="text-lg font-bold mb-1 text-slate-800">Food & Drinks Menu</h2>
      <p className="text-xs text-slate-400 mb-4">100% of proceeds go directly to our charity partner.</p>

      <div className="divide-y divide-slate-100">

        {menuItems.map((menu, index) => (
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

import { useLoaderData } from "react-router";
import type { Route } from "./+types/home";
import Papa from 'papaparse';

export interface TimelineEvent {
  item: string;
  time: string;
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Charity 2026 - Argentina FC" },
    { name: "description", content: "Welcome to the Charity tournament for 2026" },
  ];
}

export async function loader() {
  const MATCHES_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRLWTwqaGJ0x1frdwUY_f9MeUjNchwk-rved49nv--GyIjotENFWZ7ED5HBnieFwVz4o43YKKhXFDcx/pub?gid=457745355&single=true&output=csv";
  const response = await fetch(MATCHES_CSV_URL);
  const rawText = await response.text();

  const parsed = Papa.parse(rawText, {
    header: true,
    skipEmptyLines: true
  });

  return parsed.data;
}

export default function Timeline() {
  const scheduleItems = useLoaderData() as TimelineEvent[];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 max-w-md mx-auto">
      {/* Header Context Section */}
      <div className="mb-6">
        <h2 className="text-xl font-black tracking-tight text-slate-800 flex items-center gap-2">
          🗓️ Event Timeline
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Keep an eye on the schedule throughout the day. Match times depend directly on timeline punctuality!
        </p>
      </div>

      {/* The Timeline Tree */}
      <div className="relative border-l-2 border-slate-100 pl-5 ml-2.5 space-y-6">
        {scheduleItems.map((event, index) => {
          // Subtle color accent changes to draw attention to lunchtime / tournament kickoffs
          const isSpecialEvent =
            event.item.toLowerCase().includes('begins') ||
            event.item.toLowerCase().includes('awards');

          return (
            <div key={index} className="relative group transition-all">

              {/* Timeline Connector Node Indicator */}
              <div
                className={`absolute -left-[27px] top-1.5 w-3 h-3 rounded-full border-2 bg-white transition-colors duration-300 ${isSpecialEvent
                    ? 'border-amber-500 ring-4 ring-amber-50'
                    : 'border-emerald-500 group-hover:bg-emerald-500'
                  }`}
              />

              {/* Event Content Block */}
              <div className="flex flex-col gap-0.5">
                {/* Time Stamp */}
                <time className={`font-mono text-xs font-bold tracking-wider ${isSpecialEvent ? 'text-amber-600' : 'text-slate-400'
                  }`}>
                  {event.time}
                </time>

                {/* Event Name String */}
                <h3 className={`text-sm font-bold tracking-tight transition-colors ${isSpecialEvent ? 'text-slate-900 text-base font-extrabold' : 'text-slate-700'
                  }`}>
                  {event.item}
                </h3>
              </div>

            </div>
          );
        })}
      </div>

      {/* Charity Subtitle Reminder Footer */}
      <div className="mt-8 pt-4 border-t border-slate-100 text-center">
        <span className="inline-block bg-emerald-50 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          ❤️ Raffle Draw Announcement at 18:00
        </span>
      </div>
    </div>
  );
}

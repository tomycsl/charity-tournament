import { useState } from "react";

type RuleCategory = "dynamics" | "fouls" | "timing" | "discipline";

export default function RulesPage() {
    const [activeTab, setActiveTab] = useState<RuleCategory>("dynamics");

    const tabs: { id: RuleCategory; label: string; icon: string }[] = [
        { id: "dynamics", label: "Game Play", icon: "⚽" },
        { id: "fouls", label: "Fouls & Kicks", icon: "🛑" },
        { id: "timing", label: "Timing & Points", icon: "⏱️" },
        { id: "discipline", label: "Discipline", icon: "🟨" },
    ];

    return (
        <div className="max-w-md mx-auto bg-slate-50 min-h-screen pb-12 animate-fade-in">
            {/* Header Banner */}
            <div className="bg-slate-900 text-white p-6 rounded-b-3xl shadow-md text-center space-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-radial-gradient from-slate-800 to-slate-900 opacity-50 pointer-events-none" />
                <img
                    src="/favicon.ico"
                    alt="Argentina F.C."
                    className="w-16 h-16 mx-auto bg-white rounded-full p-1 shadow-inner relative z-10"
                />
                <h1 className="text-xl font-black uppercase tracking-wider relative z-10">
                    EL CHARITY 2026
                </h1>
                <p className="text-xs font-bold text-[#74ACDF] uppercase tracking-widest relative z-10">
                    Official Tournament Rulebook
                </p>
            </div>

            {/* Horizontal Category Navigation Tab Bar */}
            <div className="flex gap-1.5 overflow-x-auto px-4 py-4 scrollbar-none">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider border transition-all shrink-0 select-none ${activeTab === tab.id
                                ? "bg-slate-900 text-white border-slate-900 shadow-sm scale-105"
                                : "bg-white text-slate-500 border-slate-200/60 hover:bg-slate-100"
                            }`}
                    >
                        <span>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Dynamic Rule Content Grid Viewports */}
            <div className="px-4 space-y-4">

                {/* CATEGORY 1: GAME DYNAMICS */}
                {activeTab === "dynamics" && (
                    <div className="space-y-3">
                        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3.5">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b pb-1.5">
                                Match Structure & Pitch Rules
                            </h3>
                            <ul className="space-y-3 text-xs text-slate-700 font-medium">
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#74ACDF] font-bold">⏱️</span>
                                    <span><strong>Duration:</strong> 20 minutes (two 10-minute halves) with a 2-minute half-time break. No side changes.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#74ACDF] font-bold">🔄</span>
                                    <span><strong>Substitutions:</strong> Unlimited roll-in/roll-out allowed. Substituted players can return, but the game <strong>must stop</strong> to make a switch.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#74ACDF] font-bold">👣</span>
                                    <span><strong>Throw-ins:</strong> Executed strictly with the <strong>foot</strong> and can be delivered directly into the box area.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#74ACDF] font-bold">🧤</span>
                                    <span><strong>Goalkeepers:</strong> Free to leave the box area and traverse anywhere on the pitch.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#74ACDF] font-bold">❌</span>
                                    <span><strong>Offside:</strong> There is absolutely no offside rule.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#74ACDF] font-bold">⚽</span>
                                    <span><strong>Goals:</strong> Can be legal and scored from anywhere on the pitch. Opponent players are fully allowed inside your team's box.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* CATEGORY 2: FOULS & FREE KICKS */}
                {activeTab === "fouls" && (
                    <div className="space-y-3">
                        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3.5">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b pb-1.5">
                                Kicks, Barriers & Penalty Parameters
                            </h3>
                            <ul className="space-y-3 text-xs text-slate-700 font-medium">
                                <li className="flex items-start gap-2.5">
                                    <span className="text-red-500 font-bold">🛑</span>
                                    <span><strong>Sliding Tackles:</strong> 🚨 <strong>Strictly Forbidden.</strong> It is forbidden to slide at any moment near an opponent regardless of contact. Doing so awards an indirect free kick to the rival.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-amber-500 font-bold">🛡️</span>
                                    <span><strong>Indirect Rule:</strong> All free kicks are indirect, <strong>except</strong> those committed inside your opponent's box area.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-blue-500 font-bold">🎯</span>
                                    <span><strong>Area Infractions:</strong> All free kicks inside the rival area are automatically executed as a <strong>Penalty Kick</strong>.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-slate-500 font-bold">🚫</span>
                                    <span><strong>GK Pass-Back:</strong> After receiving a direct foot-pass from a teammate, the goalkeeper <strong>cannot</strong> handle the ball with their hands. If they do, a penalty is awarded.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-slate-500 font-bold">📏</span>
                                    <span><strong>Wall Distance:</strong> Defending barriers must respect a minimum distance boundary of <strong>3 metres</strong> around the ball.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-slate-500 font-bold">🏁</span>
                                    <span><strong>Penalty Execution:</strong> Taken from the penalty spot (or 5 steps from the goal line). Stance must be standing with at least one foot remaining firmly on the ground. GK must keep one foot on the line.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* CATEGORY 3: TIMING, POINTS & PLAYOFFS */}
                {activeTab === "timing" && (
                    <div className="space-y-3">
                        {/* Arrival Rules */}
                        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b pb-1.5">
                                Punctuality & Minimums
                            </h3>
                            <div className="space-y-2 text-xs font-medium text-slate-700">
                                <p>• <strong>Minimum to Start:</strong> A team must present at least <strong>3 players</strong> on the pitch, otherwise a 3-0 Walk-Over loss is declared.</p>
                                <p>• <strong>5-Minute Delay:</strong> Game starts with a <strong>0-3 deficit</strong> against the late team.</p>
                                <p>• <strong>10-Minute Delay:</strong> Direct <strong>Walk-Over (WO)</strong> resulting in an automatic 3-0 defeat.</p>
                            </div>
                        </div>

                        {/* Group Tie-Breakers */}
                        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b pb-1.5">
                                Points & Group Tie-Breakers
                            </h3>
                            <p className="text-[11px] text-slate-500">Wins grant 3 pts, Draws 1 pt, and Defeats 0 pts. If level on points, criteria follows:</p>
                            <ol className="list-decimal list-inside text-xs font-bold text-slate-700 space-y-1">
                                <li>Goal Difference (<span className="font-mono text-slate-500 font-medium">GD</span>)</li>
                                <li>Goals in Favour (<span className="font-mono text-slate-500 font-medium">GF</span>)</li>
                                <li>Draw by the tournament organisation</li>
                            </ol>
                        </div>

                        {/* Playoff Shootout */}
                        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b pb-1.5">
                                Playoff Decider Shootouts
                            </h3>
                            <p className="text-xs text-slate-700 font-medium leading-relaxed">
                                If tied at full-time, a sudden death penalty shootout takes place. Each team shoots <strong>1 penalty per round</strong> alternating at the same goal until a difference is established. Only players who logged <strong>at least 1 minute of game time</strong> are eligible to shoot.
                            </p>
                        </div>
                    </div>
                )}

                {/* CATEGORY 4: DISCIPLINE & SANCTIONS */}
                {activeTab === "discipline" && (
                    <div className="space-y-3">
                        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b pb-1.5">
                                Card Violations Matrix
                            </h3>

                            <div className="space-y-2.5">
                                {/* Yellow Matrix */}
                                <div className="border border-amber-100 bg-amber-50/20 rounded-xl p-3 space-y-1.5">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-3 h-4 bg-amber-400 rounded-sm inline-block shadow-sm" />
                                        <span className="text-xs font-black uppercase tracking-wider text-amber-800">Yellow Card = 2-Min Suspension</span>
                                    </div>
                                    <ul className="text-[11px] font-semibold text-slate-600 list-disc list-inside space-y-0.5">
                                        <li>Accumulating 4 fouls in a single match</li>
                                        <li>Excessive use of physical force</li>
                                        <li>Handball interrupting a clear goal chance</li>
                                        <li>Diving/Simulation or Delaying resumption of play</li>
                                    </ul>
                                </div>

                                {/* Red Matrix */}
                                <div className="border border-red-100 bg-red-50/20 rounded-xl p-3 space-y-1.5">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-3 h-4 bg-red-500 rounded-sm inline-block shadow-sm" />
                                        <span className="text-xs font-black uppercase tracking-wider text-red-800">Red Card = Tournament Expulsion</span>
                                    </div>
                                    <ul className="text-[11px] font-semibold text-slate-600 list-disc list-inside space-y-0.5">
                                        <li>Receiving a 2nd yellow card in the same match</li>
                                        <li>Verbal or Physical assault on anyone</li>
                                        <li>Blatant lack of intention to play the ball</li>
                                        <li>Any other unsportsmanlike conduct</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-slate-100 p-2.5 rounded-xl text-[10px] text-slate-500 font-medium italic leading-normal text-center">
                                📢 "Any unsportsmanlike behaviour not described explicitly remains entirely at the joint discretion of the referee and organising committee."
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* Footer Support Anchor */}
            <div className="mt-6 text-center">
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                    Questions? Contact Pira via the WhatsApp Referees group
                </p>
            </div>
        </div>
    );
}
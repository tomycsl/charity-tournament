import React from "react";

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = "Loading tournament data..." }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-sm transition-all duration-300 animate-fade-in">
      <div className="bg-white/95 border border-slate-100 p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-xs w-full mx-4 text-center transform scale-100 transition-all">
        {/* Animated Custom Loader with Argentina Themed Colors */}
        <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
          {/* Outer Rotating Sky Blue Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-[#74ACDF] border-b-[#74ACDF] animate-spin"></div>
          
          {/* Inner Counter-Rotating Sun Gold Ring */}
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-l-[#F6B426] border-r-[#F6B426] animate-[spin_1.5s_linear_infinite_reverse]"></div>
          
          {/* Pulsing Soccer Ball / Sun in the Center */}
          <div className="text-3xl animate-[pulse_1.2s_ease-in-out_infinite] select-none">
            ⚽
          </div>
        </div>

        <h3 className="text-slate-900 font-bold text-base mb-1 tracking-tight">
          Please Wait
        </h3>
        <p className="text-slate-500 text-xs font-medium max-w-[200px]">
          {message}
        </p>

        {/* Small Progress Dots */}
        <div className="flex gap-1.5 mt-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#74ACDF] animate-[bounce_1s_infinite_100ms]"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#F6B426] animate-[bounce_1s_infinite_200ms]"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#74ACDF] animate-[bounce_1s_infinite_300ms]"></span>
        </div>
      </div>
    </div>
  );
}

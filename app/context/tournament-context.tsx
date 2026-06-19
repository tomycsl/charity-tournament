import { createContext, useContext, type ReactNode } from "react";
import type { TournamentData } from "../types/tournament.types";

const TournamentContext = createContext<TournamentData | undefined>(undefined);

export function TournamentProvider({ children, data }: { children: ReactNode; data: TournamentData }) {
  return (
    <TournamentContext.Provider value={data}>
      {children}
    </TournamentContext.Provider>
  );
}

// Reusable hook to consume any spreadsheet data anywhere in your app
export function useTournament() {
  const context = useContext(TournamentContext);
  if (!context) {
    throw new Error("useTournament must be used within a TournamentProvider");
  }
  return context;
}
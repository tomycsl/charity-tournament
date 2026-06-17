import { createContext, useContext, type ReactNode } from "react";

export interface TeamData {
  teamName: string;
  badgeFile: string;
}

// Map key: Team Name (string) -> Value: Badge filename (string)
export type TeamMap = Record<string, string>;

const TeamContext = createContext<TeamMap | undefined>(undefined);

export function TeamProvider({ children, teams }: { children: ReactNode; teams: TeamMap }) {
  return <TeamContext.Provider value={teams}>{children}</TeamContext.Provider>;
}

// Custom hook for safe, clean consumption anywhere down the tree
export function useTeams() {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error("useTeams must be used within a TeamProvider");
  }
  return context;
}
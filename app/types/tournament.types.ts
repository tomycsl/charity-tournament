export interface Match {
  id: string;
  time: string;
  pitch: string;
  home: string;
  away: string;
  scoreHome: string; // e.g., "2" or "1 (3)"
  scoreAway: string; // e.g., "1" or "1 (4)"
  penaltiesA?: string; // Optional: If you use separate columns for penalties
  penaltiesB?: string; // Optional: If you use separate columns for penalties
}

export interface GroupData {
  name: string;
  standings: any[]; // Team rows: Rank, Name, Pts, GD
  fixtures: Match[];
}

export interface TournamentWorkbook {
  teamMap: TeamMap;
  women: { group: GroupData; playoff: Match[]; champion: string };
  men: { groups: GroupData[]; playoff: Match[]; champion: string };
}

export type TeamMap = Record<string, string>;
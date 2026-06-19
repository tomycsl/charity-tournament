export type FixtureData = {
  teamMap: TeamMap;
  women: { group: GroupData; playoff: Match[]; champion: string };
  men: { groups: GroupData[]; playoff: Match[]; champion: string };
}

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

export type TeamMap = Record<string, string>;

export type FoodItem = {
  item: string;
  category: string;
  price: string;
}

export type FoodMenu = {
  items: FoodItem[];
}

export type RaisedData = {
  totalRaised: string;
}

export type TimelineEvent = {
  time: string;
  event: string;
  isKeyEvent?: string;
};

export type TournamentData = {
  fixtureData: FixtureData;
  foodMenu: FoodMenu;
  raisedData: RaisedData;
  timeline: {
    events: TimelineEvent[];
  };
}
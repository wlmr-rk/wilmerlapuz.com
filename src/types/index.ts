// src/types/index.ts
export interface MetricItem {
  label: string;
  value: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface HeroProps {
  name?: string;
  title?: string;
  subtitle?: string;
  description?: string;
}

// src/types/stats.ts
export interface StravaStats {
  totalRuns: number;
  totalDistance: number;
  recentRun: {
    distance: number;
    duration: string;
    date: string;
  };
}

export interface SpotifyStats {
  currentlyPlaying?: {
    track: string;
    artist: string;
    isPlaying: boolean;
  };
  recentlyPlayed: {
    track: string;
    artist: string;
    playedAt: string;
  }[];
}

export interface AnkiStats {
  cardsReviewed: number;
  streak: number;
  accuracy: number;
}

export interface WakaTimeStats {
  totalHours: number;
  topLanguages: { name: string; hours: number }[];
  dailyAverage: number;
}

export interface LeetCodeStats {
  solved: number;
  total: number;
  easy: number;
  medium: number;
  hard: number;
  ranking: number;
}

export interface AllStats {
  strava: StravaStats;
  spotify: SpotifyStats;
  anki: AnkiStats;
  wakatime: WakaTimeStats;
  leetcode: LeetCodeStats;
  lastUpdated: string;
}

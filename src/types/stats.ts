// src/types/stats.ts
export interface WakaTimeStats {
  lastUpdated: string;
  status: string;
  timeTodayMinutes: number;
  today: {
    timeTodayMinutes: number;
    topLanguage: string;
    topEditor: string;
    topOS: string;
  };
  weekly: {
    totalHours: string;
    activeDays: number;
    dailyAverageMinutes: number;
    consistency: string;
  };
  monthly: {
    totalHours: string;
    activeDays: number;
    dailyAverageMinutes: number;
  };
  languages: Array<{
    name: string;
    percent: number;
    hours: number;
    minutes: number;
  }>;
}

export interface StravaStats {
  totalRuns: number;
  totalDistanceKm: string;
  recentRuns: Array<{
    name: string;
    distanceKm: string;
    date: string;
  }>;
}

export interface SpotifyStats {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

export interface LeetCodeStats {
  username: string;
  totalSolved: number;
  totalAvailable: number;
  easySolved: number;
  easyAvailable: number;
  mediumSolved: number;
  mediumAvailable: number;
  hardSolved: number;
  hardAvailable: number;
}

export interface AnkiStats {
  lastUpdated: string;
  overall: {
    reviewsToday: number;
    timeMinutesToday: number;
    matureCardRetentionPercent: number;
    currentStreakDays: number;
    cardCounts: {
      new: number;
      learning: number;
      young: number;
      mature: number;
      total: number;
    };
  };
  decks: Array<{
    deckName: string;
    reviewsToday: number;
    matureCards: number;
    newCards: number;
    totalCards: number;
  }>;
}

export interface AllStats {
  wakatime?: WakaTimeStats;
  strava?: StravaStats;
  spotify?: SpotifyStats;
  leetcode?: LeetCodeStats;
  anki?: AnkiStats;
  lastUpdated: string;
}
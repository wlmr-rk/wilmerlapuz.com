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
  today: {
    // I noticed this is used in your component but missing from the type, so I've added it.
    reviewsCompleted: number;
    studyTimeMinutes: number;
    cardsDue: number;
    estimatedTimeRemaining: number;
  };
  streaks: {
    // <-- ADD THIS
    current: number;
    longest: number;
  };
  retention: {
    // <-- ADD THIS
    recent30Days: number;
    totalReviews: {
      recent30Days: number;
    };
  };
  efficiency: {
    // <-- ADD THIS
    avgSecondsPerCard: number;
  };
  averages: {
    // <-- ADD THIS
    last30Days: {
      cardsPerDay: number;
    };
  };
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
  cardDistribution: {
    new: {
      count: number;
      percentage: number;
    };
    learning: {
      count: number;
      percentage: number;
    };
    relearning: {
      count: number;
      percentage: number;
    };
    young: {
      count: number;
      percentage: number;
    };
    mature: {
      count: number;
      percentage: number;
    };
    total: {
      count: number; // This was also missing but used in your component
      percentage: number;
    };
  };
  decks: Array<{
    deckName: string;
    reviewsToday: number;
    cardTypes: {
      // This was also missing
      total: number;
    };
    retention30Days: number; // This was also missing
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


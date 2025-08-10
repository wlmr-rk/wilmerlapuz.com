// src/types/stats.ts
export interface WakaTimeStats {
  lastUpdated: string;
  status: string;
  today: {
    timeTodayMinutes: number;
    topLanguage: string;
    topEditor: string;
    topOS: string;
  };
  weekly: {
    totalHours: string;
    dailyAverageMinutes: number;
    consistency: string;
    activeDays: number;
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
    reviewsCompleted: number;
    studyTimeMinutes: number;
    cardsDue: number;
    estimatedTimeRemaining: number;
  };
  streaks: {
    current: number;
    longest: number;
  };
  averages: {
    last30Days: {
      cardsPerDay: number;
      minutesPerDay: number;
      sessionsPerDay: number;
      activeDays: number;
    };
    last90Days: {
      cardsPerDay: number;
      minutesPerDay: number;
      sessionsPerDay: number;
      activeDays: number;
    };
  };
  cardDistribution: {
    new: { count: number; percentage: number };
    learning: { count: number; percentage: number };
    relearning: { count: number; percentage: number };
    young: { count: number; percentage: number };
    mature: { count: number; percentage: number };
    total: number;
  };
  retention: {
    recent30Days: number;
    matureCards: number;
    youngCards: number;
    totalReviews: {
      recent30Days: number;
      mature: number;
      young: number;
    };
  };
  efficiency: {
    avgSecondsPerCard: number;
    totalRecentReviews: number;
  };
  decks: Array<{
    deckName: string;
    reviewsToday: number;
    reviewsPastWeek: number;
    currentStreak: number;
    weeklyActivity: Array<{
      date: string;
      dayName: string;
      reviewCount: number;
      studiedToday: boolean;
    }>;
    cardTypes: {
      new: { count: number; percentage: number };
      learning: { count: number; percentage: number };
      relearning: { count: number; percentage: number };
      young: { count: number; percentage: number };
      mature: { count: number; percentage: number };
      total: number;
    };
    retention30Days: number;
    totalReviews30Days: number;
  }>;
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
}

export interface SpotifyStats {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

export interface AllStats {
  wakatime?: WakaTimeStats;
  strava?: StravaStats;
  leetcode?: LeetCodeStats;
  anki?: AnkiStats;
  spotify?: SpotifyStats;
  lastUpdated: string;
}


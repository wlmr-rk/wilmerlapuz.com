// src/hooks/useStats.ts
"use client";

import { useState, useEffect } from "react";
import type { AllStats } from "../types/stats";

interface WakatimeRaw {
  lastUpdated: string;
  status: string;
  today: {
    codingMinutes: unknown;
    primaryLanguage: string;
    environment: {
      editor: string;
      os: string;
    };
  };
  weeklyStats: {
    totalHoursLast7Days: string;
    activeDaysCount: unknown;
    dailyAverageMinutes: unknown;
    languages: {
      primary: string;
      secondary: string;
      primaryPercentage: string;
      secondaryPercentage: string;
    };
    consistency: string;
  };
}

interface StravaRunRaw {
  name: string;
  date: string;
  distanceKm: string;
}

interface StravaRaw {
  totalDistanceKm: string;
  totalRuns: unknown;
  recentRuns: StravaRunRaw[];
}

interface LeetCodeRaw {
  username: string;
  totalSolved: unknown;
  totalAvailable: unknown;
  easySolved: unknown;
  easyAvailable: unknown;
  mediumSolved: unknown;
  mediumAvailable: unknown;
  hardSolved: unknown;
  hardAvailable: unknown;
}

interface AnkiDeckRaw {
  deckName: string;
  reviewsToday: unknown;
  reviewsPastWeek: unknown;
  currentStreak: unknown;
  weeklyActivity: Array<{
    date: string;
    dayName: string;
    reviewCount: unknown;
    studiedToday: boolean;
  }>;
  cardTypes: {
    new: { count: unknown; percentage: unknown };
    learning: { count: unknown; percentage: unknown };
    relearning: { count: unknown; percentage: unknown };
    young: { count: unknown; percentage: unknown };
    mature: { count: unknown; percentage: unknown };
    total: unknown;
  };
  retention30Days: unknown;
  totalReviews30Days: unknown;
}

interface AnkiRaw {
  lastUpdated: string;
  today: {
    reviewsCompleted: unknown;
    studyTimeMinutes: unknown;
    cardsDue: unknown;
    estimatedTimeRemaining: unknown;
  };
  streaks: {
    current: unknown;
    longest: unknown;
  };
  averages: {
    last30Days: {
      cardsPerDay: unknown;
      minutesPerDay: unknown;
      sessionsPerDay: unknown;
      activeDays: unknown;
    };
    last90Days: {
      cardsPerDay: unknown;
      minutesPerDay: unknown;
      sessionsPerDay: unknown;
      activeDays: unknown;
    };
  };
  cardDistribution: {
    new: { count: unknown; percentage: unknown };
    learning: { count: unknown; percentage: unknown };
    relearning: { count: unknown; percentage: unknown };
    young: { count: unknown; percentage: unknown };
    mature: { count: unknown; percentage: unknown };
    total: unknown;
  };
  retention: {
    recent30Days: unknown;
    matureCards: unknown;
    youngCards: unknown;
    totalReviews: {
      recent30Days: unknown;
      mature: unknown;
      young: unknown;
    };
  };
  efficiency: {
    avgSecondsPerCard: unknown;
    totalRecentReviews: unknown;
  };
  decks: AnkiDeckRaw[];
  overall: {
    reviewsToday: unknown;
    timeMinutesToday: unknown;
    matureCardRetentionPercent: unknown;
    currentStreakDays: unknown;
    cardCounts: {
      new: unknown;
      learning: unknown;
      young: unknown;
      mature: unknown;
      total: unknown;
    };
  };
}

function toNumber(v: unknown): number {
  const n = Number(v);
  return Number.isNaN(n) ? 0 : n;
}

export const useStats = () => {
  const [stats, setStats] = useState<AllStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const [wakatimeRes, stravaRes, leetcodeRes, ankiRes] =
          await Promise.all([
            fetch("/wakatime-data.json").catch(() => null),
            fetch("/strava-data.json").catch(() => null),
            fetch("/leetcode-data.json").catch(() => null),
            fetch("/anki-data.json").catch(() => null),
          ]);

        const acc: Partial<AllStats> = {};

        // --- WAKATIME ---
        if (wakatimeRes?.ok) {
          const raw: WakatimeRaw = await wakatimeRes.json();
          acc.wakatime = {
            lastUpdated: raw.lastUpdated,
            status: raw.status,
            today: {
              timeTodayMinutes: toNumber(raw.today.codingMinutes),
              topEditor: raw.today.environment.editor,
              topLanguage: raw.today.primaryLanguage,
              topOS: raw.today.environment.os,
            },
            weekly: {
              totalHours: raw.weeklyStats.totalHoursLast7Days,
              dailyAverageMinutes: toNumber(
                raw.weeklyStats.dailyAverageMinutes,
              ),
              consistency: raw.weeklyStats.consistency,
              activeDays: toNumber(raw.weeklyStats.activeDaysCount),
            },
            // Note: The new schema provides less detailed language data.
            // We're creating a simplified structure to fit the existing UI.
            languages: [
              {
                name: raw.weeklyStats.languages.primary,
                percent: parseFloat(
                  raw.weeklyStats.languages.primaryPercentage,
                ),
                hours: 0, // Data not available
                minutes: 0, // Data not available
              },
              {
                name: raw.weeklyStats.languages.secondary,
                percent: parseFloat(
                  raw.weeklyStats.languages.secondaryPercentage,
                ),
                hours: 0, // Data not available
                minutes: 0, // Data not available
              },
            ],
          };
        }

        // --- STRAVA ---
        if (stravaRes?.ok) {
          const raw: StravaRaw = await stravaRes.json();
          acc.strava = {
            ...raw,
            totalRuns: toNumber(raw.totalRuns),
          };
        }

        // --- LEETCODE ---
        if (leetcodeRes?.ok) {
          const raw: LeetCodeRaw = await leetcodeRes.json();
          acc.leetcode = {
            ...raw,
            totalSolved: toNumber(raw.totalSolved),
            totalAvailable: toNumber(raw.totalAvailable),
            easySolved: toNumber(raw.easySolved),
            easyAvailable: toNumber(raw.easyAvailable),
            mediumSolved: toNumber(raw.mediumSolved),
            mediumAvailable: toNumber(raw.mediumAvailable),
            hardSolved: toNumber(raw.hardSolved),
            hardAvailable: toNumber(raw.hardAvailable),
          };
        }

        // --- ANKI ---
        if (ankiRes?.ok) {
          const raw: AnkiRaw = await ankiRes.json();
          acc.anki = {
            ...raw,
            today: {
              reviewsCompleted: toNumber(raw.today.reviewsCompleted),
              studyTimeMinutes: toNumber(raw.today.studyTimeMinutes),
              cardsDue: toNumber(raw.today.cardsDue),
              estimatedTimeRemaining: toNumber(
                raw.today.estimatedTimeRemaining,
              ),
            },
            streaks: {
              current: toNumber(raw.streaks.current),
              longest: toNumber(raw.streaks.longest),
            },
            cardDistribution: {
              ...raw.cardDistribution,
              new: {
                count: toNumber(raw.cardDistribution.new.count),
                percentage: toNumber(raw.cardDistribution.new.percentage),
              },
              learning: {
                count: toNumber(raw.cardDistribution.learning.count),
                percentage: toNumber(raw.cardDistribution.learning.percentage),
              },
              young: {
                count: toNumber(raw.cardDistribution.young.count),
                percentage: toNumber(raw.cardDistribution.young.percentage),
              },
              mature: {
                count: toNumber(raw.cardDistribution.mature.count),
                percentage: toNumber(raw.cardDistribution.mature.percentage),
              },
              relearning: {
                count: toNumber(raw.cardDistribution.relearning.count),
                percentage: toNumber(
                  raw.cardDistribution.relearning.percentage,
                ),
              },
              total: toNumber(raw.cardDistribution.total),
            },
            decks: raw.decks.map((d) => ({
              ...d,
              reviewsToday: toNumber(d.reviewsToday),
              reviewsPastWeek: toNumber(d.reviewsPastWeek),
              currentStreak: toNumber(d.currentStreak),
              retention30Days: toNumber(d.retention30Days),
              totalReviews30Days: toNumber(d.totalReviews30Days),
              weeklyActivity: d.weeklyActivity.map((w) => ({
                ...w,
                reviewCount: toNumber(w.reviewCount),
              })),
              cardTypes: {
                ...d.cardTypes,
                new: {
                  count: toNumber(d.cardTypes.new.count),
                  percentage: toNumber(d.cardTypes.new.percentage),
                },
                learning: {
                  count: toNumber(d.cardTypes.learning.count),
                  percentage: toNumber(d.cardTypes.learning.percentage),
                },
                relearning: {
                  count: toNumber(d.cardTypes.relearning.count),
                  percentage: toNumber(d.cardTypes.relearning.percentage),
                },
                young: {
                  count: toNumber(d.cardTypes.young.count),
                  percentage: toNumber(d.cardTypes.young.percentage),
                },
                mature: {
                  count: toNumber(d.cardTypes.mature.count),
                  percentage: toNumber(d.cardTypes.mature.percentage),
                },
                total: toNumber(d.cardTypes.total),
              },
            })),
            retention: {
              ...raw.retention,
              recent30Days: toNumber(raw.retention.recent30Days),
              matureCards: toNumber(raw.retention.matureCards),
              youngCards: toNumber(raw.retention.youngCards),
              totalReviews: {
                ...raw.retention.totalReviews,
                recent30Days: toNumber(raw.retention.totalReviews.recent30Days),
                mature: toNumber(raw.retention.totalReviews.mature),
                young: toNumber(raw.retention.totalReviews.young),
              },
            },
            efficiency: {
              ...raw.efficiency,
              avgSecondsPerCard: toNumber(raw.efficiency.avgSecondsPerCard),
              totalRecentReviews: toNumber(raw.efficiency.totalRecentReviews),
            },
            averages: {
              ...raw.averages,
              last30Days: {
                ...raw.averages.last30Days,
                cardsPerDay: toNumber(raw.averages.last30Days.cardsPerDay),
                minutesPerDay: toNumber(raw.averages.last30Days.minutesPerDay),
                sessionsPerDay: toNumber(
                  raw.averages.last30Days.sessionsPerDay,
                ),
                activeDays: toNumber(raw.averages.last30Days.activeDays),
              },
              last90Days: {
                ...raw.averages.last90Days,
                cardsPerDay: toNumber(raw.averages.last90Days.cardsPerDay),
                minutesPerDay: toNumber(raw.averages.last90Days.minutesPerDay),
                sessionsPerDay: toNumber(
                  raw.averages.last90Days.sessionsPerDay,
                ),
                activeDays: toNumber(raw.averages.last90Days.activeDays),
              },
            },
            overall: {
              ...raw.overall,
              reviewsToday: toNumber(raw.overall.reviewsToday),
              timeMinutesToday: toNumber(raw.overall.timeMinutesToday),
              matureCardRetentionPercent: toNumber(
                raw.overall.matureCardRetentionPercent,
              ),
              currentStreakDays: toNumber(raw.overall.currentStreakDays),
              cardCounts: {
                ...raw.overall.cardCounts,
                new: toNumber(raw.overall.cardCounts.new),
                learning: toNumber(raw.overall.cardCounts.learning),
                young: toNumber(raw.overall.cardCounts.young),
                mature: toNumber(raw.overall.cardCounts.mature),
                total: toNumber(raw.overall.cardCounts.total),
              },
            },
          };
        }

        setStats(acc as AllStats);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { stats, loading, error };
};

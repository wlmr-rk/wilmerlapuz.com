// src/hooks/useStats.ts
"use client";

import { useState, useEffect } from "react";
import type { AllStats } from "../types/stats";

interface WakatimeRaw {
  status: string;
  timeTodayMinutes: unknown;
  monthly: {
    totalHours: string;
    activeDays: unknown;
    dailyAverageMinutes: unknown;
  };
  today: {
    timeTodayMinutes: unknown;
    topEditor: string;
    topLanguage: string;
    topOS: string;
  };
  weekly: {
    totalHours: string;
    dailyAverageMinutes: unknown;
    consistency: string;
    activeDays: unknown;
  };
  languages: Array<{
    name: string;
    percent: unknown;
    hours: unknown;
    minutes: unknown;
  }>;
  lastUpdated?: string;
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
  cardTypes: {
    total: unknown;
  };
  retention30Days: unknown;
  weeklyActivity: Array<{
    dayName: string;
    reviewCount: unknown;
  }>;
  matureCards: unknown;
  newCards: unknown;
  totalCards: unknown;
}

interface AnkiRaw {
  lastUpdated: string;
  // FIX: Update the 'overall' object to match the actual final type.
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
  cardDistribution: {
    new: {
      count: unknown;
      percentage: unknown;
    };
    learning: {
      count: unknown;
      percentage: unknown;
    };
    young: {
      count: unknown;
      percentage: unknown;
    };
    mature: {
      count: unknown;
      percentage: unknown;
    };
    relearning: {
      count: unknown;
      percentage: unknown;
    };
    total: {
      count: unknown;
      percentage: unknown;
    };
  };
  decks: AnkiDeckRaw[];
  retention: {
    recent30Days: unknown;
    totalReviews: {
      recent30Days: unknown;
    };
  };
  efficiency: {
    avgSecondsPerCard: unknown;
  };
  averages: {
    last30Days: {
      cardsPerDay: unknown;
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

        const [wakatimeRes, stravaRes, spotifyRes, leetcodeRes, ankiRes] =
          await Promise.all([
            fetch("/wakatime-data.json").catch(() => null),
            fetch("/strava-data.json").catch(() => null),
            fetch("/spotify-data.json").catch(() => null),
            fetch("/leetcode-data.json").catch(() => null),
            fetch("/anki-data.json").catch(() => null),
          ]);

        const acc: Partial<AllStats> = {};

        // --- WAKATIME ---
        if (wakatimeRes?.ok) {
          const raw: WakatimeRaw = await wakatimeRes.json();
          acc.wakatime = {
            ...raw,
            timeTodayMinutes: toNumber(raw.timeTodayMinutes),
            monthly: {
              ...raw.monthly,
              activeDays: toNumber(raw.monthly.activeDays),
              dailyAverageMinutes: toNumber(raw.monthly.dailyAverageMinutes),
            },
            today: {
              ...raw.today,
              timeTodayMinutes: toNumber(raw.today.timeTodayMinutes),
            },
            weekly: {
              ...raw.weekly,
              activeDays: toNumber(raw.weekly.activeDays),
              dailyAverageMinutes: toNumber(raw.weekly.dailyAverageMinutes),
            },
            languages: raw.languages?.map((l) => ({
              ...l,
              percent: toNumber(l.percent),
              hours: toNumber(l.hours),
              minutes: toNumber(l.minutes),
            })),
            lastUpdated: raw.lastUpdated ?? new Date().toISOString(),
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

        // --- SPOTIFY (no numeric conversions needed) ---
        if (spotifyRes?.ok) {
          acc.spotify = await spotifyRes.json();
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
            // FIX: Process the 'overall' object with its correct properties.
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
            today: {
              ...raw.today,
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
              new: {
                ...raw.cardDistribution.new,
                count: toNumber(raw.cardDistribution.new.count),
                percentage: toNumber(raw.cardDistribution.new.percentage),
              },
              learning: {
                ...raw.cardDistribution.learning,
                count: toNumber(raw.cardDistribution.learning.count),
                percentage: toNumber(raw.cardDistribution.learning.percentage),
              },
              young: {
                ...raw.cardDistribution.young,
                count: toNumber(raw.cardDistribution.young.count),
                percentage: toNumber(raw.cardDistribution.young.percentage),
              },
              mature: {
                ...raw.cardDistribution.mature,
                count: toNumber(raw.cardDistribution.mature.count),
                percentage: toNumber(raw.cardDistribution.mature.percentage),
              },
              relearning: {
                ...raw.cardDistribution.relearning,
                count: toNumber(raw.cardDistribution.relearning.count),
                percentage: toNumber(
                  raw.cardDistribution.relearning.percentage,
                ),
              },
              total: {
                count: toNumber(raw.cardDistribution.total.count),
                percentage: toNumber(raw.cardDistribution.total.percentage),
              },
            },
            decks: raw.decks.map((d) => ({
              ...d,
              reviewsToday: toNumber(d.reviewsToday),
              cardTypes: {
                ...d.cardTypes,
                total: toNumber(d.cardTypes.total),
              },
              retention30Days: toNumber(d.retention30Days),
              weeklyActivity: d.weeklyActivity.map((w) => ({
                ...w,
                reviewCount: toNumber(w.reviewCount),
              })),
              matureCards: toNumber(d.matureCards),
              newCards: toNumber(d.newCards),
              totalCards: toNumber(d.totalCards),
            })),
            retention: {
              recent30Days: toNumber(raw.retention.recent30Days),
              totalReviews: {
                recent30Days: toNumber(raw.retention.totalReviews.recent30Days),
              },
            },
            efficiency: {
              avgSecondsPerCard: toNumber(raw.efficiency.avgSecondsPerCard),
            },
            averages: {
              last30Days: {
                cardsPerDay: toNumber(raw.averages.last30Days.cardsPerDay),
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

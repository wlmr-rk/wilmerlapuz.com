// src/hooks/useStats.ts
"use client";

import { useState, useEffect } from "react";
import type { AllStats, SpotifyStats } from "../types/stats";

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

interface AnkiRaw {
  lastUpdated: string;
  total_cards: unknown;
  mature_cards: unknown;
  due_today: unknown;
  new_today: unknown;
  learning_today: unknown;
  decks: Array<{
    deckName: string;
    due: unknown;
    new: unknown;
    learning: unknown;
  }>;
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

        const [wakatimeRes, stravaRes, leetcodeRes, ankiRes, spotifyRes] =
          await Promise.all([
            fetch("/wakatime-data.json").catch(() => null),
            fetch("/strava-data.json").catch(() => null),
            fetch("/leetcode-data.json").catch(() => null),
            fetch("/anki-data.json").catch(() => null),
            fetch("/spotify-data.json").catch(() => null),
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

        // --- SPOTIFY ---
        if (spotifyRes?.ok) {
          const raw: SpotifyStats = await spotifyRes.json();
          acc.spotify = raw;
        }

        // --- ANKI ---
        if (ankiRes?.ok) {
          const raw: AnkiRaw = await ankiRes.json();
          const totalCards = toNumber(raw.total_cards);
          const matureCards = toNumber(raw.mature_cards);
          const newCards = toNumber(raw.new_today);
          const learningCards = toNumber(raw.learning_today);

          acc.anki = {
            lastUpdated: raw.lastUpdated,
            today: {
              reviewsCompleted: 0, // Not available in new JSON
              studyTimeMinutes: 0, // Not available in new JSON
              cardsDue: toNumber(raw.due_today),
              estimatedTimeRemaining: 0, // Not available in new JSON
            },
            streaks: {
              current: 0, // Not available in new JSON
              longest: 0, // Not available in new JSON
            },
            cardDistribution: {
              total: totalCards,
              mature: { count: matureCards, percentage: (matureCards / totalCards) * 100 },
              new: { count: newCards, percentage: (newCards / totalCards) * 100 },
              learning: { count: learningCards, percentage: (learningCards / totalCards) * 100 },
              young: { count: 0, percentage: 0 }, // Not available
              relearning: { count: 0, percentage: 0 }, // Not available
            },
            decks: raw.decks.map((d) => ({
              deckName: d.deckName,
              reviewsToday: toNumber(d.due),
              cardTypes: {
                new: { count: toNumber(d.new), percentage: 0 },
                learning: { count: toNumber(d.learning), percentage: 0 },
                mature: { count: 0, percentage: 0 },
                young: { count: 0, percentage: 0 },
                relearning: { count: 0, percentage: 0 },
                total: toNumber(d.new) + toNumber(d.learning),
              },
              // Default values for fields not in the new JSON
              reviewsPastWeek: 0,
              currentStreak: 0,
              weeklyActivity: [],
              retention30Days: 0,
              totalReviews30Days: 0,
            })),
            // Default values for top-level fields not in the new JSON
            retention: {
              recent30Days: 0,
              matureCards: 0,
              youngCards: 0,
              totalReviews: { recent30Days: 0, mature: 0, young: 0 },
            },
            efficiency: {
              avgSecondsPerCard: 0,
              totalRecentReviews: 0,
            },
            averages: {
              last30Days: { cardsPerDay: 0, minutesPerDay: 0, sessionsPerDay: 0, activeDays: 0 },
              last90Days: { cardsPerDay: 0, minutesPerDay: 0, sessionsPerDay: 0, activeDays: 0 },
            },
            overall: {
              reviewsToday: 0,
              timeMinutesToday: 0,
              matureCardRetentionPercent: 0,
              currentStreakDays: 0,
              cardCounts: {
                new: newCards,
                learning: learningCards,
                mature: matureCards,
                young: 0,
                total: totalCards,
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

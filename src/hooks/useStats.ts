// src/hooks/useStats.ts
"use client";

import { useState, useEffect } from "react";
import type { AllStats } from "../types/stats";

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

        const [
          wakatimeRes,
          stravaRes,
          spotifyRes,
          leetcodeRes,
          ankiRes,
        ] = await Promise.all([
          fetch("/wakatime-data.json").catch(() => null),
          fetch("/strava-data.json").catch(() => null),
          fetch("/spotify-data.json").catch(() => null),
          fetch("/leetcode-data.json").catch(() => null),
          fetch("/anki-data.json").catch(() => null),
        ]);

        const acc: Partial<AllStats> = {};

        // --- WAKATIME ---
        if (wakatimeRes?.ok) {
          const raw = await wakatimeRes.json();
          acc.wakatime = {
            ...raw,
            today: {
              ...raw.today,
              timeTodayMinutes: toNumber(raw.today.timeTodayMinutes),
            },
            weekly: {
              ...raw.weekly,
              totalHours: toNumber(raw.weekly.totalHours),
              dailyAverageMinutes: toNumber(
                raw.weekly.dailyAverageMinutes
              ),
            },
            languages: raw.languages?.map((l: any) => ({
              ...l,
              percent: toNumber(l.percent),
            })),
            // Optional: if your AllStats.wakatime has a lastUpdated
            lastUpdated: raw.lastUpdated ?? new Date().toISOString(),
          };
        }

        // --- STRAVA ---
        if (stravaRes?.ok) {
          const raw = await stravaRes.json();
          acc.strava = {
            ...raw,
            totalDistanceKm: toNumber(raw.totalDistanceKm),
            totalRuns: toNumber(raw.totalRuns),
            recentRuns: raw.recentRuns?.map((r: any) => ({
              ...r,
              distanceKm: toNumber(r.distanceKm),
            })),
          };
        }

        // --- SPOTIFY (no numeric conversions needed) ---
        if (spotifyRes?.ok) {
          acc.spotify = await spotifyRes.json();
        }

        // --- LEETCODE ---
        if (leetcodeRes?.ok) {
          const raw = await leetcodeRes.json();
          acc.leetcode = {
            ...raw,
            totalSolved: toNumber(raw.totalSolved),
            totalAvailable: toNumber(raw.totalAvailable),
          };
        }

        // --- ANKI ---
        if (ankiRes?.ok) {
          const raw = await ankiRes.json();
          acc.anki = {
            ...raw,
            today: {
              ...raw.today,
              reviewsCompleted: toNumber(raw.today.reviewsCompleted),
              studyTimeMinutes: toNumber(raw.today.studyTimeMinutes),
              cardsDue: toNumber(raw.today.cardsDue),
              estimatedTimeRemaining: toNumber(
                raw.today.estimatedTimeRemaining
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
                percentage: toNumber(
                  raw.cardDistribution.new.percentage
                ),
              },
              learning: {
                ...raw.cardDistribution.learning,
                count: toNumber(raw.cardDistribution.learning.count),
                percentage: toNumber(
                  raw.cardDistribution.learning.percentage
                ),
              },
              young: {
                ...raw.cardDistribution.young,
                count: toNumber(raw.cardDistribution.young.count),
                percentage: toNumber(
                  raw.cardDistribution.young.percentage
                ),
              },
              mature: {
                ...raw.cardDistribution.mature,
                count: toNumber(raw.cardDistribution.mature.count),
                percentage: toNumber(
                  raw.cardDistribution.mature.percentage
                ),
              },
              relearning: {
                ...raw.cardDistribution.relearning,
                count: toNumber(
                  raw.cardDistribution.relearning.count
                ),
                percentage: toNumber(
                  raw.cardDistribution.relearning.percentage
                ),
              },
              total: toNumber(raw.cardDistribution.total),
            },
            decks: raw.decks.map((d: any) => ({
              ...d,
              reviewsToday: toNumber(d.reviewsToday),
              cardTypes: {
                ...d.cardTypes,
                total: toNumber(d.cardTypes.total),
              },
              retention30Days: toNumber(d.retention30Days),
              weeklyActivity: d.weeklyActivity.map((w: any) => ({
                ...w,
                reviewCount: toNumber(w.reviewCount),
              })),
            })),
            retention: {
              recent30Days: toNumber(raw.retention.recent30Days),
              totalReviews: {
                recent30Days: toNumber(
                  raw.retention.totalReviews.recent30Days
                ),
              },
            },
            efficiency: {
              avgSecondsPerCard: toNumber(
                raw.efficiency.avgSecondsPerCard
              ),
            },
            averages: {
              last30Days: {
                cardsPerDay: toNumber(
                  raw.averages.last30Days.cardsPerDay
                ),
              },
            },
          };
        }

        setStats(acc as AllStats);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch stats"
        );
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
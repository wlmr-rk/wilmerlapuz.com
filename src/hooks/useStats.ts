// src/hooks/useStats.ts
"use client";

import { useState, useEffect } from "react";
import type { AllStats } from "../types/stats";

// Default empty objects to prevent undefined errors
const defaultWakatime = {
  lastUpdated: "",
  status: "unavailable",
  today: {
    codingMinutes: 0,
    primaryLanguage: "N/A",
    environment: {
      editor: "N/A",
      os: "N/A",
    },
  },
  weeklyStats: {
    totalHoursLast7Days: "0 hrs",
    activeDaysCount: 0,
    dailyAverageMinutes: 0,
    languages: {
      primary: "N/A",
      secondary: "N/A",
      primaryPercentage: "0%",
      secondaryPercentage: "0%",
    },
    consistency: "0%",
  },
  last30Days: {
    totalHours: "0 hrs",
    dailyAverage: 0,
    activeDays: 0,
  },
};

const defaultStrava = {
  totalRuns: 0,
  totalDistanceKm: "0.0",
  recentRuns: [],
};

const defaultSpotify = {
  isPlaying: false,
  title: "Not playing",
  artist: "N/A",
  album: "N/A",
  albumImageUrl: "",
  songUrl: "",
};

const defaultLeetcode = {
  username: "N/A",
  totalSolved: 0,
  totalAvailable: 0,
  easySolved: 0,
  easyAvailable: 0,
  mediumSolved: 0,
  mediumAvailable: 0,
  hardSolved: 0,
  hardAvailable: 0,
};

const defaultAnki = {
  lastUpdated: "",
  overall: {
    reviewsToday: 0,
    timeMinutesToday: 0,
    matureCardRetentionPercent: 0,
    currentStreakDays: 0,
    cardCounts: {
      new: 0,
      learning: 0,
      young: 0,
      mature: 0,
      total: 0,
    },
  },
  decks: [],
  last30Days: {
    totalReviews: 0,
    averageDaily: 0,
    activeDays: 0,
  },
};

export const useStats = () => {
  const [stats, setStats] = useState<AllStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // Fetch all stats in parallel - files are directly in public directory
        const [wakatimeRes, stravaRes, spotifyRes, leetcodeRes, ankiRes] =
          await Promise.all([
            fetch("/wakatime-data.json").catch(() => null),
            fetch("/strava-data.json").catch(() => null),
            fetch("/spotify-data.json").catch(() => null),
            fetch("/leetcode-data.json").catch(() => null),
            fetch("/anki-data.json").catch(() => null),
          ]);

        // Initialize with default values to prevent undefined errors
        const statsData: AllStats = {
          wakatime: defaultWakatime,
          strava: defaultStrava,
          spotify: defaultSpotify,
          leetcode: defaultLeetcode,
          anki: defaultAnki,
          lastUpdated: new Date().toISOString(),
        };

        // Parse successful responses and merge with defaults
        if (wakatimeRes?.ok) {
          const wakatimeData = await wakatimeRes.json();
          statsData.wakatime = { ...defaultWakatime, ...wakatimeData };
        }
        if (stravaRes?.ok) {
          const stravaData = await stravaRes.json();
          statsData.strava = { ...defaultStrava, ...stravaData };
        }
        if (spotifyRes?.ok) {
          const spotifyData = await spotifyRes.json();
          statsData.spotify = { ...defaultSpotify, ...spotifyData };
        }
        if (leetcodeRes?.ok) {
          const leetcodeData = await leetcodeRes.json();
          statsData.leetcode = { ...defaultLeetcode, ...leetcodeData };
        }
        if (ankiRes?.ok) {
          const ankiData = await ankiRes.json();
          statsData.anki = { ...defaultAnki, ...ankiData };
        }

        setStats(statsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch stats");
        // Even on error, provide default stats to prevent undefined errors
        setStats({
          wakatime: defaultWakatime,
          strava: defaultStrava,
          spotify: defaultSpotify,
          leetcode: defaultLeetcode,
          anki: defaultAnki,
          lastUpdated: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Refresh stats every 10 minutes
    const interval = setInterval(fetchStats, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { stats, loading, error };
};
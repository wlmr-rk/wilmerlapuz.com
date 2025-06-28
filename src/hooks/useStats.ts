// src/hooks/useStats.ts
"use client";

import { useState, useEffect } from "react";
import type { AllStats } from "../types/stats";

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

        const statsData: Partial<AllStats> = {
          lastUpdated: new Date().toISOString(),
        };

        // Parse successful responses
        if (wakatimeRes?.ok) {
          statsData.wakatime = await wakatimeRes.json();
        }
        if (stravaRes?.ok) {
          statsData.strava = await stravaRes.json();
        }
        if (spotifyRes?.ok) {
          statsData.spotify = await spotifyRes.json();
        }
        if (leetcodeRes?.ok) {
          statsData.leetcode = await leetcodeRes.json();
        }
        if (ankiRes?.ok) {
          statsData.anki = await ankiRes.json();
        }

        setStats(statsData as AllStats);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch stats");
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

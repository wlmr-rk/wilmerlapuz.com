// src/components/StatsSection.tsx
"use client";

import React from "react";
import { useStats } from "../hooks/useStats";
import StatCard from "./ui/StatCard";
import {
  Code2,
  Activity,
  Music,
  Brain,
  Trophy,
  Clock,
  Zap,
  Target,
  TrendingUp,
  Calendar,
  Headphones,
  BookOpen,
} from "lucide-react";

const StatsSection: React.FC = () => {
  const { stats, loading, error } = useStats();

  if (loading) {
    return (
      <section
        id="stats"
        className="relative min-h-screen bg-black p-6 lg:p-8"
      >
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase mb-4">
              Live Stats
            </h2>
            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto">
              Loading real-time data...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-32 rounded-2xl bg-white/5 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="stats"
        className="relative min-h-screen bg-black p-6 lg:p-8"
      >
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase mb-4">
              Live Stats
            </h2>
            <p className="text-lg text-red-400">
              Unable to load stats: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="stats"
      className="relative min-h-screen bg-black p-6 lg:p-8"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase mb-4">
            Live Stats
          </h2>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-6">
            Real-time data from my daily activities and learning journey
          </p>
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-[40px]">
            <div className="size-2 rounded-full bg-accent-main animate-pulse mr-3" />
            <span className="text-sm text-white/70">
              Updated hourly via automated pipeline
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* WakaTime Stats */}
          {stats?.wakatime && (
            <>
              <StatCard
                title="Coding Today"
                value={Math.floor(stats.wakatime.today.codingMinutes / 60).toString()}
                unit="hrs"
                icon={Code2}
                gradient="from-blue-500/20 to-blue-300/20"
                description={`${stats.wakatime.today.codingMinutes % 60}min in ${stats.wakatime.today.primaryLanguage}`}
              />
              <StatCard
                title="Weekly Hours"
                value={stats.wakatime.weeklyStats.totalHoursLast7Days}
                unit="hrs"
                icon={Clock}
                gradient="from-purple-500/20 to-purple-300/20"
                description={`${stats.wakatime.weeklyStats.activeDaysCount} active days`}
              />
              <StatCard
                title="Primary Language"
                value={stats.wakatime.weeklyStats.languages.primary}
                icon={Zap}
                gradient="from-yellow-500/20 to-yellow-300/20"
                description={`${stats.wakatime.weeklyStats.languages.primaryPercentage}% of time`}
                layout="wide"
              />
              <StatCard
                title="Consistency"
                value={stats.wakatime.weeklyStats.consistency}
                icon={TrendingUp}
                gradient="from-green-500/20 to-green-300/20"
                description={`${stats.wakatime.weeklyStats.dailyAverageMinutes}min daily avg`}
                layout="wide"
              />
            </>
          )}

          {/* Strava Stats */}
          {stats?.strava && (
            <>
              <StatCard
                title="Total Runs"
                value={stats.strava.totalRuns.toString()}
                icon={Activity}
                gradient="from-orange-500/20 to-orange-300/20"
                description={`${stats.strava.totalDistanceKm}km total distance`}
              />
              <StatCard
                title="Latest Run"
                value={stats.strava.recentRuns[0]?.distanceKm || "0"}
                unit="km"
                icon={Target}
                gradient="from-red-500/20 to-red-300/20"
                description={stats.strava.recentRuns[0]?.name || "No recent runs"}
                layout="compact"
              />
            </>
          )}

          {/* Spotify Stats */}
          {stats?.spotify && (
            <StatCard
              title={stats.spotify.isPlaying ? "Now Playing" : "Last Played"}
              value={stats.spotify.title}
              icon={stats.spotify.isPlaying ? Headphones : Music}
              gradient="from-green-500/20 to-green-300/20"
              description={`by ${stats.spotify.artist}`}
              layout="wide"
              className="md:col-span-2"
            />
          )}

          {/* LeetCode Stats */}
          {stats?.leetcode && (
            <>
              <StatCard
                title="Problems Solved"
                value={stats.leetcode.totalSolved.toString()}
                icon={Trophy}
                gradient="from-yellow-500/20 to-yellow-300/20"
                description={`${stats.leetcode.easySolved} easy solved`}
              />
              <StatCard
                title="Progress"
                value={`${Math.round((stats.leetcode.totalSolved / stats.leetcode.totalAvailable) * 100)}`}
                unit="%"
                icon={TrendingUp}
                gradient="from-blue-500/20 to-blue-300/20"
                description={`${stats.leetcode.totalAvailable} total problems`}
              />
            </>
          )}

          {/* Anki Stats */}
          {stats?.anki && (
            <>
              <StatCard
                title="Cards Today"
                value={stats.anki.overall.reviewsToday.toString()}
                icon={Brain}
                gradient="from-indigo-500/20 to-indigo-300/20"
                description={`${stats.anki.overall.timeMinutesToday}min study time`}
              />
              <StatCard
                title="Study Streak"
                value={stats.anki.overall.currentStreakDays.toString()}
                unit="days"
                icon={Calendar}
                gradient="from-pink-500/20 to-pink-300/20"
                description={`${stats.anki.overall.matureCardRetentionPercent}% retention`}
              />
              <StatCard
                title="Total Cards"
                value={stats.anki.overall.cardCounts.total.toLocaleString()}
                icon={BookOpen}
                gradient="from-cyan-500/20 to-cyan-300/20"
                description={`${stats.anki.overall.cardCounts.mature} mature cards`}
                className="md:col-span-2"
              />
            </>
          )}
        </div>

        {/* Data Sources */}
        <div className="text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-[40px]">
            <span className="text-sm text-white/70">
              Data sources: WakaTime • Strava • Spotify • LeetCode • Anki
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
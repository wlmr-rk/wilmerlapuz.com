// src/components/StatsSection.tsx
"use client";

import React from "react";
import Image from "next/image";
import { useStats } from "../hooks/useStats";
import {
  Activity,
  Music,
  Brain,
  Code2,
  Trophy,
  ExternalLink,
  Play,
  GitBranch,
} from "lucide-react";

const StatsSection: React.FC = () => {
  const { stats, loading, error } = useStats();

  if (loading) {
    return (
      <section
        id="stats"
        className="relative min-h-screen flex items-center justify-center bg-black p-4 sm:p-6 lg:p-8"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-accent-main/20 border-t-accent-main mx-auto mb-4"></div>
          <p className="text-white/60">Loading real-time stats...</p>
        </div>
      </section>
    );
  }

  const formatHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getDeckIcon = (deckName: string) => {
    if (deckName.includes("Core")) return "📚";
    if (deckName.includes("決まり文句")) return "💬";
    if (deckName.includes("開始")) return "🔰";
    if (deckName.includes("都道府県")) return "🗾";
    if (deckName.includes("Radicals")) return "🧩";
    return "📖";
  };

  const getDeckDisplayName = (deckName: string) => {
    if (deckName.includes("Core")) return "Core Vocabulary";
    if (deckName.includes("決まり文句")) return "Set Phrases";
    if (deckName.includes("開始")) return "Beginner Kanji";
    if (deckName.includes("都道府県")) return "Prefectures";
    if (deckName.includes("Radicals")) return "Radicals";
    return deckName.replace(/[⭐💬🔰🗾🧩]/g, "").trim();
  };

  return (
    <section
      id="stats"
      className="relative min-h-screen bg-black p-4 sm:p-6 lg:p-8"
    >
      {/* Background noise */}
      <div className="bg-noise bg-cinematic absolute inset-0 animate-[float_25s_ease-in-out_infinite]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase text-shadow-[0_4px_8px_rgba(0,0,0,0.8)] mb-4">
            Live Dashboard
          </h2>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-6">
            Real-time metrics from my development journey, powered by automated
            workflows
          </p>
          <div className="text-sm text-white/40">
            Last updated:{" "}
            {stats?.wakatime?.lastUpdated
              ? new Date(stats.wakatime.lastUpdated).toLocaleString()
              : "Never"}
          </div>

          {/* Update indicator */}
          <div className="flex items-center justify-center mt-2">
            <div className="status-dot relative inline-block animate-[pulse_2.5s_ease-in-out_infinite] rounded-full bg-linear-to-br/oklch from-accent-main to-accent-mid size-1.5 mr-2 shadow-[0_0_8px_rgba(0,255,136,0.8)]" />
            <span className="text-xs text-accent-main font-medium">
              Auto-updates hourly
            </span>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6">
          {/* WakaTime Combined - Large Card (2x2) */}
          {stats?.wakatime && (
            <div className="md:col-span-2 lg:col-span-2 xl:col-span-3 lg:row-span-2 bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150 transition-all duration-400 hover:-translate-y-1 hover:border-white/14">
              {/* Background Gradient */}
              <div className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-50" />

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-[20px] mr-3">
                    <Code2 size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Coding Activity
                    </h3>
                    <p className="text-white/60 text-sm">
                      {stats.wakatime.status}
                    </p>
                  </div>
                </div>

                {/* Today's Stats */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white/80 font-semibold">Today</h4>
                    <div className="text-right">
                      <div className="text-2xl font-black text-white">
                        {formatHours(stats.wakatime.today.codingMinutes)}
                      </div>
                      <div className="text-white/60 text-xs">active coding</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg border border-white/10 bg-white/5">
                      <div className="text-white/70 text-xs mb-1">Language</div>
                      <div className="text-white font-semibold text-sm">
                        {stats.wakatime.today.primaryLanguage}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg border border-white/10 bg-white/5">
                      <div className="text-white/70 text-xs mb-1">Editor</div>
                      <div className="text-white font-semibold text-sm">
                        {stats.wakatime.today.environment.editor}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weekly Stats */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white/80 font-semibold">This Week</h4>
                    <div className="text-right">
                      <div className="text-xl font-black text-white">
                        {stats.wakatime.weeklyStats.totalHoursLast7Days}h
                      </div>
                      <div className="text-white/60 text-xs">total hours</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-lg border border-white/10 bg-white/5">
                      <div className="text-white/70 text-xs mb-1">
                        Active Days
                      </div>
                      <div className="text-white font-semibold text-sm">
                        {stats.wakatime.weeklyStats.activeDaysCount}/7
                      </div>
                    </div>
                    <div className="p-3 rounded-lg border border-white/10 bg-white/5">
                      <div className="text-white/70 text-xs mb-1">
                        Consistency
                      </div>
                      <div className="text-accent-main font-semibold text-sm">
                        {stats.wakatime.weeklyStats.consistency}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-white/10 bg-white/5">
                    <div className="text-white/70 text-xs mb-2">
                      Top Languages
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold text-sm">
                        {stats.wakatime.weeklyStats.languages.primary}
                      </span>
                      <span className="text-white/80 text-sm">
                        {stats.wakatime.weeklyStats.languages.primaryPercentage}
                        %
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-white/70 text-sm">
                        {stats.wakatime.weeklyStats.languages.secondary}
                      </span>
                      <span className="text-white/60 text-sm">
                        {
                          stats.wakatime.weeklyStats.languages
                            .secondaryPercentage
                        }
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Anki Study with Decks - Large Card (2x2) */}
          {stats?.anki && (
            <div className="md:col-span-2 lg:col-span-2 xl:col-span-3 lg:row-span-2 bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150 transition-all duration-400 hover:-translate-y-1 hover:border-white/14">
              {/* Background Gradient */}
              <div className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-50" />

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-[20px] mr-3">
                    <Brain size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Japanese Study
                    </h3>
                    <p className="text-white/60 text-sm">Anki Flashcards</p>
                  </div>
                </div>

                {/* Overall Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 rounded-lg border border-white/10 bg-white/5">
                    <div className="text-2xl font-black text-white mb-1">
                      {stats.anki.overall.reviewsToday}
                    </div>
                    <div className="text-white/60 text-xs">Reviews Today</div>
                  </div>
                  <div className="text-center p-4 rounded-lg border border-white/10 bg-white/5">
                    <div className="text-xl font-bold text-accent-main mb-1">
                      {stats.anki.overall.matureCardRetentionPercent.toFixed(1)}
                      %
                    </div>
                    <div className="text-white/60 text-xs">Retention Rate</div>
                  </div>
                </div>

                {/* Deck Breakdown */}
                <div className="flex-1">
                  <h4 className="text-white/80 font-semibold mb-3 text-sm">
                    Active Decks
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {stats.anki.decks.slice(0, 5).map((deck) => (
                      <div
                        key={deck.deckName}
                        className="flex items-center justify-between p-2 rounded-lg border border-white/10 bg-white/5"
                      >
                        <div className="flex items-center flex-1 min-w-0">
                          <span className="text-sm mr-2">
                            {getDeckIcon(deck.deckName)}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-white font-medium text-xs truncate">
                              {getDeckDisplayName(deck.deckName)}
                            </div>
                            <div className="text-white/50 text-xs">
                              {deck.matureCards} mature • {deck.newCards} new
                            </div>
                          </div>
                        </div>
                        <div className="text-right ml-2">
                          <div className="text-white font-semibold text-sm">
                            {deck.reviewsToday}
                          </div>
                          <div className="text-white/60 text-xs">today</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex justify-between text-xs text-white/60 mb-2">
                    <span>Overall Progress</span>
                    <span>
                      {stats.anki.overall.cardCounts.mature.toLocaleString()} /{" "}
                      {stats.anki.overall.cardCounts.total.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${(stats.anki.overall.cardCounts.mature / stats.anki.overall.cardCounts.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Spotify - Small Card */}
          {stats?.spotify && (
            <div className="lg:col-span-1 xl:col-span-2 bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150 transition-all duration-400 hover:-translate-y-1 hover:border-white/14">
              {/* Background Gradient */}
              <div className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 opacity-50" />

              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-[20px] mr-3">
                    {stats.spotify.isPlaying ? (
                      <Play size={18} className="text-green-400" />
                    ) : (
                      <Music size={18} className="text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {stats.spotify.isPlaying ? "Now Playing" : "Last Played"}
                    </h3>
                    {stats.spotify.isPlaying && (
                      <div className="flex items-center text-green-400 text-xs">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse" />
                        Live
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  {/* Album Art */}
                  <div className="relative mr-3 flex-shrink-0">
                    <Image
                      src={stats.spotify.albumImageUrl}
                      alt={stats.spotify.album}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-lg shadow-lg"
                    />
                    {stats.spotify.isPlaying && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <Play size={8} className="text-white fill-white" />
                      </div>
                    )}
                  </div>

                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-bold text-sm leading-tight line-clamp-2 mb-1">
                      {stats.spotify.title}
                    </h4>
                    <p className="text-white/70 text-xs mb-1 line-clamp-1">
                      {stats.spotify.artist}
                    </p>
                    <a
                      href={stats.spotify.songUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-green-400 hover:text-white transition-colors text-xs"
                    >
                      <ExternalLink size={10} className="mr-1" />
                      Spotify
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LeetCode Progress - Medium Card */}
          {stats?.leetcode && (
            <div className="lg:col-span-1 xl:col-span-2 bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150 transition-all duration-400 hover:-translate-y-1 hover:border-white/14">
              {/* Background Gradient */}
              <div className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 opacity-50" />

              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-[20px] mr-3">
                    <Trophy size={18} className="text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">LeetCode</h3>
                    <p className="text-white/60 text-sm">Problem Solving</p>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <div className="text-2xl font-black text-white mb-1">
                    {stats.leetcode.totalSolved}
                  </div>
                  <div className="text-white/60 text-xs">
                    of {stats.leetcode.totalAvailable} problems
                  </div>
                  <div className="text-accent-main text-sm font-semibold">
                    {(
                      (stats.leetcode.totalSolved /
                        stats.leetcode.totalAvailable) *
                      100
                    ).toFixed(1)}
                    % complete
                  </div>
                </div>

                {/* Difficulty breakdown */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center p-2 rounded-lg bg-green-500/20 border border-green-500/30">
                    <div className="text-green-400 font-bold">
                      {stats.leetcode.easySolved}
                    </div>
                    <div className="text-white/60">Easy</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-yellow-500/20 border border-yellow-500/30">
                    <div className="text-yellow-400 font-bold">
                      {stats.leetcode.mediumSolved}
                    </div>
                    <div className="text-white/60">Medium</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-red-500/20 border border-red-500/30">
                    <div className="text-red-400 font-bold">
                      {stats.leetcode.hardSolved}
                    </div>
                    <div className="text-white/60">Hard</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Strava Running - Small Card */}
          {stats?.strava && (
            <div className="lg:col-span-1 xl:col-span-2 bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150 transition-all duration-400 hover:-translate-y-1 hover:border-white/14">
              {/* Background Gradient */}
              <div className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-red-500/20 to-orange-500/20 opacity-50" />

              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-[20px] mr-3">
                    <Activity size={18} className="text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Running</h3>
                    <p className="text-white/60 text-sm">Strava Activity</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">Total Runs</span>
                    <span className="text-xl font-bold text-white">
                      {stats.strava.totalRuns}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">Distance</span>
                    <span className="text-white font-semibold">
                      {stats.strava.totalDistanceKm} km
                    </span>
                  </div>
                  {stats.strava.recentRuns[0] && (
                    <div className="pt-2 border-t border-white/10">
                      <div className="text-white/60 text-xs mb-1">
                        Latest Run
                      </div>
                      <div className="text-white font-semibold text-sm">
                        {stats.strava.recentRuns[0].distanceKm} km
                      </div>
                      <div className="text-white/50 text-xs">
                        {formatDate(stats.strava.recentRuns[0].date)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center mt-12">
            <div className="inline-flex items-center px-4 py-2 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400">
              <span className="text-sm">
                ⚠️ Some stats may be unavailable: {error}
              </span>
            </div>
          </div>
        )}

        {/* Tech Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-[40px]">
            <GitBranch size={16} className="mr-2 text-accent-main" />
            <span className="text-sm text-white/70">
              Automated via GitHub Actions • Updated every hour •
              <a
                href="https://github.com/yourusername/your-stats-repo"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-accent-main hover:text-white transition-colors"
              >
                View Source
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

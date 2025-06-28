// src/components/StatsSection.tsx
"use client";

import React, { useState } from "react";
import {
  Activity,
  Brain,
  Code2,
  Trophy,
  Play,
  TrendingUp,
  Zap,
  Sparkles,
  Coffee,
  Flame,
  ChevronDown,
  ChevronUp,
  Eye,
  Layers,
  Cpu,
  Database,
  AlertCircle,
  Wifi,
  WifiOff,
  Clock,
  Calendar,
  Target,
  BarChart3,
  Music,
  Headphones,
  ExternalLink,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Tooltip,
} from "recharts";
import { useStats } from "../hooks/useStats";

// Error Card Component for missing data
const ErrorCard: React.FC<{
  title: string;
  message: string;
  className?: string;
}> = ({ title, message, className = "" }) => (
  <div
    className={`bento-item ease-snappy relative z-2 border border-red-500/20 bg-linear-to-br/oklch from-red-500/10 via-red-500/5 to-red-500/8 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150 ${className}`}
  >
    <div className="flex items-center mb-4">
      <div className="p-3 rounded-xl bg-red-500/20 backdrop-blur-[20px] mr-3">
        <AlertCircle size={20} className="text-red-400" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-red-400 text-sm">Data unavailable</p>
      </div>
    </div>
    <p className="text-white/60 text-sm">{message}</p>
  </div>
);

// Loading Card Component
const LoadingCard: React.FC<{
  title: string;
  className?: string;
}> = ({ title, className = "" }) => (
  <div
    className={`bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150 ${className}`}
  >
    <div className="flex items-center mb-4">
      <div className="p-3 rounded-xl bg-white/10 backdrop-blur-[20px] mr-3">
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white/60"></div>
      </div>
      <div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-white/60 text-sm">Loading data...</p>
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-4 bg-white/10 rounded animate-pulse"></div>
      <div className="h-4 bg-white/10 rounded animate-pulse w-3/4"></div>
      <div className="h-4 bg-white/10 rounded animate-pulse w-1/2"></div>
    </div>
  </div>
);

const StatsSection: React.FC = () => {
  const [activeView, setActiveView] = useState("overview");
  const [expandedCards, setExpandedCards] = useState(new Set<string>());
  const { stats, loading, error } = useStats();

  const toggleCard = (cardId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(cardId)) {
      newExpanded.delete(cardId);
    } else {
      newExpanded.add(cardId);
    }
    setExpandedCards(newExpanded);
  };

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

  // Generate mock chart data based on real stats when available
  const generateChartData = (baseValue: number, days: number = 7) => {
    return Array.from({ length: days }, (_, i) => ({
      day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i] || `Day ${i + 1}`,
      value: Math.max(0, baseValue + Math.random() * 20 - 10),
      trend: Math.random() * 100,
    }));
  };

  // Hero Stats Card Component
  const HeroStatsCard: React.FC<{
    icon: React.ComponentType<{ size: number; className?: string }>;
    title: string;
    value: string | number;
    subtitle?: string;
    color: string;
    trend?: number;
    className?: string;
    isLoading?: boolean;
    hasError?: boolean;
  }> = ({
    icon: Icon,
    title,
    value,
    subtitle,
    color,
    trend,
    className = "",
    isLoading = false,
    hasError = false,
  }) => (
    <div
      className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-700 hover:scale-105 ${className}`}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br opacity-20"
        style={{
          background: `linear-gradient(135deg, ${color}20, ${color}10, transparent)`,
        }}
      />

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-30 animate-[float_3s_ease-in-out_infinite]"
            style={{
              background: color,
              left: `${20 + i * 15}%`,
              top: `${20 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div
            className="p-4 rounded-2xl backdrop-blur-xl"
            style={{ background: `${color}20` }}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/20 border-t-white/60"></div>
            ) : hasError ? (
              <AlertCircle size={32} className="text-red-400" />
            ) : (
              <Icon size={32} style={{ color }} />
            )}
          </div>
          {trend && !isLoading && !hasError && (
            <div className="flex items-center text-emerald-400 text-sm font-semibold">
              <TrendingUp size={16} className="mr-1" />+{trend}%
            </div>
          )}
        </div>

        <div className="mb-2">
          {isLoading ? (
            <>
              <div className="h-10 bg-white/10 rounded animate-pulse mb-2"></div>
              <div className="h-6 bg-white/10 rounded animate-pulse w-3/4"></div>
            </>
          ) : hasError ? (
            <>
              <div className="text-4xl font-black text-red-400 mb-2">--</div>
              <div className="text-red-400/60 text-lg">{title}</div>
              <div className="text-red-400/40 text-sm mt-1">Data unavailable</div>
            </>
          ) : (
            <>
              <div className="text-4xl font-black text-white mb-2">{value}</div>
              <div className="text-white/60 text-lg">{title}</div>
              {subtitle && (
                <div className="text-white/40 text-sm mt-1">{subtitle}</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );

  // Chart Card Component
  const ChartCard: React.FC<{
    title: string;
    children: React.ReactNode;
    className?: string;
    expandable?: boolean;
    cardId?: string;
    isLoading?: boolean;
    hasError?: boolean;
    errorMessage?: string;
  }> = ({
    title,
    children,
    className = "",
    expandable = false,
    cardId,
    isLoading = false,
    hasError = false,
    errorMessage,
  }) => {
    if (isLoading) {
      return <LoadingCard title={title} className={className} />;
    }

    if (hasError) {
      return (
        <ErrorCard
          title={title}
          message={errorMessage || "Unable to load data from API"}
          className={className}
        />
      );
    }

    return (
      <div
        className={`group relative overflow-hidden rounded-3xl backdrop-blur-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 transition-all duration-700 hover:border-white/20 ${className}`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            {expandable && cardId && (
              <button
                onClick={() => toggleCard(cardId)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                {expandedCards.has(cardId) ? (
                  <ChevronUp size={16} className="text-white/60" />
                ) : (
                  <ChevronDown size={16} className="text-white/60" />
                )}
              </button>
            )}
          </div>
          {children}
        </div>
      </div>
    );
  };

  // Custom Tooltip Component
  const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 border border-white/20 rounded-lg p-3 backdrop-blur-xl">
          <p className="text-white/80 text-sm">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-white font-semibold">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <section
        id="stats"
        className="relative min-h-screen bg-black p-4 sm:p-6 lg:p-8"
      >
        <div className="bg-noise bg-cinematic absolute inset-0 animate-[float_25s_ease-in-out_infinite]" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase text-shadow-[0_4px_8px_rgba(0,0,0,0.8)] mb-4">
              Loading Stats
            </h2>
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/20 border-t-accent-main mr-3"></div>
              <p className="text-lg text-white/60">Fetching live data...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="stats"
      className="relative min-h-screen bg-black overflow-hidden p-4 sm:p-6 lg:p-8"
    >
      {/* Background */}
      <div className="bg-noise bg-cinematic absolute inset-0 animate-[float_25s_ease-in-out_infinite]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-accent-main/20 to-accent-mid/20 border border-accent-main/30 mb-6">
            <Sparkles size={20} className="text-accent-main mr-2" />
            <span className="text-accent-main font-semibold">
              Live Analytics Dashboard
            </span>
            {stats?.lastUpdated && (
              <span className="text-white/40 text-xs ml-3">
                Updated {formatDate(stats.lastUpdated)}
              </span>
            )}
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase text-shadow-[0_4px_8px_rgba(0,0,0,0.8)] mb-4">
            Live Stats
          </h2>

          <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto mb-8">
            Real-time insights into my development journey, learning progress,
            and creative pursuits. Powered by intelligent automation.
          </p>

          {/* Navigation */}
          <div className="flex justify-center mb-12">
            <div className="flex rounded-2xl p-2 bg-white/5 border border-white/10 backdrop-blur-xl">
              {["overview", "coding", "learning"].map((view) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`px-6 py-3 rounded-xl font-semibold capitalize transition-all duration-300 ${
                    activeView === view
                      ? "bg-accent-main text-black"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>
        </div>

        {activeView === "overview" && (
          <div className="space-y-12">
            {/* Hero Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <HeroStatsCard
                icon={Code2}
                title="Coding Time"
                value={
                  stats?.wakatime?.today?.codingMinutes
                    ? formatHours(stats.wakatime.today.codingMinutes)
                    : "--"
                }
                subtitle={
                  stats?.wakatime?.today?.primaryLanguage
                    ? `Today • ${stats.wakatime.today.primaryLanguage} focus`
                    : "Today"
                }
                color="#3b82f6"
                trend={12}
                className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20"
                hasError={!stats?.wakatime}
              />

              <HeroStatsCard
                icon={Brain}
                title="Study Cards"
                value={stats?.anki?.overall?.reviewsToday || "--"}
                subtitle={
                  stats?.anki?.overall?.matureCardRetentionPercent
                    ? `${stats.anki.overall.matureCardRetentionPercent}% retention`
                    : "Japanese learning"
                }
                color="#8b5cf6"
                trend={8}
                className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20"
                hasError={!stats?.anki}
              />

              <HeroStatsCard
                icon={Trophy}
                title="Problems Solved"
                value={stats?.leetcode?.totalSolved || "--"}
                subtitle="LeetCode progress"
                color="#f59e0b"
                trend={15}
                className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20"
                hasError={!stats?.leetcode}
              />

              <HeroStatsCard
                icon={Activity}
                title="Total Distance"
                value={
                  stats?.strava?.totalDistanceKm
                    ? `${stats.strava.totalDistanceKm}km`
                    : "--"
                }
                subtitle="Running progress"
                color="#ef4444"
                trend={6}
                className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20"
                hasError={!stats?.strava}
              />
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Coding Activity */}
              <div className="lg:col-span-8">
                <ChartCard
                  title="Coding Activity & Productivity"
                  expandable
                  cardId="coding"
                  hasError={!stats?.wakatime}
                  errorMessage="WakaTime data not available. Please check wakatime-data.json file."
                >
                  {stats?.wakatime && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-4 rounded-xl bg-blue-500/20 border border-blue-500/30">
                          <div className="text-2xl font-black text-white mb-1">
                            {stats.wakatime.weeklyStats.totalHoursLast7Days}h
                          </div>
                          <div className="text-blue-400 text-xs font-semibold">
                            This Week
                          </div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-purple-500/20 border border-purple-500/30">
                          <div className="text-2xl font-black text-white mb-1">
                            {stats.wakatime.weeklyStats.activeDaysCount}
                          </div>
                          <div className="text-purple-400 text-xs font-semibold">
                            Active Days
                          </div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
                          <div className="text-2xl font-black text-white mb-1">
                            {formatHours(stats.wakatime.weeklyStats.dailyAverageMinutes)}
                          </div>
                          <div className="text-emerald-400 text-xs font-semibold">
                            Daily Average
                          </div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-amber-500/20 border border-amber-500/30">
                          <div className="text-2xl font-black text-white mb-1">
                            {stats.wakatime.weeklyStats.consistency}
                          </div>
                          <div className="text-amber-400 text-xs font-semibold">
                            Consistency
                          </div>
                        </div>
                      </div>

                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={generateChartData(stats.wakatime.today.codingMinutes / 60)}>
                            <defs>
                              <linearGradient id="codingGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="day" stroke="rgba(255,255,255,0.6)" fontSize={12} />
                            <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                              type="monotone"
                              dataKey="value"
                              stroke="#3b82f6"
                              fillOpacity={1}
                              fill="url(#codingGradient)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      {expandedCards.has("coding") && (
                        <div className="pt-6 border-t border-white/10">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-white font-semibold mb-4">Environment</h4>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                                  <div className="flex items-center">
                                    <Code2 size={16} className="text-blue-400 mr-3" />
                                    <span className="text-white/80">Editor</span>
                                  </div>
                                  <span className="text-white font-medium">
                                    {stats.wakatime.today.environment.editor}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                                  <div className="flex items-center">
                                    <Cpu size={16} className="text-purple-400 mr-3" />
                                    <span className="text-white/80">OS</span>
                                  </div>
                                  <span className="text-white font-medium">
                                    {stats.wakatime.today.environment.os}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-white font-semibold mb-4">Languages</h4>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-white/80">
                                    {stats.wakatime.weeklyStats.languages.primary}
                                  </span>
                                  <span className="text-white font-semibold">
                                    {stats.wakatime.weeklyStats.languages.primaryPercentage}%
                                  </span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-2">
                                  <div
                                    className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                    style={{
                                      width: `${stats.wakatime.weeklyStats.languages.primaryPercentage}%`,
                                    }}
                                  />
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-white/80">
                                    {stats.wakatime.weeklyStats.languages.secondary}
                                  </span>
                                  <span className="text-white font-semibold">
                                    {stats.wakatime.weeklyStats.languages.secondaryPercentage}%
                                  </span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-2">
                                  <div
                                    className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                                    style={{
                                      width: `${stats.wakatime.weeklyStats.languages.secondaryPercentage}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </ChartCard>
              </div>

              {/* Currently Playing Music */}
              <div className="lg:col-span-4">
                <ChartCard
                  title="Currently Playing"
                  hasError={!stats?.spotify}
                  errorMessage="Spotify data not available. Please check spotify-data.json file."
                >
                  {stats?.spotify && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={stats.spotify.albumImageUrl || "/placeholder-album.jpg"}
                            alt={stats.spotify.album}
                            className="w-16 h-16 rounded-xl shadow-lg"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/placeholder-album.jpg";
                            }}
                          />
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                            {stats.spotify.isPlaying ? (
                              <Play size={10} className="text-white fill-white ml-0.5" />
                            ) : (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-bold text-lg leading-tight mb-1 truncate">
                            {stats.spotify.title}
                          </h4>
                          <p className="text-white/70 text-sm mb-2 truncate">
                            {stats.spotify.artist}
                          </p>
                          <div className="flex items-center text-emerald-400 text-xs">
                            <div
                              className={`w-2 h-2 rounded-full mr-2 ${
                                stats.spotify.isPlaying ? "bg-emerald-400 animate-pulse" : "bg-white/40"
                              }`}
                            />
                            {stats.spotify.isPlaying ? "Now Playing" : "Last Played"}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between">
                          <span className="text-white/70 text-sm">Album</span>
                          <span className="text-white/80 text-sm font-medium truncate max-w-[60%]">
                            {stats.spotify.album}
                          </span>
                        </div>
                        {stats.spotify.songUrl && (
                          <div className="mt-3">
                            <a
                              href={stats.spotify.songUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-emerald-400 rounded-lg border border-emerald-400/20 bg-emerald-400/5 transition-all duration-300 hover:border-emerald-400/40 hover:bg-emerald-400/10"
                            >
                              <Music size={14} className="mr-2" />
                              Open in Spotify
                              <ExternalLink size={12} className="ml-2" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </ChartCard>
              </div>

              {/* Anki Learning Progress */}
              <div className="lg:col-span-6">
                <ChartCard
                  title="Japanese Study Progress"
                  expandable
                  cardId="anki"
                  hasError={!stats?.anki}
                  errorMessage="Anki data not available. Please check anki-data.json file."
                >
                  {stats?.anki && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                          <div className="text-2xl font-black text-white mb-1">
                            {stats.anki.overall.reviewsToday}
                          </div>
                          <div className="text-purple-400 text-xs font-semibold">
                            Reviews Today
                          </div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                          <div className="text-2xl font-black text-white mb-1">
                            {stats.anki.overall.matureCardRetentionPercent}%
                          </div>
                          <div className="text-emerald-400 text-xs font-semibold">
                            Retention Rate
                          </div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30">
                          <div className="text-2xl font-black text-white mb-1">
                            {stats.anki.overall.currentStreakDays}
                          </div>
                          <div className="text-orange-400 text-xs font-semibold">
                            Day Streak
                          </div>
                        </div>
                      </div>

                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={generateChartData(stats.anki.overall.reviewsToday)}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="day" stroke="rgba(255,255,255,0.6)" fontSize={12} />
                            <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      {expandedCards.has("anki") && (
                        <div className="pt-6 border-t border-white/10">
                          <h4 className="text-white font-semibold mb-4">Deck Performance</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {stats.anki.decks.slice(0, 4).map((deck) => (
                              <div
                                key={deck.deckName}
                                className="p-3 rounded-lg bg-white/5 border border-white/10"
                              >
                                <div className="text-white font-medium text-sm mb-1">
                                  {deck.deckName.replace(/[⭐💬🔰🗾🧩]/g, "").trim()}
                                </div>
                                <div className="flex justify-between text-xs text-white/60">
                                  <span>{deck.reviewsToday} reviews</span>
                                  <span>{deck.matureCards} mature</span>
                                </div>
                                <div className="mt-2 w-full bg-white/10 rounded-full h-1">
                                  <div
                                    className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                    style={{
                                      width: `${Math.min((deck.matureCards / deck.totalCards) * 100, 100)}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </ChartCard>
              </div>

              {/* LeetCode Progress */}
              <div className="lg:col-span-6">
                <ChartCard
                  title="Problem Solving Journey"
                  expandable
                  cardId="leetcode"
                  hasError={!stats?.leetcode}
                  errorMessage="LeetCode data not available. Please check leetcode-data.json file."
                >
                  {stats?.leetcode && (
                    <div className="space-y-6">
                      <div className="flex justify-center">
                        <div className="relative w-48 h-48">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  {
                                    name: "Easy",
                                    value: stats.leetcode.easySolved,
                                    fill: "#10b981",
                                  },
                                  {
                                    name: "Medium",
                                    value: stats.leetcode.mediumSolved,
                                    fill: "#f59e0b",
                                  },
                                  {
                                    name: "Hard",
                                    value: stats.leetcode.hardSolved,
                                    fill: "#ef4444",
                                  },
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={5}
                                dataKey="value"
                              >
                                <Cell fill="#10b981" />
                                <Cell fill="#f59e0b" />
                                <Cell fill="#ef4444" />
                              </Pie>
                              <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                          </ResponsiveContainer>

                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-3xl font-black text-white">
                                {stats.leetcode.totalSolved}
                              </div>
                              <div className="text-white/60 text-sm">Solved</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                          <div className="text-xl font-bold text-white">
                            {stats.leetcode.easySolved}
                          </div>
                          <div className="text-emerald-400 text-xs">Easy</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-amber-500/20 border border-amber-500/30">
                          <div className="text-xl font-bold text-white">
                            {stats.leetcode.mediumSolved}
                          </div>
                          <div className="text-amber-400 text-xs">Medium</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                          <div className="text-xl font-bold text-white">
                            {stats.leetcode.hardSolved}
                          </div>
                          <div className="text-red-400 text-xs">Hard</div>
                        </div>
                      </div>

                      {expandedCards.has("leetcode") && (
                        <div className="pt-6 border-t border-white/10">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                              <div className="text-lg font-bold text-white">
                                {Math.round((stats.leetcode.totalSolved / stats.leetcode.totalAvailable) * 100)}%
                              </div>
                              <div className="text-white/60 text-sm">Completion Rate</div>
                            </div>
                            <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                              <div className="text-lg font-bold text-white">
                                {stats.leetcode.totalAvailable - stats.leetcode.totalSolved}
                              </div>
                              <div className="text-white/60 text-sm">Remaining</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </ChartCard>
              </div>

              {/* Strava Fitness */}
              <div className="lg:col-span-12">
                <ChartCard
                  title="Fitness Journey"
                  expandable
                  cardId="strava"
                  hasError={!stats?.strava}
                  errorMessage="Strava data not available. Please check strava-data.json file."
                >
                  {stats?.strava && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30">
                          <div className="text-3xl font-black text-white mb-2">
                            {stats.strava.totalRuns}
                          </div>
                          <div className="text-red-400 text-sm font-semibold">Total Runs</div>
                        </div>
                        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30">
                          <div className="text-3xl font-black text-white mb-2">
                            {stats.strava.totalDistanceKm}
                          </div>
                          <div className="text-orange-400 text-sm font-semibold">Kilometers</div>
                        </div>
                        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30">
                          <div className="text-3xl font-black text-white mb-2">
                            {stats.strava.recentRuns.length}
                          </div>
                          <div className="text-pink-400 text-sm font-semibold">Recent Activities</div>
                        </div>
                      </div>

                      {expandedCards.has("strava") && (
                        <div className="pt-6 border-t border-white/10">
                          <h4 className="text-white font-semibold mb-4">Recent Activities</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {stats.strava.recentRuns.map((run, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
                              >
                                <div className="flex items-center">
                                  <Activity size={20} className="text-red-400 mr-3" />
                                  <div>
                                    <div className="text-white text-sm font-medium">{run.name}</div>
                                    <div className="text-white/60 text-xs">{formatDate(run.date)}</div>
                                  </div>
                                </div>
                                <div className="text-white font-semibold">{run.distanceKm} km</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </ChartCard>
              </div>
            </div>
          </div>
        )}

        {activeView === "coding" && (
          <div className="space-y-8">
            <ChartCard
              title="Development Environment & Languages"
              hasError={!stats?.wakatime}
              errorMessage="WakaTime data not available for detailed coding analytics."
            >
              {stats?.wakatime && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-white font-semibold mb-6">Development Environment</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center">
                          <Code2 size={20} className="text-blue-400 mr-3" />
                          <span className="text-white">Editor</span>
                        </div>
                        <span className="text-white/80 font-medium">
                          {stats.wakatime.today.environment.editor}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center">
                          <Cpu size={20} className="text-purple-400 mr-3" />
                          <span className="text-white">Operating System</span>
                        </div>
                        <span className="text-white/80 font-medium">
                          {stats.wakatime.today.environment.os}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center">
                          <Database size={20} className="text-emerald-400 mr-3" />
                          <span className="text-white">Primary Language</span>
                        </div>
                        <span className="text-white/80 font-medium">
                          {stats.wakatime.today.primaryLanguage}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-6">Language Distribution</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-medium">
                            {stats.wakatime.weeklyStats.languages.primary}
                          </span>
                          <span className="text-white/60">
                            {stats.wakatime.weeklyStats.languages.primaryPercentage}%
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-3">
                          <div
                            className="h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                            style={{
                              width: `${stats.wakatime.weeklyStats.languages.primaryPercentage}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-medium">
                            {stats.wakatime.weeklyStats.languages.secondary}
                          </span>
                          <span className="text-white/60">
                            {stats.wakatime.weeklyStats.languages.secondaryPercentage}%
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-3">
                          <div
                            className="h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000"
                            style={{
                              width: `${stats.wakatime.weeklyStats.languages.secondaryPercentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 rounded-lg bg-blue-500/20 border border-blue-500/30">
                          <div className="text-lg font-bold text-white">
                            {stats.wakatime.status}
                          </div>
                          <div className="text-blue-400 text-xs">Status</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                          <div className="text-lg font-bold text-white">
                            {stats.wakatime.weeklyStats.consistency}
                          </div>
                          <div className="text-emerald-400 text-xs">Consistency</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </ChartCard>
          </div>
        )}

        {activeView === "learning" && (
          <div className="space-y-8">
            <ChartCard
              title="Japanese Learning Analytics"
              hasError={!stats?.anki}
              errorMessage="Anki data not available for detailed learning analytics."
            >
              {stats?.anki && (
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="text-6xl font-black text-white mb-4">
                      {stats.anki.overall.currentStreakDays}
                    </div>
                    <div className="text-accent-main text-xl font-semibold mb-2">
                      Consecutive Study Days
                    </div>
                    <div className="text-white/60">
                      Maintaining consistent daily practice
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center p-6 rounded-xl bg-purple-500/20 border border-purple-500/30">
                      <div className="text-2xl font-black text-white mb-2">
                        {stats.anki.overall.cardCounts.total}
                      </div>
                      <div className="text-purple-400 text-sm font-semibold">Total Cards</div>
                    </div>
                    <div className="text-center p-6 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
                      <div className="text-2xl font-black text-white mb-2">
                        {stats.anki.overall.cardCounts.mature}
                      </div>
                      <div className="text-emerald-400 text-sm font-semibold">Mature Cards</div>
                    </div>
                    <div className="text-center p-6 rounded-xl bg-blue-500/20 border border-blue-500/30">
                      <div className="text-2xl font-black text-white mb-2">
                        {stats.anki.overall.cardCounts.learning}
                      </div>
                      <div className="text-blue-400 text-sm font-semibold">Learning</div>
                    </div>
                    <div className="text-center p-6 rounded-xl bg-amber-500/20 border border-amber-500/30">
                      <div className="text-2xl font-black text-white mb-2">
                        {stats.anki.overall.cardCounts.new}
                      </div>
                      <div className="text-amber-400 text-sm font-semibold">New Cards</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-6">Deck Performance</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {stats.anki.decks.map((deck, index) => (
                        <div
                          key={deck.deckName}
                          className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <Brain size={20} className="text-purple-400" />
                            <div className="text-white/40 text-xs">#{index + 1}</div>
                          </div>
                          <h5 className="text-white font-bold text-lg mb-4">
                            {deck.deckName.replace(/[⭐💬🔰🗾🧩]/g, "").trim()}
                          </h5>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-white/60 text-sm">Reviews Today</span>
                              <span className="text-white font-semibold">{deck.reviewsToday}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/60 text-sm">Mature Cards</span>
                              <span className="text-purple-400 font-semibold">{deck.matureCards}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/60 text-sm">Total Cards</span>
                              <span className="text-white font-semibold">{deck.totalCards}</span>
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-white/60">Progress</span>
                              <span className="text-white">
                                {Math.round((deck.matureCards / deck.totalCards) * 100)}%
                              </span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2">
                              <div
                                className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                                style={{
                                  width: `${(deck.matureCards / deck.totalCards) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </ChartCard>
          </div>
        )}
      </div>
    </section>
  );
};

export default StatsSection;
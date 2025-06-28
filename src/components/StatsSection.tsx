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
  GitBranch,
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
} from "recharts";

// TODO: Parse from /public/wakatime-data.json
// Expected format: { lastUpdated, status, today: { codingMinutes, primaryLanguage, environment: { editor, os } }, weeklyStats: { totalHoursLast7Days, activeDaysCount, languages: { primary, secondary, primaryPercentage, secondaryPercentage }, consistency } }
const mockWakatimeStats = {
  lastUpdated: new Date().toISOString(),
  status: "Active Developer",
  today: {
    codingMinutes: 247,
    primaryLanguage: "TypeScript",
    environment: { editor: "Neovim", os: "Linux" },
  },
  weeklyStats: {
    totalHoursLast7Days: "42.3",
    activeDaysCount: 7,
    languages: {
      primary: "TypeScript",
      secondary: "Python",
      primaryPercentage: "67",
      secondaryPercentage: "18",
    },
    consistency: "Perfect",
  },
  detailed: {
    last30Days: [
      { date: "2025-05-27", hours: 6.2, productivity: 94 },
      { date: "2025-05-28", hours: 8.1, productivity: 87 },
      { date: "2025-05-29", hours: 5.8, productivity: 91 },
      { date: "2025-05-30", hours: 7.3, productivity: 89 },
      { date: "2025-05-31", hours: 6.9, productivity: 92 },
      { date: "2025-06-01", hours: 8.7, productivity: 96 },
      { date: "2025-06-02", hours: 7.4, productivity: 88 },
    ],
    languages: [
      { name: "TypeScript", hours: 284.5, percentage: 67, color: "#3178c6" },
      { name: "Python", hours: 76.2, percentage: 18, color: "#3776ab" },
      { name: "JavaScript", hours: 42.1, percentage: 10, color: "#f7df1e" },
      { name: "Rust", hours: 21.3, percentage: 5, color: "#ce422b" },
    ],
  },
};

// TODO: Parse from /public/anki-data.json
// Expected format: { lastUpdated, overall: { reviewsToday, timeMinutesToday, matureCardRetentionPercent, currentStreakDays, cardCounts: { new, learning, young, mature, total } }, decks: [{ deckName, reviewsToday, matureCards, newCards, totalCards }] }
const mockAnkiStats = {
  lastUpdated: new Date().toISOString(),
  overall: {
    reviewsToday: 127,
    timeMinutesToday: 23,
    matureCardRetentionPercent: 94.2,
    currentStreakDays: 234,
    cardCounts: {
      new: 45,
      learning: 89,
      young: 234,
      mature: 1847,
      total: 2215,
    },
  },
  decks: [
    {
      deckName: "⭐ Core 2k/6k Optimized",
      reviewsToday: 45,
      matureCards: 687,
      newCards: 12,
      totalCards: 756,
    },
    {
      deckName: "💬 決まり文句",
      reviewsToday: 28,
      matureCards: 234,
      newCards: 8,
      totalCards: 298,
    },
    {
      deckName: "🔰 開始 1.5k",
      reviewsToday: 34,
      matureCards: 445,
      newCards: 15,
      totalCards: 512,
    },
  ],
  analytics: {
    dailyReviews: [
      { day: "Mon", reviews: 145, accuracy: 92 },
      { day: "Tue", reviews: 123, accuracy: 94 },
      { day: "Wed", reviews: 156, accuracy: 89 },
      { day: "Thu", reviews: 134, accuracy: 93 },
      { day: "Fri", reviews: 127, accuracy: 91 },
      { day: "Sat", reviews: 98, accuracy: 96 },
      { day: "Sun", reviews: 112, accuracy: 88 },
    ],
  },
};

// TODO: Parse from /public/spotify-data.json
// Expected format: { isPlaying, title, artist, album, albumImageUrl, songUrl }
const mockSpotifyStats = {
  isPlaying: true,
  title: "Steve's Lava Chicken - Extended Version",
  artist: "Jack Black",
  album: "I...Am Steve (Bonus Songs from \"A Minecraft Movie\" Soundtrack)",
  albumImageUrl: "https://i.scdn.co/image/ab67616d0000b273317010be8e46bef819cfb50a",
  songUrl: "https://open.spotify.com/track/26c8pvUxWO1FhxbGM1k8fJ",
  analytics: {
    topGenres: [
      { genre: "Synthwave", percentage: 34, color: "#ff6b6b" },
      { genre: "Lo-fi Hip Hop", percentage: 28, color: "#4ecdc4" },
      { genre: "Ambient", percentage: 22, color: "#45b7d1" },
      { genre: "Classical", percentage: 16, color: "#96ceb4" },
    ],
  },
};

// TODO: Parse from /public/leetcode-data.json
// Expected format: { username, totalSolved, totalAvailable, easySolved, easyAvailable, mediumSolved, mediumAvailable, hardSolved, hardAvailable }
const mockLeetcodeStats = {
  username: "wlmr-rk",
  totalSolved: 287,
  totalAvailable: 3596,
  easySolved: 142,
  easyAvailable: 883,
  mediumSolved: 118,
  mediumAvailable: 1868,
  hardSolved: 27,
  hardAvailable: 845,
  analytics: {
    solvingTrend: [
      { date: "Jan", solved: 45 },
      { date: "Feb", solved: 62 },
      { date: "Mar", solved: 78 },
      { date: "Apr", solved: 91 },
      { date: "May", solved: 104 },
      { date: "Jun", solved: 116 },
    ],
  },
};

// TODO: Parse from /public/strava-data.json
// Expected format: { totalRuns, totalDistanceKm, recentRuns: [{ name, distanceKm, date }] }
const mockStravaStats = {
  totalRuns: 89,
  totalDistanceKm: "456.7",
  recentRuns: [
    { name: "Greenway Park Morning Run", distanceKm: "4.8", date: "2025-06-23" },
    { name: "Day 3 of Running/Walk", distanceKm: "10.2", date: "2025-03-23" },
    { name: "Lunch Walk", distanceKm: "4.7", date: "2019-07-20" },
  ],
  analytics: {
    monthlyDistance: [
      { month: "Jan", distance: 42.3 },
      { month: "Feb", distance: 67.8 },
      { month: "Mar", distance: 78.4 },
      { month: "Apr", distance: 89.2 },
      { month: "May", distance: 94.7 },
      { month: "Jun", distance: 84.3 },
    ],
  },
};

const StatsSection: React.FC = () => {
  const [activeView, setActiveView] = useState("overview");
  const [expandedCards, setExpandedCards] = useState(new Set<string>());

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

  const getDeckDisplayName = (deckName: string) => {
    if (deckName.includes("Core")) return "Core 2k/6k Vocabulary";
    if (deckName.includes("決まり文句")) return "Set Phrases";
    if (deckName.includes("開始")) return "Kaishi 1.5k";
    if (deckName.includes("都道府県")) return "Prefectures";
    if (deckName.includes("Radicals")) return "Radicals";
    return deckName.replace(/[⭐💬🔰🗾🧩]/g, "").trim();
  };

  // Compact Stats Card Component
  const CompactStatsCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    color,
    trend,
    className = "",
  }: {
    icon: React.ComponentType<{ size: number; className?: string }>;
    title: string;
    value: string | number;
    subtitle?: string;
    color: string;
    trend?: number;
    className?: string;
  }) => (
    <div
      className={`bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150 transition-all duration-400 hover:-translate-y-1 hover:border-white/14 ${className}`}
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0 rounded-2xl lg:rounded-3xl opacity-30"
        style={{
          background: `linear-gradient(135deg, ${color}20, ${color}10, transparent)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className="p-3 rounded-xl backdrop-blur-[20px]"
            style={{ background: `${color}20` }}
          >
            <Icon size={20} style={{ color }} />
          </div>
          {trend && (
            <div className="flex items-center text-accent-main text-xs font-semibold">
              <TrendingUp size={12} className="mr-1" />+{trend}%
            </div>
          )}
        </div>

        <div className="mb-2">
          <div className="text-2xl font-black text-white mb-1">{value}</div>
          <div className="text-white/60 text-sm">{title}</div>
          {subtitle && (
            <div className="text-white/40 text-xs mt-1">{subtitle}</div>
          )}
        </div>
      </div>
    </div>
  );

  // Chart Card Component
  const ChartCard = ({
    title,
    children,
    className = "",
    expandable = false,
    cardId,
  }: {
    title: string;
    children: React.ReactNode;
    className?: string;
    expandable?: boolean;
    cardId?: string;
  }) => (
    <div
      className={`bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150 transition-all duration-400 hover:-translate-y-1 hover:border-white/14 ${className}`}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">{title}</h3>
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
            Real-time insights into development, learning, and creative pursuits
          </p>

          {/* Status Indicator */}
          <div className="inline-flex items-center px-6 py-3 rounded-full border border-accent-main/20 bg-accent-main/5 backdrop-blur-[40px] mb-8">
            <Sparkles size={16} className="text-accent-main mr-2" />
            <span className="text-sm font-semibold text-accent-main">
              Live Analytics Dashboard
            </span>
            <span className="ml-3 text-xs text-white/50">•</span>
            <span className="ml-3 text-xs text-white/70">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>

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
          <div className="space-y-8">
            {/* Hero Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <CompactStatsCard
                icon={Code2}
                title="Coding Today"
                value={formatHours(mockWakatimeStats.today.codingMinutes)}
                subtitle={`${mockWakatimeStats.today.primaryLanguage} focus`}
                color="#3b82f6"
                trend={12}
              />

              <CompactStatsCard
                icon={Brain}
                title="Study Cards"
                value={mockAnkiStats.overall.reviewsToday}
                subtitle={`${mockAnkiStats.overall.matureCardRetentionPercent}% retention`}
                color="#8b5cf6"
                trend={8}
              />

              <CompactStatsCard
                icon={Trophy}
                title="Problems Solved"
                value={mockLeetcodeStats.totalSolved}
                subtitle="LeetCode progress"
                color="#f59e0b"
                trend={15}
              />

              <CompactStatsCard
                icon={Activity}
                title="Running Distance"
                value={`${mockStravaStats.totalDistanceKm}km`}
                subtitle="Total distance"
                color="#ef4444"
                trend={6}
              />
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Coding Activity - Large */}
              <div className="lg:col-span-8">
                <ChartCard
                  title="Coding Activity & Productivity"
                  expandable
                  cardId="coding"
                >
                  <div className="space-y-6">
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockWakatimeStats.detailed.last30Days}>
                          <defs>
                            <linearGradient
                              id="codingGradient"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#3b82f6"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="#3b82f6"
                                stopOpacity={0.1}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255,255,255,0.1)"
                          />
                          <XAxis
                            dataKey="date"
                            stroke="rgba(255,255,255,0.6)"
                            fontSize={12}
                          />
                          <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
                          <Area
                            type="monotone"
                            dataKey="hours"
                            stroke="#3b82f6"
                            fillOpacity={1}
                            fill="url(#codingGradient)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 rounded-lg border border-white/10 bg-white/5">
                        <div className="text-lg font-bold text-white">
                          {mockWakatimeStats.weeklyStats.totalHoursLast7Days}h
                        </div>
                        <div className="text-white/60 text-xs">This Week</div>
                      </div>
                      <div className="text-center p-3 rounded-lg border border-white/10 bg-white/5">
                        <div className="text-lg font-bold text-white">
                          {mockWakatimeStats.weeklyStats.activeDaysCount}
                        </div>
                        <div className="text-white/60 text-xs">Active Days</div>
                      </div>
                      <div className="text-center p-3 rounded-lg border border-white/10 bg-white/5">
                        <div className="text-lg font-bold text-white">
                          {mockWakatimeStats.today.environment.editor}
                        </div>
                        <div className="text-white/60 text-xs">Editor</div>
                      </div>
                      <div className="text-center p-3 rounded-lg border border-white/10 bg-white/5">
                        <div className="text-lg font-bold text-white">
                          {mockWakatimeStats.weeklyStats.consistency}
                        </div>
                        <div className="text-white/60 text-xs">Consistency</div>
                      </div>
                    </div>

                    {expandedCards.has("coding") && (
                      <div className="pt-6 border-t border-white/10">
                        <h4 className="text-white font-semibold mb-4">
                          Language Distribution
                        </h4>
                        <div className="space-y-3">
                          {mockWakatimeStats.detailed.languages.map((lang) => (
                            <div
                              key={lang.name}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center">
                                <div
                                  className="w-3 h-3 rounded-full mr-3"
                                  style={{ backgroundColor: lang.color }}
                                />
                                <span className="text-white/80">{lang.name}</span>
                              </div>
                              <div className="flex items-center text-white/60">
                                <span className="mr-2">{lang.hours}h</span>
                                <span className="text-sm">
                                  ({lang.percentage}%)
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </ChartCard>
              </div>

              {/* Live Music */}
              <div className="lg:col-span-4">
                <ChartCard title="Currently Playing">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={mockSpotifyStats.albumImageUrl}
                          alt={mockSpotifyStats.album}
                          className="w-16 h-16 rounded-xl shadow-lg"
                        />
                        {mockSpotifyStats.isPlaying && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                            <Play
                              size={10}
                              className="text-white fill-white ml-0.5"
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-bold text-sm leading-tight mb-1 line-clamp-2">
                          {mockSpotifyStats.title}
                        </h4>
                        <p className="text-white/70 text-xs mb-2 line-clamp-1">
                          {mockSpotifyStats.artist}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-emerald-400 text-xs">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
                            Live
                          </div>
                          <a
                            href={mockSpotifyStats.songUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-emerald-400 hover:text-white transition-colors text-xs"
                          >
                            <ExternalLink size={10} className="mr-1" />
                            Spotify
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <h5 className="text-white/80 text-sm font-semibold mb-3">
                        Genre Distribution
                      </h5>
                      <div className="space-y-2">
                        {mockSpotifyStats.analytics.topGenres.map((genre) => (
                          <div
                            key={genre.genre}
                            className="flex items-center justify-between"
                          >
                            <span className="text-white/70 text-sm">
                              {genre.genre}
                            </span>
                            <span className="text-white/50 text-sm">
                              {genre.percentage}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ChartCard>
              </div>

              {/* Anki Learning Progress */}
              <div className="lg:col-span-6">
                <ChartCard
                  title="Japanese Study Progress"
                  expandable
                  cardId="anki"
                >
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                        <div className="text-xl font-black text-white mb-1">
                          {mockAnkiStats.overall.reviewsToday}
                        </div>
                        <div className="text-purple-400 text-xs font-semibold">
                          Reviews Today
                        </div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                        <div className="text-xl font-black text-white mb-1">
                          {mockAnkiStats.overall.matureCardRetentionPercent}%
                        </div>
                        <div className="text-emerald-400 text-xs font-semibold">
                          Retention Rate
                        </div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30">
                        <div className="text-xl font-black text-white mb-1">
                          {mockAnkiStats.overall.currentStreakDays}
                        </div>
                        <div className="text-orange-400 text-xs font-semibold">
                          Day Streak
                        </div>
                      </div>
                    </div>

                    <div className="h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mockAnkiStats.analytics.dailyReviews}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255,255,255,0.1)"
                          />
                          <XAxis
                            dataKey="day"
                            stroke="rgba(255,255,255,0.6)"
                            fontSize={12}
                          />
                          <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
                          <Bar
                            dataKey="reviews"
                            fill="#8b5cf6"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {expandedCards.has("anki") && (
                      <div className="pt-6 border-t border-white/10">
                        <h4 className="text-white font-semibold mb-4">
                          Deck Performance
                        </h4>
                        <div className="space-y-3">
                          {mockAnkiStats.decks.slice(0, 3).map((deck) => (
                            <div
                              key={deck.deckName}
                              className="p-3 rounded-lg bg-white/5 border border-white/10"
                            >
                              <div className="text-white font-medium text-sm mb-1">
                                {getDeckDisplayName(deck.deckName)}
                              </div>
                              <div className="flex justify-between text-xs text-white/60">
                                <span>{deck.reviewsToday} reviews</span>
                                <span>{deck.matureCards} mature</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </ChartCard>
              </div>

              {/* LeetCode & Problem Solving */}
              <div className="lg:col-span-6">
                <ChartCard
                  title="Problem Solving Journey"
                  expandable
                  cardId="leetcode"
                >
                  <div className="space-y-6">
                    <div className="flex justify-center">
                      <div className="relative w-32 h-32">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                {
                                  name: "Easy",
                                  value: mockLeetcodeStats.easySolved,
                                  fill: "#10b981",
                                },
                                {
                                  name: "Medium",
                                  value: mockLeetcodeStats.mediumSolved,
                                  fill: "#f59e0b",
                                },
                                {
                                  name: "Hard",
                                  value: mockLeetcodeStats.hardSolved,
                                  fill: "#ef4444",
                                },
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={60}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {[
                                {
                                  name: "Easy",
                                  value: mockLeetcodeStats.easySolved,
                                  fill: "#10b981",
                                },
                                {
                                  name: "Medium",
                                  value: mockLeetcodeStats.mediumSolved,
                                  fill: "#f59e0b",
                                },
                                {
                                  name: "Hard",
                                  value: mockLeetcodeStats.hardSolved,
                                  fill: "#ef4444",
                                },
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>

                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl font-black text-white">
                              {mockLeetcodeStats.totalSolved}
                            </div>
                            <div className="text-white/60 text-xs">Solved</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                        <div className="text-lg font-bold text-white">
                          {mockLeetcodeStats.easySolved}
                        </div>
                        <div className="text-emerald-400 text-xs">Easy</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-amber-500/20 border border-amber-500/30">
                        <div className="text-lg font-bold text-white">
                          {mockLeetcodeStats.mediumSolved}
                        </div>
                        <div className="text-amber-400 text-xs">Medium</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                        <div className="text-lg font-bold text-white">
                          {mockLeetcodeStats.hardSolved}
                        </div>
                        <div className="text-red-400 text-xs">Hard</div>
                      </div>
                    </div>

                    {expandedCards.has("leetcode") && (
                      <div className="pt-6 border-t border-white/10">
                        <h4 className="text-white font-semibold mb-3">
                          Monthly Progress
                        </h4>
                        <div className="h-24">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={mockLeetcodeStats.analytics.solvingTrend}
                            >
                              <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="rgba(255,255,255,0.1)"
                              />
                              <XAxis
                                dataKey="date"
                                stroke="rgba(255,255,255,0.6)"
                                fontSize={10}
                              />
                              <YAxis
                                stroke="rgba(255,255,255,0.6)"
                                fontSize={10}
                              />
                              <Line
                                type="monotone"
                                dataKey="solved"
                                stroke="#f59e0b"
                                strokeWidth={2}
                                dot={{
                                  fill: "#f59e0b",
                                  strokeWidth: 2,
                                  r: 3,
                                }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}
                  </div>
                </ChartCard>
              </div>

              {/* Strava Running */}
              <div className="lg:col-span-12">
                <ChartCard title="Fitness Journey" expandable cardId="strava">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="h-32">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={mockStravaStats.analytics.monthlyDistance}
                          >
                            <defs>
                              <linearGradient
                                id="stravaGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="5%"
                                  stopColor="#ef4444"
                                  stopOpacity={0.8}
                                />
                                <stop
                                  offset="95%"
                                  stopColor="#ef4444"
                                  stopOpacity={0.1}
                                />
                              </linearGradient>
                            </defs>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="rgba(255,255,255,0.1)"
                            />
                            <XAxis
                              dataKey="month"
                              stroke="rgba(255,255,255,0.6)"
                              fontSize={12}
                            />
                            <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
                            <Area
                              type="monotone"
                              dataKey="distance"
                              stroke="#ef4444"
                              fillOpacity={1}
                              fill="url(#stravaGradient)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                          <div className="text-lg font-bold text-white">
                            {mockStravaStats.totalRuns}
                          </div>
                          <div className="text-red-400 text-xs">Total Runs</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-orange-500/20 border border-orange-500/30">
                          <div className="text-lg font-bold text-white">
                            {mockStravaStats.totalDistanceKm}
                          </div>
                          <div className="text-orange-400 text-xs">
                            Kilometers
                          </div>
                        </div>
                      </div>

                      {expandedCards.has("strava") && (
                        <div>
                          <h4 className="text-white font-semibold mb-3 text-sm">
                            Recent Activities
                          </h4>
                          <div className="space-y-2">
                            {mockStravaStats.recentRuns
                              .slice(0, 2)
                              .map((run, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10"
                                >
                                  <div className="flex items-center">
                                    <Activity
                                      size={14}
                                      className="text-red-400 mr-2"
                                    />
                                    <div>
                                      <div className="text-white text-xs font-medium">
                                        {run.name}
                                      </div>
                                      <div className="text-white/60 text-xs">
                                        {formatDate(run.date)}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-white font-semibold text-sm">
                                    {run.distanceKm} km
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </ChartCard>
              </div>
            </div>
          </div>
        )}

        {activeView === "coding" && (
          <div className="space-y-8">
            <ChartCard title="Development Deep Dive">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-4">
                    Technology Stack
                  </h4>
                  <div className="space-y-4">
                    {mockWakatimeStats.detailed.languages.map((lang) => (
                      <div key={lang.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div
                              className="w-3 h-3 rounded-full mr-3"
                              style={{ backgroundColor: lang.color }}
                            />
                            <span className="text-white text-sm font-medium">
                              {lang.name}
                            </span>
                          </div>
                          <span className="text-white/60 text-sm">
                            {lang.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-1000"
                            style={{
                              width: `${lang.percentage}%`,
                              backgroundColor: lang.color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-4">
                    Development Environment
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center">
                        <Code2 size={16} className="text-blue-400 mr-3" />
                        <span className="text-white text-sm">Editor</span>
                      </div>
                      <span className="text-white/80 text-sm font-medium">
                        {mockWakatimeStats.today.environment.editor}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center">
                        <Cpu size={16} className="text-purple-400 mr-3" />
                        <span className="text-white text-sm">Platform</span>
                      </div>
                      <span className="text-white/80 text-sm font-medium">
                        {mockWakatimeStats.today.environment.os}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center">
                        <Database size={16} className="text-emerald-400 mr-3" />
                        <span className="text-white text-sm">
                          Primary Language
                        </span>
                      </div>
                      <span className="text-white/80 text-sm font-medium">
                        {mockWakatimeStats.today.primaryLanguage}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ChartCard>
          </div>
        )}

        {activeView === "learning" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="Japanese Mastery Progress">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-black text-white mb-2">
                      {mockAnkiStats.overall.currentStreakDays}
                    </div>
                    <div className="text-accent-main text-lg font-semibold">
                      Consecutive Days
                    </div>
                    <div className="text-white/60 text-sm">
                      Current study streak
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-xl bg-purple-500/20 border border-purple-500/30">
                      <div className="text-xl font-bold text-white">
                        {mockAnkiStats.overall.cardCounts.mature}
                      </div>
                      <div className="text-purple-400 text-sm">Mature Cards</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-blue-500/20 border border-blue-500/30">
                      <div className="text-xl font-bold text-white">
                        {mockAnkiStats.overall.matureCardRetentionPercent}%
                      </div>
                      <div className="text-blue-400 text-sm">Retention Rate</div>
                    </div>
                  </div>
                </div>
              </ChartCard>

              <ChartCard title="Weekly Study Pattern">
                <div className="space-y-6">
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockAnkiStats.analytics.dailyReviews}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="rgba(255,255,255,0.1)"
                        />
                        <XAxis
                          dataKey="day"
                          stroke="rgba(255,255,255,0.6)"
                          fontSize={12}
                        />
                        <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
                        <Bar
                          dataKey="reviews"
                          fill="#8b5cf6"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </ChartCard>
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
                href="https://github.com/wlmr-rk/proj-nexus"
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
// src/components/StatsSection.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  Calendar,
  Clock,
  Target,
  BarChart3,
  PieChart as PieChartIcon,
  TrendingDown,
  Award,
  BookOpen,
  Headphones,
  Music,
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
  Legend,
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
    dailyAverageMinutes: 363,
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
      { date: "May 27", hours: 6.2, productivity: 94, commits: 12 },
      { date: "May 28", hours: 8.1, productivity: 87, commits: 8 },
      { date: "May 29", hours: 5.8, productivity: 91, commits: 15 },
      { date: "May 30", hours: 7.3, productivity: 89, commits: 11 },
      { date: "May 31", hours: 6.9, productivity: 92, commits: 9 },
      { date: "Jun 01", hours: 8.7, productivity: 96, commits: 18 },
      { date: "Jun 02", hours: 7.4, productivity: 88, commits: 14 },
      { date: "Jun 03", hours: 6.1, productivity: 85, commits: 7 },
      { date: "Jun 04", hours: 8.9, productivity: 93, commits: 16 },
      { date: "Jun 05", hours: 7.8, productivity: 90, commits: 13 },
      { date: "Jun 06", hours: 6.5, productivity: 94, commits: 10 },
      { date: "Jun 07", hours: 9.2, productivity: 97, commits: 22 },
      { date: "Jun 08", hours: 7.1, productivity: 86, commits: 9 },
      { date: "Jun 09", hours: 8.4, productivity: 91, commits: 17 },
    ],
    languages: [
      { name: "TypeScript", hours: 284.5, percentage: 67, color: "#3178c6", trend: 12 },
      { name: "Python", hours: 76.2, percentage: 18, color: "#3776ab", trend: -3 },
      { name: "JavaScript", hours: 42.1, percentage: 10, color: "#f7df1e", trend: 5 },
      { name: "Rust", hours: 21.3, percentage: 5, color: "#ce422b", trend: 8 },
    ],
    projects: [
      { name: "Portfolio Website", hours: 89.4, commits: 47, files: 23, completion: 85 },
      { name: "AI Dashboard", hours: 76.8, commits: 31, files: 18, completion: 72 },
      { name: "React Components", hours: 54.2, commits: 28, files: 15, completion: 90 },
      { name: "API Gateway", hours: 42.1, commits: 19, files: 12, completion: 65 },
    ],
    streak: {
      current: 47,
      longest: 89,
      weekAverage: 6.8,
    },
    productivity: {
      focusScore: 94,
      deepWorkHours: 6.7,
      distractions: 3,
      efficiency: 92,
      peakHours: "14:00-17:00",
    },
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
      accuracy: 92,
    },
    {
      deckName: "💬 決まり文句",
      reviewsToday: 28,
      matureCards: 234,
      newCards: 8,
      totalCards: 298,
      accuracy: 89,
    },
    {
      deckName: "🔰 開始 1.5k",
      reviewsToday: 34,
      matureCards: 445,
      newCards: 15,
      totalCards: 512,
      accuracy: 95,
    },
  ],
  analytics: {
    dailyReviews: [
      { day: "Mon", reviews: 145, accuracy: 92, timeMinutes: 28 },
      { day: "Tue", reviews: 123, accuracy: 94, timeMinutes: 24 },
      { day: "Wed", reviews: 156, accuracy: 89, timeMinutes: 31 },
      { day: "Thu", reviews: 134, accuracy: 93, timeMinutes: 26 },
      { day: "Fri", reviews: 127, accuracy: 91, timeMinutes: 23 },
      { day: "Sat", reviews: 98, accuracy: 96, timeMinutes: 19 },
      { day: "Sun", reviews: 112, accuracy: 88, timeMinutes: 21 },
    ],
    retentionTrend: [
      { week: "Week 1", retention: 89, cards: 1200 },
      { week: "Week 2", retention: 91, cards: 1350 },
      { week: "Week 3", retention: 93, cards: 1500 },
      { week: "Week 4", retention: 94.2, cards: 1650 },
    ],
    cardTypes: [
      { type: "Vocabulary", count: 1200, mastered: 890 },
      { type: "Grammar", count: 450, mastered: 320 },
      { type: "Kanji", count: 565, mastered: 437 },
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
      { genre: "Synthwave", percentage: 34, color: "#ff6b6b", hours: 45 },
      { genre: "Lo-fi Hip Hop", percentage: 28, color: "#4ecdc4", hours: 37 },
      { genre: "Ambient", percentage: 22, color: "#45b7d1", hours: 29 },
      { genre: "Classical", percentage: 16, color: "#96ceb4", hours: 21 },
    ],
    listeningHours: [
      { month: "Jan", hours: 67, tracks: 890 },
      { month: "Feb", hours: 72, tracks: 945 },
      { month: "Mar", hours: 89, tracks: 1120 },
      { month: "Apr", hours: 94, tracks: 1200 },
      { month: "May", hours: 103, tracks: 1350 },
      { month: "Jun", hours: 87, tracks: 1100 },
    ],
    topArtists: [
      { name: "HOME", plays: 234 },
      { name: "Boards of Canada", plays: 189 },
      { name: "Tycho", plays: 156 },
      { name: "Emancipator", plays: 134 },
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
      { date: "Jan", solved: 45, easy: 28, medium: 15, hard: 2 },
      { date: "Feb", solved: 62, easy: 35, medium: 22, hard: 5 },
      { date: "Mar", solved: 78, easy: 42, medium: 28, hard: 8 },
      { date: "Apr", solved: 91, easy: 48, medium: 32, hard: 11 },
      { date: "May", solved: 104, easy: 55, medium: 36, hard: 13 },
      { date: "Jun", solved: 116, easy: 60, medium: 40, hard: 16 },
    ],
    topicDistribution: [
      { topic: "Arrays", solved: 45, total: 120, difficulty: "Medium" },
      { topic: "Trees", solved: 32, total: 89, difficulty: "Hard" },
      { topic: "Dynamic Programming", solved: 28, total: 156, difficulty: "Hard" },
      { topic: "Graphs", solved: 23, total: 87, difficulty: "Hard" },
      { topic: "Strings", solved: 38, total: 94, difficulty: "Easy" },
      { topic: "Hash Tables", solved: 41, total: 76, difficulty: "Medium" },
    ],
    weeklyActivity: [
      { day: "Mon", problems: 3, timeMinutes: 45 },
      { day: "Tue", problems: 2, timeMinutes: 30 },
      { day: "Wed", problems: 4, timeMinutes: 60 },
      { day: "Thu", problems: 1, timeMinutes: 15 },
      { day: "Fri", problems: 3, timeMinutes: 45 },
      { day: "Sat", problems: 5, timeMinutes: 75 },
      { day: "Sun", problems: 2, timeMinutes: 30 },
    ],
  },
};

// TODO: Parse from /public/strava-data.json
// Expected format: { totalRuns, totalDistanceKm, recentRuns: [{ name, distanceKm, date }] }
const mockStravaStats = {
  totalRuns: 89,
  totalDistanceKm: "456.7",
  recentRuns: [
    { name: "Greenway Park Morning Run", distanceKm: "4.8", date: "2025-06-23", pace: "5:12", elevation: 45 },
    { name: "Day 3 of Running/Walk", distanceKm: "10.2", date: "2025-03-23", pace: "5:45", elevation: 120 },
    { name: "Lunch Walk", distanceKm: "4.7", date: "2019-07-20", pace: "6:30", elevation: 20 },
  ],
  analytics: {
    monthlyDistance: [
      { month: "Jan", distance: 42.3, runs: 12, avgPace: "5:45" },
      { month: "Feb", distance: 67.8, runs: 18, avgPace: "5:30" },
      { month: "Mar", distance: 78.4, runs: 21, avgPace: "5:20" },
      { month: "Apr", distance: 89.2, runs: 24, avgPace: "5:15" },
      { month: "May", distance: 94.7, runs: 26, avgPace: "5:10" },
      { month: "Jun", distance: 84.3, runs: 22, avgPace: "5:12" },
    ],
    weeklyPattern: [
      { day: "Mon", distance: 5.2, frequency: 85 },
      { day: "Tue", distance: 3.8, frequency: 60 },
      { day: "Wed", distance: 6.1, frequency: 90 },
      { day: "Thu", distance: 4.5, frequency: 70 },
      { day: "Fri", distance: 5.8, frequency: 80 },
      { day: "Sat", distance: 8.2, frequency: 95 },
      { day: "Sun", distance: 7.1, frequency: 88 },
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

  // Enhanced Stats Card Component
  const EnhancedStatsCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    color,
    trend,
    trendDirection = "up",
    className = "",
    children,
  }: {
    icon: React.ComponentType<{ size: number; className?: string }>;
    title: string;
    value: string | number;
    subtitle?: string;
    color: string;
    trend?: number;
    trendDirection?: "up" | "down";
    className?: string;
    children?: React.ReactNode;
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
            <div className={`flex items-center text-xs font-semibold ${
              trendDirection === "up" ? "text-accent-main" : "text-red-400"
            }`}>
              {trendDirection === "up" ? (
                <TrendingUp size={12} className="mr-1" />
              ) : (
                <TrendingDown size={12} className="mr-1" />
              )}
              {trendDirection === "up" ? "+" : ""}{trend}%
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

        {children}
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
    subtitle,
  }: {
    title: string;
    children: React.ReactNode;
    className?: string;
    expandable?: boolean;
    cardId?: string;
    subtitle?: string;
  }) => (
    <div
      className={`bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150 transition-all duration-400 hover:-translate-y-1 hover:border-white/14 ${className}`}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            {subtitle && (
              <p className="text-white/60 text-sm mt-1">{subtitle}</p>
            )}
          </div>
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

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 border border-white/20 rounded-lg p-3 backdrop-blur-xl">
          <p className="text-white font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-white/80 text-sm">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
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
            Real-time insights into development, learning, and creative pursuits powered by intelligent automation
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
              {["overview", "coding", "learning", "analytics"].map((view) => (
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
              <EnhancedStatsCard
                icon={Code2}
                title="Coding Today"
                value={formatHours(mockWakatimeStats.today.codingMinutes)}
                subtitle={`${mockWakatimeStats.today.primaryLanguage} focus`}
                color="#3b82f6"
                trend={12}
              >
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="flex justify-between text-xs text-white/60">
                    <span>Efficiency</span>
                    <span className="text-accent-main font-semibold">
                      {mockWakatimeStats.detailed.productivity.efficiency}%
                    </span>
                  </div>
                </div>
              </EnhancedStatsCard>

              <EnhancedStatsCard
                icon={Brain}
                title="Study Cards"
                value={mockAnkiStats.overall.reviewsToday}
                subtitle={`${mockAnkiStats.overall.matureCardRetentionPercent}% retention`}
                color="#8b5cf6"
                trend={8}
              >
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="flex justify-between text-xs text-white/60">
                    <span>Streak</span>
                    <span className="text-purple-400 font-semibold">
                      {mockAnkiStats.overall.currentStreakDays} days
                    </span>
                  </div>
                </div>
              </EnhancedStatsCard>

              <EnhancedStatsCard
                icon={Trophy}
                title="Problems Solved"
                value={mockLeetcodeStats.totalSolved}
                subtitle="LeetCode progress"
                color="#f59e0b"
                trend={15}
              >
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="flex justify-between text-xs text-white/60">
                    <span>This Month</span>
                    <span className="text-amber-400 font-semibold">
                      +{mockLeetcodeStats.analytics.solvingTrend[5].solved - mockLeetcodeStats.analytics.solvingTrend[4].solved}
                    </span>
                  </div>
                </div>
              </EnhancedStatsCard>

              <EnhancedStatsCard
                icon={Activity}
                title="Running Distance"
                value={`${mockStravaStats.totalDistanceKm}km`}
                subtitle="Total distance"
                color="#ef4444"
                trend={6}
              >
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="flex justify-between text-xs text-white/60">
                    <span>Avg Pace</span>
                    <span className="text-red-400 font-semibold">
                      {mockStravaStats.analytics.monthlyDistance[5].avgPace}/km
                    </span>
                  </div>
                </div>
              </EnhancedStatsCard>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Coding Activity - Large */}
              <div className="lg:col-span-8">
                <ChartCard
                  title="Development Velocity & Productivity"
                  subtitle="Daily coding hours and productivity metrics"
                  expandable
                  cardId="coding"
                >
                  <div className="space-y-6">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={mockWakatimeStats.detailed.last30Days}>
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
                          <Tooltip content={<CustomTooltip />} />
                          <Area
                            type="monotone"
                            dataKey="hours"
                            stroke="#3b82f6"
                            fillOpacity={1}
                            fill="url(#codingGradient)"
                            name="Hours"
                          />
                          <Line
                            type="monotone"
                            dataKey="productivity"
                            stroke="#10b981"
                            strokeWidth={2}
                            dot={{ fill: "#10b981", strokeWidth: 2, r: 3 }}
                            name="Productivity %"
                          />
                          <Bar
                            dataKey="commits"
                            fill="#f59e0b"
                            opacity={0.7}
                            name="Commits"
                          />
                        </ComposedChart>
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
                          {mockWakatimeStats.detailed.streak.current}
                        </div>
                        <div className="text-white/60 text-xs">Day Streak</div>
                      </div>
                      <div className="text-center p-3 rounded-lg border border-white/10 bg-white/5">
                        <div className="text-lg font-bold text-white">
                          {mockWakatimeStats.detailed.productivity.focusScore}%
                        </div>
                        <div className="text-white/60 text-xs">Focus Score</div>
                      </div>
                      <div className="text-center p-3 rounded-lg border border-white/10 bg-white/5">
                        <div className="text-lg font-bold text-white">
                          {mockWakatimeStats.detailed.productivity.peakHours}
                        </div>
                        <div className="text-white/60 text-xs">Peak Hours</div>
                      </div>
                    </div>

                    {expandedCards.has("coding") && (
                      <div className="pt-6 border-t border-white/10 space-y-6">
                        <div>
                          <h4 className="text-white font-semibold mb-4">
                            Language Distribution & Trends
                          </h4>
                          <div className="space-y-3">
                            {mockWakatimeStats.detailed.languages.map((lang) => (
                              <div
                                key={lang.name}
                                className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                              >
                                <div className="flex items-center">
                                  <div
                                    className="w-3 h-3 rounded-full mr-3"
                                    style={{ backgroundColor: lang.color }}
                                  />
                                  <span className="text-white/80">{lang.name}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <span className="text-white/60 text-sm">
                                    {lang.hours}h ({lang.percentage}%)
                                  </span>
                                  <div className={`flex items-center text-xs ${
                                    lang.trend > 0 ? "text-accent-main" : "text-red-400"
                                  }`}>
                                    {lang.trend > 0 ? (
                                      <TrendingUp size={12} className="mr-1" />
                                    ) : (
                                      <TrendingDown size={12} className="mr-1" />
                                    )}
                                    {lang.trend > 0 ? "+" : ""}{lang.trend}%
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-white font-semibold mb-4">
                            Active Projects
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {mockWakatimeStats.detailed.projects.map((project) => (
                              <div
                                key={project.name}
                                className="p-3 rounded-lg bg-white/5 border border-white/10"
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <div className="text-white font-medium text-sm">
                                    {project.name}
                                  </div>
                                  <div className="text-accent-main text-xs font-semibold">
                                    {project.completion}%
                                  </div>
                                </div>
                                <div className="text-white/60 text-xs mb-2">
                                  {project.hours}h • {project.commits} commits • {project.files} files
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-1">
                                  <div
                                    className="h-1 bg-gradient-to-r from-accent-main to-accent-mid rounded-full"
                                    style={{ width: `${project.completion}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ChartCard>
              </div>

              {/* Live Music */}
              <div className="lg:col-span-4">
                <ChartCard title="Music & Audio Analytics">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Image
                          src={mockSpotifyStats.albumImageUrl}
                          alt={mockSpotifyStats.album}
                          width={64}
                          height={64}
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
                        Listening Habits
                      </h5>
                      <div className="space-y-3">
                        <div className="h-24">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={mockSpotifyStats.analytics.topGenres}
                                cx="50%"
                                cy="50%"
                                innerRadius={20}
                                outerRadius={40}
                                paddingAngle={5}
                                dataKey="percentage"
                              >
                                {mockSpotifyStats.analytics.topGenres.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="space-y-2">
                          {mockSpotifyStats.analytics.topGenres.map((genre) => (
                            <div
                              key={genre.genre}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center">
                                <div
                                  className="w-2 h-2 rounded-full mr-2"
                                  style={{ backgroundColor: genre.color }}
                                />
                                <span className="text-white/70 text-xs">
                                  {genre.genre}
                                </span>
                              </div>
                              <span className="text-white/50 text-xs">
                                {genre.hours}h ({genre.percentage}%)
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ChartCard>
              </div>

              {/* Anki Learning Progress */}
              <div className="lg:col-span-6">
                <ChartCard
                  title="Japanese Study Analytics"
                  subtitle="Comprehensive learning progress tracking"
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

                    <div className="h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={mockAnkiStats.analytics.dailyReviews}>
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
                          <Tooltip content={<CustomTooltip />} />
                          <Bar
                            dataKey="reviews"
                            fill="#8b5cf6"
                            radius={[4, 4, 0, 0]}
                            name="Reviews"
                          />
                          <Line
                            type="monotone"
                            dataKey="accuracy"
                            stroke="#10b981"
                            strokeWidth={2}
                            dot={{ fill: "#10b981", strokeWidth: 2, r: 3 }}
                            name="Accuracy %"
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>

                    {expandedCards.has("anki") && (
                      <div className="pt-6 border-t border-white/10 space-y-6">
                        <div>
                          <h4 className="text-white font-semibold mb-4">
                            Card Type Distribution
                          </h4>
                          <div className="space-y-3">
                            {mockAnkiStats.analytics.cardTypes.map((type) => (
                              <div
                                key={type.type}
                                className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                              >
                                <span className="text-white/80 text-sm">{type.type}</span>
                                <div className="flex items-center space-x-3">
                                  <div className="w-20 h-2 bg-white/10 rounded-full">
                                    <div
                                      className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                      style={{
                                        width: `${(type.mastered / type.count) * 100}%`,
                                      }}
                                    />
                                  </div>
                                  <span className="text-white/60 text-sm">
                                    {type.mastered}/{type.count}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-white font-semibold mb-4">
                            Deck Performance
                          </h4>
                          <div className="space-y-3">
                            {mockAnkiStats.decks.map((deck) => (
                              <div
                                key={deck.deckName}
                                className="p-3 rounded-lg bg-white/5 border border-white/10"
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <div className="text-white font-medium text-sm">
                                    {getDeckDisplayName(deck.deckName)}
                                  </div>
                                  <div className="text-accent-main text-xs font-semibold">
                                    {deck.accuracy}% accuracy
                                  </div>
                                </div>
                                <div className="flex justify-between text-xs text-white/60">
                                  <span>{deck.reviewsToday} reviews today</span>
                                  <span>{deck.matureCards} mature cards</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ChartCard>
              </div>

              {/* LeetCode & Problem Solving */}
              <div className="lg:col-span-6">
                <ChartCard
                  title="Problem Solving Analytics"
                  subtitle="Algorithmic thinking and coding challenges"
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
                            <Tooltip content={<CustomTooltip />} />
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
                        <div className="text-white/50 text-xs mt-1">
                          {Math.round((mockLeetcodeStats.easySolved / mockLeetcodeStats.easyAvailable) * 100)}%
                        </div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-amber-500/20 border border-amber-500/30">
                        <div className="text-lg font-bold text-white">
                          {mockLeetcodeStats.mediumSolved}
                        </div>
                        <div className="text-amber-400 text-xs">Medium</div>
                        <div className="text-white/50 text-xs mt-1">
                          {Math.round((mockLeetcodeStats.mediumSolved / mockLeetcodeStats.mediumAvailable) * 100)}%
                        </div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                        <div className="text-lg font-bold text-white">
                          {mockLeetcodeStats.hardSolved}
                        </div>
                        <div className="text-red-400 text-xs">Hard</div>
                        <div className="text-white/50 text-xs mt-1">
                          {Math.round((mockLeetcodeStats.hardSolved / mockLeetcodeStats.hardAvailable) * 100)}%
                        </div>
                      </div>
                    </div>

                    {expandedCards.has("leetcode") && (
                      <div className="pt-6 border-t border-white/10 space-y-6">
                        <div>
                          <h4 className="text-white font-semibold mb-3">
                            Monthly Progress Trend
                          </h4>
                          <div className="h-32">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart
                                data={mockLeetcodeStats.analytics.solvingTrend}
                              >
                                <defs>
                                  <linearGradient
                                    id="leetcodeGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                  >
                                    <stop
                                      offset="5%"
                                      stopColor="#f59e0b"
                                      stopOpacity={0.8}
                                    />
                                    <stop
                                      offset="95%"
                                      stopColor="#f59e0b"
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
                                  fontSize={10}
                                />
                                <YAxis
                                  stroke="rgba(255,255,255,0.6)"
                                  fontSize={10}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                  type="monotone"
                                  dataKey="solved"
                                  stroke="#f59e0b"
                                  fillOpacity={1}
                                  fill="url(#leetcodeGradient)"
                                  name="Total Solved"
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-white font-semibold mb-3">
                            Topic Mastery
                          </h4>
                          <div className="space-y-2">
                            {mockLeetcodeStats.analytics.topicDistribution.map(
                              (topic) => (
                                <div
                                  key={topic.topic}
                                  className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10"
                                >
                                  <div className="flex items-center">
                                    <span className="text-white/80 text-sm">
                                      {topic.topic}
                                    </span>
                                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                                      topic.difficulty === "Easy" ? "bg-emerald-500/20 text-emerald-400" :
                                      topic.difficulty === "Medium" ? "bg-amber-500/20 text-amber-400" :
                                      "bg-red-500/20 text-red-400"
                                    }`}>
                                      {topic.difficulty}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <div className="w-16 h-2 bg-white/10 rounded-full">
                                      <div
                                        className="h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                                        style={{
                                          width: `${(topic.solved / topic.total) * 100}%`,
                                        }}
                                      />
                                    </div>
                                    <span className="text-white/60 text-sm">
                                      {topic.solved}/{topic.total}
                                    </span>
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ChartCard>
              </div>

              {/* Strava Running */}
              <div className="lg:col-span-12">
                <ChartCard title="Fitness & Health Analytics" expandable cardId="strava">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart
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
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                              type="monotone"
                              dataKey="distance"
                              stroke="#ef4444"
                              fillOpacity={1}
                              fill="url(#stravaGradient)"
                              name="Distance (km)"
                            />
                            <Bar
                              dataKey="runs"
                              fill="#f97316"
                              opacity={0.7}
                              name="Number of Runs"
                            />
                          </ComposedChart>
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

                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                          <div className="text-white/70 text-xs mb-1">Average Pace</div>
                          <div className="text-white font-semibold">
                            {mockStravaStats.analytics.monthlyDistance[5].avgPace}/km
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                          <div className="text-white/70 text-xs mb-1">This Month</div>
                          <div className="text-white font-semibold">
                            {mockStravaStats.analytics.monthlyDistance[5].distance}km
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
                              .slice(0, 3)
                              .map((run, index) => (
                                <div
                                  key={index}
                                  className="p-3 rounded-lg bg-white/5 border border-white/10"
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center">
                                      <Activity
                                        size={14}
                                        className="text-red-400 mr-2"
                                      />
                                      <div className="text-white text-xs font-medium">
                                        {run.name}
                                      </div>
                                    </div>
                                    <div className="text-white font-semibold text-sm">
                                      {run.distanceKm} km
                                    </div>
                                  </div>
                                  <div className="flex justify-between text-xs text-white/60">
                                    <span>{formatDate(run.date)}</span>
                                    <span>{run.pace}/km • {run.elevation}m elevation</span>
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
            <ChartCard title="Development Deep Dive" subtitle="Comprehensive coding analytics and insights">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-4">
                    Technology Stack & Trends
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
                          <div className="flex items-center space-x-2">
                            <span className="text-white/60 text-sm">
                              {lang.percentage}%
                            </span>
                            <div className={`flex items-center text-xs ${
                              lang.trend > 0 ? "text-accent-main" : "text-red-400"
                            }`}>
                              {lang.trend > 0 ? (
                                <TrendingUp size={12} className="mr-1" />
                              ) : (
                                <TrendingDown size={12} className="mr-1" />
                              )}
                              {lang.trend > 0 ? "+" : ""}{lang.trend}%
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-1000"
                            style={{
                              width: `${lang.percentage}%`,
                              backgroundColor: lang.color,
                              boxShadow: `0 0 8px ${lang.color}50`,
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
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center">
                        <Clock size={16} className="text-amber-400 mr-3" />
                        <span className="text-white text-sm">Peak Hours</span>
                      </div>
                      <span className="text-white/80 text-sm font-medium">
                        {mockWakatimeStats.detailed.productivity.peakHours}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ChartCard>

            <ChartCard title="Project Portfolio & Productivity">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockWakatimeStats.detailed.projects.map((project, index) => (
                  <div
                    key={project.name}
                    className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-accent-main/30 transition-all duration-500 hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-main/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <Layers size={20} className="text-accent-main" />
                        <div className="text-white/40 text-xs">
                          #{index + 1}
                        </div>
                      </div>

                      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-accent-main transition-colors">
                        {project.name}
                      </h3>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">Hours</span>
                          <span className="text-white font-semibold">
                            {project.hours}h
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Commits</span>
                          <span className="text-white font-semibold">
                            {project.commits}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Files</span>
                          <span className="text-white font-semibold">
                            {project.files}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Progress</span>
                          <span className="text-accent-main font-semibold">
                            {project.completion}%
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div
                            className="h-2 bg-gradient-to-r from-accent-main to-accent-mid rounded-full transition-all duration-1000"
                            style={{
                              width: `${project.completion}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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

                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockAnkiStats.analytics.retentionTrend}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="rgba(255,255,255,0.1)"
                        />
                        <XAxis
                          dataKey="week"
                          stroke="rgba(255,255,255,0.6)"
                          fontSize={12}
                        />
                        <YAxis
                          stroke="rgba(255,255,255,0.6)"
                          fontSize={12}
                          domain={[85, 100]}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="retention"
                          stroke="#8b5cf6"
                          strokeWidth={3}
                          dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 6 }}
                          name="Retention %"
                        />
                      </LineChart>
                    </ResponsiveContainer>
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
                      <ComposedChart data={mockAnkiStats.analytics.dailyReviews}>
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
                        <Tooltip content={<CustomTooltip />} />
                        <Bar
                          dataKey="reviews"
                          fill="#8b5cf6"
                          radius={[4, 4, 0, 0]}
                          name="Reviews"
                        />
                        <Line
                          type="monotone"
                          dataKey="accuracy"
                          stroke="#10b981"
                          strokeWidth={2}
                          dot={{ fill: "#10b981", strokeWidth: 2, r: 3 }}
                          name="Accuracy %"
                        />
                        <Bar
                          dataKey="timeMinutes"
                          fill="#f59e0b"
                          opacity={0.6}
                          name="Time (min)"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">
                        Average Daily Reviews
                      </span>
                      <span className="text-white font-semibold">
                        {Math.round(
                          mockAnkiStats.analytics.dailyReviews.reduce(
                            (sum, day) => sum + day.reviews,
                            0,
                          ) / 7,
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Average Accuracy</span>
                      <span className="text-emerald-400 font-semibold">
                        {Math.round(
                          mockAnkiStats.analytics.dailyReviews.reduce(
                            (sum, day) => sum + day.accuracy,
                            0,
                          ) / 7,
                        )}
                        %
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Study Time Today</span>
                      <span className="text-white font-semibold">
                        {mockAnkiStats.overall.timeMinutesToday}m
                      </span>
                    </div>
                  </div>
                </div>
              </ChartCard>
            </div>

            {/* Detailed Deck Analysis */}
            <ChartCard title="Detailed Deck Analysis">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockAnkiStats.decks.map((deck, index) => (
                  <div
                    key={deck.deckName}
                    className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-purple-500/30 transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <Brain size={20} className="text-purple-400" />
                        <div className="text-purple-400 text-xs font-semibold">
                          {deck.accuracy}% accuracy
                        </div>
                      </div>

                      <h3 className="text-white font-bold text-lg mb-4 group-hover:text-purple-400 transition-colors">
                        {getDeckDisplayName(deck.deckName)}
                      </h3>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-white/60 text-sm">
                            Reviews Today
                          </span>
                          <span className="text-white font-semibold">
                            {deck.reviewsToday}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60 text-sm">
                            Mature Cards
                          </span>
                          <span className="text-purple-400 font-semibold">
                            {deck.matureCards}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60 text-sm">
                            New Cards
                          </span>
                          <span className="text-emerald-400 font-semibold">
                            {deck.newCards}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-white/60">Progress</span>
                          <span className="text-white">
                            {Math.round(
                              (deck.matureCards / deck.totalCards) * 100,
                            )}
                            %
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
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>
        )}

        {activeView === "analytics" && (
          <div className="space-y-8">
            {/* Advanced Analytics Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="Performance Correlation Matrix">
                <div className="space-y-6">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        data={[
                          { subject: "Coding", A: 95, fullMark: 100 },
                          { subject: "Learning", A: 88, fullMark: 100 },
                          { subject: "Problem Solving", A: 82, fullMark: 100 },
                          { subject: "Consistency", A: 94, fullMark: 100 },
                          { subject: "Growth", A: 91, fullMark: 100 },
                          { subject: "Focus", A: 89, fullMark: 100 },
                        ]}
                      >
                        <PolarGrid />
                        <PolarAngleAxis
                          dataKey="subject"
                          className="text-white/60"
                          fontSize={12}
                        />
                        <PolarRadiusAxis
                          angle={90}
                          domain={[0, 100]}
                          className="text-white/40"
                          fontSize={10}
                        />
                        <Radar
                          name="Performance"
                          dataKey="A"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 rounded-lg bg-blue-500/20 border border-blue-500/30">
                      <div className="text-lg font-bold text-white">91.5</div>
                      <div className="text-blue-400 text-xs">Overall Score</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                      <div className="text-lg font-bold text-white">+8.3</div>
                      <div className="text-emerald-400 text-xs">
                        Monthly Gain
                      </div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-purple-500/20 border border-purple-500/30">
                      <div className="text-lg font-bold text-white">A+</div>
                      <div className="text-purple-400 text-xs">
                        Performance Grade
                      </div>
                    </div>
                  </div>
                </div>
              </ChartCard>

              <ChartCard title="Productivity & Focus Analysis">
                <div className="space-y-6">
                  <div className="relative w-48 h-48 mx-auto">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            {
                              name: "Focus",
                              value: mockWakatimeStats.detailed.productivity.focusScore,
                              fill: "#10b981",
                            },
                            {
                              name: "Background",
                              value: 100 - mockWakatimeStats.detailed.productivity.focusScore,
                              fill: "rgba(255,255,255,0.1)",
                            },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={85}
                          startAngle={90}
                          endAngle={-270}
                          dataKey="value"
                          cornerRadius={20}
                        >
                          <Cell key="cell-0" fill="#10b981" />
                          <Cell
                            key="cell-1"
                            fill="rgba(255,255,255,0.1)"
                            stroke="none"
                          />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Flame size={24} className="text-emerald-400 mb-2" />
                      <div className="text-4xl font-black text-white">
                        {mockWakatimeStats.detailed.productivity.focusScore}%
                      </div>
                      <div className="text-white/60 text-sm">Focus Score</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/10">
                    <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                      <Coffee
                        size={20}
                        className="mx-auto mb-2 text-orange-400"
                      />
                      <div className="text-lg font-bold text-white">
                        {mockWakatimeStats.detailed.productivity.deepWorkHours}h
                      </div>
                      <div className="text-white/60 text-xs">Deep Work</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                      <Zap size={20} className="mx-auto mb-2 text-blue-400" />
                      <div className="text-lg font-bold text-white">
                        {mockWakatimeStats.detailed.productivity.efficiency}%
                      </div>
                      <div className="text-white/60 text-xs">Efficiency</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                      <Eye size={20} className="mx-auto mb-2 text-red-400" />
                      <div className="text-lg font-bold text-white">
                        {mockWakatimeStats.detailed.productivity.distractions}
                      </div>
                      <div className="text-white/60 text-xs">Distractions</div>
                    </div>
                  </div>
                </div>
              </ChartCard>
            </div>

            {/* Cross-Platform Analytics */}
            <ChartCard title="Cross-Platform Activity Correlation">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-4">
                    Weekly Activity Patterns
                  </h4>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={mockLeetcodeStats.analytics.weeklyActivity}>
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
                        <Tooltip content={<CustomTooltip />} />
                        <Bar
                          dataKey="problems"
                          fill="#f59e0b"
                          radius={[4, 4, 0, 0]}
                          name="Problems Solved"
                        />
                        <Line
                          type="monotone"
                          dataKey="timeMinutes"
                          stroke="#10b981"
                          strokeWidth={2}
                          dot={{ fill: "#10b981", strokeWidth: 2, r: 3 }}
                          name="Time (minutes)"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-4">
                    Fitness Activity Distribution
                  </h4>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockStravaStats.analytics.weeklyPattern}>
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
                        <Tooltip content={<CustomTooltip />} />
                        <Bar
                          dataKey="distance"
                          fill="#ef4444"
                          radius={[4, 4, 0, 0]}
                          name="Distance (km)"
                        />
                        <Bar
                          dataKey="frequency"
                          fill="#f97316"
                          opacity={0.6}
                          name="Frequency %"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </ChartCard>
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
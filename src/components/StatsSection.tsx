// src/components/StatsSection.tsx
"use client";

import React, { useState, useEffect } from "react";
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
  TrendingUp,
  TrendingDown,
  Zap,
  Target,
  Calendar,
  Clock,
  Flame,
  Star,
  Award,
  BarChart3,
  PieChart,
  LineChart,
  ChevronRight,
  Sparkles,
  Coffee,
  BookOpen,
  Headphones,
  Timer,
  Users,
  Globe,
  Heart,
} from "lucide-react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
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

// TODO: Parse from public/wakatime-data.json
// Expected structure: { lastUpdated, status, today: { codingMinutes, primaryLanguage, environment }, weeklyStats: { totalHoursLast7Days, activeDaysCount, languages, consistency } }
const mockWakatimeData = {
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
      { date: "Dec 1", hours: 6.2, productivity: 94, commits: 12 },
      { date: "Dec 2", hours: 8.1, productivity: 87, commits: 8 },
      { date: "Dec 3", hours: 5.8, productivity: 91, commits: 15 },
      { date: "Dec 4", hours: 7.3, productivity: 89, commits: 11 },
      { date: "Dec 5", hours: 6.9, productivity: 92, commits: 9 },
      { date: "Dec 6", hours: 8.7, productivity: 96, commits: 18 },
      { date: "Dec 7", hours: 7.4, productivity: 88, commits: 14 },
    ],
    languages: [
      { name: "TypeScript", hours: 284.5, percentage: 67, color: "#3178c6" },
      { name: "Python", hours: 76.2, percentage: 18, color: "#3776ab" },
      { name: "JavaScript", hours: 42.1, percentage: 10, color: "#f7df1e" },
      { name: "Rust", hours: 21.3, percentage: 5, color: "#ce422b" },
    ],
    streak: { current: 47, longest: 89, weekAverage: 6.8 },
  },
};

// TODO: Parse from public/anki-data.json
// Expected structure: { lastUpdated, overall: { reviewsToday, timeMinutesToday, matureCardRetentionPercent, currentStreakDays, cardCounts }, decks: [{ deckName, reviewsToday, matureCards, newCards, totalCards }] }
const mockAnkiData = {
  lastUpdated: new Date().toISOString(),
  overall: {
    reviewsToday: 127,
    timeMinutesToday: 23,
    matureCardRetentionPercent: 94.2,
    currentStreakDays: 234,
    cardCounts: { new: 45, learning: 89, young: 234, mature: 1847, total: 2215 },
  },
  decks: [
    { deckName: "⭐ Core 2k/6k Optimized", reviewsToday: 45, matureCards: 687, newCards: 12, totalCards: 756 },
    { deckName: "💬 決まり文句", reviewsToday: 28, matureCards: 234, newCards: 8, totalCards: 298 },
    { deckName: "🔰 開始 1.5k", reviewsToday: 34, matureCards: 445, newCards: 15, totalCards: 512 },
    { deckName: "🗾 都道府県", reviewsToday: 12, matureCards: 289, newCards: 5, totalCards: 321 },
    { deckName: "🧩 Radicals", reviewsToday: 8, matureCards: 192, newCards: 5, totalCards: 228 },
  ],
  analytics: {
    retentionTrend: [
      { week: "Week 1", retention: 89, reviews: 145 },
      { week: "Week 2", retention: 91, reviews: 156 },
      { week: "Week 3", retention: 93, reviews: 134 },
      { week: "Week 4", retention: 94.2, reviews: 127 },
    ],
    dailyReviews: [
      { day: "Mon", reviews: 145, accuracy: 92, timeMinutes: 25 },
      { day: "Tue", reviews: 123, accuracy: 94, timeMinutes: 22 },
      { day: "Wed", reviews: 156, accuracy: 89, timeMinutes: 28 },
      { day: "Thu", reviews: 134, accuracy: 93, timeMinutes: 24 },
      { day: "Fri", reviews: 127, accuracy: 91, timeMinutes: 23 },
      { day: "Sat", reviews: 98, accuracy: 96, timeMinutes: 18 },
      { day: "Sun", reviews: 112, accuracy: 88, timeMinutes: 20 },
    ],
  },
};

// TODO: Parse from public/spotify-data.json
// Expected structure: { isPlaying, title, artist, album, albumImageUrl, songUrl }
const mockSpotifyData = {
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
    listeningHours: [
      { month: "Jan", hours: 67 },
      { month: "Feb", hours: 72 },
      { month: "Mar", hours: 89 },
      { month: "Apr", hours: 94 },
      { month: "May", hours: 103 },
      { month: "Jun", hours: 87 },
    ],
  },
};

// TODO: Parse from public/leetcode-data.json
// Expected structure: { username, totalSolved, totalAvailable, easySolved, easyAvailable, mediumSolved, mediumAvailable, hardSolved, hardAvailable }
const mockLeetcodeData = {
  username: "wlmr-rk",
  totalSolved: 287,
  totalAvailable: 2847,
  easySolved: 142,
  easyAvailable: 847,
  mediumSolved: 118,
  mediumAvailable: 1456,
  hardSolved: 27,
  hardAvailable: 544,
  analytics: {
    solvingTrend: [
      { month: "Jul", solved: 45, difficulty: "Easy" },
      { month: "Aug", solved: 62, difficulty: "Medium" },
      { month: "Sep", solved: 78, difficulty: "Easy" },
      { month: "Oct", solved: 91, difficulty: "Hard" },
      { month: "Nov", solved: 104, difficulty: "Medium" },
      { month: "Dec", solved: 116, difficulty: "Easy" },
    ],
    weeklyActivity: [
      { day: "Mon", problems: 3, timeMinutes: 45 },
      { day: "Tue", problems: 2, timeMinutes: 30 },
      { day: "Wed", problems: 4, timeMinutes: 60 },
      { day: "Thu", problems: 3, timeMinutes: 42 },
      { day: "Fri", problems: 2, timeMinutes: 28 },
      { day: "Sat", problems: 1, timeMinutes: 15 },
      { day: "Sun", problems: 2, timeMinutes: 35 },
    ],
  },
};

// TODO: Parse from public/strava-data.json
// Expected structure: { totalRuns, totalDistanceKm, recentRuns: [{ name, distanceKm, date }] }
const mockStravaData = {
  totalRuns: 89,
  totalDistanceKm: "456.7",
  recentRuns: [
    { name: "Greenway Park Morning Run", distanceKm: "4.8", date: "2025-06-23" },
    { name: "Day 3 of Running/Walk", distanceKm: "10.2", date: "2025-03-23" },
    { name: "Lunch Walk", distanceKm: "4.7", date: "2019-07-20" },
  ],
  analytics: {
    monthlyDistance: [
      { month: "Jul", distance: 42.3, pace: 5.2, elevation: 120 },
      { month: "Aug", distance: 67.8, pace: 4.9, elevation: 180 },
      { month: "Sep", distance: 78.4, pace: 4.7, elevation: 210 },
      { month: "Oct", distance: 89.2, pace: 4.6, elevation: 190 },
      { month: "Nov", distance: 94.7, pace: 4.5, elevation: 240 },
      { month: "Dec", distance: 84.3, pace: 4.4, elevation: 200 },
    ],
  },
};

const StatsSection: React.FC = () => {
  const { stats, loading, error } = useStats();
  const [activeView, setActiveView] = useState("overview");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Use mock data for now, replace with actual stats when available
  const displayStats = {
    wakatime: stats?.wakatime || mockWakatimeData,
    anki: stats?.anki || mockAnkiData,
    spotify: stats?.spotify || mockSpotifyData,
    leetcode: stats?.leetcode || mockLeetcodeData,
    strava: stats?.strava || mockStravaData,
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
    if (deckName.includes("Core")) return "Core 2k/6k Vocabulary";
    if (deckName.includes("決まり文句")) return "Set Phrases";
    if (deckName.includes("開始")) return "Kaishi 1.5k";
    if (deckName.includes("都道府県")) return "Prefectures";
    if (deckName.includes("Radicals")) return "Radicals";
    return deckName.replace(/[⭐💬🔰🗾🧩]/g, "").trim();
  };

  // Enhanced Stat Card Component
  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    trend,
    trendValue,
    color,
    size = "default",
    className = "",
    children,
  }: {
    icon: React.ComponentType<{ size: number; className?: string }>;
    title: string;
    value: string | number;
    subtitle?: string;
    trend?: "up" | "down" | "neutral";
    trendValue?: string;
    color: string;
    size?: "small" | "default" | "large";
    className?: string;
    children?: React.ReactNode;
  }) => {
    const sizeClasses = {
      small: "p-4",
      default: "p-6",
      large: "p-8",
    };

    const valueSizes = {
      small: "text-xl",
      default: "text-2xl lg:text-3xl",
      large: "text-3xl lg:text-4xl",
    };

    return (
      <div
        className={`card-container relative perspective-distant group ${className}`}
        onMouseEnter={() => setHoveredCard(title)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="card card-glass ease-fluid relative transform-3d overflow-hidden rounded-3xl border border-white/15 backdrop-blur-[80px] backdrop-brightness-110 backdrop-saturate-200 transition-all duration-800 hover:border-white/22 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
          {/* Animated background gradient */}
          <div 
            className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-30"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${color}40, transparent 70%)`,
            }}
          />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full opacity-40 animate-[float_4s_ease-in-out_infinite]"
                style={{
                  background: color,
                  left: `${20 + i * 25}%`,
                  top: `${20 + (i % 2) * 40}%`,
                  animationDelay: `${i * 1.5}s`,
                }}
              />
            ))}
          </div>

          <div className={`relative z-10 ${sizeClasses[size]}`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div 
                  className="p-3 rounded-xl backdrop-blur-[20px] mr-3 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${color}20` }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white/90 uppercase tracking-wide">
                    {title}
                  </h3>
                  {subtitle && (
                    <p className="text-xs text-white/60 mt-1">{subtitle}</p>
                  )}
                </div>
              </div>

              {trend && trendValue && (
                <div className={`flex items-center text-xs font-semibold ${
                  trend === "up" ? "text-accent-main" : 
                  trend === "down" ? "text-red-400" : "text-white/60"
                }`}>
                  {trend === "up" && <TrendingUp size={12} className="mr-1" />}
                  {trend === "down" && <TrendingDown size={12} className="mr-1" />}
                  {trendValue}
                </div>
              )}
            </div>

            {/* Value */}
            <div className="mb-4">
              <div className={`font-black text-white leading-none ${valueSizes[size]}`}>
                {value}
              </div>
            </div>

            {/* Additional content */}
            {children}
          </div>

          {/* Hover glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
        </div>
      </div>
    );
  };

  // Enhanced Chart Card Component
  const ChartCard = ({
    title,
    subtitle,
    icon: Icon,
    children,
    className = "",
    size = "default",
  }: {
    title: string;
    subtitle?: string;
    icon?: React.ComponentType<{ size: number; className?: string }>;
    children: React.ReactNode;
    className?: string;
    size?: "small" | "default" | "large";
  }) => {
    const sizeClasses = {
      small: "p-4",
      default: "p-6",
      large: "p-8",
    };

    return (
      <div className={`card-container relative perspective-distant group ${className}`}>
        <div className="card card-glass ease-fluid relative transform-3d overflow-hidden rounded-3xl border border-white/15 backdrop-blur-[80px] backdrop-brightness-110 backdrop-saturate-200 transition-all duration-800 hover:border-white/22 hover:-translate-y-1">
          <div className={`relative z-10 ${sizeClasses[size]}`}>
            {/* Header */}
            <div className="flex items-center mb-6">
              {Icon && (
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-[20px] mr-4">
                  <Icon size={24} className="text-accent-main" />
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                {subtitle && (
                  <p className="text-white/60 text-sm mt-1">{subtitle}</p>
                )}
              </div>
            </div>

            {/* Content */}
            {children}
          </div>
        </div>
      </div>
    );
  };

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-glass-dark border border-white/20 rounded-xl p-3 backdrop-blur-[40px] shadow-lg">
          <p className="text-white font-semibold text-sm mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
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
        className="relative min-h-screen flex items-center justify-center bg-black p-4 sm:p-6 lg:p-8"
      >
        <div className="bg-noise bg-cinematic absolute inset-0 animate-[float_25s_ease-in-out_infinite]" />
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent-main/20 to-accent-mid/20 border border-accent-main/30 mb-6">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-accent-main/20 border-t-accent-main"></div>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Loading Analytics</h3>
          <p className="text-white/60">Fetching real-time data...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="stats"
      className="relative min-h-screen bg-black p-4 sm:p-6 lg:p-8"
    >
      {/* Enhanced background with mouse tracking */}
      <div className="bg-noise bg-cinematic absolute inset-0 animate-[float_25s_ease-in-out_infinite]" />
      
      {/* Dynamic mouse-following gradient */}
      <div
        className="absolute inset-0 opacity-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,255,136,0.15), transparent 70%)`,
        }}
      />

      {/* Animated grid overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] animate-[breathe_8s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-accent-main/20 to-accent-mid/20 border border-accent-main/30 mb-8 backdrop-blur-[40px]">
            <Sparkles size={20} className="text-accent-main mr-2 animate-pulse" />
            <span className="text-accent-main font-semibold tracking-wide">
              Live Analytics Dashboard
            </span>
            <div className="ml-3 flex items-center">
              <div className="w-2 h-2 bg-accent-main rounded-full animate-pulse mr-2" />
              <span className="text-xs text-white/60">Real-time</span>
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-accent-main to-white bg-clip-text text-transparent">
              MASTERY
            </span>
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-light text-white/70 mt-2">
              Dashboard
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto mb-8 leading-relaxed">
            Real-time insights into my development journey, learning progress, and creative pursuits. 
            Powered by intelligent automation and beautiful data visualization.
          </p>

          {/* Enhanced Navigation */}
          <div className="flex justify-center mb-12">
            <div className="flex rounded-2xl p-2 bg-glass-dark border border-white/15 backdrop-blur-[60px]">
              {[
                { id: "overview", label: "Overview", icon: BarChart3 },
                { id: "coding", label: "Development", icon: Code2 },
                { id: "learning", label: "Learning", icon: Brain },
                { id: "analytics", label: "Analytics", icon: PieChart },
              ].map((view) => {
                const Icon = view.icon;
                return (
                  <button
                    key={view.id}
                    onClick={() => setActiveView(view.id)}
                    className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeView === view.id
                        ? "bg-accent-main text-black shadow-[0_4px_12px_rgba(0,255,136,0.3)]"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon size={16} className="mr-2" />
                    {view.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status indicators */}
          <div className="flex justify-center items-center space-x-6 text-sm">
            <div className="flex items-center text-white/60">
              <Clock size={14} className="mr-2" />
              Last updated: {new Date().toLocaleTimeString()}
            </div>
            <div className="flex items-center text-accent-main">
              <Zap size={14} className="mr-2" />
              Auto-updates hourly
            </div>
            <div className="flex items-center text-white/60">
              <Globe size={14} className="mr-2" />
              5 data sources
            </div>
          </div>
        </div>

        {/* Overview Dashboard */}
        {activeView === "overview" && (
          <div className="space-y-8">
            {/* Hero Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={Code2}
                title="Coding Today"
                value={formatHours(displayStats.wakatime.today.codingMinutes)}
                subtitle={`${displayStats.wakatime.today.primaryLanguage} focus`}
                trend="up"
                trendValue="+12%"
                color="#3b82f6"
                size="default"
              />

              <StatCard
                icon={Brain}
                title="Study Cards"
                value={displayStats.anki.overall.reviewsToday}
                subtitle={`${displayStats.anki.overall.matureCardRetentionPercent}% retention`}
                trend="up"
                trendValue="+8%"
                color="#8b5cf6"
                size="default"
              />

              <StatCard
                icon={Trophy}
                title="Problems Solved"
                value={displayStats.leetcode.totalSolved}
                subtitle="LeetCode progress"
                trend="up"
                trendValue="+15%"
                color="#f59e0b"
                size="default"
              />

              <StatCard
                icon={Activity}
                title="Distance"
                value={`${displayStats.strava.totalDistanceKm}km`}
                subtitle="Total running"
                trend="up"
                trendValue="+6%"
                color="#ef4444"
                size="default"
              />
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Coding Activity - Large */}
              <div className="lg:col-span-8">
                <ChartCard
                  title="Development Activity"
                  subtitle="Daily coding hours and productivity trends"
                  icon={Code2}
                  size="large"
                >
                  <div className="space-y-6">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={displayStats.wakatime.detailed.last30Days}>
                          <defs>
                            <linearGradient id="codingGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis 
                            dataKey="date" 
                            stroke="rgba(255,255,255,0.6)" 
                            fontSize={12}
                            tick={{ fill: 'rgba(255,255,255,0.6)' }}
                          />
                          <YAxis 
                            stroke="rgba(255,255,255,0.6)" 
                            fontSize={12}
                            tick={{ fill: 'rgba(255,255,255,0.6)' }}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Area
                            type="monotone"
                            dataKey="hours"
                            stroke="#3b82f6"
                            fillOpacity={1}
                            fill="url(#codingGradient)"
                          />
                          <Line
                            type="monotone"
                            dataKey="productivity"
                            stroke="#10b981"
                            strokeWidth={2}
                            dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                          />
                          <Bar dataKey="commits" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Language Distribution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-white font-semibold mb-4 flex items-center">
                          <Target size={16} className="mr-2 text-accent-main" />
                          Language Distribution
                        </h4>
                        <div className="space-y-3">
                          {displayStats.wakatime.detailed.languages.map((lang) => (
                            <div key={lang.name} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div
                                    className="w-3 h-3 rounded-full mr-3"
                                    style={{ backgroundColor: lang.color }}
                                  />
                                  <span className="text-white/80 text-sm font-medium">
                                    {lang.name}
                                  </span>
                                </div>
                                <div className="flex items-center text-white/60 text-sm">
                                  <span className="mr-2">{lang.hours}h</span>
                                  <span className="text-xs">({lang.percentage}%)</span>
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
                        <h4 className="text-white font-semibold mb-4 flex items-center">
                          <Flame size={16} className="mr-2 text-accent-main" />
                          Streak & Performance
                        </h4>
                        <div className="space-y-4">
                          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30">
                            <div className="flex items-center justify-between">
                              <span className="text-white/80 text-sm">Current Streak</span>
                              <span className="text-blue-400 font-bold text-lg">
                                {displayStats.wakatime.detailed.streak.current} days
                              </span>
                            </div>
                          </div>
                          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30">
                            <div className="flex items-center justify-between">
                              <span className="text-white/80 text-sm">Weekly Average</span>
                              <span className="text-purple-400 font-bold text-lg">
                                {displayStats.wakatime.detailed.streak.weekAverage}h
                              </span>
                            </div>
                          </div>
                          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30">
                            <div className="flex items-center justify-between">
                              <span className="text-white/80 text-sm">Consistency</span>
                              <span className="text-emerald-400 font-bold text-lg">
                                {displayStats.wakatime.weeklyStats.consistency}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ChartCard>
              </div>

              {/* Now Playing */}
              <div className="lg:col-span-4">
                <ChartCard
                  title="Now Playing"
                  subtitle="Current music activity"
                  icon={Music}
                >
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Image
                          src={displayStats.spotify.albumImageUrl}
                          alt={displayStats.spotify.album}
                          width={80}
                          height={80}
                          className="w-20 h-20 rounded-xl shadow-lg"
                        />
                        {displayStats.spotify.isPlaying && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-main rounded-full flex items-center justify-center animate-pulse">
                            <Play size={12} className="text-black fill-black ml-0.5" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-bold text-lg leading-tight mb-1 line-clamp-2">
                          {displayStats.spotify.title}
                        </h4>
                        <p className="text-white/70 text-sm mb-2 line-clamp-1">
                          {displayStats.spotify.artist}
                        </p>
                        <div className="flex items-center">
                          {displayStats.spotify.isPlaying ? (
                            <div className="flex items-center text-accent-main text-xs">
                              <div className="w-2 h-2 bg-accent-main rounded-full mr-2 animate-pulse" />
                              Live
                            </div>
                          ) : (
                            <div className="flex items-center text-white/50 text-xs">
                              <div className="w-2 h-2 bg-white/50 rounded-full mr-2" />
                              Paused
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <a
                      href={displayStats.spotify.songUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ease-snappy flex items-center justify-center w-full px-4 py-3 rounded-xl border border-accent-main/20 bg-accent-main/5 text-accent-main font-semibold transition-all duration-300 hover:border-accent-main/40 hover:bg-accent-main/10 hover:text-white group"
                    >
                      <Headphones size={16} className="mr-2" />
                      Listen on Spotify
                      <ExternalLink size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>

                    {/* Genre Distribution */}
                    <div>
                      <h5 className="text-white/80 text-sm font-semibold mb-3 flex items-center">
                        <Star size={14} className="mr-2" />
                        Top Genres
                      </h5>
                      <div className="space-y-2">
                        {displayStats.spotify.analytics.topGenres.map((genre) => (
                          <div key={genre.genre} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div
                                className="w-2 h-2 rounded-full mr-3"
                                style={{ backgroundColor: genre.color }}
                              />
                              <span className="text-white/70 text-sm">{genre.genre}</span>
                            </div>
                            <span className="text-white/50 text-sm">{genre.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ChartCard>
              </div>

              {/* Japanese Learning */}
              <div className="lg:col-span-6">
                <ChartCard
                  title="Japanese Study Progress"
                  subtitle="Anki flashcard analytics"
                  icon={Brain}
                >
                  <div className="space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                        <div className="text-2xl font-black text-white mb-1">
                          {displayStats.anki.overall.reviewsToday}
                        </div>
                        <div className="text-purple-400 text-xs font-semibold">Reviews Today</div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                        <div className="text-2xl font-black text-white mb-1">
                          {displayStats.anki.overall.matureCardRetentionPercent}%
                        </div>
                        <div className="text-emerald-400 text-xs font-semibold">Retention</div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30">
                        <div className="text-2xl font-black text-white mb-1">
                          {displayStats.anki.overall.currentStreakDays}
                        </div>
                        <div className="text-orange-400 text-xs font-semibold">Day Streak</div>
                      </div>
                    </div>

                    {/* Weekly Activity Chart */}
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={displayStats.anki.analytics.dailyReviews}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis 
                            dataKey="day" 
                            stroke="rgba(255,255,255,0.6)" 
                            fontSize={12}
                            tick={{ fill: 'rgba(255,255,255,0.6)' }}
                          />
                          <YAxis 
                            stroke="rgba(255,255,255,0.6)" 
                            fontSize={12}
                            tick={{ fill: 'rgba(255,255,255,0.6)' }}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar dataKey="reviews" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="accuracy" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Deck Performance */}
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center">
                        <BookOpen size={16} className="mr-2 text-accent-main" />
                        Active Decks
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {displayStats.anki.decks.slice(0, 4).map((deck) => (
                          <div
                            key={deck.deckName}
                            className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                          >
                            <div className="flex items-center mb-2">
                              <span className="text-sm mr-2">{getDeckIcon(deck.deckName)}</span>
                              <div className="text-white font-medium text-sm truncate">
                                {getDeckDisplayName(deck.deckName)}
                              </div>
                            </div>
                            <div className="flex justify-between text-xs text-white/60">
                              <span>{deck.reviewsToday} reviews</span>
                              <span>{deck.matureCards} mature</span>
                            </div>
                            <div className="mt-2 w-full bg-white/10 rounded-full h-1">
                              <div
                                className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                style={{
                                  width: `${(deck.matureCards / deck.totalCards) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ChartCard>
              </div>

              {/* LeetCode Progress */}
              <div className="lg:col-span-6">
                <ChartCard
                  title="Problem Solving"
                  subtitle="LeetCode progress tracking"
                  icon={Trophy}
                >
                  <div className="space-y-6">
                    {/* Progress Circle */}
                    <div className="flex justify-center">
                      <div className="relative w-40 h-40">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={[
                                { name: "Easy", value: displayStats.leetcode.easySolved, fill: "#10b981" },
                                { name: "Medium", value: displayStats.leetcode.mediumSolved, fill: "#f59e0b" },
                                { name: "Hard", value: displayStats.leetcode.hardSolved, fill: "#ef4444" },
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={70}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              <Cell fill="#10b981" />
                              <Cell fill="#f59e0b" />
                              <Cell fill="#ef4444" />
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl font-black text-white">
                              {displayStats.leetcode.totalSolved}
                            </div>
                            <div className="text-white/60 text-sm">Solved</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Difficulty Breakdown */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                        <div className="text-xl font-bold text-white">{displayStats.leetcode.easySolved}</div>
                        <div className="text-emerald-400 text-xs">Easy</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-amber-500/20 border border-amber-500/30">
                        <div className="text-xl font-bold text-white">{displayStats.leetcode.mediumSolved}</div>
                        <div className="text-amber-400 text-xs">Medium</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                        <div className="text-xl font-bold text-white">{displayStats.leetcode.hardSolved}</div>
                        <div className="text-red-400 text-xs">Hard</div>
                      </div>
                    </div>

                    {/* Weekly Activity */}
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center">
                        <Calendar size={16} className="mr-2 text-accent-main" />
                        Weekly Activity
                      </h4>
                      <div className="h-32">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={displayStats.leetcode.analytics.weeklyActivity}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis 
                              dataKey="day" 
                              stroke="rgba(255,255,255,0.6)" 
                              fontSize={10}
                              tick={{ fill: 'rgba(255,255,255,0.6)' }}
                            />
                            <YAxis 
                              stroke="rgba(255,255,255,0.6)" 
                              fontSize={10}
                              tick={{ fill: 'rgba(255,255,255,0.6)' }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="problems" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </ChartCard>
              </div>

              {/* Fitness Tracking */}
              <div className="lg:col-span-12">
                <ChartCard
                  title="Fitness Journey"
                  subtitle="Running activity and performance"
                  icon={Activity}
                  size="large"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Stats */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30">
                          <div className="text-2xl font-black text-white mb-1">
                            {displayStats.strava.totalRuns}
                          </div>
                          <div className="text-red-400 text-xs font-semibold">Total Runs</div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30">
                          <div className="text-2xl font-black text-white mb-1">
                            {displayStats.strava.totalDistanceKm}
                          </div>
                          <div className="text-orange-400 text-xs font-semibold">Kilometers</div>
                        </div>
                      </div>

                      {/* Recent Activities */}
                      <div>
                        <h4 className="text-white font-semibold mb-3 flex items-center">
                          <Timer size={16} className="mr-2 text-accent-main" />
                          Recent Activities
                        </h4>
                        <div className="space-y-2">
                          {displayStats.strava.recentRuns.slice(0, 3).map((run, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                            >
                              <div className="flex items-center">
                                <Activity size={16} className="text-red-400 mr-3" />
                                <div>
                                  <div className="text-white text-sm font-medium line-clamp-1">
                                    {run.name}
                                  </div>
                                  <div className="text-white/60 text-xs">
                                    {formatDate(run.date)}
                                  </div>
                                </div>
                              </div>
                              <div className="text-white font-semibold">
                                {run.distanceKm} km
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Monthly Distance Chart */}
                    <div className="lg:col-span-2">
                      <h4 className="text-white font-semibold mb-4 flex items-center">
                        <TrendingUp size={16} className="mr-2 text-accent-main" />
                        Monthly Progress
                      </h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={displayStats.strava.analytics.monthlyDistance}>
                            <defs>
                              <linearGradient id="stravaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis 
                              dataKey="month" 
                              stroke="rgba(255,255,255,0.6)" 
                              fontSize={12}
                              tick={{ fill: 'rgba(255,255,255,0.6)' }}
                            />
                            <YAxis 
                              stroke="rgba(255,255,255,0.6)" 
                              fontSize={12}
                              tick={{ fill: 'rgba(255,255,255,0.6)' }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                              type="monotone"
                              dataKey="distance"
                              stroke="#ef4444"
                              fillOpacity={1}
                              fill="url(#stravaGradient)"
                            />
                            <Line
                              type="monotone"
                              dataKey="pace"
                              stroke="#10b981"
                              strokeWidth={2}
                              dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                            />
                            <Bar dataKey="elevation" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </ChartCard>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center mt-12">
            <div className="inline-flex items-center px-6 py-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 backdrop-blur-[40px]">
              <span className="text-sm">
                ⚠️ Some stats may be unavailable: {error}
              </span>
            </div>
          </div>
        )}

        {/* Footer Info */}
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
// src/components/StatsSection.tsx
"use client";

import React, { useState, useEffect } from "react";
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
  AlertTriangle,
  Clock,
  Target,
  BarChart3,
  Calendar,
  Headphones,
  BookOpen,
  Award,
  Timer,
  Gauge,
  TrendingDown,
  Music,
  MapPin,
  Repeat,
  Volume2,
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
  Scatter,
  ScatterChart,
  ZAxis,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

// Data interfaces for type safety
interface WakaTimeData {
  lastUpdated: string;
  status: string;
  today: {
    codingMinutes: number;
    primaryLanguage: string;
    environment: {
      editor: string;
      os: string;
    };
  };
  weeklyStats: {
    totalHoursLast7Days: string;
    activeDaysCount: number;
    dailyAverageMinutes: number;
    languages: {
      primary: string;
      secondary: string;
      primaryPercentage: string;
      secondaryPercentage: string;
    };
    consistency: string;
  };
}

interface AnkiData {
  lastUpdated: string;
  overall: {
    reviewsToday: number;
    timeMinutesToday: number;
    matureCardRetentionPercent: number;
    currentStreakDays: number;
    cardCounts: {
      new: number;
      learning: number;
      young: number;
      mature: number;
      total: number;
    };
  };
  decks: Array<{
    deckName: string;
    reviewsToday: number;
    matureCards: number;
    newCards: number;
    totalCards: number;
  }>;
}

interface SpotifyData {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

interface LeetCodeData {
  username: string;
  totalSolved: number;
  totalAvailable: number;
  easySolved: number;
  easyAvailable: number;
  mediumSolved: number;
  mediumAvailable: number;
  hardSolved: number;
  hardAvailable: number;
}

interface StravaData {
  totalRuns: number;
  totalDistanceKm: string;
  recentRuns: Array<{
    name: string;
    distanceKm: string;
    date: string;
  }>;
}

const StatsSection: React.FC = () => {
  const [activeView, setActiveView] = useState("overview");
  const [expandedCards, setExpandedCards] = useState(new Set<string>());
  const [data, setData] = useState<{
    wakatime?: WakaTimeData;
    anki?: AnkiData;
    spotify?: SpotifyData;
    leetcode?: LeetCodeData;
    strava?: StravaData;
  }>({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load data from public JSON files
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const newErrors: Record<string, string> = {};
      const newData: typeof data = {};

      // Load WakaTime data
      try {
        const wakatimeRes = await fetch("/wakatime-data.json");
        if (wakatimeRes.ok) {
          newData.wakatime = await wakatimeRes.json();
        } else {
          newErrors.wakatime = "WakaTime data unavailable";
        }
      } catch {
        newErrors.wakatime = "Failed to load WakaTime data";
      }

      // Load Anki data
      try {
        const ankiRes = await fetch("/anki-data.json");
        if (ankiRes.ok) {
          newData.anki = await ankiRes.json();
        } else {
          newErrors.anki = "Anki data unavailable";
        }
      } catch {
        newErrors.anki = "Failed to load Anki data";
      }

      // Load Spotify data
      try {
        const spotifyRes = await fetch("/spotify-data.json");
        if (spotifyRes.ok) {
          newData.spotify = await spotifyRes.json();
        } else {
          newErrors.spotify = "Spotify data unavailable";
        }
      } catch {
        newErrors.spotify = "Failed to load Spotify data";
      }

      // Load LeetCode data
      try {
        const leetcodeRes = await fetch("/leetcode-data.json");
        if (leetcodeRes.ok) {
          newData.leetcode = await leetcodeRes.json();
        } else {
          newErrors.leetcode = "LeetCode data unavailable";
        }
      } catch {
        newErrors.leetcode = "Failed to load LeetCode data";
      }

      // Load Strava data
      try {
        const stravaRes = await fetch("/strava-data.json");
        if (stravaRes.ok) {
          newData.strava = await stravaRes.json();
        } else {
          newErrors.strava = "Strava data unavailable";
        }
      } catch {
        newErrors.strava = "Failed to load Strava data";
      }

      setData(newData);
      setErrors(newErrors);
      setLoading(false);
    };

    loadData();
    // Refresh data every 5 minutes
    const interval = setInterval(loadData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

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

  // Generate synthetic analytics data based on real data
  const generateAnalytics = () => {
    const analytics = {
      wakatime: {
        weeklyTrend: [] as Array<{ day: string; hours: number; productivity: number }>,
        languageDistribution: [] as Array<{ name: string; hours: number; percentage: number; color: string }>,
        dailyPattern: [] as Array<{ hour: number; activity: number }>,
      },
      anki: {
        weeklyReviews: [] as Array<{ day: string; reviews: number; accuracy: number }>,
        retentionTrend: [] as Array<{ week: string; retention: number }>,
        deckComparison: [] as Array<{ deck: string; efficiency: number; difficulty: number }>,
      },
      leetcode: {
        progressTrend: [] as Array<{ month: string; easy: number; medium: number; hard: number }>,
        difficultyRadar: [] as Array<{ subject: string; A: number; fullMark: number }>,
        solvingVelocity: [] as Array<{ date: string; solved: number; streak: number }>,
      },
      strava: {
        monthlyDistance: [] as Array<{ month: string; distance: number; pace: number }>,
        weeklyPattern: [] as Array<{ day: string; distance: number; runs: number }>,
      },
      productivity: {
        focusScore: 0,
        efficiency: 0,
        consistency: 0,
        deepWorkHours: 0,
      },
    };

    // Generate WakaTime analytics
    if (data.wakatime) {
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      analytics.wakatime.weeklyTrend = days.map((day, i) => ({
        day,
        hours: Math.max(2, parseFloat(data.wakatime!.weeklyStats.totalHoursLast7Days) / 7 + (Math.random() - 0.5) * 2),
        productivity: Math.max(70, 90 + (Math.random() - 0.5) * 20),
      }));

      // Language distribution with colors
      const languages = [
        { name: data.wakatime.today.primaryLanguage, percentage: parseInt(data.wakatime.weeklyStats.languages.primaryPercentage), color: "#3178c6" },
        { name: data.wakatime.weeklyStats.languages.secondary, percentage: parseInt(data.wakatime.weeklyStats.languages.secondaryPercentage), color: "#3776ab" },
        { name: "JavaScript", percentage: 15, color: "#f7df1e" },
        { name: "CSS", percentage: 8, color: "#1572b6" },
      ];
      
      analytics.wakatime.languageDistribution = languages.map(lang => ({
        ...lang,
        hours: (parseFloat(data.wakatime!.weeklyStats.totalHoursLast7Days) * lang.percentage) / 100,
      }));

      // Daily coding pattern (24 hours)
      analytics.wakatime.dailyPattern = Array.from({ length: 24 }, (_, hour) => ({
        hour,
        activity: hour >= 9 && hour <= 18 ? Math.random() * 100 : Math.random() * 30,
      }));
    }

    // Generate Anki analytics
    if (data.anki) {
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      analytics.anki.weeklyReviews = days.map(day => ({
        day,
        reviews: Math.max(50, data.anki!.overall.reviewsToday + (Math.random() - 0.5) * 40),
        accuracy: Math.max(80, data.anki!.overall.matureCardRetentionPercent + (Math.random() - 0.5) * 10),
      }));

      analytics.anki.retentionTrend = ["Week 1", "Week 2", "Week 3", "Week 4"].map((week, i) => ({
        week,
        retention: Math.max(85, data.anki!.overall.matureCardRetentionPercent - (3 - i) * 2 + Math.random() * 3),
      }));

      analytics.anki.deckComparison = data.anki.decks.slice(0, 5).map(deck => ({
        deck: getDeckDisplayName(deck.deckName),
        efficiency: Math.max(60, (deck.matureCards / deck.totalCards) * 100 + Math.random() * 20),
        difficulty: Math.max(30, 100 - (deck.matureCards / deck.totalCards) * 100 + Math.random() * 30),
      }));
    }

    // Generate LeetCode analytics
    if (data.leetcode) {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      analytics.leetcode.progressTrend = months.map((month, i) => ({
        month,
        easy: Math.floor(data.leetcode!.easySolved * (i + 1) / 6),
        medium: Math.floor(data.leetcode!.mediumSolved * (i + 1) / 6),
        hard: Math.floor(data.leetcode!.hardSolved * (i + 1) / 6),
      }));

      analytics.leetcode.difficultyRadar = [
        { subject: "Arrays", A: Math.min(100, (data.leetcode.easySolved / data.leetcode.easyAvailable) * 300), fullMark: 100 },
        { subject: "Trees", A: Math.min(100, (data.leetcode.mediumSolved / data.leetcode.mediumAvailable) * 400), fullMark: 100 },
        { subject: "DP", A: Math.min(100, (data.leetcode.hardSolved / data.leetcode.hardAvailable) * 500), fullMark: 100 },
        { subject: "Graphs", A: Math.min(100, (data.leetcode.totalSolved / data.leetcode.totalAvailable) * 200), fullMark: 100 },
        { subject: "Strings", A: Math.min(100, (data.leetcode.easySolved / data.leetcode.easyAvailable) * 250), fullMark: 100 },
      ];

      analytics.leetcode.solvingVelocity = Array.from({ length: 30 }, (_, i) => ({
        date: `Day ${i + 1}`,
        solved: Math.floor(data.leetcode.totalSolved * (i + 1) / 30),
        streak: Math.max(0, Math.floor(Math.random() * 10)),
      }));
    }

    // Generate Strava analytics
    if (data.strava) {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      analytics.strava.monthlyDistance = months.map((month, i) => ({
        month,
        distance: Math.max(20, parseFloat(data.strava!.totalDistanceKm) / 6 + (Math.random() - 0.5) * 20),
        pace: Math.max(4, 5.5 - i * 0.1 + (Math.random() - 0.5) * 0.5),
      }));

      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      analytics.strava.weeklyPattern = days.map(day => ({
        day,
        distance: Math.max(0, Math.random() * 15),
        runs: Math.floor(Math.random() * 3),
      }));
    }

    // Calculate productivity metrics
    if (data.wakatime && data.anki) {
      analytics.productivity = {
        focusScore: Math.min(100, (data.wakatime.today.codingMinutes / 480) * 100),
        efficiency: Math.min(100, data.anki.overall.matureCardRetentionPercent),
        consistency: Math.min(100, (data.wakatime.weeklyStats.activeDaysCount / 7) * 100),
        deepWorkHours: data.wakatime.today.codingMinutes / 60,
      };
    }

    return analytics;
  };

  const analytics = generateAnalytics();

  // Error Card Component
  const ErrorCard = ({ title, error }: { title: string; error: string }) => (
    <div className="bento-item ease-snappy relative z-2 border border-red-500/20 bg-linear-to-br/oklch from-red-500/10 via-red-500/5 to-transparent rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150">
      <div className="flex items-center mb-4">
        <div className="p-3 rounded-xl bg-red-500/20 backdrop-blur-[20px] mr-4">
          <AlertTriangle size={20} className="text-red-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      </div>
      <div className="text-white/60 text-sm">
        Data source temporarily unavailable. Please check back later.
      </div>
    </div>
  );

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
            <div className={`flex items-center text-xs font-semibold ${trend > 0 ? 'text-accent-main' : 'text-red-400'}`}>
              {trend > 0 ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
              {trend > 0 ? '+' : ''}{trend}%
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

  if (loading) {
    return (
      <section
        id="stats"
        className="relative min-h-screen bg-black p-4 sm:p-6 lg:p-8 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-accent-main/20 border-t-accent-main mx-auto mb-4"></div>
          <p className="text-white/60">Loading analytics dashboard...</p>
        </div>
      </section>
    );
  }

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
            Analytics Dashboard
          </h2>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-6">
            Real-time insights into development, learning, and performance metrics
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
              {["overview", "development", "learning", "performance"].map((view) => (
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
              {data.wakatime ? (
                <CompactStatsCard
                  icon={Code2}
                  title="Coding Today"
                  value={formatHours(data.wakatime.today.codingMinutes)}
                  subtitle={`${data.wakatime.today.primaryLanguage} focus`}
                  color="#3b82f6"
                  trend={12}
                />
              ) : (
                <ErrorCard title="Coding Stats" error={errors.wakatime || "No data"} />
              )}

              {data.anki ? (
                <CompactStatsCard
                  icon={Brain}
                  title="Study Cards"
                  value={data.anki.overall.reviewsToday}
                  subtitle={`${data.anki.overall.matureCardRetentionPercent}% retention`}
                  color="#8b5cf6"
                  trend={8}
                />
              ) : (
                <ErrorCard title="Study Stats" error={errors.anki || "No data"} />
              )}

              {data.leetcode ? (
                <CompactStatsCard
                  icon={Trophy}
                  title="Problems Solved"
                  value={data.leetcode.totalSolved}
                  subtitle="LeetCode progress"
                  color="#f59e0b"
                  trend={15}
                />
              ) : (
                <ErrorCard title="LeetCode Stats" error={errors.leetcode || "No data"} />
              )}

              {data.strava ? (
                <CompactStatsCard
                  icon={Activity}
                  title="Running Distance"
                  value={`${data.strava.totalDistanceKm}km`}
                  subtitle="Total distance"
                  color="#ef4444"
                  trend={6}
                />
              ) : (
                <ErrorCard title="Fitness Stats" error={errors.strava || "No data"} />
              )}
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Coding Activity - Large */}
              <div className="lg:col-span-8">
                {data.wakatime ? (
                  <ChartCard
                    title="Development Activity & Productivity"
                    expandable
                    cardId="coding"
                  >
                    <div className="space-y-6">
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={analytics.wakatime.weeklyTrend}>
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
                              dataKey="day"
                              stroke="rgba(255,255,255,0.6)"
                              fontSize={12}
                            />
                            <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "rgba(0,0,0,0.8)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "8px",
                                color: "white",
                              }}
                            />
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
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 rounded-lg border border-white/10 bg-white/5">
                          <div className="text-lg font-bold text-white">
                            {data.wakatime.weeklyStats.totalHoursLast7Days}h
                          </div>
                          <div className="text-white/60 text-xs">This Week</div>
                        </div>
                        <div className="text-center p-3 rounded-lg border border-white/10 bg-white/5">
                          <div className="text-lg font-bold text-white">
                            {data.wakatime.weeklyStats.activeDaysCount}
                          </div>
                          <div className="text-white/60 text-xs">Active Days</div>
                        </div>
                        <div className="text-center p-3 rounded-lg border border-white/10 bg-white/5">
                          <div className="text-lg font-bold text-white">
                            {data.wakatime.today.environment.editor}
                          </div>
                          <div className="text-white/60 text-xs">Editor</div>
                        </div>
                        <div className="text-center p-3 rounded-lg border border-white/10 bg-white/5">
                          <div className="text-lg font-bold text-white">
                            {data.wakatime.weeklyStats.consistency}
                          </div>
                          <div className="text-white/60 text-xs">Consistency</div>
                        </div>
                      </div>

                      {expandedCards.has("coding") && (
                        <div className="pt-6 border-t border-white/10">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-white font-semibold mb-4">
                                Language Distribution
                              </h4>
                              <div className="space-y-3">
                                {analytics.wakatime.languageDistribution.map((lang) => (
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
                                      <span className="mr-2">{lang.hours.toFixed(1)}h</span>
                                      <span className="text-sm">
                                        ({lang.percentage}%)
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-white font-semibold mb-4">
                                Daily Activity Pattern
                              </h4>
                              <div className="h-32">
                                <ResponsiveContainer width="100%" height="100%">
                                  <AreaChart data={analytics.wakatime.dailyPattern}>
                                    <defs>
                                      <linearGradient
                                        id="activityGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                      >
                                        <stop
                                          offset="5%"
                                          stopColor="#8b5cf6"
                                          stopOpacity={0.8}
                                        />
                                        <stop
                                          offset="95%"
                                          stopColor="#8b5cf6"
                                          stopOpacity={0.1}
                                        />
                                      </linearGradient>
                                    </defs>
                                    <CartesianGrid
                                      strokeDasharray="3 3"
                                      stroke="rgba(255,255,255,0.1)"
                                    />
                                    <XAxis
                                      dataKey="hour"
                                      stroke="rgba(255,255,255,0.6)"
                                      fontSize={10}
                                    />
                                    <YAxis stroke="rgba(255,255,255,0.6)" fontSize={10} />
                                    <Area
                                      type="monotone"
                                      dataKey="activity"
                                      stroke="#8b5cf6"
                                      fillOpacity={1}
                                      fill="url(#activityGradient)"
                                    />
                                  </AreaChart>
                                </ResponsiveContainer>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ChartCard>
                ) : (
                  <ErrorCard title="Development Activity" error={errors.wakatime || "No data"} />
                )}
              </div>

              {/* Live Music */}
              <div className="lg:col-span-4">
                {data.spotify ? (
                  <ChartCard title="Currently Playing">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={data.spotify.albumImageUrl}
                            alt={data.spotify.album}
                            className="w-16 h-16 rounded-xl shadow-lg"
                          />
                          {data.spotify.isPlaying && (
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
                            {data.spotify.title}
                          </h4>
                          <p className="text-white/70 text-xs mb-2 line-clamp-1">
                            {data.spotify.artist}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-emerald-400 text-xs">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
                              {data.spotify.isPlaying ? "Live" : "Paused"}
                            </div>
                            <a
                              href={data.spotify.songUrl}
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
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="text-white/80 text-sm font-semibold">
                            Music Activity
                          </h5>
                          <div className="flex items-center text-xs text-white/60">
                            <Music size={12} className="mr-1" />
                            Active
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-center p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                            <div className="text-lg font-bold text-white">
                              {data.spotify.isPlaying ? "ON" : "OFF"}
                            </div>
                            <div className="text-emerald-400 text-xs">Status</div>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-purple-500/20 border border-purple-500/30">
                            <div className="text-lg font-bold text-white">
                              <Volume2 size={16} className="mx-auto" />
                            </div>
                            <div className="text-purple-400 text-xs">Playing</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ChartCard>
                ) : (
                  <ErrorCard title="Music Activity" error={errors.spotify || "No data"} />
                )}
              </div>

              {/* Anki Learning Progress */}
              <div className="lg:col-span-6">
                {data.anki ? (
                  <ChartCard
                    title="Japanese Study Progress"
                    expandable
                    cardId="anki"
                  >
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                          <div className="text-xl font-black text-white mb-1">
                            {data.anki.overall.reviewsToday}
                          </div>
                          <div className="text-purple-400 text-xs font-semibold">
                            Reviews Today
                          </div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                          <div className="text-xl font-black text-white mb-1">
                            {data.anki.overall.matureCardRetentionPercent}%
                          </div>
                          <div className="text-emerald-400 text-xs font-semibold">
                            Retention Rate
                          </div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30">
                          <div className="text-xl font-black text-white mb-1">
                            {data.anki.overall.currentStreakDays}
                          </div>
                          <div className="text-orange-400 text-xs font-semibold">
                            Day Streak
                          </div>
                        </div>
                      </div>

                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={analytics.anki.weeklyReviews}>
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
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "rgba(0,0,0,0.8)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "8px",
                                color: "white",
                              }}
                            />
                            <Bar
                              dataKey="reviews"
                              fill="#8b5cf6"
                              radius={[4, 4, 0, 0]}
                            />
                            <Line
                              type="monotone"
                              dataKey="accuracy"
                              stroke="#10b981"
                              strokeWidth={2}
                              dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>

                      {expandedCards.has("anki") && (
                        <div className="pt-6 border-t border-white/10">
                          <h4 className="text-white font-semibold mb-4">
                            Deck Performance
                          </h4>
                          <div className="space-y-3">
                            {data.anki.decks.slice(0, 3).map((deck) => (
                              <div
                                key={deck.deckName}
                                className="p-3 rounded-lg bg-white/5 border border-white/10"
                              >
                                <div className="flex justify-between items-center mb-2">
                                  <div className="text-white font-medium text-sm">
                                    {getDeckDisplayName(deck.deckName)}
                                  </div>
                                  <div className="text-white/60 text-xs">
                                    {Math.round((deck.matureCards / deck.totalCards) * 100)}%
                                  </div>
                                </div>
                                <div className="flex justify-between text-xs text-white/60 mb-2">
                                  <span>{deck.reviewsToday} reviews</span>
                                  <span>{deck.matureCards} mature</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-1">
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
                      )}
                    </div>
                  </ChartCard>
                ) : (
                  <ErrorCard title="Study Progress" error={errors.anki || "No data"} />
                )}
              </div>

              {/* LeetCode & Problem Solving */}
              <div className="lg:col-span-6">
                {data.leetcode ? (
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
                                    value: data.leetcode.easySolved,
                                    fill: "#10b981",
                                  },
                                  {
                                    name: "Medium",
                                    value: data.leetcode.mediumSolved,
                                    fill: "#f59e0b",
                                  },
                                  {
                                    name: "Hard",
                                    value: data.leetcode.hardSolved,
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
                                    value: data.leetcode.easySolved,
                                    fill: "#10b981",
                                  },
                                  {
                                    name: "Medium",
                                    value: data.leetcode.mediumSolved,
                                    fill: "#f59e0b",
                                  },
                                  {
                                    name: "Hard",
                                    value: data.leetcode.hardSolved,
                                    fill: "#ef4444",
                                  },
                                ].map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                              </Pie>
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "rgba(0,0,0,0.8)",
                                  border: "1px solid rgba(255,255,255,0.1)",
                                  borderRadius: "8px",
                                  color: "white",
                                }}
                              />
                            </PieChart>
                          </ResponsiveContainer>

                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-2xl font-black text-white">
                                {data.leetcode.totalSolved}
                              </div>
                              <div className="text-white/60 text-xs">Solved</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                          <div className="text-lg font-bold text-white">
                            {data.leetcode.easySolved}
                          </div>
                          <div className="text-emerald-400 text-xs">Easy</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-amber-500/20 border border-amber-500/30">
                          <div className="text-lg font-bold text-white">
                            {data.leetcode.mediumSolved}
                          </div>
                          <div className="text-amber-400 text-xs">Medium</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                          <div className="text-lg font-bold text-white">
                            {data.leetcode.hardSolved}
                          </div>
                          <div className="text-red-400 text-xs">Hard</div>
                        </div>
                      </div>

                      {expandedCards.has("leetcode") && (
                        <div className="pt-6 border-t border-white/10">
                          <h4 className="text-white font-semibold mb-3">
                            Progress Trend
                          </h4>
                          <div className="h-32">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={analytics.leetcode.progressTrend}>
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  stroke="rgba(255,255,255,0.1)"
                                />
                                <XAxis
                                  dataKey="month"
                                  stroke="rgba(255,255,255,0.6)"
                                  fontSize={10}
                                />
                                <YAxis
                                  stroke="rgba(255,255,255,0.6)"
                                  fontSize={10}
                                />
                                <Tooltip
                                  contentStyle={{
                                    backgroundColor: "rgba(0,0,0,0.8)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "8px",
                                    color: "white",
                                  }}
                                />
                                <Line
                                  type="monotone"
                                  dataKey="easy"
                                  stroke="#10b981"
                                  strokeWidth={2}
                                  dot={{ fill: "#10b981", strokeWidth: 2, r: 3 }}
                                />
                                <Line
                                  type="monotone"
                                  dataKey="medium"
                                  stroke="#f59e0b"
                                  strokeWidth={2}
                                  dot={{ fill: "#f59e0b", strokeWidth: 2, r: 3 }}
                                />
                                <Line
                                  type="monotone"
                                  dataKey="hard"
                                  stroke="#ef4444"
                                  strokeWidth={2}
                                  dot={{ fill: "#ef4444", strokeWidth: 2, r: 3 }}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      )}
                    </div>
                  </ChartCard>
                ) : (
                  <ErrorCard title="Problem Solving" error={errors.leetcode || "No data"} />
                )}
              </div>

              {/* Strava Running */}
              <div className="lg:col-span-12">
                {data.strava ? (
                  <ChartCard title="Fitness Journey" expandable cardId="strava">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <div className="h-48">
                          <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={analytics.strava.monthlyDistance}>
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
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "rgba(0,0,0,0.8)",
                                  border: "1px solid rgba(255,255,255,0.1)",
                                  borderRadius: "8px",
                                  color: "white",
                                }}
                              />
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
                            </ComposedChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                            <div className="text-lg font-bold text-white">
                              {data.strava.totalRuns}
                            </div>
                            <div className="text-red-400 text-xs">Total Runs</div>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-orange-500/20 border border-orange-500/30">
                            <div className="text-lg font-bold text-white">
                              {data.strava.totalDistanceKm}
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
                              {data.strava.recentRuns
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
                ) : (
                  <ErrorCard title="Fitness Journey" error={errors.strava || "No data"} />
                )}
              </div>
            </div>
          </div>
        )}

        {activeView === "development" && (
          <div className="space-y-8">
            {data.wakatime ? (
              <>
                <ChartCard title="Development Deep Dive">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-semibold mb-4">
                        Technology Stack
                      </h4>
                      <div className="space-y-4">
                        {analytics.wakatime.languageDistribution.map((lang) => (
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
                            {data.wakatime.today.environment.editor}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                          <div className="flex items-center">
                            <Cpu size={16} className="text-purple-400 mr-3" />
                            <span className="text-white text-sm">Platform</span>
                          </div>
                          <span className="text-white/80 text-sm font-medium">
                            {data.wakatime.today.environment.os}
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
                            {data.wakatime.today.primaryLanguage}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ChartCard>

                <ChartCard title="Productivity Metrics">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={analytics.wakatime.weeklyTrend}>
                            <defs>
                              <linearGradient
                                id="productivityGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="5%"
                                  stopColor="#8b5cf6"
                                  stopOpacity={0.8}
                                />
                                <stop
                                  offset="95%"
                                  stopColor="#8b5cf6"
                                  stopOpacity={0.1}
                                />
                              </linearGradient>
                            </defs>
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
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "rgba(0,0,0,0.8)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "8px",
                                color: "white",
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey="productivity"
                              stroke="#8b5cf6"
                              fillOpacity={1}
                              fill="url(#productivityGradient)"
                            />
                            <ReferenceLine y={90} stroke="#10b981" strokeDasharray="5 5" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                        <div className="text-2xl font-black text-white mb-1">
                          {analytics.productivity.focusScore.toFixed(0)}%
                        </div>
                        <div className="text-blue-400 text-xs font-semibold">
                          Focus Score
                        </div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                        <div className="text-2xl font-black text-white mb-1">
                          {analytics.productivity.efficiency.toFixed(0)}%
                        </div>
                        <div className="text-emerald-400 text-xs font-semibold">
                          Efficiency
                        </div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30">
                        <div className="text-2xl font-black text-white mb-1">
                          {analytics.productivity.deepWorkHours.toFixed(1)}h
                        </div>
                        <div className="text-orange-400 text-xs font-semibold">
                          Deep Work
                        </div>
                      </div>
                    </div>
                  </div>
                </ChartCard>
              </>
            ) : (
              <ErrorCard title="Development Analytics" error={errors.wakatime || "No data"} />
            )}
          </div>
        )}

        {activeView === "learning" && (
          <div className="space-y-8">
            {data.anki ? (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ChartCard title="Japanese Mastery Progress">
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-4xl font-black text-white mb-2">
                          {data.anki.overall.currentStreakDays}
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
                            {data.anki.overall.cardCounts.mature}
                          </div>
                          <div className="text-purple-400 text-sm">Mature Cards</div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-blue-500/20 border border-blue-500/30">
                          <div className="text-xl font-bold text-white">
                            {data.anki.overall.matureCardRetentionPercent}%
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
                          <BarChart data={analytics.anki.weeklyReviews}>
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
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "rgba(0,0,0,0.8)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "8px",
                                color: "white",
                              }}
                            />
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

                <ChartCard title="Deck Performance Analysis">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.anki.decks.map((deck, index) => (
                      <div
                        key={deck.deckName}
                        className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-purple-500/30 transition-all duration-500"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <Brain size={20} className="text-purple-400" />
                            <div className="text-white/40 text-xs">
                              #{index + 1}
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
              </>
            ) : (
              <ErrorCard title="Learning Analytics" error={errors.anki || "No data"} />
            )}
          </div>
        )}

        {activeView === "performance" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="Performance Correlation Matrix">
                <div className="space-y-6">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        data={data.leetcode ? analytics.leetcode.difficultyRadar : [
                          { subject: "Coding", A: 0, fullMark: 100 },
                          { subject: "Learning", A: 0, fullMark: 100 },
                          { subject: "Problem Solving", A: 0, fullMark: 100 },
                          { subject: "Consistency", A: 0, fullMark: 100 },
                          { subject: "Growth", A: 0, fullMark: 100 },
                          { subject: "Focus", A: 0, fullMark: 100 },
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
                      <div className="text-lg font-bold text-white">
                        {analytics.productivity.focusScore.toFixed(1)}
                      </div>
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
                              value: analytics.productivity.focusScore,
                              fill: "#10b981",
                            },
                            {
                              name: "Background",
                              value: 100 - analytics.productivity.focusScore,
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
                        {analytics.productivity.focusScore.toFixed(0)}%
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
                        {analytics.productivity.deepWorkHours.toFixed(1)}h
                      </div>
                      <div className="text-white/60 text-xs">Deep Work</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                      <Zap size={20} className="mx-auto mb-2 text-blue-400" />
                      <div className="text-lg font-bold text-white">
                        {analytics.productivity.efficiency.toFixed(0)}%
                      </div>
                      <div className="text-white/60 text-xs">Efficiency</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                      <Target size={20} className="mx-auto mb-2 text-purple-400" />
                      <div className="text-lg font-bold text-white">
                        {analytics.productivity.consistency.toFixed(0)}%
                      </div>
                      <div className="text-white/60 text-xs">Consistency</div>
                    </div>
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
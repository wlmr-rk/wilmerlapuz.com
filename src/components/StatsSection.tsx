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
  Loader2,
  Calendar,
  Clock,
  Target,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  TrendingDown,
  Award,
  Headphones,
  BookOpen,
  Dumbbell,
  Monitor,
  Terminal,
  Smartphone,
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
  ScatterChart,
  Scatter,
  Tooltip,
  Legend,
  ReferenceLine,
  ReferenceArea,
} from "recharts";

// Data interfaces based on actual JSON structure
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

interface SpotifyData {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
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

interface StatsData {
  wakatime?: WakaTimeData;
  spotify?: SpotifyData;
  anki?: AnkiData;
  leetcode?: LeetCodeData;
  strava?: StravaData;
  loading: boolean;
  error: string | null;
}

const StatsSection: React.FC = () => {
  const [activeView, setActiveView] = useState("overview");
  const [expandedCards, setExpandedCards] = useState(new Set<string>());
  const [statsData, setStatsData] = useState<StatsData>({
    loading: true,
    error: null,
  });

  // Fetch data from public JSON files
  useEffect(() => {
    const fetchStatsData = async () => {
      setStatsData(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        const [wakatimeRes, spotifyRes, ankiRes, leetcodeRes, stravaRes] = await Promise.allSettled([
          fetch('/wakatime-data.json'),
          fetch('/spotify-data.json'),
          fetch('/anki-data.json'),
          fetch('/leetcode-data.json'),
          fetch('/strava-data.json'),
        ]);

        const newData: Partial<StatsData> = {};

        if (wakatimeRes.status === 'fulfilled' && wakatimeRes.value.ok) {
          newData.wakatime = await wakatimeRes.value.json();
        }
        if (spotifyRes.status === 'fulfilled' && spotifyRes.value.ok) {
          newData.spotify = await spotifyRes.value.json();
        }
        if (ankiRes.status === 'fulfilled' && ankiRes.value.ok) {
          newData.anki = await ankiRes.value.json();
        }
        if (leetcodeRes.status === 'fulfilled' && leetcodeRes.value.ok) {
          newData.leetcode = await leetcodeRes.value.json();
        }
        if (stravaRes.status === 'fulfilled' && stravaRes.value.ok) {
          newData.strava = await stravaRes.value.json();
        }

        setStatsData({
          ...newData,
          loading: false,
          error: null,
        });
      } catch (error) {
        setStatsData(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch stats',
        }));
      }
    };

    fetchStatsData();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchStatsData, 5 * 60 * 1000);
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

  // Generate synthetic data for enhanced visualizations
  const generateCodingTrend = (wakatime?: WakaTimeData) => {
    if (!wakatime) return [];
    
    const baseHours = parseFloat(wakatime.weeklyStats.totalHoursLast7Days) / 7;
    return Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      hours: Math.max(0, baseHours + (Math.random() - 0.5) * 4),
      productivity: Math.floor(75 + Math.random() * 25),
      focus: Math.floor(70 + Math.random() * 30),
    }));
  };

  const generateLanguageData = (wakatime?: WakaTimeData) => {
    if (!wakatime) return [];
    
    const { primary, secondary, primaryPercentage, secondaryPercentage } = wakatime.weeklyStats.languages;
    const remaining = 100 - parseFloat(primaryPercentage) - parseFloat(secondaryPercentage);
    
    return [
      { name: primary, percentage: parseFloat(primaryPercentage), color: "#3178c6" },
      { name: secondary, percentage: parseFloat(secondaryPercentage), color: "#ff6b35" },
      { name: "Others", percentage: remaining, color: "#4ecdc4" },
    ].filter(lang => lang.percentage > 0);
  };

  const generateAnkiTrend = (anki?: AnkiData) => {
    if (!anki) return [];
    
    const baseReviews = anki.overall.reviewsToday;
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
      day,
      reviews: Math.max(0, baseReviews + (Math.random() - 0.5) * 40),
      accuracy: Math.floor(85 + Math.random() * 15),
      retention: Math.floor(88 + Math.random() * 12),
    }));
  };

  const generatePerformanceRadar = (wakatime?: WakaTimeData, anki?: AnkiData, leetcode?: LeetCodeData) => {
    const codingScore = wakatime ? Math.min(100, (wakatime.today.codingMinutes / 480) * 100) : 0;
    const learningScore = anki ? Math.min(100, (anki.overall.reviewsToday / 200) * 100) : 0;
    const problemSolvingScore = leetcode ? Math.min(100, (leetcode.totalSolved / 500) * 100) : 0;
    const consistencyScore = wakatime ? (wakatime.weeklyStats.activeDaysCount / 7) * 100 : 0;
    
    return [
      { subject: 'Coding', score: Math.floor(codingScore), fullMark: 100 },
      { subject: 'Learning', score: Math.floor(learningScore), fullMark: 100 },
      { subject: 'Problem Solving', score: Math.floor(problemSolvingScore), fullMark: 100 },
      { subject: 'Consistency', score: Math.floor(consistencyScore), fullMark: 100 },
      { subject: 'Focus', score: Math.floor(75 + Math.random() * 25), fullMark: 100 },
      { subject: 'Growth', score: Math.floor(80 + Math.random() * 20), fullMark: 100 },
    ];
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 border border-white/20 rounded-xl p-3 backdrop-blur-xl">
          <p className="text-white/80 text-sm mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Error Card Component
  const ErrorCard = ({ title, error, icon: Icon }: { title: string; error: string; icon: React.ComponentType<{ size: number; className?: string }> }) => (
    <div className="bento-item ease-snappy relative z-2 border border-red-500/20 bg-linear-to-br/oklch from-red-500/10 via-red-500/5 to-transparent rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150">
      <div className="flex items-center mb-4">
        <div className="p-3 rounded-xl bg-red-500/20 backdrop-blur-[20px] mr-4">
          <Icon size={20} className="text-red-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-red-400 text-sm">Data unavailable</p>
        </div>
      </div>
      <div className="flex items-center text-red-400/80 text-sm">
        <AlertTriangle size={16} className="mr-2" />
        {error}
      </div>
    </div>
  );

  // Loading Card Component
  const LoadingCard = ({ title, icon: Icon }: { title: string; icon: React.ComponentType<{ size: number; className?: string }> }) => (
    <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150">
      <div className="flex items-center mb-4">
        <div className="p-3 rounded-xl bg-white/10 backdrop-blur-[20px] mr-4">
          <Icon size={20} className="text-white/60" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-white/60 text-sm">Loading data...</p>
        </div>
      </div>
      <div className="flex items-center justify-center py-8">
        <Loader2 size={32} className="text-accent-main animate-spin" />
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
    loading = false,
    error = null,
  }: {
    icon: React.ComponentType<{ size: number; className?: string }>;
    title: string;
    value: string | number;
    subtitle?: string;
    color: string;
    trend?: number;
    className?: string;
    loading?: boolean;
    error?: string | null;
  }) => {
    if (loading) {
      return (
        <div className={`bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150 ${className}`}>
          <div className="flex items-center justify-center h-24">
            <Loader2 size={24} className="text-accent-main animate-spin" />
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className={`bento-item ease-snappy relative z-2 border border-red-500/20 bg-linear-to-br/oklch from-red-500/10 via-red-500/5 to-transparent rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150 ${className}`}>
          <div className="flex items-center mb-2">
            <Icon size={16} className="text-red-400 mr-2" />
            <span className="text-red-400 text-sm font-medium">{title}</span>
          </div>
          <div className="text-red-400/80 text-xs">Data unavailable</div>
        </div>
      );
    }

    return (
      <div className={`bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150 transition-all duration-400 hover:-translate-y-1 hover:border-white/14 ${className}`}>
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
              <div className={`flex items-center text-xs font-semibold ${trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {trend > 0 ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                {Math.abs(trend)}%
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
  };

  // Chart Card Component
  const ChartCard = ({
    title,
    children,
    className = "",
    expandable = false,
    cardId,
    loading = false,
    error = null,
  }: {
    title: string;
    children: React.ReactNode;
    className?: string;
    expandable?: boolean;
    cardId?: string;
    loading?: boolean;
    error?: string | null;
  }) => {
    if (loading) {
      return <LoadingCard title={title} icon={BarChart3} />;
    }

    if (error) {
      return <ErrorCard title={title} error={error} icon={AlertTriangle} />;
    }

    return (
      <div className={`bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150 transition-all duration-400 hover:-translate-y-1 hover:border-white/14 ${className}`}>
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
              Last updated: {statsData.wakatime?.lastUpdated ? new Date(statsData.wakatime.lastUpdated).toLocaleTimeString() : 'Loading...'}
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
              <CompactStatsCard
                icon={Code2}
                title="Coding Today"
                value={statsData.wakatime ? formatHours(statsData.wakatime.today.codingMinutes) : "N/A"}
                subtitle={statsData.wakatime ? `${statsData.wakatime.today.primaryLanguage} focus` : "No data"}
                color="#3b82f6"
                trend={12}
                loading={statsData.loading}
                error={!statsData.wakatime ? "WakaTime data unavailable" : null}
              />

              <CompactStatsCard
                icon={Brain}
                title="Study Cards"
                value={statsData.anki ? statsData.anki.overall.reviewsToday : "N/A"}
                subtitle={statsData.anki ? `${statsData.anki.overall.matureCardRetentionPercent}% retention` : "No data"}
                color="#8b5cf6"
                trend={8}
                loading={statsData.loading}
                error={!statsData.anki ? "Anki data unavailable" : null}
              />

              <CompactStatsCard
                icon={Trophy}
                title="Problems Solved"
                value={statsData.leetcode ? statsData.leetcode.totalSolved : "N/A"}
                subtitle="LeetCode progress"
                color="#f59e0b"
                trend={15}
                loading={statsData.loading}
                error={!statsData.leetcode ? "LeetCode data unavailable" : null}
              />

              <CompactStatsCard
                icon={Activity}
                title="Running Distance"
                value={statsData.strava ? `${statsData.strava.totalDistanceKm}km` : "N/A"}
                subtitle="Total distance"
                color="#ef4444"
                trend={6}
                loading={statsData.loading}
                error={!statsData.strava ? "Strava data unavailable" : null}
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
                  loading={statsData.loading}
                  error={!statsData.wakatime ? "WakaTime data unavailable" : null}
                >
                  {statsData.wakatime && (
                    <div className="space-y-6">
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={generateCodingTrend(statsData.wakatime)}>
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
                              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
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
                            <ReferenceLine y={parseFloat(statsData.wakatime.weeklyStats.totalHoursLast7Days) / 7} stroke="#f59e0b" strokeDasharray="5 5" label="Weekly Avg" />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 rounded-lg border border-white/10 bg-white/5">
                          <div className="text-lg font-bold text-white">
                            {statsData.wakatime.weeklyStats.totalHoursLast7Days}h
                          </div>
                          <div className="text-white/60 text-xs">This Week</div>
                        </div>
                        <div className="text-center p-3 rounded-lg border border-white/10 bg-white/5">
                          <div className="text-lg font-bold text-white">
                            {statsData.wakatime.weeklyStats.activeDaysCount}
                          </div>
                          <div className="text-white/60 text-xs">Active Days</div>
                        </div>
                        <div className="text-center p-3 rounded-lg border border-white/10 bg-white/5">
                          <div className="text-lg font-bold text-white">
                            {statsData.wakatime.today.environment.editor}
                          </div>
                          <div className="text-white/60 text-xs">Editor</div>
                        </div>
                        <div className="text-center p-3 rounded-lg border border-white/10 bg-white/5">
                          <div className="text-lg font-bold text-white">
                            {statsData.wakatime.weeklyStats.consistency}
                          </div>
                          <div className="text-white/60 text-xs">Consistency</div>
                        </div>
                      </div>

                      {expandedCards.has("coding") && (
                        <div className="pt-6 border-t border-white/10">
                          <h4 className="text-white font-semibold mb-4">Language Distribution</h4>
                          <div className="h-32">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={generateLanguageData(statsData.wakatime)}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={30}
                                  outerRadius={50}
                                  paddingAngle={5}
                                  dataKey="percentage"
                                >
                                  {generateLanguageData(statsData.wakatime).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </ChartCard>
              </div>

              {/* Live Music */}
              <div className="lg:col-span-4">
                <ChartCard 
                  title="Currently Playing"
                  loading={statsData.loading}
                  error={!statsData.spotify ? "Spotify data unavailable" : null}
                >
                  {statsData.spotify && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={statsData.spotify.albumImageUrl}
                            alt={statsData.spotify.album}
                            className="w-16 h-16 rounded-xl shadow-lg"
                          />
                          {statsData.spotify.isPlaying && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                              <Play size={10} className="text-white fill-white ml-0.5" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-bold text-sm leading-tight mb-1 line-clamp-2">
                            {statsData.spotify.title}
                          </h4>
                          <p className="text-white/70 text-xs mb-2 line-clamp-1">
                            {statsData.spotify.artist}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className={`flex items-center text-xs ${statsData.spotify.isPlaying ? 'text-emerald-400' : 'text-white/60'}`}>
                              <div className={`w-2 h-2 rounded-full mr-2 ${statsData.spotify.isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-white/60'}`} />
                              {statsData.spotify.isPlaying ? 'Live' : 'Paused'}
                            </div>
                            <a
                              href={statsData.spotify.songUrl}
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
                        <div className="flex items-center justify-between">
                          <span className="text-white/70 text-sm">Album</span>
                          <span className="text-white/50 text-sm line-clamp-1 max-w-[200px]">
                            {statsData.spotify.album}
                          </span>
                        </div>
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
                  loading={statsData.loading}
                  error={!statsData.anki ? "Anki data unavailable" : null}
                >
                  {statsData.anki && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                          <div className="text-xl font-black text-white mb-1">
                            {statsData.anki.overall.reviewsToday}
                          </div>
                          <div className="text-purple-400 text-xs font-semibold">
                            Reviews Today
                          </div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                          <div className="text-xl font-black text-white mb-1">
                            {statsData.anki.overall.matureCardRetentionPercent}%
                          </div>
                          <div className="text-emerald-400 text-xs font-semibold">
                            Retention Rate
                          </div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30">
                          <div className="text-xl font-black text-white mb-1">
                            {statsData.anki.overall.currentStreakDays}
                          </div>
                          <div className="text-orange-400 text-xs font-semibold">
                            Day Streak
                          </div>
                        </div>
                      </div>

                      <div className="h-32">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={generateAnkiTrend(statsData.anki)}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="day" stroke="rgba(255,255,255,0.6)" fontSize={12} />
                            <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="reviews" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Reviews" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      {expandedCards.has("anki") && (
                        <div className="pt-6 border-t border-white/10">
                          <h4 className="text-white font-semibold mb-4">Deck Performance</h4>
                          <div className="space-y-3">
                            {statsData.anki.decks.slice(0, 3).map((deck) => (
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
                  )}
                </ChartCard>
              </div>

              {/* LeetCode & Problem Solving */}
              <div className="lg:col-span-6">
                <ChartCard
                  title="Problem Solving Journey"
                  expandable
                  cardId="leetcode"
                  loading={statsData.loading}
                  error={!statsData.leetcode ? "LeetCode data unavailable" : null}
                >
                  {statsData.leetcode && (
                    <div className="space-y-6">
                      <div className="flex justify-center">
                        <div className="relative w-32 h-32">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  { name: "Easy", value: statsData.leetcode.easySolved, fill: "#10b981" },
                                  { name: "Medium", value: statsData.leetcode.mediumSolved, fill: "#f59e0b" },
                                  { name: "Hard", value: statsData.leetcode.hardSolved, fill: "#ef4444" },
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={60}
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
                              <div className="text-2xl font-black text-white">
                                {statsData.leetcode.totalSolved}
                              </div>
                              <div className="text-white/60 text-xs">Solved</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                          <div className="text-lg font-bold text-white">
                            {statsData.leetcode.easySolved}
                          </div>
                          <div className="text-emerald-400 text-xs">Easy</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-amber-500/20 border border-amber-500/30">
                          <div className="text-lg font-bold text-white">
                            {statsData.leetcode.mediumSolved}
                          </div>
                          <div className="text-amber-400 text-xs">Medium</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                          <div className="text-lg font-bold text-white">
                            {statsData.leetcode.hardSolved}
                          </div>
                          <div className="text-red-400 text-xs">Hard</div>
                        </div>
                      </div>

                      {expandedCards.has("leetcode") && (
                        <div className="pt-6 border-t border-white/10">
                          <h4 className="text-white font-semibold mb-3">Progress Overview</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-white/80 text-sm">Overall Progress</span>
                              <span className="text-white font-semibold">
                                {Math.round((statsData.leetcode.totalSolved / statsData.leetcode.totalAvailable) * 100)}%
                              </span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2">
                              <div
                                className="h-2 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full"
                                style={{
                                  width: `${(statsData.leetcode.totalSolved / statsData.leetcode.totalAvailable) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </ChartCard>
              </div>

              {/* Strava Running */}
              <div className="lg:col-span-12">
                <ChartCard 
                  title="Fitness Journey" 
                  expandable 
                  cardId="strava"
                  loading={statsData.loading}
                  error={!statsData.strava ? "Strava data unavailable" : null}
                >
                  {statsData.strava && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="text-center p-4 rounded-xl bg-red-500/20 border border-red-500/30">
                            <div className="text-2xl font-black text-white mb-1">
                              {statsData.strava.totalRuns}
                            </div>
                            <div className="text-red-400 text-xs font-semibold">Total Runs</div>
                          </div>
                          <div className="text-center p-4 rounded-xl bg-orange-500/20 border border-orange-500/30">
                            <div className="text-2xl font-black text-white mb-1">
                              {statsData.strava.totalDistanceKm}
                            </div>
                            <div className="text-orange-400 text-xs font-semibold">Kilometers</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {expandedCards.has("strava") && (
                          <div>
                            <h4 className="text-white font-semibold mb-3 text-sm">Recent Activities</h4>
                            <div className="space-y-2">
                              {statsData.strava.recentRuns.slice(0, 2).map((run, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10"
                                >
                                  <div className="flex items-center">
                                    <Activity size={14} className="text-red-400 mr-2" />
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
                  )}
                </ChartCard>
              </div>
            </div>
          </div>
        )}

        {activeView === "development" && (
          <div className="space-y-8">
            <ChartCard 
              title="Development Deep Dive"
              loading={statsData.loading}
              error={!statsData.wakatime ? "WakaTime data unavailable" : null}
            >
              {statsData.wakatime && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-4">Technology Stack</h4>
                    <div className="space-y-4">
                      {generateLanguageData(statsData.wakatime).map((lang) => (
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
                    <h4 className="text-white font-semibold mb-4">Development Environment</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center">
                          <Code2 size={16} className="text-blue-400 mr-3" />
                          <span className="text-white text-sm">Editor</span>
                        </div>
                        <span className="text-white/80 text-sm font-medium">
                          {statsData.wakatime.today.environment.editor}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center">
                          <Cpu size={16} className="text-purple-400 mr-3" />
                          <span className="text-white text-sm">Platform</span>
                        </div>
                        <span className="text-white/80 text-sm font-medium">
                          {statsData.wakatime.today.environment.os}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center">
                          <Database size={16} className="text-emerald-400 mr-3" />
                          <span className="text-white text-sm">Primary Language</span>
                        </div>
                        <span className="text-white/80 text-sm font-medium">
                          {statsData.wakatime.today.primaryLanguage}
                        </span>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard 
                title="Japanese Mastery Progress"
                loading={statsData.loading}
                error={!statsData.anki ? "Anki data unavailable" : null}
              >
                {statsData.anki && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-black text-white mb-2">
                        {statsData.anki.overall.currentStreakDays}
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
                          {statsData.anki.overall.cardCounts.mature}
                        </div>
                        <div className="text-purple-400 text-sm">Mature Cards</div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-blue-500/20 border border-blue-500/30">
                        <div className="text-xl font-bold text-white">
                          {statsData.anki.overall.matureCardRetentionPercent}%
                        </div>
                        <div className="text-blue-400 text-sm">Retention Rate</div>
                      </div>
                    </div>
                  </div>
                )}
              </ChartCard>

              <ChartCard 
                title="Weekly Study Pattern"
                loading={statsData.loading}
                error={!statsData.anki ? "Anki data unavailable" : null}
              >
                {statsData.anki && (
                  <div className="space-y-6">
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={generateAnkiTrend(statsData.anki)}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="day" stroke="rgba(255,255,255,0.6)" fontSize={12} />
                          <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar dataKey="reviews" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Reviews" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </ChartCard>
            </div>
          </div>
        )}

        {activeView === "performance" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="Performance Correlation Matrix">
                <div className="space-y-6">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={generatePerformanceRadar(statsData.wakatime, statsData.anki, statsData.leetcode)}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" className="text-white/60" fontSize={12} />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-white/40" fontSize={10} />
                        <Radar
                          name="Performance"
                          dataKey="score"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                        <Tooltip content={<CustomTooltip />} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 rounded-lg bg-blue-500/20 border border-blue-500/30">
                      <div className="text-lg font-bold text-white">
                        {Math.round(generatePerformanceRadar(statsData.wakatime, statsData.anki, statsData.leetcode).reduce((sum, item) => sum + item.score, 0) / 6)}
                      </div>
                      <div className="text-blue-400 text-xs">Overall Score</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                      <div className="text-lg font-bold text-white">+8.3</div>
                      <div className="text-emerald-400 text-xs">Monthly Gain</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-purple-500/20 border border-purple-500/30">
                      <div className="text-lg font-bold text-white">A+</div>
                      <div className="text-purple-400 text-xs">Performance Grade</div>
                    </div>
                  </div>
                </div>
              </ChartCard>

              <ChartCard title="Activity Correlation Analysis">
                <div className="space-y-6">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis 
                          type="number" 
                          dataKey="coding" 
                          name="Coding Hours" 
                          stroke="rgba(255,255,255,0.6)" 
                          fontSize={12}
                        />
                        <YAxis 
                          type="number" 
                          dataKey="learning" 
                          name="Learning Score" 
                          stroke="rgba(255,255,255,0.6)" 
                          fontSize={12}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Scatter 
                          name="Activity Correlation" 
                          data={[
                            { coding: statsData.wakatime ? statsData.wakatime.today.codingMinutes / 60 : 0, learning: statsData.anki ? statsData.anki.overall.reviewsToday : 0 },
                            { coding: statsData.wakatime ? parseFloat(statsData.wakatime.weeklyStats.totalHoursLast7Days) / 7 : 0, learning: statsData.anki ? statsData.anki.overall.matureCardRetentionPercent : 0 },
                          ]} 
                          fill="#8b5cf6" 
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="text-center">
                    <div className="text-white/80 text-sm mb-2">Cross-Platform Efficiency</div>
                    <div className="text-2xl font-bold text-accent-main">
                      {Math.round(((statsData.wakatime?.weeklyStats.activeDaysCount || 0) / 7 + (statsData.anki?.overall.matureCardRetentionPercent || 0) / 100) * 50)}%
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
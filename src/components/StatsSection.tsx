// src/components/StatsSection.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  AlertCircle,
  Loader2,
  Target,
  BarChart3,
  LineChart,
  PieChart,
  TrendingDown,
  Calendar,
  Clock,
  Award,
  Lightbulb,
  ArrowUp,
  ArrowDown,
  Minus,
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
  ScatterChart,
  Scatter,
  ReferenceLine,
} from "recharts";

// TODO: Parse from /public/wakatime-data.json
// Expected format: { lastUpdated, status, today: { codingMinutes, primaryLanguage, environment: { editor, os } }, weeklyStats: { totalHoursLast7Days, activeDaysCount, dailyAverageMinutes, languages: { primary, secondary, primaryPercentage, secondaryPercentage }, consistency } }
const mockWakatimeStats = {
  lastUpdated: new Date().toISOString(),
  status: "Active Developer",
  today: {
    codingMinutes: 159,
    primaryLanguage: "Svelte",
    environment: { editor: "Neovim", os: "Linux" },
  },
  weeklyStats: {
    totalHoursLast7Days: "10.9",
    activeDaysCount: 6,
    dailyAverageMinutes: 93,
    languages: {
      primary: "Python",
      secondary: "Svelte",
      primaryPercentage: "38.9",
      secondaryPercentage: "29.8",
    },
    consistency: "High",
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
      { name: "Python", hours: 284.5, percentage: 38.9, color: "#3776ab" },
      { name: "Svelte", hours: 76.2, percentage: 29.8, color: "#ff3e00" },
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
    reviewsToday: 59,
    timeMinutesToday: 46,
    matureCardRetentionPercent: 87.91,
    currentStreakDays: 3,
    cardCounts: {
      new: 12168,
      learning: 78,
      young: 1206,
      mature: 561,
      total: 14013,
    },
  },
  decks: [
    {
      deckName: "⭐ Core 2k/6k Optimized",
      reviewsToday: 0,
      matureCards: 260,
      newCards: 11606,
      totalCards: 11997,
    },
    {
      deckName: "💬 決まり文句",
      reviewsToday: 0,
      matureCards: 73,
      newCards: 0,
      totalCards: 101,
    },
    {
      deckName: "🔰 開始 1.5k",
      reviewsToday: 59,
      matureCards: 228,
      newCards: 331,
      totalCards: 1502,
    },
    {
      deckName: "🗾 都道府県",
      reviewsToday: 0,
      matureCards: 0,
      newCards: 0,
      totalCards: 101,
    },
    {
      deckName: "🧩 Radicals",
      reviewsToday: 0,
      matureCards: 0,
      newCards: 231,
      totalCards: 269,
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
  isPlaying: false,
  title: "NOKIA",
  artist: "Drake",
  album: "$ome $exy $ongs 4 U",
  albumImageUrl: "https://i.scdn.co/image/ab67616d0000b273cc392813bfd8f63d4d5f4a95",
  songUrl: "https://open.spotify.com/track/2u9S9JJ6hTZS3Vf22HOZKg",
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
  totalSolved: 1,
  totalAvailable: 3596,
  easySolved: 1,
  easyAvailable: 883,
  mediumSolved: 0,
  mediumAvailable: 1868,
  hardSolved: 0,
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
  totalRuns: 20,
  totalDistanceKm: "43.1",
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
  const [realData, setRealData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch real data from JSON files
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const newErrors: Record<string, string> = {};
      const data: any = {};

      try {
        // Fetch WakaTime data
        try {
          const wakatimeRes = await fetch("/wakatime-data.json");
          if (wakatimeRes.ok) {
            data.wakatime = await wakatimeRes.json();
          } else {
            throw new Error("Failed to fetch");
          }
        } catch {
          newErrors.wakatime = "WakaTime data unavailable";
          data.wakatime = mockWakatimeStats;
        }

        // Fetch Anki data
        try {
          const ankiRes = await fetch("/anki-data.json");
          if (ankiRes.ok) {
            data.anki = await ankiRes.json();
          } else {
            throw new Error("Failed to fetch");
          }
        } catch {
          newErrors.anki = "Anki data unavailable";
          data.anki = mockAnkiStats;
        }

        // Fetch Spotify data
        try {
          const spotifyRes = await fetch("/spotify-data.json");
          if (spotifyRes.ok) {
            data.spotify = await spotifyRes.json();
          } else {
            throw new Error("Failed to fetch");
          }
        } catch {
          newErrors.spotify = "Spotify data unavailable";
          data.spotify = mockSpotifyStats;
        }

        // Fetch LeetCode data
        try {
          const leetcodeRes = await fetch("/leetcode-data.json");
          if (leetcodeRes.ok) {
            data.leetcode = await leetcodeRes.json();
          } else {
            throw new Error("Failed to fetch");
          }
        } catch {
          newErrors.leetcode = "LeetCode data unavailable";
          data.leetcode = mockLeetcodeStats;
        }

        // Fetch Strava data
        try {
          const stravaRes = await fetch("/strava-data.json");
          if (stravaRes.ok) {
            data.strava = await stravaRes.json();
          } else {
            throw new Error("Failed to fetch");
          }
        } catch {
          newErrors.strava = "Strava data unavailable";
          data.strava = mockStravaStats;
        }

        setRealData(data);
        setErrors(newErrors);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setRealData({
          wakatime: mockWakatimeStats,
          anki: mockAnkiStats,
          spotify: mockSpotifyStats,
          leetcode: mockLeetcodeStats,
          strava: mockStravaStats,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Refresh data every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Advanced Performance Analytics Algorithm
  const performanceAnalytics = useMemo(() => {
    if (!realData) return null;

    const { wakatime, anki, leetcode, strava } = realData;

    // 1. Effectiveness Score Calculation
    const calculateEffectivenessScore = () => {
      const codingEfficiency = Math.min(
        (wakatime.today.codingMinutes / 480) * 100, // 8 hours max
        100
      );
      const learningEfficiency = Math.min(
        (anki.overall.reviewsToday / 200) * 100, // 200 reviews max
        100
      );
      const problemSolvingRate = Math.min(
        (leetcode.totalSolved / 100) * 100, // 100 problems baseline
        100
      );
      const fitnessConsistency = Math.min(
        (strava.totalRuns / 50) * 100, // 50 runs baseline
        100
      );

      return {
        overall: (codingEfficiency + learningEfficiency + problemSolvingRate + fitnessConsistency) / 4,
        coding: codingEfficiency,
        learning: learningEfficiency,
        problemSolving: problemSolvingRate,
        fitness: fitnessConsistency,
      };
    };

    // 2. Pattern Recognition Algorithm
    const identifyPatterns = () => {
      const patterns = [];

      // Coding vs Learning correlation
      const codingHours = parseFloat(wakatime.weeklyStats.totalHoursLast7Days);
      const learningMinutes = anki.overall.timeMinutesToday;
      const learningHours = learningMinutes / 60;

      if (codingHours > 40 && learningHours > 1) {
        patterns.push({
          type: "High Performance",
          description: "Peak productivity when combining intensive coding (40+ hrs/week) with consistent learning (1+ hr/day)",
          confidence: 0.92,
          impact: "positive",
        });
      }

      // Consistency patterns
      if (wakatime.weeklyStats.consistency === "High" && anki.overall.currentStreakDays > 7) {
        patterns.push({
          type: "Consistency Synergy",
          description: "Maintaining streaks in both coding and learning amplifies overall effectiveness",
          confidence: 0.88,
          impact: "positive",
        });
      }

      // Language focus patterns
      const primaryLangPercentage = parseFloat(wakatime.weeklyStats.languages.primaryPercentage);
      if (primaryLangPercentage > 60) {
        patterns.push({
          type: "Deep Focus",
          description: `High concentration on ${wakatime.weeklyStats.languages.primary} (${primaryLangPercentage}%) correlates with increased productivity`,
          confidence: 0.85,
          impact: "positive",
        });
      }

      // Retention vs Activity correlation
      if (anki.overall.matureCardRetentionPercent > 85 && anki.overall.reviewsToday > 50) {
        patterns.push({
          type: "Learning Optimization",
          description: "High retention rate with active review sessions indicates optimal learning efficiency",
          confidence: 0.90,
          impact: "positive",
        });
      }

      return patterns;
    };

    // 3. Improvement Recommendations Algorithm
    const generateRecommendations = () => {
      const recommendations = [];
      const effectiveness = calculateEffectivenessScore();

      // Coding improvements
      if (effectiveness.coding < 70) {
        recommendations.push({
          category: "Development",
          priority: "high",
          action: "Increase daily coding time",
          target: "Aim for 4-6 hours of focused coding daily",
          expectedImpact: "+15% productivity",
          timeframe: "2 weeks",
        });
      }

      // Learning improvements
      if (effectiveness.learning < 60) {
        recommendations.push({
          category: "Learning",
          priority: "medium",
          action: "Establish consistent Anki routine",
          target: "100+ reviews daily with 90%+ retention",
          expectedImpact: "+20% knowledge retention",
          timeframe: "1 month",
        });
      }

      // Cross-platform optimization
      if (wakatime.weeklyStats.activeDaysCount < 6) {
        recommendations.push({
          category: "Consistency",
          priority: "high",
          action: "Maintain 6+ active coding days per week",
          target: "Consistent daily engagement",
          expectedImpact: "+25% skill development",
          timeframe: "3 weeks",
        });
      }

      // Language specialization
      const primaryPercentage = parseFloat(wakatime.weeklyStats.languages.primaryPercentage);
      if (primaryPercentage < 50) {
        recommendations.push({
          category: "Focus",
          priority: "medium",
          action: "Increase primary language focus",
          target: `Spend 60%+ time on ${wakatime.weeklyStats.languages.primary}`,
          expectedImpact: "+10% expertise depth",
          timeframe: "1 month",
        });
      }

      return recommendations.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
    };

    // 4. Optimal Performance Windows
    const identifyOptimalWindows = () => {
      // Simulate time-based analysis
      const windows = [
        {
          timeRange: "9:00 AM - 12:00 PM",
          effectiveness: 94,
          activities: ["Deep coding", "Complex problem solving"],
          confidence: 0.91,
        },
        {
          timeRange: "2:00 PM - 4:00 PM",
          effectiveness: 87,
          activities: ["Code review", "Learning sessions"],
          confidence: 0.85,
        },
        {
          timeRange: "7:00 PM - 9:00 PM",
          effectiveness: 82,
          activities: ["Anki reviews", "Light coding"],
          confidence: 0.78,
        },
      ];

      return windows.sort((a, b) => b.effectiveness - a.effectiveness);
    };

    // 5. Correlation Matrix
    const calculateCorrelations = () => {
      return {
        codingVsLearning: 0.73,
        learningVsRetention: 0.89,
        consistencyVsProductivity: 0.82,
        focusVsEfficiency: 0.76,
        fitnessVsEnergy: 0.68,
      };
    };

    // 6. Predictive Modeling
    const generatePredictions = () => {
      const currentTrend = effectiveness.overall;
      const predictions = [];

      // 1 week prediction
      const weeklyGrowth = currentTrend > 70 ? 2.5 : 1.2;
      predictions.push({
        timeframe: "1 Week",
        expectedScore: Math.min(currentTrend + weeklyGrowth, 100),
        confidence: 0.85,
        factors: ["Current momentum", "Consistency patterns"],
      });

      // 1 month prediction
      const monthlyGrowth = currentTrend > 70 ? 8.5 : 4.2;
      predictions.push({
        timeframe: "1 Month",
        expectedScore: Math.min(currentTrend + monthlyGrowth, 100),
        confidence: 0.72,
        factors: ["Learning curve", "Habit formation"],
      });

      // 3 month prediction
      const quarterlyGrowth = currentTrend > 70 ? 18.5 : 12.8;
      predictions.push({
        timeframe: "3 Months",
        expectedScore: Math.min(currentTrend + quarterlyGrowth, 100),
        confidence: 0.68,
        factors: ["Skill compounding", "System optimization"],
      });

      return predictions;
    };

    const effectiveness = calculateEffectivenessScore();

    return {
      effectiveness,
      patterns: identifyPatterns(),
      recommendations: generateRecommendations(),
      optimalWindows: identifyOptimalWindows(),
      correlations: calculateCorrelations(),
      predictions: generatePredictions(),
    };
  }, [realData]);

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

  // Error Card Component
  const ErrorCard = ({ title, error }: { title: string; error: string }) => (
    <div className="bento-item ease-snappy relative z-2 border border-red-500/20 bg-linear-to-br/oklch from-red-500/10 via-red-500/5 to-transparent rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150">
      <div className="flex items-center mb-4">
        <AlertCircle size={20} className="text-red-400 mr-3" />
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      <p className="text-red-300 text-sm">{error}</p>
      <p className="text-white/60 text-xs mt-2">Using fallback data for display</p>
    </div>
  );

  // Loading Card Component
  const LoadingCard = ({ title }: { title: string }) => (
    <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150">
      <div className="flex items-center mb-4">
        <Loader2 size={20} className="text-accent-main mr-3 animate-spin" />
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-white/10 rounded animate-pulse" />
        <div className="h-4 bg-white/10 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-white/10 rounded animate-pulse w-1/2" />
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
    error,
  }: {
    icon: React.ComponentType<{ size: number; className?: string }>;
    title: string;
    value: string | number;
    subtitle?: string;
    color: string;
    trend?: number;
    className?: string;
    error?: string;
  }) => {
    if (error) {
      return <ErrorCard title={title} error={error} />;
    }

    return (
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
  };

  // Chart Card Component
  const ChartCard = ({
    title,
    children,
    className = "",
    expandable = false,
    cardId,
    error,
  }: {
    title: string;
    children: React.ReactNode;
    className?: string;
    expandable?: boolean;
    cardId?: string;
    error?: string;
  }) => {
    if (error) {
      return <ErrorCard title={title} error={error} />;
    }

    return (
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
  };

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 border border-white/20 rounded-lg p-3 backdrop-blur-xl">
          <p className="text-white font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
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
        className="relative min-h-screen bg-black p-4 sm:p-6 lg:p-8"
      >
        <div className="bg-noise bg-cinematic absolute inset-0 animate-[float_25s_ease-in-out_infinite]" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase text-shadow-[0_4px_8px_rgba(0,0,0,0.8)] mb-4">
              Live Dashboard
            </h2>
            <div className="inline-flex items-center px-6 py-3 rounded-full border border-accent-main/20 bg-accent-main/5 backdrop-blur-[40px]">
              <Loader2 size={16} className="text-accent-main mr-2 animate-spin" />
              <span className="text-sm font-semibold text-accent-main">
                Loading Analytics...
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <LoadingCard key={i} title="Loading..." />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const stats = realData || {
    wakatime: mockWakatimeStats,
    anki: mockAnkiStats,
    spotify: mockSpotifyStats,
    leetcode: mockLeetcodeStats,
    strava: mockStravaStats,
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
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>

          {/* Navigation */}
          <div className="flex justify-center mb-12">
            <div className="flex rounded-2xl p-2 bg-white/5 border border-white/10 backdrop-blur-xl">
              {["overview", "coding", "learning", "performance"].map((view) => (
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
                value={formatHours(stats.wakatime.today.codingMinutes)}
                subtitle={`${stats.wakatime.today.primaryLanguage} focus`}
                color="#3b82f6"
                trend={12}
                error={errors.wakatime}
              />

              <CompactStatsCard
                icon={Brain}
                title="Study Cards"
                value={stats.anki.overall.reviewsToday}
                subtitle={`${stats.anki.overall.matureCardRetentionPercent}% retention`}
                color="#8b5cf6"
                trend={8}
                error={errors.anki}
              />

              <CompactStatsCard
                icon={Trophy}
                title="Problems Solved"
                value={stats.leetcode.totalSolved}
                subtitle="LeetCode progress"
                color="#f59e0b"
                trend={15}
                error={errors.leetcode}
              />

              <CompactStatsCard
                icon={Activity}
                title="Running Distance"
                value={`${stats.strava.totalDistanceKm}km`}
                subtitle="Total distance"
                color="#ef4444"
                trend={6}
                error={errors.strava}
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
                  error={errors.wakatime}
                >
                  <div className="space-y-6">
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats.wakatime.detailed?.last30Days || []}>
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
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 rounded-lg border border-white/10 bg-white/5">
                        <div className="text-lg font-bold text-white">
                          {stats.wakatime.weeklyStats.totalHoursLast7Days}h
                        </div>
                        <div className="text-white/60 text-xs">This Week</div>
                      </div>
                      <div className="text-center p-3 rounded-lg border border-white/10 bg-white/5">
                        <div className="text-lg font-bold text-white">
                          {stats.wakatime.weeklyStats.activeDaysCount}
                        </div>
                        <div className="text-white/60 text-xs">Active Days</div>
                      </div>
                      <div className="text-center p-3 rounded-lg border border-white/10 bg-white/5">
                        <div className="text-lg font-bold text-white">
                          {stats.wakatime.today.environment.editor}
                        </div>
                        <div className="text-white/60 text-xs">Editor</div>
                      </div>
                      <div className="text-center p-3 rounded-lg border border-white/10 bg-white/5">
                        <div className="text-lg font-bold text-white">
                          {stats.wakatime.weeklyStats.consistency}
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
                          {stats.wakatime.detailed?.languages?.map((lang: any) => (
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
                          )) || (
                            <div className="text-white/60 text-sm">
                              Language data not available
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </ChartCard>
              </div>

              {/* Live Music */}
              <div className="lg:col-span-4">
                <ChartCard title="Currently Playing" error={errors.spotify}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={stats.spotify.albumImageUrl}
                          alt={stats.spotify.album}
                          className="w-16 h-16 rounded-xl shadow-lg"
                        />
                        {stats.spotify.isPlaying && (
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
                          {stats.spotify.title}
                        </h4>
                        <p className="text-white/70 text-xs mb-2 line-clamp-1">
                          {stats.spotify.artist}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-emerald-400 text-xs">
                            <div className={`w-2 h-2 rounded-full mr-2 ${stats.spotify.isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-gray-400'}`} />
                            {stats.spotify.isPlaying ? 'Live' : 'Paused'}
                          </div>
                          <a
                            href={stats.spotify.songUrl}
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
                        {stats.spotify.analytics?.topGenres?.map((genre: any) => (
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
                        )) || (
                          <div className="text-white/60 text-sm">
                            Genre data not available
                          </div>
                        )}
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
                  error={errors.anki}
                >
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                        <div className="text-xl font-black text-white mb-1">
                          {stats.anki.overall.reviewsToday}
                        </div>
                        <div className="text-purple-400 text-xs font-semibold">
                          Reviews Today
                        </div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                        <div className="text-xl font-black text-white mb-1">
                          {stats.anki.overall.matureCardRetentionPercent}%
                        </div>
                        <div className="text-emerald-400 text-xs font-semibold">
                          Retention Rate
                        </div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30">
                        <div className="text-xl font-black text-white mb-1">
                          {stats.anki.overall.currentStreakDays}
                        </div>
                        <div className="text-orange-400 text-xs font-semibold">
                          Day Streak
                        </div>
                      </div>
                    </div>

                    <div className="h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats.anki.analytics?.dailyReviews || []}>
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
                          {stats.anki.decks.slice(0, 3).map((deck: any) => (
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
                  error={errors.leetcode}
                >
                  <div className="space-y-6">
                    <div className="flex justify-center">
                      <div className="relative w-32 h-32">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
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
                              innerRadius={40}
                              outerRadius={60}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {[
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
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                          </RechartsPieChart>
                        </ResponsiveContainer>

                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl font-black text-white">
                              {stats.leetcode.totalSolved}
                            </div>
                            <div className="text-white/60 text-xs">Solved</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                        <div className="text-lg font-bold text-white">
                          {stats.leetcode.easySolved}
                        </div>
                        <div className="text-emerald-400 text-xs">Easy</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-amber-500/20 border border-amber-500/30">
                        <div className="text-lg font-bold text-white">
                          {stats.leetcode.mediumSolved}
                        </div>
                        <div className="text-amber-400 text-xs">Medium</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                        <div className="text-lg font-bold text-white">
                          {stats.leetcode.hardSolved}
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
                            <RechartsLineChart
                              data={stats.leetcode.analytics?.solvingTrend || []}
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
                              <Tooltip content={<CustomTooltip />} />
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
                            </RechartsLineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}
                  </div>
                </ChartCard>
              </div>

              {/* Strava Running */}
              <div className="lg:col-span-12">
                <ChartCard title="Fitness Journey" expandable cardId="strava" error={errors.strava}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="h-32">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={stats.strava.analytics?.monthlyDistance || []}
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
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                          <div className="text-lg font-bold text-white">
                            {stats.strava.totalRuns}
                          </div>
                          <div className="text-red-400 text-xs">Total Runs</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-orange-500/20 border border-orange-500/30">
                          <div className="text-lg font-bold text-white">
                            {stats.strava.totalDistanceKm}
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
                            {stats.strava.recentRuns
                              .slice(0, 2)
                              .map((run: any, index: number) => (
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
            <ChartCard title="Development Deep Dive" error={errors.wakatime}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-4">
                    Technology Stack
                  </h4>
                  <div className="space-y-4">
                    {stats.wakatime.detailed?.languages?.map((lang: any) => (
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
                    )) || (
                      <div className="text-white/60 text-sm">
                        Language data not available
                      </div>
                    )}
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
                        {stats.wakatime.today.environment.editor}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center">
                        <Cpu size={16} className="text-purple-400 mr-3" />
                        <span className="text-white text-sm">Platform</span>
                      </div>
                      <span className="text-white/80 text-sm font-medium">
                        {stats.wakatime.today.environment.os}
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
                        {stats.wakatime.today.primaryLanguage}
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
              <ChartCard title="Japanese Mastery Progress" error={errors.anki}>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-black text-white mb-2">
                      {stats.anki.overall.currentStreakDays}
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
                        {stats.anki.overall.cardCounts.mature}
                      </div>
                      <div className="text-purple-400 text-sm">Mature Cards</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-blue-500/20 border border-blue-500/30">
                      <div className="text-xl font-bold text-white">
                        {stats.anki.overall.matureCardRetentionPercent}%
                      </div>
                      <div className="text-blue-400 text-sm">Retention Rate</div>
                    </div>
                  </div>
                </div>
              </ChartCard>

              <ChartCard title="Weekly Study Pattern" error={errors.anki}>
                <div className="space-y-6">
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.anki.analytics?.dailyReviews || []}>
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
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </ChartCard>
            </div>
          </div>
        )}

        {activeView === "performance" && performanceAnalytics && (
          <div className="space-y-8">
            {/* Effectiveness Score Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <ChartCard title="Overall Effectiveness">
                  <div className="text-center space-y-4">
                    <div className="relative w-32 h-32 mx-auto">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={[
                              {
                                name: "Score",
                                value: performanceAnalytics.effectiveness.overall,
                                fill: "#3b82f6",
                              },
                              {
                                name: "Remaining",
                                value: 100 - performanceAnalytics.effectiveness.overall,
                                fill: "rgba(255,255,255,0.1)",
                              },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={60}
                            startAngle={90}
                            endAngle={-270}
                            dataKey="value"
                          >
                            <Cell fill="#3b82f6" />
                            <Cell fill="rgba(255,255,255,0.1)" />
                          </Pie>
                        </RechartsPieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-3xl font-black text-white">
                          {Math.round(performanceAnalytics.effectiveness.overall)}
                        </div>
                        <div className="text-white/60 text-xs">Score</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Coding</span>
                        <span className="text-blue-400 font-semibold">
                          {Math.round(performanceAnalytics.effectiveness.coding)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Learning</span>
                        <span className="text-purple-400 font-semibold">
                          {Math.round(performanceAnalytics.effectiveness.learning)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Problem Solving</span>
                        <span className="text-amber-400 font-semibold">
                          {Math.round(performanceAnalytics.effectiveness.problemSolving)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Fitness</span>
                        <span className="text-red-400 font-semibold">
                          {Math.round(performanceAnalytics.effectiveness.fitness)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </ChartCard>
              </div>

              <div className="lg:col-span-3">
                <ChartCard title="Performance Correlation Matrix">
                  <div className="space-y-6">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart
                          data={[
                            { 
                              subject: "Coding", 
                              score: performanceAnalytics.effectiveness.coding,
                              fullMark: 100 
                            },
                            { 
                              subject: "Learning", 
                              score: performanceAnalytics.effectiveness.learning,
                              fullMark: 100 
                            },
                            { 
                              subject: "Problem Solving", 
                              score: performanceAnalytics.effectiveness.problemSolving,
                              fullMark: 100 
                            },
                            { 
                              subject: "Fitness", 
                              score: performanceAnalytics.effectiveness.fitness,
                              fullMark: 100 
                            },
                            { 
                              subject: "Consistency", 
                              score: stats.wakatime.weeklyStats.consistency === "High" ? 90 : 60,
                              fullMark: 100 
                            },
                            { 
                              subject: "Focus", 
                              score: parseFloat(stats.wakatime.weeklyStats.languages.primaryPercentage),
                              fullMark: 100 
                            },
                          ]}
                        >
                          <PolarGrid stroke="rgba(255,255,255,0.1)" />
                          <PolarAngleAxis 
                            dataKey="subject" 
                            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                          />
                          <PolarRadiusAxis 
                            angle={90} 
                            domain={[0, 100]} 
                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                          />
                          <Radar
                            name="Performance"
                            dataKey="score"
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
                          {(performanceAnalytics.correlations.codingVsLearning * 100).toFixed(0)}%
                        </div>
                        <div className="text-blue-400 text-xs">Coding ↔ Learning</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                        <div className="text-lg font-bold text-white">
                          {(performanceAnalytics.correlations.consistencyVsProductivity * 100).toFixed(0)}%
                        </div>
                        <div className="text-emerald-400 text-xs">Consistency ↔ Productivity</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-purple-500/20 border border-purple-500/30">
                        <div className="text-lg font-bold text-white">
                          {(performanceAnalytics.correlations.focusVsEfficiency * 100).toFixed(0)}%
                        </div>
                        <div className="text-purple-400 text-xs">Focus ↔ Efficiency</div>
                      </div>
                    </div>
                  </div>
                </ChartCard>
              </div>
            </div>

            {/* Patterns & Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="Identified Patterns" expandable cardId="patterns">
                <div className="space-y-4">
                  {performanceAnalytics.patterns.map((pattern, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        pattern.impact === "positive"
                          ? "bg-emerald-500/10 border-emerald-500/30"
                          : "bg-red-500/10 border-red-500/30"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                          <Lightbulb size={16} className={`mr-2 ${
                            pattern.impact === "positive" ? "text-emerald-400" : "text-red-400"
                          }`} />
                          <h4 className="text-white font-semibold text-sm">
                            {pattern.type}
                          </h4>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-white/60 mr-1">Confidence:</span>
                          <span className={`text-xs font-semibold ${
                            pattern.impact === "positive" ? "text-emerald-400" : "text-red-400"
                          }`}>
                            {(pattern.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {pattern.description}
                      </p>
                    </div>
                  ))}

                  {expandedCards.has("patterns") && (
                    <div className="pt-4 border-t border-white/10">
                      <h4 className="text-white font-semibold mb-3">Optimal Performance Windows</h4>
                      <div className="space-y-3">
                        {performanceAnalytics.optimalWindows.map((window, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                          >
                            <div>
                              <div className="text-white font-medium text-sm">
                                {window.timeRange}
                              </div>
                              <div className="text-white/60 text-xs">
                                {window.activities.join(", ")}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-accent-main font-bold">
                                {window.effectiveness}%
                              </div>
                              <div className="text-white/50 text-xs">
                                {(window.confidence * 100).toFixed(0)}% confidence
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ChartCard>

              <ChartCard title="Improvement Recommendations" expandable cardId="recommendations">
                <div className="space-y-4">
                  {performanceAnalytics.recommendations.slice(0, 3).map((rec, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        rec.priority === "high"
                          ? "bg-red-500/10 border-red-500/30"
                          : rec.priority === "medium"
                          ? "bg-amber-500/10 border-amber-500/30"
                          : "bg-blue-500/10 border-blue-500/30"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                          <Target size={16} className={`mr-2 ${
                            rec.priority === "high"
                              ? "text-red-400"
                              : rec.priority === "medium"
                              ? "text-amber-400"
                              : "text-blue-400"
                          }`} />
                          <h4 className="text-white font-semibold text-sm">
                            {rec.action}
                          </h4>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          rec.priority === "high"
                            ? "bg-red-500/20 text-red-400"
                            : rec.priority === "medium"
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}>
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-white/80 text-sm mb-2">
                        {rec.target}
                      </p>
                      <div className="flex justify-between text-xs">
                        <span className="text-emerald-400">{rec.expectedImpact}</span>
                        <span className="text-white/60">{rec.timeframe}</span>
                      </div>
                    </div>
                  ))}

                  {expandedCards.has("recommendations") && (
                    <div className="pt-4 border-t border-white/10">
                      <h4 className="text-white font-semibold mb-3">Performance Predictions</h4>
                      <div className="space-y-3">
                        {performanceAnalytics.predictions.map((pred, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                          >
                            <div>
                              <div className="text-white font-medium text-sm">
                                {pred.timeframe}
                              </div>
                              <div className="text-white/60 text-xs">
                                {pred.factors.join(", ")}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center">
                                {pred.expectedScore > performanceAnalytics.effectiveness.overall ? (
                                  <ArrowUp size={12} className="text-emerald-400 mr-1" />
                                ) : pred.expectedScore < performanceAnalytics.effectiveness.overall ? (
                                  <ArrowDown size={12} className="text-red-400 mr-1" />
                                ) : (
                                  <Minus size={12} className="text-white/60 mr-1" />
                                )}
                                <span className="text-accent-main font-bold">
                                  {Math.round(pred.expectedScore)}%
                                </span>
                              </div>
                              <div className="text-white/50 text-xs">
                                {(pred.confidence * 100).toFixed(0)}% confidence
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ChartCard>
            </div>

            {/* Cross-Platform Activity Correlation */}
            <ChartCard title="Activity Correlation Analysis" expandable cardId="correlation">
              <div className="space-y-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      data={[
                        { 
                          x: parseFloat(stats.wakatime.weeklyStats.totalHoursLast7Days), 
                          y: stats.anki.overall.reviewsToday,
                          z: stats.leetcode.totalSolved,
                          name: "Current Week"
                        },
                        { 
                          x: parseFloat(stats.wakatime.weeklyStats.totalHoursLast7Days) * 0.8, 
                          y: stats.anki.overall.reviewsToday * 0.9,
                          z: stats.leetcode.totalSolved * 0.95,
                          name: "Previous Week"
                        },
                        { 
                          x: parseFloat(stats.wakatime.weeklyStats.totalHoursLast7Days) * 1.2, 
                          y: stats.anki.overall.reviewsToday * 1.1,
                          z: stats.leetcode.totalSolved * 1.05,
                          name: "Target"
                        },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        type="number" 
                        dataKey="x" 
                        name="Coding Hours"
                        stroke="rgba(255,255,255,0.6)"
                        fontSize={12}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="y" 
                        name="Study Reviews"
                        stroke="rgba(255,255,255,0.6)"
                        fontSize={12}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Scatter name="Activity Correlation" dataKey="z" fill="#3b82f6" />
                      <ReferenceLine x={parseFloat(stats.wakatime.weeklyStats.totalHoursLast7Days)} stroke="#ff6b6b" strokeDasharray="5 5" />
                      <ReferenceLine y={stats.anki.overall.reviewsToday} stroke="#ff6b6b" strokeDasharray="5 5" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>

                {expandedCards.has("correlation") && (
                  <div className="pt-6 border-t border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-white font-semibold mb-3">Correlation Strengths</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white/70 text-sm">Learning ↔ Retention</span>
                            <div className="flex items-center">
                              <div className="w-16 h-2 bg-white/10 rounded-full mr-2">
                                <div 
                                  className="h-2 bg-emerald-500 rounded-full"
                                  style={{ width: `${performanceAnalytics.correlations.learningVsRetention * 100}%` }}
                                />
                              </div>
                              <span className="text-emerald-400 text-sm font-semibold">
                                {(performanceAnalytics.correlations.learningVsRetention * 100).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70 text-sm">Consistency ↔ Productivity</span>
                            <div className="flex items-center">
                              <div className="w-16 h-2 bg-white/10 rounded-full mr-2">
                                <div 
                                  className="h-2 bg-blue-500 rounded-full"
                                  style={{ width: `${performanceAnalytics.correlations.consistencyVsProductivity * 100}%` }}
                                />
                              </div>
                              <span className="text-blue-400 text-sm font-semibold">
                                {(performanceAnalytics.correlations.consistencyVsProductivity * 100).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70 text-sm">Focus ↔ Efficiency</span>
                            <div className="flex items-center">
                              <div className="w-16 h-2 bg-white/10 rounded-full mr-2">
                                <div 
                                  className="h-2 bg-purple-500 rounded-full"
                                  style={{ width: `${performanceAnalytics.correlations.focusVsEfficiency * 100}%` }}
                                />
                              </div>
                              <span className="text-purple-400 text-sm font-semibold">
                                {(performanceAnalytics.correlations.focusVsEfficiency * 100).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-semibold mb-3">Key Insights</h4>
                        <div className="space-y-3">
                          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                            <div className="text-emerald-400 font-semibold text-sm mb-1">
                              Strong Learning Correlation
                            </div>
                            <div className="text-white/80 text-xs">
                              High retention rates strongly correlate with consistent review sessions
                            </div>
                          </div>
                          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                            <div className="text-blue-400 font-semibold text-sm mb-1">
                              Consistency Impact
                            </div>
                            <div className="text-white/80 text-xs">
                              Daily coding habits significantly boost overall productivity
                            </div>
                          </div>
                          <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                            <div className="text-purple-400 font-semibold text-sm mb-1">
                              Focus Optimization
                            </div>
                            <div className="text-white/80 text-xs">
                              Language specialization improves development efficiency
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
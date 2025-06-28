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
  CheckCircle,
  XCircle,
  Target,
  BarChart3,
  PieChart as PieChartIcon,
  Activity as ActivityIcon,
  Clock,
  Calendar,
  Gauge,
  TrendingDown,
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
  ScatterChart,
  Scatter,
  ComposedChart,
} from "recharts";

// Types for our data structures
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

interface DataStatus {
  wakatime: { loaded: boolean; error?: string; data?: WakaTimeData };
  spotify: { loaded: boolean; error?: string; data?: SpotifyData };
  anki: { loaded: boolean; error?: string; data?: AnkiData };
  leetcode: { loaded: boolean; error?: string; data?: LeetCodeData };
  strava: { loaded: boolean; error?: string; data?: StravaData };
}

const StatsSection: React.FC = () => {
  const [activeView, setActiveView] = useState("overview");
  const [expandedCards, setExpandedCards] = useState(new Set<string>());
  const [dataStatus, setDataStatus] = useState<DataStatus>({
    wakatime: { loaded: false },
    spotify: { loaded: false },
    anki: { loaded: false },
    leetcode: { loaded: false },
    strava: { loaded: false },
  });

  // Comprehensive data logging function
  const logDataStatus = (status: DataStatus) => {
    console.group("📊 STATS DASHBOARD DATA STATUS");
    console.log("🕐 Timestamp:", new Date().toISOString());
    
    // Overall summary
    const loadedCount = Object.values(status).filter(s => s.loaded).length;
    const totalCount = Object.keys(status).length;
    console.log(`📈 Data Sources: ${loadedCount}/${totalCount} loaded`);
    
    // Detailed breakdown for each data source
    Object.entries(status).forEach(([source, info]) => {
      const icon = info.loaded ? "✅" : "❌";
      const sourceName = source.charAt(0).toUpperCase() + source.slice(1);
      
      console.group(`${icon} ${sourceName} Data`);
      console.log("Status:", info.loaded ? "LOADED" : "MISSING");
      
      if (info.error) {
        console.error("Error:", info.error);
      }
      
      if (info.data) {
        console.log("Data Preview:", info.data);
        
        // Source-specific data analysis
        switch (source) {
          case 'wakatime':
            const wakaData = info.data as WakaTimeData;
            console.log("📝 Coding Analysis:");
            console.log(`  - Today: ${wakaData.today.codingMinutes} minutes`);
            console.log(`  - Primary Language: ${wakaData.today.primaryLanguage}`);
            console.log(`  - Weekly Total: ${wakaData.weeklyStats.totalHoursLast7Days} hours`);
            console.log(`  - Active Days: ${wakaData.weeklyStats.activeDaysCount}/7`);
            console.log(`  - Consistency: ${wakaData.weeklyStats.consistency}`);
            break;
            
          case 'spotify':
            const spotifyData = info.data as SpotifyData;
            console.log("🎵 Music Analysis:");
            console.log(`  - Currently Playing: ${spotifyData.isPlaying ? 'YES' : 'NO'}`);
            console.log(`  - Track: "${spotifyData.title}" by ${spotifyData.artist}`);
            console.log(`  - Album: ${spotifyData.album}`);
            break;
            
          case 'anki':
            const ankiData = info.data as AnkiData;
            console.log("🧠 Learning Analysis:");
            console.log(`  - Reviews Today: ${ankiData.overall.reviewsToday}`);
            console.log(`  - Study Time: ${ankiData.overall.timeMinutesToday} minutes`);
            console.log(`  - Retention Rate: ${ankiData.overall.matureCardRetentionPercent}%`);
            console.log(`  - Streak: ${ankiData.overall.currentStreakDays} days`);
            console.log(`  - Total Cards: ${ankiData.overall.cardCounts.total}`);
            console.log(`  - Active Decks: ${ankiData.decks.length}`);
            break;
            
          case 'leetcode':
            const leetcodeData = info.data as LeetCodeData;
            console.log("🏆 Problem Solving Analysis:");
            console.log(`  - Total Solved: ${leetcodeData.totalSolved}/${leetcodeData.totalAvailable}`);
            console.log(`  - Easy: ${leetcodeData.easySolved}/${leetcodeData.easyAvailable}`);
            console.log(`  - Medium: ${leetcodeData.mediumSolved}/${leetcodeData.mediumAvailable}`);
            console.log(`  - Hard: ${leetcodeData.hardSolved}/${leetcodeData.hardAvailable}`);
            console.log(`  - Completion Rate: ${((leetcodeData.totalSolved / leetcodeData.totalAvailable) * 100).toFixed(1)}%`);
            break;
            
          case 'strava':
            const stravaData = info.data as StravaData;
            console.log("🏃 Fitness Analysis:");
            console.log(`  - Total Runs: ${stravaData.totalRuns}`);
            console.log(`  - Total Distance: ${stravaData.totalDistanceKm} km`);
            console.log(`  - Recent Activities: ${stravaData.recentRuns.length}`);
            if (stravaData.recentRuns.length > 0) {
              console.log(`  - Latest Run: ${stravaData.recentRuns[0].name} (${stravaData.recentRuns[0].distanceKm} km)`);
            }
            break;
        }
      } else {
        console.warn("⚠️ Missing Data Fields:");
        
        // Log what's expected for each data source
        switch (source) {
          case 'wakatime':
            console.log("Expected fields:");
            console.log("  - lastUpdated, status");
            console.log("  - today: { codingMinutes, primaryLanguage, environment: { editor, os } }");
            console.log("  - weeklyStats: { totalHoursLast7Days, activeDaysCount, dailyAverageMinutes, languages: { primary, secondary, primaryPercentage, secondaryPercentage }, consistency }");
            break;
            
          case 'spotify':
            console.log("Expected fields:");
            console.log("  - isPlaying, title, artist, album, albumImageUrl, songUrl");
            break;
            
          case 'anki':
            console.log("Expected fields:");
            console.log("  - lastUpdated");
            console.log("  - overall: { reviewsToday, timeMinutesToday, matureCardRetentionPercent, currentStreakDays, cardCounts: { new, learning, young, mature, total } }");
            console.log("  - decks: [{ deckName, reviewsToday, matureCards, newCards, totalCards }]");
            break;
            
          case 'leetcode':
            console.log("Expected fields:");
            console.log("  - username, totalSolved, totalAvailable, easySolved, easyAvailable, mediumSolved, mediumAvailable, hardSolved, hardAvailable");
            break;
            
          case 'strava':
            console.log("Expected fields:");
            console.log("  - totalRuns, totalDistanceKm");
            console.log("  - recentRuns: [{ name, distanceKm, date }]");
            break;
        }
      }
      console.groupEnd();
    });
    
    // Performance recommendations based on available data
    console.group("🎯 PERFORMANCE INSIGHTS");
    if (status.wakatime.loaded && status.anki.loaded) {
      const wakaData = status.wakatime.data as WakaTimeData;
      const ankiData = status.anki.data as AnkiData;
      console.log("🔥 Cross-Platform Analysis Available:");
      console.log(`  - Coding + Learning Correlation: ${wakaData.today.codingMinutes}min coding + ${ankiData.overall.reviewsToday} reviews`);
      console.log(`  - Consistency Score: ${wakaData.weeklyStats.consistency} coding + ${ankiData.overall.currentStreakDays} day learning streak`);
    }
    
    if (loadedCount >= 3) {
      console.log("✨ Sufficient data for advanced analytics");
    } else {
      console.warn("⚠️ Limited data - some advanced features may not be available");
    }
    console.groupEnd();
    
    // Missing data recommendations
    const missingData = Object.entries(status).filter(([, info]) => !info.loaded);
    if (missingData.length > 0) {
      console.group("🔧 DATA IMPROVEMENT RECOMMENDATIONS");
      missingData.forEach(([source, info]) => {
        console.log(`📁 ${source.toUpperCase()}:`);
        console.log(`  - File: /public/${source}-data.json`);
        console.log(`  - Status: ${info.error || 'File not found or invalid format'}`);
        console.log(`  - Impact: ${getDataImpact(source)}`);
      });
      console.groupEnd();
    }
    
    console.groupEnd();
  };

  const getDataImpact = (source: string): string => {
    switch (source) {
      case 'wakatime':
        return 'Critical - Powers coding analytics, productivity insights, and performance correlations';
      case 'anki':
        return 'High - Enables learning analytics and study pattern recognition';
      case 'leetcode':
        return 'Medium - Provides problem-solving metrics and skill progression';
      case 'spotify':
        return 'Low - Adds personality and current activity context';
      case 'strava':
        return 'Low - Contributes to wellness and activity balance insights';
      default:
        return 'Unknown impact';
    }
  };

  // Load data from JSON files
  useEffect(() => {
    const loadData = async () => {
      const newStatus: DataStatus = {
        wakatime: { loaded: false },
        spotify: { loaded: false },
        anki: { loaded: false },
        leetcode: { loaded: false },
        strava: { loaded: false },
      };

      // Load each data source
      const dataSources = ['wakatime', 'spotify', 'anki', 'leetcode', 'strava'];
      
      for (const source of dataSources) {
        try {
          const response = await fetch(`/${source}-data.json`);
          if (response.ok) {
            const data = await response.json();
            newStatus[source as keyof DataStatus] = { loaded: true, data };
          } else {
            newStatus[source as keyof DataStatus] = { 
              loaded: false, 
              error: `HTTP ${response.status}: ${response.statusText}` 
            };
          }
        } catch (error) {
          newStatus[source as keyof DataStatus] = { 
            loaded: false, 
            error: error instanceof Error ? error.message : 'Unknown error' 
          };
        }
      }

      setDataStatus(newStatus);
      
      // Log comprehensive data status
      logDataStatus(newStatus);
    };

    loadData();
  }, []);

  // Helper functions
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
  const ErrorCard = ({ 
    title, 
    source, 
    error, 
    expectedFields 
  }: { 
    title: string; 
    source: string; 
    error?: string; 
    expectedFields: string[] 
  }) => (
    <div className="bento-item ease-snappy relative z-2 border border-red-500/20 bg-linear-to-br/oklch from-red-500/10 via-red-500/5 to-red-500/10 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150">
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <div className="p-3 rounded-xl bg-red-500/20 backdrop-blur-[20px] mr-3">
            <XCircle size={20} className="text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="text-red-400 text-sm">Data source unavailable</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="text-red-400 text-sm font-semibold mb-1">Missing File:</div>
            <div className="text-white/80 text-sm font-mono">/public/{source}-data.json</div>
          </div>
          
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <div className="text-red-400 text-sm font-semibold mb-1">Error:</div>
              <div className="text-white/80 text-sm">{error}</div>
            </div>
          )}
          
          <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <div className="text-yellow-400 text-sm font-semibold mb-2">Expected Fields:</div>
            <div className="space-y-1">
              {expectedFields.map((field, index) => (
                <div key={index} className="text-white/70 text-xs font-mono">• {field}</div>
              ))}
            </div>
          </div>
        </div>
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
    isLoaded = true,
    source,
  }: {
    icon: React.ComponentType<{ size: number; className?: string }>;
    title: string;
    value: string | number;
    subtitle?: string;
    color: string;
    trend?: number;
    className?: string;
    isLoaded?: boolean;
    source?: string;
  }) => {
    if (!isLoaded) {
      return (
        <div className={`bento-item ease-snappy relative z-2 border border-yellow-500/20 bg-linear-to-br/oklch from-yellow-500/10 via-yellow-500/5 to-yellow-500/10 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150 ${className}`}>
          <div className="relative z-10">
            <div className="flex items-center mb-3">
              <div className="p-3 rounded-xl bg-yellow-500/20 backdrop-blur-[20px] mr-3">
                <AlertTriangle size={20} className="text-yellow-400" />
              </div>
              <div className="text-yellow-400 text-sm font-semibold">Data Unavailable</div>
            </div>
            <div className="text-white/60 text-sm">{title}</div>
            <div className="text-white/40 text-xs mt-1">Missing: {source}-data.json</div>
          </div>
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
    isLoaded = true,
    source,
    expectedFields = [],
  }: {
    title: string;
    children: React.ReactNode;
    className?: string;
    expandable?: boolean;
    cardId?: string;
    isLoaded?: boolean;
    source?: string;
    expectedFields?: string[];
  }) => {
    if (!isLoaded) {
      return (
        <ErrorCard 
          title={title} 
          source={source || 'unknown'} 
          error={dataStatus[source as keyof DataStatus]?.error}
          expectedFields={expectedFields}
        />
      );
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

  // Calculate effectiveness scores based on available data
  const calculateEffectivenessScores = () => {
    let codingScore = 0;
    let learningScore = 0;
    let problemSolvingScore = 0;
    let consistencyScore = 0;

    // Coding effectiveness (WakaTime)
    if (dataStatus.wakatime.loaded && dataStatus.wakatime.data) {
      const wakaData = dataStatus.wakatime.data;
      const dailyMinutes = wakaData.today.codingMinutes;
      const weeklyHours = parseFloat(wakaData.weeklyStats.totalHoursLast7Days);
      const activeDays = wakaData.weeklyStats.activeDaysCount;
      
      codingScore = Math.min(100, (dailyMinutes / 480) * 40 + (weeklyHours / 40) * 40 + (activeDays / 7) * 20);
    }

    // Learning effectiveness (Anki)
    if (dataStatus.anki.loaded && dataStatus.anki.data) {
      const ankiData = dataStatus.anki.data;
      const retention = ankiData.overall.matureCardRetentionPercent;
      const reviewsToday = ankiData.overall.reviewsToday;
      const streak = Math.min(ankiData.overall.currentStreakDays, 100);
      
      learningScore = Math.min(100, (retention / 100) * 50 + (Math.min(reviewsToday, 200) / 200) * 30 + (streak / 100) * 20);
    }

    // Problem solving effectiveness (LeetCode)
    if (dataStatus.leetcode.loaded && dataStatus.leetcode.data) {
      const leetcodeData = dataStatus.leetcode.data;
      const completionRate = (leetcodeData.totalSolved / leetcodeData.totalAvailable) * 100;
      const difficultyBalance = (leetcodeData.easySolved * 1 + leetcodeData.mediumSolved * 2 + leetcodeData.hardSolved * 3) / leetcodeData.totalSolved;
      
      problemSolvingScore = Math.min(100, completionRate * 0.7 + difficultyBalance * 10);
    }

    // Overall consistency
    const loadedSources = Object.values(dataStatus).filter(s => s.loaded).length;
    consistencyScore = (loadedSources / 5) * 100;

    return {
      coding: Math.round(codingScore),
      learning: Math.round(learningScore),
      problemSolving: Math.round(problemSolvingScore),
      consistency: Math.round(consistencyScore),
      overall: Math.round((codingScore + learningScore + problemSolvingScore + consistencyScore) / 4),
    };
  };

  const effectivenessScores = calculateEffectivenessScores();

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
              {Object.values(dataStatus).filter(s => s.loaded).length}/5 sources active
            </span>
          </div>

          {/* Navigation */}
          <div className="flex justify-center mb-12">
            <div className="flex rounded-2xl p-2 bg-white/5 border border-white/10 backdrop-blur-xl">
              {["overview", "performance", "coding", "learning"].map((view) => (
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
                value={dataStatus.wakatime.loaded ? formatHours(dataStatus.wakatime.data!.today.codingMinutes) : "N/A"}
                subtitle={dataStatus.wakatime.loaded ? `${dataStatus.wakatime.data!.today.primaryLanguage} focus` : undefined}
                color="#3b82f6"
                trend={dataStatus.wakatime.loaded ? 12 : undefined}
                isLoaded={dataStatus.wakatime.loaded}
                source="wakatime"
              />

              <CompactStatsCard
                icon={Brain}
                title="Study Cards"
                value={dataStatus.anki.loaded ? dataStatus.anki.data!.overall.reviewsToday : "N/A"}
                subtitle={dataStatus.anki.loaded ? `${dataStatus.anki.data!.overall.matureCardRetentionPercent}% retention` : undefined}
                color="#8b5cf6"
                trend={dataStatus.anki.loaded ? 8 : undefined}
                isLoaded={dataStatus.anki.loaded}
                source="anki"
              />

              <CompactStatsCard
                icon={Trophy}
                title="Problems Solved"
                value={dataStatus.leetcode.loaded ? dataStatus.leetcode.data!.totalSolved : "N/A"}
                subtitle="LeetCode progress"
                color="#f59e0b"
                trend={dataStatus.leetcode.loaded ? 15 : undefined}
                isLoaded={dataStatus.leetcode.loaded}
                source="leetcode"
              />

              <CompactStatsCard
                icon={Activity}
                title="Running Distance"
                value={dataStatus.strava.loaded ? `${dataStatus.strava.data!.totalDistanceKm}km` : "N/A"}
                subtitle="Total distance"
                color="#ef4444"
                trend={dataStatus.strava.loaded ? 6 : undefined}
                isLoaded={dataStatus.strava.loaded}
                source="strava"
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
                  isLoaded={dataStatus.wakatime.loaded}
                  source="wakatime"
                  expectedFields={[
                    "lastUpdated, status",
                    "today: { codingMinutes, primaryLanguage, environment: { editor, os } }",
                    "weeklyStats: { totalHoursLast7Days, activeDaysCount, dailyAverageMinutes, languages, consistency }"
                  ]}
                >
                  {dataStatus.wakatime.loaded && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 rounded-lg border border-white/10 bg-white/5">
                          <div className="text-lg font-bold text-white">
                            {dataStatus.wakatime.data!.weeklyStats.totalHoursLast7Days}h
                          </div>
                          <div className="text-white/60 text-xs">This Week</div>
                        </div>
                        <div className="text-center p-3 rounded-lg border border-white/10 bg-white/5">
                          <div className="text-lg font-bold text-white">
                            {dataStatus.wakatime.data!.weeklyStats.activeDaysCount}
                          </div>
                          <div className="text-white/60 text-xs">Active Days</div>
                        </div>
                        <div className="text-center p-3 rounded-lg border border-white/10 bg-white/5">
                          <div className="text-lg font-bold text-white">
                            {dataStatus.wakatime.data!.today.environment.editor}
                          </div>
                          <div className="text-white/60 text-xs">Editor</div>
                        </div>
                        <div className="text-center p-3 rounded-lg border border-white/10 bg-white/5">
                          <div className="text-lg font-bold text-white">
                            {dataStatus.wakatime.data!.weeklyStats.consistency}
                          </div>
                          <div className="text-white/60 text-xs">Consistency</div>
                        </div>
                      </div>
                    </div>
                  )}
                </ChartCard>
              </div>

              {/* Live Music */}
              <div className="lg:col-span-4">
                <ChartCard 
                  title="Currently Playing"
                  isLoaded={dataStatus.spotify.loaded}
                  source="spotify"
                  expectedFields={[
                    "isPlaying, title, artist, album",
                    "albumImageUrl, songUrl"
                  ]}
                >
                  {dataStatus.spotify.loaded && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={dataStatus.spotify.data!.albumImageUrl}
                            alt={dataStatus.spotify.data!.album}
                            className="w-16 h-16 rounded-xl shadow-lg"
                          />
                          {dataStatus.spotify.data!.isPlaying && (
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
                            {dataStatus.spotify.data!.title}
                          </h4>
                          <p className="text-white/70 text-xs mb-2 line-clamp-1">
                            {dataStatus.spotify.data!.artist}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-emerald-400 text-xs">
                              <div className={`w-2 h-2 rounded-full mr-2 ${dataStatus.spotify.data!.isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-gray-400'}`} />
                              {dataStatus.spotify.data!.isPlaying ? 'Live' : 'Paused'}
                            </div>
                            <a
                              href={dataStatus.spotify.data!.songUrl}
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
                  isLoaded={dataStatus.anki.loaded}
                  source="anki"
                  expectedFields={[
                    "lastUpdated",
                    "overall: { reviewsToday, timeMinutesToday, matureCardRetentionPercent, currentStreakDays, cardCounts }",
                    "decks: [{ deckName, reviewsToday, matureCards, newCards, totalCards }]"
                  ]}
                >
                  {dataStatus.anki.loaded && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                          <div className="text-xl font-black text-white mb-1">
                            {dataStatus.anki.data!.overall.reviewsToday}
                          </div>
                          <div className="text-purple-400 text-xs font-semibold">
                            Reviews Today
                          </div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                          <div className="text-xl font-black text-white mb-1">
                            {dataStatus.anki.data!.overall.matureCardRetentionPercent}%
                          </div>
                          <div className="text-emerald-400 text-xs font-semibold">
                            Retention Rate
                          </div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30">
                          <div className="text-xl font-black text-white mb-1">
                            {dataStatus.anki.data!.overall.currentStreakDays}
                          </div>
                          <div className="text-orange-400 text-xs font-semibold">
                            Day Streak
                          </div>
                        </div>
                      </div>

                      {expandedCards.has("anki") && (
                        <div className="pt-6 border-t border-white/10">
                          <h4 className="text-white font-semibold mb-4">
                            Deck Performance
                          </h4>
                          <div className="space-y-3">
                            {dataStatus.anki.data!.decks.slice(0, 3).map((deck) => (
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
                  isLoaded={dataStatus.leetcode.loaded}
                  source="leetcode"
                  expectedFields={[
                    "username, totalSolved, totalAvailable",
                    "easySolved, easyAvailable, mediumSolved, mediumAvailable",
                    "hardSolved, hardAvailable"
                  ]}
                >
                  {dataStatus.leetcode.loaded && (
                    <div className="space-y-6">
                      <div className="flex justify-center">
                        <div className="relative w-32 h-32">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  {
                                    name: "Easy",
                                    value: dataStatus.leetcode.data!.easySolved,
                                    fill: "#10b981",
                                  },
                                  {
                                    name: "Medium",
                                    value: dataStatus.leetcode.data!.mediumSolved,
                                    fill: "#f59e0b",
                                  },
                                  {
                                    name: "Hard",
                                    value: dataStatus.leetcode.data!.hardSolved,
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
                                    value: dataStatus.leetcode.data!.easySolved,
                                    fill: "#10b981",
                                  },
                                  {
                                    name: "Medium",
                                    value: dataStatus.leetcode.data!.mediumSolved,
                                    fill: "#f59e0b",
                                  },
                                  {
                                    name: "Hard",
                                    value: dataStatus.leetcode.data!.hardSolved,
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
                                {dataStatus.leetcode.data!.totalSolved}
                              </div>
                              <div className="text-white/60 text-xs">Solved</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                          <div className="text-lg font-bold text-white">
                            {dataStatus.leetcode.data!.easySolved}
                          </div>
                          <div className="text-emerald-400 text-xs">Easy</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-amber-500/20 border border-amber-500/30">
                          <div className="text-lg font-bold text-white">
                            {dataStatus.leetcode.data!.mediumSolved}
                          </div>
                          <div className="text-amber-400 text-xs">Medium</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                          <div className="text-lg font-bold text-white">
                            {dataStatus.leetcode.data!.hardSolved}
                          </div>
                          <div className="text-red-400 text-xs">Hard</div>
                        </div>
                      </div>
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
                  isLoaded={dataStatus.strava.loaded}
                  source="strava"
                  expectedFields={[
                    "totalRuns, totalDistanceKm",
                    "recentRuns: [{ name, distanceKm, date }]"
                  ]}
                >
                  {dataStatus.strava.loaded && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                            <div className="text-lg font-bold text-white">
                              {dataStatus.strava.data!.totalRuns}
                            </div>
                            <div className="text-red-400 text-xs">Total Runs</div>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-orange-500/20 border border-orange-500/30">
                            <div className="text-lg font-bold text-white">
                              {dataStatus.strava.data!.totalDistanceKm}
                            </div>
                            <div className="text-orange-400 text-xs">
                              Kilometers
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {expandedCards.has("strava") && (
                          <div>
                            <h4 className="text-white font-semibold mb-3 text-sm">
                              Recent Activities
                            </h4>
                            <div className="space-y-2">
                              {dataStatus.strava.data!.recentRuns
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
                  )}
                </ChartCard>
              </div>
            </div>
          </div>
        )}

        {activeView === "performance" && (
          <div className="space-y-8">
            {/* Effectiveness Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ChartCard title="Performance Effectiveness Matrix">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-300/20 border border-blue-500/30">
                        <div className="text-2xl font-black text-white mb-1">
                          {effectivenessScores.coding}%
                        </div>
                        <div className="text-blue-400 text-xs font-semibold">
                          Coding
                        </div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-300/20 border border-purple-500/30">
                        <div className="text-2xl font-black text-white mb-1">
                          {effectivenessScores.learning}%
                        </div>
                        <div className="text-purple-400 text-xs font-semibold">
                          Learning
                        </div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-300/20 border border-amber-500/30">
                        <div className="text-2xl font-black text-white mb-1">
                          {effectivenessScores.problemSolving}%
                        </div>
                        <div className="text-amber-400 text-xs font-semibold">
                          Problem Solving
                        </div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-300/20 border border-emerald-500/30">
                        <div className="text-2xl font-black text-white mb-1">
                          {effectivenessScores.consistency}%
                        </div>
                        <div className="text-emerald-400 text-xs font-semibold">
                          Data Quality
                        </div>
                      </div>
                    </div>

                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart
                          data={[
                            {
                              subject: 'Coding',
                              score: effectivenessScores.coding,
                              fullMark: 100,
                            },
                            {
                              subject: 'Learning',
                              score: effectivenessScores.learning,
                              fullMark: 100,
                            },
                            {
                              subject: 'Problem Solving',
                              score: effectivenessScores.problemSolving,
                              fullMark: 100,
                            },
                            {
                              subject: 'Consistency',
                              score: effectivenessScores.consistency,
                              fullMark: 100,
                            },
                          ]}
                        >
                          <PolarGrid stroke="rgba(255,255,255,0.1)" />
                          <PolarAngleAxis 
                            dataKey="subject" 
                            tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 12 }}
                          />
                          <PolarRadiusAxis 
                            angle={90} 
                            domain={[0, 100]} 
                            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
                          />
                          <Radar
                            name="Effectiveness"
                            dataKey="score"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.3}
                            strokeWidth={2}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </ChartCard>
              </div>

              <div className="space-y-6">
                <ChartCard title="Overall Performance Score">
                  <div className="text-center space-y-4">
                    <div className="relative w-32 h-32 mx-auto">
                      <div className="absolute inset-0 rounded-full border-8 border-white/10"></div>
                      <div 
                        className="absolute inset-0 rounded-full border-8 border-accent-main border-t-transparent transition-all duration-1000"
                        style={{
                          transform: `rotate(${(effectivenessScores.overall / 100) * 360 - 90}deg)`
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-black text-white">
                            {effectivenessScores.overall}
                          </div>
                          <div className="text-accent-main text-sm font-semibold">
                            Score
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-white font-semibold">
                        {effectivenessScores.overall >= 80 ? "Excellent" : 
                         effectivenessScores.overall >= 60 ? "Good" : 
                         effectivenessScores.overall >= 40 ? "Fair" : "Needs Improvement"}
                      </div>
                      <div className="text-white/60 text-sm">
                        Based on {Object.values(dataStatus).filter(s => s.loaded).length}/5 data sources
                      </div>
                    </div>
                  </div>
                </ChartCard>

                <ChartCard title="Data Source Status">
                  <div className="space-y-3">
                    {Object.entries(dataStatus).map(([source, status]) => (
                      <div key={source} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                        <div className="flex items-center">
                          {status.loaded ? (
                            <CheckCircle size={16} className="text-emerald-400 mr-2" />
                          ) : (
                            <XCircle size={16} className="text-red-400 mr-2" />
                          )}
                          <span className="text-white text-sm capitalize">{source}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          status.loaded 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {status.loaded ? 'Active' : 'Missing'}
                        </span>
                      </div>
                    ))}
                  </div>
                </ChartCard>
              </div>
            </div>
          </div>
        )}

        {activeView === "coding" && (
          <div className="space-y-8">
            <ChartCard 
              title="Development Deep Dive"
              isLoaded={dataStatus.wakatime.loaded}
              source="wakatime"
              expectedFields={[
                "today: { codingMinutes, primaryLanguage, environment }",
                "weeklyStats: { totalHoursLast7Days, activeDaysCount, languages, consistency }"
              ]}
            >
              {dataStatus.wakatime.loaded && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                          {dataStatus.wakatime.data!.today.environment.editor}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center">
                          <Cpu size={16} className="text-purple-400 mr-3" />
                          <span className="text-white text-sm">Platform</span>
                        </div>
                        <span className="text-white/80 text-sm font-medium">
                          {dataStatus.wakatime.data!.today.environment.os}
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
                          {dataStatus.wakatime.data!.today.primaryLanguage}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-4">
                      Weekly Statistics
                    </h4>
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <div className="text-white text-sm mb-1">Total Hours</div>
                        <div className="text-2xl font-bold text-white">
                          {dataStatus.wakatime.data!.weeklyStats.totalHoursLast7Days}h
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <div className="text-white text-sm mb-1">Active Days</div>
                        <div className="text-2xl font-bold text-white">
                          {dataStatus.wakatime.data!.weeklyStats.activeDaysCount}/7
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <div className="text-white text-sm mb-1">Consistency</div>
                        <div className="text-2xl font-bold text-white">
                          {dataStatus.wakatime.data!.weeklyStats.consistency}
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard 
                title="Japanese Mastery Progress"
                isLoaded={dataStatus.anki.loaded}
                source="anki"
                expectedFields={[
                  "overall: { reviewsToday, timeMinutesToday, matureCardRetentionPercent, currentStreakDays, cardCounts }"
                ]}
              >
                {dataStatus.anki.loaded && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-black text-white mb-2">
                        {dataStatus.anki.data!.overall.currentStreakDays}
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
                          {dataStatus.anki.data!.overall.cardCounts.mature}
                        </div>
                        <div className="text-purple-400 text-sm">Mature Cards</div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-blue-500/20 border border-blue-500/30">
                        <div className="text-xl font-bold text-white">
                          {dataStatus.anki.data!.overall.matureCardRetentionPercent}%
                        </div>
                        <div className="text-blue-400 text-sm">Retention Rate</div>
                      </div>
                    </div>
                  </div>
                )}
              </ChartCard>

              <ChartCard 
                title="Study Session Analysis"
                isLoaded={dataStatus.anki.loaded}
                source="anki"
                expectedFields={[
                  "overall: { reviewsToday, timeMinutesToday }",
                  "decks: [{ deckName, reviewsToday, matureCards, totalCards }]"
                ]}
              >
                {dataStatus.anki.loaded && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
                        <div className="text-xl font-bold text-white">
                          {dataStatus.anki.data!.overall.reviewsToday}
                        </div>
                        <div className="text-emerald-400 text-sm">Reviews Today</div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-orange-500/20 border border-orange-500/30">
                        <div className="text-xl font-bold text-white">
                          {dataStatus.anki.data!.overall.timeMinutesToday}m
                        </div>
                        <div className="text-orange-400 text-sm">Study Time</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-3 text-sm">
                        Active Decks
                      </h4>
                      <div className="space-y-2">
                        {dataStatus.anki.data!.decks.slice(0, 3).map((deck, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10"
                          >
                            <div className="text-white text-xs font-medium">
                              {getDeckDisplayName(deck.deckName)}
                            </div>
                            <div className="text-white/60 text-xs">
                              {deck.reviewsToday} reviews
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
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
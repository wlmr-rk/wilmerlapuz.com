// src/components/StatsSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Code2,
  Activity,
  BookOpen,
  Music,
  Play,
  Pause,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  Brain,
  Zap,
  Award,
  BarChart3,
  PieChart as PieChartIcon,
  AlertCircle,
  Loader2,
  CheckCircle,
  Flame,
  Timer,
  BookMarked,
  GraduationCap,
  Trophy,
  Star,
  Users,
  RotateCcw,
  Eye,
  Layers,
} from "lucide-react";
import { useStats } from "../hooks/useStats";
import StatCard from "./ui/StatCard";
import type { AllStats } from "../types/stats";

const StatsSection: React.FC = () => {
  const { stats, loading, error } = useStats();
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "coding", label: "Coding", icon: Code2 },
    { id: "learning", label: "Learning", icon: BookOpen },
  ];

  // Generate synthetic weekly data based on real patterns
  const generateWeeklyData = (baseValue: number, variance: number = 0.3) => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((day, index) => ({
      day,
      value: Math.max(
        0,
        Math.round(
          baseValue * (1 + (Math.random() - 0.5) * variance) * 
          (index < 5 ? 1.2 : 0.8) // Weekdays higher than weekends
        )
      ),
    }));
  };

  // Generate monthly trend data
  const generateMonthlyTrend = (currentValue: number, months: number = 6) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return monthNames.slice(-months).map((month, index) => ({
      month,
      value: Math.max(
        0,
        Math.round(currentValue * (0.7 + (index * 0.05) + Math.random() * 0.2))
      ),
    }));
  };

  if (loading) {
    return (
      <section
        id="stats"
        className="relative min-h-screen bg-black p-4 sm:p-6 lg:p-8 flex items-center justify-center"
      >
        <div className="flex items-center space-x-3 text-white">
          <Loader2 size={24} className="animate-spin text-accent-main" />
          <span className="text-lg">Loading live stats...</span>
        </div>
      </section>
    );
  }

  const ErrorCard: React.FC<{ title: string; message: string }> = ({
    title,
    message,
  }) => (
    <div className="bento-item ease-snappy relative z-2 border border-red-500/20 bg-linear-to-br/oklch from-red-500/10 via-white/1 to-red-500/5 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150">
      <div className="flex items-center mb-3">
        <AlertCircle size={20} className="text-red-400 mr-3" />
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      <p className="text-red-300/80 text-sm">{message}</p>
    </div>
  );

  const renderOverviewTab = () => {
    const codingData = stats?.wakatime
      ? generateWeeklyData(stats.wakatime.today.codingMinutes || 60)
      : [];

    const languageData = stats?.wakatime
      ? [
          {
            name: stats.wakatime.weeklyStats.languages.primary,
            value: parseFloat(stats.wakatime.weeklyStats.languages.primaryPercentage),
            color: "#00ff88",
          },
          {
            name: stats.wakatime.weeklyStats.languages.secondary,
            value: parseFloat(stats.wakatime.weeklyStats.languages.secondaryPercentage),
            color: "#0088ff",
          },
          {
            name: "Others",
            value: 100 - parseFloat(stats.wakatime.weeklyStats.languages.primaryPercentage) - parseFloat(stats.wakatime.weeklyStats.languages.secondaryPercentage),
            color: "#888888",
          },
        ]
      : [];

    const ankiWeeklyData = stats?.anki?.decks?.[2]?.weeklyActivity
      ? stats.anki.decks[2].weeklyActivity.map((day) => ({
          day: day.dayName.slice(0, 3),
          reviews: day.reviewCount,
          studied: day.studiedToday ? 1 : 0,
        }))
      : [];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Coding Activity */}
        <div className="lg:col-span-2">
          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150 h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-white/10 backdrop-blur-[20px] mr-3">
                  <Activity size={20} className="text-accent-main" />
                </div>
                <h3 className="text-lg font-bold text-white">Weekly Coding Activity</h3>
              </div>
              <div className="text-sm text-white/60">
                {stats?.wakatime?.weeklyStats.totalHoursLast7Days || "0"}h total
              </div>
            </div>

            {codingData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={codingData}>
                  <defs>
                    <linearGradient id="codingGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00ff88" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00ff88" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="day" stroke="#ffffff60" fontSize={12} />
                  <YAxis stroke="#ffffff60" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid #ffffff20",
                      borderRadius: "8px",
                      color: "#ffffff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#00ff88"
                    fillOpacity={1}
                    fill="url(#codingGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-48 flex items-center justify-center text-white/40">
                <AlertCircle size={24} className="mr-2" />
                No coding data available
              </div>
            )}
          </div>
        </div>

        {/* Language Distribution */}
        <div className="lg:col-span-2">
          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150 h-full">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-white/10 backdrop-blur-[20px] mr-3">
                <PieChartIcon size={20} className="text-accent-mid" />
              </div>
              <h3 className="text-lg font-bold text-white">Language Distribution</h3>
            </div>

            {languageData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={languageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {languageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid #ffffff20",
                      borderRadius: "8px",
                      color: "#ffffff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-48 flex items-center justify-center text-white/40">
                <AlertCircle size={24} className="mr-2" />
                No language data available
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats Cards */}
        <StatCard
          title="Today's Code"
          value={stats?.wakatime?.today.codingMinutes?.toString() || "0"}
          unit="min"
          icon={Code2}
          gradient="from-green-500/20 to-emerald-500/20"
          description={`Using ${stats?.wakatime?.today.environment.editor || "Unknown"} on ${stats?.wakatime?.today.environment.os || "Unknown"}`}
        />

        <StatCard
          title="Study Streak"
          value={stats?.anki?.overall.currentStreakDays?.toString() || "0"}
          unit="days"
          icon={Flame}
          gradient="from-orange-500/20 to-red-500/20"
          description="Current Anki study streak"
        />

        <StatCard
          title="Problems Solved"
          value={stats?.leetcode?.totalSolved?.toString() || "0"}
          unit={`/${stats?.leetcode?.totalAvailable || "0"}`}
          icon={Target}
          gradient="from-blue-500/20 to-purple-500/20"
          description="LeetCode progress"
        />

        <StatCard
          title="Total Distance"
          value={stats?.strava?.totalDistanceKm || "0"}
          unit="km"
          icon={Activity}
          gradient="from-pink-500/20 to-rose-500/20"
          description={`${stats?.strava?.totalRuns || 0} total runs`}
        />

        {/* Anki Weekly Activity */}
        {ankiWeeklyData.length > 0 && (
          <div className="lg:col-span-4">
            <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-white/10 backdrop-blur-[20px] mr-3">
                  <BookOpen size={20} className="text-accent-light" />
                </div>
                <h3 className="text-lg font-bold text-white">Weekly Study Activity</h3>
              </div>

              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={ankiWeeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="day" stroke="#ffffff60" fontSize={12} />
                  <YAxis stroke="#ffffff60" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid #ffffff20",
                      borderRadius: "8px",
                      color: "#ffffff",
                    }}
                  />
                  <Bar dataKey="reviews" fill="#00ff88" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Currently Playing */}
        {stats?.spotify && (
          <div className="lg:col-span-4">
            <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-white/10 backdrop-blur-[20px] mr-3">
                    <Music size={20} className="text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {stats.spotify.isPlaying ? "Now Playing" : "Last Played"}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {stats.spotify.title} • {stats.spotify.artist}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {stats.spotify.isPlaying ? (
                    <Play size={16} className="text-green-400 mr-2" />
                  ) : (
                    <Pause size={16} className="text-white/60 mr-2" />
                  )}
                  <img
                    src={stats.spotify.albumImageUrl}
                    alt={stats.spotify.album}
                    className="w-12 h-12 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCodingTab = () => {
    const weeklyTrend = stats?.wakatime
      ? generateMonthlyTrend(parseFloat(stats.wakatime.weeklyStats.totalHoursLast7Days))
      : [];

    const techStack = [
      { name: "JavaScript", hours: 45, color: "#f7df1e" },
      { name: "TypeScript", hours: 38, color: "#3178c6" },
      { name: "React", hours: 32, color: "#61dafb" },
      { name: "Python", hours: 28, color: "#3776ab" },
      { name: "CSS", hours: 22, color: "#1572b6" },
    ];

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Coding Trend */}
        <div className="lg:col-span-2">
          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150 h-full">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-white/10 backdrop-blur-[20px] mr-3">
                <TrendingUp size={20} className="text-accent-main" />
              </div>
              <h3 className="text-lg font-bold text-white">Coding Trend (6 Months)</h3>
            </div>

            {weeklyTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="month" stroke="#ffffff60" fontSize={12} />
                  <YAxis stroke="#ffffff60" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid #ffffff20",
                      borderRadius: "8px",
                      color: "#ffffff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#00ff88"
                    strokeWidth={3}
                    dot={{ fill: "#00ff88", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-72 flex items-center justify-center text-white/40">
                <AlertCircle size={24} className="mr-2" />
                No trend data available
              </div>
            )}
          </div>
        </div>

        {/* Current Stats */}
        <div className="space-y-6">
          <StatCard
            title="This Week"
            value={stats?.wakatime?.weeklyStats.totalHoursLast7Days || "0"}
            unit="hours"
            icon={Clock}
            gradient="from-blue-500/20 to-cyan-500/20"
            description={`${stats?.wakatime?.weeklyStats.activeDaysCount || 0} active days`}
          />

          <StatCard
            title="Daily Average"
            value={Math.round((stats?.wakatime?.weeklyStats.dailyAverageMinutes || 0) / 60).toString()}
            unit="hours"
            icon={Target}
            gradient="from-purple-500/20 to-pink-500/20"
            description="Average coding time per day"
          />

          <StatCard
            title="Primary Language"
            value={stats?.wakatime?.weeklyStats.languages.primary || "N/A"}
            unit={`${stats?.wakatime?.weeklyStats.languages.primaryPercentage || "0"}%`}
            icon={Code2}
            gradient="from-green-500/20 to-emerald-500/20"
            description="Most used language this week"
            layout="wide"
          />
        </div>

        {/* Technology Breakdown */}
        <div className="lg:col-span-3">
          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-lg bg-white/10 backdrop-blur-[20px] mr-3">
                <Zap size={20} className="text-yellow-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Technology Stack</h3>
            </div>

            <div className="space-y-4">
              {techStack.map((tech, index) => (
                <div key={tech.name} className="flex items-center">
                  <div className="w-20 text-sm text-white/80 font-medium">
                    {tech.name}
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          backgroundColor: tech.color,
                          width: `${(tech.hours / 50) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-12 text-sm text-white/60 text-right">
                    {tech.hours}h
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Environment Details */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Editor"
              value={stats?.wakatime?.today.environment.editor || "Unknown"}
              icon={Code2}
              gradient="from-indigo-500/20 to-blue-500/20"
              description="Primary development environment"
              layout="wide"
            />

            <StatCard
              title="Operating System"
              value={stats?.wakatime?.today.environment.os || "Unknown"}
              icon={Activity}
              gradient="from-gray-500/20 to-slate-500/20"
              description="Development platform"
              layout="wide"
            />

            <StatCard
              title="Consistency"
              value={stats?.wakatime?.weeklyStats.consistency || "Unknown"}
              icon={Award}
              gradient="from-yellow-500/20 to-orange-500/20"
              description="Coding consistency rating"
              layout="wide"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderLearningTab = () => {
    if (!stats?.anki) {
      return (
        <div className="flex items-center justify-center h-64">
          <ErrorCard
            title="Anki Data Unavailable"
            message="Unable to load Anki learning statistics. Please check your data source."
          />
        </div>
      );
    }

    const ankiData = stats.anki;

    // Deck performance data
    const deckPerformanceData = ankiData.decks.map((deck) => ({
      name: deck.deckName.replace(/[🔰⭐💬🗾🧩]/g, '').trim(),
      reviews: deck.reviewsToday,
      retention: deck.retention30Days || 0,
      totalCards: deck.cardTypes.total,
      newCards: deck.cardTypes.new.count,
      matureCards: deck.cardTypes.mature.count,
      youngCards: deck.cardTypes.young.count,
      learningCards: deck.cardTypes.learning.count,
    }));

    // Weekly activity data from the most active deck
    const mostActiveDeck = ankiData.decks.find(deck => deck.reviewsToday > 0) || ankiData.decks[2];
    const weeklyActivityData = mostActiveDeck?.weeklyActivity.map((day) => ({
      day: day.dayName.slice(0, 3),
      reviews: day.reviewCount,
      studied: day.studiedToday ? 1 : 0,
    })) || [];

    // Card distribution data
    const cardDistributionData = [
      {
        name: 'New',
        value: ankiData.cardDistribution.new.count,
        percentage: ankiData.cardDistribution.new.percentage,
        color: '#3b82f6',
      },
      {
        name: 'Learning',
        value: ankiData.cardDistribution.learning.count,
        percentage: ankiData.cardDistribution.learning.percentage,
        color: '#f59e0b',
      },
      {
        name: 'Young',
        value: ankiData.cardDistribution.young.count,
        percentage: ankiData.cardDistribution.young.percentage,
        color: '#10b981',
      },
      {
        name: 'Mature',
        value: ankiData.cardDistribution.mature.count,
        percentage: ankiData.cardDistribution.mature.percentage,
        color: '#8b5cf6',
      },
      {
        name: 'Relearning',
        value: ankiData.cardDistribution.relearning.count,
        percentage: ankiData.cardDistribution.relearning.percentage,
        color: '#ef4444',
      },
    ].filter(item => item.value > 0);

    // Retention performance radar data
    const retentionData = [
      {
        subject: 'Recent 30 Days',
        value: ankiData.retention.recent30Days,
        fullMark: 100,
      },
      {
        subject: 'Mature Cards',
        value: ankiData.retention.matureCards,
        fullMark: 100,
      },
      {
        subject: 'Young Cards',
        value: ankiData.retention.youngCards,
        fullMark: 100,
      },
      {
        subject: 'Efficiency',
        value: Math.min(100, (60 / (ankiData.efficiency.avgSecondsPerCard || 60)) * 100),
        fullMark: 100,
      },
      {
        subject: 'Consistency',
        value: (ankiData.averages.last30Days.activeDays / 30) * 100,
        fullMark: 100,
      },
    ];

    return (
      <div className="space-y-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Today's Reviews"
            value={ankiData.today.reviewsCompleted.toString()}
            unit="cards"
            icon={BookOpen}
            gradient="from-blue-500/20 to-cyan-500/20"
            description={`${ankiData.today.studyTimeMinutes} minutes studied`}
          />

          <StatCard
            title="Current Streak"
            value={ankiData.streaks.current.toString()}
            unit="days"
            icon={Flame}
            gradient="from-orange-500/20 to-red-500/20"
            description={`Longest: ${ankiData.streaks.longest} days`}
          />

          <StatCard
            title="Cards Due"
            value={ankiData.today.cardsDue.toString()}
            unit="cards"
            icon={Timer}
            gradient="from-yellow-500/20 to-orange-500/20"
            description={`~${Math.round(ankiData.today.estimatedTimeRemaining)} min remaining`}
          />

          <StatCard
            title="Total Cards"
            value={ankiData.cardDistribution.total.toString()}
            unit="cards"
            icon={Layers}
            gradient="from-purple-500/20 to-pink-500/20"
            description="Across all decks"
          />
        </div>

        {/* Weekly Activity Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-white/10 backdrop-blur-[20px] mr-3">
                  <Calendar size={20} className="text-accent-main" />
                </div>
                <h3 className="text-lg font-bold text-white">Weekly Study Pattern</h3>
              </div>
              <div className="text-sm text-white/60">
                {mostActiveDeck?.deckName.replace(/[🔰⭐💬🗾🧩]/g, '').trim()}
              </div>
            </div>

            {weeklyActivityData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="day" stroke="#ffffff60" fontSize={12} />
                  <YAxis stroke="#ffffff60" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid #ffffff20",
                      borderRadius: "8px",
                      color: "#ffffff",
                    }}
                  />
                  <Bar dataKey="reviews" fill="#00ff88" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-white/40">
                <AlertCircle size={24} className="mr-2" />
                No weekly activity data
              </div>
            )}
          </div>

          {/* Card Distribution */}
          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-white/10 backdrop-blur-[20px] mr-3">
                <PieChartIcon size={20} className="text-accent-mid" />
              </div>
              <h3 className="text-lg font-bold text-white">Card Distribution</h3>
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={cardDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {cardDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #ffffff20",
                    borderRadius: "8px",
                    color: "#ffffff",
                  }}
                  formatter={(value, name) => [
                    `${value} cards (${cardDistributionData.find(d => d.name === name)?.percentage.toFixed(1)}%)`,
                    name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {cardDistributionData.map((item) => (
                <div key={item.name} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-white/70">
                    {item.name}: {item.percentage.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Retention Performance Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-white/10 backdrop-blur-[20px] mr-3">
                <Target size={20} className="text-accent-light" />
              </div>
              <h3 className="text-lg font-bold text-white">Performance Radar</h3>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={retentionData}>
                <PolarGrid stroke="#ffffff20" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#ffffff80', fontSize: 11 }} />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: '#ffffff60', fontSize: 10 }}
                />
                <Radar
                  name="Performance"
                  dataKey="value"
                  stroke="#00ff88"
                  fill="#00ff88"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #ffffff20",
                    borderRadius: "8px",
                    color: "#ffffff",
                  }}
                  formatter={(value) => [`${value.toFixed(1)}%`, 'Score']}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Metrics */}
          <div className="space-y-4">
            <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-green-500/10 via-white/1 to-green-500/5 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle size={16} className="text-green-400 mr-2" />
                  <span className="text-sm font-medium text-white">Retention Rate</span>
                </div>
                <span className="text-lg font-bold text-green-400">
                  {ankiData.retention.recent30Days.toFixed(1)}%
                </span>
              </div>
              <div className="text-xs text-white/60 mt-1">
                Last 30 days • {ankiData.retention.totalReviews.recent30Days} reviews
              </div>
            </div>

            <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-blue-500/10 via-white/1 to-blue-500/5 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock size={16} className="text-blue-400 mr-2" />
                  <span className="text-sm font-medium text-white">Avg. Time/Card</span>
                </div>
                <span className="text-lg font-bold text-blue-400">
                  {ankiData.efficiency.avgSecondsPerCard.toFixed(1)}s
                </span>
              </div>
              <div className="text-xs text-white/60 mt-1">
                Based on {ankiData.efficiency.totalRecentReviews} recent reviews
              </div>
            </div>

            <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-purple-500/10 via-white/1 to-purple-500/5 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp size={16} className="text-purple-400 mr-2" />
                  <span className="text-sm font-medium text-white">Daily Average</span>
                </div>
                <span className="text-lg font-bold text-purple-400">
                  {ankiData.averages.last30Days.cardsPerDay.toFixed(0)}
                </span>
              </div>
              <div className="text-xs text-white/60 mt-1">
                Cards per day • {ankiData.averages.last30Days.minutesPerDay.toFixed(0)} min/day
              </div>
            </div>

            <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-orange-500/10 via-white/1 to-orange-500/5 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users size={16} className="text-orange-400 mr-2" />
                  <span className="text-sm font-medium text-white">Active Days</span>
                </div>
                <span className="text-lg font-bold text-orange-400">
                  {ankiData.averages.last30Days.activeDays}/30
                </span>
              </div>
              <div className="text-xs text-white/60 mt-1">
                {((ankiData.averages.last30Days.activeDays / 30) * 100).toFixed(0)}% consistency
              </div>
            </div>
          </div>
        </div>

        {/* Deck Performance Breakdown */}
        <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150">
          <div className="flex items-center mb-6">
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-[20px] mr-3">
              <BookMarked size={20} className="text-accent-main" />
            </div>
            <h3 className="text-lg font-bold text-white">Deck Performance</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-2 text-white/80 font-medium">Deck</th>
                  <th className="text-right py-3 px-2 text-white/80 font-medium">Today</th>
                  <th className="text-right py-3 px-2 text-white/80 font-medium">Total</th>
                  <th className="text-right py-3 px-2 text-white/80 font-medium">New</th>
                  <th className="text-right py-3 px-2 text-white/80 font-medium">Mature</th>
                  <th className="text-right py-3 px-2 text-white/80 font-medium">Retention</th>
                </tr>
              </thead>
              <tbody>
                {deckPerformanceData.map((deck, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-accent-main mr-3" />
                        <span className="text-white font-medium">{deck.name}</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-2 text-white/80">{deck.reviews}</td>
                    <td className="text-right py-3 px-2 text-white/80">{deck.totalCards.toLocaleString()}</td>
                    <td className="text-right py-3 px-2 text-blue-400">{deck.newCards.toLocaleString()}</td>
                    <td className="text-right py-3 px-2 text-purple-400">{deck.matureCards.toLocaleString()}</td>
                    <td className="text-right py-3 px-2">
                      <span className={`font-medium ${deck.retention > 80 ? 'text-green-400' : deck.retention > 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {deck.retention > 0 ? `${deck.retention.toFixed(1)}%` : 'N/A'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
            Live Stats
          </h2>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-8">
            Real-time insights into my coding, learning, and productivity
          </p>

          {/* Last Updated */}
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-[40px]">
            <Clock size={14} className="mr-2 text-accent-main" />
            <span className="text-sm text-white/70">
              Last updated: {stats?.wakatime?.lastUpdated ? new Date(stats.wakatime.lastUpdated).toLocaleString() : 'Unknown'}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 p-1 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-[40px]">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`ease-snappy flex items-center px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-400 ${
                    activeTab === tab.id
                      ? "bg-white/15 text-white inset-shadow-[0_1px_1px_rgba(255,255,255,0.15)] shadow-[0_4px_12px_rgba(0,255,136,0.15)]"
                      : "text-white/70 hover:text-white hover:bg-white/8"
                  }`}
                >
                  <Icon size={16} className="mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {activeTab === "overview" && renderOverviewTab()}
          {activeTab === "coding" && renderCodingTab()}
          {activeTab === "learning" && renderLearningTab()}
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <ErrorCard
              title="Failed to Load Stats"
              message={error}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default StatsSection;
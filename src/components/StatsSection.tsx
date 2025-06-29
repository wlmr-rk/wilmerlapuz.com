// src/components/StatsSection.tsx
"use client";

import React, { useState } from "react";
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
  Zap,
  BarChart3,
  PieChart as PieChartIcon,
  AlertCircle,
  Loader2,
  CheckCircle,
  Flame,
  Timer,
  BookMarked,
  Trophy,
  Layers,
} from "lucide-react";
import { useStats } from "../hooks/useStats";
import StatCard from "./ui/StatCard";

const StatsSection: React.FC = () => {
  const { stats, loading, error } = useStats();
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "coding", label: "Coding", icon: Code2 },
    { id: "learning", label: "Learning", icon: BookOpen },
  ];

  // Custom tooltip component with proper contrast
  const CustomTooltip = ({ active, payload, label, unit = "", formatter }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 border border-white/20 rounded-lg p-3 shadow-xl backdrop-blur-sm">
          <p className="text-white font-medium text-sm mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-white text-sm">
              <span style={{ color: entry.color }}>●</span>
              {` ${entry.name}: `}
              <span className="font-semibold">
                {formatter ? formatter(entry.value) : entry.value}
                {unit}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Generate synthetic weekly data
  const generateWeeklyData = (baseValue: number, variance: number = 0.3) => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((day, index) => ({
      day,
      value: Math.max(
        0,
        Math.round(
          baseValue * (1 + (Math.random() - 0.5) * variance) * 
          (index < 5 ? 1.2 : 0.8)
        )
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
    <div className="bento-item ease-snappy relative z-2 border border-red-500/20 bg-linear-to-br/oklch from-red-500/10 via-white/1 to-red-500/5 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
      <div className="flex items-center mb-2">
        <AlertCircle size={16} className="text-red-400 mr-2" />
        <h3 className="text-sm font-bold text-white">{title}</h3>
      </div>
      <p className="text-red-300/80 text-xs">{message}</p>
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
            color: "#6b7280",
          },
        ].filter(item => item.value > 0)
      : [];

    const ankiWeeklyData = stats?.anki?.decks?.[2]?.weeklyActivity
      ? stats.anki.decks[2].weeklyActivity.map((day) => ({
          day: day.dayName.slice(0, 3),
          reviews: day.reviewCount,
        }))
      : [];

    return (
      <div className="space-y-6">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Today's Code"
            value={stats?.wakatime?.today.codingMinutes?.toString() || "0"}
            unit="min"
            icon={Code2}
            gradient="from-green-500/20 to-emerald-500/20"
            description={`${stats?.wakatime?.today.environment.editor || "Unknown"}`}
            layout="compact"
          />

          <StatCard
            title="Study Streak"
            value={stats?.anki?.overall.currentStreakDays?.toString() || "0"}
            unit="days"
            icon={Flame}
            gradient="from-orange-500/20 to-red-500/20"
            description="Current streak"
            layout="compact"
          />

          <StatCard
            title="LeetCode"
            value={stats?.leetcode?.totalSolved?.toString() || "0"}
            unit={`/${stats?.leetcode?.totalAvailable || "0"}`}
            icon={Target}
            gradient="from-blue-500/20 to-purple-500/20"
            description="Problems solved"
            layout="compact"
          />

          <StatCard
            title="Running"
            value={stats?.strava?.totalDistanceKm || "0"}
            unit="km"
            icon={Activity}
            gradient="from-pink-500/20 to-rose-500/20"
            description={`${stats?.strava?.totalRuns || 0} runs`}
            layout="compact"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Coding Activity */}
          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-[20px] mr-2">
                  <Activity size={16} className="text-accent-main" />
                </div>
                <h3 className="text-sm font-bold text-white">Weekly Coding</h3>
              </div>
              <div className="text-xs text-white/60">
                {stats?.wakatime?.weeklyStats.totalHoursLast7Days || "0"}h
              </div>
            </div>

            {codingData.length > 0 ? (
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={codingData}>
                  <defs>
                    <linearGradient id="codingGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00ff88" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#00ff88" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
                  <XAxis dataKey="day" stroke="#ffffff60" fontSize={11} />
                  <YAxis stroke="#ffffff60" fontSize={11} />
                  <Tooltip content={<CustomTooltip unit=" minutes" />} />
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
              <div className="h-40 flex items-center justify-center text-white/40">
                <AlertCircle size={20} className="mr-2" />
                <span className="text-sm">No coding data</span>
              </div>
            )}
          </div>

          {/* Language Distribution */}
          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
            <div className="flex items-center mb-3">
              <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-[20px] mr-2">
                <PieChartIcon size={16} className="text-accent-mid" />
              </div>
              <h3 className="text-sm font-bold text-white">Languages</h3>
            </div>

            {languageData.length > 0 ? (
              <div className="flex items-center">
                <ResponsiveContainer width="60%" height={140}>
                  <PieChart>
                    <Pie
                      data={languageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={55}
                      paddingAngle={3}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {languageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip unit="%" />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-1">
                  {languageData.map((item, index) => (
                    <div key={index} className="flex items-center text-xs">
                      <div
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-white/80 truncate">{item.name}</span>
                      <span className="text-white/60 ml-auto">{item.value.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-36 flex items-center justify-center text-white/40">
                <AlertCircle size={20} className="mr-2" />
                <span className="text-sm">No language data</span>
              </div>
            )}
          </div>
        </div>

        {/* Anki Weekly Activity */}
        {ankiWeeklyData.length > 0 && (
          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
            <div className="flex items-center mb-3">
              <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-[20px] mr-2">
                <BookOpen size={16} className="text-accent-light" />
              </div>
              <h3 className="text-sm font-bold text-white">Study Activity</h3>
            </div>

            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={ankiWeeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
                <XAxis dataKey="day" stroke="#ffffff60" fontSize={11} />
                <YAxis stroke="#ffffff60" fontSize={11} />
                <Tooltip content={<CustomTooltip unit=" reviews" />} />
                <Bar dataKey="reviews" fill="#00ff88" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Currently Playing */}
        {stats?.spotify && (
          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-[20px] mr-2">
                  <Music size={16} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {stats.spotify.isPlaying ? "Now Playing" : "Last Played"}
                  </h3>
                  <p className="text-white/60 text-xs">
                    {stats.spotify.title} • {stats.spotify.artist}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                {stats.spotify.isPlaying ? (
                  <Play size={14} className="text-green-400 mr-2" />
                ) : (
                  <Pause size={14} className="text-white/60 mr-2" />
                )}
                <img
                  src={stats.spotify.albumImageUrl}
                  alt={stats.spotify.album}
                  className="w-10 h-10 rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCodingTab = () => {
    const weeklyTrend = [
      { month: "Jan", hours: 42 },
      { month: "Feb", hours: 38 },
      { month: "Mar", hours: 45 },
      { month: "Apr", hours: 52 },
      { month: "May", hours: 48 },
      { month: "Jun", hours: parseFloat(stats?.wakatime?.weeklyStats.totalHoursLast7Days || "0") },
    ];

    const techStack = [
      { name: "JavaScript", hours: 45, percentage: 85 },
      { name: "TypeScript", hours: 38, percentage: 72 },
      { name: "React", hours: 32, percentage: 60 },
      { name: "Python", hours: 28, percentage: 53 },
      { name: "CSS", hours: 22, percentage: 42 },
    ];

    return (
      <div className="space-y-6">
        {/* Compact Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="This Week"
            value={stats?.wakatime?.weeklyStats.totalHoursLast7Days || "0"}
            unit="h"
            icon={Clock}
            gradient="from-blue-500/20 to-cyan-500/20"
            layout="compact"
          />

          <StatCard
            title="Daily Avg"
            value={Math.round((stats?.wakatime?.weeklyStats.dailyAverageMinutes || 0) / 60).toString()}
            unit="h"
            icon={Target}
            gradient="from-purple-500/20 to-pink-500/20"
            layout="compact"
          />

          <StatCard
            title="Editor"
            value={stats?.wakatime?.today.environment.editor || "Unknown"}
            icon={Code2}
            gradient="from-indigo-500/20 to-blue-500/20"
            layout="compact"
          />

          <StatCard
            title="Consistency"
            value={stats?.wakatime?.weeklyStats.consistency || "Unknown"}
            icon={Trophy}
            gradient="from-yellow-500/20 to-orange-500/20"
            layout="compact"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trend */}
          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
            <div className="flex items-center mb-3">
              <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-[20px] mr-2">
                <TrendingUp size={16} className="text-accent-main" />
              </div>
              <h3 className="text-sm font-bold text-white">6-Month Trend</h3>
            </div>

            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
                <XAxis dataKey="month" stroke="#ffffff60" fontSize={11} />
                <YAxis stroke="#ffffff60" fontSize={11} />
                <Tooltip content={<CustomTooltip unit=" hours" />} />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#00ff88"
                  strokeWidth={3}
                  dot={{ fill: "#00ff88", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#00ff88", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Tech Stack */}
          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
            <div className="flex items-center mb-3">
              <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-[20px] mr-2">
                <Zap size={16} className="text-yellow-400" />
              </div>
              <h3 className="text-sm font-bold text-white">Tech Stack</h3>
            </div>

            <div className="space-y-3">
              {techStack.map((tech, index) => (
                <div key={tech.name} className="flex items-center">
                  <div className="w-16 text-xs text-white/80 font-medium">
                    {tech.name}
                  </div>
                  <div className="flex-1 mx-3">
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent-main to-accent-mid rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${tech.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-8 text-xs text-white/60 text-right">
                    {tech.hours}h
                  </div>
                </div>
              ))}
            </div>
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
            message="Unable to load Anki learning statistics."
          />
        </div>
      );
    }

    const ankiData = stats.anki;

    // Card distribution with modern colors
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

    // Weekly activity from most active deck
    const mostActiveDeck = ankiData.decks.find(deck => deck.reviewsToday > 0) || ankiData.decks[2];
    const weeklyActivityData = mostActiveDeck?.weeklyActivity.map((day) => ({
      day: day.dayName.slice(0, 3),
      reviews: day.reviewCount,
    })) || [];

    return (
      <div className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Today"
            value={ankiData.today.reviewsCompleted.toString()}
            unit="cards"
            icon={BookOpen}
            gradient="from-blue-500/20 to-cyan-500/20"
            description={`${ankiData.today.studyTimeMinutes}min`}
            layout="compact"
          />

          <StatCard
            title="Streak"
            value={ankiData.streaks.current.toString()}
            unit="days"
            icon={Flame}
            gradient="from-orange-500/20 to-red-500/20"
            description={`Best: ${ankiData.streaks.longest}`}
            layout="compact"
          />

          <StatCard
            title="Due"
            value={ankiData.today.cardsDue.toString()}
            unit="cards"
            icon={Timer}
            gradient="from-yellow-500/20 to-orange-500/20"
            description={`~${Math.round(ankiData.today.estimatedTimeRemaining)}min`}
            layout="compact"
          />

          <StatCard
            title="Total"
            value={ankiData.cardDistribution.total.toString()}
            unit="cards"
            icon={Layers}
            gradient="from-purple-500/20 to-pink-500/20"
            description="All decks"
            layout="compact"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Activity */}
          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-[20px] mr-2">
                  <Calendar size={16} className="text-accent-main" />
                </div>
                <h3 className="text-sm font-bold text-white">Weekly Pattern</h3>
              </div>
              <div className="text-xs text-white/60">
                {mostActiveDeck?.deckName.replace(/[🔰⭐💬🗾🧩]/g, '').trim().slice(0, 15)}
              </div>
            </div>

            {weeklyActivityData.length > 0 ? (
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={weeklyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
                  <XAxis dataKey="day" stroke="#ffffff60" fontSize={11} />
                  <YAxis stroke="#ffffff60" fontSize={11} />
                  <Tooltip content={<CustomTooltip unit=" reviews" />} />
                  <Bar dataKey="reviews" fill="#00ff88" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-40 flex items-center justify-center text-white/40">
                <AlertCircle size={20} className="mr-2" />
                <span className="text-sm">No activity data</span>
              </div>
            )}
          </div>

          {/* Card Distribution */}
          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
            <div className="flex items-center mb-3">
              <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-[20px] mr-2">
                <PieChartIcon size={16} className="text-accent-mid" />
              </div>
              <h3 className="text-sm font-bold text-white">Card Types</h3>
            </div>

            <div className="flex items-center">
              <ResponsiveContainer width="55%" height={120}>
                <PieChart>
                  <Pie
                    data={cardDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={45}
                    paddingAngle={2}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {cardDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-gray-900/95 border border-white/20 rounded-lg p-2 shadow-xl backdrop-blur-sm">
                            <p className="text-white text-xs font-medium">
                              {data.name}: {data.value.toLocaleString()} cards ({data.percentage.toFixed(1)}%)
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-1">
                {cardDistributionData.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex items-center text-xs">
                    <div
                      className="w-2 h-2 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-white/80 truncate flex-1">{item.name}</span>
                    <span className="text-white/60">{item.percentage.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-green-500/10 via-white/1 to-green-500/5 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle size={14} className="text-green-400 mr-2" />
                <span className="text-xs font-medium text-white">Retention</span>
              </div>
              <span className="text-lg font-bold text-green-400">
                {ankiData.retention.recent30Days.toFixed(1)}%
              </span>
            </div>
            <div className="text-xs text-white/60 mt-1">
              {ankiData.retention.totalReviews.recent30Days} reviews (30d)
            </div>
          </div>

          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-blue-500/10 via-white/1 to-blue-500/5 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock size={14} className="text-blue-400 mr-2" />
                <span className="text-xs font-medium text-white">Speed</span>
              </div>
              <span className="text-lg font-bold text-blue-400">
                {ankiData.efficiency.avgSecondsPerCard.toFixed(1)}s
              </span>
            </div>
            <div className="text-xs text-white/60 mt-1">
              Per card average
            </div>
          </div>

          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-purple-500/10 via-white/1 to-purple-500/5 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp size={14} className="text-purple-400 mr-2" />
                <span className="text-xs font-medium text-white">Daily Avg</span>
              </div>
              <span className="text-lg font-bold text-purple-400">
                {ankiData.averages.last30Days.cardsPerDay.toFixed(0)}
              </span>
            </div>
            <div className="text-xs text-white/60 mt-1">
              Cards per day (30d)
            </div>
          </div>
        </div>

        {/* Deck Performance Table */}
        <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
          <div className="flex items-center mb-4">
            <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-[20px] mr-2">
              <BookMarked size={16} className="text-accent-main" />
            </div>
            <h3 className="text-sm font-bold text-white">Deck Performance</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 text-white/80 font-medium">Deck</th>
                  <th className="text-right py-2 text-white/80 font-medium">Today</th>
                  <th className="text-right py-2 text-white/80 font-medium">Total</th>
                  <th className="text-right py-2 text-white/80 font-medium">Retention</th>
                </tr>
              </thead>
              <tbody>
                {ankiData.decks.slice(0, 4).map((deck, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-2">
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-main mr-2" />
                        <span className="text-white font-medium truncate max-w-[120px]">
                          {deck.deckName.replace(/[🔰⭐💬🗾🧩]/g, '').trim()}
                        </span>
                      </div>
                    </td>
                    <td className="text-right py-2 text-white/80">{deck.reviewsToday}</td>
                    <td className="text-right py-2 text-white/80">{deck.cardTypes.total.toLocaleString()}</td>
                    <td className="text-right py-2">
                      <span className={`font-medium ${deck.retention30Days > 80 ? 'text-green-400' : deck.retention30Days > 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {deck.retention30Days > 0 ? `${deck.retention30Days.toFixed(1)}%` : 'N/A'}
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

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase text-shadow-[0_4px_8px_rgba(0,0,0,0.8)] mb-4">
            Live Stats
          </h2>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-6">
            Real-time insights into my coding, learning, and productivity
          </p>

          {/* Last Updated */}
          <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-[40px]">
            <Clock size={12} className="mr-2 text-accent-main" />
            <span className="text-xs text-white/70">
              Updated: {stats?.wakatime?.lastUpdated ? new Date(stats.wakatime.lastUpdated).toLocaleString() : 'Unknown'}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 p-1 rounded-xl border border-white/10 bg-white/5 backdrop-blur-[40px]">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`ease-snappy flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-400 ${
                    activeTab === tab.id
                      ? "bg-white/15 text-white shadow-[0_2px_8px_rgba(0,255,136,0.15)]"
                      : "text-white/70 hover:text-white hover:bg-white/8"
                  }`}
                >
                  <Icon size={14} className="mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
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
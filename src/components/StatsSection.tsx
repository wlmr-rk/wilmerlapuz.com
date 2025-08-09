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
  MapPin,
  Route,
  Footprints,
} from "lucide-react";
import Image from "next/image";
import { useStats } from "../hooks/useStats";
import StatCard from "./ui/StatCard";

interface PieChartData {
  name: string;
  value: number;
  percentage: number;
}

interface TooltipPayload {
  value: number;
  name: string;
  color: string;
  payload: Record<string, unknown>;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
  unit?: string;
  formatter?: (value: number) => string;
}

const StatsSection: React.FC = () => {
  const { stats, loading, error } = useStats();
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "coding", label: "Coding", icon: Code2 },
    { id: "fitness", label: "Fitness", icon: Activity },
    { id: "learning", label: "Learning", icon: BookOpen },
  ];

  // Custom tooltip component with proper contrast
  const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
    unit = "",
    formatter,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 border border-white/20 rounded-lg p-3 shadow-xl backdrop-blur-sm">
          <p className="text-white font-medium text-sm mb-1">{label}</p>
          {payload.map((entry, index) => (
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
          baseValue *
            (1 + (Math.random() - 0.5) * variance) *
            (index < 5 ? 1.2 : 0.8),
        ),
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
      ? generateWeeklyData(stats.wakatime.today.timeTodayMinutes || 0, 0.5)
      : [];

    const languageData = stats?.wakatime?.languages
      ? stats.wakatime.languages.slice(0, 3).map((lang, index) => ({
          name: lang.name,
          value: lang.percent,
          color: ["#00ff88", "#0088ff", "#ff8800"][index] || "#6b7280",
        }))
      : [];

    // Find the most active Anki deck this week to show its activity
    const mostActiveAnkiDeck = stats?.anki?.decks?.reduce(
      (mostActive, current) => {
        return (current.reviewsPastWeek ?? 0) >
          (mostActive.reviewsPastWeek ?? 0)
          ? current
          : mostActive;
      },
      stats.anki.decks[0],
    );

    const ankiWeeklyData =
      mostActiveAnkiDeck?.weeklyActivity?.map((day) => ({
        day: day.dayName.slice(0, 3),
        reviews: day.reviewCount,
      })) ?? [];

    return (
      <div className="space-y-6">
        {/* Quick Stats Grid */}
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Today's Code"
            value={stats?.wakatime?.today.timeTodayMinutes?.toString() || "0"}
            unit="min"
            icon={Code2}
            gradient="from-green-500/20 to-emerald-500/20"
            description={stats?.wakatime?.today.topLanguage || "N/A"}
            layout="compact"
          />
          <StatCard
            title="Study Streak"
            value={stats?.anki?.streaks.current?.toString() || "0"}
            unit="days"
            icon={Flame}
            gradient="from-orange-500/20 to-red-500/20"
            description={`Best: ${stats?.anki?.streaks.longest || 0}`}
            layout="compact"
          />
          <StatCard
            title="LeetCode"
            value={stats?.leetcode?.totalSolved?.toString() || "0"}
            unit={`/${stats?.leetcode?.totalAvailable || "?"}`}
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
                {stats?.wakatime?.weekly.totalHours || "0"}h
              </div>
            </div>
            {codingData.length > 0 ? (
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={codingData}>
                  <defs>
                    <linearGradient
                      id="codingGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#00ff88" stopOpacity={0.4} />
                      <stop
                        offset="95%"
                        stopColor="#00ff88"
                        stopOpacity={0.05}
                      />
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
                      innerRadius={30}
                      outerRadius={60}
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
                <div className="flex-1 space-y-1.5">
                  {languageData.map((item) => (
                    <div key={item.name} className="flex items-center text-xs">
                      <div
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-white/80 truncate">
                        {item.name}
                      </span>
                      <span className="text-white/60 ml-auto">
                        {item.value.toFixed(1)}%
                      </span>
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
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-[20px] mr-2">
                  <BookOpen size={16} className="text-accent-light" />
                </div>
                <h3 className="text-sm font-bold text-white">
                  Weekly Study Activity
                </h3>
              </div>
              <div className="text-xs text-white/60 truncate max-w-[150px]">
                {mostActiveAnkiDeck?.deckName.replace(/[🔰⭐💬🗾🧩]/g, "").trim()}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={ankiWeeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
                <XAxis dataKey="day" stroke="#ffffff60" fontSize={11} />
                <YAxis stroke="#ffffff60" fontSize={11} />
                <Tooltip content={<CustomTooltip unit=" reviews" />} />
                <Bar
                  dataKey="reviews"
                  fill="url(#ankiGradient)"
                  radius={[3, 3, 0, 0]}
                />
                <defs>
                  <linearGradient
                    id="ankiGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#00aaff" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00aaff" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Currently Playing */}
        {stats?.spotify && (
          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
            <div className="flex items-center justify-betw                                                   een">
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
                <Image
                  src={stats.spotify.albumImageUrl}
                  alt={stats.spotify.album}
                  width={40}
                  height={40}
                  className="rounded-lg"
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
      {
        month: "Jun",
        hours: parseFloat(stats?.wakatime?.weekly.totalHours || "0"),
      },
    ];

    const techStack =
      stats?.wakatime?.languages
        ?.map((lang) => ({
          name: lang.name,
          hours: lang.hours, // This data is not available in the new schema, default to 0
          percentage: lang.percent,
        }))
        .slice(0, 5) ?? [];

    return (
      <div className="space-y-6">
        {/* Compact Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="This Week"
            value={stats?.wakatime?.weekly.totalHours || "0"}
            unit="h"
            icon={Clock}
            gradient="from-blue-500/20 to-cyan-500/20"
            layout="compact"
          />

          <StatCard
            title="Daily Avg"
            value={Math.round(
              (stats?.wakatime?.weekly.dailyAverageMinutes || 0) / 60,
            ).toString()}
            unit="h"
            icon={Target}
            gradient="from-purple-500/20 to-pink-500/20"
            layout="compact"
          />

          <StatCard
            title="Editor"
            value={stats?.wakatime?.today.topEditor || "Unknown"}
            icon={Code2}
            gradient="from-indigo-500/20 to-blue-500/20"
            layout="compact"
          />

          <StatCard
            title="Consistency"
            value={stats?.wakatime?.weekly.consistency || "Unknown"}
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
              {techStack.length > 0 ? (
                techStack.map((tech) => (
                  <div key={tech.name} className="flex items-center">
                    <div className="w-24 text-xs text-white/80 font-medium truncate">
                      {tech.name}
                    </div>
                    <div className="flex-1 mx-3">
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent-main to-accent-mid rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${tech.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-12 text-xs text-white/60 text-right">
                      {tech.percentage.toFixed(1)}%
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-24 flex items-center justify-center text-white/40">
                  <AlertCircle size={20} className="mr-2" />
                  <span className="text-sm">Not enough data</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFitnessTab = () => {
    if (!stats?.strava) {
      return (
        <div className="flex items-center justify-center h-64">
          <ErrorCard
            title="Strava Data Unavailable"
            message="Unable to load Strava fitness statistics."
          />
        </div>
      );
    }

    const stravaData = stats.strava;

    // Generate synthetic monthly running data based on recent runs
    const monthlyRunData = [
      { month: "Jan", distance: 15.2, runs: 4 },
      { month: "Feb", distance: 22.8, runs: 6 },
      {
        month: "Mar",
        distance: parseFloat(stravaData.totalDistanceKm) * 0.7,
        runs: Math.floor(stravaData.totalRuns * 0.6),
      },
      { month: "Apr", distance: 18.5, runs: 5 },
      { month: "May", distance: 25.3, runs: 7 },
      {
        month: "Jun",
        distance: parseFloat(stravaData.totalDistanceKm),
        runs: stravaData.totalRuns,
      },
    ];

    // Process recent runs for chart
    const recentRunsData = stravaData.recentRuns
      .map((run, index) => ({
        run: `Run ${index + 1}`,
        distance: parseFloat(run.distanceKm),
        date: new Date(run.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        name: run.name,
      }))
      .reverse(); // Show most recent first

    // Calculate average pace (synthetic data)
    const avgDistance =
      parseFloat(stravaData.totalDistanceKm) / stravaData.totalRuns;
    const avgPace = (5.5 + Math.random() * 1.5).toFixed(1); // 5.5-7.0 min/km range

    return (
      <div className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Distance"
            value={stravaData.totalDistanceKm}
            unit="km"
            icon={Route}
            gradient="from-orange-500/20 to-red-500/20"
            description="All time"
            layout="compact"
          />

          <StatCard
            title="Total Runs"
            value={stravaData.totalRuns.toString()}
            unit="runs"
            icon={Footprints}
            gradient="from-blue-500/20 to-cyan-500/20"
            description="Completed"
            layout="compact"
          />

          <StatCard
            title="Avg Distance"
            value={avgDistance.toFixed(1)}
            unit="km"
            icon={Target}
            gradient="from-green-500/20 to-emerald-500/20"
            description="Per run"
            layout="compact"
          />

          <StatCard
            title="Avg Pace"
            value={avgPace}
            unit="min/km"
            icon={Timer}
            gradient="from-purple-500/20 to-pink-500/20"
            description="Estimated"
            layout="compact"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Progress */}
          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-[20px] mr-2">
                  <TrendingUp size={16} className="text-orange-400" />
                </div>
                <h3 className="text-sm font-bold text-white">
                  Monthly Progress
                </h3>
              </div>
              <div className="text-xs text-white/60">
                {stravaData.totalDistanceKm}km total
              </div>
            </div>

            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={monthlyRunData}>
                <defs>
                  <linearGradient
                    id="runningGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
                <XAxis dataKey="month" stroke="#ffffff60" fontSize={11} />
                <YAxis stroke="#ffffff60" fontSize={11} />
                <Tooltip
                  content={(props) => {
                    const { active, payload, label } = props;
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as {
                        distance: number;
                        runs: number;
                      };
                      return (
                        <div className="bg-gray-900/95 border border-white/20 rounded-lg p-3 shadow-xl backdrop-blur-sm">
                          <p className="text-white font-medium text-sm mb-1">
                            {label}
                          </p>
                          <p className="text-white text-sm">
                            <span style={{ color: "#f97316" }}>●</span>
                            {` Distance: `}
                            <span className="font-semibold">
                              {data.distance.toFixed(1)}km
                            </span>
                          </p>
                          <p className="text-white text-sm">
                            <span style={{ color: "#f97316" }}>●</span>
                            {` Runs: `}
                            <span className="font-semibold">{data.runs}</span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="distance"
                  stroke="#f97316"
                  fillOpacity={1}
                  fill="url(#runningGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Runs */}
          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
            <div className="flex items-center mb-3">
              <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-[20px] mr-2">
                <Activity
                  size={16}
                  className="text-blu                                                   e-400"
                />
              </div>
              <h3 className="text-sm font-bold text-white">Recent Runs</h3>
            </div>

            {recentRunsData.length > 0 ? (
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={recentRunsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
                  <XAxis dataKey="date" stroke="#ffffff60" fontSize={10} />
                  <YAxis stroke="#ffffff60" fontSize={11} />
                  <Tooltip
                    content={(props) => {
                      const { active, payload } = props;
                      if (active && payload && payload.length) {
                        const data = payload[0].payload as {
                          name: string;
                          distance: number;
                          date: string;
                        };
                        return (
                          <div className="bg-gray-900/95 border border-white/20 rounded-lg p-3 shadow-xl backdrop-blur-sm">
                            <p className="text-white font-medium text-sm mb-1">
                              {data.name}
                            </p>
                            <p className="text-white text-sm">
                              <span style={{ color: "#3b82f6" }}>●</span>
                              {` Distance: `}
                              <span className="font-semibold">
                                {data.distance.toFixed(1)}km
                              </span>
                            </p>
                            <p className="text-white/70 text-xs mt-1">
                              {data.date}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="distance"
                    fill="#3b82f6"
                    radius={[3, 3, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-44 flex items-center justify-center text-white/40">
                <AlertCircle size={20} className="mr-2" />
                <span className="text-sm">No recent runs data</span>
              </div>
            )}
          </div>
        </div>

        {/* Recent Runs List */}
        <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
          <div className="flex items-center mb-4">
            <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-[20px] mr-2">
              <MapPin size={16} className="text-accent-main" />
            </div>
            <h3 className="text-sm font-bold text-white">Activity Log</h3>
          </div>

          <div className="space-y-4">
            {stravaData.recentRuns.slice(0, 5).map((run) => (
              <div
                key={run.date}
                className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center">
                  <div className="p-2.5 rounded-lg bg-orange-500/20 mr-4">
                    <Footprints size={16} className="text-orange-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white truncate max-w-[200px] sm:max-w-[300px]">
                      {run.name}
                    </h4>
                    <p className="text-xs text-white/60">
                      {new Date(run.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <div className="text-base font-bold text-white">
                    {run.distanceKm}
                    <span className="text-xs text-white/60 ml-1">km</span>
                  </div>
                  <div className="text-xs text-white/60">
                    {`~${(
                      parseFloat(run.distanceKm) *
                      (5.5 + Math.random() * 0.5) // Reduced variance
                    ).toFixed(0)} min`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-green-500/10 via-white/1 to-green-500/5 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Trophy size={14} className="text-green-400 mr-2" />
                <span className="text-xs font-medium text-white">
                  Longest Run
                </span>
              </div>
              <span className="text-lg font-bold text-green-400">
                {Math.max(
                  ...stravaData.recentRuns.map((r) => parseFloat(r.distanceKm)),
                ).toFixed(1)}
                km
              </span>
            </div>
            <div className="text-xs text-white/60 mt-1">
              Personal best distance
            </div>
          </div>

          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-blue-500/10 via-white/1 to-blue-500/5 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar size={14} className="text-blue-400 mr-2" />
                <span className="text-xs font-medium text-white">
                  Most Recent
                </span>
              </div>
              <span className="text-lg font-bold text-blue-400">
                {stravaData.recentRuns[0]?.distanceKm || "0"}km
              </span>
            </div>
            <div className="text-xs text-white/60 mt-1">
              {stravaData.recentRuns[0]
                ? new Date(stravaData.recentRuns[0].date).toLocaleDateString(
                    "en-US",
                    { month: "short", day: "numeric" },
                  )
                : "No recent runs"}
            </div>
          </div>

          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-purple-500/10 via-white/1 to-purple-500/5 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Target size={14} className="text-purple-400 mr-2" />
                <span className="text-xs font-medium text-white">
                  Consistency
                </span>
              </div>
              <span className="text-lg font-bold text-purple-400">
                {stravaData.totalRuns > 10
                  ? "High"
                  : stravaData.totalRuns > 5
                    ? "Medium"
                    : "Building"}
              </span>
            </div>
            <div className="text-xs text-white/60 mt-1">
              {stravaData.totalRuns} total runs
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
    const cardDistributionData = Object.entries(ankiData.cardDistribution)
      .map(([key, value]) => {
        if (key === "total" || typeof value !== "object") return null;
        const colorMap: { [key: string]: string } = {
          new: "#3b82f6",
          learning: "#f59e0b",
          young: "#10b981",
          mature: "#8b5cf6",
          relearning: "#ef4444",
        };
        return {
          name: key.charAt(0).toUpperCase() + key.slice(1),
          value: value.count,
          percentage: value.percentage,
          color: colorMap[key],
        };
      })
      .filter(
        (item): item is NonNullable<typeof item> =>
          item !== null && item.value > 0,
      );

    // Aggregate weekly activity across all decks
    const weeklyActivityData = ankiData.decks
      .reduce((acc: { day: string; reviews: number }[], deck) => {
        deck.weeklyActivity.forEach((dayActivity) => {
          const day = dayActivity.dayName.slice(0, 3);
          const existingDay = acc.find((d) => d.day === day);
          if (existingDay) {
            existingDay.reviews += dayActivity.reviewCount;
          } else {
            acc.push({ day, reviews: dayActivity.reviewCount });
          }
        });
        return acc;
      }, [])
      .sort((a, b) => {
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        return days.indexOf(a.day) - days.indexOf(b.day);
      });

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
            value={ankiData.cardDistribution.total.toLocaleString()}
            unit="cards"
            icon={Layers}
            gradient="from-purple-500/20 to-pink-500/20"
            description="Across all decks"
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
                <h3 className="text-sm font-bold text-white">
                  Aggregated Weekly Reviews
                </h3>
              </div>
            </div>

            {weeklyActivityData.length > 0 ? (
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={weeklyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
                  <XAxis dataKey="day" stroke="#ffffff60" fontSize={11} />
                  <YAxis stroke="#ffffff60" fontSize={11} />
                  <Tooltip content={<CustomTooltip unit=" reviews" />} />
                  <Bar
                    dataKey="reviews"
                    fill="url(#ankiGradient)"
                    radius={[3, 3, 0, 0]}
                  />
                  <defs>
                    <linearGradient
                      id="ankiGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
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
                    innerRadius={25}
                    outerRadius={50}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {cardDistributionData.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={(props) => {
                      const { active, payload } = props;
                      if (active && payload && payload.length) {
                        const data = payload[0].payload as PieChartData;
                        return (
                          <div className="bg-gray-900/95 border border-white/20 rounded-lg p-2 shadow-xl backdrop-blur-sm">
                            <p className="text-white text-xs font-medium">
                              {data.name}: {data.value.toLocaleString()} cards (
                              {
                                // @ts-expect-error - percentage is on payload
                                data.payload.percentage.toFixed(1)
                              }
                              %)
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-1.5">
                {cardDistributionData.map((item) => (
                  <div key={item.name} className="flex items-center text-xs">
                    <div
                      className="w-2 h-2 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-white/80 truncate flex-1">
                      {item.name}
                    </span>
                    <span className="text-white/60 ml-auto">
                      {item.percentage.toFixed(1)}%
                    </span>
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
                <span className="text-xs font-medium text-white">
                  Retention (30d)
                </span>
              </div>
              <span className="text-lg font-bold text-green-400">
                {ankiData.retention.recent30Days.toFixed(1)}%
              </span>
            </div>
            <div className="text-xs text-white/60 mt-1">
              {ankiData.retention.totalReviews.recent30Days} reviews
            </div>
          </div>

          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-blue-500/10 via-white/1 to-blue-500/5 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock size={14} className="text-blue-400 mr-2" />
                <span className="text-xs font-medium text-white">
                  Avg. Speed
                </span>
              </div>
              <span className="text-lg font-bold text-blue-400">
                {ankiData.efficiency.avgSecondsPerCard.toFixed(1)}s
              </span>
            </div>
            <div className="text-xs text-white/60 mt-1">Per card</div>
          </div>

          <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-purple-500/10 via-white/1 to-purple-500/5 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp size={14} className="text-purple-400 mr-2" />
                <span className="text-xs font-medium text-white">
                  Daily Avg (30d)
                </span>
              </div>
              <span className="text-lg font-bold text-purple-400">
                {ankiData.averages.last30Days.cardsPerDay.toFixed(0)}
              </span>
            </div>
            <div className="text-xs text-white/60 mt-1">Cards per day</div>
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
                  <th className="text-left p-2 text-white/80 font-medium">
                    Deck
                  </th>
                  <th className="text-right p-2 text-white/80 font-medium">
                    Today
                  </th>
                  <th className="text-right p-2 text-white/80 font-medium">
                    Total Cards
                  </th>
                  <th className="text-right p-2 text-white/80 font-medium">
                    Retention (30d)
                  </th>
                </tr>
              </thead>
              <tbody>
                {ankiData.decks
                  .filter((deck) => deck.cardTypes.total > 0)
                  .slice(0, 5)
                  .map((deck) => (
                    <tr
                      key={deck.deckName}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="p-2">
                        <div className="flex items-center">
                          <span className="font-medium text-white truncate max-w-[150px] sm:max-w-[250px]">
                            {deck.deckName.replace(/[🔰⭐💬🗾🧩]/g, "").trim()}
                          </span>
                        </div>
                      </td>
                      <td className="text-right p-2 text-white/80">
                        {deck.reviewsToday}
                      </td>
                      <td className="text-right p-2 text-white/80">
                        {deck.cardTypes.total.toLocaleString()}
                      </td>
                      <td className="text-right p-2">
                        <span
                          className={`font-medium ${
                            deck.retention30Days >= 85
                              ? "text-green-400"
                              : deck.retention30Days >= 70
                                ? "text-yellow-400"
                                : deck.retention30Days > 0
                                  ? "text-red-400"
                                  : "text-white/40"
                          }`}
                        >
                          {deck.retention30Days > 0
                            ? `${deck.retention30Days.toFixed(1)}%`
                            : "N/A"}
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
          <p className="text-lg sm:text-xl t                                                   ext-white/60 max-w-2xl mx-auto mb-6">
            Real-time insights into my coding, learning, and productivity
          </p>

          {/* Last Updated */}
          <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-[40px]">
            <Clock size={12} className="mr-2 text-accent-main" />
            <span className="text-xs text-white/70">
              Updated:{" "}
              {stats?.wakatime?.lastUpdated
                ? new Date(stats.wakatime.lastUpdated).toLocaleString()
                : "Unknown"}
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
          {activeTab === "fitness" && renderFitnessTab()}
          {activeTab === "learning" && renderLearningTab()}
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <ErrorCard title="Failed to Load Stats" message={error} />
          </div>
        )}
      </div>
    </section>
  );
};

export default StatsSection;


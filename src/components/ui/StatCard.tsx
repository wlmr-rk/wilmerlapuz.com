// src/components/ui/StatCard.tsx
"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  unit?: string;
  icon: LucideIcon;
  iconClassName?: string; // Added iconClassName prop
  gradient: string;
  description?: string;
  layout?: "default" | "compact" | "wide" | "custom";
  className?: string;
  children?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  icon: Icon,
  iconClassName = "text-white", // Default icon color
  gradient,
  description,
  layout = "default",
  className = "",
  children,
}) => {
  return (
    <div
      className={`bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-4 lg:p-6 inset-shadow-[0_1px_1px_rgba(255,255,255,0.1),0_-1px_1px_rgba(0,0,0,0.5)] shadow-[0_4px_16px_rgba(0,0,0,0.3),0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-[40px] backdrop-saturate-150 transition-all duration-400 hover:-translate-y-1 hover:translate-z-2.5 hover:border-white/14 hover:bg-linear-to-br hover:from-white/8 hover:via-white/2 hover:to-white/6 hover:inset-shadow-[0_2px_2px_rgba(255,255,255,0.15),0_-2px_2px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4),0_16px_48px_rgba(0,0,0,0.3)] hover:backdrop-blur-[60px] hover:backdrop-saturate-180 ${className}`}
    >
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 rounded-2xl lg:rounded-3xl bg-gradient-to-br ${gradient} opacity-50`}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-[20px] mr-3">
              <Icon size={18} className={iconClassName} />
            </div>
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide">
              {title}
            </h3>
          </div>
        </div>

        {/* Value / Custom Content */}
        {layout === "custom" ? (
          children // Render children if layout is custom
        ) : layout === "wide" ? (
          <div className="mb-2">
            <div className="text-lg font-bold text-white leading-tight line-clamp-2">
              {value}
            </div>
            {unit && <span className="text-sm text-white/60 ml-1">{unit}</span>}
          </div>
        ) : layout === "compact" ? (
          <div className="mb-2">
            <div className="text-xl font-black text-white leading-none">
              {value}
            </div>
            {unit && <span className="text-xs text-white/60 ml-1">{unit}</span>}
          </div>
        ) : (
          <div className="mb-2">
            <div className="text-2xl lg:text-3xl font-black text-white leading-none">
              {value}
            </div>
            {unit && <span className="text-sm text-white/60 ml-1">{unit}</span>}
          </div>
        )}

        {/* Description (only if not custom layout) */}
        {layout !== "custom" && description && (
          <div className="text-xs text-white/50 leading-relaxed line-clamp-2">
            {description}
          </div>
        )}
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100 pointer-events-none" />
    </div>
  );
};

export default StatCard;

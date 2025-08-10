// src/components/ui/SpotifyStatCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Music, Pause, Play } from "lucide-react";

interface SpotifyStatCardProps {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

const SpotifyStatCard: React.FC<SpotifyStatCardProps> = ({
  isPlaying,
  title,
  artist,
  album,
  albumImageUrl,
  songUrl,
}) => {
  return (
    <a
      href={songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="bento-item ease-snappy group relative z-2 flex flex-col md:flex-row items-center gap-4 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl p-4 backdrop-blur-[40px] backdrop-saturate-150 transition-all duration-400 hover:-translate-y-1 hover:border-white/14 hover:bg-white/5"
    >
      <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
        <Image
          src={albumImageUrl}
          alt={album}
          width={128}
          height={128}
          className="rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          {isPlaying ? (
            <Pause size={48} className="text-white" />
          ) : (
            <Play size={48} className="text-white" />
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start text-sm text-green-400 mb-1">
          <Music size={16} className="mr-2" />
          <span>{isPlaying ? "Now Playing" : "Last Played"}</span>
        </div>
        <h3 className="text-lg font-bold text-white truncate">{title}</h3>
        <p className="text-sm text-white/70 truncate">{artist}</p>
        <p className="text-xs text-white/50 truncate">{album}</p>
      </div>
    </a>
  );
};

export default SpotifyStatCard;

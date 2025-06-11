import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "i.scdn.co", // Spotify album art
      "mosaic.scdn.co", // Spotify mosaic images
      "seed-mix-image.spotifycdn.com", // Spotify mix images
      "thisis-images.scdn.co", // Spotify "This is" playlist images
      "daily-mix.scdn.co", // Spotify daily mix images
      "mixed-media-images.spotifycdn.com", // Other Spotify images
      "lineup-images.scdn.co", // Spotify lineup images
      "charts-images.scdn.co", // Spotify charts images
    ],
    // Alternative: Use remotePatterns for more flexibility (Next.js 12.3+)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.scdn.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.spotifycdn.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

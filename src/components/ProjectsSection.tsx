// src/components/ProjectsSection.tsx
"use client";

import React, { useState } from "react";
import {
  ExternalLink,
  Github,
  Code2,
  Globe,
  Smartphone,
  Server,
  Terminal,
  Target,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: "Web App" | "Tool" | "System" | "Mobile";
  status: "Live" | "In Progress" | "Completed";
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
  challenges: string[];
  gradient: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
}

const projects: Project[] = [
  {
    id: "portfolio-dashboard",
    title: "Real-time Portfolio Dashboard",
    description:
      "Automated portfolio site with live stats integration via GitHub Actions",
    longDescription:
      "A glassmorphic portfolio website featuring automated data collection from multiple APIs (Strava, Spotify, WakaTime, LeetCode) using GitHub Actions workflows that run hourly.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "GitHub Actions",
      "Vercel",
    ],
    category: "Web App",
    status: "Live",
    githubUrl: "https://github.com/wlmr-rk/wilmerlapuz.com",
    features: [
      "Automated data fetching every hour",
      "Real-time stats from 5+ platforms",
      "Responsive glassmorphic design",
      "Performance optimized",
    ],
    challenges: [
      "API rate limiting management",
      "Cross-platform data normalization",
      "Responsive design with complex animations",
    ],
    gradient: "from-blue-500/20 to-blue-300/20",
    icon: Globe,
  },
  {
    id: "nixos-dotfiles",
    title: "Personal NixOS Configuration",
    description:
      "Comprehensive NixOS system configuration with Hyprland and development tools",
    longDescription:
      "A complete NixOS system configuration featuring Hyprland window manager, custom development environments, and productivity-focused dotfiles. Built for efficient development workflow with Rust/Kotlin focus.",
    technologies: [
      "Nix",
      "Hyprland",
      "Waybar",
      "Fish Shell",
      "Alacritty",
      "Home Manager",
    ],
    category: "Tool",
    status: "Completed",
    githubUrl: "https://github.com/wlmr-rk/wlmr-nix",
    features: [
      "Modular Nix configuration structure",
      "Custom Hyprland + Waybar setup",
      "Enhanced Fuzzel launcher with Japanese UI",
      "Development environment templates",
      "Automated clipboard monitoring",
      "Tokyo Night themed everything",
    ],
    challenges: [
      "Modular configuration architecture",
      "Wayland-specific app compatibility",
      "Custom Fish shell function development",
      "AMD GPU optimization for gaming",
    ],
    gradient: "from-blue-500/20 to-purple-500/20",
    icon: Terminal,
  },
  {
    id: "kotlin-mobile-app",
    title: "Personal Productivity Tracker",
    description: "Android app for tracking habits and productivity metrics",
    longDescription:
      "A native Android application built with Jetpack Compose that helps users track daily habits, productivity metrics, and provides insights through data visualization.",
    technologies: [
      "Kotlin",
      "Jetpack Compose",
      "Room",
      "Retrofit",
      "Coroutines",
    ],
    category: "Mobile",
    status: "In Progress",
    // githubUrl: "https://github.com/yourusername/productivity-tracker",
    features: [
      "Habit tracking with streaks",
      "Data visualization charts",
      "Local data persistence",
      "Material 3 design",
    ],
    challenges: [
      "Complex state management",
      "Custom chart implementations",
      "Performance optimization",
    ],
    gradient: "from-red-500/20 to-rose-500/20",
    icon: Smartphone,
  },
  {
    id: "project-nexus",
    title: "Project Nexus - Data Aggregation Pipeline",
    description:
      "Serverless data aggregation pipeline streaming real-time telemetry from multiple APIs into a Next.js portfolio",
    longDescription:
      "A comprehensive automated system that collects and synchronizes data from Spotify, Strava, LeetCode, WakaTime, and Anki to power a dynamic portfolio website. Runs hourly via GitHub Actions, transforming personal metrics into compelling 'building in public' content with >99% uptime.",
    technologies: [
      "Node.js",
      "GitHub Actions",
      "REST APIs",
      "GraphQL",
      "Vercel",
      "JSON",
    ],
    category: "System",
    status: "Live",
    githubUrl: "https://github.com/wlmr-rk/proj-nexus",
    features: [
      "5 API integrations (Spotify, Strava, LeetCode, WakaTime, Anki)",
      "Hourly automated sync via GitHub Actions",
      "Resilient error handling & graceful failures",
      "Zero-downtime deployment with Vercel",
      "Real-time portfolio data updates",
      "Concurrent API processing for speed",
    ],
    challenges: [
      "OAuth2 refresh token management across services",
      "Git conflict resolution for concurrent updates",
      "Rate limit compliance across multiple APIs",
      "Transforming disparate data formats into unified JSON",
    ],
    gradient: "from-pink-600/20 to-red-200/20",
    icon: Server,
  },
];

const categories = ["All", "Web App", "Tool", "System", "Mobile"] as const;

const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  // We disable the lint rule here because the modal to display the project isn't built yet.
  // This is a placeholder for future functionality.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "Live":
        return "text-accent-main";
      case "In Progress":
        return "text-yellow-400";
      case "Completed":
        return "text-blue-400";
      default:
        return "text-white/60";
    }
  };

  const getStatusDot = (status: Project["status"]) => {
    switch (status) {
      case "Live":
        return "bg-accent-main animate-pulse";
      case "In Progress":
        return "bg-yellow-400 animate-pulse";
      case "Completed":
        return "bg-blue-400";
      default:
        return "bg-white/60";
    }
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen bg-black p-4 sm:p-6 lg:p-8"
    >
      {/* Background noise */}
      <div className="bg-noise bg-cinematic absolute inset-0 animate-[float_25s_ease-in-out_infinite]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase text-shadow-[0_4px_8px_rgba(0,0,0,0.8)] mb-4">
            Projects
          </h2>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-8">
            Building solutions that solve real problems with modern technologies
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`ease-snappy px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-400 ${
                  selectedCategory === category
                    ? "border border-white/20 bg-white/12 text-white inset-shadow-[0_1px_1px_rgba(255,255,255,0.15)] shadow-[0_4px_12px_rgba(0,255,136,0.15)]"
                    : "border border-white/8 bg-white/5 text-white/70 hover:border-white/15 hover:bg-white/8 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.id}
                className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150 transition-all duration-400 hover:-translate-y-2 hover:border-white/14 hover:shadow-[0_12px_36px_rgba(0,0,0,0.4)] cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 rounded-2xl lg:rounded-3xl bg-gradient-to-br ${project.gradient} opacity-30 group-hover:opacity-50 transition-opacity duration-400`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-3 rounded-xl bg-white/10 backdrop-blur-[20px] mr-3">
                        <Icon size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-1">
                          {project.category}
                        </div>
                        <h3 className="text-lg font-bold text-white leading-tight">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center">
                      <span
                        className={`inline-block size-2 rounded-full mr-2 ${getStatusDot(project.status)}`}
                      />
                      <span
                        className={`text-xs font-medium ${getStatusColor(project.status)}`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-md border border-white/10 bg-white/5 text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 text-xs rounded-md border border-white/10 bg-white/5 text-white/60">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="ease-snappy flex items-center px-3 py-2 text-sm font-medium text-white/80 rounded-lg border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
                      >
                        <Github size={14} className="mr-2" />
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="ease-snappy flex items-center px-3 py-2 text-sm font-medium text-accent-main rounded-lg border border-accent-main/20 bg-accent-main/5 transition-all duration-300 hover:border-accent-main/40 hover:bg-accent-main/10"
                      >
                        <ExternalLink size={14} className="mr-2" />
                        Live
                      </a>
                    )}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <Code2 size={48} className="text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white/60 mb-2">
              No projects found
            </h3>
            <p className="text-white/40">Try selecting a different category</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-[40px]">
            <Target size={16} className="mr-2 text-accent-main" />
            <span className="text-sm text-white/70">
              More projects on{" "}
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-main hover:text-white transition-colors font-medium"
              >
                GitHub
              </a>{" "}
              • Building in public
            </span>
          </div>
        </div>
      </div>

      {/* Project Detail Modal would go here */}
      {/* We can implement this in a separate component if needed */}
    </section>
  );
};

export default ProjectsSection;

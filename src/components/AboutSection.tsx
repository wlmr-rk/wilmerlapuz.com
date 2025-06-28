// src/components/AboutSection.tsx
"use client";

import React from "react";
import {
  User,
  Code2,
  Brain,
  Target,
  Coffee,
  Terminal,
  Zap,
  Building2,
  GraduationCap,
  MapPin,
  Calendar,
} from "lucide-react";

const AboutSection: React.FC = () => {
  const skills = [
    {
      category: "Proficient",
      items: ["JavaScript", "React / Next.js", "SvelteKit", "HTML/CSS"],
      icon: Code2,
    },
    {
      category: "Expanding Into",
      items: ["TypeScript", "Rust", "Kotlin", "SQL"],
      icon: Zap,
    },
    {
      category: "Backend & Data",
      items: ["Node.js", "API Design", "Supabase"],
      icon: Terminal,
    },
    {
      category: "Tools & Environment",
      items: ["NixOS", "Neovim", "Git", "Hyprland"],
      icon: Coffee,
    },
  ];

  const values = [
    {
      title: "Systems Thinking",
      description:
        "My background in fraud analysis taught me to see the whole system. I build robust, automated solutions over quick fixes.",
      icon: Target,
    },
    {
      title: "Pragmatic Initiative",
      description:
        "I'm an autodidact who learns by building. If a process is inefficient, my first instinct is to design a better system to solve it.",
      icon: Brain,
    },
    {
      title: "From Analysis to Code",
      description:
        "I leverage years of analytical rigor from finance to write precise, efficient, and well-documented code.",
      icon: Building2,
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen bg-black p-6 lg:p-8"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase mb-4">
            About Me
          </h2>
          <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto">
            From a Fraud Claims Specialist at J.P. Morgan to a systems-driven
            Software Engineer.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <div className="card-container relative perspective-distant">
              <div className="card card-glass ease-fluid relative transform-3d overflow-hidden rounded-3xl border border-white/15 p-8 lg:p-12 backdrop-blur-[80px] backdrop-brightness-110 backdrop-saturate-200 transition-all duration-800 hover:border-white/22">
                <div className="floating-accent absolute top-6 right-6 z-10 size-1.5 animate-[float-accent_5s_ease-in-out_infinite] rounded-full bg-linear-to-br/oklch from-accent-main to-accent-mid shadow-[0_0_16px_rgba(0,255,136,0.9)]" />

                <div className="flex items-start mb-6">
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-[20px] mr-4">
                    <User size={24} className="text-accent-main" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      My Journey
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-white/60">
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        Pasig City, Philippines
                      </div>
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        28 years old
                      </div>
                      <div className="flex items-center">
                        <Building2 size={14} className="mr-1" />
                        7+ years professional experience
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 text-white/80 leading-relaxed">
                  <p>
                    With over seven years in professional roles, including six
                    as a{" "}
                    <strong className="text-white">
                      Fraud Claims Specialist at J.P. Morgan
                    </strong>
                    , I developed a sharp eye for systematic investigation and
                    process analysis. It was in this high-stakes environment
                    that I discovered my passion for building better systems.
                  </p>

                  <p>
                    Faced with repetitive manual tasks, I took the initiative to
                    prototype and champion the{" "}
                    <strong className="text-accent-main">
                      Streamlined Automated Investigation System (SAIS)
                    </strong>
                    . This proof-of-concept, which I designed and built,
                    demonstrated a potential 20% productivity boost in testing.
                    Showcasing it to leadership was my gateway to software
                    development.
                  </p>

                  <p>
                    That project solidified my path. My expertise today is in{" "}
                    <strong className="text-white">JavaScript</strong>, having
                    built and deployed projects with modern frameworks like{" "}
                    <strong className="text-white">React/Next.js</strong> and{" "}
                    <strong className="text-white">SvelteKit</strong>. To build
                    more robust applications, I am actively incorporating{" "}
                    <strong className="text-accent-main">TypeScript</strong>{" "}
                    into my work. My long-term goal is to build highly reliable,
                    performant systems, which is why I am now learning{" "}
                    <strong className="text-accent-main">Rust</strong> and{" "}
                    <strong className="text-accent-main">Kotlin</strong>.
                  </p>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center text-accent-main font-semibold">
                      <Target size={16} className="mr-2" />
                      Current Goal: Seeking a full-time software engineer role
                      to apply my JavaScript skills and grow into a systems
                      specialist.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150 transition-all duration-400 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <GraduationCap size={20} className="text-accent-main mr-3" />
                <h3 className="text-lg font-bold text-white">Quick Facts</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/70 text-sm">Experience</span>
                  <span className="text-white font-semibold">
                    7+ Yrs Professional
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/70 text-sm">Core Skill</span>
                  <span className="text-white font-semibold">JavaScript</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/70 text-sm">Learning</span>
                  <span className="text-white font-semibold">
                    Rust, Kotlin, TS
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/70 text-sm">Environment</span>
                  <span className="text-white font-semibold">
                    NixOS + Neovim
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-white/70 text-sm">Availability</span>
                  <span className="text-accent-main font-semibold">
                    Immediate
                  </span>
                </div>
              </div>
            </div>

            <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-accent-main/5 via-white/1 to-accent-mid/5 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150">
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <span className="status-dot relative inline-block animate-[pulse_2.5s_ease-in-out_infinite] rounded-full bg-linear-to-br/oklch from-accent-main to-accent-mid size-3 mr-3 shadow-[0_0_16px_rgba(0,255,136,0.8)]" />
                  <span className="text-lg font-bold text-accent-main">
                    Open to Work
                  </span>
                </div>
                <p className="text-sm text-white/70 mb-4">
                  Actively seeking opportunities to contribute to a passionate
                  team.
                </p>
                <div className="text-xs text-white/50">
                  Interested in full-time roles, especially with JavaScript,
                  Rust, or Kotlin.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
            Technical Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup) => {
              const Icon = skillGroup.icon;
              return (
                <div
                  key={skillGroup.category}
                  className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl p-6 backdrop-blur-[40px] backdrop-saturate-150 transition-all duration-400 hover:-translate-y-1 hover:border-white/14"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-lg bg-white/10 backdrop-blur-[20px] mr-3">
                      <Icon size={18} className="text-accent-main" />
                    </div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                      {skillGroup.category}
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {skillGroup.items.map((skill) => (
                      <div
                        key={skill}
                        className="text-sm text-white/80 py-1 px-2 rounded bg-white/5 border border-white/10"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
            My Approach
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 text-center backdrop-blur-[40px] backdrop-saturate-150 transition-all duration-400 hover:-translate-y-1 hover:border-white/14"
                >
                  <div className="inline-flex items-center justify-center p-3 rounded-xl bg-white/10 backdrop-blur-[20px] mb-4">
                    <Icon size={24} className="text-accent-main" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">
                    {value.title}
                  </h4>
                  <p className="text-white/70 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
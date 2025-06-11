// src/components/HeroSection.tsx
"use client";

import React from "react";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";

const HeroSection: React.FC = () => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // HIRING MANAGER'S NOTE: This tech stack is curated to be both honest and impressive.
  // It leads with your strengths and shows your ambitious learning path.
  const techStack = [
    "JavaScript",
    "TypeScript",
    "React / Next.js",
    "SvelteKit",
    "Node.js",
    "Rust",
    "Kotlin",
    "NixOS",
  ];

  // ACTION REQUIRED: Update these links with your actual profiles.
  const socialLinks = [
    {
      href: "https://github.com/your-github-username", // <-- UPDATE THIS
      icon: Github,
      label: "GitHub",
    },
    {
      href: "https://linkedin.com/in/your-linkedin-profile", // <-- UPDATE THIS
      icon: Linkedin,
      label: "LinkedIn",
    },
    {
      href: "mailto:wilmerlapuz@gmail.com", // <-- This is from your resume
      icon: Mail,
      label: "Email",
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black font-[Space_Grotesk] p-4 sm:p-6 lg:p-8"
    >
      <div className="bg-noise bg-cinematic absolute inset-0 animate-[float_25s_ease-in-out_infinite]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="card-container relative perspective-distant">
          <div className="card card-glass ease-fluid relative transform-3d overflow-hidden rounded-3xl sm:rounded-4xl border border-white/15 p-8 sm:p-12 lg:p-16 inset-shadow-[0_0_0_1px_rgba(255,255,255,0.08)] shadow-[0_2px_8px_rgba(0,255,136,0.05),0_8px_32px_rgba(0,0,0,0.7),0_32px_64px_rgba(0,0,0,0.8),0_64px_128px_rgba(0,0,0,0.9)] inset-shadow-[0_2px_4px_rgba(255,255,255,0.2),0_-2px_4px_rgba(0,0,0,0.9),0_0_80px_rgba(255,255,255,0.03)] backdrop-blur-[80px] backdrop-brightness-110 backdrop-saturate-200 transition-all duration-800 hover:border-white/22">
            <div className="floating-accent absolute top-6 right-6 z-10 size-1.5 animate-[float-accent_5s_ease-in-out_infinite] rounded-full bg-linear-to-br/oklch from-accent-main to-accent-mid shadow-[0_0_16px_rgba(0,255,136,0.9),0_0_32px_rgba(0,255,136,0.5)]" />

            <div className="inline-flex items-center mb-6 px-4 py-2 rounded-full border border-white/15 bg-linear-to-r/oklch from-accent-main/10 via-accent-light/5 to-accent-mid/10 backdrop-blur-[40px]">
              <span className="status-dot relative inline-block animate-[pulse_2.5s_ease-in-out_infinite] rounded-full bg-linear-to-br/oklch from-accent-main to-accent-mid size-2 mr-3 shadow-[0_0_12px_rgba(0,255,136,0.8)]" />
              <span className="text-sm font-semibold text-accent-main tracking-wide">
                Open to Work
              </span>
              <span className="ml-2 text-xs text-white/50">•</span>
              <span className="ml-2 text-xs text-white/70">
                Available for full-time opportunities
              </span>
            </div>

            <h1 className="mb-6">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-white/80 mb-2 tracking-wide">
                Hello, I'm
              </div>
              <div className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight text-white uppercase text-shadow-[0_4px_8px_rgba(0,0,0,0.8)] mb-4">
                WILMER
              </div>
              {/* HIRING MANAGER'S NOTE: This title is a powerful hook. */}
              <div className="text-xl sm:text-2xl lg:text-3xl font-light text-white/70 tracking-wide">
                Systems Thinker & Software Engineer
              </div>
            </h1>

            {/* HIRING MANAGER'S NOTE: This subtitle connects your past to your present. */}
            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-8 leading-relaxed">
              Leveraging a 7-year background in financial analysis to build
              efficient and reliable web applications with a systems-first
              approach.
            </p>

            <div className="mb-8">
              <div className="text-sm font-semibold text-white/80 uppercase tracking-widest mb-4">
                Tech Stack
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm rounded-lg border border-white/10 bg-white/5 text-white/80 backdrop-blur-[20px] hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  const projectsSection = document.getElementById("projects");
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="ease-snappy px-8 py-4 rounded-xl border border-white/20 bg-linear-to-br/oklch from-accent-main/15 via-accent-light/10 to-accent-mid/15 text-white font-semibold inset-shadow-[0_2px_4px_rgba(255,255,255,0.1)] shadow-[0_8px_24px_rgba(0,255,136,0.2)] transition-all duration-400 hover:border-white/30 hover:bg-linear-to-br hover:from-accent-main/25 hover:via-accent-light/15 hover:to-accent-mid/25 hover:inset-shadow-[0_4px_8px_rgba(255,255,255,0.15)] hover:shadow-[0_12px_32px_rgba(0,255,136,0.3)] hover:-translate-y-1"
              >
                View My Work
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="ease-snappy px-8 py-4 rounded-xl border border-white/15 bg-white/5 text-white font-semibold backdrop-blur-[40px] transition-all duration-400 hover:border-white/25 hover:bg-white/10 hover:-translate-y-1"
              >
                Get In Touch
              </a>
            </div>

            <div className="flex justify-center space-x-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ease-snappy relative rounded-xl p-3 text-white/60 transition-all duration-400 hover:text-white hover:bg-white/8 hover:inset-shadow-[0_1px_1px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:-translate-y-1"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>

            <div className="accent-line relative mx-auto mt-8 h-1 w-16 rounded bg-linear-to-r/oklch from-accent-main via-accent-light to-accent-mid shadow-[0_0_16px_rgba(0,255,136,0.5),0_4px_8px_rgba(0,0,0,0.3)]" />
          </div>
        </div>

        <button
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50 hover:text-white/80 transition-colors duration-300"
          aria-label="Scroll to next section"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;

// src/components/Navigation.tsx
"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  User,
  Briefcase,
  BarChart3,
  MessageCircle,
  Home,
} from "lucide-react";

const navItems = [
  { id: "hero", label: "Home", href: "#hero", icon: Home },
  { id: "about", label: "About", href: "#about", icon: User },
  { id: "projects", label: "Projects", href: "#projects", icon: Briefcase },
  { id: "stats", label: "Stats", href: "#stats", icon: BarChart3 },
  { id: "contact", label: "Contact", href: "#contact", icon: MessageCircle },
];

const socialLinks = [
  { href: "https://github.com/wlmr-rk", icon: Github, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/wilmerlapuz/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  { href: "mailto:wilmerlapuz@gmail.com", icon: Mail, label: "Email" },
];

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 z-50 -translate-y-1/2 transform perspective-normal hidden lg:block">
      {/* Main Navigation Pill */}
      <nav className="ease-fluid relative transform-3d overflow-hidden rounded-3xl border border-white/15 bg-linear-to-b/oklch from-white/8 via-white/4 to-white/6 p-4 inset-shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_2px_4px_rgba(255,255,255,0.2),0_-2px_4px_rgba(0,0,0,0.9)] shadow-[0_4px_16px_rgba(0,255,136,0.05),0_8px_32px_rgba(0,0,0,0.4),0_16px_64px_rgba(0,0,0,0.3)] backdrop-blur-[80px] backdrop-brightness-110 backdrop-saturate-200 transition-all duration-400">
        {/* Navigation Items */}
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection(item.href)}
                className={`ease-snappy relative w-full flex items-center justify-start rounded-xl p-3 text-sm font-semibold tracking-tight transition-all duration-400 group ${
                  isActive
                    ? "text-white bg-white/15 inset-shadow-[0_1px_1px_rgba(255,255,255,0.15)] shadow-[0_4px_12px_rgba(0,255,136,0.15)]"
                    : "text-white/70 hover:text-white hover:bg-white/10 hover:inset-shadow-[0_1px_1px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                }`}
              >
                <Icon size={16} className="mr-3 flex-shrink-0" />
                <span className="text-xs">{item.label}</span>

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-linear-to-b/oklch from-accent-main to-accent-mid rounded-full shadow-[0_0_8px_rgba(0,255,136,0.8)]"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              </motion.button>
            );
          })}
        </div>

        {/* Social Links */}
        <div className="mt-4 pt-3 border-t border-white/10">
          <div className="flex justify-center space-x-1">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.95 }}
                  className="ease-snappy relative rounded-lg p-2.5 text-white/60 transition-all duration-400 hover:text-white hover:bg-white/10 hover:inset-shadow-[0_1px_1px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                  aria-label={social.label}
                >
                  <Icon size={14} />
                </motion.a>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;

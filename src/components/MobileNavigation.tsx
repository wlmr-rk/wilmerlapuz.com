// src/components/MobileNavigation.tsx
"use client";

import {
  Home,
  User,
  Briefcase,
  BarChart3,
  MessageCircle,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";

const navItems = [
  { id: "hero", label: "Home", href: "#hero", icon: Home },
  { id: "about", label: "About", href: "#about", icon: User },
  { id: "projects", label: "Projects", href: "#projects", icon: Briefcase },
  { id: "stats", label: "Stats", href: "#stats", icon: BarChart3 },
  { id: "contact", label: "Contact", href: "#contact", icon: MessageCircle },
];

const MobileNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // This is the new stable, full-screen fixed wrapper.
    // It's invisible and doesn't block clicks thanks to `pointer-events-none`.
    <div className="fixed inset-0 z-50 pointer-events-none lg:hidden">
      {/* This flex container positions its children at the bottom. */}
      <div className="w-full h-full flex justify-center items-end p-6">
        {/* This container re-enables pointer events for the nav elements. */}
        <div className="relative flex items-end gap-4 pointer-events-auto">
          {/* Main Horizontal Navigation Pill */}
          <nav className="ease-fluid relative transform-3d overflow-hidden rounded-full border border-white/15 bg-linear-to-br/oklch from-white/8 via-white/4 to-white/6 inset-shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_2px_4px_rgba(255,255,255,0.2),0_-2px_4px_rgba(0,0,0,0.9)] shadow-[0_4px_16px_rgba(0,255,136,0.05),0_8px_32px_rgba(0,0,0,0.4),0_16px_64px_rgba(0,0,0,0.3)] backdrop-blur-[80px] backdrop-brightness-110 backdrop-saturate-200">
            <div className="flex items-center justify-center gap-2 p-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative z-10 flex items-center justify-center size-10 rounded-full transition-colors duration-300 ${
                      isActive ? "text-white" : "text-white/60 hover:text-white"
                    }`}
                    aria-label={item.label}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="mobileActiveIndicator"
                        className="absolute inset-0 z-[-1] rounded-full bg-white/15 shadow-md"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                    <Icon size={20} />
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Scroll to Top Button */}
          <div className="relative">
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onClick={scrollToTop}
                  className="ease-fluid flex items-center justify-center size-14 transform-3d overflow-hidden rounded-full border border-white/15 bg-linear-to-br/oklch from-white/8 via-white/4 to-white/6 text-white/80 transition-all duration-400 hover:bg-white/12 hover:text-white active:scale-95 inset-shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_2px_4px_rgba(255,255,255,0.2),0_-2px_4px_rgba(0,0,0,0.9)] shadow-[0_4px_16px_rgba(0,0,0,0.3),0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-[80px] backdrop-brightness-110 backdrop-saturate-200"
                  aria-label="Scroll to top"
                >
                  <ChevronUp size={22} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;

// src/components/Footer.tsx
"use client";

import React from "react";
import {
  Github,
  Linkedin,
  Mail,
  Heart,
  Code2,
  Calendar,
  MapPin,
  ExternalLink,
} from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: "https://github.com/wlmr-rk", icon: Github, label: "GitHub" },
    {
      href: "https://www.linkedin.com/in/wilmerlapuz/",
      icon: Linkedin,
      label: "LinkedIn",
    },
    { href: "mailto:wilmerlapuz@gmail.com", icon: Mail, label: "Email" },
  ];

  const quickLinks = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#stats", label: "Stats" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-black border-t border-white/10 p-4 sm:p-6 lg:p-8">
      {/* Background noise */}
      <div className="bg-noise bg-cinematic absolute inset-0 opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-linear-to-br/oklch from-accent-main to-accent-mid shadow-[0_0_16px_rgba(0,255,136,0.4)] mr-3">
                <Code2 size={20} className="text-black" />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight text-white uppercase">
                  WILMER
                </h3>
                <p className="text-xs text-white/60 uppercase tracking-widest">
                  Full Stack Developer
                </p>
              </div>
            </div>

            <p className="text-white/70 leading-relaxed mb-4 max-w-md">
              Building robust, scalable applications with modern technologies.
              Passionate about clean code, automation, and creating exceptional
              user experiences.
            </p>

            <div className="flex items-center text-sm text-white/60 mb-2">
              <MapPin size={14} className="mr-2" />
              Philippines • Available globally (Remote)
            </div>

            <div className="flex items-center text-sm text-white/60">
              <Calendar size={14} className="mr-2" />
              Open to opportunities • Immediate availability
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/70 hover:text-accent-main transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Connect</h4>
            <div className="space-y-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ease-snappy flex items-center text-white/70 hover:text-accent-main transition-all duration-300 group"
                  >
                    <Icon size={16} className="mr-3" />
                    <span className="text-sm">{social.label}</span>
                    <ExternalLink
                      size={12}
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </a>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ease-snappy inline-flex items-center px-4 py-2 text-sm font-semibold text-accent-main border border-accent-main/20 rounded-lg bg-accent-main/5 transition-all duration-400 hover:border-accent-main/40 hover:bg-accent-main/10 hover:text-white"
              >
                Download Resume
                <ExternalLink size={14} className="ml-2" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-white/60 text-sm">Built with</span>
              <Heart size={14} className="mx-2 text-red-500" />
              <span className="text-white/60 text-sm">
                using Next.js, TypeScript & Tailwind CSS
              </span>
            </div>

            <div className="flex items-center space-x-6 text-sm text-white/60">
              <span>© {currentYear} Wilmer. All rights reserved.</span>
              <div className="flex items-center">
                <span className="status-dot relative inline-block animate-[pulse_2.5s_ease-in-out_infinite] rounded-full bg-linear-to-br/oklch from-accent-main to-accent-mid size-1.5 mr-2 shadow-[0_0_8px_rgba(0,255,136,0.8)]" />
                <span className="text-accent-main font-medium">
                  Open to Work
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

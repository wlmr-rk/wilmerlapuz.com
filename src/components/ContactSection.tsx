// src/components/ContactSection.tsx
"use client";

import React, { useState } from "react";
import {
  Mail,
  MessageCircle,
  Send,
  Github,
  Linkedin,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Download,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<FormStatus>({
    type: "idle",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending message..." });

    try {
      // Replace this with your actual form submission logic
      // You can use services like Formspree, Netlify Forms, or your own API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          company: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch {
      setStatus({
        type: "error",
        message:
          "Failed to send message. Please try emailing me directly at wilmer.lapuz@gmail.com",
      });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "wilmer.lapuz@gmail.com",
      href: "mailto:wilmer.lapuz@gmail.com",
      description: "Best way to reach me",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Philippines",
      description: "Available for remote work globally",
    },
    {
      icon: Clock,
      label: "Timezone",
      value: "GMT+8 (PHT)",
      description: "Flexible with meeting times",
    },
    {
      icon: Calendar,
      label: "Availability",
      value: "Immediate",
      description: "Ready to start contributing",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/wlmr-rk",
      username: "@wlmr-rk",
      description: "View my code and contributions",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/wilmerlapuz/",
      username: "Wilmer Lapuz",
      description: "Professional network and experience",
    },
    {
      icon: Download,
      label: "Resume",
      href: "/resume.pdf",
      username: "Download PDF",
      description: "Complete professional background",
    },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-black p-4 sm:p-6 lg:p-8"
    >
      {/* Background noise */}
      <div className="bg-noise bg-cinematic absolute inset-0 animate-[float_25s_ease-in-out_infinite]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase text-shadow-[0_4px_8px_rgba(0,0,0,0.8)] mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-6">
            Ready to contribute to your team or collaborate on exciting projects
          </p>

          {/* Availability Status */}
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-accent-main/20 bg-accent-main/5 backdrop-blur-[40px]">
            <span className="status-dot relative inline-block animate-[pulse_2.5s_ease-in-out_infinite] rounded-full bg-linear-to-br/oklch from-accent-main to-accent-mid size-2 mr-3 shadow-[0_0_12px_rgba(0,255,136,0.8)]" />
            <span className="text-sm font-semibold text-accent-main">
              Available for immediate opportunities
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card-container relative perspective-distant">
              <div className="card card-glass ease-fluid relative transform-3d overflow-hidden rounded-3xl border border-white/15 p-8 lg:p-12 backdrop-blur-[80px] backdrop-brightness-110 backdrop-saturate-200 transition-all duration-800 hover:border-white/22">
                {/* Floating accent */}
                <div className="floating-accent absolute top-6 right-6 z-10 size-1.5 animate-[float-accent_5s_ease-in-out_infinite] rounded-full bg-linear-to-br/oklch from-accent-main to-accent-mid shadow-[0_0_16px_rgba(0,255,136,0.9)]" />

                <div className="flex items-center mb-8">
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-[20px] mr-4">
                    <MessageCircle size={24} className="text-accent-main" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Send a Message
                    </h3>
                    <p className="text-white/60">
                      I&apos;ll respond within 24 hours
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-white mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/50 backdrop-blur-[20px] transition-all duration-300 focus:border-accent-main/50 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-accent-main/20"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-white mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/50 backdrop-blur-[20px] transition-all duration-300 focus:border-accent-main/50 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-accent-main/20"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Company and Subject Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-semibold text-white mb-2"
                      >
                        Company/Organization
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/50 backdrop-blur-[20px] transition-all duration-300 focus:border-accent-main/50 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-accent-main/20"
                        placeholder="Your company (optional)"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-semibold text-white mb-2"
                      >
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white backdrop-blur-[20px] transition-all duration-300 focus:border-accent-main/50 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-accent-main/20"
                      >
                        <option value="">Select a subject</option>
                        <option value="job-opportunity">Job Opportunity</option>
                        <option value="project-collaboration">
                          Project Collaboration
                        </option>
                        <option value="freelance-inquiry">
                          Freelance Inquiry
                        </option>
                        <option value="technical-consultation">
                          Technical Consultation
                        </option>
                        <option value="general-inquiry">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-white mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/50 backdrop-blur-[20px] transition-all duration-300 focus:border-accent-main/50 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-accent-main/20 resize-none"
                      placeholder="Tell me about the opportunity, project, or how I can help..."
                    />
                  </div>

                  {/* Status Message */}
                  {status.type !== "idle" && (
                    <div
                      className={`flex items-center p-4 rounded-xl border ${
                        status.type === "success"
                          ? "border-accent-main/20 bg-accent-main/5 text-accent-main"
                          : status.type === "error"
                            ? "border-red-500/20 bg-red-500/5 text-red-400"
                            : "border-blue-500/20 bg-blue-500/5 text-blue-400"
                      }`}
                    >
                      {status.type === "success" && (
                        <CheckCircle size={20} className="mr-3 flex-shrink-0" />
                      )}
                      {status.type === "error" && (
                        <AlertCircle size={20} className="mr-3 flex-shrink-0" />
                      )}
                      {status.type === "loading" && (
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-400/20 border-t-blue-400 mr-3 flex-shrink-0"></div>
                      )}
                      <span className="text-sm">{status.message}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status.type === "loading"}
                    className="ease-snappy w-full flex items-center justify-center px-8 py-4 rounded-xl border border-accent-main/20 bg-linear-to-br/oklch from-accent-main/15 via-accent-light/10 to-accent-mid/15 text-white font-semibold inset-shadow-[0_2px_4px_rgba(255,255,255,0.1)] shadow-[0_8px_24px_rgba(0,255,136,0.2)] transition-all duration-400 hover:border-accent-main/30 hover:bg-linear-to-br hover:from-accent-main/25 hover:via-accent-light/15 hover:to-accent-mid/25 hover:inset-shadow-[0_4px_8px_rgba(255,255,255,0.15)] hover:shadow-[0_12px_32px_rgba(0,255,136,0.3)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    <Send size={18} className="mr-2" />
                    {status.type === "loading" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                <Mail size={20} className="mr-3 text-accent-main" />
                Contact Information
              </h3>

              <div className="space-y-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <div key={info.label} className="flex items-start">
                      <div className="p-2 rounded-lg bg-white/10 backdrop-blur-[20px] mr-3 mt-0.5">
                        <Icon size={16} className="text-accent-main" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white mb-1">
                          {info.label}
                        </div>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-sm text-accent-main hover:text-white transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <div className="text-sm text-white/80">
                            {info.value}
                          </div>
                        )}
                        <div className="text-xs text-white/50 mt-1">
                          {info.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="bento-item ease-snappy relative z-2 border border-white/8 bg-linear-to-br/oklch from-white/4 via-white/1 to-white/3 rounded-2xl lg:rounded-3xl p-6 backdrop-blur-[40px] backdrop-saturate-150">
              <h3 className="text-lg font-bold text-white mb-6">
                Connect With Me
              </h3>

              <div className="space-y-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ease-snappy flex items-center p-3 rounded-xl border border-white/8 bg-white/5 text-white/80 transition-all duration-400 hover:border-white/15 hover:bg-white/10 hover:text-white group"
                    >
                      <div className="p-2 rounded-lg bg-white/10 backdrop-blur-[20px] mr-3">
                        <Icon size={16} className="text-accent-main" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold">
                          {social.label}
                        </div>
                        <div className="text-xs text-white/60">
                          {social.username}
                        </div>
                      </div>
                      <ExternalLink
                        size={14}
                        className="text-white/40 group-hover:text-white/60 transition-colors"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

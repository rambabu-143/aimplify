"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Bot, Zap, TrendingDown, Shield, TrendingUp, ArrowUpRight } from "lucide-react";
import { NumberTicker } from "@/components/ui/number-ticker";

const cards = [
  {
    id: 1,
    icon: Bot,
    color: "#6366f1",
    bg: "#eef2ff",
    tag: "AI & Automation",
    headline: "Tasks automated this month",
    stat: 1284,
    suffix: "",
    prefix: "",
    sub: "+24 added today",
    detail: "Email follow-ups, invoicing, CRM updates — all on autopilot.",
  },
  {
    id: 2,
    icon: TrendingDown,
    color: "#10b981",
    bg: "#ecfdf5",
    tag: "Cloud Optimization",
    headline: "Saved on AWS this month",
    stat: 3400,
    suffix: "",
    prefix: "$",
    sub: "from $6,200 → $2,800",
    detail: "Unused instances, oversized resources, zero performance impact.",
  },
  {
    id: 3,
    icon: Zap,
    color: "#f59e0b",
    bg: "#fffbeb",
    tag: "Web Performance",
    headline: "Lighthouse score after fix",
    stat: 97,
    suffix: "/100",
    prefix: "",
    sub: "was 34 before we touched it",
    detail: "Core Web Vitals, image optimization, edge caching done right.",
  },
  {
    id: 4,
    icon: TrendingUp,
    color: "#8b5cf6",
    bg: "#f5f3ff",
    tag: "Marketing Automation",
    headline: "Leads nurtured automatically",
    stat: 318,
    suffix: "",
    prefix: "",
    sub: "+12% conversion vs manual",
    detail: "Sequences, scoring, handoffs — zero manual work required.",
  },
  {
    id: 5,
    icon: Shield,
    color: "#ef4444",
    bg: "#fef2f2",
    tag: "Security Audit",
    headline: "Vulnerabilities found & fixed",
    stat: 23,
    suffix: "",
    prefix: "",
    sub: "in a 2-day audit",
    detail: "SQL injection, exposed keys, misconfigured permissions — all closed.",
  },
];

export default function HeroVisual() {
  const [index, setIndex] = useState(0);
  const [tickerKey, setTickerKey] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % cards.length);
      setTickerKey((k) => k + 1);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const active = cards[index];
  const Icon = active.icon;

  const behind1 = cards[(index + 1) % cards.length];
  const behind2 = cards[(index + 2) % cards.length];

  return (
    <div className="relative flex items-center justify-center w-full min-h-[480px] select-none">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 55% 50%, ${active.color}12, transparent 70%)`,
          transition: "background 0.8s ease",
        }}
      />

      {/* Card stack */}
      <div className="relative w-[380px] h-[300px]">

        {/* Card 3 (furthest back) */}
        <motion.div
          animate={{ y: -28, x: 16, scale: 0.88, opacity: 0.35 }}
          transition={{ type: "spring", stiffness: 180, damping: 26 }}
          className="absolute inset-0 rounded-3xl border border-neutral-200 bg-white shadow-sm"
          style={{ background: `${behind2.bg}` }}
        />

        {/* Card 2 (middle) */}
        <motion.div
          animate={{ y: -14, x: 8, scale: 0.94, opacity: 0.6 }}
          transition={{ type: "spring", stiffness: 180, damping: 26 }}
          className="absolute inset-0 rounded-3xl border border-neutral-200 shadow-md"
          style={{ background: `${behind1.bg}` }}
        />

        {/* Front card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 200, damping: 28 }}
            className="absolute inset-0 rounded-3xl border border-neutral-200 shadow-xl bg-white p-7 flex flex-col justify-between overflow-hidden"
          >
            {/* Top glow accent */}
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
              style={{ background: active.color }}
            />

            <div className="flex flex-col gap-4">
              {/* Tag */}
              <div className="flex items-center justify-between">
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: active.bg, color: active.color }}
                >
                  <Icon size={11} />
                  {active.tag}
                </span>
                <ArrowUpRight size={14} className="text-neutral-300" />
              </div>

              {/* Metric */}
              <div>
                <p className="text-xs text-neutral-400 mb-1">{active.headline}</p>
                <div className="text-5xl font-black tracking-tight text-neutral-900 tabular-nums flex items-end gap-0.5">
                  <span style={{ color: active.color }}>{active.prefix}</span>
                  <NumberTicker
                    key={tickerKey}
                    value={active.stat}
                    className="text-5xl font-black tracking-tight"
                    style={{ color: active.color }}
                  />
                  <span className="text-2xl font-bold text-neutral-300 mb-1">{active.suffix}</span>
                </div>
                <p className="text-xs text-neutral-400 mt-1">{active.sub}</p>
              </div>
            </div>

            {/* Bottom detail */}
            <div
              className="rounded-xl px-4 py-3 text-xs leading-relaxed"
              style={{ background: active.bg, color: active.color + "cc" }}
            >
              {active.detail}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1.5">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => { setIndex(i); setTickerKey((k) => k + 1); }}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === index ? 20 : 6,
              height: 6,
              background: i === index ? active.color : "#e5e5e5",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}

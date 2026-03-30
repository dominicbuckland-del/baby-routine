"use client";

import { motion } from "motion/react";
import { BabyEvent } from "@/lib/types";
import { timeAgo } from "@/lib/utils";
import { BottleIcon, MoonIcon, NappyIcon } from "./icons";

interface SummaryCardsProps {
  events: BabyEvent[];
}

export default function SummaryCards({ events }: SummaryCardsProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayEvents = events.filter((e) => new Date(e.timestamp) >= today);
  const feedsToday = todayEvents.filter((e) => e.type === "feed").length;
  const nappyToday = todayEvents.filter((e) => e.type === "nappy").length;

  const lastFeed = events.find((e) => e.type === "feed");
  const lastSleep = events.find((e) => e.type === "sleep");
  const lastNappy = events.find((e) => e.type === "nappy");

  const activeSleep = events.find((e) => e.type === "sleep" && !("endTime" in e && e.endTime));

  const cards = [
    {
      value: feedsToday,
      label: "feeds today",
      sub: lastFeed ? timeAgo(lastFeed.timestamp) : "no feeds yet",
      icon: <BottleIcon className="w-5 h-5" />,
      color: "text-terracotta",
      bg: "bg-terracotta-light",
      border: "border-terracotta/15",
    },
    {
      value: activeSleep ? null : "--",
      label: activeSleep ? "sleeping now" : "awake",
      sub: lastSleep ? timeAgo(lastSleep.timestamp) : "no sleeps yet",
      icon: <MoonIcon className="w-5 h-5" />,
      color: "text-plum",
      bg: "bg-plum-light",
      border: "border-plum/15",
      breathing: !!activeSleep,
    },
    {
      value: nappyToday,
      label: "nappies today",
      sub: lastNappy ? timeAgo(lastNappy.timestamp) : "no changes yet",
      icon: <NappyIcon className="w-5 h-5" />,
      color: "text-sage",
      bg: "bg-sage-light",
      border: "border-sage/15",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2.5">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`${card.bg} border ${card.border} rounded-2xl p-3 text-center relative overflow-hidden`}
        >
          {card.breathing && (
            <div className="absolute inset-0 bg-plum/5 sleep-breathing rounded-2xl" />
          )}
          <div className={`${card.color} flex justify-center mb-1.5 relative`}>
            {card.icon}
          </div>
          <p className={`text-xl font-display font-semibold ${card.color} relative`}>
            {card.value !== null ? card.value : (
              <span className="sleep-breathing inline-block">zzz</span>
            )}
          </p>
          <p className="text-[11px] font-body text-ink-light mt-0.5 relative">{card.label}</p>
          <p className="text-[10px] font-body text-ink-faint mt-1 relative">{card.sub}</p>
        </motion.div>
      ))}
    </div>
  );
}

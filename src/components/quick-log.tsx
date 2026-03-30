"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BabyEvent, FeedMethod, NappyType } from "@/lib/types";
import { generateId } from "@/lib/utils";
import { saveEvent } from "@/lib/storage";
import { BottleIcon, BreastIcon, MoonIcon, NappyIcon, DropletIcon } from "./icons";

interface QuickLogProps {
  onLog: () => void;
}

export default function QuickLog({ onLog }: QuickLogProps) {
  const [activePanel, setActivePanel] = useState<"feed" | "sleep" | "nappy" | null>(null);
  const [justLogged, setJustLogged] = useState<string | null>(null);

  function flash(type: string) {
    setJustLogged(type);
    setTimeout(() => setJustLogged(null), 600);
  }

  function logFeed(method: FeedMethod) {
    const event: BabyEvent = {
      id: generateId(),
      type: "feed",
      timestamp: new Date().toISOString(),
      method,
    };
    saveEvent(event);
    setActivePanel(null);
    flash("feed");
    onLog();
  }

  function logSleep() {
    const event: BabyEvent = {
      id: generateId(),
      type: "sleep",
      timestamp: new Date().toISOString(),
    };
    saveEvent(event);
    setActivePanel(null);
    flash("sleep");
    onLog();
  }

  function logNappy(nappyType: NappyType) {
    const event: BabyEvent = {
      id: generateId(),
      type: "nappy",
      timestamp: new Date().toISOString(),
      nappyType,
    };
    saveEvent(event);
    setActivePanel(null);
    flash("nappy");
    onLog();
  }

  return (
    <div className="space-y-3">
      {/* Main action buttons */}
      <div className="grid grid-cols-3 gap-3">
        <motion.button
          whileTap={{ scale: 0.94, y: 2 }}
          onClick={() => setActivePanel(activePanel === "feed" ? null : "feed")}
          className={`relative flex flex-col items-center gap-2 p-5 rounded-[20px] font-body font-medium transition-colors duration-200 ${
            activePanel === "feed"
              ? "bg-terracotta text-white shadow-[0_8px_24px_-4px_rgba(194,105,74,0.4)]"
              : justLogged === "feed"
              ? "bg-terracotta/20 text-terracotta"
              : "bg-cream-dark text-terracotta hover:bg-terracotta-light border border-terracotta/10"
          }`}
        >
          <BottleIcon className="w-7 h-7" />
          <span className="text-[13px] tracking-wide">Feed</span>
          {justLogged === "feed" && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 rounded-[20px] border-2 border-terracotta"
            />
          )}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.94, y: 2 }}
          onClick={logSleep}
          className={`relative flex flex-col items-center gap-2 p-5 rounded-[20px] font-body font-medium transition-colors duration-200 ${
            justLogged === "sleep"
              ? "bg-plum/20 text-plum"
              : "bg-cream-dark text-plum hover:bg-plum-light border border-plum/10"
          }`}
        >
          <MoonIcon className="w-7 h-7" />
          <span className="text-[13px] tracking-wide">Sleep</span>
          {justLogged === "sleep" && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 rounded-[20px] border-2 border-plum"
            />
          )}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.94, y: 2 }}
          onClick={() => setActivePanel(activePanel === "nappy" ? null : "nappy")}
          className={`relative flex flex-col items-center gap-2 p-5 rounded-[20px] font-body font-medium transition-colors duration-200 ${
            activePanel === "nappy"
              ? "bg-sage text-white shadow-[0_8px_24px_-4px_rgba(94,140,97,0.4)]"
              : justLogged === "nappy"
              ? "bg-sage/20 text-sage"
              : "bg-cream-dark text-sage hover:bg-sage-light border border-sage/10"
          }`}
        >
          <NappyIcon className="w-7 h-7" />
          <span className="text-[13px] tracking-wide">Nappy</span>
          {justLogged === "nappy" && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 rounded-[20px] border-2 border-sage"
            />
          )}
        </motion.button>
      </div>

      {/* Expandable sub-panels */}
      <AnimatePresence mode="wait">
        {activePanel === "feed" && (
          <motion.div
            key="feed-panel"
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="bg-terracotta-light/60 border border-terracotta/10 rounded-2xl p-4 space-y-3 backdrop-blur-sm">
              <p className="text-xs font-display font-medium text-terracotta tracking-wide uppercase">
                How was baby fed?
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { method: "breast-left" as FeedMethod, label: "Left", icon: <BreastIcon className="w-6 h-6" side="left" /> },
                  { method: "breast-right" as FeedMethod, label: "Right", icon: <BreastIcon className="w-6 h-6" side="right" /> },
                  { method: "bottle" as FeedMethod, label: "Bottle", icon: <BottleIcon className="w-6 h-6" /> },
                ].map((opt, i) => (
                  <motion.button
                    key={opt.method}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => logFeed(opt.method)}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/80 text-terracotta font-body text-xs font-medium
                      hover:bg-terracotta hover:text-white transition-colors duration-150
                      shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-terracotta/8"
                  >
                    {opt.icon}
                    {opt.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activePanel === "nappy" && (
          <motion.div
            key="nappy-panel"
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="bg-sage-light/60 border border-sage/10 rounded-2xl p-4 space-y-3 backdrop-blur-sm">
              <p className="text-xs font-display font-medium text-sage tracking-wide uppercase">
                What type?
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { type: "wet" as NappyType, label: "Wet", icon: <DropletIcon className="w-6 h-6" /> },
                  { type: "dirty" as NappyType, label: "Dirty", icon: <NappyIcon className="w-6 h-6" /> },
                  { type: "both" as NappyType, label: "Both", icon: <><DropletIcon className="w-5 h-5" /><span className="text-[8px] opacity-50">+</span></> },
                ].map((opt, i) => (
                  <motion.button
                    key={opt.type}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => logNappy(opt.type)}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/80 text-sage font-body text-xs font-medium
                      hover:bg-sage hover:text-white transition-colors duration-150
                      shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-sage/8"
                  >
                    {opt.icon}
                    {opt.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

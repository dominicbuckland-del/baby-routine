"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { BabyEvent } from "@/lib/types";
import { getEvents } from "@/lib/storage";
import QuickLog from "@/components/quick-log";
import EventList from "@/components/event-list";
import SummaryCards from "@/components/summary-cards";

export default function Home() {
  const [events, setEvents] = useState<BabyEvent[]>([]);
  const [mounted, setMounted] = useState(false);

  const refresh = useCallback(() => {
    setEvents(getEvents());
  }, []);

  useEffect(() => {
    setMounted(true);
    refresh();
  }, [refresh]);

  if (!mounted) {
    return (
      <div className="flex-1 flex items-center justify-center bg-cream">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-6 h-6 border-2 border-ochre border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <main className="flex-1 max-w-md mx-auto w-full px-5 pb-10 pt-8 space-y-7">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <h1 className="font-display text-[28px] font-semibold text-ink tracking-tight leading-tight">
          Baby Routine
        </h1>
        <p className="font-body text-[13px] text-ink-faint mt-1 tracking-wide">
          feeds &middot; sleeps &middot; nappy changes
        </p>
        <div className="mt-3 mx-auto w-12 h-px bg-gradient-to-r from-transparent via-ochre/40 to-transparent" />
      </motion.header>

      {/* Summary */}
      <SummaryCards events={events} />

      {/* Quick log section */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <QuickLog onLog={refresh} />
      </motion.section>

      {/* Activity timeline */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-display text-base font-semibold text-ink-light">
            Activity
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-ink-ghost/30 to-transparent" />
          {events.length > 0 && (
            <span className="font-body text-[11px] text-ink-ghost tabular-nums">
              {events.length} total
            </span>
          )}
        </div>
        <EventList events={events} onUpdate={refresh} />
      </motion.section>
    </main>
  );
}

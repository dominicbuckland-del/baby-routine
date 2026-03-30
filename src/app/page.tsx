"use client";

import { useState, useEffect, useCallback } from "react";
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
      <div className="flex-1 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="flex-1 max-w-md mx-auto w-full px-4 py-6 space-y-6">
      <header className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">Baby Routine</h1>
        <p className="text-sm text-gray-400 mt-1">Track feeds, sleeps &amp; nappy changes</p>
      </header>

      <SummaryCards events={events} />
      <QuickLog onLog={refresh} />

      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Recent Activity
        </h2>
        <EventList events={events} onUpdate={refresh} />
      </section>
    </main>
  );
}

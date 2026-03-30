"use client";

import { motion, AnimatePresence } from "motion/react";
import { BabyEvent, FeedEvent, NappyEvent, SleepEvent } from "@/lib/types";
import { deleteEvent, updateEvent } from "@/lib/storage";
import { formatTime, formatDate, timeAgo, durationBetween } from "@/lib/utils";
import { BottleIcon, BreastIcon, MoonIcon, NappyIcon, DropletIcon, CrossIcon, SunIcon } from "./icons";

interface EventListProps {
  events: BabyEvent[];
  onUpdate: () => void;
}

function FeedDetail({ event }: { event: FeedEvent }) {
  const labels: Record<string, string> = {
    "breast-left": "Left breast",
    "breast-right": "Right breast",
    bottle: "Bottle",
  };
  return <span className="text-[11px] font-body text-ink-faint">{labels[event.method]}</span>;
}

function SleepDetail({ event, onEnd }: { event: SleepEvent; onEnd: () => void }) {
  const isActive = !event.endTime;
  return (
    <div className="flex items-center gap-2">
      {isActive ? (
        <>
          <span className="text-[11px] font-body font-medium text-plum sleep-breathing">
            sleeping...
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onEnd}
            className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-plum text-white font-body font-medium hover:bg-plum-glow transition-colors"
          >
            <SunIcon className="w-3 h-3" />
            Wake
          </motion.button>
        </>
      ) : (
        <span className="text-[11px] font-body text-ink-faint">
          Slept {durationBetween(event.timestamp, event.endTime!)}
        </span>
      )}
    </div>
  );
}

function NappyDetail({ event }: { event: NappyEvent }) {
  const labels: Record<string, string> = { wet: "Wet", dirty: "Dirty", both: "Wet + Dirty" };
  return <span className="text-[11px] font-body text-ink-faint">{labels[event.nappyType]}</span>;
}

function EventIcon({ event }: { event: BabyEvent }) {
  switch (event.type) {
    case "feed":
      return event.method === "bottle"
        ? <BottleIcon className="w-5 h-5" />
        : <BreastIcon className="w-5 h-5" side={event.method === "breast-left" ? "left" : "right"} />;
    case "sleep":
      return event.endTime ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />;
    case "nappy":
      return event.nappyType === "wet" ? <DropletIcon className="w-5 h-5" /> : <NappyIcon className="w-5 h-5" />;
  }
}

const typeStyles = {
  feed: { color: "text-terracotta", bg: "bg-terracotta-light", border: "border-terracotta/12", label: "Feed" },
  sleep: { color: "text-plum", bg: "bg-plum-light", border: "border-plum/12", label: "Sleep" },
  nappy: { color: "text-sage", bg: "bg-sage-light", border: "border-sage/12", label: "Nappy" },
};

export default function EventList({ events, onUpdate }: EventListProps) {
  if (events.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center py-16"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream-dark flex items-center justify-center">
          <MoonIcon className="w-8 h-8 text-ink-ghost" />
        </div>
        <p className="font-display text-lg text-ink-faint italic">Nothing logged yet</p>
        <p className="font-body text-xs text-ink-ghost mt-1">Tap a button above to start tracking</p>
      </motion.div>
    );
  }

  function handleEndSleep(event: SleepEvent) {
    updateEvent({ ...event, endTime: new Date().toISOString() });
    onUpdate();
  }

  function handleDelete(id: string) {
    deleteEvent(id);
    onUpdate();
  }

  const grouped: Record<string, BabyEvent[]> = {};
  for (const event of events) {
    const dateKey = formatDate(event.timestamp);
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(event);
  }

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([dateLabel, dateEvents]) => (
        <div key={dateLabel}>
          <div className="flex items-center gap-3 mb-3">
            <h3 className="font-display text-sm font-semibold text-ink-light italic">
              {dateLabel}
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-ink-ghost/40 to-transparent" />
          </div>

          <div className="timeline-line space-y-2 pl-1">
            <AnimatePresence mode="popLayout">
              {dateEvents.map((event, i) => {
                const style = typeStyles[event.type];
                return (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12, transition: { duration: 0.2 } }}
                    transition={{ delay: i * 0.03, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-3 relative"
                  >
                    {/* Timeline dot */}
                    <div className={`w-[18px] h-[18px] rounded-full ${style.bg} border-2 ${style.border} flex items-center justify-center shrink-0 mt-3 relative z-10`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        event.type === "feed" ? "bg-terracotta" :
                        event.type === "sleep" ? "bg-plum" : "bg-sage"
                      }`} />
                    </div>

                    {/* Event card */}
                    <div className="flex-1 bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-ink-ghost/20 shadow-[0_1px_4px_rgba(45,37,32,0.04)] hover:shadow-[0_2px_8px_rgba(45,37,32,0.08)] transition-shadow duration-200">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`${style.color}`}>
                            <EventIcon event={event} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-baseline gap-2">
                              <span className={`text-sm font-display font-semibold ${style.color}`}>
                                {style.label}
                              </span>
                              <span className="text-[11px] font-body text-ink-ghost">
                                {formatTime(event.timestamp)}
                              </span>
                            </div>
                            {event.type === "feed" && <FeedDetail event={event} />}
                            {event.type === "sleep" && (
                              <SleepDetail event={event} onEnd={() => handleEndSleep(event)} />
                            )}
                            {event.type === "nappy" && <NappyDetail event={event} />}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 mt-0.5">
                          <span className="text-[10px] font-body text-ink-ghost whitespace-nowrap">
                            {timeAgo(event.timestamp)}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={() => handleDelete(event.id)}
                            className="text-ink-ghost hover:text-rose transition-colors p-0.5 rounded-md hover:bg-rose-light"
                            title="Delete"
                          >
                            <CrossIcon className="w-3.5 h-3.5" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
}

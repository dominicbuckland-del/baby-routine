"use client";

import { BabyEvent, FeedEvent, NappyEvent, SleepEvent } from "@/lib/types";
import { deleteEvent, updateEvent } from "@/lib/storage";
import { formatTime, formatDate, timeAgo, durationBetween } from "@/lib/utils";

interface EventListProps {
  events: BabyEvent[];
  onUpdate: () => void;
}

function FeedDetail({ event }: { event: FeedEvent }) {
  const methodLabel: Record<string, string> = {
    "breast-left": "Left breast",
    "breast-right": "Right breast",
    bottle: "Bottle",
  };
  return <span className="text-xs text-gray-500">{methodLabel[event.method]}</span>;
}

function SleepDetail({ event, onEnd }: { event: SleepEvent; onEnd: () => void }) {
  const isActive = !event.endTime;
  return (
    <div className="flex items-center gap-2">
      {isActive ? (
        <>
          <span className="text-xs text-sleep font-medium animate-pulse">Sleeping now...</span>
          <button
            onClick={onEnd}
            className="text-xs px-2 py-0.5 rounded-full bg-sleep text-white font-medium hover:bg-sleep/80 transition-colors"
          >
            Wake up
          </button>
        </>
      ) : (
        <span className="text-xs text-gray-500">
          Slept {durationBetween(event.timestamp, event.endTime!)}
        </span>
      )}
    </div>
  );
}

function NappyDetail({ event }: { event: NappyEvent }) {
  const label: Record<string, string> = { wet: "Wet", dirty: "Dirty", both: "Wet + Dirty" };
  return <span className="text-xs text-gray-500">{label[event.nappyType]}</span>;
}

const eventConfig = {
  feed: { icon: "🍼", bg: "bg-feed-light", text: "text-feed", label: "Feed" },
  sleep: { icon: "😴", bg: "bg-sleep-light", text: "text-sleep", label: "Sleep" },
  nappy: { icon: "👶", bg: "bg-nappy-light", text: "text-nappy", label: "Nappy" },
};

export default function EventList({ events, onUpdate }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-4xl mb-2">📋</p>
        <p className="text-sm">No events yet. Tap a button above to start tracking.</p>
      </div>
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

  // Group events by date
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
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {dateLabel}
          </h3>
          <div className="space-y-2">
            {dateEvents.map((event) => {
              const config = eventConfig[event.type];
              return (
                <div
                  key={event.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm border border-gray-100"
                >
                  <div
                    className={`w-10 h-10 rounded-full ${config.bg} flex items-center justify-center text-lg shrink-0`}
                  >
                    {config.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${config.text}`}>
                        {config.label}
                      </span>
                      <span className="text-xs text-gray-400">{formatTime(event.timestamp)}</span>
                    </div>
                    {event.type === "feed" && <FeedDetail event={event} />}
                    {event.type === "sleep" && (
                      <SleepDetail event={event} onEnd={() => handleEndSleep(event)} />
                    )}
                    {event.type === "nappy" && <NappyDetail event={event} />}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-gray-400">{timeAgo(event.timestamp)}</span>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors p-1"
                      title="Delete"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

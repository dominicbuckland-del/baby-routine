"use client";

import { useState } from "react";
import { BabyEvent, FeedMethod, NappyType } from "@/lib/types";
import { generateId } from "@/lib/utils";
import { saveEvent } from "@/lib/storage";

interface QuickLogProps {
  onLog: () => void;
}

export default function QuickLog({ onLog }: QuickLogProps) {
  const [activePanel, setActivePanel] = useState<"feed" | "sleep" | "nappy" | null>(null);

  function logFeed(method: FeedMethod) {
    const event: BabyEvent = {
      id: generateId(),
      type: "feed",
      timestamp: new Date().toISOString(),
      method,
    };
    saveEvent(event);
    setActivePanel(null);
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
    onLog();
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => setActivePanel(activePanel === "feed" ? null : "feed")}
          className={`flex flex-col items-center gap-1.5 p-4 rounded-2xl font-medium transition-all ${
            activePanel === "feed"
              ? "bg-feed text-white shadow-lg scale-[1.02]"
              : "bg-feed-light text-feed hover:bg-feed/20"
          }`}
        >
          <span className="text-2xl">🍼</span>
          <span className="text-sm">Feed</span>
        </button>

        <button
          onClick={logSleep}
          className="flex flex-col items-center gap-1.5 p-4 rounded-2xl font-medium bg-sleep-light text-sleep hover:bg-sleep/20 transition-all"
        >
          <span className="text-2xl">😴</span>
          <span className="text-sm">Sleep</span>
        </button>

        <button
          onClick={() => setActivePanel(activePanel === "nappy" ? null : "nappy")}
          className={`flex flex-col items-center gap-1.5 p-4 rounded-2xl font-medium transition-all ${
            activePanel === "nappy"
              ? "bg-nappy text-white shadow-lg scale-[1.02]"
              : "bg-nappy-light text-nappy hover:bg-nappy/20"
          }`}
        >
          <span className="text-2xl">👶</span>
          <span className="text-sm">Nappy</span>
        </button>
      </div>

      {activePanel === "feed" && (
        <div className="bg-feed-light rounded-2xl p-4 space-y-2 animate-in">
          <p className="text-sm font-medium text-feed">How was baby fed?</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => logFeed("breast-left")}
              className="p-3 rounded-xl bg-white text-sm font-medium text-feed hover:bg-feed hover:text-white transition-all"
            >
              Left breast
            </button>
            <button
              onClick={() => logFeed("breast-right")}
              className="p-3 rounded-xl bg-white text-sm font-medium text-feed hover:bg-feed hover:text-white transition-all"
            >
              Right breast
            </button>
            <button
              onClick={() => logFeed("bottle")}
              className="p-3 rounded-xl bg-white text-sm font-medium text-feed hover:bg-feed hover:text-white transition-all"
            >
              Bottle
            </button>
          </div>
        </div>
      )}

      {activePanel === "nappy" && (
        <div className="bg-nappy-light rounded-2xl p-4 space-y-2 animate-in">
          <p className="text-sm font-medium text-nappy">What type?</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => logNappy("wet")}
              className="p-3 rounded-xl bg-white text-sm font-medium text-nappy hover:bg-nappy hover:text-white transition-all"
            >
              Wet
            </button>
            <button
              onClick={() => logNappy("dirty")}
              className="p-3 rounded-xl bg-white text-sm font-medium text-nappy hover:bg-nappy hover:text-white transition-all"
            >
              Dirty
            </button>
            <button
              onClick={() => logNappy("both")}
              className="p-3 rounded-xl bg-white text-sm font-medium text-nappy hover:bg-nappy hover:text-white transition-all"
            >
              Both
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

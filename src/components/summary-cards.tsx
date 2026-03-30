"use client";

import { BabyEvent } from "@/lib/types";
import { timeAgo } from "@/lib/utils";

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

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 text-center">
        <p className="text-2xl font-bold text-feed">{feedsToday}</p>
        <p className="text-[11px] text-gray-500 mt-0.5">feeds today</p>
        {lastFeed && (
          <p className="text-[10px] text-gray-400 mt-1">{timeAgo(lastFeed.timestamp)}</p>
        )}
      </div>
      <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 text-center">
        <p className="text-2xl font-bold text-sleep">{activeSleep ? "💤" : "--"}</p>
        <p className="text-[11px] text-gray-500 mt-0.5">
          {activeSleep ? "sleeping" : "awake"}
        </p>
        {lastSleep && (
          <p className="text-[10px] text-gray-400 mt-1">{timeAgo(lastSleep.timestamp)}</p>
        )}
      </div>
      <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 text-center">
        <p className="text-2xl font-bold text-nappy">{nappyToday}</p>
        <p className="text-[11px] text-gray-500 mt-0.5">nappies today</p>
        {lastNappy && (
          <p className="text-[10px] text-gray-400 mt-1">{timeAgo(lastNappy.timestamp)}</p>
        )}
      </div>
    </div>
  );
}

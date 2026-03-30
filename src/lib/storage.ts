import { BabyEvent } from "./types";

const STORAGE_KEY = "baby-routine-events";

export function getEvents(): BabyEvent[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  return JSON.parse(raw) as BabyEvent[];
}

export function saveEvent(event: BabyEvent): void {
  const events = getEvents();
  events.unshift(event);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export function deleteEvent(id: string): void {
  const events = getEvents().filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export function updateEvent(updated: BabyEvent): void {
  const events = getEvents().map((e) => (e.id === updated.id ? updated : e));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

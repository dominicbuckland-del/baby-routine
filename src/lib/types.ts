export type EventType = "feed" | "sleep" | "nappy";

export type FeedMethod = "breast-left" | "breast-right" | "bottle";
export type NappyType = "wet" | "dirty" | "both";

export interface BaseEvent {
  id: string;
  type: EventType;
  timestamp: string; // ISO string
  note?: string;
}

export interface FeedEvent extends BaseEvent {
  type: "feed";
  method: FeedMethod;
  amountMl?: number;
  durationMin?: number;
}

export interface SleepEvent extends BaseEvent {
  type: "sleep";
  endTime?: string; // ISO string, undefined = still sleeping
}

export interface NappyEvent extends BaseEvent {
  type: "nappy";
  nappyType: NappyType;
}

export type BabyEvent = FeedEvent | SleepEvent | NappyEvent;

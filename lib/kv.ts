import { Redis } from "@upstash/redis";

// Upstash Redis connection
// Environment variables: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
export const kv = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
    })
  : null;

// KV keys
export const KV_KEYS = {
  MENU: "cafe:menu",
  SETTINGS: "cafe:settings",
  IMAGES: "cafe:images",
} as const;

import { supabase } from "./SupabaseClient";

/* SUPABASE START */

// Supabase analytics helper for user_events logging.
// This file centralizes event tracking so other components can stay clean.

const VISITOR_ID_KEY = "visitor_id";

const generateVisitorId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `visitor_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const getVisitorId = () => {
  if (typeof window === "undefined") return generateVisitorId();
  const existing = window.localStorage.getItem(VISITOR_ID_KEY);
  if (existing) return existing;
  const next = generateVisitorId();
  window.localStorage.setItem(VISITOR_ID_KEY, next);
  return next;
};

const getUserId = async () => {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data?.session?.user?.id ?? null;
};

const logEvent = async ({ event, contentType, contentKey }) => {
  if (!supabase) return;
  try {
    const visitorId = getVisitorId();
    const userId = await getUserId();
    await supabase.from("user_events").insert({
      visitor_id: visitorId,
      user_id: userId,
      event,
      content_type: contentType,
      content_key: contentKey,
    });
  } catch (error) {
    console.warn("Supabase analytics insert failed:", error);
  }
};

export const trackStoryOpened = (chapterId) =>
  logEvent({
    event: "story_opened",
    contentType: "story_chapter",
    contentKey: String(chapterId),
  });

export const trackQuizStarted = (levelNumber) =>
  logEvent({
    event: "quiz_started",
    contentType: "quiz_level",
    contentKey: String(levelNumber),
  });

export const trackTopicOpened = (topicKey) =>
  logEvent({
    event: "topic_opened",
    contentType: "dictionary_topic",
    contentKey: String(topicKey),
  });

/* SUPABASE END */

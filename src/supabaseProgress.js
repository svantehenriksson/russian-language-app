import { supabase } from "./SupabaseClient";


// Supabase progress helpers for user_progress tracking.
// These functions are the single place that reads/writes progress state.

const getCurrentUserId = async () => {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data?.session?.user?.id ?? null;
};

const fetchProgress = async ({ contentType, contentKey }) => {
  if (!supabase) return 0;
  const userId = await getCurrentUserId();
  if (!userId) return 0;
  const { data, error } = await supabase
    .from("user_progress")
    .select("completed")
    .eq("user_id", userId)
    .eq("content_type", contentType)
    .eq("content_key", contentKey)
    .maybeSingle();
  if (error) {
    console.warn("Supabase progress fetch failed:", error);
    return 0;
  }
  return data?.completed ?? 0;
};

const incrementProgress = async ({ contentType, contentKey }) => {
  if (!supabase) return null;
  const userId = await getCurrentUserId();
  if (!userId) return null;

  const current = await fetchProgress({ contentType, contentKey });
  const nextCompleted = current + 1;

  const { error } = await supabase.from("user_progress").upsert(
    {
      user_id: userId,
      content_type: contentType,
      content_key: contentKey,
      completed: nextCompleted,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,content_type,content_key" },
  );

  if (error) {
    console.warn("Supabase progress increment failed:", error);
    return null;
  }

  return nextCompleted;
};

const setProgressCompleted = async ({ contentType, contentKey, completed }) => {
  if (!supabase) return null;
  const userId = await getCurrentUserId();
  if (!userId) return null;

  const { error } = await supabase.from("user_progress").upsert(
    {
      user_id: userId,
      content_type: contentType,
      content_key: contentKey,
      completed,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,content_type,content_key" },
  );

  if (error) {
    console.warn("Supabase progress update failed:", error);
    return null;
  }

  return completed;
};

export { getCurrentUserId, fetchProgress, incrementProgress, setProgressCompleted };


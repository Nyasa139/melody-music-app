import { supabase } from "../supabase";

/* =========================
   FAVORITES (already yours)
========================= */

export async function addFavorite(song) {
  const user = (await supabase.auth.getUser()).data.user;

  return supabase.from("favorites").insert({
    user_id: user.id,
    title: song.title,
    artist: song.artist,
  });
}

export async function getFavorites() {
  const user = (await supabase.auth.getUser()).data.user;

  const { data } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user.id);

  return data || [];
}

/* =========================
   RECENTLY PLAYED (ADD THIS)
========================= */

export async function addRecentlyPlayed(song) {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return;

  return supabase.from("recently_played").insert({
    user_id: user.id,
    title: song.title,
    artist: song.artist,
    image: song.artwork || song.image,
    preview_url: song.previewUrl,
  });
}

export async function getRecentlyPlayed() {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return [];

  const { data } = await supabase
    .from("recently_played")
    .select("*")
    .eq("user_id", user.id)
    .order("played_at", { ascending: false })
    .limit(8);

  return data || [];
}

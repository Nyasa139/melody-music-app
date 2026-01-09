import { supabase } from "../supabase";

export async function addRecentlyPlayed(song) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !song) return;

  await supabase.from("recently_played").insert({
    user_id: user.id,
    title: song.title,
    artist: song.artist,
    image: song.artwork || song.image || "",
    preview_url: song.previewUrl || "",
  });
}

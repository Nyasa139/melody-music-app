import { supabase } from "../supabase";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  if (!user) return null;

  return (
    <div className="px-10 py-8">
      <h1 className="text-3xl font-bold mb-4">👤 Profile</h1>
      <p>Email: {user.email}</p>
      <p>Provider: {user.app_metadata.provider}</p>
    </div>
  );
}

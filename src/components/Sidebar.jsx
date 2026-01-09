import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Search,
  Heart,
  ListMusic,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { supabase } from "../supabase";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout failed:", error.message);
      return;
    }

    navigate("/login"); // redirect after logout
  };

  const linkClass =
    "flex items-center gap-4 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition";

  const activeClass = "bg-green-500/10 text-green-400";

  return (
    <aside className="w-64 bg-black p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold">Melody</h1>
        <p className="text-sm text-gray-400">
          Let the music flow 
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        <NavLink to="/" className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : ""}`
        }>
          <Home size={20} /> Home
        </NavLink>

        <NavLink to="/search" className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : ""}`
        }>
          <Search size={20} /> Search
        </NavLink>

        <NavLink to="/favorites" className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : ""}`
        }>
          <Heart size={20} /> Favorites
        </NavLink>

        <NavLink to="/playlists" className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : ""}`
        }>
          <ListMusic size={20} /> Playlists
        </NavLink>

        <NavLink to="/profile" className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : ""}`
        }>
          <User size={20} /> Profile
        </NavLink>

        <NavLink to="/settings" className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : ""}`
        }>
          <Settings size={20} /> Settings
        </NavLink>
      </nav>

      <div className="flex-1" />

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="mt-6 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-green-500 text-black font-semibold hover:scale-105 transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}

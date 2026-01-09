import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null; // 🚨 hide sidebar if not logged in

  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#1db954" : "#b3b3b3",
    textDecoration: "none",
    fontWeight: 600
  });

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <aside
      style={{
        width: 240,
        background: "#000",
        padding: 20
      }}
    >
      <h1 style={{ color: "#1db954", marginBottom: 30 }}>🎵 MELODY</h1>

      <nav style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <NavLink to="/" style={linkStyle}>🏠 Home</NavLink>
        <NavLink to="/search" style={linkStyle}>🔍 Search</NavLink>
        <NavLink to="/music" style={linkStyle}>🎵 Music</NavLink>
        <NavLink to="/podcast" style={linkStyle}>🎙 Podcast</NavLink>
        <NavLink to="/favorites" style={linkStyle}>❤️ Favorites</NavLink>
      </nav>

      <button style={{ marginTop: 30 }} onClick={logout}>
        Logout
      </button>
    </aside>
  );
}

export default Header;

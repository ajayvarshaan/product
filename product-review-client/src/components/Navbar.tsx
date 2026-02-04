import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (["/login", "/register"].includes(location.pathname)) return null;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "1rem", display: "flex", justifyContent: "center", pointerEvents: "none" }}>
      <nav className="glass-panel" style={{ pointerEvents: "auto", width: "100%", maxWidth: "1000px", padding: "0.75rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: scrolled ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.65)", transition: "all 0.3s ease" }}>
        
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "36px", height: "36px", background: "linear-gradient(135deg, #4f46e5, #818cf8)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "1.2rem" }}>
            🛍️
          </div>
          <span style={{ fontSize: "1.1rem", fontWeight: "800", color: "#1e293b", letterSpacing: "-0.5px" }}>MarketHub</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Link to="/cart" className="btn" style={{ background: "transparent", color: "#4f46e5", padding: "0.5rem", fontSize: "1.2rem", position: "relative" }}>
             🛒
          </Link>
          <Link to="/profile" className="btn" style={{ background: "transparent", color: "#64748b", padding: "0.5rem 0.75rem", fontSize: "0.9rem" }}>Dashboard</Link>
          <Link to="/add-product" className="btn btn-primary" style={{ padding: "0.5rem 1rem", borderRadius: "8px", fontSize: "0.9rem" }}>+ New</Link>
          <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }} style={{ background: "#fee2e2", border: "none", width: "36px", height: "36px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444" }}>➜</button>
        </div>
      </nav>
    </div>
  );
}
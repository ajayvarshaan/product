import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    setIsLoading(true);
    try {
      const res = await API.post("/users/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch {
      alert("Invalid credentials");
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{ 
        position: "absolute", 
        width: "600px", 
        height: "600px", 
        background: "radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, transparent 70%)", 
        top: "-10%", 
        left: "-10%",
        zIndex: 0 
      }} />

      <div className="glass-panel animate-in" style={{ 
        width: "100%", 
        maxWidth: "420px", 
        padding: "3rem", 
        position: "relative", 
        zIndex: 1,
        border: "1px solid rgba(255,255,255,0.8)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>👋</div>
          <h2 style={{ fontSize: "1.75rem", fontWeight: "800", color: "#1e293b", margin: 0 }}>Welcome Back</h2>
          <p style={{ color: "#64748b", marginTop: "0.5rem" }}>Enter your credentials to access your account.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "600", color: "#334155" }}>Email</label>
            <input 
              className="input-field" 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "600", color: "#334155" }}>Password</label>
            <input 
              className="input-field" 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button 
            className="btn btn-primary" 
            onClick={login}
            disabled={isLoading}
            style={{ marginTop: "0.5rem", width: "100%", padding: "1rem" }}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </div>

        <div style={{ marginTop: "2rem", textAlign: "center", fontSize: "0.9rem", color: "#64748b" }}>
          Don't have an account? <Link to="/register" style={{ color: "#4f46e5", fontWeight: "600", textDecoration: "none" }}>Create one</Link>
        </div>
      </div>
    </div>
  );
}
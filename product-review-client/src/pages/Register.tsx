import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);

  const register = async () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      await API.post("/users/register", { name, email, password });
      navigate("/login");
    } catch (err) {
      alert("Registration failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4" style={{
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
      backgroundAttachment: "fixed",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      {/* Background decorative elements */}
      <div style={{
        position: "fixed",
        top: "10%",
        left: "10%",
        width: "100px",
        height: "100px",
        background: "radial-gradient(circle, rgba(99, 102, 241, 0.1), transparent)",
        borderRadius: "50%",
        pointerEvents: "none",
        display: "none"
      }} className="desktop-decoration"></div>
      <div style={{
        position: "fixed",
        bottom: "10%",
        right: "10%",
        width: "150px",
        height: "150px",
        background: "radial-gradient(circle, rgba(16, 185, 129, 0.1), transparent)",
        borderRadius: "50%",
        pointerEvents: "none",
        display: "none"
      }} className="desktop-decoration"></div>

      <div ref={formRef} className="glass-panel animate-scale-in" style={{
        maxWidth: "420px",
        width: "100%",
        padding: "2rem",
        backgroundColor: "#ffffff",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 20px -10px rgba(0, 0, 0, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.8)",
        position: "relative",
        zIndex: 10
      }}>
        <h2 className="text-center mb-2 animate-slide-down" style={{ 
          fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
          fontWeight: "800",
          background: "linear-gradient(135deg, #2563eb, #06b6d4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animationDelay: "0.1s"
        }}>✨ Create Account</h2>
        <p className="text-center mb-6 animate-fade-in-up" style={{ 
          color: "#64748b", 
          fontSize: "clamp(0.875rem, 2vw, 1rem)",
          animationDelay: "0.2s" 
        }}>Join us to review products</p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <div className="form-group">
            <label className="form-label" style={{ color: "#1e293b" }}>👤 Full Name</label>
            <input 
              className="input-field" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="John Doe"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ color: "#1e293b" }}>📧 Email Address</label>
            <input 
              type="email"
              className="input-field" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="your@email.com"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ color: "#1e293b" }}>🔒 Password</label>
            <input 
              type="password"
              className="input-field" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          <button 
            className="btn btn-primary"
            onClick={register}
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "1rem",
              fontSize: "1rem",
              fontWeight: "600",
              marginTop: "0.5rem"
            }}
          >
            {isLoading ? "Creating Account..." : "🚀 Create Account"}
          </button>

          <p style={{ 
            textAlign: "center", 
            marginTop: "1.5rem", 
            fontSize: "clamp(0.8rem, 2vw, 0.95rem)",
            color: "#1e293b"
          }}>
            Already have an account?{" "}
            <Link 
              to="/login" 
              style={{ 
                color: "#2563eb", 
                fontWeight: "600",
                textDecoration: "none",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#1d4ed8"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#2563eb"}
            >
              Sign in here 🔐
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .desktop-decoration {
            display: none !important;
          }

          .glass-panel {
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
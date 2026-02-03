import React from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
}

export default function DeleteModal({ isOpen, onClose, onConfirm, itemName = "this item" }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      animation: "fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    }}>
      <div className="glass-panel" style={{
        padding: "2.5rem",
        maxWidth: "420px",
        width: "90%",
        textAlign: "center",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        animation: "slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
      }}>
        <div style={{ 
          fontSize: "4rem", 
          marginBottom: "1.5rem",
          animation: "bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
          display: "inline-block"
        }}>⚠️</div>
        
        <h3 style={{ 
          color: "#1e293b", 
          marginBottom: "0.75rem",
          fontSize: "1.75rem",
          fontWeight: "700",
          animation: "fadeInUp 0.5s ease-out 0.1s backwards"
        }}>Remove Product?</h3>
        
        <p style={{ 
          color: "#64748b", 
          marginBottom: "2.5rem",
          fontSize: "0.95rem",
          lineHeight: "1.6",
          animation: "fadeInUp 0.5s ease-out 0.2s backwards"
        }}>
          You're about to delete <strong style={{ color: "#ef4444", fontWeight: "600" }}>"{itemName}"</strong>. This cannot be undone.
        </p>
        
        <div style={{ 
          display: "flex", 
          gap: "1rem", 
          justifyContent: "center",
          animation: "fadeInUp 0.5s ease-out 0.3s backwards"
        }}>
          <button 
            onClick={onClose}
            className="btn btn-secondary"
            style={{ 
              flex: 1,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            Keep It
          </button>
          
          <button 
            onClick={onConfirm}
            className="btn btn-danger"
            style={{ 
              flex: 1,
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              color: "white",
              border: "none",
              fontWeight: "600",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 15px 30px rgba(239, 68, 68, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            Yes, Delete
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
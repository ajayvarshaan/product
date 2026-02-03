import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const add = async () => {
    if (!name || !price) {
      alert("Please fill in all required fields");
      return;
    }
    
    setIsLoading(true);
    try {
      await API.post("/products", { name, price: Number(price), description });
      navigate("/");
    } catch (error) {
      alert("Failed to add product. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "2rem 1rem", minHeight: "calc(100vh - 70px)" }}>
      <div className="glass-panel form-container" style={{ width: "100%", maxWidth: "500px", padding: "2rem" }}>
        <h2 className="form-title" style={{ textAlign: "center", marginBottom: "2rem" }}>➕ Add New Product</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="form-group">
            <label className="form-label">Product Name *</label>
            <input 
              className="input-field" 
              placeholder="Enter product name" 
              value={name} 
              onChange={e => setName(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Price (₹) *</label>
            <input 
              className="input-field" 
              placeholder="Enter price" 
              type="number" 
              value={price} 
              onChange={e => setPrice(e.target.value)}
              disabled={isLoading}
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea 
              className="input-field" 
              placeholder="Enter product description" 
              rows={4} 
              value={description} 
              onChange={e => setDescription(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <button 
            className="btn btn-primary" 
            onClick={add}
            disabled={isLoading}
            style={{ padding: "1rem", width: "100%", fontSize: "1rem", fontWeight: "600" }}
          >
            {isLoading ? "Creating..." : "✓ Create Product"}
          </button>

          <button 
            className="btn btn-secondary" 
            onClick={() => navigate("/")}
            style={{ padding: "0.8rem", width: "100%", fontSize: "0.9rem" }}
          >
            ← Back to Products
          </button>
        </div>
      </div>
    </div>
  );
}
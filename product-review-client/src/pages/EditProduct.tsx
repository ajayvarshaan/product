import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch current details
    API.get("/products").then(res => {
      const p = res.data.find((x: any) => x._id === id);
      if(p) {
        setName(p.name);
        setPrice(p.price);
        setDescription(p.description);
      }
    });
  }, [id]);

  const update = async () => {
    setIsLoading(true);
    try {
      await API.put(`/products/${id}`, { name, price, description });
      navigate("/profile"); 
    } catch (error) {
      alert("Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
      <div className="glass-panel form-container" style={{ width: "100%", maxWidth: "500px", padding: "2rem" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "#1e293b" }}>✏️ Edit Product</h2>
        
        <div className="form-group">
          <label className="form-label">Name</label>
          <input className="input-field" value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label className="form-label">Price</label>
          <input className="input-field" type="number" value={price} onChange={e => setPrice(e.target.value)} />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea className="input-field" rows={4} value={description} onChange={e => setDescription(e.target.value)} />
        </div>

        <button className="btn btn-primary" onClick={update} disabled={isLoading} style={{ width: "100%", marginTop: "1rem" }}>
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
        
        <button 
          className="btn btn-secondary" 
          onClick={() => navigate("/profile")} 
          style={{ width: "100%", marginTop: "0.5rem" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
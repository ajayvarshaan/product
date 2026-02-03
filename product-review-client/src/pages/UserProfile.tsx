import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import DeleteModal from "../components/DeleteModal"; // Import the modal

export default function UserProfile() {
  const [user, setUser] = useState<any>(null);
  const [myProducts, setMyProducts] = useState<any[]>([]);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/users/profile");
      setUser(data.user);
      setMyProducts(data.products);
    } catch (error) {
      alert("Error loading profile");
    }
  };

  // 1. Triggered when user clicks "Delete" on a card
  const initiateDelete = (product: any) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  // 2. Triggered when user clicks "Confirm" in the modal
  const confirmDelete = async () => {
    if (!productToDelete) return;
    
    try {
      await API.delete(`/products/${productToDelete._id}`);
      setMyProducts(myProducts.filter((p) => p._id !== productToDelete._id));
      setIsModalOpen(false);
      setProductToDelete(null);
    } catch (err) {
      alert("Failed to delete");
      setIsModalOpen(false);
    }
  };

  if (!user) return <div className="spinner"></div>;

  return (
    <div className="container animate-fade-in" style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
      {/* Profile Header */}
      <div className="glass-panel" style={{ padding: "2rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "2rem" }}>
        <div style={{ fontSize: "4rem" }}>👤</div>
        <div>
          <h2 style={{ margin: 0, color: "#1e293b" }}>{user.name}</h2>
          <p style={{ color: "#64748b", margin: "0.5rem 0" }}>{user.email}</p>
          <div className="badge" style={{ background: "#2563eb", color: "white", padding: "0.25rem 0.75rem", borderRadius: "20px", display: "inline-block", fontSize: "0.8rem" }}>
            Member
          </div>
        </div>
      </div>

      <h3 style={{ borderBottom: "2px solid #e2e8f0", paddingBottom: "1rem", marginBottom: "1.5rem", color: "#374151" }}>
        📦 My Listed Products ({myProducts.length})
      </h3>

      {myProducts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem", color: "#6b7280" }}>
          <p>You haven't listed any products yet.</p>
          <Link to="/add-product" className="btn btn-primary" style={{ marginTop: "1rem", textDecoration: "none" }}>
            Add Product
          </Link>
        </div>
      ) : (
        <div className="product-grid">
          {myProducts.map((product) => (
            <div key={product._id} style={{ position: "relative" }}>
              {/* Pass initiateDelete instead of direct delete */}
              <ProductCard 
                product={product} 
                onDelete={() => initiateDelete(product)} 
              />
              
              <Link
                to={`/edit-product/${product._id}`}
                className="btn btn-secondary"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  zIndex: 10,
                  padding: "0.4rem 0.8rem",
                  fontSize: "0.8rem",
                  textDecoration: "none"
                }}
              >
                ✏️ Edit
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Render the Modal */}
      <DeleteModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={productToDelete?.name}
      />
    </div>
  );
}
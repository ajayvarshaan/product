import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import DeleteModal from "../components/DeleteModal";
import type { Product } from "../types/Product";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const fetchProducts = (searchTerm = "") => {
    setIsLoading(true);
    const query = searchTerm ? `?keyword=${searchTerm}` : "";
    API.get(`/products${query}`).then(res => {
      setProducts(res.data);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(keyword);
  };

  return (
    <div className="container" style={{ paddingTop: "2rem" }}>
      {/* Hero Section */}
      <div className="animate-in" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 4rem auto" }}>
        <h1 className="hero-title" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "1rem" }}>
          Market Hub
        </h1>
        <p style={{ color: "#64748b", fontSize: "1.1rem", marginBottom: "2.5rem", lineHeight: "1.6" }}>
          Discover the latest community-curated products. <br />
          Browse, review, and find your next favorite item.
        </p>
        
        <form onSubmit={handleSearch} style={{ position: "relative", maxWidth: "600px", margin: "0 auto" }}>
          <div className="glass-panel" style={{ padding: "0.5rem", borderRadius: "100px", display: "flex", alignItems: "center" }}>
            <span style={{ paddingLeft: "1.5rem", fontSize: "1.2rem", opacity: 0.5 }}>🔍</span>
            <input 
              type="text" 
              placeholder="Search products..." 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ 
                border: "none", 
                background: "transparent", 
                flex: 1, 
                padding: "1rem", 
                fontSize: "1rem", 
                outline: "none",
                color: "#1e293b"
              }}
            />
            <button type="submit" className="btn btn-primary" style={{ borderRadius: "100px", padding: "0.8rem 2rem" }}>
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "4rem" }}>
           <div className="spinner"></div>
           <p style={{ marginTop: "1rem", color: "#94a3b8" }}>Loading marketplace...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="glass-panel animate-in" style={{ padding: "4rem", textAlign: "center", maxWidth: "500px", margin: "0 auto" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🏜️</div>
          <h3>No items found</h3>
          <p style={{ color: "#64748b" }}>Try searching for something else or add a new product.</p>
        </div>
      ) : (
        <div className="grid-layout" style={{ gap: "2.5rem", paddingBottom: "4rem" }}>
          {products.map((p, i) => (
            <div key={p._id} className="animate-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <ProductCard 
                product={p} 
                onDelete={() => { setProductToDelete(p); setIsModalOpen(true); }} 
              />
            </div>
          ))}
        </div>
      )}

      <DeleteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onConfirm={async () => {
          if (!productToDelete) return;
          try {
            await API.delete(`/products/${productToDelete._id}`);
            setProducts(products.filter(p => p._id !== productToDelete._id));
            setIsModalOpen(false);
          } catch { setIsModalOpen(false); }
        }}
        itemName={productToDelete?.name}
      />
    </div>
  );
}
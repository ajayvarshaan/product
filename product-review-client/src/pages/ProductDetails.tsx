import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import StarRating from "../components/StarRating";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch product
    API.get(`/products`).then(res => {
      const p = res.data.find((x: any) => x._id === id);
      setProduct(p);
    });

    // Check if liked
    API.get("/users/profile").then(res => {
      const wishlist = res.data.user.wishlist.map((item: any) => item._id);
      if (wishlist.includes(id)) setIsLiked(true);
    });
  }, [id]);

  const toggleLike = async () => {
    try {
      await API.post("/users/wishlist", { productId: id });
      setIsLiked(!isLiked);
    } catch { alert("Action failed"); }
  };

  const addToCart = async () => {
    setLoading(true);
    try {
      await API.post("/users/cart", { productId: id, quantity: 1 });
      navigate("/cart");
    } catch { alert("Failed to add to cart"); }
    finally { setLoading(false); }
  };

  const addReview = async () => {
    if (rating === 0) return alert("Select a rating!");
    try {
      const res = await API.post(`/products/${id}/reviews`, { rating, comment, name: "User" });
      setProduct(res.data);
      setComment("");
      setRating(0);
    } catch { alert("Failed to review"); }
  };

  if (!product) return <div className="container" style={{ textAlign: "center", paddingTop: "4rem" }}><div className="spinner"></div></div>;

  return (
    <div className="container" style={{ maxWidth: "1100px", paddingBottom: "4rem" }}>
      <button onClick={() => navigate(-1)} className="btn" style={{ marginBottom: "2rem", color: "#64748b", paddingLeft: 0, background: "transparent" }}>← Back</button>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "3rem", marginBottom: "4rem" }}>
        <div className="glass-panel animate-in" style={{ padding: "1rem", height: "400px", display: "flex", alignItems: "center", justifyContent: "center", background: "white", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #dbeafe 0%, #f8fafc 100%)", opacity: 0.5 }} />
          <div style={{ fontSize: "8rem", filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.15))" }}>📦</div>
        </div>

        <div className="animate-in" style={{ animationDelay: "0.2s", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#1e293b", marginBottom: "1rem" }}>{product.name}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
            <span style={{ fontSize: "2rem", fontWeight: "700", color: "#4f46e5" }}>₹{product.price}</span>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <StarRating value={Number(product.rating)} readOnly={true} />
              <span style={{ color: "#64748b" }}>({product.numReviews} reviews)</span>
            </div>
          </div>
          <div className="glass-panel" style={{ padding: "1.5rem", marginBottom: "2rem", background: "rgba(255,255,255,0.5)" }}>
            <p style={{ color: "#475569", lineHeight: "1.7", margin: 0 }}>{product.description}</p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button className="btn btn-primary" onClick={addToCart} disabled={loading} style={{ flex: 1 }}>{loading ? "Adding..." : "Add to Cart"}</button>
            <button className="btn btn-secondary" onClick={toggleLike} style={{ width: "60px", fontSize: "1.5rem", color: isLiked ? "#ef4444" : "#cbd5e1", borderColor: isLiked ? "#ef4444" : "#e2e8f0" }}>{isLiked ? "❤" : "♡"}</button>
          </div>
        </div>
      </div>
      
      {/* Reviews (Keep existing review code below) */}
      <div className="glass-panel animate-in" style={{ padding: "3rem" }}>
        <h3 style={{ marginBottom: "2rem" }}>Reviews</h3>
        <div style={{ marginBottom: "2rem" }}>
          <StarRating value={rating} onChange={setRating} readOnly={false} />
          <textarea className="input-field" value={comment} onChange={e => setComment(e.target.value)} placeholder="Write a review..." style={{ marginTop: "1rem", marginBottom: "1rem" }} />
          <button className="btn btn-primary" onClick={addReview}>Submit Review</button>
        </div>
        {product.reviews.map((r: any, i: number) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.5)", padding: "1rem", borderRadius: "12px", marginBottom: "1rem" }}>
            <strong>{r.name || "User"}</strong> <StarRating value={r.rating} readOnly={true} />
            <p>{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
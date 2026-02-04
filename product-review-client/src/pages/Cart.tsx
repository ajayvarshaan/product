import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => { fetchCart(); }, []);

  const fetchCart = async () => {
    try {
      const { data } = await API.get("/users/profile");
      setCart(data.user.cart);
      calculateTotal(data.user.cart);
      setIsLoading(false);
    } catch { setIsLoading(false); }
  };

  const calculateTotal = (items: any[]) => {
    const sum = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    setTotal(sum);
  };

  const removeFromCart = async (productId: string) => {
    try {
      await API.delete(`/users/cart/${productId}`);
      const newCart = cart.filter(item => item.product._id !== productId);
      setCart(newCart);
      calculateTotal(newCart);
    } catch { alert("Error removing item"); }
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      // Create Order & Clear Cart (handled by backend)
      await API.post("/orders");
      // Redirect to Orders Page
      navigate("/orders"); 
    } catch (error) {
      alert("Checkout failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (isLoading) return <div className="container" style={{ textAlign: "center", paddingTop: "4rem" }}><div className="spinner"></div></div>;

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      <h1 className="hero-title" style={{ textAlign: "center", marginBottom: "2rem" }}>Your Cart</h1>

      {cart.length === 0 ? (
        <div className="glass-panel animate-in" style={{ padding: "4rem", textAlign: "center", maxWidth: "500px", margin: "0 auto" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🛒</div>
          <h3>Your cart is empty</h3>
          <Link to="/" className="btn btn-primary" style={{ marginTop: "1.5rem", textDecoration: "none" }}>Start Shopping</Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {cart.map((item, index) => (
              <div key={item._id} className="glass-panel animate-in" style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.5rem", animationDelay: `${index * 0.1}s` }}>
                <div style={{ width: "80px", height: "80px", background: "#f1f5f9", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>📦</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "0.25rem" }}>{item.product.name}</h3>
                  <p style={{ color: "#64748b", margin: 0 }}>Qty: {item.quantity}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontWeight: "700", fontSize: "1.1rem", color: "#4f46e5", marginBottom: "0.5rem" }}>₹{item.product.price * item.quantity}</p>
                  <button onClick={() => removeFromCart(item.product._id)} className="btn" style={{ padding: "0.4rem", color: "#ef4444", background: "rgba(239,68,68,0.1)" }}>🗑️</button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="glass-panel animate-in" style={{ padding: "2rem", position: "sticky", top: "100px" }}>
              <h3 style={{ marginBottom: "1.5rem", fontSize: "1.5rem" }}>Order Summary</h3>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", color: "#64748b" }}><span>Subtotal</span><span>₹{total}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", color: "#64748b" }}><span>Shipping</span><span>Free</span></div>
              <div style={{ height: "1px", background: "#e2e8f0", margin: "1rem 0" }}></div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem", fontSize: "1.25rem", fontWeight: "700" }}><span>Total</span><span>₹{total}</span></div>
              
              <button 
                className="btn btn-primary" 
                style={{ width: "100%", padding: "1rem" }}
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? "Processing..." : "Checkout Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
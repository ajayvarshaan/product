import { useEffect, useState } from "react";
import API from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.get("/orders/myorders")
      .then((res) => {
        setOrders(res.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="container" style={{ textAlign: "center", paddingTop: "4rem" }}><div className="spinner"></div></div>;

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      <h1 className="hero-title" style={{ textAlign: "center", marginBottom: "2rem" }}>My Orders</h1>

      {orders.length === 0 ? (
        <div className="glass-panel animate-in" style={{ padding: "3rem", textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📜</div>
          <h3>No orders found</h3>
          <p style={{ color: "#64748b" }}>You haven't purchased anything yet.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "800px", margin: "0 auto" }}>
          {orders.map((order, i) => (
            <div key={order._id} className="glass-panel animate-in" style={{ padding: "1.5rem", animationDelay: `${i * 0.1}s` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", borderBottom: "1px solid #e2e8f0", paddingBottom: "1rem" }}>
                <div>
                  <h4 style={{ margin: 0, color: "#1e293b" }}>Order #{order._id.substring(order._id.length - 6).toUpperCase()}</h4>
                  <span style={{ fontSize: "0.85rem", color: "#64748b" }}>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                   <span style={{ background: "#dcfce7", color: "#166534", padding: "0.25rem 0.75rem", borderRadius: "100px", fontSize: "0.85rem", fontWeight: "600" }}>
                    {order.status}
                  </span>
                  <div style={{ marginTop: "0.5rem", fontWeight: "700", color: "#4f46e5" }}>₹{order.totalPrice}</div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {order.orderItems.map((item: any, idx: number) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem", color: "#334155" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span>📦</span> 
                      <span>{item.name} <span style={{ color: "#94a3b8" }}>x{item.quantity}</span></span>
                    </div>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch Cart
  useEffect(() => {
    API.get("/users/cart")
      .then((res) => {
        setCart(res.data);
        calculateTotal(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const calculateTotal = (items: any[]) => {
    const sum = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    setTotal(sum);
  };

  // --- CHECKOUT FUNCTION ---
  const handleCheckout = async () => {
    setLoading(true);
    try {
      await API.post("/orders"); // Calls the backend to create order
      alert("Order Placed Successfully!");
      navigate("/orders"); // Send user to Orders page
    } catch (error) {
      console.error(error);
      alert("Checkout Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ marginTop: "2rem" }}>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty</p> : (
        <div>
          {cart.map((item) => (
            <div key={item._id} style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
              <h4>{item.product.name}</h4>
              <p>Quantity: {item.quantity} x ₹{item.product.price}</p>
            </div>
          ))}
          
          <h3>Total: ₹{total}</h3>
          
          <button 
            onClick={handleCheckout} 
            disabled={loading}
            style={{ padding: "10px 20px", background: "blue", color: "white", border: "none", cursor: "pointer" }}
          >
            {loading ? "Processing..." : "Checkout Now"}
          </button>
        </div>
      )}
    </div>
  );
}
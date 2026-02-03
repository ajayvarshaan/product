import Order from "../models/Order.js";
import User from "../models/User.js";

// @desc    Create new order & Clear Cart
// @route   POST /api/orders
export const addOrderItems = async (req, res) => {
  try {
    // 1. Find the user
    const user = await User.findById(req.user).populate("cart.product");

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    // 2. Prepare items for the order
    const orderItems = user.cart.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    }));

    // 3. Calculate Total
    const totalPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // 4. Save the Order
    const order = new Order({
      user: req.user,
      orderItems,
      totalPrice,
      isPaid: true,
      paidAt: Date.now(),
    });
    const createdOrder = await order.save();

    // 5. Clear the User's Cart
    user.cart = [];
    await user.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error("Order Create Error:", error);
    res.status(500).json({ message: "Order creation failed" });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};
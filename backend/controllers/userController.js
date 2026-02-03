import User from "../models/User.js";
import Product from "../models/Product.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });
  res.json(user);
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user)
      .select("-password")
      .populate("wishlist")
      .populate("cart.product");
    
    if (user) {
      const myProducts = await Product.find({ user: user._id });
      res.json({ user, products: myProducts });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// Toggle Wishlist
export const toggleWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const { productId } = req.body;

    const index = user.wishlist.indexOf(productId);
    if (index === -1) {
      user.wishlist.push(productId); // Add
    } else {
      user.wishlist.splice(index, 1); // Remove
    }
    
    await user.save();
    res.json(user.wishlist);
  } catch (error) {
    res.status(400).json({ message: "Error updating wishlist" });
  }
};

// Add to Cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const user = await User.findById(req.user);
    
    const cartItem = user.cart.find(item => item.product.toString() === productId);

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.json(user.cart);
  } catch (error) {
    res.status(400).json({ message: "Error adding to cart" });
  }
};

// Remove from Cart
export const removeFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    user.cart = user.cart.filter(item => item.product.toString() !== req.params.id);
    await user.save();
    res.json(user.cart);
  } catch (error) {
    res.status(400).json({ message: "Error removing from cart" });
  }
};
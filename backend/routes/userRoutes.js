import express from "express";
import { register, login, getUserProfile, toggleWishlist, addToCart, removeFromCart } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getUserProfile);
router.post("/wishlist", protect, toggleWishlist);
router.post("/cart", protect, addToCart);
router.delete("/cart/:id", protect, removeFromCart);

export default router;
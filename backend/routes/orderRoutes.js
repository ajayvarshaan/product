import express from "express";
import { addOrderItems, getMyOrders } from "../controllers/orderController.js";
import { protect } from "../middleware/auth.js"; // Ensure you have this middleware

const router = express.Router();

router.post("/", protect, addOrderItems);
router.get("/myorders", protect, getMyOrders);

export default router;
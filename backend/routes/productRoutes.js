import express from "express";
import { protect } from "../middleware/auth.js";
import {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  addReview
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, addProduct);
router.put("/:id", protect, updateProduct); 
router.delete("/:id", protect, deleteProduct);
router.post("/:id/reviews", protect, addReview);

export default router;
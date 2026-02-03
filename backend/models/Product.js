import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  name: String,
  rating: Number,
  comment: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reviews: [reviewSchema],
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 }
});

export default mongoose.model("Product", productSchema);

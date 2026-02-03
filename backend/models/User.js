import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 }
    }
  ]
});

export default mongoose.model("User", userSchema);
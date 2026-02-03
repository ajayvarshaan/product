import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: "Processing" },
  paymentMethod: { type: String, default: "Credit Card (Demo)" },
  isPaid: { type: Boolean, default: true },
  paidAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
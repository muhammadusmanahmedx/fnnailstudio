import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: "user" },

  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "product" }, // ✅ ObjectId
      quantity: { type: Number, required: true },
      color: { type: String, required: false }, // Color name or descriptor
      colorHex: { type: String, required: false }, // Raw hex value when available
    }
  ],

  amount: { type: Number, required: true },

  address: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "address" }, // ✅ ObjectId

  status: { type: String, required: true, default: "pending" },
  date: { type: Number, required: true, default: Date.now },
});

const Order = mongoose.models.order || mongoose.model("order", orderSchema);

export default Order;

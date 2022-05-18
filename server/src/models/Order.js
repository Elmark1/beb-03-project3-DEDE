import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user1_id: { type: mongoose.ObjectId, required: true, ref: "User" },
  user2_id: { type: mongoose.ObjectId, required: true, ref: "User" },
  user3_id: { type: mongoose.ObjectId, ref: "User" },
  status: { type: String, default: "Pending" },
  orderedMenu: [{ type: Object, required: true }],
});

const Order = mongoose.model("Order", orderSchema);

export default Order;

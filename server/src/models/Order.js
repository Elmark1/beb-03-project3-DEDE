import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user1_id: { type: String, required: true },
  user2_id: { type: String, required: true },
  user3_id: { type: String },
  status: { type: String, default: "Pending" },
  orderedMenu: [{ type: Object, required: true }],
});

const Order = mongoose.Model("Order", orderSchema);

export default Order;

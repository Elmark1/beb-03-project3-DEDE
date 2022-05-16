import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  user_id: { type: mongoose.ObjectId, required: true },
  menuName: { type: String, required: true },
  menuPrice: { type: Number, required: true },
  menuDescription: { type: String, required: true },
});

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;

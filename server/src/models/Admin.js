import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  adminType: {type: String, required: true},
  address: {type: String, required: true},
  privateKey: {type: String, required: true}
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;

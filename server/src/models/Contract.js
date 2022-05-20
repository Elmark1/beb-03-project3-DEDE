import mongoose from "mongoose";

const contractSchema = new mongoose.Schema({
  contractType: {type: String, required: true},
  address: {type: String, required: true}
});

const Contract = mongoose.model("Contract", contractSchema);

export default Contract;

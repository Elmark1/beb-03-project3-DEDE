import mongoose from "mongoose";

const customMadeNft = new mongoose.Schema({
  user_id: { type: mongoose.ObjectId, required: true, ref: "User" },
  nftName: { type: String, required: true },
  discountRate: { type: Number, required: true },
  nftPrice: { type: Number, required: true },
});

const CustomMadeNft = mongoose.model("CustomMadeNft", customMadeNft);

export default CustomMadeNft;

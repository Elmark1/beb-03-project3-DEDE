import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  userType: { type: Number, required: true },
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  roadNameAddress: { type: String, required: true },
  encryptedKeystore: {
    version: { type: Number, required: true },
    id: { type: String, required: true, unique: true },
    address: { type: String, required: true, unique: true },
    keyring: { type: Array, required: true, unique: true },
  },
  token: { type: Number, default: 0 },
  stakedToken: { type: Number, default: 0 },
  collectedNft: { type: Array, default: [] },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);

export default User;

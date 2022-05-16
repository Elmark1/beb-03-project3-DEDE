import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Caver from "caver-js";
import jwt from "jsonwebtoken";

dotenv.config();

const caver = new Caver("https://api.baobab.klaytn.net:8651/");

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "90 days",
  });
};

const decryptKeystore = (encryptedKeystore, password) => {
  return caver.wallet.keyring.decrypt(encryptedKeystore, password);
};
//const decryptedKeyring = decryptKeystore(encryptedKeystore, password); <- 이거 사용하면 됩니다.

export const postJoin = async (req, res) => {
  const { userType, userId, password, userName, roadNameAddress, phoneNumber } =
    req.body;

  const userExists = await User.find({
    $or: [{ userId }, { userName }],
  });

  const keyring = caver.wallet.keyring.generate();

  if (userExists.length !== 0) {
    console.log(
      "❌ This userId and userName are already taken. userExists:",
      userExists
    );
    return res.status(400).end();
  }

  try {
    const encryptedKeystore = keyring.encrypt(password);

    // ⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️ DB에 그냥 encryptedKeystore만 저장하는게 났겠는데..?
    // 왜냐면 DB가 해커의 손에 들어가더라도, publicKey를 보호하므로써 조금 더 보안을 높여줄 수 있는 거 같다..!

    await User.create({
      userType,
      userId,
      password,
      userName,
      phoneNumber,
      roadNameAddress,
      encryptedKeystore,
    });

    console.log("✅ User Created!");

    return res.json({
      message: "Created",
      userName,
      walletAddress: encryptedKeystore.address,
    });
  } catch (error) {
    console.log("error:", error);

    return res.status(400).json({ errorMessage: error });
  }
};

export const postLogin = async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findOne({ userId });
  const passwordComparision = await bcrypt.compare(password, user.password);
  const payload = { userObjectId: user._id, userType: user.userType };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  if (!user) {
    console.log("❌ User doesn't exist!");

    return res.status(400).json({ errorMessage: "❌ User doesn't exist!" });
  }

  if (!passwordComparision) {
    console.log("❌ Password doesn't match with user's password!");

    return res.status(400).json({
      errorMessage: "❌ Password doesn't match with user's password!",
    });
  }

  return res.json({
    userType: user.userType,
    userObjectId: user._id,
    accessToken,
    refreshToken,
  });
};

export const getUserInfo = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  let restaurantMenu = []; // undefined로 할 수 있는지 궁금합니다.

  if (!user) {
    console.log("404 Error: ❌ Not Found!");

    return res.status(404).json("❌ Not Found!");
  }

  //⭐️⭐️⭐️⭐️⭐️⭐️ jwt와 유저 정보가 일치하는지 verify 하는 과정이 들어가야 합니다.

  try {
    if (user.userType === 2) {
      restaurantMenu = "";
      // ⭐️⭐️⭐️⭐️⭐️⭐️ Menu Model 일단 만들어서 이 파일로 import 해야함. import 됐다면, Menu model에서 userId(ObjectId 임)를 이용해서 메뉴를 들고옵니다.
    }
    return res.json({
      userType: user.userType,
      userId: user.userId,
      userName: user.userName,
      roadNameAddress: user.roadNameAddress,
      phoneNumber: user.phoneNumber,
      walletAddress: user.walletAddress,
      token: user.token,
      stakedToken: user.stakedToken,
      collectedNft: user.collectedNft,
    });
  } catch (error) {
    console.log("Error:", error);

    return res.status(400).json({ errorMessage: error });
  }
};

import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Menu from "../models/Menu.js";
import CustomMadeNft from "../models/CustomMadeNft.js";
import Caver from "caver-js";
import jwt from "jsonwebtoken";

dotenv.config();

const caver = new Caver("https://api.baobab.klaytn.net:8651/");

const generateToken = (payload, secret, expiration) => {
  return jwt.sign(payload, secret, {
    expiresIn: expiration,
    issuer: "localhost",
  });
};

const decryptKeystore = (encryptedKeystore, password) => {
  return caver.wallet.keyring.decrypt(encryptedKeystore, password);
};
//const decryptedKeyring = decryptKeystore(encryptedKeystore, password); <- 이거 사용하면 됩니다.

export const postSignUp = async (req, res) => {
  const { userType, userId, password, userName, roadNameAddress, phoneNumber } =
    req.body;

  const userExists = await User.find({
    userId,
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

    return res.status(400).json({ message: "Fail" });
  }
};

export const postSignIn = async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findOne({ userId });
  const passwordComparision = await bcrypt.compare(password, user.password);
  const accessTokenPayload = {
    userObjectId: user._id,
    userType: user.userType,
  };
  const accessToken = generateToken(
    accessTokenPayload,
    process.env.ACCESS_TOKEN_SECRET,
    "15m"
  );

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

  res.cookie("accessToken", accessToken, { httpOnly: true });
  // ⭐️⭐️⭐️⭐️⭐️ option 설정 이유를 명확히 알고 가자!
  // ⭐️⭐️⭐️⭐️⭐️ 쿠키에도 maxAge를 설정해줘야하나?!

  return res.json({
    userType: user.userType,
    userObjectId: user._id,
  });
};

export const getSignOut = async (req, res) => {
  return res
    .clearCookie("accessToken")
    .json({ message: "✅ Sign Out Successfully!" });
};

export const getUserInfo = async (req, res) => {
  const { userId } = req.params;
  const accessToken = req.decoded;
  const user = await User.findById(userId);

  if (!user) {
    console.log("404 Error: ❌ Not Found!");

    return res.status(404).json("❌ Not Found!");
  }

  try {
    let responseUser = {
      userType: user.userType,
      userId: user.userId,
      userName: user.userName,
      roadNameAddress: user.roadNameAddress,
      phoneNumber: user.phoneNumber,
      walletAddress: user.encryptedKeystore.address,
      token: user.token,
      stakedToken: user.stakedToken,
    };

    if (accessToken.userType === 1) {
      responseUser.collectedNft = user.collectedNft;
    }

    if (accessToken.userType === 2) {
      responseUser.customMadeNft = await CustomMadeNft.find({
        user_id: user._id, // ⭐️⭐️⭐️⭐️⭐️ user_id는 제외하고 불러오는건지 확인 작업해야함
      });

      responseUser.restaurantMenu = await Menu.find({
        user_id: user._id, // ⭐️⭐️⭐️⭐️⭐️ user_id는 제외하고 불러오는건지 확인 작업해야함
      });
    }

    return res.json(responseUser);
  } catch (error) {
    console.log("Error:", error);

    return res.status(400).json({ errorMessage: error });
  }
};

export const postMenu = async (req, res) => {
  const { menuName, menuDescription, menuPrice } = req.body;
  const accessToken = req.decoded;

  if (accessToken.userType !== 2) {
    return res
      .status(403)
      .json({ message: "❌ You do not have permission to use this feature!" });
  }

  try {
    await Menu.create({
      user_id: accessToken.userObjectId,
      menuName,
      menuDescription,
      menuPrice,
    });

    return res.json({ message: "Create Menu Successfully!" });
  } catch (error) {
    return res.status(400).json({ message: "Fail to Create Menu!" });
  }
};

export const getMenus = async (req, res) => {
  const { restaurantId } = req.params;
  const menuList = await Menu.find({ user_id: restaurantId });

  if (!menuList) {
    return res.status(400).json({ message: "❌ No Menu List!" });
  }

  return res.send({ menuList }); // ⭐️⭐️⭐️⭐️⭐️ user_id가 제외되어 response 되는지 확인해야합니다
};

export const postCustomMadeNft = async (req, res) => {
  const { restaurantId } = req.params;
  const { nftName, discountRate, nftPrice } = req.body;
  const accessToken = req.decoded;

  if (restaurantId !== accessToken.userObjectId || accessToken.userType !== 2) {
    return res
      .status(403)
      .json({ message: "❌ You do not have permission to use this feature!" });
  }

  try {
    await CustomMadeNft.create({
      user_id: accessToken.userObjectId,
      nftName,
      discountRate,
      nftPrice,
    });

    return res.json({ message: "Created!" });
  } catch (error) {
    return res.status(400).json({ message: "Fail to Create!" });
  }
};

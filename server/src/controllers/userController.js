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
  const { userType, userId, password, userName, roadNameAddress, phoneNumber, sigungu } =
    req.body;

  const userExists = await User.find({
    userId,
  });

  const keyring = caver.wallet.keyring.generate();

  if (userExists.length !== 0) {
    return res.status(400).json({
      message: "❌ This userId and userName are already taken.",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const encryptedKeystore = keyring.encrypt(password);

    await User.create({
      userType,
      userId,
      password: hashedPassword,
      userName,
      phoneNumber,
      roadNameAddress,
      encryptedKeystore,
	  sigungu
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

  if (!user) {
    console.log("❌ User doesn't exist!");

    return res.status(400).json({ message: "❌ User doesn't exist!" });
  }

  const passwordComparision = await bcrypt.compare(password, user.password);
  const accessTokenPayload = {
    userObjectId: user._id,
    userType: user.userType,
  };
  const accessToken = generateToken(
    accessTokenPayload,
    process.env.ACCESS_TOKEN_SECRET,
    "60m"
  );

  if (!passwordComparision) {
    console.log("❌ Password doesn't match with user's password!");

    return res.status(400).json({
      message: "❌ Password doesn't match with user's password!",
    });
  }

  res.cookie("accessToken", accessToken, {
    maxAge: 3600000,
    httpOnly: true,
  });
  // ⭐️⭐️⭐️⭐️⭐️ option 설정 이유를 명확히 알고 가자!
  // -> httpOnly를 통해서 쿠키가 JS에 의해 읽어져서, 클라이언트가 쿠키를 읽어서 헤더에 넣는 것을 방지합니다.
  // ⭐️⭐️⭐️⭐️⭐️ 쿠키에도 maxAge를 설정해줘야하나?!
  // -> 필요합니다! 브라우저에 계속해서 남아있다면 로그인 상태로 오해하게 됩니다.

  return res.json({
    userType: user.userType,
    userObjectId: user._id,
  });
};

export const postSignOut = async (req, res) => {
  return res
    .clearCookie("accessToken")
    .json({ message: "✅ Sign Out Successfully!" });
};

export const getUserInfo = async (req, res) => {
  const { userId } = req.params;
  const accessToken = req.decoded;
  const user = await User.findById(userId);

  if (userId !== accessToken.userObjectId) {
    return res
      .status(403)
      .json({ message: "❌ You do not have permission to use this feature!" });
  }

  if (!user) {
    console.log("404 Error: ❌ Not Found!");

    return res.status(404).json({ message: "❌ Not Found!" });
  }

  try {
    let klay = await caver.rpc.klay.getBalance(user.encryptedKeystore.address);
    klay = caver.utils.fromPeb(klay);

    let responseUser = {
      userType: user.userType,
      userId: user.userId,
      userName: user.userName,
      roadNameAddress: user.roadNameAddress,
      phoneNumber: user.phoneNumber,
      walletAddress: user.encryptedKeystore.address,
      token: user.token,
      klay,
      stakedToken: user.stakedToken,
    };

    user.klay = klay;
    await user.save();

    if (accessToken.userType === 1) {
      responseUser.collectedNft = user.collectedNft;
    }

    if (accessToken.userType === 2) {
      responseUser.customMadeNft = await CustomMadeNft.find({
        user_id: user._id, // ⭐️⭐️⭐️⭐️⭐️ user_id는 필요하지 않지만, 추후에 필요할 수 있어서 남겨두는 걸로 했습니다!
      });

      responseUser.restaurantMenu = await Menu.find({
        user_id: user._id, // ⭐️⭐️⭐️⭐️⭐️ user_id는 필요하지 않지만, 추후에 필요할 수 있어서 남겨두는 걸로 했습니다!
      });
    }

    return res.json(responseUser);
  } catch (error) {
    console.log("Error:", error);

    return res.status(400).json({ Error: error });
  }
};

export const getRestaurants = async (req, res) => {
  const restaurantList = await User.find({ userType: 2 });

  if (!restaurantList) {
    return res.status(404).json({ message: "❌ No Restaurant List!" });
  }

  return res.json(restaurantList);
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

    return res.json({ message: "✅ Create Menu Successfully!" });
  } catch (error) {
    return res.status(400).json({ message: "❌ Fail to Create Menu!" });
  }
};

export const getMenusById = async (req, res) => {
  const { restaurantId } = req.params;
  const menuList = await Menu.find({ user_id: restaurantId }).sort({
    _id: "descending",
  });

  if (!menuList) {
    return res.status(404).json({ message: "❌ No Menu List!" });
  }

  return res.send({ menuList }); // ⭐️⭐️⭐️⭐️⭐️ user_id는 필요하지 않지만, 추후에 필요할 수 있어서 남겨뒀습니다.
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

    return res.json({ message: "✅ Custom Made NFT Created!" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "❌ Fail to Create Custom Made NFT!" });
  }
};

export const getCustomMadeNft = async (req, res) => {
  const { restaurantId } = req.params;
  const nftList = await CustomMadeNft.find({ user_id: restaurantId });

  if (!restaurantId) {
    return res.status(400).json({ message: "❌ Bad Request!" });
  }

  if (!nftList) {
    return res.status(404).json({ message: "❌ No Menu List!" });
  }

  try {
    return res.json({ nftList });
  } catch (error) {
    console.log("❌ Fail to Get Custom Made NFT!");

    return res.status(400).json({ message: "❌ Fail to Get Custom Made NFT!" });
  }
};

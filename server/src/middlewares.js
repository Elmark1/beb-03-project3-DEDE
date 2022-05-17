import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (token === undefined) {
    return res
      .status(401)
      .json({ message: "❌ You do not have permission to use API" });
  }

  try {
    const accessToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.decoded = accessToken;

    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        message: "🕒 Token expired!",
      });
    }

    return res.status(403).json({
      message: "❌ Invalid Token!",
    });
  }
};

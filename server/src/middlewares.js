export const verifyToken = (req, res, next) => {
  const token = req.cookies.get("accessToken");

  try {
    req.decoded = jwt.verify(
      req.headers.authorization,
      process.env.ACCESS_TOKEN_SECRET
    );
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        message: "🕒 Token expired!",
      });
    }
    return res.status(401).json({
      message: "❌ Invalid Token!",
    });
  }
};

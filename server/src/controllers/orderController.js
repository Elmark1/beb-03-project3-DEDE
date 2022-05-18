import Order from "../models/Order.js";

export const postOrder = async (req, res) => {
  const { customerObjectId, restaurantObjectId, orderedMenu } = req.body;
  const accessToken = req.decoded;

  if (
    accessToken.userType !== 1 ||
    customerObjectId !== accessToken.userObjectId
  ) {
    return res
      .status(403)
      .json({ message: "❌ You do not have permission to use this feature!" });
  }

  await Order.create({
    user1_id: customerObjectId,
    user2_id: restaurantObjectId,
    status: "Pending",
    orderedMenu,
    // ⭐️⭐️⭐️⭐️⭐️ Client로부터 받아올 때, [{menuName, menuDescription, menuPrice} ... ] 형태의 Array로 받아올 거로 예상하고 작성한 코드입니다.
  });
};

export const getOrders = async (req, res) => {
  const orderList = await Order.find();

  return res.json(orderList);
};

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

  try {
    await Order.create({
      user1_id: customerObjectId,
      user2_id: restaurantObjectId,
      status: "Pending",
      orderedMenu,
      // ⭐️⭐️⭐️⭐️⭐️ Client로부터 받아올 때, [{menuName, menuDescription, menuPrice} ... ] 형태의 Array로 받아올 거로 예상하고 작성한 코드입니다.
    });

    return res.json({ message: "✅ Create Order Successfully!" });
  } catch (error) {
    console.log("error:", error);

    return res.status(400).json({ message: "❌ Fail" });
  }
};

export const getOrders = async (req, res) => {
  const orderList = await Order.find()
    .populate("user1_id", "userName")
    .populate("user2_id", "userName")
    .populate("user3_id", "userName");

  if (!orderList) {
    return res.status(404).json({ message: "❌ Not Found!" });
  }

  return res.json({ orderList });
};

export const getOrderHistory = async (req, res) => {
  const accessToken = req.decoded;

  if (!accessToken.userType || !accessToken.userObjectId) {
    return res
      .status(403)
      .json({ message: "❌ You do not have permission to use this feature!" });
  }

  try {
    if (accessToken.userType === 1) {
      const history = await Order.find({
        user1_id: accessToken.userObjectId,
      })
        .populate("user1_id", "userName")
        .populate("user2_id", "userName")
        .populate("user3_id", "userName");

      return res.json(history);
    }

    if (accessToken.userType === 2) {
      const history = await Order.find({
        user2_id: accessToken.userObjectId,
      })
        .populate("user1_id", "userName")
        .populate("user2_id", "userName")
        .populate("user3_id", "userName");

      return res.json(history);
    }

    if (accessToken.userType === 3) {
      const history = await Order.find({
        user3_id: accessToken.userObjectId,
      })
        .populate("user1_id", "userName")
        .populate("user2_id", "userName")
        .populate("user3_id", "userName");

      return res.json(history);
    }

    return res.status(404).json({ message: "❌ Not Found!" });
  } catch (error) {
    console.log("error:", error);

    return res.status(400).json({ message: "❌ Fail" });
  }
};

export const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId)
    .populate("user1_id", "userName")
    .populate("user2_id", "userName")
    .populate("user3_id", "userName");

  if (!order) {
    return res.status(404).json({ message: "❌ Not Found!" });
  }

  return res.json(order);
};

export const patchOrder = async (req, res) => {
  const { orderId } = req.params;
  const accessToken = req.decoded;
  const { status } = req.body;
  const order = await Order.findById(orderId);

  // If userType is undefined, client can't use patchOrder
  if (!accessToken.userType) {
    return res
      .status(403)
      .json({ message: "❌ You do not have permission to use this feature!" });
  }

  if (!order) {
    return res.status(404).json({ message: "❌ Not Found!" });
  }

  try {
    // 1. Restaurant can change the order status, from "Pending" to "Cooking" or "Rejected"
    if (accessToken.userType === 2 && order.status === "Pending") {
      if (status === "Cooking") {
        await Order.findByIdAndUpdate(orderId, { status });

        return res.json({
          message: "👨‍🍳 배달원이 도착하기 전까지 레스토랑이 음식을 조리합니다!",
        });
      }

      if (status === "Rejected") {
        await Order.findByIdAndUpdate(orderId, { status });

        return res.json({
          message: "🙅 레스토랑이 해당 주문을 거절하셨습니다!",
        });
      }

      return res.status(403).json({
        message:
          "❌ You do not have permission to change the status as you requested!",
      });
    }

    // 2. Deliveryman can change the order status, from "Cooking" to "Delivery"
    if (accessToken.userType === 3 && order.status === "Cooking") {
      if (status === "Delivery") {
        await Order.findByIdAndUpdate(orderId, { status });

        return res.json({
          message: "🚴‍♂️ 배달원이 음식을 건네받았습니다!",
        });
      }

      return res.status(403).json({
        message:
          "❌ You do not have permission to change the status as you requested!",
      });
    }

    // 3. Client can change the order status, from "Delivery" to "Completed"
    if (accessToken.userType === 1 && order.status === "Delivery") {
      if (status === "Completed") {
        await Order.findByIdAndUpdate(orderId, { status: "Completed" });

        return res.json({
          message: "✅ 해당 주문은 완료되었습니다!",
        });
      }

      return res.status(403).json({
        message:
          "❌ You do not have permission to change the status as you requested!",
      });
    }

    return res.status(403).json({
      message:
        "❌ You do not have permission to change the status as you requested!",
    });
  } catch (error) {
    console.log("error:", error);

    return res.status(400).json({ message: "❌ Bad Request!" });
  }
};

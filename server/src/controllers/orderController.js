// Import models
import Order from "../models/Order.js";
import Contract from "../models/Contract.js";
import User from "../models/User.js";
import Admin from "../models/Admin.js";

// Import packages
import Caver from "caver-js";

// Import ABI
import { kip7Abi } from "../abi/kip7ABI.js";

const caver = new Caver("https://api.baobab.klaytn.net:8651/");

export const postOrder = async (req, res) => {
  const { distance, customerObjectId, restaurantObjectId, orderedMenu } = req.body;
  const accessToken = req.decoded;
  const adminExists = await Admin.findOne({ adminType: "Server" });

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
	  distance
      // ⭐️⭐️⭐️⭐️⭐️ Client로부터 받아올 때, [{menuName, menuDescription, menuPrice} ... ] 형태의 Array로 받아올 거로 예상하고 작성한 코드입니다.
    });

    const totalPrice = orderedMenu.reduce((prev, cur) => {
      prev += cur.menuPrice;
      return prev;
    }, 0);

    const userExists = await User.findById(customerObjectId);
    const kip7Exists = await Contract.findOne({ contractType: "KIP7" });
    const kip7Instance = caver.contract.create(kip7Abi, kip7Exists.address);

    caver.wallet.newKeyring(adminExists.address, adminExists.privateKey);

    await kip7Instance.methods
      .transfer(
        userExists.encryptedKeystore.address,
        adminExists.address,
        caver.utils.toBN(caver.utils.toPeb(String(totalPrice)))
      )
      .send({ from: adminExists.address, gas: 15000000 });

    userExists.token -= totalPrice;
    await userExists.save();

    caver.wallet.remove(adminExists.address);

    return res.json({ message: "✅ Create Order Successfully!" });
  } catch (error) {
    caver.wallet.remove(adminExists.address);
    console.log("error:", error);

    return res.status(400).json({ message: "❌ Fail" });
  }
};

export const getOrders = async (req, res) => {
  const orderList = await Order.find()
    .sort({ _id: "descending" })
	.populate({path: "user1_id", select: ["userName", "roadNameAddress"]})
    .populate({path: "user2_id", select: ["userName", "roadNameAddress", "stakedToken"]})
    .populate({path: "user3_id", select: ["userName", "roadNameAddress"]});

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
        .sort({ _id: "descending" })
        .populate("user1_id", "userName")
        .populate("user2_id", "userName")
        .populate("user3_id", "userName");

      if (!history) {
        return res.status(404).json({ message: "❌ Not Found!" });
      }

      return res.json({ history });
    }

    if (accessToken.userType === 2) {
      const history = await Order.find({
        user2_id: accessToken.userObjectId,
      })
        .sort({ _id: "descending" })
        .populate("user1_id", "userName")
        .populate("user2_id", "userName")
        .populate("user3_id", "userName");

      if (!history) {
        return res.status(404).json({ message: "❌ Not Found!" });
      }

      return res.json({ history });
    }

    if (accessToken.userType === 3) {
      const history = await Order.find({
        user3_id: accessToken.userObjectId,
      })
        .sort({ _id: "descending" })
        .populate("user1_id", "userName")
        .populate("user2_id", "userName")
        .populate("user3_id", "userName");

      if (!history) {
        return res.status(404).json({ message: "❌ Not Found!" });
      }

      return res.json({ history });
    }

    return res.status(404).json({ message: "❌ Not Found!" });
  } catch (error) {
    console.log("error:", error);

    return res
      .status(403)
      .json({ message: "❌ You do not have permission to use this feature!" });
  }
};

export const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId)
    .sort({ _id: "descending" })
	.populate({path: "user1_id", select: ["userName", "roadNameAddress"]})
    .populate({path: "user2_id", select: ["userName", "roadNameAddress"]})
    .populate({path: "user3_id", select: ["userName", "roadNameAddress"]});

  if (!order) {
    return res.status(404).json({ message: "❌ Not Found!" });
  }

  return res.json(order);
};

export const patchOrder = async (req, res) => {
  const { orderId } = req.params;
  const accessToken = req.decoded;
  const { deliveryManObjectId, status } = req.body;
  const order = await Order.findById(orderId);
  const adminExists = await Admin.findOne({ adminType: "Server" });

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

        const totalPrice = order.orderedMenu.reduce((prev, cur) => {
          prev += cur.menuPrice;
          return prev;
        }, 0);

        const userExists = await User.findById(order.user1_id);
        const kip7Exists = await Contract.findOne({ contractType: "KIP7" });
        const kip7Instance = caver.contract.create(kip7Abi, kip7Exists.address);

        caver.wallet.newKeyring(adminExists.address, adminExists.privateKey);

        await kip7Instance.methods
          .transfer(
            adminExists.address,
            userExists.encryptedKeystore.address,
            caver.utils.toBN(caver.utils.toPeb(String(totalPrice)))
          )
          .send({ from: adminExists.address, gas: 15000000 });

        userExists.token += totalPrice;
        await userExists.save();

        caver.wallet.remove(adminExists.address);
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
        await Order.findByIdAndUpdate(orderId, {
          user3_id: deliveryManObjectId,
          status,
        });

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

        const totalPrice = order.orderedMenu.reduce((prev, cur) => {
          prev += cur.menuPrice;
          return prev;
        }, 0);

        const restaurantExists = await User.findById(order.user2_id);
		const deliveryManExists = await User.findById(order.user3_id);
        const kip7Exists = await Contract.findOne({ contractType: "KIP7" });
        const kip7Instance = caver.contract.create(kip7Abi, kip7Exists.address);

		let deliveryFee = 0;
		let incentive = 0;
		const deliveryStakedToken = deliveryManExists.stakedToken;
		const restaurantStakedToken = restaurantExists.stakedToken;

		if(order.distance >= 2000) {
		  deliveryFee = 4000;
		  if(deliveryStakedToken >= 70000 && deliveryStakedToken < 100000) {
			deliveryFee = 3000;
		  }
		  if(deliveryStakedToken >= 40000 && deliveryStakedToken < 70000) {
			deliveryFee = 2000;
		  }
		  if(deliveryStakedToken < 40000) {
			deliveryFee = 0;
		  }
		} else if(order.distance >= 1000) {
		  deliveryFee = 3000;
		  if(deliveryStakedToken >= 40000 && deliveryStakedToken < 70000) {
			deliveryFee = 2000;
		  }
		  if(deliveryStakedToken < 40000) {
			deliveryFee = 0;
		  }
		} else {
		  deliveryFee = 2000;
		  if(deliveryStakedToken < 40000) {
			deliveryFee = 0;
		  }
		}

		if(restaurantStakedToken >= 10000) {
		  incentive = 3;
		} else if(restaurantStakedToken >= 5000) {
		  incentive = 1;
		} else {
		  incentive = 0;
		}

		deliveryFee += (deliveryFee / 100) * incentive;

        caver.wallet.newKeyring(adminExists.address, adminExists.privateKey);

        await kip7Instance.methods
          .transfer(
            adminExists.address,
            restaurantExists.encryptedKeystore.address,
            caver.utils.toBN(caver.utils.toPeb(String(totalPrice)))
          )
          .send({ from: adminExists.address, gas: 15000000 });
		await kip7Instance.methods.transfer(adminExists.address, deliveryManExists.encryptedKeystore.address, caver.utils.toBN(caver.utils.toPeb(String(deliveryFee)))).send({from: adminExists.address, gas: 15000000});

        restaurantExists.token += totalPrice;
		deliveryManExists.token += deliveryFee;
        await restaurantExists.save();
		await deliveryManExists.save();

        caver.wallet.remove(adminExists.address);

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
    caver.wallet.remove(adminExists.address);
    console.log("error:", error);

    return res.status(400).json({ message: "❌ Bad Request!" });
  }
};

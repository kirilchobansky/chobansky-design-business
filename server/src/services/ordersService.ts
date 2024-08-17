import { Types } from "mongoose";
import { IOrder, Order } from "../models/Order";
import { User } from "../models/User";

const postOrder = (orderData: IOrder) => Order.create(orderData);

const updateUserPost = (userId: Types.ObjectId, orderId: Types.ObjectId) =>
  User.findByIdAndUpdate(userId, { $push: { orders: orderId } });

export default {
  postOrder,
  updateUserPost,
};

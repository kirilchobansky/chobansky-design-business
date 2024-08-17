import express from "express";
import mongoose from "mongoose";
const router = express.Router();

import ordersService from "../services/ordersService";
import { IOrder } from "../models/Order";
import isAuth from "../middlewares/isAuth";

// router.get("/all/:projectId", async (req, res) => {
//   const projectId = new mongoose.Types.ObjectId(req.params.projectId);

//   const comments = await ordersService.getAllCommentsByProject(projectId);
//   res.send(comments);
// });

router.post("/:projectId", async (req, res) => {
  try {
    const projectId = new mongoose.Types.ObjectId(req.params.projectId);
    const { enquiry, email, name, phone, userId } = req.body;

    const orderData: IOrder = {
      enquiry,
      email,
      name,
      phone,
      owner: userId,
      project: projectId,
    };

    const order = await ordersService.postOrder(orderData);
    await ordersService.updateUserPost(userId, order._id);

    res.json("You have successfully created order");
  } catch (error) {
    res.status(500).send("Error with sending order");
  }
});

router.get("/:userId", async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.params.userId);

  try {
    const orders = await ordersService.getOrdersByUser(userId);
    res.send(orders);
  } catch (error) {
    res.status(500).send("Failed to get orders for that user");
  }
});

export default router;

import express from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
const router = express.Router();

import ordersService from "../services/ordersService";
import { IOrder } from "../models/Order";
import isAuth from "../middlewares/isAuth";
import optionalAuth from "../middlewares/optionalAuth";
import { currentUserId, isSelfOrAdmin } from "../utils/authz";

// Guests can send an enquiry; if signed in, the order is linked to the signed-in user.
router.post(
  "/:projectId",
  optionalAuth,
  asyncHandler(async (req, res) => {
    try {
      const projectId = new mongoose.Types.ObjectId(req.params.projectId);
      const { enquiry, email, name, phone } = req.body;
      const userId = currentUserId(req) as any;

      const orderData: IOrder = {
        enquiry,
        email,
        name,
        phone,
        owner: userId,
        project: projectId,
      };

      const order = await ordersService.postOrder(orderData);
      if (userId) {
        await ordersService.updateUserPost(userId, order._id);
      }

      res.json("You have successfully created order");
    } catch (error) {
      res.status(500).send("Error with sending order");
    }
  })
);

router.get(
  "/:userId",
  isAuth,
  asyncHandler(async (req, res) => {
    if (!isSelfOrAdmin(req, req.params.userId)) {
      res.status(403).send("You can only view your own orders");
      return;
    }

    const userId = new mongoose.Types.ObjectId(req.params.userId);

    try {
      const orders = await ordersService.getOrdersByUser(userId);
      res.send(orders);
    } catch (error) {
      res.status(500).send("Failed to get orders for that user");
    }
  })
);

export default router;

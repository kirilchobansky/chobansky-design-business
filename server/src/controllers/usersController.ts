import express from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

import usersService from "../services/usersService";
import mongoose from "mongoose";
import isGuest from "../middlewares/isGuest";
import isAuth from "../middlewares/isAuth";
import optionalAuth from "../middlewares/optionalAuth";
import { currentUserId, isSelfOrAdmin } from "../utils/authz";
const router = express.Router();

router.post(
  "/login",
  isGuest,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await usersService.login(email, password);
      res.send(user);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  })
);

router.post(
  "/register",
  isGuest,
  asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof username !== "string" ||
      typeof password !== "string"
    ) {
      res.status(400).send("Invalid registration data");
      return;
    }

    const newUser = {
      id: "",
      username,
      email: email.toLowerCase(),
      password,
      isAdmin: false,
    };

    try {
      const user = await usersService.register(newUser);
      res.send(user);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  })
);

// Like / dislike always act on the signed-in user, never on an id from the request body.
router.post(
  "/like/:projectId",
  isAuth,
  asyncHandler(async (req, res) => {
    const projectId = new mongoose.Types.ObjectId(req.params.projectId);

    await usersService.likeProject(projectId, currentUserId(req) as any);
    res.status(200).json("Successfully liked");
  })
);

router.post(
  "/dislike/:projectId",
  isAuth,
  asyncHandler(async (req, res) => {
    const projectId = new mongoose.Types.ObjectId(req.params.projectId);

    await usersService.dislikeProject(projectId, currentUserId(req) as any);
    res.status(200).json("Successfully disliked");
  })
);

router.put(
  "/update-user-details/:userId",
  isAuth,
  asyncHandler(async (req, res) => {
    if (!isSelfOrAdmin(req, req.params.userId)) {
      res.status(403).json({ message: "You can only edit your own account" });
      return;
    }

    const userId = new mongoose.Types.ObjectId(req.params.userId);
    const { userData } = req.body;

    if (!userData || typeof userData !== "object") {
      res.status(400).json({ message: "Invalid user data" });
      return;
    }

    const user = await usersService.updateUserDetails(
      userId,
      String(userData.username),
      String(userData.email),
      String(userData.address),
      Number(userData.phone)
    );
    res.send(user);
  })
);

router.delete(
  "/:userId",
  isAuth,
  asyncHandler(async (req, res) => {
    if (!isSelfOrAdmin(req, req.params.userId)) {
      res.status(403).json({ message: "You can only delete your own account" });
      return;
    }

    const userId = new mongoose.Types.ObjectId(req.params.userId);

    await usersService.deleteUserById(userId);
    res.status(200).json("You have successfully DELETED this account");
  })
);

router.get(
  "/favorite-projects/:userId",
  isAuth,
  asyncHandler(async (req, res) => {
    if (!isSelfOrAdmin(req, req.params.userId)) {
      res.status(403).json({ message: "You can only view your own favorites" });
      return;
    }

    try {
      const userId = new mongoose.Types.ObjectId(req.params.userId);
      const user = await usersService.getLikedProjectsByUser(userId);

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.send(user.favoriteProjects);
    } catch (error) {
      console.error("Error retrieving favorite projects:");
      res.status(500).send({ error: "Internal server error" });
    }
  })
);

// Public for projects; orders are only included for a signed-in user (their own).
router.get(
  "/search/:searchName",
  optionalAuth,
  asyncHandler(async (req, res) => {
    const { projects, orders } = await usersService.search(
      req.params.searchName,
      currentUserId(req)
    );
    res.send({
      projects,
      orders,
    });
  })
);

router.patch(
  "/change-pass",
  isAuth,
  asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
      if (typeof newPassword !== "string" || !newPassword) {
        throw new Error("Invalid new password!");
      }

      const hash = await bcrypt.hash(newPassword, 12);
      const user = await usersService.changePassword(
        currentUserId(req) as any,
        oldPassword,
        hash
      );
      res.send(user);
    } catch (error: any) {
      res.send(error.message);
    }
  })
);

export default router;

import express from "express";
import usersService from "../services/usersService";
import mongoose from "mongoose";
import isGuest from "../middlewares/isGuest";
import isAuth from "../middlewares/isAuth";
const router = express.Router();

router.post("/login", isGuest, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usersService.login(email, password);
    res.send(user);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

router.post("/register", isGuest, async (req, res) => {
  const { email, username, password } = req.body;

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
});

router.post("/like/:projectId", async (req, res) => {
  const projectId = new mongoose.Types.ObjectId(req.params.projectId);
  const { userId } = req.body;

  await usersService.likeProject(projectId, userId);
  res.status(200).json("Successfully liked");
});

router.post("/dislike/:projectId", async (req, res) => {
  const projectId = new mongoose.Types.ObjectId(req.params.projectId);
  const { userId } = req.body;

  await usersService.dislikeProject(projectId, userId);
  res.status(200).json("Successfully disliked");
});

router.put("/update-user-details/:userId", async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.params.userId);
  const { userData } = req.body;

  const user = await usersService.updateUserDetails(
    userId,
    userData.username,
    userData.email,
    userData.address,
    userData.phone
  );
  res.send(user);
});

router.delete("/:userId", async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.params.userId);

  await usersService.deleteUserById(userId);
  res.status(200).json("You have successfully DELETED this account");
});

router.get("/favorite-projects/:userId", async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.userId);
    const user = await usersService.getLikedProjectsByUser(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const favoriteProjects = user.favoriteProjects;
    res.send(favoriteProjects);
  } catch (error) {
    console.error("Error retrieving favorite projects:");
    res.status(500).send({ error: "Internal server error" });
  }
});

export default router;

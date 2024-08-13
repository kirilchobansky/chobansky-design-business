import express from "express";
import usersService from "../services/usersService";
import isAuth from "../middlewares/isAuth";
import isGuest from "../middlewares/isGuest";
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

router.post("/like/:foodId", isAuth, async (req, res) => {
  const foodId = req.params.foodId;
  const { userId } = req.body;

  await usersService.likeFood(foodId, userId);
  res.status(200).json("Successfully liked");
});

router.post("/dislike/:foodId", isAuth, async (req, res) => {
  const foodId = req.params.foodId;
  const { userId } = req.body;

  await usersService.dislikeFood(foodId, userId);
  res.status(200).json("Successfully disliked");
});

router.get("/:userId", async (req, res) => {
  const user = await usersService.getUserById(req.params.userId);
  res.send(user);
});

router.post("/update-user-details", async (req: any, res) => {
  const { name, email, address, userId } = req.body;

  const user = await usersService.updateUserDetails(
    userId,
    name,
    email,
    address
  );
  res.send(user);
});

router.get("/favorite-foods/:userId", async (req: any, res) => {
  try {
    const userId = req.params.userId;
    const user = await usersService.getUserByIdWithFoods(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const favoriteFoods = user.favoriteProjects;
    res.send(favoriteFoods);
  } catch (error) {
    console.error("Error retrieving favorite foods:");
    res.status(500).send({ error: "Internal server error" });
  }
});

export default router;

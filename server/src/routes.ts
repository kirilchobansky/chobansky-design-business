import express from "express";
const router = express.Router();

import projectsController from "./controllers/projectsController";
import usersController from "./controllers/usersController";
import commentsController from "./controllers/commentsController";
import ordersController from "./controllers/ordersController";

router.use("/api/projects", projectsController);
router.use("/api/users", usersController);
router.use("/api/comments", commentsController);
router.use("/api/orders", ordersController);

export default router;

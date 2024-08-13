import express from "express";
import mongoose from "mongoose";
const router = express.Router();

import commentsService from "../services/commentsService";
import { IComment } from "../models/Comment";
import isAuth from "../middlewares/isAuth";

router.get("/all/:projectId", async (req, res) => {
  const projectId = new mongoose.Types.ObjectId(req.params.projectId);

  const comments = await commentsService.getAllCommentsByProject(projectId);
  res.send(comments);
});

router.get("/latest-three/:projectId", async (req, res) => {
  const projectId = new mongoose.Types.ObjectId(req.params.projectId);

  const comments = await commentsService.getLatestThreeCommentsByProject(
    projectId
  );
  res.send(comments);
});

router.post("/:projectId", async (req, res) => {
  try {
    const projectId = new mongoose.Types.ObjectId(req.params.projectId);
    const { comment, userId } = req.body;

    const commentData: IComment = {
      comment,
      owner: userId,
      project: projectId,
    };

    const newComment = await commentsService.postComment(commentData);

    await commentsService.updateUserPost(userId, newComment._id);
    await commentsService.updateProjectPost(projectId, newComment._id);

    res.send(newComment);
  } catch (error) {
    res.status(500).send("Error with sending comment");
  }
});

router.put("/:commentId", async (req, res) => {
  const commentId = new mongoose.Types.ObjectId(req.params.commentId);
  const { updatedComment } = req.body;

  await commentsService.editComment(commentId, updatedComment);
  res.status(200).json("You have successfully UPDATED the comment");
});

router.delete("/:commentId", async (req, res) => {
  const commentId = new mongoose.Types.ObjectId(req.params.commentId);
  const { userId, projectId } = req.body;

  await commentsService.deleteComment(commentId);
  await commentsService.updateUserDelete(userId, commentId);
  await commentsService.updateProjectDelete(projectId, commentId);
  res.status(200).json("You have successfully DELETED the comment");
});

export default router;

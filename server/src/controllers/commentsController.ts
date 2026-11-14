import express from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
const router = express.Router();

import commentsService from "../services/commentsService";
import { IComment } from "../models/Comment";
import isAuth from "../middlewares/isAuth";
import { currentUserId, isSelfOrAdmin } from "../utils/authz";

router.get(
  "/all/:projectId",
  asyncHandler(async (req, res) => {
    const projectId = new mongoose.Types.ObjectId(req.params.projectId);

    const comments = await commentsService.getAllCommentsByProject(projectId);
    res.send(comments);
  })
);

router.get(
  "/latest-three/:projectId",
  asyncHandler(async (req, res) => {
    const projectId = new mongoose.Types.ObjectId(req.params.projectId);

    const comments = await commentsService.getLatestThreeCommentsByProject(
      projectId
    );
    res.send(comments);
  })
);

router.post(
  "/:projectId",
  isAuth,
  asyncHandler(async (req, res) => {
    try {
      const projectId = new mongoose.Types.ObjectId(req.params.projectId);
      const { comment } = req.body;
      const userId = currentUserId(req) as any;

      if (typeof comment !== "string" || !comment.trim()) {
        res.status(400).send("Comment cannot be empty");
        return;
      }

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
  })
);

router.put(
  "/:commentId",
  isAuth,
  asyncHandler(async (req, res) => {
    const commentId = new mongoose.Types.ObjectId(req.params.commentId);
    const { updatedComment } = req.body;

    if (typeof updatedComment !== "string" || !updatedComment.trim()) {
      res.status(400).send("Comment cannot be empty");
      return;
    }

    const existing = await commentsService.getCommentById(commentId);
    if (!existing) {
      res.status(404).send("Comment not found");
      return;
    }

    if (!isSelfOrAdmin(req, existing.owner)) {
      res.status(403).send("You can only edit your own comments");
      return;
    }

    await commentsService.editComment(commentId, updatedComment);
    res.status(200).json("You have successfully UPDATED the comment");
  })
);

router.delete(
  "/:commentId",
  isAuth,
  asyncHandler(async (req, res) => {
    const commentId = new mongoose.Types.ObjectId(req.params.commentId);

    const existing = await commentsService.getCommentById(commentId);
    if (!existing) {
      res.status(404).send("Comment not found");
      return;
    }

    if (!isSelfOrAdmin(req, existing.owner)) {
      res.status(403).send("You can only delete your own comments");
      return;
    }

    // Owner and project come from the stored comment, not from the request body.
    await commentsService.deleteComment(commentId);
    await commentsService.updateUserDelete(existing.owner as any, commentId);
    await commentsService.updateProjectDelete(existing.project as any, commentId);
    res.status(200).json("You have successfully DELETED the comment");
  })
);

export default router;

import { Types } from "mongoose";
import { Comment, IComment } from "../models/Comment";
import { Project } from "../models/Project";
import { User } from "../models/User";

const getAllCommentsByProject = (projectId: Types.ObjectId) =>
  Comment.find({ project: projectId })
    .populate(["owner"])
    .sort({ createdAt: -1 });

const getLatestThreeCommentsByProject = (projectId: Types.ObjectId) => {
  return Comment.find({ project: projectId })
    .populate(["owner"])
    .sort({ createdAt: -1 })
    .limit(3);
};

const postComment = (commentData: IComment) => Comment.create(commentData);

const updateUserPost = (userId: Types.ObjectId, commentId: Types.ObjectId) =>
  User.findByIdAndUpdate(userId, { $push: { comments: commentId } });

const updateProjectPost = (
  projectId: Types.ObjectId,
  commentId: Types.ObjectId
) => Project.findByIdAndUpdate(projectId, { $push: { comments: commentId } });

const deleteComment = (commentId: Types.ObjectId) =>
  Comment.findByIdAndDelete(commentId);

const editComment = (commentId: Types.ObjectId, commentData: string) =>
  Comment.findByIdAndUpdate(commentId, { comment: commentData });

const updateUserDelete = (userId: Types.ObjectId, commentId: Types.ObjectId) =>
  User.findByIdAndUpdate(userId, { $pull: { comments: commentId } });

const updateProjectDelete = (
  projectId: Types.ObjectId,
  commentId: Types.ObjectId
) => Project.findByIdAndUpdate(projectId, { $pull: { comments: commentId } });

export default {
  getAllCommentsByProject,
  getLatestThreeCommentsByProject,
  postComment,
  updateUserPost,
  updateProjectPost,
  editComment,
  deleteComment,
  updateUserDelete,
  updateProjectDelete,
};

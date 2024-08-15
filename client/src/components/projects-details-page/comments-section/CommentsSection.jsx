import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./CommentsSection.module.css";
import commentsApi from "../../../api/comments-api";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useGetAllCommentsByProject } from "../../../hooks/useComments";

export default function CommentsSection() {
  const { userId } = useAuthContext();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useGetAllCommentsByProject(projectId);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!userId) {
      navigate("/login");
      return;
    }

    if (!commentText.trim()) {
      setErrorMessage("Comment cannot be empty.");
      return;
    }

    try {
      await commentsApi.create(projectId, userId, commentText);
      const updatedComments = await commentsApi.getAllByProject(projectId);

      setComments(updatedComments);
      setCommentText("");
      setErrorMessage("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const handleEditClick = (comment) => {
    setEditCommentId(comment._id);
    setEditCommentText(comment.comment);
  };

  const handleSaveClick = async (commentId) => {
    if (!editCommentText.trim()) {
      setErrorMessage("Comment cannot be empty.");
      return;
    }

    try {
      await commentsApi.edit(commentId, editCommentText);

      setComments((prevComments) =>
        prevComments.map((c) =>
          c._id === commentId ? { ...c, comment: editCommentText } : c
        )
      );
      setEditCommentId(null);
      setEditCommentText("");
      setErrorMessage(""); // Clear any existing error messages
    } catch (error) {
      console.error("Failed to edit comment:", error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await commentsApi.remove(commentId, userId, projectId);
      setComments((prevComments) =>
        prevComments.filter((c) => c._id !== commentId)
      );
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <div className={styles.commentsSection}>
      <h3>Comments</h3>
      <form onSubmit={handleCreate}>
        <input
          className={styles.commentInput}
          type="text"
          name="comment"
          placeholder="Write a comment..."
          onChange={(e) => setCommentText(e.target.value)}
          value={commentText}
        />
        <input
          type="submit"
          className={styles.addCommentButton}
          value="Add Comment"
        />
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </form>
      <div className={styles.commentsList}>
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className={styles.comment}>
              <div className={styles.commentContent}>
                <h4>{comment.owner.username}</h4>
                {editCommentId === comment._id ? (
                  <input
                    value={editCommentText}
                    onChange={(e) => setEditCommentText(e.target.value)}
                    className={styles.commentEditText}
                    autoFocus
                  />
                ) : (
                  <p>{comment.comment}</p>
                )}
              </div>

              {comment.owner && comment.owner._id === userId && (
                <div className={styles.commentActions}>
                  {editCommentId === comment._id ? (
                    <button
                      onClick={() => handleSaveClick(comment._id)}
                      className={styles.saveButton}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(comment)}
                      className={styles.editButton}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}

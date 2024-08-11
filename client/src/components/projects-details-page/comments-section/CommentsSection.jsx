import React, { useContext, useEffect, useState } from "react";
import styles from "./CommentsSection.module.css";
import commentsApi from "../../../api/comments-api";
import { AuthContext } from "../../../contexts/AuthContext";

export default function CommentsSection({ projectId, comments }) {
  const [commentText, setCommentText] = useState("");
  const { isAuthenticated, username } = useContext(AuthContext);
  const [allComments, setAllComments] = useState(() => {
    if (comments && comments.length > 0) {
      return comments;
    } else {
      return [];
    }
  });

  const handleAddComment = async (e) => {
    e.preventDefault();

    const newComment = await commentsApi.create(
      projectId,
      username,
      commentText
    );

    setAllComments((prevComments) => [...prevComments, newComment]);

    setCommentText("");
  };

  return (
    <div className={styles.commentsSection}>
      <h3>Comments</h3>
      <form onSubmit={handleAddComment}>
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
      </form>

      <div className={styles.commentsList}>
        {allComments && allComments.length > 0 ? (
          allComments.map((comment, index) => (
            <div key={index} className={styles.comment}>
              <h4>{comment.username}</h4>
              <p>{comment.text}</p>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}

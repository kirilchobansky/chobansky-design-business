import { useEffect, useState } from "react";
import commentsApi from "../api/comments-api";

export function useGetAllCommentsByProject(projectId) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const commentsResult = await commentsApi.getAllByProject(projectId);
                setComments(commentsResult);
            } catch (error) {
                console.error("Failed to fetch comments:", error);
            }
        })();
    }, []);

    return [comments, setComments];
}
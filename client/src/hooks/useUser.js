import { useEffect, useState } from "react";
import { deleteUser, getLikedProjects, updateUser } from "../api/user-api";
import { useAuthContext } from "../contexts/AuthContext";

export const useUpdateUser = () => {
    const { changeAuthState } = useAuthContext();

    const updatedUserHandler = async (userId, userData) => {
        const updatedUser = await updateUser(userId, userData);
        changeAuthState(updatedUser);
        return updatedUser;
    }

    return updatedUserHandler;
};

export const useDeleteUser = () => {
    const { changeAuthState } = useAuthContext();

    const deletedUserHandler = async (userId) => {
        const deletedUser = await deleteUser(userId);
        changeAuthState(deletedUser);
    }

    return deletedUserHandler;
};

export const useGetLikedProjects = (userId) => {
    const [likedProjects, setLikedProjects] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const initialLikes = await getLikedProjects(userId);
                const likesMap = initialLikes.reduce((acc, project) => {
                    acc[project._id] = true;
                    return acc;
                }, {});
                setLikedProjects(likesMap);
            } catch (error) {
                console.error("Failed to fetch liked projects:", error);
            }
        })();
    }, [userId]);

    return [likedProjects, setLikedProjects];
};
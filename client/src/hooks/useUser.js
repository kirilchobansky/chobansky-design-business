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

export const useGetLikedProjects = (userId, type) => {
    const [likedProjects, setLikedProjects] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const likedProjectsAsArray = await getLikedProjects(userId);
                const likedProjectsAsObject = likedProjectsAsArray.reduce((acc, project) => {
                    acc[project._id] = true;
                    return acc;
                }, {});
                if (type === 'array') {
                    setLikedProjects(likedProjectsAsArray);
                } else if (type === 'object') {
                    setLikedProjects(likedProjectsAsObject);
                }
            } catch (error) {
                console.error("Failed to fetch liked projects:", error);
            }
        })();
    }, [userId]);

    return [likedProjects, setLikedProjects];
};
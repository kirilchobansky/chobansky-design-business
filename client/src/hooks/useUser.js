import { useEffect, useState } from "react";
import userApi from "../api/user-api";
import { useAuthContext } from "../contexts/AuthContext";

export const useUpdateUser = () => {
    const { changeAuthState } = useAuthContext();

    const updatedUserHandler = async (userId, userData) => {
        const updatedUser = await userApi.updateUser(userId, userData);
        changeAuthState(updatedUser);
        return updatedUser;
    }

    return updatedUserHandler;
};

export const useDeleteUser = () => {
    const { changeAuthState } = useAuthContext();

    const deletedUserHandler = async (userId) => {
        const deletedUser = await userApi.deleteUser(userId);
        changeAuthState(deletedUser);
    }

    return deletedUserHandler;
};

export const useGetLikedProjects = (userId, type) => {
    const [likedProjects, setLikedProjects] = useState(
        type === 'array' ? [] : {}
    );

    useEffect(() => {
        if (!userId) return;

        (async () => {
            try {
                const likedProjectsAsArray = await userApi.getLikedProjects(userId);
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
    }, [userId, type]);

    return [likedProjects, setLikedProjects];
};

export const useGetSearch = (search) => {
    const [projects, setProjects] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await userApi.search(search);
                setProjects(response.projects);
                setOrders(response.orders);
            } catch (error) {
                console.error("Failed to fetch searched data:", error);
            }
        })();
    }, [search]);

    return { projects, orders };
};

export const useChangePassword = () => {
    const { changeAuthState } = useAuthContext();

    const changePasswordHandler = async (userId, oldPassword, newPassword) => {
        const newUser = await userApi.changePassword(userId, oldPassword, newPassword);
        changeAuthState(newUser);
    }

    return changePasswordHandler;
}
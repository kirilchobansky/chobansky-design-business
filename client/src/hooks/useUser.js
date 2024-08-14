import { deleteUser, updateUser } from "../api/user-api";
import { useAuthContext } from "../contexts/AuthContext";

export const useUpdateUser = () => {
    const { changeAuthState } = useAuthContext();

    const updatedUserHandler = async (userId, userData) => {
        const updatedUser = await updateUser(userId, userData);
        changeAuthState(updatedUser);
        return updatedUser;
    }

    return updatedUserHandler;
}

export const useDeleteUser = () => {
    const { changeAuthState } = useAuthContext();

    const deletedUserHandler = async (userId) => {
        const deletedUser = await deleteUser(userId);
        changeAuthState(deletedUser);
    }

    return deletedUserHandler;
}
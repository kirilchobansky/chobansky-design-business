import { createContext } from "react";
import usePersistedState from "../hooks/usePersistedState";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [authState, setAuthState] = usePersistedState('auth', {});

    const changeAuthState = (state) => {
        setAuthState(state);
    }

    const contextData = {
        username: authState.username,
        accessToken: authState.accessToken,
        isAuthenticated: !!authState.email,
        changeAuthState
    }

    return (
        <AuthContext.Provider value={contextData}>
            {props.children}
        </AuthContext.Provider>
    )
}
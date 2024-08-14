import { createContext, useContext } from "react";
import usePersistedState from "../hooks/usePersistedState";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [authState, setAuthState] = usePersistedState("auth", {});

  const changeAuthState = (state) => {
    setAuthState(state);
  };

  const logout = () => {
    setAuthState(null);
    localStorage.removeItem("auth");
  };

  const contextData = {
    userId: authState?.id,
    email: authState?.email,
    username: authState?.username,
    address: authState?.address,
    phone: authState?.phone,
    accessToken: authState?.token,
    isAuthenticated: !!authState?.email,
    changeAuthState,
    logout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token) {
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        return decodedToken.exp < currentTime;
    } catch (error) {
        return true;
    }
}

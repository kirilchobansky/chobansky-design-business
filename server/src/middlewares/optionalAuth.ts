import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../config";

// Sets req.user when a valid token is sent, but never rejects the request.
export default (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      req.user = verify(token, JWT_SECRET);
    } catch (error) {
      // ignore - treated as a guest
    }
  }

  next();
};

import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export default (req: any, res: any, next: any) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (token) {
    try {
      verify(token, JWT_SECRET);
      return res.status(403).send("Access denied. User is authenticated.");
    } catch (error) {
      return next();
    }
  } else {
    return next();
  }
};

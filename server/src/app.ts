import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes";
import "./config";

// Treat any object in a query value as a literal, so `{ "$ne": null }` from a request body can't act as an operator.
mongoose.set("sanitizeFilter", true);

const app = express();

app.disable("x-powered-by");
app.use(express.json({ limit: "100kb" }));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.use(router);

// Central error handler: malformed ids / invalid data are client errors, everything else is a generic 500.
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (res.headersSent) {
      return next(err);
    }

    if (
      err?.name === "BSONError" ||
      err?.name === "CastError" ||
      err?.name === "ValidationError"
    ) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    if (err?.type === "entity.parse.failed" || err?.type === "entity.too.large") {
      return res.status(err.status || 400).json({ message: "Invalid request body" });
    }

    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
);

export default app;

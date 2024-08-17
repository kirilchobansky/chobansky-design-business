import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes";

const app = express();

app.use(express.json());
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

const port = 3000;

mongoose.connect("mongodb://localhost:27017/chobansky-design").then(() => {
  console.log("DB is successfully connected");
  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
});

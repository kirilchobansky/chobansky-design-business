import mongoose from "mongoose";
import app from "./app";

const port = 3000;

mongoose.connect("mongodb://localhost:27017/chobansky-design").then(() => {
  console.log("DB is successfully connected");
  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
});

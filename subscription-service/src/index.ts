import express from "express";
import dotenv from "dotenv";
import { initRoutes } from "./routes";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("server started. port:", PORT);
});

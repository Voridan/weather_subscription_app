import express from "express";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("server started. port:", PORT);
});

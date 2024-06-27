import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectToMongoDB } from "./database";
import router from "./routes"; 
import SomeModel from "./models/UserModel";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", router);

const port = process.env.PORT || 5000;

async function startServer() {
  await connectToMongoDB();
  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
}

startServer();
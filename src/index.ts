import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import { connectToMongoDB } from "./database";
import router from "./routes"; 
import SomeModel from "./models/UserModel";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", router);

app.get("/api/data", async (req: Request, res: Response) => {
  try {
    const data = await SomeModel.find(); 
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = process.env.PORT || 5000;

async function startServer() {
  await connectToMongoDB();
  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
}

startServer();
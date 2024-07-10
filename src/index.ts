import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectToMongoDB } from "./database";
import morgan from 'morgan';
import router from "./routes";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use("/api", morgan(':method :url :status :res[content-length] - :response-time ms'), router)

const port = process.env.PORT || 5000;

async function startServer() {
  await connectToMongoDB();
  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
}

startServer();

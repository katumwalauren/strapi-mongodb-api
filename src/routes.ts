import express, { Request, Response } from 'express';
import { getConnectedClient } from './database';
import { MongoClient, ObjectId, Collection } from 'mongodb';

const router = express.Router();

const getCollection = async (): Promise<Collection> => {
  const client: MongoClient | undefined = await getConnectedClient();
  if (!client) {
    throw new Error('Failed to get a connected client');
  }
  return client.db("usersdb").collection("users");
};

router.post("/users", async (req: Request, res: Response) => {
  try {
    const collection = await getCollection();
    const { todo } = req.body;
    const newTodo = await collection.insertOne({ todo, status: false });
    res.status(201).json({ todo, status: false, _id: newTodo.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/users", async (req: Request, res: Response) => {
  try {
    const collection = await getCollection();
    const users = await collection.find({}).toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;

import express, { Request, Response } from "express";
import { getConnectedClient } from "./database";
import { MongoClient, ObjectId, Collection } from "mongodb";

const router = express.Router();

const getCollection = async (): Promise<Collection> => {
  const client: MongoClient | undefined = await getConnectedClient();
  if (!client) {
    throw new Error("Failed to get a connected client");
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

router.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const collection = await getCollection();
    const { id } = req.params;
    const { name, email, password, createdTime } = req.body;

    const updatedUser = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          email,
          password,
          createdTime,
        },
      }
    );

    if (updatedUser.modifiedCount === 0) {
      res.status(404).send("User not found");
      return;
    }

    res.status(200).send("User updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const collection = await getCollection();
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).send("Invalid user ID format");
    }

    const user = await collection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;

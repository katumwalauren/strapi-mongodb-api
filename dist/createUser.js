"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const router = express_1.default.Router();
const getCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield (0, database_1.getConnectedClient)();
    if (!client) {
        throw new Error('Failed to get a connected client');
    }
    return client.db("usersdb").collection("users");
});
router.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collection = yield getCollection();
        const { todo } = req.body;
        const newTodo = yield collection.insertOne({ todo, status: false });
        res.status(201).json({ todo, status: false, _id: newTodo.insertedId });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}));
router.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collection = yield getCollection();
        const users = yield collection.find({}).toArray();
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}));
exports.default = router;

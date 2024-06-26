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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectedClient = exports.connectToMongoDB = void 0;
const dotenv_1 = require("dotenv");
const mongodb_1 = require("mongodb");
(0, dotenv_1.config)();
const uri = process.env.MONGODB_URL || "mongodb://localhost:27017/users";
const options = {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
};
let client;
const connectToMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!client) {
        try {
            client = yield mongodb_1.MongoClient.connect(uri, options);
            console.log("Connected to MongoDB");
        }
        catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw error;
        }
    }
    return client;
});
exports.connectToMongoDB = connectToMongoDB;
const getConnectedClient = () => client;
exports.getConnectedClient = getConnectedClient;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const connectMongoDB_1 = require("./src/config/connectMongoDB");
const PORT = 8000;
const app = (0, express_1.default)();
(0, connectMongoDB_1.runDatabaseConnection)().catch(console.error);
app.get("/", (req, res) => {
    res.send("Hello from Express my bro");
});
app.listen(PORT, () => {
    console.log(`Now listening on PORT: ${PORT}`);
});

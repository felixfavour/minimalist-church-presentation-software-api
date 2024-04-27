import "dotenv/config";
import express from "express";

import { runDatabaseConnection } from "./config/connectMongoDB";

const PORT = process.env.PORT || 8000;
const app = express();

runDatabaseConnection().catch(console.error);

app.get("/", (req, res) => {
    res.send("Hello from Express my bro");
});

app.listen(PORT, () => {
    console.log(`Now listening on PORT: ${PORT}`);
});

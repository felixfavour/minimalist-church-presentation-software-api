import http from "http";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { setupWebSocket } from "./websocket.js";

const port = process.env.PORT || 4500;

await connectDB();

const server = http.createServer(app);

const io = setupWebSocket(server);

app.use((req, res, next) => {
    req.io = io;
    next();
});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

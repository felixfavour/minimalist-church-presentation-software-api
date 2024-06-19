import server from "./app.js";
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 4500;

await connectDB();

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

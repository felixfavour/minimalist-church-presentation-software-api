import express, { json, urlencoded } from "express";
import cors from "cors";
import initialRoute from "./routes/server.js";
import logRequests from "./middlewares/logger.js";
import isAuth, { emailVerified } from "./middlewares/auth.js";
import userAuth from "./routes/user-auth.js";
import userCRUD from "./routes/user-crud.js";
import songCRUD from "./routes/song.js";

const app = express();

// Set CORS
app.use(cors());

// Parse JSON requests
app.use(json());

// Log all requests
app.use(logRequests);

// Parse FormData requests
app.use(urlencoded({ extended: true }));

// Check that user is authenticated
app.use(isAuth);

// Check that user has verified email
app.use(emailVerified);

// Registering routes
// Home route - Unaffected by [isAuth] middleware
app.use("", initialRoute);

// UserAuth route - Unaffected by [isAuth] middleware
app.use("/auth", userAuth);

// UserCRUD (Organization and Reviewer) route
app.use("/user", userCRUD);

// Song-temp routes
app.use("/song", songCRUD);

export default app;

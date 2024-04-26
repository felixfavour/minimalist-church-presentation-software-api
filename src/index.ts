import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import dotenv from "dotenv";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

dotenv.config();

export const uri = process.env.MONGO_DB_URI!;
export const jwt_secret = process.env.JWT_SECRET!;

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

mongoose
    .connect(uri)
    .then(() => {
        console.log("connection successful");
        return server.listen({ port: 5000 });
    })
    .then((res) => {
        console.log(`server ruunning at ${res.url}`);
    });

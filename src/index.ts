import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import mongoose from "mongoose";

import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import { context } from "./graphql/contexts";

dotenv.config();

export const uri = process.env.MONGO_DB_URI!;
export const jwtSecret = process.env.JWT_SECRET!;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
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

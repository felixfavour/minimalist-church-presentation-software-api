import { gql } from "apollo-server";

export const churchTypeDefs = gql`
    type Church {
        id: ID!
        name: String!
        type: String!
        email: String!
        password: String!
        address: String!
        pastor: String!
    }

    input ChurchSignupInput {
        name: String!
        type: String!
        address: String!
        email: String!
        password: String!
        pastor: String!
    }

    type Query {
        getChurch(email: String!): Church
    }

    type Mutation {
        signUp(input: ChurchSignupInput!): Church
        login(email: String!, password: String!): String
    }
`;

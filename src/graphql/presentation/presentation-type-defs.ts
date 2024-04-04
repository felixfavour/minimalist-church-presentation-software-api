import { gql } from "apollo-server-core";

export const presentationTypeDefs = gql`
    type Presentation {
        title: String
    }

    input PresentationInput {
        title: String
    }

    type Query {
        getPresentation(id: ID!): Presentation!
        getPresentations: [Presentation]
    }

    type Mutation {
        createPresentation(presentationInput: PresentationInput): Presentation!
        deletePresentation(id: ID!): Boolean
        editPresentation(id: ID!, presentationInput: PresentationInput): Boolean
    }
`;

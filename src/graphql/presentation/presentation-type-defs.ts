import { gql } from "apollo-server-core";

export const presentationTypeDefs = gql`
    type Slide {
        id: ID!
        name: String!
        type: String!
        layout: String!
        contents: [String!]!
        backgroundType: String
        background: String
        presentationId: ID!
    }

    type Presentation {
        id: ID!
        title: String!
        slides: [Slide!]!
    }

    input CreatePresentationInput {
        title: String
    }

    input PresentationInput {
        title: String
    }

    type Query {
        getPresentation(id: ID!): Presentation!
        getPresentations: [Presentation!]!
    }

    type Mutation {
        createPresentation(
            presentationInput: CreatePresentationInput
        ): Presentation!
        deletePresentation(id: ID!): Boolean
        editPresentation(id: ID!, presentationInput: PresentationInput): Boolean
    }
`;

import { gql } from "graphql-tag";

const typeDefs = gql`
  input GenerateAndSendPassCodeInput {
    phoneNumber: String!
  }

  input ResolvePassCodeInput {
    passCode: String!
    phoneNumber: String!
    genericInvitationId: String
  }

  type GenerateAndSendPassCodeResponse {
    success: Boolean!
    error: String
    token: String
  }

  type ResolvePassCodeResponse {
    isNewUser: Boolean
    success: Boolean!
    token: String
    error: String
  }

  type LogoutResponse {
    success: Boolean!
    error: String
  }

  type CurrentUser {
    _id: String!
    createdAt: DateTime
    email: String
    phoneNumber: String
  }

  extend type Mutation {
    generateAndSendPassCode(
      input: GenerateAndSendPassCodeInput!
    ): GenerateAndSendPassCodeResponse!
    logout: LogoutResponse!
    resolvePassCode(input: ResolvePassCodeInput!): ResolvePassCodeResponse!
  }

  extend type Query {
    currentUser: CurrentUser
  }
`;

export default typeDefs;

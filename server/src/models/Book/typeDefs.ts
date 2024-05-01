import { gql } from "graphql-tag";

const typeDefs = gql`
  type Book {
    _id: String!
    author: String!
    title: String!
  }

  input CreateBookInput {
    author: String!
    title: String!
  }

  type CreateBookResponse {
    book: Book
    error: String
    success: Boolean!
  }

  input DeleteBookInput {
    bookId: String!
  }

  type DeleteBookResponse {
    error: String
    success: Boolean!
  }

  extend type Mutation {
    createBook(input: CreateBookInput!): CreateBookResponse!
    deleteBook(input: DeleteBookInput!): DeleteBookResponse!
  }

  extend type Query {
    booksByCurrentUser: [Book!]
  }
`;

export default typeDefs;

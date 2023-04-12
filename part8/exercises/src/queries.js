import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
      genres
    }
  }
`;

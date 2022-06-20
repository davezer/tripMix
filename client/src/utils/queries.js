import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      email
    }
  }
`;



export const GET_ME = gql`
  {
    me {
      _id
      email
    }
  }
`;

const { gql } = require('apollo-server-express');

// need to do some work on the mutations, not sure they are right
const typeDefs = gql`
    type Auth {
        token: ID!
        user: User
    }
    type User {
        _id: ID
        email: String
        tripCount: Int
        trips: [Trip]
    }
    type Trip {
        _id: ID
        tripName: String
        category: String
        email: String
       
    }
    type Query {
        me: User
        users: [User]
        user(email: String!): User
        trips(email: String): [Trip]
        trip(_id: ID!): Trip
    
    }
    
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(email: String!, password: String!): Auth
        addTrip(tripName: String!, category: String!): Trip
        removeTrip(TripId: ID!): User
      
    }
`;

module.exports = typeDefs;
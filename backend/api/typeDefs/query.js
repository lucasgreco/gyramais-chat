const { gql } = require("apollo-server");

const query = gql`
  type Query {
    messages:[Message!]!
    user(id:ID!):User
    users:[User!]!
    usersOnline:Int!
  }
`;

module.exports = query;

const { gql } = require("apollo-server");

const query = gql`
  type Query {
    messages:[Message!]!
    users:[User!]!
    usersOnline:Int!
  }
`;

module.exports = query;

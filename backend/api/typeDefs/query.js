const { gql } = require("apollo-server");

const query = gql`
  type Query {
    messages(chatRoom:ChatRoomInput!):[Message!]!
    message(id: ID!):Message!
    users(chatRoom:ChatRoomInput!):[User!]!
    usersOnline(chatRoom:ChatRoomInput!):Int!
  }
`;

module.exports = query;

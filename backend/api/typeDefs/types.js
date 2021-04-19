const { gql } = require("apollo-server");

const types = gql`
  scalar DateTime

  type Message {
    id: ID!
    user:User!
    content: String!
    createdAt:DateTime
  }

  type User{
    id:ID
    nickname:String
}

  type Subscription {
    newMessage: Message
    usersOnline: Int
  }
`;

module.exports = types;

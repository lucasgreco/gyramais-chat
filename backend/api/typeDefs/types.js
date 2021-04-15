const { gql } = require("apollo-server");

const types = gql`
  scalar DateTime

  type Message {
    _id: ID!
    user:String
    content: String!
    createdAt:DateTime
    chatRoom:ChatRoom
  }

  type ChatRoom {
      id:ID!
      name: ChatRoomType!
  }

  type User{
    _id:ID!
    nickname:String
    chatRoom:ChatRoom
}

  type Subscription {
      newMessage: Message
      newUser:User
  }

  interface respostaCustom {
      #tipo abstrato
      code: Int!
      mensagem:String!
  }

  type deletaUserResposta implements respostaCustom {
      code: Int!
      mensagem:String!
  }

  type atualizaUserResposta implements respostaCustom {
      code: Int!
      mensagem:String!
      user: Message!
  }
`;

module.exports = types;

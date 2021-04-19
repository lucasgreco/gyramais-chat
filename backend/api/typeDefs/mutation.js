const { gql } = require("apollo-server");

const mutation = gql`
  type Mutation {
    # criar nova mensagem
    createMessage(message: MessageInput): Message

    #registrar novo usuário logado
    loginUser(user:UserInput):User

    #deslogar usuario
    logoutUser(user:UserInput):String
  }

  input MessageInput{
    user:UserInput!
    content: String
    createdAt:DateTime
  }

  input UserInput{
    id:ID
    nickname:String!
  }
`;

module.exports = mutation;

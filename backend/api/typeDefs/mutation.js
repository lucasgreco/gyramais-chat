const { gql } = require("apollo-server");

const mutation = gql`
  type Mutation {
    # criar nova mensagem
    createMessage(message: MessageInput): Message

    # editar mensagem ja enviada
    updateMessage(id: String, message: MessageInput): Message

    #deletar mensagem
    deleteMessage(id: String): Message

    #registrar novo usuário logado
    loginUser(user:UserInput):User
    
    #editar usuario logado (usado para trocar usuario de sala)
    updateUser(id:String, user:UserInput):User

    #deslogar usuario
    logoutUser(nickname:String!):String
  }

  input MessageInput{
    user:String!
    content: String
    createdAt:DateTime
    chatRoom:ChatRoomInput

  }

  input ChatRoomInput{
      name:ChatRoomType!
  }

  input UserInput{
    nickname:String!
    chatRoom:ChatRoomInput
  }

  enum ChatRoomType{
      GERAL
      TRABALHO
      MUSICA
      ESPORTES
  }
`;

module.exports = mutation;

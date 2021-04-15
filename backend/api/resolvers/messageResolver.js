const { GraphQLScalarType } = require('graphql')
const Message = require('../models/message')

const messageResolvers = {
    ChatRoomType:{
        GERAL:"GERAL",
        TRABALHO:"TRABALHO",
        MUSICA:"MUSICA",
        ESPORTES:"ESPORTES",
    },
    DateTime: new GraphQLScalarType({
        name:'DateTime',
        description:'string de data e hora no formato ISO-8601',
        serialize:(value) => value.toISOString(),
        parseValue: (value) => new Date(value),
        parseLiteral:(ast) => new Date(ast.value),
    }),
    Query:{
        messages(_,{ chatRoom }){
            return Message.find({chatRoom: chatRoom}).sort({createdAt:1});
        },
        message(_, { id }) {
            return Message.findById(id)
        }
    },
    Mutation:{
        createMessage(_, { message }) {
            message.createdAt = new Date().toISOString()
            const newMessage = new Message(message);
            return newMessage.save();
          },
          updateMessage(_, { id, message }) {
            return Message.findByIdAndUpdate(id, message, {
              new: true,
            });
          },
          deleteMessage(_, { id }) {
            return Message.findByIdAndRemove(id);
          },
        // atualizaUser: async (root, novosDados, {dataSources}) => dataSources.usersAPI.atualizaUser(novosDados),
        
        // deletaUser: async (root, {id}, {dataSources}) => dataSources.usersAPI.deletaUser(id)
    }
};

module.exports = messageResolvers;
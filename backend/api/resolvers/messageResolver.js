const { GraphQLScalarType } = require('graphql');
const { PubSub } = require('apollo-server');
const Message = require('../models/message');
const MESSAGE_CREATED = 'MESSAGE_CREATED';
const messageResolvers = {
    DateTime: new GraphQLScalarType({
        name:'DateTime',
        description:'string de data e hora no formato ISO-8601',
        serialize:(value) => value.toISOString(),
        parseValue: (value) => new Date(value),
        parseLiteral:(ast) => new Date(ast.value),
    }),
    Query:{
        messages(){
            return Message.find().sort({createdAt:1});
        },
    },
    Mutation:{
        createMessage: async (_, { message }, {pubsub} ) => {
            message.createdAt = new Date().toISOString()
            const newMessage = new Message(message);
            let res = await newMessage.save();
            pubsub.publish(MESSAGE_CREATED, {
              newMessage: res
            });
            return res
          }
    },
    Subscription: {
      newMessage: {
       subscribe: (_,__,{pubsub}) => pubsub.asyncIterator(MESSAGE_CREATED)
      }
    }
};

const pubsub = new PubSub();

module.exports = messageResolvers;
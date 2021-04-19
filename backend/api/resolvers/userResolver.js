const { PubSub } = require('apollo-server');
const User = require('../models/user')
const Message = require('../models/message');
const USERS_ONLINE = 'USERS_ONLINE';
const MESSAGE_CREATED = 'MESSAGE_CREATED';
const userResolvers = {
    Query:{
        user(_,{id}){
            return User.findById(id);
        },
        users() {
            return User.find();
        },
        usersOnline(){
            return User.find().countDocuments();
        }
    },
    Mutation:{
          loginUser: async (_, { user }, {pubsub}) => {
            const newUser = new User(user);
            await newUser.save();
            pubsub.publish(USERS_ONLINE,{ usersOnline: User.find().countDocuments()});

            // emite notificação de novo usuario no chat
            let date = new Date().toISOString()
            const newUserNotification = new Message({content:`${newUser.nickname} entrou.`,createdAt:date});
            let res = await newUserNotification.save();
            pubsub.publish(MESSAGE_CREATED, {
              newMessage: res
            });
            return newUser;
          },

          logoutUser: async (_, { user }, {pubsub}) => {
            await User.findByIdAndDelete(user.id);
            pubsub.publish(USERS_ONLINE,{ usersOnline: User.find().countDocuments()});

            // emite notificação de que o usuario saiu do chat
            let date = new Date().toISOString()
             const newUserNotification = new Message({content:`${user.nickname} saiu.`,createdAt:date});
             let res = await newUserNotification.save();
             pubsub.publish(MESSAGE_CREATED, {
               newMessage: res
             });


            return 'Usuario deslogado!'
          },
    },
    Subscription: {
      usersOnline:{
        subscribe:(_,__, {pubsub}) => {
          return pubsub.asyncIterator(USERS_ONLINE);
        }
      }
    }
}

const pubsub = new PubSub();

module.exports = userResolvers;
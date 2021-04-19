const { PubSub } = require('apollo-server');
const User = require('../models/user')
const USER_LOGIN = 'USER_LOGIN';
const USERS_ONLINE = 'USERS_ONLINE';
const USER_LOGGOUT = 'USER_LOGOUT';
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
            pubsub.publish(USER_LOGIN,{userLogin: newUser});
            pubsub.publish(USERS_ONLINE,{ usersOnline: User.find().countDocuments()});
            return newUser;
          },
          logoutUser: async (_, { user }, {pubsub}) => {
            await User.findByIdAndDelete(user.id);
            pubsub.publish(USER_LOGGOUT,{userLoggout: user});
            pubsub.publish(USERS_ONLINE,{ usersOnline: User.find().countDocuments()});
            return 'Usuario deslogado!'
          },
    },
    Subscription: {
      userLogin:{
        subscribe:(_,__, {pubsub}) => {
          return pubsub.asyncIterator(USER_LOGIN);
        }
      },
      usersOnline:{
        subscribe:(_,__, {pubsub}) => {
          return pubsub.asyncIterator(USERS_ONLINE);
        }
      },
      userLogout:{
        subscribe:(_,__, {pubsub}) => {
          return pubsub.asyncIterator(USER_LOGGOUT);
        }
      }
    }
}

const pubsub = new PubSub();

module.exports = userResolvers;
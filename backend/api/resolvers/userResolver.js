const User = require('../models/user')

const userResolvers = {
    Query:{
        users(_,{ chatRoom }) {
            return User.find({chatRoom: chatRoom}).sort({createdAt:1});
        },
        usersOnline(_,{ chatRoom }){
            return User.find({chatRoom: chatRoom}).countDocuments();
        }
    },
    Mutation:{
          loginUser(_, { user }) {
            const newUser = new User(user);
            return newUser.save();
          },
          logoutUser(_, { nickname }) {
            return User.findOneAndDelete({nickname: nickname });
          },
          updateUser(_, { user }) {
            return User.replaceOne({nickname: user.nickname }, user);
          },
    }
}

module.exports = userResolvers;
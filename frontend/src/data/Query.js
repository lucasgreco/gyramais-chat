import gql from 'graphql-tag';

const UsersQuery = gql`
  query {
    users {
      id
      nickname
    }
  }
`;

const UserQuery = gql`
  query($id:ID!) {
    user(id:$id) {
      id
      nickname
    }
  }
`;

const UsersOnlineQuery = gql`
  query {
    usersOnline 
  }
`;

const MessagesQuery = gql`
  query {
    messages{
      id
      content
      createdAt
      user{
        id
        nickname
      }
    }
  }
`;

const CreateMessageMutation = gql`
  mutation($content:String!,$id:ID!,$nickname:String!){
    createMessage(message:{
      content:$content
      user:{
        id:$id
        nickname:$nickname
      }
    }){
      id
      content
      user{ 
        id
        nickname
      }
      createdAt
    }
  }
`;

const UserLoginMutation = gql`
  mutation($nickname:String!){
    loginUser(user:{nickname:$nickname}){
      id
      nickname
    }
  }
`;

const UserLogoutMutation = gql`
  mutation($id:ID!, $nickname:String!){
    logoutUser(user:{id:$id,nickname:$nickname})
  }
`;

const UsersOnlineSubscription = gql`
  subscription{
    usersOnline
  }
`;

const NewMessageSubscription = gql`
  subscription{
    newMessage{
      content
      createdAt
      user{
        id
        nickname
      }
    }
  }
`;

const UserLoginSubscription = gql`
  subscription{
    userLogin{
      id
      nickname
    }
  }
`;

const UserLogoutSubscription = gql`
  subscription{
    userLogout{
      id
      nickname
    }
  }
`;

export {
  UserQuery,
  UsersQuery,
  UsersOnlineQuery,
  MessagesQuery,
  CreateMessageMutation,
  UserLoginMutation,
  UserLogoutMutation,
  UsersOnlineSubscription,
  NewMessageSubscription,
  UserLoginSubscription,
  UserLogoutSubscription
};
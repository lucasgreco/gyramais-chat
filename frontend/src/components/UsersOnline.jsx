import React from 'react'
import './UsersOnline.css';
import { useQuery } from '@apollo/client';
import {
    UsersOnlineQuery,
    UsersOnlineSubscription,
  } from '../data/Query';

function UsersOnline(props) {
    //inicializa com zero
    let usersOnline = 0;

    //faz a query e continua escutando para alterações na qtd de usuarios online
    const { subscribeToMore, ...result } = useQuery(UsersOnlineQuery);
    subscribeToMore({
      document: UsersOnlineSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newUserOnline = subscriptionData.data.usersOnline;
        console.log(newUserOnline);
        return Object.assign({}, prev, {
            usersOnline: newUserOnline
          });  
      }
    });
    if(result.data){
      usersOnline = result.data.usersOnline;
    }


    return(
        <>
            <div className="online"></div>
            <span>Online: {usersOnline}</span>
        </>
    )
}
export default UsersOnline;
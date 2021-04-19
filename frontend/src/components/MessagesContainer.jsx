import React,  {  useEffect, useRef } from "react";
import { useQuery } from '@apollo/client';

import Message from "./Message";
import {
    MessagesQuery,
    NewMessageSubscription
  } from '../data/Query';

function MessagesContainer(_) {
    let messages = [];

    //funcionamento do scroll bar
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        if(messagesEndRef.current){
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    useEffect(scrollToBottom, [messages]);

    //query das mensagens com subscribe
    const  { loading, error, data, subscribeToMore } = useQuery(MessagesQuery);
    subscribeToMore({
        document: NewMessageSubscription,
        updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.newMessage;
        return Object.assign({}, prev, {
            messages: [newFeedItem, ...prev.messages]
        });  
        }
    });

  if ( loading  ) return <p>Loading...</p>;
  if ( error ) return <p>Error :(</p>;
  if(data) {
    messages = data.messages;
  }


  const messagesLi = messages.map((message) => {
    return (
      <Message key={message.id} userId={message.user.id} user={message.user.nickname} content={message.content} createdAt={message.createdAt} />
    )
  })

    return(
        <>
            {messagesLi}
            <div ref={messagesEndRef} />
        </>
    )
}
export default MessagesContainer;
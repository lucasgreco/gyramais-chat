import React,  {  useEffect, useRef, useState } from "react";
import { useQuery } from '@apollo/client';

import './MensagensContainer.css';
import Mensagem from "./Mensagem";
import {
    MessagesQuery,
    NewMessageSubscription
  } from '../data/Query';

function MensagensContainer(_) {
    let mensagens = [];

    //funcionamento do scroll bar
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        if(messagesEndRef.current){
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    useEffect(scrollToBottom, [mensagens]);

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
    mensagens = data.messages;
  }


  const mensagensLi = mensagens.map((mensagem) => {
    return (
      <Mensagem key={mensagem.id} userId={mensagem.user.id} user={mensagem.user.nickname} content={mensagem.content} createdAt={mensagem.createdAt} />
    )
  })

    return(
        <>
            {mensagensLi}
            <div ref={messagesEndRef} />
        </>
    )
}
export default MensagensContainer;
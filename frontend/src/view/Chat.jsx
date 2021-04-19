import React,  {  useEffect, useRef, useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button} from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import "./Chat.css";

import {
  UserQuery,
  MessagesQuery,
  CreateMessageMutation,
  UserLogoutMutation,
  NewMessageSubscription,
} from '../data/Query';

import Mensagem from "../components/Mensagem";


export default function Chat(props) {

  const history = useHistory();


  //verifica se o ID esta guardado, ou redireciona para o login
  const userID =(localStorage.getItem('token') || history.push("/"));


  const[newMessage,setNewMessage] = useState('');

  let user = {};
  let mensagens = [];
  //funcionamento do scroll bar
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    if(messagesEndRef.current){
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(scrollToBottom, [mensagens])

  const [logoutUser] = useMutation(UserLogoutMutation,{
    onCompleted({ logoutUser }) {
      if (logoutUser) {
        localStorage.removeItem('token');
        history.push("/");
      }
    }
  });
  //mutation para enviar nova mensagem
  const [createMessage] = useMutation(CreateMessageMutation);

  //query das mensagens ja cadastradas
  const userRes = useQuery(UserQuery,{variables:{id:userID}});
  

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

  if ( loading || userRes.loading ) return <p>Loading...</p>;
  if ( error || userRes.error) return <p>Error :(</p>;
  if(data) {
    mensagens = data.messages;
  }
  if(userRes.data){
    user = userRes.data.user
  }


  const mensagensLi = mensagens.map((mensagem) => {
    return (
      <Mensagem key={mensagem.id} userId={mensagem.user.id} user={mensagem.user.nickname} content={mensagem.content} createdAt={mensagem.createdAt} />
    )
  })

  return (
    <div className="Chat">
      <div className="Title">
        <span>Bem-vindo, {user.nickname}</span>
        <Button className="logout-button btn-danger" onClick={ () => {
            logoutUser({
              variables:{
                  id: user.id,
                  nickname: user.nickname
              }
            })
          }            
        }>Sair</Button>
      </div>
      <SimpleBar className="Content">
        {mensagensLi}
        <div ref={messagesEndRef} />
      </SimpleBar>
      
      <Row className="send-message">
        <Col xs={8} className="send-message-input">
          <textarea name="" id="" cols="30" rows="10" value={newMessage} onChange={e=> setNewMessage(e.target.value)}></textarea>
        </Col>
        <Col className="send-message-button">
          <Button className="form-buttom" onClick={() => {
            createMessage({
              variables:{
                content: newMessage,
                id:user.id,
                nickname:user.nickname
              }
            });
            setNewMessage('');
          }}>Enviar</Button>
        </Col>
      </Row>
    </div>
  );
};

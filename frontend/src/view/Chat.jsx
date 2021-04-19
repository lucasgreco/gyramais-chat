import React,  { useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button} from 'react-bootstrap';
import "./Chat.css";

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import {
  UserQuery,
  CreateMessageMutation,
} from '../data/Query';

import UsersOnline from "../components/UsersOnline";
import BotaoLogout from "../components/BotaoLogout";
import MensagensContainer from "../components/MensagensContainer";

export default function Chat(props) {
  const history = useHistory();
  
  //verifica se o ID esta guardado, ou redireciona para o login
  const userID =(localStorage.getItem('token') || history.push("/"));

  let user = {};

  const[newMessage,setNewMessage] = useState('');
  //mutation para enviar nova mensagem
  const [createMessage] = useMutation(CreateMessageMutation);

  //query do usuario logado
  const userRes = useQuery(UserQuery,{variables:{id:userID}});

  if ( userRes.loading ) return <p>Loading...</p>;
  if ( userRes.error) return <p>Error :(</p>;

  if(userRes.data){
    user = userRes.data.user
  }

  return (
    <div className="Chat">
      <div className="Title">
        <span>Bem-vindo, {user.nickname}</span>
        <div className="online-wrapper">
          <UsersOnline />
          <BotaoLogout user={user} />
        </div>
      </div>
      <SimpleBar className="Content">
        <MensagensContainer />
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

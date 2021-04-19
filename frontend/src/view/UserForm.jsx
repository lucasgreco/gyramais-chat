import React, { useState } from "react";
import {Container, Row, Col, Button} from 'react-bootstrap';
import "./UserForm.css"
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import {
    UserLoginMutation
  } from '../data/Query';
export default function UserForm(props) {
    
    //inicializa hooks
    const history = useHistory();
    const [userState, setUserState] = useState({
        id:'',
        nickname: '',
      });


    //verifica se usuário ja está logado e redireciona para o chat
    let user = localStorage.getItem('token');
    if(user){
        history.push("/chat");
    }


    
    const [loginUser] = useMutation(UserLoginMutation,
        {
          onCompleted({ loginUser }) {
            if (loginUser) {
              localStorage.setItem('token', loginUser.id);
              history.push("/chat");
            }
          }
        });

    const submitUser =  (e) => {
            e.preventDefault();
            loginUser({
                variables:{
                    nickname: userState.nickname,
                }
            });

        }

  return (
    <Container className="user-container">
        <div className="user-wrapper">

        <Row className="justify-content-md-center">
            <Col md={6}>
                <h1>Escolha o seu Nickname:</h1>
            </Col>
        </Row>
        <Row className="justify-content-md-center">
            <Col md={6}>
                <form className="form-card" onSubmit={(e) => submitUser(e)}>
                    <Row className="justify-content-md-center">
                        <Col xs={8}>
                            <input className="user-input" value={userState.nickname} onChange={(e) =>
                                setUserState({
                                    ...userState,
                                    nickname: e.target.value
                                })
                            }
                            >
                            </input>
                        </Col>
                        <Col xs={4}>
                            <Button type="submit" className="form-buttom">Entrar no Chat</Button>
                        </Col>
                    </Row>
                </form>
            </Col>
        </Row>
        </div>
    </Container>
  );
};

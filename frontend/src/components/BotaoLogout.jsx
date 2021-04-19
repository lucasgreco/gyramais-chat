import React from 'react'
import './BotaoLogout.css';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Button} from 'react-bootstrap';
import {
    UserLogoutMutation
  } from '../data/Query';

function BotaoLogout(props) {
    const history = useHistory();
    const user = props.user;

    const [logoutUser] = useMutation(UserLogoutMutation,{
        onCompleted({ logoutUser }) {
          if (logoutUser) {
            localStorage.removeItem('token');
            history.push("/");
          }
        }
      });

    return(
        <>
            <Button className="logout-button btn-danger" onClick={ () => {
              logoutUser({
                variables:{
                    id: user.id,
                    nickname: user.nickname
                }
              })
            }            
            }>Sair</Button>
        </>
    )
}
export default BotaoLogout;
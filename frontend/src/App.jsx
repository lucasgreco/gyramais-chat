import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Chat from './view/Chat';
import UserForm from './view/UserForm';

 
export default function App(props) {



    return (
        <>
        <Router>
            <Switch>
                <Route path="/chat">
                    <Chat titulo="Chat"/>
                </Route>
                <Route path="/">
                    <UserForm titulo="Registre-se"/>
                </Route>
            </Switch>
        </Router>
        </>
    )
};

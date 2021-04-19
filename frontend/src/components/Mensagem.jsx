import React from 'react'
import './Mensagem.css';

function Mensagem(props) {
    const token = localStorage.getItem('token');
    let style = {
        backgroundColor:"#393e46",
        marginRight: "auto",
        marginLeft:"1vw"
    }

    if(props.userId === token){
        style = {
            backgroundColor:"#38ac85",
            marginLeft: "auto",
            marginRight:"1vw"
        }

    }
    if(props.userId === null){
        style = {
            margin:"auto",
        }
        return(
        <div className="Mensagem" style={style}>
            <p className="Corpo">{props.content}</p>
        </div>
        )
    }

    let date = new Date(props.createdAt);
    let hora = (date.getHours()+":"+((date.getMinutes() < 10) ? "0"+ date.getMinutes() : date.getMinutes()));

    return(
        <div className="Mensagem" style={style}>
            <h2 className="Titulo">{props.user}</h2>
            <p className="Corpo">{props.content} <span className="Hora">{hora}</span></p>
        </div>
    )
}

export default Mensagem;
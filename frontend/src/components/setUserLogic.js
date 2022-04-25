import SetUserFront from "./setUserFront"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import socket from './socket';
import MainChatbox from "./mainChatbox";

export default function SetUserLogic () {
    const [user, setUser] = useState({})
    const [usuarios, setUsuarios] = useState([])
    const [registrado, setRegistrado] = useState(false);
    const navigate = useNavigate()

  const handleChange = (e) => {
      e.preventDefault()
      const {name, value} = e.target
      setUser({ ...user, name: value})
  }

  const registrar = (e) => {
    if (user !== "") {
      setRegistrado(true);
    }
  };

  const sendData = async (e) => {
    e.preventDefault()
    await fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    })

    registrar()

    socket.on('conectados', users => {  
      setUsuarios(users)
    })
    // navigate('/chat')
    console.log(user)
    console.log(usuarios)

  }
    return(
      <>
      {registrado == true ? <MainChatbox user = { user } usuarios = { usuarios }/> : <SetUserFront handleChange={handleChange} sendData={sendData}/>}
      </>
    )
}
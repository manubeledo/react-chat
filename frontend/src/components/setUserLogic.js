import SetUserFront from "./setUserFront"
import { useState, useEffect, useContext } from 'react'
import socket from './socket';
import MainChatbox from "./mainChatbox";
import { UserContext } from './context/currentUser'

export default function SetUserLogic () {
    const [user, setUser] = useState({})
    const [registrado, setRegistrado] = useState(false);
    const { setCurrentUser, currentUser } = useContext(UserContext)
    //const [login, setLogin] = useState({})

  const handleChange = (e) => {
      e.preventDefault()
      const {name, value} = e.target
      setCurrentUser({ ...currentUser, [name]: value})
      console.log(currentUser)
      /*setLogin({ ...login, [name]: value})
      console.log(login)*/
  }

  const registrar = (e) => {
    if (user !== "") {
      setRegistrado(true);
    }
  };

  const sendData = async (e) => {
    e.preventDefault()
    /*let response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        body: JSON.stringify(login),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    })

    const data = await response.json()
    console.log(data)*/
    registrar()
  }
    return(
      <>
      {registrado == true ? <MainChatbox user={currentUser} /*usuarios={usuarios}*//> : <SetUserFront handleChange={handleChange} sendData={sendData}/>}
      </>
    )
}
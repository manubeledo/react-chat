import SetUserFront from "./setUserFront"
import { useState, useEffect, useContext } from 'react'
import socket from './socket';
import MainChatbox from "./mainChatbox";
import { UserContext } from './context/currentUser'
import Axios from 'axios'

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
    /*Axios.post('http://localhost:5000/login', {
      data: {...login}
    }).then((response) => {
      console.log(response.data)
      localStorage.setItem('token', response.data.token)
      setCurrentUser(response.data.user)
    })*/
 
    registrar()
  }
    return(
      <>
      {registrado == true ? <MainChatbox user={currentUser}/> : <SetUserFront handleChange={handleChange} sendData={sendData}/>}
      </>
    )
}
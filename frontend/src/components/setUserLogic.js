import SetUserFront from "./setUserFront"
import { useState, useEffect, useContext } from 'react'
import socket from './socket';
import MainChatbox from "./mainChatbox";
import { UserContext } from './context/currentUser'

export default function SetUserLogic () {
    const [user, setUser] = useState({})
    const [usuarios, setUsuarios] = useState([])
    const [registrado, setRegistrado] = useState(false);
    const { setCurrentUser, currentUser } = useContext(UserContext)

  const handleChange = (e) => {
      e.preventDefault()
      const {name, value} = e.target
      setCurrentUser({ ...currentUser, [name]: value})
      console.log(currentUser)
  }

  const registrar = (e) => {
    if (user !== "") {
      setRegistrado(true);
    }
  };

  const sendData = async (e) => {
    e.preventDefault()
    registrar()
    socket.on('conectados', users => {  
      //console.log(users)
      setUsuarios(users)
    })

  }
    return(
      <>
      {registrado == true ? <MainChatbox user={currentUser} usuarios={usuarios}/> : <SetUserFront handleChange={handleChange} sendData={sendData}/>}
      </>
    )
}
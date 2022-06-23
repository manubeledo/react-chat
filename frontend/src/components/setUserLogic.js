import SetUserFront from "./setUserFront"
import { useState, useContext } from 'react'
import MainChatbox from "./mainChatbox";
import { UserContext } from './context/currentUser'
import Axios from 'axios'
import RegisterMessage from "./RegisterMessage";

export default function SetUserLogic () {
    const [logged, setLogged] = useState(false);
    const { setCurrentUser, currentUser } = useContext(UserContext)
    const [formData, setFormData] = useState({})
    const [register, setRegister] = useState(false)

  const handleChange = (e) => {
      e.preventDefault()
      const {name, value} = e.target
      setFormData({ ...formData, [name]: value})
  }

  const sendData = async (e) => {
    e.preventDefault()
    await Axios.post('http://localhost:5000/login', {
      data: {...formData}
    }).then((response) => {
      if(response.data.status === 'login'){
        localStorage.setItem('token', response.data.token)
        let userAuthenticated = response.data.user
        userAuthenticated.pic = '/avatar/unknown.png'
        setCurrentUser(userAuthenticated)
        setLogged(true)
      }else{
        setRegister(true)
      }
    })


  }
    return(
      <>
      {register === true ? <RegisterMessage/> : ''}
      {logged === true ? <MainChatbox user={currentUser}/> : <SetUserFront handleChange={handleChange} sendData={sendData}/>}
      </>
    )
}
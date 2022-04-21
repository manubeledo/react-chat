import SetUserFront from "./setUserFront"
import SetUserFront2 from "./setUserFront2"
import { useNavigate, useLocation } from "react-router-dom"
import { useState } from 'react'

export default function SetUserLogic () {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const location = useLocation()

  const handleChange = (e) => {
      e.preventDefault()
      const {name, value} = e.target
      setUser({ ...user, [name]: value})
      console.log(e.target.value)
  }

  const sendData = async (e) => {
    e.preventDefault()
      navigate('/chat')
    let response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
  })
  const data = await response.json()
  console.log(data)
  }
    return(
      <SetUserFront2 handleChange={handleChange} sendData={sendData}/>
    )
}
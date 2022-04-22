import SetUserFront from "./setUserFront"
import { useNavigate } from "react-router-dom"
import { useState } from 'react'

export default function SetUserLogic () {
    const [user, setUser] = useState({})
    const navigate = useNavigate()

  const handleChange = (e) => {
      e.preventDefault()
      const {name, value} = e.target
      setUser({ ...user, name: value})
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
      <SetUserFront handleChange={handleChange} sendData={sendData}/>
    )
}
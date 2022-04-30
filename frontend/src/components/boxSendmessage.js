import tw from "tailwind-styled-components"
import {useContext, useEffect, useState} from 'react'
import socket from "./socket"
import { UserContext } from './context/currentUser'

export default function BoxSendMessage () {
    const [msg, setMsg] = useState({})
    const { currentUser, currentReceiver } = useContext(UserContext)

    const handleChange = (e) => {
        e.preventDefault()
        const {value} = e.target
        setMsg({ ...msg, 
            message: value,
            sender: currentUser.name,
            receiver: currentReceiver
        })
    }

    useEffect(()=>{
    console.log(currentUser, 'el current user desde Sendmessage')
    },[currentUser])
    
    const sendMessage = async (e) => {
        e.preventDefault()
        console.log('Este es el mensaje en sendMessage', msg)
        setMsg({
            ...msg,
        })
        socket.emit('newmessage', msg)
    }

    return(
        <Wrapper>
                <div className="chat-message clearfix">
                    <div className="input-group mb-0">
                        <div className="input-group-prepend">
                            <button onClick={sendMessage}><i className="fa fa-send"></i></button>
                        </div>
                        <input onChange={handleChange} id="chat-message" type="text" className="form-control" placeholder="Enter text here..."/>
                    </div>
                </div>
        </Wrapper>
    )
}

const Wrapper = tw.div `
text-3xl font-bold underline border-solid border-green-400 border-4 bg-gray-300 w-full h-1/6 text-center
`
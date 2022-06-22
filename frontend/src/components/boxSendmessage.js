import tw from "tailwind-styled-components"
import {useContext, useState} from 'react'
import socket from "./socket"
import { UserContext } from './context/currentUser'

export default function BoxSendMessage () {
    const [msg, setMsg] = useState({})
    const { currentUser, currentReceiver } = useContext(UserContext)

    const handleChange = (e) => {
        e.preventDefault();
        const {value} = e.target;
        let time = new Date().toISOString();
        console.log('Este es el USER LOG, y el CURRENT RECEIVER', currentUser, currentReceiver)
        setMsg({ ...msg, 
            message: value,
            sender: currentUser.username,
            receiver: currentReceiver,
            timestamp: time,
            chatID: 11111
        })
    }

    const sendMessage = async (e) => {
        e.preventDefault()
        console.log('Este es el mensaje en sendMessage', msg)
        setMsg({
            ...msg,
        })
        socket.emit('newmessage', msg)
        const input = document.querySelector('#chat-message')
        input.value = ''
    }

    const onKeyPress = (e) => {
        console.log(e.key)
    }

    return(
        <Wrapper>
                <div className="chat-message">
                    <div className="input-group mb-0">
                        <div className="input-group-prepend">
                            <button onClick={sendMessage} className="btn-message"><i className="fa fa-send"></i></button>
                        </div>
                        <input autoFocus onChange={handleChange} id="chat-message" type="text" className="form-control"/>
                    </div>
                </div>
        </Wrapper>
    )
}

const Wrapper = tw.div `
text-3xl font-bold w-full h-1/12 text-center p-4 bg-left-dark
`
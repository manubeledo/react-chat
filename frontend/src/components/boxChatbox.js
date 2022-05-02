import { useEffect, useState, useContext } from "react"
import tw from "tailwind-styled-components"
import socket from "./socket"
import { UserContext } from './context/currentUser'

export default function BoxChatBox () {

    const [msgs, setMsgs] = useState([])
    const { currentUser, currentReceiver } = useContext(UserContext)

    // Tiene que mostrar solos los mensajes del user (currentReceiver) con el que se habla
    // Se puede hacer un socket emit con el Receiver y un socket on con los mensajes de ese Receiver
    useEffect(() => {
        // let users = {
        //     emiter: currentUser,
        //     receiver: currentReceiver
        // }
        // socket.emit('askForMessages', users)
        socket.on('p2pMessages', chatMessages => {
            setMsgs(chatMessages)
        })
    }, [])

    return(
        <Wrapper>
            {msgs.map(({...msgs}, index) => (
                <div key={index}>
                <h2>{msgs.message}</h2>
                </div>
            ))}
        </Wrapper>
    )
}

const Wrapper = tw.div `
text-3xl font-bold underline border-solid border-green-400 border-4 bg-gray-300 w-full h-4/6 text-center
`
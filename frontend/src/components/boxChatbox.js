import { useEffect, useState } from "react"
import tw from "tailwind-styled-components"
import socket from "./socket"

export default function BoxChatBox ({user}) {

    const [msgs, setMsgs] = useState([])

    useEffect(() => {
        socket.on('messages', allMessages => {
            setMsgs(allMessages)
        })
    }, [])

    return(
        <Wrapper>
            {msgs.map(({...msgs}) => (
                <div>
                <h2>{msgs.message}</h2>
                </div>
            ))}
        </Wrapper>
    )
}

const Wrapper = tw.div `
text-3xl font-bold underline border-solid border-green-400 border-4 bg-gray-300 w-full h-4/6 text-center
`
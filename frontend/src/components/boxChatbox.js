import { useEffect, useState, useContext } from "react"
import tw from "tailwind-styled-components"
import socket from "./socket"
import { UserContext } from './context/currentUser'

export default function BoxChatBox () {
    const [firstRender, setFirstRender] = useState(false)
    const [msgs, setMsgs] = useState([])
    const { currentUser, currentReceiver } = useContext(UserContext)

    useEffect(() => {
        socket.on('loadmsgs', chatMessages => {
            setMsgs(chatMessages)
        })
    }, [setMsgs])
    
    useEffect(()=>{
        if(!firstRender) 
        socket.on('currentChat', chatMessages => {
            console.log('Se renderizaron los mensajes de la db')
            setMsgs(chatMessages)
            setFirstRender(true)
        })
    }, [msgs])

    return(
        <Wrapper>
            {msgs.map(({...msgs}, index) => ((msgs.receiver == currentReceiver && msgs.sender == currentUser.name) || (msgs.sender == currentReceiver && msgs.receiver == currentUser.name)) ? (
                <div key={index}>
                <h2>{msgs.message}</h2>
                <h6 style={{color: 'red'}}>{msgs.sender}</h6>
                </div>
            ) : <></>)}
        </Wrapper>
    )
}

const Wrapper = tw.div `
text-3xl font-bold underline border-solid border-green-400 border-4 bg-gray-300 w-full h-4/6 text-center
`
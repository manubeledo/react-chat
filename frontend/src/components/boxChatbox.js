import { useEffect, useState, useContext } from "react"
import tw from "tailwind-styled-components"
import socket from "./socket"
import { UserContext } from './context/currentUser'

export default function BoxChatBox () {
    const [firstRender, setFirstRender] = useState(false)
    const [msgs, setMsgs] = useState([])
    const { currentUser, currentReceiver } = useContext(UserContext)

    useEffect(() => {
        socket.on('loadmsgs', msg => {
            console.log('esto es msg', msg)
            setMsgs([...msgs, msg])
            console.log(msgs, 'estado de mensajes')
        })
    }, [msgs])
    
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
                ((msgs.receiver == currentReceiver) ?
                <>
                    <div className="leftMessage" key={index}>
                        <p style={{fontWeight: 'normal'}}>{msgs.message}</p>
                        <p style={{fontSize: '12px'}}>{msgs.timestamp.slice(11,19)}</p>
                    </div>
                </> 
                : 
                <>
                    <div className="rightMessage" key={index}>
                        <p style={{fontWeight: 'normal'}}>{msgs.message}</p>
                        <p style={{fontSize: '12px'}}>{msgs.timestamp.slice(11,19)}</p>
                    </div>
                </>))
             : <></>)}
        </Wrapper>
    )
}

const Wrapper = tw.div `
text-3xl font-bold bg-gray-300 w-full h-110 text-center flex flex-col overflow-auto
`
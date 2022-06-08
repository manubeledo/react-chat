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
            setMsgs([...msgs, msg])
        })
    }, [msgs])
    
    useEffect(()=>{
        if(!firstRender){
            console.log('estoy adentro del if')
            socket.on('currentChat', chatMessages => {
                setMsgs(chatMessages)
                setFirstRender(true)
            })
        }
    }, [msgs])

    return(
        <Wrapper>
            {msgs.map(({...msgs}, index) => ((msgs.receiver == currentReceiver && msgs.sender == currentUser.username) || (msgs.sender == currentReceiver && msgs.receiver == currentUser.username)) ? (
                ((msgs.receiver == currentReceiver) ?
                <>
                    <div className="leftMessage" key={index}>
                        <p className="message_p" style={{fontWeight: 'normal'}}>{msgs.message}</p>
                        <p className="timestamp_p" style={{textAlign: "end"}}>{msgs.timestamp.slice(11,16)}</p>
                    </div>
                </> 
                : 
                <>
                    <div className="rightMessage" key={index}>
                        <p className="message_p" style={{fontWeight: 'normal'}}>{msgs.message}</p>
                        <p className="timestamp_p" style={{textAlign: "end"}}>{msgs.timestamp.slice(11,16)}</p>
                    </div>
                </>))
             : <></>)}
        </Wrapper>
    )
}

const Wrapper = tw.div `
text-3xl font-bold bg-gray-300 w-full h-110 text-center flex flex-col overflow-auto pt-8
`
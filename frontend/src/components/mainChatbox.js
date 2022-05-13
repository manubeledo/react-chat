import tw from "tailwind-styled-components"
import BoxFullChatbox from './boxFullchatbox'
import BoxUserState from './boxUserstate'
import { useEffect } from "react"

export default function MainChatbox ({ usuarios }) {
     /*useEffect(()=>{
         const isClosed = window.closed()
         if(isClosed){
             socket.disconnect()
         }
    },[])*/
    return(
        <Wrapper>
            <BoxUserState usuarios = { usuarios }/>
            <BoxFullChatbox/>
        </Wrapper>
    )
}

const Wrapper = tw.div `
text-3xl font-bold underline border-solid border-black border-4 mt-10 mr-40 ml-40 mb-10 h-128 bg-gray-300 flex flex-row justify-start
`
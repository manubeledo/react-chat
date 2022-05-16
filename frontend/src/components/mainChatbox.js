import tw from "tailwind-styled-components"
import BoxFullChatbox from './boxFullchatbox'
import BoxUserState from './boxUserstate'
import { useEffect } from "react"

export default function MainChatbox ({ usuarios }) {
    return(
        <Wrapper>
            <BoxUserState usuarios = { usuarios }/>
            <BoxFullChatbox/>
        </Wrapper>
    )
}

const Wrapper = tw.div `
text-3xl font-bold mr-40 ml-40 h-128 bg-background-chat flex flex-row justify-start my-28 border-1 rounded-xl
`
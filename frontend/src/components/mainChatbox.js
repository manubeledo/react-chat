import tw from "tailwind-styled-components"
import BoxFullChatbox from './boxFullchatbox'
import BoxUserState from './boxUserstate'
import { useContext, useEffect } from "react"
import { UserContext } from './context/currentUser'

export default function MainChatbox () {
    return(
        <Wrapper>
            <BoxUserState/>
            <BoxFullChatbox/>
        </Wrapper>
    )
}

const Wrapper = tw.div `
text-3xl font-bold mr-80 ml-80 mt-10 mb-10 h-128 bg-background-chat flex flex-row justify-start
`
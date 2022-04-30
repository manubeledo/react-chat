import tw from "tailwind-styled-components"
import BoxChatBox from "./boxChatbox"
import BoxReceiver from "./boxReceiver"
import BoxSendMessage from "./boxSendmessage"

export default function BoxFullChatbox () {
    return(
        <Wrapper>
            <BoxReceiver/>
            <BoxChatBox/>
            <BoxSendMessage/>
        </Wrapper>
    )
}

const Wrapper = tw.div `
text-3xl font-bold underline border-solid border-orange-400 border-4 bg-gray-300 w-9/12 text-center
`
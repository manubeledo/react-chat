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
text-3xl font-bold bg-new-dark w-9/12 text-center rounded-r-lg
`
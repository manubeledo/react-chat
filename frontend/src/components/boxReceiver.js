import tw from "tailwind-styled-components"
import { useContext } from "react"
import { UserContext } from './context/currentUser'

export default function BoxReceiver () {
    const { currentReceiver } = useContext(UserContext)

    // console.log(Object.key(currentReceiver), 'objeto currentReceiver')

    return(
        <Wrapper>
                <div class="receiverAvatarDiv">
                    {Object.entries(currentReceiver).length !== 0 ? <img alt="avatar" class="receiverAvatar" src={currentReceiver.pic}></img> : ''}
                    <b style={{display: 'inline'}}>{Object.entries(currentReceiver).length !== 0 ? currentReceiver.username : 'Welcome to the chat!'}</b>  
                </div>
        </Wrapper>
    )
}

const Wrapper = tw.div `
text-3xl font-bold w-full h-1/12 p=4 text-left
`
import tw from "tailwind-styled-components"
import { useContext, useEffect } from "react"
import { UserContext } from './context/currentUser'

export default function BoxReceiver () {
    const { currentReceiver } = useContext(UserContext)
    /*const { receiver, setReceiver } = useState('Not Receiver selected')
    useEffect(()=>{

    }, [currentReceiver])*/
    return(
        <Wrapper>
                <div class="receiverAvatarDiv">
                    <img class="receiverAvatar" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"/> 
                    <b style={{display: 'inline'}}>{currentReceiver.length > 0 ? currentReceiver : 'Welcome to the chat!'}</b>  
                </div>
        </Wrapper>
    )
}

const Wrapper = tw.div `
text-3xl font-bold w-full h-1/12 text-center p=4
`
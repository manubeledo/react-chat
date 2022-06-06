import tw from "tailwind-styled-components"
import BoxUserSearch from "./boxUsersearch"
import BoxUserbox from "./boxUserbox"
import socket from "./socket"
import {useState, useEffect, useContext } from "react"
import { UserContext } from './context/currentUser'


export default function BoxUserState ({ usuarios }) {

    const [conectados, setConectados] = useState([]);
    const [text, setText] = useState('');
    const { currentUser } = useContext(UserContext)

    useEffect(()=>{
        socket.emit("newuser", currentUser);
    },[])
    
    useEffect(()=>{
        socket.on('conectados', users => {  
            console.log(users)
            setConectados(users)
        })
    }, [])

    return(
        <Wrapper>
            <BoxUserSearch text={text} setText={setText}/>
            <BoxUserbox text={text} setText={setText} connectedUsers={conectados} user={ currentUser } usuarios = { usuarios }/>
        </Wrapper>
    )
}

const Wrapper = tw.div `
text-3xl font-bold bg-left-dark w-4/12 text-center border-1 rounded-l-lg
`
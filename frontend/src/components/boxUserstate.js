import tw from "tailwind-styled-components"
import BoxUserSearch from "./boxUsersearch"
import BoxUserbox from "./boxUserbox"
import socket from "./socket"
import {useState, useEffect} from "react"


export default function BoxUserState ({ user, usuarios }) {

    const [conectados, setConectados] = useState([]);

    useEffect(()=>{
        socket.emit("newuser", user);
    },[])
    
    useEffect(()=>{
        socket.on('conectados', users => {  
            setConectados(users)
        })
    }, [])

    return(
        <Wrapper>
            <BoxUserSearch/>
            <BoxUserbox connectedUsers={conectados} user={ user } usuarios = { usuarios }/>
        </Wrapper>
    )
}

const Wrapper = tw.div `
text-3xl font-bold underline border-solid border-blue-400 border-4 bg-gray-300 w-3/12 text-center
`
import {useEffect, useContext, useState} from 'react'
import tw from "tailwind-styled-components"
import { UserContext } from './context/currentUser'
import socket from "./socket"

export default function Conectados (props) {
    
    const { setCurrentReceiver, currentReceiver, currentUser } = useContext(UserContext)
    const [ chattingUsers, setChattingUsers ] = useState({
        sender: '',
        receiver: ''
    })

    console.log(props.data)

    function colorBox(e) {
        const selectedUser = document.querySelector('.selected-user')
        if(selectedUser){
            selectedUser.classList.remove('selected-user')
            e.currentTarget.classList.add('selected-user')
            setCurrentReceiver(e.currentTarget.id)
        }else{
            e.currentTarget.classList.add('selected-user')
            setCurrentReceiver(e.currentTarget.id)
        }
    }

    function updateMessages () {
        socket.emit('currentChattingUsers', chattingUsers)
    }

    useEffect(() => {
        let updatedValue = {
            sender: currentUser.username,
            receiver: currentReceiver
        }
        setChattingUsers(updatedValue)
    }, [currentReceiver])

    useEffect(() => {
        updateMessages()
    }, [chattingUsers])

    return(
        <Wrapper>
         {props.data.map(({...props}) => props.username !== currentUser.username ? (
              <li onClick={colorBox} className="clearfix" id={props.username} key={props.socket_id}>
              <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"/>
              <div className="about">
                      <p className="name">{props.username}</p>
                  <div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>                                            
              </div>
              </li> 
        )  : <></> )}
        </Wrapper>
    )
}

const Wrapper = tw.div `
text-3xl font-bold bg-left-dark text-center rounded-l-lg overflow-auto h-52
`
import {useEffect, useContext, useState} from 'react'
import { UserContext } from './context/currentUser'
import socket from "./socket"

export default function Conectados (props) {
    
    const { setCurrentReceiver, currentReceiver, currentUser } = useContext(UserContext)
    const [ chattingUsers, setChattingUsers ] = useState({
        sender: '',
        receiver: ''
    })

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
            sender: currentUser.name,
            receiver: currentReceiver
        }
        setChattingUsers(updatedValue)
    }, [currentReceiver])

    useEffect(() => {
        updateMessages()
    }, [chattingUsers])

    return(
        <>
         {props.data.map(({...props}) => props.name !== currentUser.name ? (
              <li onClick={colorBox} className="clearfix" id={props.name} key={props.socket_id}>
              <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"/>
              <div className="about">
                      <p className="name">{props.name}</p>
                  <div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>                                            
              </div>
              </li> 
        )  : <></> )}
        </>
    )
}
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

    function colorBox(e) {
        const selectedUser = document.querySelector('.selected-user')
        if(selectedUser){
            selectedUser.classList.remove('selected-user')
            e.currentTarget.classList.add('selected-user')
            const receiver = props.data.filter(el => {return el._id === e.currentTarget.id})
            setCurrentReceiver(receiver[0])
        }else{
            e.currentTarget.classList.add('selected-user')
            const receiver = props.data.filter(el => {return el._id === e.currentTarget.id})
            setCurrentReceiver(receiver[0])
        }
    }

    function updateMessages () {
        socket.emit('currentChattingUsers', chattingUsers)
    }

    useEffect(() => {
        let updatedValue = {
            sender: currentUser.username,
            receiver: currentReceiver.username
        }
        setChattingUsers(updatedValue)
    }, [currentReceiver])

    useEffect(() => {
        updateMessages()
    }, [chattingUsers])

    return(
        <Wrapper>
         {props.data.map(({...props}) => props.username !== currentUser.username ? (
              <li onClick={colorBox} className="clearfix" id={props._id} key={props.socket_id} name={props.socket_id}>
              <img src={props.pic} alt="avatar"/>
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
text-3xl font-bold bg-left-dark text-center rounded-l-lg overflow-auto max-h-52
`
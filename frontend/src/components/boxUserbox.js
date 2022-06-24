import Conectados from './boxConectados'
import { useState, useContext } from 'react'
import { UserContext } from './context/currentUser'
import AvatarSelector from './avatarSelector'
import tw from "tailwind-styled-components"

export default function Userbox(props) {
        const [showModal, setShowModal] = useState(false)
        const { currentUser } = useContext(UserContext)

        const pencil = document.querySelector('.pencil')
        const onImageHover = () => {
            pencil.style.visibility = 'visible'
        }
        const notImageHover = () => {
            pencil.style.visibility = 'hidden'
        }
        const onAvatarClick = () => {
            setShowModal(true)
        }

        const usersFilter = props.connectedUsers.filter(user => user.username.toLowerCase().includes(props.text.toLocaleLowerCase()))

        return(
            <>
            <Wrapper>
            <div className="aboutMeDiv" style={{padding: '10px'}}>
                <div onClick={onAvatarClick} className="myAvatarDiv">
                    <img className="avatarImg" onMouseLeave={notImageHover} onMouseEnter={onImageHover} src={currentUser.pic} alt="avatar"/>
                    <i className="fa-solid fa-pencil pencil"></i>
                </div>
                <div className="connected_me">
                    <p> {props.user.username} </p>                                           
                </div>
            </div>
            <div id="plist" className="people-list">
                <ul className="list-unstyled chat-list mt-2 mb-0" id="people-list">
                    <Conectados data={usersFilter}></Conectados>
                </ul>
            </div>
            <AvatarSelector show={showModal} onClose={() => setShowModal(false)}></AvatarSelector>
            </Wrapper>
            </>
        )
}

const Wrapper = tw.div `
border-2 h-120
`
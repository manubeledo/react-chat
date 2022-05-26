import Conectados from './boxConectados'
import tw from "tailwind-styled-components"

export default function Userbox(props) {

        const pencil = document.querySelector('.pencil')
        const onImageHover = () => {
            pencil.style.visibility = 'visible'
        }
        const notImageHover = () => {
            pencil.style.visibility = 'hidden'
        }

        const usersFilter = props.connectedUsers.filter(user => user.name.toLowerCase().includes(props.text.toLocaleLowerCase()))

        return(
            <Wrapper>
            <div className="aboutMeDiv" style={{padding: '10px'}}>
                <div className="myAvatarDiv">
                    <img className="avatarImg" onMouseLeave={notImageHover} onMouseEnter={onImageHover} src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"/>
                    <i className="fa-solid fa-pencil pencil"></i>
                </div>
                <div className="connected_me">
                    <p> {props.user.name} </p>                                           
                </div>
            </div>
            <div id="plist" className="people-list">
                <ul className="list-unstyled chat-list mt-2 mb-0" id="people-list">
                    <Conectados data={usersFilter}></Conectados>
                </ul>
            </div>
            </Wrapper>
        )
}

const Wrapper = tw.div `
border-2 h-120
`
import Conectados from './boxConectados'
export default function Userbox(props) {
        /*useEffect(() => {
            console.log('Estos son los conectados', props.connectedUsers)
        }, [props.connectedUsers])*/

        const pencil = document.querySelector('.pencil')
        const onImageHover = () => {
            pencil.style.visibility = 'visible'
        }
        const notImageHover = () => {
            pencil.style.visibility = 'hidden'
        }

        return(
            <>
            <div className="aboutMeDiv" style={{padding: '10px'}}>
                <div class="myAvatarDiv">
                    <img class="avatarImg" onMouseLeave={notImageHover} onMouseEnter={onImageHover} src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"/>
                    <i class="fa-solid fa-pencil pencil"></i>
                </div>
                <div className="connected_me">
                    <p> {props.user.name} </p>                                           
                </div>
            </div>
            <div id="plist" className="people-list">
                <ul className="list-unstyled chat-list mt-2 mb-0" id="people-list">
                    <Conectados data={props.connectedUsers}></Conectados>
                </ul>
            </div>
            </>
        )

}
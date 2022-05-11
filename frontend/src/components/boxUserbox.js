import { useEffect } from "react"
import Conectados from './boxConectados'

export default function Userbox(props) {

        useEffect(() => {
            console.log('Estos son los conectados', props.connectedUsers)
        }, [props.connectedUsers])

        return(
            <>
            <div id="plist" className="people-list">
                <ul className="list-unstyled chat-list mt-2 mb-0" id="people-list">
                    <h1>Este sos vos!</h1>
                    <li className="clearfix" id="clearfix">
                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"/>
                        <div className="about">
                                <div className="name">{ props.user.name }</div>
                            <div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>                                            
                        </div>
                    </li>
                    <h1>Conectados:</h1>
                    <Conectados data={props.connectedUsers}></Conectados>
                </ul>
            </div>
            </>
        )

}
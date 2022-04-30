import socket from "./socket"
import {useState, useEffect, useRef} from "react"
import Conectados from './boxConectados'

export default function Userbox(props) {


        function colorBox(e) {
            console.log('funciona el evento')
            e.currentTarget.classList.add('selected-user')
            //box.style.backgroundColor = "white"
        }

        useEffect(() => {
            /*const box = document.getElementById("clearfix")
            box.addEventListener('click', colorBox)*/
            console.log('Estos son los conectados', props.connectedUsers)
        }, [])

        return(
            <>
            <div id="plist" className="people-list">
                <ul className="list-unstyled chat-list mt-2 mb-0" id="people-list">
                    <h1>Este sos vos!</h1>
                    <li onClick={colorBox} className="clearfix" id="clearfix">
                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"/>
                        <div className="about">
                                <div className="name">{props.user.name }</div>
                            <div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>                                            
                        </div>
                    </li>
                    <h1>Conectados:</h1>
                    <Conectados colorBox={colorBox} data={props.connectedUsers}></Conectados>
                </ul>
            </div>
            </>
        )

}
import {useEffect, useContext} from 'react'
import { UserContext } from './context/currentUser'

export default function Conectados (props) {
    
    const { setCurrentReceiver, currentReceiver } = useContext(UserContext)

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

    useEffect(() => {
        console.log('Este es el currentReceiver', currentReceiver)
    }, [currentReceiver])

    return(
        <>
         {props.data.map(({...props}) => (
              <li onClick={colorBox} className="clearfix" id={props.name} key={props.socket_id}>
              <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"/>
              <div className="about">
                      <p className="name">{props.name}</p>
                  <div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>                                            
              </div>
          </li>
        ))} 
        </>
    )
}
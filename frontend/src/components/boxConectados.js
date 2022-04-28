import {useEffect, useState} from 'react'

export default function Conectados (props) {

    const [userReceiver, setUserReceiver] = useState('')

    function colorBox(e) {
        const selectedUser = document.querySelector('.selected-user')
        if(selectedUser){
            selectedUser.classList.remove('selected-user')
            e.currentTarget.classList.add('selected-user')
            setUserReceiver(e.currentTarget.id)
        }else{
            e.currentTarget.classList.add('selected-user')
            setUserReceiver(e.currentTarget.id)
        }
    }

    useEffect(() => {
        console.log('Este es el userReceiver', userReceiver)
    }, [userReceiver])

    return(
        <>
         {props.data.map(({...props}) => (
              <li onClick={colorBox} className="clearfix" id={props.name}>
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
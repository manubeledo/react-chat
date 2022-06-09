import Axios from "axios";
import { useState, createContext } from "react";

export const UserContext = createContext([])

export default function UserContextLogic(props) {
    const [currentUser, setCurrentUser] = useState({
        username: '',
        pswd: ''
    })
    const [currentReceiver, setCurrentReceiver] = useState({})

    const getUser =  () => {
          Axios.get('http://localhost:5000/authLogin', {
            headers: {
                "x-access-token": localStorage.getItem('token')
            },
        }).then(response => {
            console.log(response)
        })
    }

    return <UserContext.Provider value={{ currentUser, setCurrentUser, currentReceiver, setCurrentReceiver, getUser }}>
        {props.children}
    </UserContext.Provider>
}
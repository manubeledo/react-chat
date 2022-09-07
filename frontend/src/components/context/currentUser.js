import Axios from "axios";
import { useState, createContext } from "react";

export const UserContext = createContext([])

export default function UserContextLogic(props) {
    const [currentUser, setCurrentUser] = useState({
        username: '',
        pswd: '',
        pic: '../../avatar/unknown.png'
    })
    const [currentReceiver, setCurrentReceiver] = useState({})

    const getUser = async () => {
        try {
            await Axios.get('http://localhost:5000/authLogin', {
                headers: {"x-access-token": localStorage.getItem('token')}
            }).then((response) => {
                console.log(response, 'la respuesta')
            })
        } catch (error) {
            console.log(error,'NO pude darle al Get en getUser()')
        }

    }

    return <UserContext.Provider value={{ currentUser, setCurrentUser, currentReceiver, setCurrentReceiver, getUser }}>
        {props.children}
    </UserContext.Provider>
}
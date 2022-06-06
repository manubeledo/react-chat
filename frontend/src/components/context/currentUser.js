import { useState, createContext } from "react";

export const UserContext = createContext([])

export default function UserContextLogic(props) {
    const [currentUser, setCurrentUser] = useState({
        username: '',
        pswd: ''
    })
    const [currentReceiver, setCurrentReceiver] = useState({})

    return <UserContext.Provider value={{ currentUser, setCurrentUser, currentReceiver, setCurrentReceiver }}>
        {props.children}
    </UserContext.Provider>
}
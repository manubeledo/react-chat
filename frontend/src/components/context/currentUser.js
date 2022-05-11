import { useState, useEffect, createContext } from "react";

export const UserContext = createContext([])

export default function UserContextLogic(props) {
    const [currentUser, setCurrentUser] = useState({})
    const [currentReceiver, setCurrentReceiver] = useState({})

    return <UserContext.Provider value={{ currentUser, setCurrentUser, currentReceiver, setCurrentReceiver }}>
        {props.children}
    </UserContext.Provider>
}
import { useState, useEffect, createContext } from "react";
export const UserContext = createContext([])
export default function UserContextLogic(props) {
    const [currentUser, setCurrentUser] = useState({})
    useEffect(()=>{
        console.log('user desde el context', currentUser)
    }, [currentUser])
    return <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        {props.children}
    </UserContext.Provider>
}


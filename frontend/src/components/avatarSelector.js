import avatarsInfo from '../utils/avatars'
import { createPortal } from "react-dom";
import { useState, useEffect, useContext } from 'react'
import styles from "../css/Modal.module.css";
import { UserContext } from './context/currentUser';
import socket from "./socket"

export default function AvatarSelector ({show, onClose}) {
    const [isBrowser, setIsBrowser] = useState(false)
    const { currentUser, setCurrentUser } = useContext(UserContext)

    useEffect(() => {
        setIsBrowser(true);
    },[])

    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    }

    const handleAvatar = (e) => {
        e.preventDefault();
        onClose();
        const avatarSrc = e.target.name
        setCurrentUser({...currentUser, pic: avatarSrc})
    }

    useEffect(()=>{
        socket.emit('newuser', currentUser)
    }, [currentUser])

    const modalContent = show ? (
        <div className={styles.overlay}>
            <div className={`${styles.modal} avatars_container`}>
            <i class="fa-solid fa-xmark " className={`fa-solid fa-xmark ${styles.closeBtn}`} onClick={handleClose}></i>
                <div className={styles.header}>
                    <h3> Selecciona un Avatar de Perfil! </h3>
                </div>
                <div className={styles.body}>
                    <div className={styles.avatarDivContainer}>
                        {avatarsInfo.map((avatar)=>
                            <div className={styles.avatarImgContainer}>
                                <img alt="avatar" key={avatar.name} src={avatar.src} name={avatar.src} onClick={handleAvatar}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    ) : null;

    if(isBrowser) {
        return createPortal(
            modalContent,
            document.getElementById("modal-root")
        )
    } else {
        return null
    }
}
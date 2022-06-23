import avatarsInfo from '../utils/avatars'
import { createPortal } from "react-dom";
import { useState, useEffect } from 'react'
import styles from "../css/Modal.module.css";

export default function AvatarSelector ({show, onClose}) {
    console.log(avatarsInfo)

    const [isBrowser, setIsBrowser] = useState(false)

    useEffect(() => {
        setIsBrowser(true);
    },[])

    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    }

    const modalContent = show ? (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                        <button onClick={handleClose} className="btn">Close</button>
                </div>
                <div className={styles.body}>
                    <div className={styles.avatarDivContainer}>
                        {avatarsInfo.map((el)=>
                            <div className={styles.avatarImgContainer}>
                                <img alt="avatar" src={el.src} />
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
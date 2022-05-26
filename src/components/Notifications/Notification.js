import React, { useState } from "react";
import styles from "./Notification.module.css"

const Notification = props => {
    const [exit, setExit] = useState(false);
    const [width, setWidth] = useState(0);
    const [intervalID, setIntervalID] = useState(null);

    const handleStartTimer = () => {
        const id = setInterval(() => {
            setWidth(prev => {
                if (prev < 100) {
                    return prev + 0.5;
                }

                clearInterval(id);
                return prev;
            });
        }, 20);

        setIntervalID(id);
    };

    const handlePauseTimer = () => {
        clearInterval(intervalID);
    };

    const handleCloseNotification = () => {
        handlePauseTimer();
        setExit(true);
        setTimeout(() => {
            props.dispatch({
                type: "REMOVE_NOTIFICATION",
                id: props.id
            })
        }, 400)
    };

    React.useEffect(() => {
        if (width === 100) {
            // Close notification
            handleCloseNotification()
        }
    }, [width])

    React.useEffect(() => {
        handleStartTimer();
    }, []);

    return (
        <div
            onMouseEnter={handlePauseTimer}
            onMouseLeave={handleStartTimer}
            className={`${styles.notification} ${props.type === "SUCCESS" ? styles.success : styles.error}${exit ? styles.exit : ""}`}
        >
            {props.type === "SUCCESS" ?
                <p>
                    <i className={`bi bi-check-circle-fill me-2 ${styles.iconSuccess}`} ></i>
                    {props.message}
                </p> :
                <p>
                    <i className={`bi bi-x-circle-fill ${styles.iconError} me-2`}></i>
                    {props.message}
                </p>}
            <div className={styles.bar} style={{ width: `${width}%` }} />
        </div>
    );
};

export default Notification;

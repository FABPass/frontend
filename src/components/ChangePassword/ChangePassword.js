import {useState} from "react";
import {useNotification} from "../Notifications/NotificationProvider";
import styles from "./ChangePassword.module.css"
import {Request} from "../../api/Request";
import {useNavigate} from "react-router-dom";
import {changePassword} from "../../api/routes";



export const ChangePassword = () => {


    const [pw1, setPw1] = useState("");
    const [pw2, setPw2] = useState("");
    const [success, setSuccess] = useState(true);

    let navigate = useNavigate();

    const dispatch = useNotification();

    const handleNewNotification = (status, message) => {
        dispatch({
            type: status,
            message: message,
        })
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        const pathname = window.location.pathname;

        const token = pathname.substring(pathname.lastIndexOf('/')+1)
        console.log(token)

        if(pw1 === pw2) {
            setSuccess(true);
            // handleNewNotification();
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: {pw1}
            };
            const data ={
                "password":pw1
            }

            Request(changePassword+token, "PUT", data)
                .then(res => {
                    if(res.status=== 200){
                        handleNewNotification("SUCCESS","Password successfully changed")
                        navigate("/login")
                    }
                    else{
                        handleNewNotification("ERROR","Time for chaning password expired")
                    }
                })
                .catch(err => {
                    if(err.message === "Password change time has expired") handleNewNotification("ERROR","Password change time has expired");
                    else handleNewNotification("ERROR","Problem with server. Try again later.")
                })
        }
        else setSuccess(false)


    };

    return(
        <div className={styles.wrapper1}>
            <div className={"container-lg"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <h3>Reset password</h3>
                        <div className={"form-row mt-3"}>
                            <input className={`form-control ${styles.inputSt}`} type={"password"} placeholder={"New password"} value={pw1} onChange={(e) => setPw1(e.target.value)}/>
                        </div>
                        <div className={"form-row mt-3"}>
                            <input className={`form-control ${styles.inputSt}`} type={"password"} placeholder={"Repeat new password"} value={pw2} onChange={(e) => setPw2(e.target.value)}/>
                        </div>
                        <div className={`${success===false ? "d-1 text-danger mt-2"  : "d-none"}`}>
                            <p>Password doesn't match</p>
                        </div>
                        <div className={`form-row ${styles.center}`}>
                            <button type="submit" className={`${styles.passwordbtn} mt-5 mb-3 ml-3`} onClick={handleSubmit}>Change password</button>
                        </div>

                    </div>



                </div>
            </div>
        </div>
    )
}
import {useState} from "react";
import {useNotification} from "../Notifications/NotificationProvider";
import styles from "./ForgotPassword.module.css"
import {Request} from "../../api/Request";
import {Link, useNavigate} from "react-router-dom";
import React from "react";
import {forgotPassword} from "../../api/routes";

export const ForgotPassword = () => {

    const [formData, updateFormData] = useState('');

    let navigate = useNavigate();

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const dispatch = useNotification();

    const handleNewNotification = (status, message) => {
        dispatch({
            type: status,
            message: message,
        })
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        const user = {
            email: formData.email,
        };

        return Request(forgotPassword+formData.email,"POST")
            .then(res => {
                if(res && res.status === 200){
                    handleNewNotification("SUCCESS","Email successfully sent")
                    navigate("/login")
                }
                else{
                    handleNewNotification("ERROR","Email doesn't exist")
                }
            })
            .catch(err => {
                if(err.message === "User not found") handleNewNotification("ERROR","Email doesn't exist");
                else handleNewNotification("ERROR","Sending email failed");
            })


    };

    return(
        <div className={styles.wrapper1}>
            <div className={"container-lg"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <h3>Get resset password link</h3>
                        <div className={"form-row mt-3 p-2"}>
                            <input className={`form-control ${styles.email}`} name="email" type='email'
                                   placeholder="example@domain.com"
                                   value={formData.email}
                                   onChange={handleChange}/>

                        </div>
                        <div className={"form-row"}>
                            <button type="submit" className={`${styles.passwordbtn} mt-4 mb-2 ml-3`} onClick={handleSubmit}>Get reset link</button>
                        </div>
                    </div>


                </div>
                <div id="logRegSwitch">
                    <Link to={"/login"}>Back to Login</Link>
                </div>

            </div>
        </div>
    );

}


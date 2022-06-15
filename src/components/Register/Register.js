import React, {useState} from 'react';
import styles from "./Register.module.css";

import Logo from "../Logo/Logo";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {registerRoute} from "../../api/routes";
import {useNotification} from "../Notifications/NotificationProvider";


const Register = () => {

    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[email, setEmail] = useState("");
    const[phone, setPhone] = useState("");
    const[password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const dispatch = useNotification()

    const handleNewNotification = (status, message) => {
        dispatch({
            type: status,
            message: message,
        })
    }

    function validateInputFields() {
        let errorMsg = "";
        if (firstName === "")
            errorMsg += "Empty first name!\n";
        if (lastName === "")
            errorMsg += "Empty last name!\n";
        if (email === "" || ! /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email))
            errorMsg += "Invalid email address!\n";
        if (phone === "" || ! /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone))
            errorMsg += "Invalid phone number!\n";
        if (password === "")
            errorMsg += "Empty password!\n";
        if(password !== confirmPassword)
            errorMsg += "Password fields do not match!\n";
        return errorMsg;
    }

    const registerClick = async () => {
        let errorMsg = validateInputFields();
        if (errorMsg !== "") {
            // alert(errorMsg);
            handleNewNotification("ERROR", errorMsg)
            return;
        }
        try {
            await axios.post(registerRoute, {
                "name":firstName,
                "surname":lastName,
                "email":email,
                "phone":phone,
                "password":{
                    "password":password
                }
            });
            handleNewNotification("SUCCESS", "Successfully registered")
            navigate('/login');
        } catch (e) {
            handleNewNotification("ERROR", "Email or phone already in use")
        }
    };

    return (
        <div id={styles.registerform}>
            <Logo loggedIn={"notLoggedIn"}/>
            <h2 id={styles.headerTitle}>Sign up</h2>
            <div className={styles.row}>
                <label>First name</label>
                <input type="text" placeholder="Enter your first name" onChange={(e) => setFirstName(e.target.value)}/>
            </div>
            <div className={styles.row}>
                <label>Last name</label>
                <input type="text" placeholder="Enter your last name" onChange={(e) => setLastName(e.target.value)}/>
            </div>
            <div className={styles.row}>
                <label>Email</label>
                <input type="text" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className={styles.row}>
                <label>Phone</label>
                <input type="tel" placeholder="Enter your phone number" onChange={(e) => setPhone(e.target.value)}/>
            </div>
            <div className={styles.row}>
                <label>Password</label>
                <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className={styles.row}>
                <label>Confirm password</label>
                <input type="password" placeholder="Enter your password again" onChange={(e) => setConfirmPassword(e.target.value)}/>
                {
                    password === confirmPassword ? null : <label id={styles.passwordMatching}>Password fields do not match!</label>
                }
            </div>
            <div id={styles.button} className={styles.row}>
                <button onClick={registerClick}>Sign up</button>
            </div>
            <div id={styles.logRegSwitch}>
                <Link to={"/login"}>Already have an account? Sign in!</Link>
            </div>
        </div>
    );
};



export default Register;
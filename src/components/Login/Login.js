import React from 'react';
import styles from "./Login.module.css";
import {useRef, useState, useEffect} from 'react';
import axios from "axios";
import * as qs from 'qs'
import {Link, useNavigate} from "react-router-dom";
import Logo from "../Logo/Logo";
import {baseUrl} from "../../api/baseUrl";

const LOGIN_URL = '/login';

const Login = () => {
    const emailRef = useRef();
    const errRef = useRef();

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[errMsg, setErrMsg] = useState('');



    let navigate = useNavigate();

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPwdChange = (e) => {
        setPassword(e.target.value);
    }

    const getUserInfo = async (email) => {
        try{
            const response = await axios.get(baseUrl + "/user?email=" + email);
            const userId = response?.data?.id;
            const name = response?.data?.name;
            const encPass = response?.data?.password.password;
            localStorage.setItem('userId', userId);
            localStorage.setItem('encPass', encPass);
            localStorage.setItem('name', name);
        } catch (err) {

        }
    }

    const onBtnClick = async () => {
        try{
            const response = await axios.post(baseUrl + LOGIN_URL, qs.stringify({email, password}), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            const accessToken = response?.data?.access_token;
            const refreshToken = response?.data?.refresh_token;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('email', email);
            await getUserInfo(email);
            navigate('/dashboard');
        } catch (err) {
            if(!err?.response)
                setErrMsg('No Server Response');
            else if (err.response?.status === 400)
                setErrMsg('No Server Response');
            else if (err.response?.status === 401)
                setErrMsg('Incorrect email or password!');
            else
                setErrMsg('Login failed');
        }
        errRef.current.focus();
    }

    return (
        <div id={styles.loginform}>
            <Logo loggedIn={"notLoggedIn"}/>
            <h2 id={styles.headerTitle}>Login</h2>
            <div>
                <div className={styles.row}>
                    <label>Email</label>
                    <input type="text" placeholder="Enter your username" ref={emailRef} onChange={onEmailChange} value={email} required/>
                </div>
                <div className={styles.row}>
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" onChange={onPwdChange} value={password} required/>
                </div>
                <p ref={errRef} aria-live="assertive" id={styles.errMsg}>{errMsg}</p>
                <div id={styles.button}className={styles.row}>
                    <button onClick={onBtnClick}>Log in</button>
                </div>
            </div>
            <div id={styles.logRegSwitch}>
                <Link to={"/register"}>Don't have an account? Sign up!</Link>
            </div>
            <div className={styles.logForgPwSwitch}>
                <Link to={"/forgotPassword"}>Forgot password</Link>
                {/*<a href={window.location.protocol + "//" + window.location.host + "/forgotPassword"}>Forgot password</a>*/}
            </div>
        </div>
    );
};

export default Login;
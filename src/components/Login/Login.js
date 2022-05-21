import React from 'react';
import "./Login.css";
import {useRef, useState, useEffect} from 'react';
import axios from "axios";
import * as qs from 'qs'
import { useNavigate } from "react-router-dom";
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

    const getUserId = async (email) => {
        try{
            const response = await axios.get(baseUrl + "/user?email=" + email);
            const userId = response?.data?.id;
            localStorage.setItem('userId', userId);
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
            await getUserId(email);
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
        <div id="loginform">
            <Logo loggedIn={"notLoggedIn"}/>
            <h2 id="headerTitle">Login</h2>
            <div>
                <div className="row">
                    <label>Email</label>
                    <input type="text" placeholder="Enter your username" ref={emailRef} onChange={onEmailChange} value={email} required/>
                </div>
                <div className="row">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" onChange={onPwdChange} value={password} required/>
                </div>
                <p ref={errRef} aria-live="assertive" id={"errMsg"}>{errMsg}</p>
                <div id="button" className="row">
                    <button onClick={onBtnClick}>Log in</button>
                </div>
            </div>
            <div id="logRegSwitch">
                <a href={window.location.protocol + "//" + window.location.host + "/register"}>Don't have an account? Sign up!</a>
            </div>
        </div>
    );
};

export default Login;
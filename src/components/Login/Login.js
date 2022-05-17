import React from 'react';
import "./Login.css";
import {useRef, useState, useEffect, useContext} from 'react';
import AuthContext from "../../context/AuthProvider";
import axios from "axios";
import * as qs from 'qs'
import { useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";

const LOGIN_URL = '/login';

const Login = () => {
    const {setAuth} = useContext(AuthContext);
    const emailRef = useRef();
    const errRef = useRef();

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[errMsg, setErrMsg] = useState('');
    const[success, setSuccess] = useState(false);

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

    const onBtnClick = async () => {
        try{
            let parameters = {
                email: email,
                password: password
            }
            const response = await axios.post("http://localhost:8084" + LOGIN_URL, qs.stringify({email, password}), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            setAuth({email, password, accessToken});
            navigate('/dashboard');
        } catch (err) {
            if(!err?.response)
                setErrMsg('No Server Response');
            else if (err.response?.status === 400)
                setErrMsg('No Server Response');
            else if (err.response?.status === 401)
                setErrMsg('Unauthorized');
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
                <p ref={errRef} aria-live="assertive">{errMsg}</p>
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
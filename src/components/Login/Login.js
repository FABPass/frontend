import React from 'react';
import "./Login.css";
import Logo from "../../resources/fabpass_logo.png"
import {useRef, useState, useEffect, useContext} from 'react';
import AuthContext from "../../context/AuthProvider";
import axios from "axios";
const LOGIN_URL = '/login';

const Login = () => {
    const {setAuth} = useContext(AuthContext);
    const emailRef = useRef();
    const errRef = useRef();

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[errMsg, setErrMsg] = useState('');
    const[success, setSuccess] = useState(false);

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
            const response = await axios.post(LOGIN_URL, JSON.stringify({email, password}), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            setAuth({email, password, accessToken});
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
            <img src={Logo} alt={"FABPass Logo"} className={"logo"}/>
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
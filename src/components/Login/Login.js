import React from 'react';
import "./Login.css";
import {useRef, useState, useEffect} from 'react';
import axios from "axios";
import * as qs from 'qs'
import { useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import {baseUrl} from "../../api/baseUrl";
import {connect} from "react-redux";

const LOGIN_URL = '/login';

const Login = (props) => {
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

    const onBtnClick = async () => {
        try{
            const response = await axios.post(baseUrl + LOGIN_URL, qs.stringify({email, password}), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.access_token;
            props.changeUserInfo(email, password, accessToken);
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

const mapStateToProps = (state) => {
    return {
        accessToken: state.accessToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeUserInfo: (email, password, accessToken) => {
            dispatch({type: 'CHANGE_USER_INFO', email: email, password: password, accessToken: accessToken})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
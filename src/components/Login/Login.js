import React from 'react';
import "./Login.css";
import Logo from "../../resources/fabpass_logo.png"
import {useRef, useState, useEffect} from 'react';

const Login = () => {
    return (
        <div id="loginform">
            <img src={Logo} alt={"FABPass Logo"} className={"logo"}/>
            <h2 id="headerTitle">Login</h2>
            <div>
                <div className="row">
                    <label>Email</label>
                    <input type="text" placeholder="Enter your username"/>
                </div>
                <div className="row">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password"/>
                </div>
                <div id="button" className="row">
                    <button>Log in</button>
                </div>
            </div>
            <div id="logRegSwitch">
                <a href={window.location.protocol + "//" + window.location.host + "/register"}>Don't have an account? Sign up!</a>
            </div>
        </div>
    );
};

export default Login;
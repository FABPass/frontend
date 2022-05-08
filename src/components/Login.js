import React from 'react';
import logo from "../resources/fabpass_logo.png";
import {Link} from "react-router-dom";

const Login = () => {
    return (
        <div>
            <img src={logo} alt={"FABPass Logo"}/>
            <h1>Log in</h1>
            <form>
                <label>
                    Email:
                    <input type="text" name="email" />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                <input type="submit" value="Submit" />
                <a href={"https://www.youtube.com/watch?v=aE-8Taeu4Tk&ab_channel=IMPERIA"}>Don't have an account? Sign up!</a>
            </form>
        </div>
    );
};

export default Login;
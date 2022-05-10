import React from 'react';
import "./Login.css";
import Logo from "../../resources/fabpass_logo.png"

const Login = () => {
    return (
        <div id="loginform">
            <img src={Logo} alt={"FABPass Logo"} className={"logo"}/>
            <FormHeader title="Login" />
            <Form />
            <OtherMethods />
        </div>
    );
};


const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);


const Form = props => (
    <div>
        <FormInput description="Email" placeholder="Enter your username" type="text" />
        <FormInput description="Password" placeholder="Enter your password" type="password"/>
        <FormButton title="Log in"/>
    </div>
);

const FormButton = props => (
    <div id="button" class="row">
        <button>{props.title}</button>
    </div>
);

const FormInput = props => (
    <div class="row">
        <label>{props.description}</label>
        <input type={props.type} placeholder={props.placeholder}/>
    </div>
);

const OtherMethods = props => (
    <div id="logRegSwitch">
        <a href={"https://youtube.com"}>Don't have an account? Sign up!</a>
    </div>
);

export default Login;
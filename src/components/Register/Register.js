import React from 'react';
import "./Register.css";
import Logo from "../../resources/fabpass_logo.png"
import PasswordStrengthBar from "react-password-strength-bar";

//const {password} = this.state;

const Register = () => {
    return (
        <div id="registerform">
            <img src={Logo} alt={"FABPass Logo"} className={"logo"}/>
            <FormHeader title="Sign up" />
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
        <FormInput description="First name" placeholder="Enter your first name" type="text" />
        <FormInput description="Last name" placeholder="Enter your last name" type="text" />
        <FormInput description="Email" placeholder="Enter your email" type="text" />
        <FormInput description="Phone" placeholder="Enter your phone number" type="tel" />
        <FormInput description="Password" placeholder="Enter your password" type="password"/>
        <FormInput description="Confirm password" placeholder="Enter your password again" type="password"/>
        {/*<PasswordStrengthBar password={password}/>*/}
        <FormButton title="Sign up"/>
    </div>
);

const FormButton = props => (
    <div id="button" className="row">
        <button>{props.title}</button>
    </div>
);

const FormInput = props => (
    <div className="row">
        <label>{props.description}</label>
        <input type={props.type} placeholder={props.placeholder}/>
    </div>
);

const OtherMethods = props => (
    <div id="logRegSwitch">
        <a href={window.location.protocol + "//" + window.location.host + "/login"}>Already have an account? Sign in!</a>
    </div>
);

export default Register;
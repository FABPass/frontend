import React from 'react';
import styles from "./Register.module.css";

import PasswordStrengthBar from "react-password-strength-bar";
import Logo from "../Logo/Logo";
import {Link} from "react-router-dom";

//const {password} = this.state;

const Register = () => {
    return (
        <div id={styles.registerform}>
            <Logo loggedIn={"notLoggedIn"}/>
            <FormHeader title="Sign up" />
            <Form />
            <OtherMethods />
        </div>
    );
};


const FormHeader = props => (
    <h2 id={styles.headerTitle}>{props.title}</h2>
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
    <div id={styles.button} className={styles.row}>
        <button>{props.title}</button>
    </div>
);

const FormInput = props => (
    <div className={styles.row}>
        <label>{props.description}</label>
        <input type={props.type} placeholder={props.placeholder}/>
    </div>
);

const OtherMethods = props => (
    <div id={styles.logRegSwitch}>
        <Link to={"/login"}>Already have an account? Sign in!</Link>
    </div>
);

export default Register;
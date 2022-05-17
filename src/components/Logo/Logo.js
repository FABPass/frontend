import React from 'react';
import Image from '../../resources/fabpass_logo.png';
import './Logo.css';

const Logo = (props) => {
    return (
        <div>
            <img src={Image} alt={"FABPass Logo"} className={props.loggedIn}/>
        </div>
    );
};

export default Logo;
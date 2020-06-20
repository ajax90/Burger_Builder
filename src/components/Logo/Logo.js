import React from 'react';
import burgerLogo from '/src/assets/images/original.png';
import classes from './Logo.css';

const logo = (props) => {
    return(
        <div className = {classes.Logo}>
            <img src = {burgerLogo} alt = 'MyBurger'/>
        </div>
    );
}

export default logo;
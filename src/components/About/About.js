import React, { Component } from 'react';
import './About.css';

import planet1 from '../../assets/img/planet-1.svg';
import Logo from '../Logo/Logo';

class About extends Component {
    render() {
        document.body.style.overflowY = 'hidden';
      	return (
      		<div className="about">
                <Logo linkTo='/' />
                <p>FILM PLANETARIUM</p>
                <p>A visualization of the relationship between directors and their collaborated actors/actresses.</p>
                <p>Designed by Nam Giang and Francesco Vitale.</p>
                <p>Developed by Nam Giang.</p>
                <div className="planet-img-container">
                    <img src={planet1} alt="planet-1" />
                </div>
            </div>
            )
    }
}

export default About;

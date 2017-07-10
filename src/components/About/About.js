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
                <h1 className="about__title">FILM PLANETARIUM</h1>
                <p className="about__description">A visualization of the relationship between directors and their collaborated actors/actresses.</p>
                <p className="about__sub-description">Designed by Nam Giang and Francesco Vitale.</p>
                <p className="about__sub-description">Developed by Nam Giang.</p>
                <div className="about__img-container">
                    <img className="about__img-container__img" src={planet1} alt="planet-1" />
                </div>
            </div>
        )
    }
}

export default About;

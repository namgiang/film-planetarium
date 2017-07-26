import React, { Component } from 'react';
import './About.css';

import planet1 from '../../assets/img/planet-1.svg';
import Logo from '../Logo/Logo';

class About extends Component {
    render() {
        document.body.style.overflowY = 'hidden';
      	return (
      		<article className="about">
                <Logo linkTo='/' />
                <h1 className="about_title">FILM PLANETARIUM</h1>
                <p className="about_description">A visualization of the relationship between directors and their collaborated actors/actresses.</p>
                <p className="about_sub-description">Designed by Nam Giang and Francesco Vitale.</p>
                <p className="about_sub-description">Developed by Nam Giang.</p>
                <div className="about_img-container">
                    <img className="about_img-container_img" src={planet1} alt="planet-1" />
                </div>
            </article>
        )
    }
}

export default About;

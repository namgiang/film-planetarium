import React, { Component } from 'react';
import './Logo.css';

import logo from '../../assets/img/planet-orbit.svg';

import { Link } from 'react-router-dom';

class Logo extends Component {
    render() {
        return (
            <Link to={this.props.linkTo} className="logo">
                <img src={logo} alt="logo"/>
            </Link>
        );
    }
}

export default Logo;

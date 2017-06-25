import React, { Component } from 'react';
import './Logo.css';

import logo from '../../assets/img/planet-orbit.svg';

import { Link } from 'react-router-dom';

class Logo extends Component {
    render() {
        return (
            <div className="logo">
                <Link to={this.props.linkTo}>
                    <img src={logo}
                         alt="logo"/>
                </Link>
            </div>
        );
    }
}

export default Logo;

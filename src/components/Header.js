import React, { Component } from 'react';
import './Header.css';

import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';

import logo from '../logo.svg';

class Header extends Component {
  render() {
  	return (
  		<div className="header">
  		  <div className="filters">
  		    <label>1950</label>
  		    <Range />
  		    <label>2000</label>
  		  </div>
  		  <div className="logo">
  		    <img src={logo} alt="logo"/>
  		  </div>
  		</div>
  	)
  } 
}

export default Header;
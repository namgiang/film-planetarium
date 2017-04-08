import React, { Component } from 'react';
import './Planet.css';
import { getDirectorImage } from '../services/images.js';

class Planet extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const director = this.props.director;
		const img = (director) ? getDirectorImage(director.label) : '';
		return (
			<div className='planet'>
			  <ul className='circle-container -5 blue'>
				  <li><div></div></li>				  
				</ul>
				<ul className='circle-container -4 pink'>
				  <li><div></div></li>				  
				</ul>
				<ul className='circle-container -3 blue'>
				  <li><div></div></li>				  
				</ul>
				<ul className='circle-container -2 blue'>
				  <li><div></div></li>				  
				</ul>
			  <img src={img} className='director-img center' />
			</div>	
		);
	}
}

export default Planet;
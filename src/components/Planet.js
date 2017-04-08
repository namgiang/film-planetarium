import React, { Component } from 'react';
import './Planet.css';

class Planet extends Component {
	render() {
		const img = "/img/directors/james_cameron.png";
		return (
			<div className='planet'>
			  <div className='circle circle-5 blue center'>
				</div>
			  <div className='circle circle-4 pink center'>
				</div>
			  <div className='circle circle-3 pink center'>
				</div>
				<div className='circle circle-2 blue center'>
				</div>
				<img src={img} className='director-img center' />
			</div>	
		);
	}
}

export default Planet;
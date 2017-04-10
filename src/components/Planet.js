import React, { Component } from 'react';
import './Planet.css';

import ImageService from '../services/images.js';
import MoviesService from '../services/movies';

import ActorCircle from './ActorCircle';

class Planet extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: [], 
			times: 0,
			actorHovered: false
		};
	}

	onActorClicked = (actor) => {
		this.props.onActorClicked(actor);
	}

	onActorHovered = (actor) => {
		this.setState((prevState, props) => ({
			actorHovered: !prevState.actorHovered,
			times: actor.times
		}));
	}

	onDirectorClicked = () => {
		this.props.onDirectorClicked(this.props.director);
	}

	render() {
		const director = this.props.director;
		const img = (director) ? ImageService.getDirectorImage(director.label) : '';
		const actorCircleList = this.props.actorCircleList.map((item, key) => 
			<ActorCircle key={key} 
									 className={item.className + ' ' + item.color} 
									 itemCount={item.itemCount} 
									 actors={item.actors}
									 onActorClicked={this.onActorClicked}
									 onActorHovered={this.onActorHovered} />
		);

		return (
			<div className='planet'>
			  {actorCircleList}
			  <img src={img} 
			       className='director-img center'
			       onClick={() => this.onDirectorClicked()} />
			  {this.state.actorHovered && (<div>
			  														 <div className="times-container center"></div>
			  													   <div className="times center" >
			  													   		<span className="number">{this.state.times}</span>
			  													   		<span className="small-text"> movies</span>
			  													   </div>
			  													 </div>)}
			</div>	
		);
	}
}

export default Planet;
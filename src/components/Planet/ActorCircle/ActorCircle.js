import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ActorCircle.css';
import { Actor } from '../../../models/actor';

class ActorCircle extends Component {
	onActorClicked = actor => {
		this.props.onActorClicked(actor);				
	};

	onActorMouseOver = actor => {
		this.props.onActorHovered(actor);
	}

	onActorMouseOut = actor => {
		this.props.onActorHovered(actor);
	}

	render() {
		const actorSelected = this.props.actorClicked;
		let actorCircles = [];
		let actors = this.props.actors;
		for (let i = 0; i < this.props.itemCount; i++) {
			const actor = actors[i];
			let circleClassName = "actor-container_circle actor-container_circle--" + actor.color;
			if (actorSelected !== null && actorSelected.name === actor.name) {
				circleClassName += ' selected';
			}
			actorCircles.push(
				<li key={i} className="actor-container">				  
					<div onClick={() => this.onActorClicked(actor)}
						onMouseOver={() => this.onActorMouseOver(actor)}
						onMouseOut={() => this.onActorMouseOut(actor)} >			      
						<div className={circleClassName} ></div>
						<span className="actor-name">
							{actors[i].name}
						</span>				  
					</div>
				</li>
            );
		}
		
		return (
			<ul className={this.props.className} >
				{actorCircles}
			</ul>
    	);
  	}

}

ActorCircle.propTypes = {
	actors: PropTypes.arrayOf(Actor),
	itemCount: PropTypes.number,
	className: PropTypes.string
}

export default ActorCircle;
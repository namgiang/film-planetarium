import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ActorCircle.css';
import { Actor } from '../../../models/actor';
import classNames from 'classnames';

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
		const actorCircles = this.props.actors.map(actor => {
			const circleClassName = classNames("actor-container_circle actor-container_circle--" + actor.color, {
				'selected': actorSelected && actorSelected.name === actor.name
			}) ;
			return (
				<li key={actor.name} className="actor-container">				  
					<div onClick={() => this.onActorClicked(actor)}
						onMouseOver={() => this.onActorMouseOver(actor)}
						onMouseOut={() => this.onActorMouseOut(actor)} >			      
						<div className={circleClassName} ></div>
						<span className="actor-name">
							{actor.name}
						</span>				  
					</div>
				</li>
			)
		})
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
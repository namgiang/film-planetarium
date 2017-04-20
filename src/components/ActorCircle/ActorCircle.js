import React, { Component } from 'react';
import './ActorCircle.css';

class ActorCircle extends Component {
	onActorClicked = (actor) => {
		this.props.onActorClicked(actor);				
	};

	onActorMouseOver = (actor) => {
		this.props.onActorHovered(actor);
	}

	onActorMouseOut = (actor) => {
		this.props.onActorHovered(actor);
	}

	render() {
		const actorSelected = this.props.actorClicked;
		let actorDots = [];
		let actors = this.props.actors;
		for (let i = 0; i < this.props.itemCount; i++) {
			const actor = actors[i];
			let dotClassName = actor.color;
			if (actorSelected !== null && actorSelected.name === actor.name) {
				dotClassName += ' selected';
			}
			actorDots.push(
				<li key={i}>				  
                    <a onClick={() => this.onActorClicked(actor)}
                       onMouseOver={() => this.onActorMouseOver(actor)}
                       onMouseOut={() => this.onActorMouseOut(actor)} >			      
                        <div className={dotClassName } ></div>
                        <span className="actor-name">
                            {actors[i].name}
                        </span>				  
                    </a>
                </li>
            );
		}
		
		return (
			<ul className={this.props.className} >
                {actorDots}
            </ul>
        );
    }

}

export default ActorCircle;
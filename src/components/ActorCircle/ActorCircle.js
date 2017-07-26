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
		let actorCircles = [];
		let actors = this.props.actors;
		for (let i = 0; i < this.props.itemCount; i++) {
			const actor = actors[i];
			let circleClassName = "actor-container_circle " + "actor-container_circle--" + actor.color;
			if (actorSelected !== null && actorSelected.name === actor.name) {
				circleClassName += ' selected';
			}
			actorCircles.push(
				<li key={i} className="actor-container">				  
          <a onClick={() => this.onActorClicked(actor)}
             onMouseOver={() => this.onActorMouseOver(actor)}
             onMouseOut={() => this.onActorMouseOut(actor)} >			      
              <div className={circleClassName} ></div>
              <span className="actor-name">
                  {actors[i].name}
              </span>				  
          </a>
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

export default ActorCircle;
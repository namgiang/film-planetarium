import React, { Component } from 'react';
import './Planet.css';

import ImageService from '../../services/images.js';
import MoviesService from '../../services/movies';

import ActorCircle from '../ActorCircle/ActorCircle';

class Planet extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: [], 
			times: 0,
			actorHovered: false,
			actorClicked: null
		};
	}

	onActorClicked = (actor) => {
		this.setState({
			actorClicked: actor
		});
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
		return (
			<div className='planet'>
               { this.renderActorCircles() }
               { this.renderDirectorImage() }
               { this.state.actorHovered && this.renderCollaboratedTimes() }
           </div>	
        );
    }

    renderDirectorImage() {
        let directorClass = 'director-img center';
        if (this.props.mini) {
            directorClass = 'mini-director-img center';
        }
        const director = this.props.director;
        const img = (director) ? ImageService.getDirectorImage(director.label) : '';

        return (
            <img src={img} 
                 className={directorClass}
                 onClick={() => this.onDirectorClicked()} />
        );
     }

    renderActorCircles() {
        let	actorCircleDomList;
        if (this.props.mini) {
            // for all directors View
            let actorCircleList = MoviesService.getActorCircleList(this.props.director.name, this.props.range, true);
            actorCircleDomList = actorCircleList.map((item, key) => 
                <ActorCircle key={key} 
                             className={item.className + ' mini' + item.color} 
                             itemCount={item.itemCount} 
                             actors={item.actors}
                             onActorClicked={this.onActorClicked}
                             onActorHovered={this.onActorHovered}
                             actorClicked={this.state.actorClicked} />
            );
        } else {
            // for single director View
            actorCircleDomList = this.props.actorCircleList.map((item, key) => 
                <ActorCircle key={key} 
                             className={item.className + ' ' + item.color} 
                             itemCount={item.itemCount} 
                             actors={item.actors}
                             onActorClicked={this.onActorClicked}
                             onActorHovered={this.onActorHovered}
                             actorClicked={this.state.actorClicked} />
            );
        }

        return actorCircleDomList;
    }

    renderCollaboratedTimes() {
        return (
            <div>
                <div className="times-container center"></div>
                <div className="times center" >
                    <span>
                        <label>{this.state.times}</label>
                        <br/> movies
                    </span>
                </div>
            </div>
        );
    }
}

export default Planet;
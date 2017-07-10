import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Planet.css';

import ImageService from '../../services/images';
import MoviesService from '../../services/movies';

import ActorCircle from '../ActorCircle/ActorCircle';

class Planet extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
		this.props.onActorClicked(null);
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
        let directorClass = 'img-director center';
        if (this.props.mini) {
            directorClass = 'img-director--mini center';
        }
        const director = this.props.director;
        const img = (director) ? ImageService.getDirectorImage(director.label) : '';

        return (
            <img src={img} 
                 className={directorClass}
                 onClick={() => this.onDirectorClicked()}
                 alt={director.label} />
        );
     }

    renderActorCircles() {
        let	actorCircleDomList;
        if (this.props.mini) {
            // all directors View
            let actorCircleList = MoviesService.getActorCircleList(this.props.director.name, this.props.range, true);
            actorCircleDomList = actorCircleList.map((item, key) => 
                <ActorCircle key={key} 
                             className={item.className + ' mini' + item.color} 
                             itemCount={item.itemCount} 
                             actors={item.actors}
                             onActorClicked={this.onActorClicked}
                             onActorHovered={this.onActorHovered}
                             actorClicked={this.props.currentActor} />
            );
        } else {
            // single director View
            actorCircleDomList = this.props.actorCircleList.map((item, key) => 
                <ActorCircle key={key} 
                             className={item.className + ' ' + item.color} 
                             itemCount={item.itemCount} 
                             actors={item.actors}
                             onActorClicked={this.onActorClicked}
                             onActorHovered={this.onActorHovered}
                             actorClicked={this.props.currentActor} />
            );
        }

        return actorCircleDomList;
    }

    renderCollaboratedTimes() {
        return (
            <div>
                <div className="times-container center"></div>
                <div className="times center" >
                    <span className="times__span">
                        <label className="times__span__label">{this.state.times}</label>
                        <br/> movies
                    </span>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentActor: state.filmApp.app.currentActor
    };
}

export default connect(mapStateToProps)(Planet);
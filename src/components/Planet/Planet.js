import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Planet.css';

import ImageService from '../../services/images';
import MoviesService from '../../services/movies';
import ActorCircle from './ActorCircle/ActorCircle';
import { Actor, ActorCircleItem, Director } from '../../models';

class Planet extends Component {
	constructor(props) {
		super(props);
		this.state = {
			times: 0,
			actorHovered: false
		};
	}

	onActorClicked = actor => {
		this.props.onActorClicked(actor);
	}

	onActorHovered = actor => {
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
        if (!this.props.director) {
            return null;
        }
        const directorClass = classNames('center', {
            'img-director': !this.props.mini,
            'img-director--mini': this.props.mini
        })
        const img = ImageService.getDirectorImage(this.props.director.label);
        return (
            <img src={img} 
                 className={directorClass}
                 onClick={() => this.onDirectorClicked()}
                 alt={this.props.director.label} />
        );
     }

    renderActorCircles() {
        let	actorCircleDomList;
        if (this.props.mini) {
            // all directors View
            let actorCircleList = MoviesService.getActorCircleList(this.props.director.name, this.props.range, true);
            actorCircleDomList = actorCircleList.map((item, key) => 
                <ActorCircle key={key} 
                             className={`${item.className} mini${item.color}`} 
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
                             className={`${item.className} ${item.color}`} 
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
            <React.Fragment>
                <div className="times-container center"></div>
                <div className="times center" >
                    <span className="times_span">
                        <label className="times_span_label">{this.state.times}</label>
                        <br/> movies
                    </span>
                </div>
            </React.Fragment>
        );
    }
}

Planet.propTypes = {
    currentActor: Actor, 
    director: Director,
    mini: PropTypes.bool,
    actorCircleList: PropTypes.arrayOf(ActorCircleItem)
}

const mapStateToProps = state => {
    return {
        currentActor: state.app.currentActor
    };
}

export default connect(mapStateToProps)(Planet);
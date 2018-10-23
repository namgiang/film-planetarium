import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Director.css';
import '../../../node_modules/grommet-css';
import PropTypes from 'prop-types';

import Planet from '../Planet/Planet';
import MovieList from './MovieList/MovieList';

import MoviesService from '../../services/movies';
import { setCurrentActor, setCurrentDirector, setPosters } from '../../store/actions';
import { Actor } from '../../models/actor';

const createHandlers = dispatch => {
  const onCurrentActorChanged = actor => {
    dispatch(setCurrentActor(actor));
	};
	const onCurrentDirectorChanged = director => {
    dispatch(setCurrentDirector(director));
  };
  const onLoaded = posters => {
    dispatch(setPosters(posters));
  };

  return {
		onCurrentActorChanged,
		onCurrentDirectorChanged,
    onLoaded
  };
}

class Director extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imageUrls: []
		}
		
		this.handleActorChange = this.handleActorChange.bind(this);
		this.handlers = createHandlers(this.props.dispatch);
		this.handlers.onCurrentDirectorChanged(this.getCurrentDirector());
	}

	getCurrentDirector() {
		return MoviesService.getDirectorByLabel(this.props.match.params.directorLabel);
	}

	handleActorChange(actor) {
		this.handlers.onCurrentActorChanged(actor);
	}

	componentDidMount() {
		MoviesService.fetchImageUrls(MoviesService.getMovies(this.getCurrentDirector().name, this.props.range, null))
        .then(urls => this.handlers.onLoaded(urls));
	}

	render() {
		const currentDirector = this.getCurrentDirector();
		document.body.style.overflowY = 'auto';
		
		return (
			<div>
			    { this.renderDirector(currentDirector) }
			</div>
		);
	}

	renderDirector(currentDirector) {
		const actorCircleList = MoviesService.getActorCircleList(currentDirector.name, this.props.range, false);
		const movies = MoviesService.getMovies(currentDirector.name, this.props.range, null);
		let actorMovies;
		if (this.props.currentActor) {
			actorMovies = MoviesService.getMovies(currentDirector.name, this.props.range, this.props.currentActor.name);	
		} else {
			actorMovies = [];
		}

		return (
			<article className="director-view">
			  <section className="director-view_left">
			      <Planet director={currentDirector} 
			              actorCircleList={actorCircleList}
			              onActorClicked={this.handleActorChange} />
			      <div className="legend legend--1">
			         <div className="legend_square"></div><span className="legend_label">Actor</span>
			      </div>
			      <div className="legend legend--2">
			         <div className="legend_square"></div><span className="legend_label">Actress</span>
			      </div>
			  </section>
			  <section className="director-view_right">
			      <MovieList movies={movies}
			      					 imageUrls={this.state.imageUrls}
			                 actorMovies={actorMovies} 
			                 currentActor={this.props.currentActor}
			                 director={currentDirector} />
			  </section>
			</article>
		);
	}
}

Director.propTypes = {
	range: PropTypes.arrayOf(PropTypes.number),
	dispatch: PropTypes.func,
	currentActor: Actor
}

const mapStateToProps = (state) => {
  return {
    range: state.filmApp.app.range,
    currentActor: state.filmApp.app.currentActor
  };
}

export default connect(mapStateToProps)(Director);

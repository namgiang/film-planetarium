import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Director.css';
import '../../../node_modules/grommet-css';

import Planet from '../Planet/Planet';
import MovieList from '../MovieList/MovieList';

import MoviesService from '../../services/movies';


class Director extends Component {

	constructor(props: any) {
		super(props);
		this.state = {
			currentActor: null
		};
		
		this.handleDirectorChange = this.handleDirectorChange.bind(this);
		this.handleActorChange = this.handleActorChange.bind(this);
	}

	getCurrentDirector() {
		return this.props.match ? MoviesService.getDirectorByLabel(this.props.match.params.directorLabel) : null;
	}

	handleDirectorChange(value) {
	    this.setState({
			currentActor: null,
		});					
	}

	handleActorChange(actor) {
		this.setState({
			currentActor: actor
		});
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
		const movies = MoviesService.getMovies(currentDirector, this.props.range, null);
		let actorMovies;
		if (this.state.currentActor) {
			actorMovies = MoviesService.getMovies(currentDirector, this.props.range, this.state.currentActor.name);	
		} else {
			actorMovies = [];
		}

		return (
			<div className="visuals">	
			  <section className="left">
			      <Planet director={currentDirector} 
			              actorCircleList={actorCircleList}
			              onActorClicked={this.handleActorChange}
			              onDirectorClicked={this.handleDirectorChange} />
			      <div className="legend-1">
			         <div></div><span>Actor</span>
			      </div>
			      <div className="legend-2">
			         <div></div><span>Actress</span>
			      </div>
			  </section>
			  <section className="right">
			      <MovieList movies={movies}
			                 actorMovies={actorMovies} 
			                 currentActor={this.state.currentActor}
			                 director={currentDirector} />
			  </section>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    range: state.filmApp.movies.range
  };
}

export default connect(mapStateToProps)(Director);

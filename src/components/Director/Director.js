import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Director.css';
import '../../../node_modules/grommet-css';

import Header from '../Header/Header';
import Planet from '../Planet/Planet';
import MovieList from '../MovieList/MovieList';

import MoviesService from '../../services/movies';
import { setCurrentActor, setPosters } from '../../actions';

const createHandlers = function(dispatch) {
  const onCurrentActorChanged = function(actor) {
    dispatch(setCurrentActor(actor));
  };
  const onLoaded = function(posters) {
    dispatch(setPosters(posters));
  };

  return {
    onCurrentActorChanged,
    onLoaded
  };
}

class Director extends Component {

	constructor(props: any) {
		super(props);
		this.state = {
			imageUrls: []
		}
		this.handleActorChange = this.handleActorChange.bind(this);
		this.handlers = createHandlers(this.props.dispatch);
	}

	getCurrentDirector() {
		return MoviesService.getDirectorByLabel(this.props.match.params.directorLabel);
	}

	handleActorChange(actor) {
		this.handlers.onCurrentActorChanged(actor);
	}

	componentDidMount() {
		MoviesService.fetchImageUrls(MoviesService.getMovies(this.getCurrentDirector().name, this.props.range, null))
        .then(urls => {
            this.handlers.onLoaded(urls);
        });
	}

	render() {
		const currentDirector = this.getCurrentDirector();
		document.body.style.overflowY = 'auto';
		
		return (
			<div>
			    <Header currentDirector={currentDirector} />
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
			<div className="visuals">	
			  <section className="left">
			      <Planet director={currentDirector} 
			              actorCircleList={actorCircleList}
			              onActorClicked={this.handleActorChange} />
			      <div className="legend-1">
			         <div></div><span>Actor</span>
			      </div>
			      <div className="legend-2">
			         <div></div><span>Actress</span>
			      </div>
			  </section>
			  <section className="right">
			      <MovieList movies={movies}
			      					 imageUrls={this.state.imageUrls}
			                 actorMovies={actorMovies} 
			                 currentActor={this.props.currentActor}
			                 director={currentDirector} />
			  </section>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    range: state.filmApp.app.range,
    currentActor: state.filmApp.app.currentActor
  };
}

export default connect(mapStateToProps)(Director);

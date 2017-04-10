import React, { Component } from 'react';
import './MovieList.css';
import ReactTooltip from 'react-tooltip';

import ImageService from '../services/images.js';
import MoviesService from '../services/movies.js';
const imdb = require('imdb-api');

class MovieList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movieHovered: false,
			hoveredMovie: '',
			movie: null
		}
	}

	onMovieMouseOver = (movie) => {
		this.setState({
			movieHovered: true,
			hoveredMovieID: movie.imdbID,
			hoveredMovie: movie
		});
	}

	onMovieMouseOut = (movie) => {
		this.setState({
			movieHovered: false
		});
	}

	render () {
		const movies = this.props.movies ? this.props.movies : [];
		const urls = this.props.imageUrls;
		const actorMovies = this.props.actorMovies;
		const currentActor = this.props.currentActor;
		const directorName = (this.props.director) ? this.props.director.name : '';
		let elements = [];
		for (let i in urls) {
			let movie = movies[i];
			let isActorMovie = false;
			if (actorMovies.length > 0) {
				isActorMovie = MoviesService.checkMovieIsInArray(movie, actorMovies);	
			}			
		  let el = (
		   	<div key={movie.imdbID}
		   			 className="poster-container"
		   			 data-tip data-for={movie.imdbID}
		   			 onMouseOver={() => this.onMovieMouseOver(movie)}
		   			 onMouseOut={() => this.onMovieMouseOut(movie)} >
		   	  {(urls[i] === 'N/A') ? (<span>{movie.title}</span>) 
			                        : (<img src={urls[i]} />)}
			    { !isActorMovie && (urls[i] === 'N/A') && <div className="overlay no-poster"></div> }
			    { !isActorMovie && (urls[i] !== 'N/A') && <div className="overlay poster"></div> }
	 		  </div>
    	);
		  elements.push(el);
		}
		let hoveredMovie = this.state.hoveredMovie;
		return (urls !== []) ? (
			<div className="movies-container">
			  <p className="movies-summary">{currentActor ? <span>{currentActor.name} starred in {actorMovies.length}/</span> : '' }{ movies.length } movies directed by {directorName}</p>
				{ elements }
				{ this.state.movieHovered && (<ReactTooltip id={this.state.hoveredMovieID}
																										className="movie-tooltip"
																										place="left" >
															  				<p className="title">{hoveredMovie.title}</p>
															  				<p className="year">{hoveredMovie.year}</p>
															  				<p className="actors">Starred: {hoveredMovie.actors}</p>
															  				<p className="plot">{hoveredMovie.plot}</p>
																			</ReactTooltip>)}
			</div>			
		) : (<div></div>);
	}
}

export default MovieList;
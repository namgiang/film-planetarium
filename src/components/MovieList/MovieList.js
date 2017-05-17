import React, { Component } from 'react';
import './MovieList.css';
import ReactTooltip from 'react-tooltip';

import MoviesService from '../../services/movies.js';
const imdb = require('imdb-api');

class MovieList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movieHovered: false,
			hoveredMovie: '',
			imageUrls: []
		}
	}

	async fetchImageUrls(movies) {
		let imageUrls = [];
		if (movies) {
			for (let i in movies) {
				imdb.getById(movies[i].imdbID).then((res) => {
					imageUrls.push(res.poster);
					this.setState({imageUrls: imageUrls});
				});
			}		  
		}
	}

	componentDidMount(): void {
		if (this.props.movies) {
			this.fetchImageUrls(this.props.movies);
		}
	}

	render () {	  
		// const urls = this.props.imageUrls;
		
		return (this.state.imageUrls !== []) ? (
			<div className="movies-container">
			    { this.renderMovieSummary() }
				{ this.renderPosters() }
				{ this.state.movieHovered && this.renderMovieDescription() }
			</div>			
		) : (<div></div>);
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

	renderMovieSummary() {
		const movies = this.props.movies ? this.props.movies : [];
		const currentActor = this.props.currentActor;
		const directorName = (this.props.director) ? this.props.director.name : '';
		return (
			<p className="movies-summary">
			    { currentActor ? 
                    (
                        <span>
			    	        <label className="highlighted">{currentActor.name}</label> starred in <label>{this.props.actorMovies.length}/</label>
					    </span>
                    ) : <span></span> 
                }
			    <label>{ movies.length }</label> movies directed by <label>{directorName}</label>
			</p>
		);
	}

	renderPosters() {
		const movies = this.props.movies ? this.props.movies : [];
		const urls = this.state.imageUrls;
		const actorMovies = this.props.actorMovies;
		let posters = [];
		for (let i in urls) {
			let movie = movies[i];
			let isActorMovie = false;
			if (actorMovies.length > 0) {
				isActorMovie = MoviesService.checkMovieIsInArray(movie, actorMovies);	
			}
			if (movie) {
				let el = (
			   	    <div key={movie.imdbID}
			   			 className="poster-container"
			   			 data-tip data-for={movie.imdbID}
			   			 onMouseOver={() => this.onMovieMouseOver(movie)}
			   			 onMouseOut={() => this.onMovieMouseOut(movie)} >
			   	        {(urls[i] === 'N/A') ? (<span>{movie.title}</span>) 
				                             : (<img src={urls[i]} alt={movie.title}/>)}
	    			    { !isActorMovie && (urls[i] === 'N/A') && <div className="overlay no-poster"></div> }
	    			    { !isActorMovie && (urls[i] !== 'N/A') && <div className="overlay poster"></div> }
		 		    </div>
	    	    );
			    posters.push(el);	
			}			
		    
		}
		return posters;
	}

	renderMovieDescription() {
		const hoveredMovie = this.state.hoveredMovie;
		
		return (
		    <ReactTooltip id={this.state.hoveredMovieID}
		  	     		  className="movie-tooltip"
						  place="left" >
		        <p className="title">{hoveredMovie.title}</p>
			 	<p className="year">{hoveredMovie.year}</p>
			 	<p className="actors">Starred: {hoveredMovie.actors}</p>
			 	<p className="plot">{hoveredMovie.plot}</p>
			</ReactTooltip>
	    );
	}
}

export default MovieList;
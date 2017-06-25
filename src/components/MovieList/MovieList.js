import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import './MovieList.css';

import MoviesService from '../../services/movies.js';

class MovieList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movieHovered: false,
			hoveredMovie: '',
			imageUrls: []
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
		return (this.props.imageUrls !== []) ? (
			<div className="movies-container" key={this.props.director.name}>
			  { this.renderMovieSummary() }
				{ this.renderPosters() }
				{ this.state.movieHovered && this.renderMovieDescription() }
			</div>			
		) : (<div></div>);
	}

	renderMovieSummary() {
		const movies = this.props.movies ? this.props.movies : [];
		const currentActor = this.props.currentActor;
		const directorName = (this.props.director) ? this.props.director.name : '';
		return (
			<p className="movies-summarby">
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
		const actorMovies = this.props.actorMovies;
		let posters = [];
		let urls = this.props.posters;
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
function mapStateToProps(state) {
  return {
    posters: state.filmApp.posters
  };
}

export default connect(mapStateToProps)(MovieList);
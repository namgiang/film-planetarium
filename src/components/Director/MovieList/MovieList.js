import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import Loader from 'react-loader';
import './MovieList.css';

import MoviesService from '../../../services/movies.js';
import { Director } from '../../../models/director';

const spinnerOptions = {
    lines: 8,
    length: 8,
    width: 4,
    radius: 10,
    scale: 1.00,
    corners: 1,
    color: '#fff',
    opacity: 0.25,
    rotate: 0,
    direction: 1,
    speed: 1,
    trail: 60,
    fps: 20,
    zIndex: 10,
    left: '50%',
    shadow: false,
    hwaccel: false,
    position: 'relative'
};

class MovieList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movieHovered: false,
			hoveredMovieID: ''
		};
	}

	onMovieMouseOver = (e) => {
		this.setState({
			movieHovered: true,
			hoveredMovieID: e.target.id
		});
	}

	onMovieMouseOut = () => {
		this.setState({
			movieHovered: false
		});
	}

	render () {
		return (this.props.imageUrls !== []) ? (
			<section className="movies-container" key={this.props.director.name}>
			  { this.renderMovieSummary() }
			  <Loader loaded={this.props.loaded} options={spinnerOptions} className="spinner">
			    <section onMouseOver={(e) => this.onMovieMouseOver(e)}
			   			     onMouseOut={() => this.onMovieMouseOut()} >	
				    { this.renderPosters() }
				  </section>
				</Loader>
				{ this.state.movieHovered && this.renderMovieDescription() }
			</section>			
		) : (<section></section>);
	}

	renderMovieSummary() {
		const movies = this.props.movies ? this.props.movies : [];
		const currentActor = this.props.currentActor;
		const directorName = (this.props.director) ? this.props.director.name : '';
		return (
			<p className="summary">
			    {   currentActor ?  <span>
										<label className="summary_label">{currentActor.name}</label> starred in <label className="summary_label">{this.props.actorMovies.length}/</label>
								 	</span>
                    :   <span></span> 
          }
			    <label className="summary_label">{ movies.length }</label> movies directed by <label className="summary_label">{directorName}</label>
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

			let overlayClass = "poster-container_overlay ";
			overlayClass += urls[i] === 'N/A' ? "poster-container_overlay--no-poster" : "poster-container_overlay--poster";
			overlayClass += isActorMovie ? " opacity-0" : "";

			if (movie) {
				let el = (
			   	    <div key={movie.imdbID + i}
			   			 className="poster-container"
			   			 data-tip data-for={movie.imdbID}>
			   	        {(urls[i] === 'N/A') ? <span className="poster-container_title">{movie.title}</span>
				                               : <img src={urls[i]} className="poster-container_img-poster" alt={movie.title}/> }
	    			    <div id={movie.imdbID} className={overlayClass}></div>
		 		      </div>
	    	    );
			    posters.push(el);	
			}		    
		}
		return posters;
	}

	renderMovieDescription() {
		const movieID = this.state.hoveredMovieID;
		const hoveredMovie = MoviesService.getMovieByID(movieID);
		
		return (
			<ReactTooltip 
				id={movieID}
		  	    className="movie-tooltip"
				place="left" >
		      	<p className="movie-tooltip_title">{hoveredMovie.title}</p>
				 	<p className="movie-tooltip_year">{hoveredMovie.year}</p>
				 	<p className="movie-tooltip_actors">Starred: {hoveredMovie.actors}</p>
				 	<p className="movie-tooltip_plot">{hoveredMovie.plot}</p>
			</ReactTooltip>
	    );
	}
}

MovieList.propTypes = {
	imageUrls: PropTypes.arrayOf(PropTypes.string),
	director: Director,
	loaded: PropTypes.bool,
	movies: PropTypes.array
}


const mapStateToProps = (state) => {
	return {
  	loaded: !state.filmApp.posters.isFetching,
    posters: state.filmApp.posters.urls
  };
}

export default connect(mapStateToProps)(MovieList);
import React, { Component } from 'react';
import './App.css';
import '../../node_modules/grommet-css';

import Header from './Header';
import Planet from './Planet';
import MovieList from './MovieList';

import { DIRECTORS } from '../data/directors';
import { MOVIES } from '../data/movies';

import MoviesService from '../services/movies';
const imdb = require('imdb-api');

class App extends Component {

	constructor(props: any) {
		super(props);
		this.state = {
			directors: [],
			director: null,
			range: [1960, 1990],
			actorCircleList: [], 
			movies: null, 
			imageUrls: [], 
			currentActor: null, 
			actorMovies: []
		};
		this.handleRangeChange = this.handleRangeChange.bind(this);
		this.handleDirectorChange = this.handleDirectorChange.bind(this);
	}

	componentDidMount() {
		this.setState({
			director: MoviesService.getDirector("Woody Allen"),
			actorCircleList: MoviesService.getActorCircleList('Woody Allen', this.state.range)
		});
	}

	handleRangeChange(value) {
		const actorName = this.state.currentActor ? this.state.currentActor.name : null;
		const newMovies = MoviesService.getMovies(this.state.director, value, null);
		let actorMovies;
		if (actorName) {
			actorMovies = MoviesService.getMovies(this.state.director, value, actorName);	
		} else {
			actorMovies = [];
		}		
		this.setState({
			range: value,
			actorCircleList: (this.state.director) ? MoviesService.getActorCircleList(this.state.director.name, value) : [],
			movies: newMovies,
			imageUrls: this.fetchImageUrls(newMovies),
			actorMovies: actorMovies
		});
	}

	handleDirectorChange(value) {
		const newMovies = MoviesService.getMovies(value, this.state.range, null);
		this.setState({
			director: value,
			currentActor: null,
			actorCircleList: MoviesService.getActorCircleList(value.name, this.state.range),
			movies: newMovies,
			imageUrls: this.fetchImageUrls(newMovies),
			actorMovies: []
		});
	}

	onActorClicked = (actor) => {
		const actorMovies = MoviesService.getMovies(this.state.director, this.state.range, actor.name);
		this.setState({
			currentActor: actor,
			actorMovies: actorMovies
		});
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

  render() {
    return (
    	<div className="App">
	      <Header onRangeChanged={this.handleRangeChange} 
	      				onDirectorChanged={this.handleDirectorChange} />
	      <div className="visuals">	
	        <section className="left">
	          <Planet director={this.state.director} 
	           				actorCircleList={this.state.actorCircleList}
	           				onActorClicked={this.onActorClicked}
	           				onDirectorClicked={this.handleDirectorChange} />
	        </section>
	        <section className="right">
	          <MovieList movies={this.state.movies}
	          					 imageUrls={this.state.imageUrls} 
	          					 actorMovies={this.state.actorMovies} 
	          					 currentActor={this.state.currentActor}
	          					 director={this.state.director} />
          </section>
        </div>
      </div>
    );
  }
}

export default App;

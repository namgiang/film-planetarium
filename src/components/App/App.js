import React, { Component } from 'react';
import './App.css';
import '../../../node_modules/grommet-css';

import Header from '../Header/Header';
import Planet from '../Planet/Planet';
import MovieList from '../MovieList/MovieList';
import Columns from 'grommet/components/Columns';

import { DIRECTORS } from '../../data/directors';
import { MOVIES } from '../../data/movies';

import MoviesService from '../../services/movies';
const imdb = require('imdb-api');

class App extends Component {

	constructor(props: any) {
		super(props);
		this.state = {
			directors: [],
			director: null,
			range: [1955, 2010],
			actorCircleList: [], 
			movies: null, 
			imageUrls: [], 
			currentActor: null, 
			actorMovies: [],
			showAll: true
		};
		this.handleRangeChange = this.handleRangeChange.bind(this);
		this.handleDirectorChange = this.handleDirectorChange.bind(this);
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
			actorCircleList: (this.state.director) ? MoviesService.getActorCircleList(this.state.director.name, value, false) : [],
			movies: newMovies,
			imageUrls: this.fetchImageUrls(newMovies),
			actorMovies: actorMovies
		});
	}

	handleDirectorChange(value) {
		if (value === null) {			
			this.setState({
				showAll: true,
			});
		} else {
			const newMovies = MoviesService.getMovies(value, this.state.range, null);
			this.setState({
				director: value,
				currentActor: null,
				actorCircleList: MoviesService.getActorCircleList(value.name, this.state.range, false),
				movies: newMovies,
				imageUrls: this.fetchImageUrls(newMovies),
				actorMovies: [],
				showAll: false
			});	
		}		
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
  	let directorDomList = [];
  	if (this.state.showAll) {
  		const emptyArray = [];
  		directorDomList = DIRECTORS.map((director, index) => {
  			return (
  				<div key={'mini-director-' + director.label}>
  				  <div className="planet-container">
        	 	  <Planet director={director}
  				  				imageUrls={emptyArray}
  					  			actorMovies={emptyArray}
  						  		mini={true}
  						  		range={this.state.range}
  						  		onDirectorClicked={this.handleDirectorChange} />
  					</div>
  				  <p className="mini-director-name">{director.name}</p>
  				</div>
  			)
  		});
  	}

  	let columnsDom; // boolean checking if the screen width/height is less than 1.5	
		if ((window.innerWidth / window.innerHeight) <= 1.5 ) {
			columnsDom = directorDomList;
		} else {
			columnsDom = (<Columns responsive={false}
  						  			 size='small'
  						  			 justify='between'
  						  			 maxCount={6}>
        	      			{directorDomList}
        	          </Columns>);
		}		

    return (
    	<div className="App">
	      <Header onRangeChanged={this.handleRangeChange} 
	      				onDirectorChanged={this.handleDirectorChange} />
	      { !this.state.showAll && 
	      	<div className="visuals">	
		        <section className="left">
		          <Planet director={this.state.director} 
		           				actorCircleList={this.state.actorCircleList}
		           				onActorClicked={this.onActorClicked}
		           				onDirectorClicked={this.handleDirectorChange} />
		          <div className="legend-1">
		          	<div></div><span>Actor</span>
		          </div>
		          <div className="legend-2">
		          	<div></div><span>Actress</span>
		          </div>
		        </section>
		        <section className="right">
		          <MovieList movies={this.state.movies}
		          					 imageUrls={this.state.imageUrls} 
		          					 actorMovies={this.state.actorMovies} 
		          					 currentActor={this.state.currentActor}
		          					 director={this.state.director} />
	          </section>
        	</div> }
        	{ this.state.showAll &&
        	  <div className="all-directors-container">
        	   	{columnsDom}
        		</div>}
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import '../../node_modules/grommet-css';

import Header from './Header';
import Planet from './Planet';

import { DIRECTORS } from '../data/directors';
import { MOVIES } from '../data/movies';

class App extends Component {

	constructor(props: any) {
		super(props);
		this.state = {
			movies: [],
			directors: [],
			director: null
		};
	}

	componentDidMount() {
		this.setState({
			director: this.getDirector("Woody Allen")
		});
		this.setState({
			movies: this.getDirectorMovies("Woody Allen")
		});
	}

	getDirectorMovies(directorName: string) {
		return MOVIES.filter(
			function(movie) {
			  return (movie.director) ? movie.director.includes(directorName) : false;
		  }
		);
	}

	getDirector(name: string): any {
		let directors = DIRECTORS.filter(
			function(director) { 
			  return (director.name === name);
		});
		return directors[0];
	}

  render() {
    return (
      <div className="App">
        <Header />
        <div className="visuals">	
          <section className="left">
            <Planet director={this.state.director} />
          </section>
          <section className="right">

          </section>
        </div>
      </div>
    );
  }
}

export default App;

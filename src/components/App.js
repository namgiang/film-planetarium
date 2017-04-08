import React, { Component } from 'react';
import './App.css';
import { parse } from '../services/parser';
import '../../node_modules/grommet-css';

import Header from './Header';
import Planet from './Planet';

class App extends Component {

	constructor(props) {
		super(props);
		let moviesParseResult = parse("movies");
		let directorsParseResult = parse("directors");
		this.parsePromise(moviesParseResult, "movies");
		this.parsePromise(directorsParseResult, "directors");
	}

	parsePromise(parseResult: any, type: string): void {
		let appInstance = this;
		parseResult.then(
			function(val) {
				appInstance.loadData(val.data, type);				
			}
		).catch ((err) => {
			console.log(err);
		});
	}

	loadData(data, type): void {
		switch (type) {
			case "movies":
				this.setState({movies: data});				
				break;
		  case "directors":
		    this.setState({directors: data});
		    console.log(this.getDirectors());
		    break;
		  default:
		    break;	
		}		
	}

	getDirectorMovies(directorName): void {
		return this.state.movies.filter(function(movie) { return (movie.director !== undefined) ? movie.director.includes(directorName) : false });
	}

	getDirectors(): Array<any> {
		return this.state.directors;
	}

  render() {
    return (
      <div className="App">
        <Header />
        <div className="visuals">	
          <section className="left">
            <Planet />
          </section>
          <section className="right">

          </section>
        </div>
      </div>
    );
  }
}

export default App;

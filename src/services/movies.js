import { MOVIES } from '../data/movies.js';
import { ACTORS } from '../data/actors.js';
import { DIRECTORS } from '../data/directors.js';
const imdb = require('imdb-api');

function MoviesService(){};

MoviesService.getFrequentActors = function(directorName: string, range: Array<number>) {
	let movies = MOVIES.filter(function(movie) {
	  return ((movie.director) ? movie.director.includes(directorName) : false)
	  			 && movie.year >= range[0] 
	  			 && movie.year <= range[1];	
  });

	let collaborators = [];

	for (let i in movies) {
		let actors = movies[i].actors.split(', ');		
		for (let i in actors) {
			let actorName = actors[i];
			if (actorName !== 'N/A') {
				let item = collaborators.filter(function(item) {
				  return item.name === actorName;
			  })[0];

			  if (item === undefined) {
			  	collaborators.push({ name: actorName,	times: 1 });
			  } else {
				  for (let i in collaborators) {					
					  if (collaborators[i].name === actorName) {
						  collaborators[i].times += 1;
						  break;  
					  }
				  }
			  }	
			}			
		} 
	}
	
	// filter only actors who collaborated with the director at least 2 times
	let frequentActors = collaborators.filter(function(collaborator){
		return collaborator.times >= 3;
	});

	// sort the list in the decreasing order of collaborating times
	return frequentActors.sort(function(a, b) {
		return b.times - a.times;
	});
};

MoviesService.getActorCircleList = function(directorName: string, range: Array<number>, mini: boolean){
	let frequentActors = MoviesService.getFrequentActors(directorName, range);
	let size = 0;
	let actorList = frequentActors.map((item, key) => {
		if (key !== 0 && item.times !== frequentActors[key - 1].times) {
		  size++;		  
		} 
		let itemCount = key - size + 1;
		let actors = ACTORS.filter(function(actor) {return actor.name === item.name});
		let actor = (actors.length > 0) ? actors[0] : null;
		let color = (actor) ? ((actor.gender === 'M') ? 'blue' : 'pink') : 'gray';
		let sizePrefix = (mini) ? 'size-mini-' : 'size-';
		let className = 'circle-container ' + sizePrefix + size + ' count-' + itemCount;
		return {className: className, color: color, actors: [{name: item.name, color: color, times: item.times}], itemCount: itemCount}
	});

	// check if some actors have the same amount of films with a director and merge them into one
	let temp = [];
	for (let i in actorList) {
		if (actorList[i].itemCount > 1) {
			actorList[i].actors = actorList[i].actors.concat(actorList[i-1].actors);
			if (actorList[i].color !== actorList[i-1].color) {
				actorList[i].color = 'gray';
			}
			temp.splice(0, 1);
			// actorList.splice(i-1, 1);
			// i--;
		}
		temp.unshift(actorList[i]);		
	}
	return temp;
}

MoviesService.getMovies = (directorName, range, actorName) => {
	let movies = [];	
	if (directorName === null) {
		return [];
	}

	if (actorName === null) {
		movies = MOVIES.filter(movie => movie.director.includes(directorName) && inRange(movie.year, range) );
	} else {
		movies = MOVIES.filter(movie => movie.director.includes(directorName) && inRange(movie.year, range) && movie.actors.includes(actorName) );
	}

	return movies;
}

MoviesService.getDirector = (directorName) => {
	return DIRECTORS.find(director => director.name === directorName);
}

MoviesService.getDirectorByLabel = (directorLabel) => {
	return DIRECTORS.find(director => director.label === directorLabel);
}

MoviesService.checkMovieIsInArray = (movie, array) => {	
	if (movie !== undefined) {
	  return array.some(item => item.imdbID === movie.imdbID);
	}
	return false;
}

MoviesService.fetchImageUrls = (movies) => {
	let promises = [];

	movies.forEach(movie => {
		let promise = imdb.getById(movie.imdbID, {apiKey: '8bb183ed'})
		.then((res) => {
			return res.poster;					
		})
		.catch(error => console.log(error));
		promises.push(promise);
	});

	return Promise.all(promises);
	}

function inRange(year, range) {
	return year >= range[0] && year <= range[1];
}

MoviesService.getMovieByID = (id) => {
	return MOVIES.find(movie => movie.imdbID === id);
}

export default MoviesService;
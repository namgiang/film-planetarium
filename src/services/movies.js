import { MOVIES } from '../data/movies.js';
import { ACTORS } from '../data/actors.js';
import { DIRECTORS } from '../data/directors.js';

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
				let item = collaborators.find(function(item) {
				  return item.name === actorName;
			  });

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
		return collaborator.times > 2;
	});

	// sort the list in the decreasing order of collaborating times
	return frequentActors.sort(function(a, b) {
		return b.times - a.times;
	});
};

MoviesService.getActorCircleList = function(directorName: string, range: Array<number>){
	let frequentActors = MoviesService.getFrequentActors(directorName, range);
	let size = 0;
	let actorList = frequentActors.map((item, key) => {
		if (key !== 0 && item.times !== frequentActors[key - 1].times) {
		  size++;		  
		} 
		let itemCount = key - size + 1;
		let actor = ACTORS.find(function(actor) {return actor.name === item.name});
		let color = (actor) ? ((actor.gender === 'M') ? 'blue' : 'pink') : 'gray'
		let className = 'circle-container size-' + size + ' count-' + itemCount;
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

MoviesService.getMovies = (director, range, actorName) => {
	let movies = [];
	
	if (director === null) {
		return [];
	}

	if (actorName === null) {
		movies = MOVIES.filter((movie) => {
			return movie.director.includes(director.name)
						 && inRange(movie.year, range); 
		});
	} else {
		movies = MOVIES.filter((movie) => {
			return movie.director.includes(director.name)
						 && inRange(movie.year, range)
						 && movie.actors.includes(actorName); 
		});
	}
	return movies;
}

MoviesService.getDirector = (directorName) => {
	return DIRECTORS.find(function(director) { 
	  return (director.name === directorName);
	});
}

MoviesService.checkMovieIsInArray = (movie, array) => {
	for (let i in array) {
		if (array.filter((item) => { return item.imdbID === movie.imdbID }).length > 0) {
			return true;
		}
	}
	return false;
}

function inRange(year, range) {
	return year >= range[0] && year <= range[1];
}

function removeItemInArray(item, array) {

	const index = array.indexOf(item);
	if (index > -1) {
    array.splice(index, 1);
  }
}

export default MoviesService;
import { MOVIES } from '../assets/data/movies.js';
import { ACTORS } from '../assets/data/actors.js';
import { DIRECTORS } from '../assets/data/directors.js';
const imdb = require('imdb-api');

const inRange = (year, range) => year >= range[0] && year <= range[1];

export default class MoviesService {

	static getFrequentActors(directorName, range) {
		const movies = MOVIES.filter(movie => {
			return ((movie.director) ? movie.director.includes(directorName) : false)
				&& movie.year >= range[0]
				&& movie.year <= range[1];
		});

		let collaborators = [];

		for (let movie of movies) {
			const actors = movie.actors.split(', ');
			for (let actor of actors) {
				if (actor !== 'N/A') {
					let collaborator = collaborators.find(item => item.name === actor);
					if (collaborator) {
						collaborator.times += 1;
					} else {
						collaborators.push({ name: actor, times: 1 });
					}
				}
			}
		}

		// filter only actors who collaborated with the director at least 3 times
		let frequentActors = collaborators.filter(collaborator => collaborator.times >= 3);

		// sort the list in the decreasing order of collaborating times
		return frequentActors.sort((a, b) => {
			return b.times - a.times;
		});
	};

	static getActorCircleList(directorName, range, mini) {
		let frequentActors = MoviesService.getFrequentActors(directorName, range);
		let size = 0;
		let actorList = frequentActors.map((item, key) => {
			if (key !== 0 && item.times !== frequentActors[key - 1].times) {
				size++;
			}
			let itemCount = key - size + 1;
			let actors = ACTORS.filter(actor => actor.name === item.name);
			let actor = (actors.length > 0) ? actors[0] : null;
			let color = (actor) ? ((actor.gender === 'M') ? 'blue' : 'pink') : 'gray';
			let sizePrefix = (mini) ? 'size-mini-' : 'size-';
			let className = 'circle-container ' + sizePrefix + size + ' count-' + itemCount;
			return { className: className, color: color, actors: [{ name: item.name, color: color, times: item.times }], itemCount: itemCount }
		});

		// check if some actors have the same amount of films with a director and merge them into one
		let temp = [];
		for (let i = 0; i < actorList.length; i++) {
			if (actorList[i].itemCount > 1) {
				actorList[i].actors = actorList[i].actors.concat(actorList[i - 1].actors);
				if (actorList[i].color !== actorList[i - 1].color) {
					actorList[i].color = 'gray';
				}
				temp.splice(0, 1);
			}
			temp.unshift(actorList[i]);
		}
		return temp;
	}

	static getMovies(directorName, range, actorName) {
		let movies = [];
		if (!directorName) {
			return [];
		}

		if (!actorName) {
			movies = MOVIES.filter(movie => movie.director.match(directorName) && inRange(movie.year, range));
		} else {
			movies = MOVIES.filter(movie => movie.director.match(directorName) && inRange(movie.year, range) && movie.actors.includes(actorName));
		}

		return movies;
	}

	static getDirector(directorName) {
		return DIRECTORS.find(director => director.name === directorName);
	}

	static getDirectorByLabel(directorLabel) {
		return DIRECTORS.find(director => director.label === directorLabel);
	}

	static checkMovieIsInArray(movie, array) {
		if (movie) {
			return array.some(item => item.imdbID === movie.imdbID);
		}
		return false;
	}

	static async fetchImageUrl(movie) {
	    try {
			const movieItem = await imdb.get({id: movie.imdbID}, { apiKey: '8bb183ed' })
			return movieItem.poster;
		} catch (error) {
			throw error;
		}
	}

	static fetchImageUrls(movies) {
		let promises = [];

		movies.forEach(movie => {
			let promise = imdb.get({id: movie.imdbID}, { apiKey: '8bb183ed' })
				.then(res => res.poster)
				.catch(error => console.log(error));
			promises.push(promise);
		});

		return Promise.all(promises);
	}

	static getMovieByID(id) {
		return MOVIES.find(movie => movie.imdbID === id);
	}
}


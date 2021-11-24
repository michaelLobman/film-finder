document.addEventListener("DOMContentLoaded", renderPage);

function renderPage(){
	fetchPosters();
	formListener();
	recListener();

}

const watchedArray = [];


function fetchPosters(){
	fetch("https://api.themoviedb.org/4/list/7114170?api_key=b0b77ea6cc2033f31116d4ef4f5925a6")
	.then(resp => resp.json())
	.then(data => {

		const filmArray = data["results"];
		const defaultContainer = document.getElementById("default-posters");

		for (const film of filmArray) {
			renderPosters(film, defaultContainer)
		}
	})
}	

function renderPosters(film, container) {
	const newCard = document.createElement('img');
	newCard.src = `${"https://www.themoviedb.org/t/p/original" + film["poster_path"]}`
	newCard.className = "film-poster";
	container.append(newCard); 
}

function formListener(){
	const filmForm = document.getElementById('form-input');
	filmForm.addEventListener('submit', fetchInput);
}

function fetchInput(e){
	e.preventDefault();
	const input = e.target.children[1].value;
	fetch(`https://api.themoviedb.org/3/search/movie?api_key=b0b77ea6cc2033f31116d4ef4f5925a6&query="${input}"`)
	.then(resp => resp.json())
	.then(data => {
		const counter = document.getElementById('input-counter');
		if (counter.textContent < 5) {
			console.log(data["results"][0])
			const inputFilm = data["results"][0];
			const inputContainer = document.getElementById('watched-posters');
			renderPosters(inputFilm, inputContainer);

			watchedArray.push(inputFilm);

			counter.textContent++

		} else { 
			counter.textContent = "You have already entered five films"
		}

		e.target.reset();
		
	})
}

function recListener(){
	const recButton = document.getElementById("get-recs");
	recButton.addEventListener('click', getRecommendations);
}

function getRecommendations(){
	const genreArray = [];
	for(const film of watchedArray){
		const genre = film["genre_ids"];
		genreArray.push(genre);
	}

	console.log(genreArray.flat());

	renderRecs(genreArray.flat());


}

function renderRecs(array){
	const genreObj = {};
	for(const item of array){
		if (genreObj[item]){
			i ++
			genreObj[item] = i;

		} else {
			i = 1
			genreObj[item] = i;
		}
	}

	console.log(genreObj);
	const sortedArr = Object.entries(genreObj).sort((a, b) => b[1] - a[1]);

	console.log(sortedArr);

	const finalArr = [];

	sortedArr.forEach(genre => finalArr.push(genre[0]))

	const sliced = finalArr.slice(0, 6);
	const firstGenre = parseInt(finalArr[0]);
	const secondGenre = parseInt(finalArr[1])
	const thirdGenre = parseInt(finalArr[2]);
	console.log(firstGenre);
	console.log(secondGenre);
	console.log(thirdGenre);

	// clear out others/defaults

	document.getElementById("default-posters").innerHTML = ''
	const recContainer = document.getElementById("rec-posters");

	if (firstGenre === 53 || secondGenre === 53) {

		console.log('inside first')

		fetch("https://api.themoviedb.org/4/list/7419796?api_key=b0b77ea6cc2033f31116d4ef4f5925a6")
		.then(resp => resp.json())
		.then(data => {

			// below could might not work (the slice)

			const filmArray = data["results"].slice(0, 4);

			for (const film of filmArray) {
				renderPosters(film, recContainer)
			}
		})

	}


	if (firstGenre === 80 || secondGenre === 80) {

		console.log('inside second')

		fetch("https://api.themoviedb.org/4/list/7423063?api_key=b0b77ea6cc2033f31116d4ef4f5925a6")
		.then(resp => resp.json())
		.then(data => {

			const filmArray = data["results"].slice(0, 4);

			for (const film of filmArray) {
				renderPosters(film, recContainer)
			}
		})
	}

	if (firstGenre === 18 || secondGenre === 18) {

		console.log('inside second')

		fetch("https://api.themoviedb.org/4/list/7432068?api_key=b0b77ea6cc2033f31116d4ef4f5925a6")
		.then(resp => resp.json())
		.then(data => {

			const filmArray = data["results"].slice(0, 4);

			for (const film of filmArray) {
				renderPosters(film, recContainer)
			}
		})

	}

	if (firstGenre === 28 || secondGenre === 28) {

		console.log('inside second')

		fetch("https://api.themoviedb.org/4/list/7434358?api_key=b0b77ea6cc2033f31116d4ef4f5925a6")
		.then(resp => resp.json())
		.then(data => {

			const filmArray = data["results"].slice(0, 4);

			for (const film of filmArray) {
				renderPosters(film, recContainer)
			}
		})

	}


	if (thirdGenre === 53) {

		console.log('inside first')

		fetch("https://api.themoviedb.org/4/list/7419796?api_key=b0b77ea6cc2033f31116d4ef4f5925a6")
		.then(resp => resp.json())
		.then(data => {

			// below could might not work (the slice)

			const filmArray = data["results"].slice(0, 2);

			for (const film of filmArray) {
				renderPosters(film, recContainer)
			}
		})

	}


	if (thirdGenre === 80) {

		console.log('inside second')

		fetch("https://api.themoviedb.org/4/list/7423063?api_key=b0b77ea6cc2033f31116d4ef4f5925a6")
		.then(resp => resp.json())
		.then(data => {

			const filmArray = data["results"].slice(0, 2);

			for (const film of filmArray) {
				renderPosters(film, recContainer)
			}
		})
	}

	if (thirdGenre === 18) {

		console.log('inside second')

		fetch("https://api.themoviedb.org/4/list/7432068?api_key=b0b77ea6cc2033f31116d4ef4f5925a6")
		.then(resp => resp.json())
		.then(data => {

			const filmArray = data["results"].slice(0, 2);

			for (const film of filmArray) {
				renderPosters(film, recContainer)
			}
		})

	}

	if (thirdGenre === 28) {

		console.log('inside second')

		fetch("https://api.themoviedb.org/4/list/7434358?api_key=b0b77ea6cc2033f31116d4ef4f5925a6")
		.then(resp => resp.json())
		.then(data => {

			const filmArray = data["results"].slice(0, 4);

			for (const film of filmArray) {
				renderPosters(film, recContainer)
			}
		})

	}

}

// as for checking new films against input 
// we already have a watchedArray, though of course it's nested... 

// i know we can search that though... a for of or a foreach will definitely work!

// did something similar in the bball lab


// let's just start with top one!
// should do something along the lines of...
// fetch then the list corresponding with that genre / numver which 
// would be sliced[0], then sliced[1], then sliced[2]
// is there a better way to do this...? maybe just the top two genres????


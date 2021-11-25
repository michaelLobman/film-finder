document.addEventListener("DOMContentLoaded", renderPage);

function renderPage(){
	fetchPosters();
	formListener();
	recListener();
	clearListener();

}
// const watchedArray = [];
const arrayAgainst = [];



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

	console.log(newCard.parentElement);

	const counter = document.getElementById('input-counter');
	const watchedContainer = document.getElementById("watched-posters");

	if (container === watchedContainer) {
		newCard.addEventListener('click', removeCard);
	}
}

function removeCard(e) {
	e.target.remove();
	const counter = document.getElementById('input-counter');
	counter.textContent--
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
			// watchedArray.push(inputFilm);
			// watchedArray.push(inputFilm["id"]);

			//this is quite repetivie code. there's a way
			// to copy the array... but maybe we can use the same
			// array... right now just trying to have some fix
			arrayAgainst.push(inputFilm["id"]);

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

function renderUnique (results, container) {

	let i = 0;
	let x = 0;

	while (x < 2) {

		if (arrayAgainst.includes(results[i]["id"])) {
			console.log("already logged");

			i++

		} else {
			renderPosters(results[i], container)
			arrayAgainst.push(results[i]["id"])
				
			x++
			i++
		}
	}

	console.log(arrayAgainst);

}


	// this should have inputs of the entered films and 
	// the films that are being recommended.

	// let's assume they are going to enter five films

	// and the button shouldn't be avaialbe until they do,

	// so then, for each, film, we need two results.

	// even if they five films are the same, it will keep going

	// down the chain until it gets to the ninth and tenth result,

	// and returns that. so the number that really needs to be counter

	// are the two recs per entered film, and the 10 total films entered into 

	// the array, which begins with the five input films.



// 	const recContainer = document.getElementById("rec-posters");

// 	let x = 0;

// 	while (x < 2) {

// 		for


// 	}


// 	for (x = 0; x < 2; x++) {

// 		for (i = 0; i < 10; i++) {

// 			if (arrayAgainst.includes(results[i]["id"])) {
// 				console.log("already logged");

// 			} else {
// 				results[i]
// 				renderPosters(results[i], recContainer)
// 				recArray.push(results[i]["id"])
// 				console.log(i);
// 			}

// 		}
// 	}

// }


function getRecommendations () {

	const recContainer = document.getElementById("rec-posters");
	document.getElementById("default-posters").innerHTML = ''

	// was watchedArray

	for(const watchedId of arrayAgainst) {
		fetch(`https://api.themoviedb.org/3/movie/${watchedId}/recommendations?api_key=b0b77ea6cc2033f31116d4ef4f5925a6&language=en-US&page=1`)
		.then(resp => resp.json())
		.then(data => {

			const films = data["results"]
		//	const films = data["results"].slice(0, 2);
			const containerCounter = recContainer.childElementCount;

			renderUnique(films, recContainer);

			// films.forEach(film => {

			// 	renderPosters(film, recContainer);
			// 	recArray.push(film["id"]);

			// })

		})
	}
	
}

			// need to write a recursive function
			// it will check each element if it is already included,
			// when added it will add to a counter i or j, adding up to two elements


				/*

				console.log("container count =" + recContainer.childElementCount)

				// this doesnt check second one in
				// and it doesn't account for the fact that the second element will
				// 

				for (i = 0; i < 2; i++) {

					if (recArray.includes(results[i]["id"])) {

						renderPosters(results[i+1], recContainer)

						recArray.push(results[i]["id"])

						i++

					} else {

						renderPosters(results[i], recContainer)

						recArray.push(results[i]["id"])

						i++

						
					}



				}


				})
				*/




/*

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

	const recContainer = document.getElementById("rec-posters");


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



	switch (thirdGenre){
		case 53:
			fetch("https://api.themoviedb.org/4/list/7419796?api_key=b0b77ea6cc2033f31116d4ef4f5925a6")
			.then(resp => resp.json())
			.then(data => {

				const filmArray = data["results"].slice(0, 2);

				for (const film of filmArray) {
					renderPosters(film, recContainer)
				}
			})
			break;
		case 80:
			fetch("https://api.themoviedb.org/4/list/7423063?api_key=b0b77ea6cc2033f31116d4ef4f5925a6")
			.then(resp => resp.json())
			.then(data => {

				const filmArray = data["results"].slice(0, 2);

				for (const film of filmArray) {
					renderPosters(film, recContainer)
				}
			})
			break;
		case 18:
			fetch("https://api.themoviedb.org/4/list/7432068?api_key=b0b77ea6cc2033f31116d4ef4f5925a6")
			.then(resp => resp.json())
			.then(data => {

				const filmArray = data["results"].slice(0, 2);

				for (const film of filmArray) {
					renderPosters(film, recContainer)
				}
			})
			break;
		case 28:
			fetch("https://api.themoviedb.org/4/list/7434358?api_key=b0b77ea6cc2033f31116d4ef4f5925a6")
			.then(resp => resp.json())
			.then(data => {

				const filmArray = data["results"].slice(0, 2);

				for (const film of filmArray) {
					renderPosters(film, recContainer)
				}
			})
			break
		case 35:
			fetch("https://api.themoviedb.org/4/list/7441510?api_key=b0b77ea6cc2033f31116d4ef4f5925a6")
			.then(resp => resp.json())
			.then(data => {

				const filmArray = data["results"].slice(0, 2);

				for (const film of filmArray) {
					renderPosters(film, recContainer)
				}
			})
			break

	}

	// could probably do these below as switch statements... Think I can abstract out
	// more of the code?? 

	// maybe the for of can become

	// filmArray.forEach(film => renderPosters(film, recContainer));



	if (firstGenre === 53 || secondGenre === 53) {
		fetch("https://api.themoviedb.org/4/list/7419796?api_key=b0b77ea6cc2033f31116d4ef4f5925a6")
		.then(resp => resp.json())
		.then(data => {

			const filmArray = data["results"].slice(0, 4);

			for (const film of filmArray) {
				renderPosters(film, recContainer)
			}
		})
	}


	if (firstGenre === 80 || secondGenre === 80) {
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
		fetch("https://api.themoviedb.org/4/list/7434358?api_key=b0b77ea6cc2033f31116d4ef4f5925a6")
		.then(resp => resp.json())
		.then(data => {

			const filmArray = data["results"].slice(0, 4);

			for (const film of filmArray) {
				renderPosters(film, recContainer)
			}
		})
	}


	if (firstGenre === 35 || secondGenre === 35) {
		fetch("https://api.themoviedb.org/4/list/7441510?api_key=b0b77ea6cc2033f31116d4ef4f5925a6")
		.then(resp => resp.json())
		.then(data => {

			const filmArray = data["results"].slice(0, 4);

			for (const film of filmArray) {
				renderPosters(film, recContainer)
			}
		})

	}
}

*/

// as for checking new films against input 
// we already have a watchedArray, though of course it's nested... 

// i know we can search that though... a for of or a foreach will definitely work!

// did something similar in the bball lab


// let's just start with top one!
// should do something along the lines of...
// fetch then the list corresponding with that genre / numver which 
// would be sliced[0], then sliced[1], then sliced[2]
// is there a better way to do this...? maybe just the top two genres????


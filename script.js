document.addEventListener("DOMContentLoaded", renderPage);

// const watchedArray = [];
const arrayAgainst = [];

function renderPage(){
	fetchPosters();
	recListener();
	clearListener();
	inputListener();

}

// Input Listener for Auto Complete

function inputListener () {
	const input = document.getElementById("input");

	input.addEventListener("input", fetchValue)

}

function fetchValue (e) {

	const autoList = document.getElementById("auto-list");



	if (e.target.value.length === 0) {
		autoList.innerHTML = "";

		e.target.reset()

	}

	else if (e.target.value.length > 2){

		fetch(`https://api.themoviedb.org/3/search/movie?api_key=b0b77ea6cc2033f31116d4ef4f5925a6&query="${e.target.value}"`)
		.then(resp => resp.json())
		.then(data => {


			const autoList = document.getElementById("auto-list");

			autoList.innerHTML = "";


			console.log(data["results"]);
			const autoArray = data["results"].slice(0, 5);
			console.log(autoArray)

			for (const film of autoArray) {

				const filmResult = document.createElement("img");
				filmResult.className = "film-result";
				filmResult.id = film["id"]

				filmResult.src = `${"https://www.themoviedb.org/t/p/original" + film["poster_path"]}`


				autoList.append(filmResult);


				filmResult.addEventListener('click', renderResult)
			}
		})
	}
}

function renderResult (e) {

	console.log(e.target)
	console.log(e.target.src) 
	console.log(e.target.id);

	document.getElementById("form-input").reset();
	document.getElementById("auto-list").innerHTML = '';

	const counter = document.getElementById('input-counter');

	if (counter.textContent < 5) {
		const inputContainer = document.getElementById('watched-posters');

		const resultCard = document.createElement('img');
		resultCard.src = e.target.src
		resultCard.className = "film-poster";
		inputContainer.append(resultCard); 
		resultCard.addEventListener('click', removeCard);
		arrayAgainst.push(e.target.id);
		counter.textContent++

		showButton();



	} else { 
		counter.textContent = "You have already entered five films"
	}

	
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


/*

// just in case we need to backtrack

function renderResult (e) {

	console.log(e.target)
	console.log(e.target.src)

	document.getElementById("form-input").reset();

	document.getElementById("auto-list").innerHTML = '';

	// const watchedContainer = document.getElementById("watched-posters")

	// document.getElementById("input").value = e.target.textContent
	// renderPosters(listId, watchedContainer)

	fetch(`https://api.themoviedb.org/3/movie/${e.target.id}?api_key=b0b77ea6cc2033f31116d4ef4f5925a6&language=en-US`)

	.then(resp => resp.json())
	.then(film => {

		const counter = document.getElementById('input-counter');

		console.log(film)
		if (counter.textContent < 5) {
			const inputContainer = document.getElementById('watched-posters');
			renderPosters(film, inputContainer);
			// watchedArray.push(inputFilm);
			// watchedArray.push(inputFilm["id"]);

			//this is quite repetivie code. there's a way
			// to copy the array... but maybe we can use the same
			// array... right now just trying to have some fix
			arrayAgainst.push(film["id"]);

			counter.textContent++

			showButton();



		} else { 
			counter.textContent = "You have already entered five films"
		}

		//e.parentElement.parentElement.reset();
		
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

*/


// show the button when film count equals five

function showButton() {
	const recButton = document.getElementById("get-recs");
	const counter = document.getElementById("input-counter");

	if (counter.textContent === '5') {

		recButton.style.display = 'inline';



	}
}



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




function removeCard(e) {
	e.target.remove();
	const counter = document.getElementById('input-counter');
	counter.textContent--
}

// function formListener(){
// 	const filmForm = document.getElementById('form-input');
// 	filmForm.addEventListener('submit', fetchInput);
// }


// this is what need to change...

// function fetchInput(e){
// 	e.preventDefault();
// 	const input = document.getElementById("input").value

// 	fetch(`https://api.themoviedb.org/3/search/movie?api_key=b0b77ea6cc2033f31116d4ef4f5925a6&query="${input}"`)
// 	.then(resp => resp.json())
// 	.then(data => {
// 		const counter = document.getElementById('input-counter');
// 		if (counter.textContent < 5) {
// 			console.log(data["results"][0])
// 			const inputFilm = data["results"][0];
// 			const inputContainer = document.getElementById('watched-posters');
// 			renderPosters(inputFilm, inputContainer);
// 			// watchedArray.push(inputFilm);
// 			// watchedArray.push(inputFilm["id"]);

// 			//this is quite repetivie code. there's a way
// 			// to copy the array... but maybe we can use the same
// 			// array... right now just trying to have some fix
// 			arrayAgainst.push(inputFilm["id"]);

// 			counter.textContent++

// 			showButton();



// 		} else { 
// 			counter.textContent = "You have already entered five films"
// 		}

// 		e.target.reset();
		
// 	})
// }

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

function getRecommendations () {

	const recContainer = document.getElementById("rec-posters");
	const recButton = document.getElementById("get-recs");

	// repetitive

	recButton.style.display = "none";

	document.getElementById("default-posters").innerHTML = ''

	for(const watchedId of arrayAgainst) {
		fetch(`https://api.themoviedb.org/3/movie/${watchedId}/recommendations?api_key=b0b77ea6cc2033f31116d4ef4f5925a6&language=en-US&page=1`)
		.then(resp => resp.json())
		.then(data => {

			const films = data["results"]
			const containerCounter = recContainer.childElementCount;

			renderUnique(films, recContainer);

		})
	}
	
}

function clearListener() {

	const reset = document.getElementById("reset");
	reset.addEventListener('click', resetPage);

}

function resetPage () {

	document.getElementById("watched-posters").innerHTML = '';
	document.getElementById("rec-posters").innerHTML = '';
	document.getElementById("default-posters").innerHTML = '';
	document.getElementById("input-counter").textContent = 0;

	fetchPosters();


}


// right now, I want to solve the problem of the button
// for fetching recs - only visible when five are entered,
// once clicked, it goes away!
// comes back when reset is pushed!












// For the auto complete type feature



// function completeListener () {
// 	const form = document.getElementById("form-input");
// 	form.addEventListener()
// }



































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


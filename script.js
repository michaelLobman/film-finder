document.addEventListener("DOMContentLoaded", renderPage);

const arrayAgainst = [];

function renderPage(){
	fetchPosters();
	recListener();
	clearListener();
	inputListener();

}


function inputListener () {
	const input = document.getElementById("input");
	input.addEventListener("input", fetchValue)

}

function fetchValue (e) {

	const autoList = document.getElementById("auto-list");

	if (e.target.value.length === 0) {
		autoList.innerHTML = "";

		e.target.reset()

	} else if (e.target.value.length > 2){

		fetch(`https://api.themoviedb.org/3/search/movie?api_key=b0b77ea6cc2033f31116d4ef4f5925a6&query="${e.target.value}"`)
		.then(resp => resp.json())
		.then(data => {

			const autoList = document.getElementById("auto-list");

			autoList.innerHTML = "";

			const autoArray = data["results"].slice(0, 5);

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

	document.getElementById("default-posters").innerHTML = '';


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
		arrayAgainst.push(parseInt(e.target.id));
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

	const counter = document.getElementById('input-counter');
	const watchedContainer = document.getElementById("watched-posters");

	if (container === watchedContainer) {
		newCard.addEventListener('click', removeCard);
	}
}


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


function recListener(){
	const recButton = document.getElementById("get-recs");
	recButton.addEventListener('click', getRecommendations);
}

function renderUnique (results, container) {

	let i = 0;
	let x = 0;

	while (x < 2) {

		if (arrayAgainst.includes(results[i]["id"])) {

			i++

		} else {
			renderPosters(results[i], container)
			arrayAgainst.push(results[i]["id"])
				
			x++
			i++
		}
	}

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
	//reset.addEventListener('click', resetPage);
	reset.addEventListener('click', (() => location.reload()));

}

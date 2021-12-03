# The Film Finder

The Film Finder is a Single-Page Application for finding film recommendations.

## Description

In today's age of streaming, it can be difficult to sort through the myriad options at our fingertips to find something to watch. That is where The Film Finder comes in. It asks you to enter **5** films, from which it will generate **10** unique recommendations based on the keywords, genre preferences, time period, and personnel of the entered films.


## Visuals

https://youtu.be/-2ciCMda7ig

Turn into .gif then add

## Usage

Begin by typing your first film into the input form. As you type, the top search results from The Movie Database's API will populate beneath the text area in the form of their repective posters. When your intended film appears, click on its poster to confirm that recommendation.

https://j.gifs.com/LZ5DVW.gif 

Repeat this process until you have entered **5** films, at which time the "Get Recommendations" will appear.

Click the "Get Recommendations" button to generate your **10** recommended films.

*Do you like similar movies?* Have no fear! The Film Finder will neither repeat an entry as a recommedation nor will it provide duplicate recommendations. For example, if you enter **5** *Harry Potter* films, your **10** recommendations will include the other **3** films in the series but will not regurgitate your entries. 

































Welcome to The Film Finder.

When I first conceptualized this application, I envisioned a simple, clean design that allowed the films
to be front and center. I wanted the user to enter five films and for the application to fetch and return
ten recommended films from my selected API, The Movie Database (TMDB).

While exploring The Movie Database, I saw that each film entry had at least one genre tag and as many 
as five. There were 17 possible genre tags in all (e.g. "Action", "Drama", "Mystery", etc).

Although TMDB has a method to return recommendations for any particular film, I wanted to build my own
lists for each of the 17 genres and write an algorithm to find the three genre tags that appeared most often 
in the user's five entries and fetch four recommendations from the top two genres and two from the third 
genre.

However, I determined that such an algorithm would return a limited number of permutations that
would be overly general. For example, the majority of films in TMDB have a "Drama" genre tag and therefore the
algorithm would frequently fetch four drama films- that is, the same four drama films over and over again.
Moreover, if the user enters ten "Horror" films, the algorithm would fetch only four "Horror" films, then
a total of six films from the second and third genres despite "Horror" being the overwhelming pattern
in the entries.

Further, such an algorithm would ONLY fetch films based on genre, not keywords, people of interest, etc.
For instance, if the user enters five Stanley Kubrick movies, the algorithm would behave as if the 
films' only connection was their genre.

With these considerations in mind, I decided to utilize TMDB's recommended films method and write an
algorithm to fetch the top two results films from each of the user's five entries, to bring the grand 
total of recommendations to ten. TMDB's method considers genre, release date, keywords, and personnel 
and therefore produces an exponetially greater number of permutations.

I considered having the user enter anywhere from one to ten films (with more or less fetches for each
entry) but quickly decided that, with this new functionality, five films was the sweet spot. Any fewer 
and the connection between recommendations and input became too tenuous. Any more and the user's task
becomes a chore.

Some new issues quickly came into focus. First,  I wanted to solve the problem of duplicate recommendations.
If the user enters five similar films, not only may some of the ten recommendations be duplicates, but the 
recommendations may include some if not all of the entered films. For instance, if the user enters:

	"The Godfather"
	"The Godfather Part II"
	"The Godfather Part III"
	"Taxi Driver"
	"Goodfellas"

These films all return each other as well as some of the same recommendations (like "Apocalypse Now").

Thankfully, one component of TMDB's result array is a specific id for each film.

To avoid the sloppy redundancy, I created an empty array. I wrote an algorithm to check each input's id
against the array using the .find method, and, if the id is unique, the input would render and the film's 
id would be added to the array. If the .find method returns true, the user receives an alert saying 
they have already entered that film and the input is neither rendered nor added to the array. I created
a similar algorithm to ensure the recommendations would be unique, checking each potential recommendation's
id versus the array and, if unique, rendering it. 

Another consideration was the user's input experience. How exactly could the user enter their films so 
that the TMDB would fetch the precise result? Of course, the user can't know TMDB's proprietary film ids
for each film; some users may not even know the exact title of a film, just that it is one of the Harry 
Potter movies. This brings up another issue, sequels and remakes. If the user types "Insomnia", how 
could they specify the American remake or the Norwegian original?

An early case I tried was Alfred Hitchcock's "Psycho". Entering "psycho" into the form would fetch "Psycho
Goreman" as the first result and Gus Van Sant's "Psycho" remake as the second. The intended film,
Alfred Hitchcock's, was the third result.

This made me think about the user's entries in a more abstract sense. What if the entries became a part 
of the application, and instead of finding the exact film the user moreso needs to narrow the 
field?

With this in mind, I made the input form begin fetching results once the user enters three characters. 
The function would search TMDB for the value of the form, rendering the posters of the top five results on 
the page. Each keystroke would, in a sense, narrow down the user's search. In this iteration, entering 
"Psycho" renders five posters on the app, Hitchcock's film being the third. Such functionality also 
deepens the user's connection with the application, as posters are far more evocative than 
the plain text of titles.

When a user clicks on the appropriate poster, the four unchosen posters disappear and the selected poster
moves to the top of the page, replacing the default banner and officially being one of the user's watched 
films. The counter on the page increments to '1', and the user continues entering films until five have
been rendered. At which point, a "Get Recommendations" button appears. When clicked, an event fires 
to fetch two recommended films for each of the watched/user input films, rendering a total of ten 
recommended films in the form of their respective posters on the bottom of the page.

var db = new alasql.Database();

Papa.parse("Top ps4.csv", {
	download: true,
	dynamicTyping: true,
	header: true,
	complete: function(results) {
		db.exec(`CREATE TABLE Movies`);
		db.tables[`Movies`].data = results.data;
		displayMovies(db.exec("SELECT * FROM Movies ORDER BY Series_Title"));
	}
});

function displayMovies(movies) {
	document.querySelector('#results').innerHTML = "";
	window.scrollTo(0, 0);
	movies.forEach(function(movie) {
		var newCard = document.createElement("div");
		newCard.className = "card";
		newCard.innerHTML = `
			<div>
				<img src="${movie.URL}">
        			<div class="movie-title">${movie.Title}</div>
        			<div class="movie-year">${movie.Year}</div>
        			
              <div class="movie-Genres">${movie.Genres}
</div>
      			</div>
      			<div class="movie-rating">Number of votes:  ${movie.NumVotes}</div>
    		`;
		document.querySelector('#results').append(newCard)
	})
}

function sortByYear() {
	displayMovies(db.exec(`SELECT * FROM Movies ORDER BY Year Desc`));
}

function sortByNumVotes() {
	displayMovies(db.exec(`SELECT * FROM Movies ORDER BY NumVotes Desc`));
}

function sortByGenres() {
	displayMovies(db.exec(`SELECT * FROM Movies ORDER BY Genres`));
}

function searchTitles(searchString) {
	displayMovies(db.exec(`SELECT * FROM Movies WHERE Title LIKE '%${searchString}%'`));
}
function sortByRanking() {
	displayMovies(db.exec(`SELECT * FROM Movies ORDER BY Position Asc`));
}


function getGame(game) {
	displayMovies(db.exec(`SELECT * FROM Movies WHERE Title LIKE '${game}%'`));
}

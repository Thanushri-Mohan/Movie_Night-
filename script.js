const movies = [
    {
        title: "Inception",
        genre: "Sci-Fi",
        rating: 8.8,
        description: "A skilled thief enters people's dreams to steal secrets.",
        poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg"
    },
    {
        title: "Interstellar",
        genre: "Sci-Fi",
        rating: 8.7,
        description: "Explorers travel through space searching for a new home for humanity.",
        poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
    },
    {
        title: "The Dark Knight",
        genre: "Action",
        rating: 9.0,
        description: "Batman faces a dangerous criminal who brings chaos to Gotham.",
        poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
    },
    {
        title: "Spider-Man: Into the Spider-Verse",
        genre: "Animation",
        rating: 8.4,
        description: "A teenager discovers that there are many versions of Spider-Man.",
        poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg"
    },
    {
        title: "The Hangover",
        genre: "Comedy",
        rating: 7.7,
        description: "Three friends wake up after a wild night and try to piece together what happened.",
        poster: "https://image.tmdb.org/t/p/w500/A0d5Hf9zqM5c7W8QmK9fY5vR8.jpg"
    },
    {
        title: "The Pursuit of Happyness",
        genre: "Drama",
        rating: 8.0,
        description: "A struggling father works to build a better life for himself and his son.",
        poster: "https://image.tmdb.org/t/p/w500/lBYOKAMcxIvuk9s9JguqkR9V8dE.jpg"
    },
    {
        title: "Toy Story",
        genre: "Animation",
        rating: 8.3,
        description: "A group of toys comes to life when humans are not around.",
        poster: "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg"
    },
    {
        title: "Avengers: Endgame",
        genre: "Action",
        rating: 8.2,
        description: "The Avengers attempt to undo the destruction caused by Thanos.",
        poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
    }
];

const movieGrid = document.getElementById("movieGrid");
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");
const sortRating = document.getElementById("sortRating");
const themeButton = document.getElementById("themeButton");

const movieModal = document.getElementById("movieModal");
const closeModal = document.getElementById("closeModal");

let favorites = [];

function displayMovies(movieList) {

    movieGrid.innerHTML = "";

    if (movieList.length === 0) {
        movieGrid.innerHTML = "<p>No movies found.</p>";
        return;
    }

    movieList.forEach(function (movie) {

        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title} poster">

            <div class="movie-info">

                <h2>${movie.title}</h2>

                <p>Genre: ${movie.genre}</p>

                <p>⭐ ${movie.rating}</p>

                <div class="movie-actions">

                    <button class="details-button">
                        Details
                    </button>

                    <button class="favorite-button">
                        ${favorites.includes(movie.title) ? "♥ Saved" : "♡ Favorite"}
                    </button>

                </div>

            </div>
        `;

        const detailsButton =
            movieCard.querySelector(".details-button");

        detailsButton.addEventListener("click", function () {
            openMovieDetails(movie);
        });

        const favoriteButton =
            movieCard.querySelector(".favorite-button");

        favoriteButton.addEventListener("click", function () {
            toggleFavorite(movie.title);
        });

        movieGrid.appendChild(movieCard);
    });
}

function filterMovies() {

    const searchText =
        searchInput.value.toLowerCase();

    const selectedGenre =
        genreFilter.value;

    let filteredMovies = movies.filter(function (movie) {

        const matchesSearch =
            movie.title.toLowerCase().includes(searchText);

        const matchesGenre =
            selectedGenre === "all" ||
            movie.genre === selectedGenre;

        return matchesSearch && matchesGenre;
    });

    if (sortRating.value === "high") {
        filteredMovies.sort(function (a, b) {
            return b.rating - a.rating;
        });
    }

    if (sortRating.value === "low") {
        filteredMovies.sort(function (a, b) {
            return a.rating - b.rating;
        });
    }

    displayMovies(filteredMovies);
}

function openMovieDetails(movie) {

    document.getElementById("modalPoster").src =
        movie.poster;

    document.getElementById("modalTitle").textContent =
        movie.title;

    document.getElementById("modalGenre").textContent =
        "Genre: " + movie.genre;

    document.getElementById("modalRating").textContent =
        "Rating: ⭐ " + movie.rating;

    document.getElementById("modalDescription").textContent =
        movie.description;

    movieModal.style.display = "flex";
}

closeModal.addEventListener("click", function () {
    movieModal.style.display = "none";
});

movieModal.addEventListener("click", function (event) {

    if (event.target === movieModal) {
        movieModal.style.display = "none";
    }
});

function toggleFavorite(movieTitle) {

    if (favorites.includes(movieTitle)) {

        favorites = favorites.filter(function (title) {
            return title !== movieTitle;
        });

    } else {

        favorites.push(movieTitle);
    }

    filterMovies();
}

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeButton.textContent = "Light Mode";
    } else {
        themeButton.textContent = "Dark Mode";
    }
});

searchInput.addEventListener("input", filterMovies);

genreFilter.addEventListener("change", filterMovies);

sortRating.addEventListener("change", filterMovies);

displayMovies(movies);

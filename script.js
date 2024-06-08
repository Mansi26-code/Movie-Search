const modalBox = document.querySelector('.movie-modal-box');

const handleInput = () => {
    modalBox.style.display = "block";

    const query = document.getElementById('searchInput').value;
    let movieUrl = `https://www.omdbapi.com/?apikey=6e0f7d2a&s=${query}`;
    console.log(query);
    fetchMovieData(movieUrl);
}

const fetchMovieData = async (movieUrl) => {
    try {
        const response = await fetch(movieUrl);
        const data = await response.json();
        modalBox.innerHTML = ''; // Clear previous results
        if (data.Response === "True") {
            const movieItems = data.Search.map((element) => {
                const movieItem = document.createElement('div');
                movieItem.classList.add('movies');
                const { Title, Year, Type, Poster, imdbID } = element;

                movieItem.innerHTML = `
                <div onclick="handleClick('${imdbID}')" style="display:flex; cursor:pointer;">
                    <div class="poster">
                        <img src="${Poster !== 'N/A' ? Poster : 'https://via.placeholder.com/150'}" alt="${Title}">
                    </div>
                    <div class="details">
                        <h3>${Title}</h3>
                        <p>${Year}</p>
                        <p>${Type}</p>
                    </div>
                </div>
                `;
                return movieItem;
            });
            movieItems.forEach((movieItem) => {
                modalBox.appendChild(movieItem);
            });
            modalBox.style.display = 'block'; // Show the modal box
        } else {
            modalBox.innerHTML = '<p>No movies found.</p>';
            modalBox.style.display = 'block'; // Show the modal box with the no movies message
        }
    } catch (error) {
        console.log(error);
        modalBox.innerHTML = '<p>Error fetching movie data.</p>';
        modalBox.style.display = 'block';
    }
}

const handleClick = async (imdbID) => {
    const detailsUrl = `https://www.omdbapi.com/?apikey=6e0f7d2a&i=${imdbID}`;
    try {
        const response = await fetch(detailsUrl);
        const data = await response.json();
        modalBox.style.display = "none";
        const movieDetailsBox = document.querySelector('.movie_content');
        movieDetailsBox.innerHTML = `
            <div class="banner movie_box">
                <img src="${data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/150'}" alt="${data.Title}">
                <div class="details">
                     <h3>${data.Title}</h3>
                    <p class="year"><b>Year</b>: ${data.Year}</p>
                    
                    <p class="released"><b>Released</b>: ${data.Released}</p>
                    <p><b>Runtime</b>: ${data.Runtime}</p>
                    <p class="genre"><b>Genre</b>: ${data.Genre}</p>
                  
                    <p class="actors"><b>Actors</b>: ${data.Actors}</p>
                    <p class="plot"><b>Plot</b>: ${data.Plot}</p>
                    
                </div>
            </div>
        `;
    } catch (error) {
        console.log(error);
        const movieDetailsBox = document.querySelector('.movie_content');
        movieDetailsBox.innerHTML = '<p>Error fetching movie details.</p>';
    }
}

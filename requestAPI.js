const ytsAPI = "https://yts.mx/api/v2/list_movies.json";

let page = 1;
const moviecount = document.getElementById("moviecount");
const cards = document.getElementById("_cards");
const forms = document.getElementById("forms");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

const getJSON = async url => {
    const response = await fetch(url);
    return response.json(); // get JSON from the response 
}

getJSON(ytsAPI).then(data => showMovies(data));

function showMovies(_data){
    moviecount.innerText = `( ${_data.data.movie_count} )`;
    cards.innerHTML = "";
    _data.data.movies.forEach(movie =>{
        const {url, title, medium_cover_image} = movie;
        const movieCard = document.createElement("a");
        movieCard.setAttribute('href', url);
        movieCard.innerHTML = `
        <figure class="card">
            <img src="${medium_cover_image}" />
            <figcaption>${title}</figcaption>
        </figure>`;

        cards.appendChild(movieCard);
    });
}

next.addEventListener("click", function()
{
    document.getElementById("browse").scrollIntoView();
    page = page + 1;
    getJSON(`${ytsAPI}?page=${page}`).then(data => showMovies(data));
});

if(page != 1)
{
    prev.next.addEventListener("click", function()
    {
        document.getElementById("browse").scrollIntoView();
        page = page - 1;
        getJSON(`${ytsAPI}?page=${page}`).then(data => showMovies(data));
    });
}

forms.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getJSON(`${ytsAPI}?query_term=${searchTerm}`).then(data => showMovies(data));
        search.value = "";
    }
});
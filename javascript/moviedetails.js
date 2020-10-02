const ytsAPI = 'https://yts.mx/api/v2/movie_details.json';

var id = new URL(location.href).searchParams.get("id");

const moviecontent = document.getElementById("_moviecontent");
const moviepicture = document.getElementById("_moviepicture");
const screenshot = document.getElementById("screenshot");
const moviebanner = document.getElementById("_moviebanner");

const getJSON = async url => {
    const response = await fetch(url);
    return response.json(); // get JSON from the response 
}

getJSON(`${ytsAPI}?movie_id=${id}&with_images=true`).then(data => showMovieDetails(data));

function showMovieDetails(_data) {

    moviecontent.innerHTML = "";
    moviepicture.innerHTML = "";
    const title = document.createElement("h2");
    title.innerText = _data.data.movie.title_long;
    moviecontent.appendChild(title);

    _data.data.movie.genres.forEach(genre => {
        const _genre = document.createElement("a");
        _genre.setAttribute('href', "#");
        _genre.setAttribute('class', "genre");
        _genre.innerText = genre;
        moviecontent.appendChild(_genre);
    });

    const desc = document.createElement("p");
    desc.innerHTML = _data.data.movie.description_full + `<p>Available in:</p>`;
    moviecontent.appendChild(desc);

    _data.data.movie.torrents.forEach(torrent => {
        const { url, quality, type, size } = torrent;
        const download = document.createElement("a");
        download.setAttribute('href', `${url}`);
        download.setAttribute('class', "download");
        download.innerHTML = `
        <img src="img/icons8-below-100.png">${quality}.${type} (${size})`;
        moviecontent.appendChild(download);
    });

    const img = document.createElement("img");
    img.setAttribute('src', _data.data.movie.medium_cover_image);
    moviepicture.appendChild(img);

    const rating = document.createElement("h2");
    rating.innerText = `Rating (${_data.data.movie.rating})`;
    const runtime = document.createElement("h2");
    runtime.innerText = `Runtime (${_data.data.movie.runtime})`;
    moviepicture.appendChild(rating);
    moviepicture.appendChild(runtime);

    const trailer = document.createElement("div");
    trailer.setAttribute('class', "gallery");
    trailer.innerHTML = `<iframe src="https://www.youtube.com/embed/${_data.data.movie.yt_trailer_code}" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>`;
    screenshot.appendChild(trailer);

    const gallery = document.createElement("div");
    gallery.setAttribute('class', "gallery");
    gallery.innerHTML = `
    <img src="${_data.data.movie.medium_screenshot_image1}">`;
    screenshot.appendChild(gallery);

    const gallery1 = document.createElement("div");
    gallery1.setAttribute('class', "gallery");
    gallery1.innerHTML = `
    <img src="${_data.data.movie.medium_screenshot_image2}">`;
    screenshot.appendChild(gallery1);

    loadImage(_data.data.movie.background_image_original);
}

function loadImage(data){
    moviebanner.style.background = `url(${data})`;
    moviebanner.style.backgroundPosition = `center`;
    moviebanner.style.backgroundSize = `cover`;
}
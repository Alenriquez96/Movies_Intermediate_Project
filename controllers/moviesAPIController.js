const movies = require('../models/moviesAPIModel');
const search = require('../utils/moviesAPIUtils')


const dashboard = (req, res) => {
    res.render("user/dashboard");
}

const searchFilms = (req, res) => {
    res.render("user/search");
}

const getFilms = async (req, res) => {
    if (req.params.title) {
        const film = await search.getFilmsByTitle(req.params.title);//Devuelve 1
        const f = film.results
        console.log(f);
        res.render("user/searchTitle", { "films": f });//Pinta datos en el pug. Aquí hemos metido data en un objeto para que con la plantilla del pug lo coja.
    }
}

const inputFilms = (req, res) => {
    const films = req.body.films;
    res.redirect(`http://localhost:3000/search/${films}`)
}

const showFilm = async (req, res) => {
    if (req.params.title) {
        const filmInfo = await search.getFilmInfo(req.params.title);//Devuelve 1
        res.render("user/searchMovieTitle", { "film": filmInfo });
    };
};

//-------Esta se encarga de las pelis favoritas----//
function like(){

}

const myMovies = async (req, res) => {
    //Aqui dentro va toda la movida del fetch a nuestras pelis favoritas y que se rendericen...
    //-----------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------



    res.render("user/myMovies");
}

const createMovie = async (req, res) => {
    console.log(req.body); // Objeto recibido de entry nueva
    const newEntry = req.body; // {} nuevo producto a guardar
    // Líneas para guardar en una BBDD SQL
    const response = await search.createEntry(newEntry);
    res.status(201).json({ "items_created": response });
}

const updateMovie = async (req, res) => {

}

const deleteMovie = async (req, res) => {

}


const movie = {

    // getMovieByTitle,
    // getAllMovies,
    createMovie,
    // updateMovie,
    // deleteMovie,
    searchFilms,
    getFilms,
    inputFilms,
    showFilm,
    dashboard,
    myMovies,
    like
}

module.exports = movie;
const movies = require('../models/moviesAPIModel');
const search = require('../utils/moviesAPIUtils');
const db = require('../models/userAPIModel');
const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const scrap_sensacine = require('../utils/scrap_sensacine');
const scrap_filmaffinity = require('../utils/scrap_filmaffinity');


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
        res.render("user/searchTitle", { "films": f });//Pinta datos en el pug. Aquí hemos metido data en un objeto para  que con la plantilla del pug lo coja.
    }
}

const inputFilms = (req, res) => {
    const films = req.body.films;
    /*     scraper.scrap_sensacine(films) // scrapping de la pelicula que se busque.
     */
    res.redirect(`${process.env.URL_BASE}/search/${films}`)

}

const showFilm = async (req, res) => {

    console.log(req.params);
    try {
        console.log("ESTO SON LOS REQ.PARAMS: ", req.params);
        const info = await search.getFilmInfo(req.params.id);//Devuelve detalles de 1 peli a través de su ID
        const reviewS = await scrap_sensacine(req.params.title);  //Devuelve detalles de 1 peli a través de su titulo
        const reviewF = await scrap_filmaffinity(req.params.title);
        /*      console.log("console log de reviewF: ", reviewF);
             console.log("console log de reviewS: ", reviewS); */
        if (reviewF == undefined) {
            const filmInfo = {
                info,
                reviewS
            }
            console.log(filmInfo);
            res.render("user/searchMovieTitle", { "film": filmInfo });
        } else {
            const filmInfo = {
                info,
                reviewS,
                reviewF
            }
            console.log(filmInfo);
            res.render("user/searchMovieTitle", { "film": filmInfo });
        }



    } catch (error) {
        console.log('Error:', error);
    }
};


//-------Esta se encarga de las pelis favoritas----//
const myMovies = async (req, res) => {
    //TODO: if else para saber si es admin o user
    const users = await db.getUsers();
    const token = (req.headers.cookie).slice(13);
    const decoded = jwt.verify(token, config.llave)
    const user = users.find(u => { return u.email === decoded.email });

    if (user.admin == true) { // Admin
        const aMovies = await movies.getAllMovies();
        
        res.render("admin/moviesAdmin", { "films": aMovies });
    } else { // User
        
        const favMovies = await movies.getFavs(token)
        res.render("user/myMovies", {"films": favMovies })
        
    }
}

const addFavMovie = async (req, res) => {
    const addMovieId = req.body.id;
    console.log(addMovieId);
    await movies.addFavMovie(addMovieId);
}

const createMovieView = (req, res) => {
    res.render("admin/createMovie")
}

const createMovie = async (req, res) => {
    const newMovie = req.body; // {} nuevo producto a guardar
    const response = await movies.createMovie(newMovie);
    res.status(201).redirect(`${process.env.URL_BASE}/movies`);
}

const updateMovieView = async (req, res) => {
    if (req.params.id) {
        const movie = await movies.getMovieById(req.params.id); //Devuelve 1
        res.render("admin/editMovie", { "film": movie });
    };
}

const updateMovie = async (req, res) => {
    let movie = req.body;
    movie._id = req.params.id;
    await movies.updateMovie(movie);
    res.status(201).redirect(`${process.env.URL_BASE}/moviesAdmin`);
}

const deleteMovie = async (req, res) => {
    const deleteMovieById = req.body.id;
    await movies.deleteMovie(deleteMovieById);
    res.redirect(`${process.env.URL_BASE}/movies`);
}


const movie = {
    //ADMIN
    createMovie,
    createMovieView,
    updateMovie,
    updateMovieView,
    deleteMovie,
    //USER
    searchFilms,
    getFilms,
    inputFilms,
    showFilm,
    dashboard,
    myMovies,//Esta la comparten admin y user
    addFavMovie
}

module.exports = movie;
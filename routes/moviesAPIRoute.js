const movieAPI = require('../controllers/moviesAPIController');
const routes = require('express').Router();


// TODO: Faltaría el middleware para comprobar si está logueado y el rol


routes.get("/dashboard", movieAPI.dashboard)
routes.get('/search', movieAPI.searchFilms);
routes.get('/search/:title?', movieAPI.getFilms);
routes.get('/movie/:title?', movieAPI.showFilm);
routes.post('/search', movieAPI.inputFilms);
routes.get("/movies", movieAPI.myMovies);

//CRUD DEL ADMIN
routes.get('/movies', movieAPI.myMovies);
routes.get("/createMovie", movieAPI.createMovieView);
routes.post('/createMovie', movieAPI.createMovie);
routes.get("/editMovie", movieAPI.updateMovieView)
routes.put("/editMovie", movieAPI.updateMovie);
//routes.get("/removeMovie", movieAPI.deleteMovieView);
routes.post("/removemovie", movieAPI.deleteMovie);



module.exports = routes;
require('dotenv').config();
const { ObjectId } = require('mongodb');
const Movie = require("./movieSchemaModel");
const queries = require('../utils/queries.js');
const pool = require('../utils/dbconfig-pg.js');
const db = require('../models/userAPIModel');
const jwt = require('jsonwebtoken');
const config = require('../configs/config');

const getMovieById = async (id) => {
    const oId = new ObjectId(id);
    const movie = await Movie.findById({ _id: oId });
    return movie;
}

const getAllMovies = async () => {
    //TODO: Comprobar el usuario
    const aMovies = await Movie.find({});
    return aMovies;
}

const getFavs = async (token) => {

    const decoded = jwt.verify(token, config.llave)
    let client, result;
    client = await pool.connect();
    try {
        const data = await client.query(queries.getFavs, [decoded.email]);
        //console.log(data.rows);
        const allIDs = data.rows;
        const mongoIDsObjects = allIDs.filter(function (e) {
            return e.movie_id.length > 19
        });
        const sqlIDsObjects = allIDs.filter(function (e) {
            return e.movie_id.length < 19
        });
        const mongoIDs = mongoIDsObjects.map(function (obj) {
            return obj.movie_id;
        });
        const sqlIDs = sqlIDsObjects.map(function (obj) {
            return obj.movie_id
        });

        console.log([mongoIDs, sqlIDs])

        const mongoMovies = [];
        let mongoMovie;
        for (const movieID of mongoIDs) {
            mongoMovie = await Movie.find({ _id: movieID });
            mongoMovies.push(mongoMovie);

        }
        console.log(mongoMovies)
        return [mongoMovies, sqlIDs]
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

const addFavMovie = async (id, user) => {
    //TODO: Se meten en SQL 
    let client;
    client = await pool.connect();
    try {
        const data = await client.query(`INSERT INTO movies(movie_id, user_id) VALUES `, [id, user.user_id]);
        console.log(data.rows);
        const allIDs = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}


const createMovie = async (movie) => {
    const newMovie = new Movie(movie);
    await Movie.create(newMovie);
}


const updateMovie = async (movie) => {
    let movieId = movie._id;
    const oId = new ObjectId(movieId);
    const movieToUpdate = await Movie.findById({ _id: oId })
    const updatedMovie = new Movie({
        title: movie.title,
        year: movie.year,
        director: movie.director,
        casting: movie.casting,
        plot: movie.plot,
        genre: movie.genre,
        rating: movie.rating,
        duration: movie.duration,
        image: movie.image
    });
    movieToUpdate.overwrite(updatedMovie);
    await movieToUpdate.save();
}


const deleteMovie = async (id) => {
    await Movie.deleteOne({ _id: id })

    //borrar de SQL también
    let client, result;
    client = await pool.connect();
    try {
        const data = await client.query(queries.deleteMovieQuery, [id]);
        result = data.rows;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
    finally {
        client.release();
    }
    return result;
}


const movieAPI = {
    getMovieById,
    getAllMovies,
    getFavs,
    addFavMovie,
    createMovie,
    updateMovie,
    deleteMovie
}

module.exports = movieAPI;


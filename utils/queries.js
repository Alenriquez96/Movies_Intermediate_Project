//QUERIES

const signUpUserQuery = `INSERT INTO users(name,surname,email,password) VALUES ($1,$2,$3,$4)`

const getUsersQuery = `SELECT * FROM users`    
const deleteMovieQuery = `DELETE FROM movies WHERE movie_id = $1`
// const updateUserPassQuery = ``



const queries = {
signUpUserQuery,
getUsersQuery,
deleteMovieQuery

}



module.exports = queries;
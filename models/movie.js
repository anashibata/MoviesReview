const express = require('express')
const YtsApi = require('yts-api-pt')
const urlListMovies = 'https://yts.mx/api/v2/list_movies.json' 
const urlMovieDetails = 'https: //yts.mx/api/v2/movie_details.json?movie_id=10'
const db = require('./db') 

function GetListMovies(movieTitle, movieGenre) { 
  return new Promise(function(resolve, reject) { 
   const yts = new YtsApi({
     urlListMovies     
   })

   movieTitle = (movieTitle == 'all' ? '' : movieTitle)
   movieGenre = (movieGenre == 'all' ? '' : movieGenre)

   yts.getMovies({
     limit: 20,
     page: 1,
     quality: 'All',
     minimumRating: 0,      
     queryTerm: movieTitle,
     genre: movieGenre,
     sortBy: 'date_added',
     orderBy: 'desc',
     withRtRatings: false
   }).then (resApi => {

    resApi.data.movies.forEach(function (objMovie, index) {
      objMovie.newRating = index
      
      GetMoviesNewRatings(objMovie.id)
      .then(function(listMovies) {  
         objMovie.newRating = 12
      })
      
      
    })
    resolve(resApi)     

  })

 })
}

function GetMovieDetail(movieId) {
  return new Promise(function(resolve, reject) { 

    const ytsteste = new YtsApi({
      urlMovieDetails    
    })

    ytsteste.getMovie({
      movieId: parseInt(movieId),
      withImages: true,
      withCast: true
    }).then (resApi => {
      resolve(resApi)
    }).catch(err => reject(err)) 
       
  })     
}

function RatingMovie(idUser,idMovie, rating) {
  sql = 'INSERT INTO ratings (IdUser, IdMovie,Rating) VALUES (?, ?, ?)'
  var values = [idUser, idMovie, rating]; 

   return new Promise(function(resolve, reject) {   
     db.mysqlcon.query(sql, values, function (err, result) {
       if (err) { return reject(err); }        
       resolve(result);
     });
   });
}


function GetMoviesRatings(listMovies) {
  return new Promise(function(resolve, reject) { 
    listMovies.data.movies.forEach(function (objMovie, index, array) {
      GetMoviesNewRatings(objMovie.id).then(rat => {          
        objMovie.newRating = rat        
        resApi.data.movies[index] = objMovie
      })     
    })   
  });
}


async function GetMoviesNewRatings(idMovie) {
  return new Promise(function(resolve, reject) { 
    let sql = "SELECT distinct RT.IdMovie, sum(RT.Rating )/count(*) 'Rating' from ratings RT WHERE RT.IdMovie = ?"

    db.mysqlcon.query(sql, [idMovie], function (err, rows, fields) {
        if (err) { console.log('erro '+err); return reject(err); } 
        resolve(rows[0].Rating);
    });   
  })
}

module.exports = {
  GetListMovies,
  GetMovieDetail,
  GetMoviesRatings,
  GetMoviesNewRatings,
  RatingMovie
}
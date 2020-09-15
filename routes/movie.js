const express = require('express')
const router = express.Router()
const ModelMovie = require('../models/movie')
const Auth = require('../models/authentication')

//Send the list of movies to the movie view
router.post('/listMovies/:movieTitle/:movieGenre', (req, res) => {  
  ModelMovie.GetListMovies(req.params.movieTitle, req.params.movieGenre)
  .then(function(listMovies) {  
    res.send(listMovies)    
  }).catch((err) => setImmediate(() => { throw err; }));   
})


//render to detail movie
router.get('/detailMovie/:movieId', (req, res) => {
  ModelMovie.GetMovieDetail(req.params.movieId).then(function(Movie) {    
    idMovie = Movie.data.movie.id
    titleMovie = Movie.data.movie.title
    imgMovie = Movie.data.movie.large_cover_image
    desMovie = Movie.data.movie.description_intro
    yearMovie = Movie.data.movie.year
    userId = typeof req.session.Id == 'undefined' ? '' : userId = req.session.Id
  
    res.render('moviedetails' , {idMovie : idMovie, imgMovie : imgMovie, desMovie : desMovie, yearMovie : yearMovie, userId : userId})   
  }).catch((err) => setImmediate(() => { throw err; }));    
})


//Register movie rating
router.post('/ratingMovie', (req, res) => {    

  ModelMovie.RatingMovie(req.session.Id, req.body.movie, req.body.rating).then(function(movieDetail) {  
    res.render('moviedetails')
  }).catch((err) => setImmediate(() => { throw err; }));  
   
})

//Register movie rating
router.post('/getRatingsMovie/:moviesList', (req, res) => {    
  resApi=req.params.moviesList
  resApi.data.movies.forEach(function (objMovie, index, array) {
    GetMoviesNewRatings(objMovie.id).then(rat => {          
      objMovie.newRating = rat 
      console.log(objMovie.newRating)
      resApi.data.movies[index] = objMovie
    })
  })  
})

module.exports = router

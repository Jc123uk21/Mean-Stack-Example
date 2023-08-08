const router = require('express').Router();
const { json } = require('body-parser');
const {createMovie, getAllMovies, 
    getAllGenreMoives, getAllMoivesByTitle} = require('../controllers/movie.controller');

// Create a new movie
router.post('/add', async(req, res) =>{
    await createMovie(req.body, res);
});

// Retrieve all movies
router.get('/all', async (req, res)=>{
    await getAllMovies(req,res);
});

//Retrieve list of movies with the same genre value
router.get('/all/:genre',async(req, genreType , res)=>{
    await getAllGenreMoives(req.params.genre, res);
});

//Retrieve a list of movies by title
router.get('/all/:title', async(req, movieTitle, res)=>{
    await getAllMoivesByTitle(req.params.title, res);
});

// Update a movie by Id
router.put('/movie/:id', async(req, movieId, res)=>{
    await updateMovieById(movieId, res);
});

//Update a movie by title
router.put('/movie/:title', ()=>{});

// Delete a movie by Id
router.delete('/movie/:id', ()=>{});

//Delete a movie by title
router.delete('/movie/:title', ()=>{});

module.exports = router;
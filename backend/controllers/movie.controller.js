const Movie = require('../models/movie');


//Save new movie to database
const createMovie = async(movieDets, res)=>{
    try{
        //check movie does not already exist in the database
        let movieExists = await checkMovieExists(movieDets.title);

        if(!movieExists){
            return res.status(400).json({
                message: 'Movie already exists',
                sucess: false
            });
        }

        //Create new movie object with request params
        const newMovie = new Movie({
            title: movieDets.title,
            ageRating: movieDets.ageRating,
            genre: movieDets.genre,
            description: movieDets.description,
            cast: movieDets.cast,
            price: movieDets.price,
            userRating: movieDets.userRating,
            imageUri: movieDets.imageUri    
        });

        //Save new movie to database
        await newMovie.save();

        //Return httpStatus and success result
        return res.status(201).json({
            message: 'movie created',
            sucess: true
        });
    }catch(err){
        return res.status(500).json({
            message: 'unable to create movie ' + err,
            sucess: false
        });
    }
}

//Get all Movie held within the database
const getAllMovies = async(req, res)=>{
    try{
        const data = await Movie.find();

        return res.json(data).status(200);

    }catch(err){
        return res.status(500).json({
            message: 'unable to find movies ' + err,
            sucess: false
        });
    }
}

//Get list of movies by genre
const getAllGenreMoives = async (genreType, res)=>{
    try{
    //Search the database for all movies of the genre type and store in a variable
    const data = await Movie.find({genre: genreType});
    //Return found data and http status code
    return res.json(data).status(200);

    }catch(err){
        return res.status(500).json({
            message: 'unable to find movies in that genre ' + err,
            sucess: false
        });
    }
}

//Get list of movies by title
const getAllMoivesByTitle = async (movieTitle, res)=>{
    try{
    //Search the database for all movies by its title and store them in a variable
    const data = await Movie.find({title: movieTitle});
    //Return found data and http status code
    return res.json({
        message: "movies found",
        sucess: true,
        data
    }).status(200);

    }catch(err){
        return res.status(500).json({
            message: 'unable to find movies with that title ' + err,
            sucess: false
        });
    }
}

//Update a movie by its id
const updateMovieById = async(req, movieId, res)=>{
    try{
        if(!checkMovieExistsById(movieId)){
            return res.status(500).json({
                message: 'unable to find movies with that id ' + err,
                sucess: false
            });
        }
    
        //store movie with id to a variable
        let moiveToUpdate = await Movie.findById(movieId);
        //set the movie attributes to those held within the request body
        moiveToUpdate = req.body;
        //Save updated movie to the database
        await moiveToUpdate.save();

        //return http status and success message
        return res.status(200).json({
            message: "movie updated",
            sucess: true,
            moiveToUpdate
        })
    }catch(err){
        return res.status(200).json({
            message: "movie updated " + err,
            sucess: true,
        })
    }
}

//Check movie exists by title function
const checkMovieExists = async title =>{
    let movieCheck = await Movie.findOne({title});
    return movieCheck ? false: true;
}

//Check movie exists by id function
const checkMovieExistsById = async id =>{
    let movieCheck = await Movie.findById(id);
    return movieCheck ? false: true;
}

module.exports = {
    createMovie, getAllMovies,
    getAllGenreMoives, getAllMoivesByTitle
};
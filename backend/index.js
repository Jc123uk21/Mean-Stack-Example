/* Bring in required packages*/

//Import cors
const cors = require("cors");

//Import express
const exp = require('express');

//Import body-parser
const parser = require('body-parser');

//Import passport
const passport = require('passport');

//Import mongoose connection
const {connect} = require('mongoose');

//Import consola
const {success, error} = require('consola');

//Create the app constant
const {DB, PORT} = require('./config');



/*Initialize application*/
const app = exp();

//middlewares
app.use(parser.json());
app.use(cors());
app.use(passport.initialize());

//import passport function 
require("./middleware/passport")(passport);

//User router middleware
app.use('/user', require('./routes/user.routes'));

//Movie router middleware
app.use('/movie', require('./routes/movie.routes'));

//Auth router middleware
app.use('/auth', require('./routes/auth.routes'));

const startApp = async () =>{
    try{
        //initialize database connection
        await connect(DB, {
                        useUnifiedTopology: true,
                        useNewUrlParser: true    
                    });

        success(
            {message:'successfully connected with the database \n' + DB, 
            badge: true}
        );
        //start server 
        app.listen(PORT, ()=> success({message: 'server satrted on PORT \n' + PORT, badge: true}));
    }catch(err){
        error(
            {message:'unable to connect with the database \n' + err,
             badge: true});
        startApp();
    }
};

startApp();
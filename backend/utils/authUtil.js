const  User  = require('../models/user')
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config/index');


//Register any type of user function
const registerUser = async(userDets, role, res) =>{
   try{
     //validate username
     let usernameTaken = await(validateUsername(userDets.username));
     if(!usernameTaken){
         return res.status(400).json({
             message: 'Username already exists',
             sucess: false
         })
     }
 
     //Hash password
     const password = await bcrypt.hash(userDets.password, 12);
 
     //Create new user
     const newUser = new User({
         ...userDets,
         password,
         role
     });
 
     //Save new user
     await newUser.save();

     return res.status(201).json({
         message: 'user created',
         sucess: true
     });

   }catch(err){
    return res.status(500).json({
        message: 'unable to create user',
        sucess: false
    });
   }
};


const userLogin = async (userCreds, role, res) =>{
    let {username, password} = userCreds;
    //validate username
    const user = await User.findOne({username});
    if(!user){
        return res.status(404).json({
            message: 'username not found!',
            sucess: false
        })
    }

    //Check user has correct role
    if(roleChecker(role) == false){
        return res.status(403).json({
            message: 'user has incorrect role, please use correct login portal',
            sucess: false
        })
    }
    //Validate user's password
    let correctPassword = await bcrypt.compare(password, user.password);

    if(correctPassword){
        //sign in user and generate user token
       let token = jwt.sign({
            user_id: user.id,
            role: user.role,
            username: user.username,
            email: user.email,
            isActive: user.isActive,
        }, SECRET_KEY, {expiresIn: "1 day"});

        let result = {
            username: user.username,
            role: user.role,
            email: user.email,
            token: 'Bearer ' + token,
            expiresIn: 24
        }

        // return reposne
        return res.status(200).json({
            ...result,
            message: 'user logged in',
            sucess: true
        });
    }else{
        return res.status(403).json({
            message: 'incorrect password!',
            sucess: false
        })
    }
}


const validateUsername = async username =>{
    let user = await User.findOne({username});
    return user ? false: true;
}

const validateEmail = async email =>{
    let user = await User.findOne({email});
    return user ? false: true;
}

//Passport authentication function
const userAuth = passport.authenticate('jwt', {session: false});

//Serialize user object function
const serializeUser = user =>{
   return { 
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt
   }
}

//function to check role authorization
const roleChecker = roles => (req, res, next) =>{
    if(roles.includes(req.user.role)){
        return next();
    }
    return res.status(401).json({
        message: "Unathorized",
        sucess: false
    });
}

module.exports = {
    userAuth,
    userLogin,
    registerUser,
    serializeUser, 
    roleChecker
};
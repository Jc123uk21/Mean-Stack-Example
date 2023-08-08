const User = require('../models/user');
const {SECRET_KEY} = require('../config');
const {Strategy, ExtractJwt } = require('passport-jwt');

const opt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY,
}


module.exports =(passport) =>{
    passport.use( new Strategy(opt, async (payload, done) =>{
        await User.findById(payload.user_id).then(user =>{
            if(user){
                return done(null, user);
            }
            return done(null, false);
        }).catch((err) =>{
            return done(null, false);
        })
    }));
};

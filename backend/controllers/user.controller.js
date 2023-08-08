var mongoose = require('mongoose');
const user = require('../models/user')
const auth = require('../utils/authUtil');


var sendJsonResponse = function(res, status, content) { 
    res.status(status); 
    res.json(content); 
};

//Get user by username
module.exports.findByUsername = function (req, res) {
    if(req.params && req.params.username){
        user.find().where('username').equals(req.params.username)
        .exec(function(err, user){
            if(!user){
                sendJsonResponse(res, 404, {
                    "message": "no user found!"
                });
                return;
            }
            else if(err){
                sendJsonResponse(res, 404, err);
                return;
            }

            sendJsonResponse(res, 200, user);
        });
    }
    else{
        sendJsonResponse(res, 404, {
            "message": "no username in request"
        });
    }   
};


//Get list of all users
module.exports.allUsers = function (req, res) { 
    user.find()
    .exec(function(err, result){
        if(err){
            sendJsonResponse(res, 404, err);
            return;
        }
        sendJsonResponse(res, 200, result);
    });
};

//Add new user to the database
const createUser = async (userDets, role, res)=>{
    await auth.registerUser(userDets, role, res);
}

//Update user held within the database by id value
module.exports.updateById = function (req, res) { 
    if(req.params && req.params.id){
        user.findById(req.params.id)
        .exec(function(err, user){
            if(!user){
                sendJsonResponse(res, 404,{
                    "message": "user not found!"
                });
                return;
            }
            user = req.body;
            user.save(function(err, user){
                if(err){
                    sendJsonResponse(res, 500, err);
                    return;
                }
                else{
                    sendJsonResponse(res, 200, user);
                }
            })
        })
    }
    else{
        sendJsonResponse(res, 500, {
            "message": "no id in request params"
        });
        return;
    }
};

//Update user held within the database by username value
module.exports.updateByUsername = function (req, res) { 
    if(req.params && req.params.id){
        user.find().where('username').equals(req.params.username)
        .exec(function(err, user){
            if(!user){
                sendJsonResponse(res, 404,{
                    "message": "user not found!"
                });
                return;
            }
            user= req.body;
            user.save(function(err, user){
                if(err){
                    sendJsonResponse(res, 500, err);
                    return;
                }
                else{
                    sendJsonResponse(res, 200, user);
                }
            })
        })
    }
    else{
        sendJsonResponse(res, 500, {
            "message": "no username in request params"
        });
        return;
    }
};

//Delete a user from the database by its id value
module.exports.deleteUser = function (req, res) { 
    if(req.params && req.params.id){
        user.findOneAndRemove().where('id').equals(req.params.id)
        .exec(function(err, user){
            if(err){
                sendJsonResponse(res, 404, err);
                return;
            }else{
                sendJsonResponse(res, 200, user);
            }
        });
    }else{
        sendJsonResponse(res, 404, {"message": "no id in request params!"});
        return;
    }

};

//Delete a user from the database by username value
module.exports.deleteUserByUsername = function (req, res) { 
    if(req.params && req.params.username){
        user.findOneAndRemove().where('username').equals(req.params.username)
        .exec(function(err, user){
            if(err){
                sendJsonResponse(res, 404, err);
                return;
            }else{
                sendJsonResponse(res, 200, user);
            }
        });
    }else{
        sendJsonResponse(res, 404, {"message": "no username in request params!"});
        return;
    }

};

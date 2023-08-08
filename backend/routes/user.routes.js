module.exports = (app) => {
    const user = require('../controllers/user.controller.js');
    const auth = require('../utils/authUtil.js');

    // Retrieve all users
    app.get('/user/all', user.allUsers);

    //Retrieve a single user by username
    app.get('/user/:username', user.findByUsername);

    // Update a user by Id
    app.put('/user/:id', user.updateById);

    //Update a user by title
    app.put('/user/:username', user.updateByUsername);

    // Delete a user by Id
    app.delete('/user/:id', user.deleteUser);

    //Delete a user by username
    app.delete('/user/:username', user.deleteUserByUsername);
}
const router = require('express').Router();
const { json } = require('body-parser');
const {
     userLogin,
     registerUser,
     userAuth, 
     serializeUser} = require('../utils/authUtil');


//user registration routes
router.post('/register-user', async (req, res) => {
    await registerUser(req.body, 'user', res);
});

//admin registration route
router.post('/register-admin', async (req, res) => {
    await registerUser(req.body, 'admin', res);
});

//super-admin registration route
router.post('/register-superAdmin', async (req, res) => {
    await registerUser(req.body, 'superadmin', res);
});

//user login route
router.post('/user-login', async (req, res) => {
    await userLogin(req.body, "user", res);
});

//admin login route
router.post('/admin-login', async (req, res) => {
    await userLogin(req.body, "admin", res);
});

//super admin login route
router.post('/superAdmin-login', async (req, res) => {
    await userLogin(req.body, "superadmin", res);
});

module.exports = router;
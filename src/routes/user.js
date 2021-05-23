const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../app/controllers/UserController');
const initPassportLocal = require('../app/controllers/auth/AuthenticationLoginController');

initPassportLocal();

router.get('/login', userController.login);
router.get('/register', userController.register);

//authentication user
router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/user/login',
    successRedirect: '/',
  }),
);

router.get('/test', userController.test);

router.get('/logout', userController.logout);

router.get('/profile', userController.profile);

router.post('/registerstore', userController.registerstore);

module.exports = router;

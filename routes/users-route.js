const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
require('../passport');

const passportSignin = passport.authenticate('local', { session: false });
const passportJwt = passport.authenticate('jwt', { session: false });

// Route Helpers
const { validateBody, schemas } = require('../helpers/route-helpers');

// Controller
const UsersController = require('../controllers/users-controller');

router.route('/signup')
    .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
    .post(validateBody(schemas.logInSchema), passportSignin,UsersController.signIn);

router.route('/secret')
    .get(passportJwt, UsersController.secret);

module.exports = router;
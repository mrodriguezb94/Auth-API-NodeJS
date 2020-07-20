const express = require('express');
const router = require('express-promise-router')();

// Route Helpers
const { validateBody, schemas } = require('../helpers/route-helpers');

// Controller
const UsersController = require('../controllers/users-controller');

router.route('/signup')
    .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
    .post(UsersController.signIn);

router.route('/secret')
    .post(UsersController.secret);

module.exports = router;
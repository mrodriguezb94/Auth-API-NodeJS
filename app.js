const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Database
mongoose.connect('mongodb://localhost/APIAuth');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes;
app.use('/users', require('./routes/users-route'));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Server listening at ${port}`);


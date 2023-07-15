const express = require('express');
const morgan = require('morgan');
const unknownError = require('./middleware/error/unknowError');
const validationError = require('./middleware/error/validationError');
require('express-async-errors');
const errorHandler = require('./middleware/errorHandler');
const router = require('./routes');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use('/v1', router);

app.use(validationError);
// other error handlers
app.use(unknownError);

app.use('', (req, res) => {
  res.send('healthy');
});
module.exports = app;
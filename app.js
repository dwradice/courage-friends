const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');

const globalErrorHandler = require('./controllers/errorController');
const petRouter = require('./routes/petRoutes');
const shelterRouter = require('./routes/shelterRoutes');
const viewRouter = require('./routes/viewRoutes.js');
const AppError = require('./utils/appError');

const app = express();

// Set PUG
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set Security HTTP Headers
app.use(helmet());

// Limit Requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests, try again later',
});
app.use('/api', limiter);

// Body parser, reading data from body
app.use(
  express.json({
    limit: '10kb',
  })
);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data Sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['species', 'breed', 'shelter', 'age', 'sex'],
  })
);

// Compression
app.use(compression());

// ROUTES
app.use('/', viewRouter);
app.use('/api/v1/pets', petRouter);
app.use('/api/v1/shelters', shelterRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

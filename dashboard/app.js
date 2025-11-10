// app.js - Main server
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// static
app.use('/public', express.static(path.join(__dirname, 'public')));

// simple middleware
app.use((req, res, next) => {
  res.locals.now = new Date();
  next();
});

// routes
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
app.use('/', indexRouter);
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`💫 Meheraz Dashboard running at http://localhost:${port}`);
});

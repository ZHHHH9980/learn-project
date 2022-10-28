const express = require('express');
const cors = require('cors');
const planetsRouter = require('./routes/planets/planets.route');

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(planetsRouter);

module.exports = app;
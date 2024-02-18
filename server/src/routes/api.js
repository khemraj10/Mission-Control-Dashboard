const express = require('express');
// const app = require("../app");
const launchesRouter = require("./launches/launches.router");
const planetsRouter = require("./planets/planets.router");
const e = require('express');

const api = express.Router();

api.use('/planets', planetsRouter);
api.use('/launches', launchesRouter);

module.exports = api;
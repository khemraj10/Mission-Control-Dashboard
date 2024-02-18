const http = require('http');
const app = require('./app');
// const mongoose = require('mongoose');
// const express = require('express');

// const dotenv = require('dotenv');
require('dotenv').config();

// const app = express();
// app.listen();

const { loadPlanetsData } =  require('./models/planets.model');
const { loadLaunchData } = require('./models/launches.model');

const { mongoConnect } = require('./services/mongo');

const PORT = process.env.PORT || 8000;


// const server = http.createServer(/*SOMETHING*/);
const server = http.createServer(app);


async function startServer() {
    // await mongoose.connect(Mongo_URL, {
    //     useNewUrlParser: true,
    //     useFindAndModify: false,
    //     useCreateIndex: true,
    //     useUnifiedTopology: true,
    // });
    // await mongoose.connect(Mongo_URL);
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();

    server.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT}`)
    });    
}

startServer();
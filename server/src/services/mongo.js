const mongoose = require('mongoose');

require('dotenv').config();

// Database
// const Mongo_URL = `mongodb+srv://nasa-api:jO8Mb3cwuk0GdsZu@cluster0.gutxbrg.mongodb.net/nasa?retryWrites=true&w=majority`
const Mongo_URL = process.env.Mongo_URL;

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function mongoConnect() {
    await mongoose.connect(Mongo_URL);   
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}
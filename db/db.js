const mongoose = require('mongoose');

//query to avoid depricated messages
mongoose.set('strictQuery', false);

const connectDB = (url) => {
    return mongoose.connect(url);
}

module.exports = connectDB;
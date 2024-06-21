// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://gopinadhcherukuri777:tensorInvioce@cluster0.gwyk8wu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error('Error connecting to MongoDB', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 30000;

app.use(cors());
app.use(express.json());

//Connect to mongoDB
const uri = 'mongodb+srv://Yilmaz:C5ee11ec@cluster0-jvbtm.gcp.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB databse connection established successfully");
});

//import router files
const exerciseRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

//use router files
app.use('/exercises', exerciseRouter);
app.use('/users', usersRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
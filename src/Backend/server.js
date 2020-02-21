const Joi = require('joi');
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 30000;

app.use(express.json());


app.get('/hello', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());

connectDB();

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the express notes app' });
})

app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/notes', require('./routes/note'));


app.listen(5000, () => 'Server is running on port 3000');
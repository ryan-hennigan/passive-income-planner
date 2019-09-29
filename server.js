const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('config');

const users = require('./routes/api/users');
const expReport = require('./routes/api/expReports');

const app = express();

//bodyParser middleware
app.use(bodyParser.json());

//Use Routes
app.use('/api/users', users);
app.use('/api/expreports',expReport);

if(process.env.NODE_ENV === 'production'){

    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || config.get("PORT");

app.listen(port, () => console.log(`Server started on port ${port}`));
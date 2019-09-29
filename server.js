const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');

require('dotenv').config();

const users = require('./routes/api/users');
const expReport = require('./routes/api/expReports');

const app = express();

//bodyParser middleware
app.use(bodyParser.json());
app.use(passport.initialize());

const db = process.env.DBHOST;

mongoose
    .connect(db, {useNewUrlParser:true, useUnifiedTopology: true })
    .then(()=> console.log("Connected to db..."))
    .catch(err => console.log(err));


//Use Routes
app.use('/api/users', users);
// app.use('/api/expreports',expReport);

if(process.env.NODE_ENV === 'production'){

    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT;

app.listen(port, () => console.log(`Server started on port ${port}`));
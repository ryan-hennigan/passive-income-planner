const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const path = require('path');

const app = express();

//bodyParser middleware
app.use(bodyParser.json());

//Use Routes
app.use('/api/users', users);

if(process.env.NODE_ENV === 'production'){

    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
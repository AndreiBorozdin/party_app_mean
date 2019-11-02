const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const partyRoutes = require('./routes/partyRoute');
const participantsRoutes = require('./routes/participantsRoute');
const app = express();

mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error));

app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')());


app.use('/api/partyWorld', authRoutes);
app.use('/api/partyWorld', partyRoutes);
app.use('/api/partyWorld', participantsRoutes);
module.exports = app;

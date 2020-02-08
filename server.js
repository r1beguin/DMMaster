const express = require('express');
const app = express();
var server = require('http').Server(app);
const connectDB = require('./db/db');

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('API running'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({limit: '50mb'}));

// Define Routes
app.use('/api/register', require('./api/register'));
app.use('/api/login', require('./api/login'));
app.use('/api/creature', require('./api/creature'));
app.use('/api/fight', require('./api/fight'));
app.use('/api/image', require('./api/image'))


const PORT = 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
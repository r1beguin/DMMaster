
const express = require('express');
const app = express();
var server = require('http').Server(app);
const connectDB = require('./db/db');
const socketio = require('socket.io');

// socket.io
io = socketio(server);
// now all request have access to io
app.use(function(req, res, next) {
  req.io = io;
  next();
});

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('API running'));

// Define Routes
app.use('/api/register', require('./api/register'));
app.use('/api/login', require('./api/login'));
app.use('/api/creature', require('./api/creature'));
app.use('/api/fight', require('./api/fight'));


const PORT = 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
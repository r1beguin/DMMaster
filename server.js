const express = require("express");
const app = express();
var server = require("http").Server(app);
const { connectDB } = require("./db/db");
const socketio = require("socket.io");
const bodyParser = require('body-parser')

// socket.io
io = socketio(server);
// now all request have access to io
app.use(function (req, res, next) {
  req.io = io;
  next();
});

// Connect Database
connectDB();

// Init Middleware
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.get('/', (req, res) => res.send('API running'));

// Define Routes
app.use("/api/register", require("./api/register"));
app.use("/api/login", require("./api/login"));
app.use("/api/creature", require("./api/creature"));
app.use("/api/fight", require("./api/fight"));
app.use("/api/image", require("./api/image"));
app.use("/api/notes", require("./api/notes"));
app.use("/api/settings", require("./api/settings"));

const PORT = 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const express = require('express');
const app = express();
var server = require('http').Server(app);

// Init Middleware
app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('API running'));

// Define Routes

const PORT = 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

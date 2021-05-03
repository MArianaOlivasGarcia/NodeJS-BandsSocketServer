

const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// App de Express
const app = express();




// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');





// Path publico
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));


// Cors
app.use(cors());



server.listen( process.env.PORT, '192.168.1.64' ,(err) => {
    
    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto ', server.address());

})
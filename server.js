const fs = require('fs');
const express = require("express");
const app = express();

const server = require("http").Server(app);

const datarouter = require('./dataroute')


app.use(express.static(__dirname + '/public'))







app.use('/api/senddata', datarouter)

server.listen(process.env.PORT || 3000)




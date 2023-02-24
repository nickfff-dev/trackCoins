const fs = require('fs');
const express = require("express");
const app = express();
const { getDebank } = require("./index")
const { getMintScan } = require('./index')
const { getThorChain } = require('./index')

const datarouter = require('./dataroute')


app.use(express.static(__dirname + '/public'))



const server = require("http").Server(app);

app.get('/', (req, res) => {
  
  res.writeHead(200, { 'content-type': 'text/html'});
  fs.readFile(__dirname + '/public/index.html', function (error, html) {
      res.end(html)
    })

 
})


app.use('/', datarouter)

server.listen(process.env.PORT || 3000)




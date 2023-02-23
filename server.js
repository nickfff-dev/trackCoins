
var fs = require('fs');
const express = require("express");
const app = express();
const { getDebank } = require("./index")
const { getMintScan } = require('./index')
const { getThorChain } = require('./index')


const debank = getDebank();
const mintScan = getMintScan();
const thorChain = getThorChain();





const server = require("http").Server(app);


app.get('/', (req, res) => {

  res.writeHead(200, { 'content-type': 'text/html'});
  Promise.all([thorChain,mintScan,debank]).then((values) => {
    console.log(values);
    var html = 
    `<!DOCTYPE html>
    <html lang="en">
     <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     </head>
    <body style="background-color:#111827; color:white;">
    <h1>node server </h1>
    <div style="display:flex; height: 70%;flex-direction:column; justify-content:between; margin:50px,auto;">
      ${values[0]}
      ${values[1]}
      ${values[2]}
      <div>
    </body>
    </html>`
    res.write(html);
    res.end()
   
   
  })
 
})

server.listen(process.env.PORT || 3000)




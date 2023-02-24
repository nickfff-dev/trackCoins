
var fs = require('fs');
const express = require("express");
const app = express();
const { getDebank } = require("./index")
const { getMintScan } = require('./index')
const { getThorChain } = require('./index')








const server = require("http").Server(app);

app.get('/', (req, res) => {
  
  res.writeHead(200, { 'content-type': 'text/html'});
  fs.readFile('./index.html', function (error, html) {
      res.end(html)
    })

 
})
const debank = getDebank();
const mintScan = getMintScan();
const thorChain = getThorChain();
app.use(cors())
app.use('/api/senddata', (req, res) => {


  Promise.all([thorChain, mintScan, debank]).then((values) => {
    console.log(values);
    // var html = 
    // `<!DOCTYPE html>
    // <html lang="en">
    //  <head>
    //  <meta charset="UTF-8">
    //  <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //  <meta http-equiv="X-UA-Compatible" content="ie=edge">
    //  </head>
    // <body style="background-color:#111827; color:white;">
    // <h1>node server </h1>
    // <div style="display:flex; height: 70%;flex-direction:column; justify-content:between; margin:50px,auto;">
    //   ${values[0]}
    //   ${values[1]}
    //   ${values[2]}
    //   <div>
    // </body>
    // </html>`
    res.send({data: values});

   
   
  })
 
})

server.listen(process.env.PORT || 3000)




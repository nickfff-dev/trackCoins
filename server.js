const fs = require('fs');
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
  
const thorChain = getThorChain();
const mintScan = getMintScan();


app.use('/api/senddata', (req, res) => {


  Promise.all([mintScan,thorChain, debank]).then((values) => {
    console.log(values);

    res.send({ data: values });
    res.end()

   
   
  })
 
})

server.listen(process.env.PORT || 3000)




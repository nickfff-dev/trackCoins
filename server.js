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


app.use('/api/senddata', (req, res) => {
  const debank = getDebank();
  
  const thorChain = getThorChain();
  const mintScan = getMintScan();

  Promise.all([thorChain, mintScan, debank]).then((values) => {
    console.log(values);

    res.send({ data: values });

   
   
  })
 
})

server.listen(process.env.PORT || 3000)




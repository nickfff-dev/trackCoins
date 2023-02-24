const fs = require('fs');
const express = require("express");
const app = express();
const { getDebank } = require("./index")
const { getMintScan } = require('./index')
const { getThorChain } = require('./index')




app.use(express.static(__dirname + '/public'))



const server = require("http").Server(app);

app.get('/', (req, res) => {
  
  res.writeHead(200, { 'content-type': 'text/html'});
  fs.readFile(__dirname + '/public/index.html', function (error, html) {
      res.end(html)
    })

 
})




app.use('/api/senddata', (req, res) => {

  let debank = getDebank();
  
  let thorChain = getThorChain();
  let mintScan = getMintScan()
  Promise.all([mintScan,thorChain, debank]).then((values) => {
    console.log(values);

    res.send({ data: values });
    res.end()

   
   
  })
 
})

server.listen(process.env.PORT || 3000)




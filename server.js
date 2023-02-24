const fs = require('fs');
const express = require("express");
const app = express();

const server = require("http").Server(app);
const { getDebank } = require("./index")
const { getMintScan } = require('./index')
const { getThorChain } = require('./index')



app.use(express.static(__dirname + '/public'))
const debank = new Promise((resolve, reject) => {
  getDebank()
    .then(data => {
      resolve(data)
    })
    .catch(err => reject('debank scrape failed'))
})

const mintScan = new Promise((resolve, reject) => {
  getMintScan()
    .then(data => {
      resolve(data)
    })
    .catch(err => reject('mintScan scrape failed'))
})

const thorChain = new Promise((resolve, reject) => {
  getThorChain()
    .then(data => {
      resolve(data)
    })
    .catch(err => reject('thorChain scrape failed'))
})

app.use('/api/senddata', (req, res) => {
  Promise.all([thorChain, mintScan, debank]).then((values) => {
    console.log(values);

    res.send({ data: values });
    res.end() 

   
   
  })
 
})





app.listen(process.env.PORT || 3000)




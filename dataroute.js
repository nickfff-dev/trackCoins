
const express = require('express')
const datarouter = express.Router();
var { getDebank } = require("./index")
var { getMintScan } = require('./index')
var { getThorChain } = require('./index')









datarouter.get('/api/senddata', (req, res) => {
  var debank = getDebank();
  var mintScan = getMintScan();
  var thorChain = getThorChain();
  Promise.all([thorChain, mintScan, debank]).then((values) => {
    console.log(values);

    res.send({ data: values });
  })
  
  
 
 
});


module.exports = datarouter


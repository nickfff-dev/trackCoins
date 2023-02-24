
const express = require('express')
const datarouter = express.Router();
var { getDebank } = require("./index")
var { getMintScan } = require('./index')
var { getThorChain } = require('./index')









datarouter.get('/api/senddata', (req, res) => {
  var thorChain = getThorChain();
  var debank = getDebank();
  var mintScan = getMintScan();
 
  Promise.all([thorChain, debank, mintScan, ]).then((values) => {
    console.log(values);

    res.send({ data: values });
  })
  
  
 
 
});


module.exports = datarouter


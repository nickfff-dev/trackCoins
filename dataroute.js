
const express = require('express')
const datarouter = express.Router();
var { getDebank } = require("./index")
var { getMintScan } = require('./index')
var { getThorChain } = require('./index')



  var debank =  getDebank() 
var mintscan = getMintScan()
  var thorscan =  getThorChain()





datarouter.get('/api/senddata', (req, res) => {
  
  var values = [mintscan,debank,thorscan ]
  
  
    res.send({ data: values });
 
 
});


module.exports = datarouter


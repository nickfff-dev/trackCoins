
const express = require('express')
const datarouter = express.Router();
const { getDebank } = require("./index")
const { getMintScan } = require('./index')
const { getThorChain } = require('./index')







datarouter.get('/api/senddata', async (req, res) => {
  var debank = await getDebank() 
  var mintscan = await getMintScan()
  var thorscan = await getThorChain()
  var values = [mintscan,debank,thorscan ]
  
  
    res.send({ data: values });
 
 
});


module.exports = datarouter


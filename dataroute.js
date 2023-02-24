
const express = require('express')
const datarouter = express.Router();
var { getDebank } = require("./index")
var { getMintScan } = require('./index')
var { getThorChain } = require('./index')









datarouter.get('/api/senddata', (req, res) => {
  const debank = getDebank();
  const mintScan = getMintScan();
  const thorChain = getThorChain();
 
  Promise.all([thorChain, debank, mintScan ]).then((values) => {
    console.log(values);

    res.send({ data: values });
  })
  
  
 
 
});


module.exports = datarouter



const express = require('express')
const datarouter = express.Router();
const { getDebank } = require("./index")
const { getMintScan } = require('./index')
const { getThorChain } = require('./index')


datarouter.get('/api/senddata', (req, res) => {

  
  Promise.all([, ]).then((values) => {
    console.log(values);

    res.send({ data: values });
    

   
   
  })
 
});


module.exports = datarouter


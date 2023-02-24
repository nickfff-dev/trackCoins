
const express = require('express')
const datarouter = express.Router();
const { getDebank } = require("./index")
const { getMintScan } = require('./index')
const { getThorChain } = require('./index')



datarouter.get('/api/getdebank', (req, res) => {
  const debank = getDebank()
      

  Promise.all([ debank ]).then((values) => {
    console.log(values);

    res.send({ data: values });
  })
 })

 datarouter.get('/api/getmintscan', (req, res) => {
  const mintscan = getMintScan()
     

  Promise.all([ mintscan ]).then((values) => {
    console.log(values);

    res.send({ data: values });
  })
 })

 datarouter.get('/api/getthorchain', (req, res) => {
  const thorchain =  getThorChain()
    

  Promise.all([ thorchain ]).then((values) => {
    console.log(values);

    res.send({ data: values });
  })
 })




module.exports = datarouter


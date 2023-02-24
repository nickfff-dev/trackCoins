
const express = require('express')
const datarouter = express.Router();
const { getDebank } = require("./index")
const { getMintScan } = require('./index')
const { getThorChain } = require('./index')



datarouter.get('/api/getdebank', (req, res) => {
  const debank = new Promise((resolve, reject) => {
    getDebank()
      .then(data => {
        resolve(data)
      })
      .catch(err => reject('debank scrape failed'))
  })

  Promise.all([ debank ]).then((values) => {
    console.log(values);

    res.send({ data: values });
  })
 })

 datarouter.get('/api/getmintscan', (req, res) => {
  const mintscan = new Promise((resolve, reject) => {
    getMintScan()
      .then(data => {
        resolve(data)
      })
      .catch(err => reject('mintscan scrape failed'))
  })

  Promise.all([ mintscan ]).then((values) => {
    console.log(values);

    res.send({ data: values });
  })
 })

 datarouter.get('/api/getthorchain', (req, res) => {
  const thorchain = new Promise((resolve, reject) => {
    getThorChain()
      .then(data => {
        resolve(data)
      })
      .catch(err => reject('thorchain scrape failed'))
  })

  Promise.all([ thorchain ]).then((values) => {
    console.log(values);

    res.send({ data: values });
  })
 })




module.exports = datarouter


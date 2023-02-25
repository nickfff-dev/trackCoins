
const express = require('express')
const datarouter = express.Router();
const puppeteer = require("puppeteer");




let browser;
datarouter.get('/api/getmintscan', (req, res) => {
(async () => {
  browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']});
  const page = await browser.newPage();
  
  const url = "https://www.mintscan.io/cosmos/account/cosmos1dy6ndu0wc5n29lfkw5gh6zpvlh2vf0u8ug8lae";

  await page.goto(url, { waitUntil: "networkidle0", timeout: 0 })
  console.log("waited")

  var addressMint = url.split('/')[5]

  var values = [];
  values.push(addressMint)
  page.waitForXPath("/html/body/div/main/section/div/div[3]/section[2]/div/div[2]/div", {
    visible:true,
    timeout:0
  }).then((data) => {
    page.$x("/html/body/div/main/section/div/div[3]/section[2]/div/div[2]/div/div/div/div[2]/div[1]").then((info) => {
     
      page.evaluate((el) => el.innerText, kitu[0]).then((resul) => {
        console.log(resul)
        values.push(resul)
      })
  
    })


    
    
   
   
  })
    res.send(values);
   
  

 
})()
  .catch(err => console.error(err))
 
      
 })







module.exports = datarouter


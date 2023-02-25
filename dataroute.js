
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

  const addressMint = url.split('/')[5]


 const handleme =await page.waitForXPath("/html/body/div/main/section/div/div[3]/section[2]/div/div[2]/div/div/div/div[2]/div[1]", {
    visible:true,
    timeout:0
  })
  const tokenBalance = await page.evaluate((el) => el.innerText, handleme)
  
  if (tokenBalance && tokenBalance.length) {
    var trybalance = await page.$x("/html/body/div/main/section/div/div[3]/section[1]/div[4]/div[2]/span[1]")
    var tokenMint = await page.evaluate((eltwo) => eltwo.innerText, trybalance[0])
   
    if (Number(tokenMint) > 1) {
      res.send([addressMint, tokenMint])
    } else {
      trybalance = await page.$x("/html/body/div/main/section/div/div[3]/section[1]/div[4]/div[2]/span[1]")
      tokenMint = await page.evaluate((eltwo) => eltwo.innerText, trybalance[0])
      res.send([addressMint, tokenMint])
     }
    
  }




   
  

 
})()
  .catch(err => console.error(err))
 
      
 })







module.exports = datarouter


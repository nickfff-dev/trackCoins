
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

  const values = [addressMint];

 const handleme =await page.waitForXPath("/html/body/div/main/section/div/div[3]/section[2]/div/div[2]/div/div/div/div[2]/div[1]", {
    visible:true,
    timeout:0
  })
  const tokenMint = await page.evaluate((el) => el.innerText, handleme)
  


  if (addressMint && tokenMint) {
  res.send([addressMint, tokenMint])
}

   
  

 
})()
  .catch(err => console.error(err))
 
      
 })







module.exports = datarouter


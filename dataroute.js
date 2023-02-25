
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
  var values = []
  page.waitForSelector("#__next > main > section > div > div.Account_container__pc9IN > section.Section_container__3OCWW.AccountTokens_container__1-HuH > div > div.TokenCards_container__3m0Jv > div > div > div").then( async() => {
    const addressMint = await page.$eval("#__next > main > section > div > div.Account_container__pc9IN > section.Section_container__3OCWW.AccountInfo_container__1RRgK > div.AccountInfo_address__2WY10.AccountInfo_cursor__1Nv86", el => el.innerText);
    values.push(addressMint)
    const tokenMint = await page.$eval("#__next > main > section > div > div.Account_container__pc9IN > section.Section_container__3OCWW.AccountInfo_container__1RRgK > div.AccountInfo_totalValueWrapper__2Da_d > div.AccountInfo_totalValue__E0ehd", (el) => el.innerText);
    values.push(tokenMint)
  })
   
    

  if (values.length > 1) {
    res.send({ data: values });
   }
  

 
})()
  .catch(err => console.error(err))
  .finally(() => browser?.close())
      
 })







module.exports = datarouter


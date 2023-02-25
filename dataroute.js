
const express = require('express')
const datarouter = express.Router();
const puppeteer = require("puppeteer");




let browser;
datarouter.get('/api/getmintscan', (req, res) => {
(async () => {
  browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']});
  const page = await browser.newPage();
  
  const url = "https://www.mintscan.io/cosmos/account/cosmos1dy6ndu0wc5n29lfkw5gh6zpvlh2vf0u8ug8lae";
  await page.goto(url, { waitUntil: "networkidle0", timeout:0})
  
  const lastReq = await page.waitForRequest((request) => { request.url() === "https://lcd-cosmos.cosmostation.io/cosmos/bank/v1beta1/balances/cosmos1dy6ndu0wc5n29lfkw5gh6zpvlh2vf0u8ug8lae?pagination.limit=1000" }, this.options = {
    timeout:0
  });
  if (lastReq.response() && lastReq.response()?.ok()) {
    console.log(lastReq)
    const addressMint = await page.$eval("#__next > main > section > div > div.Account_container__pc9IN > section.Section_container__3OCWW.AccountInfo_container__1RRgK > div.AccountInfo_address__2WY10.AccountInfo_cursor__1Nv86", el => el.innerText);
    const tokenMint = await page.$eval("#__next > main > section > div > div.Account_container__pc9IN > section.Section_container__3OCWW.AccountInfo_container__1RRgK > div.AccountInfo_totalValueWrapper__2Da_d > div.AccountInfo_totalValue__E0ehd > span:nth-child(1)",  (el) => el.innerText);
    const values = [{addressMint, tokenMint}]
    console.log(values)
    res.send({ data: values });
  }

 
})()
  .catch(err => console.error(err))
  .finally(() => browser?.close())
      
 })







module.exports = datarouter


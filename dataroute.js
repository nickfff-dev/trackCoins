
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
  var values = []
  var addressMint = url.split('/')[5]
  var tokenMint;
  page.waitForXPath("/html/body/div/main/section/div/div[3]/section[2]/div/div[2]/div", {
    visible:true,
    timeout:0
  }).then((data) => {
    page.$x("/html/body/div/main/section/div/div[3]/section[2]/div/div[2]/div").then((info) => {
      console.log(info)
    })

      values.push(addressMint)
    page.$eval("#__next > main > section > div > div.Account_container__pc9IN > section.Section_container__3OCWW.AccountInfo_container__1RRgK > div.AccountInfo_totalValueWrapper__2Da_d > div.AccountInfo_totalValue__E0ehd", (el) => el.innerText).then((item) => {
      console.log(item) 
      tokenMint = item
     })
    values.push(tokenMint)
    console.log({addressMint,tokenMint})
   
   
  })
  


   
    


    res.send({ data: values });
   
  

 
})()
  .catch(err => console.error(err))
 
      
 })







module.exports = datarouter


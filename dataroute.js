
const express = require('express')
const datarouter = express.Router();
const puppeteer = require("puppeteer");


function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
};

datarouter.get('/api/getmintscan', (req, res) => {
(async () => {
 var browser = await puppeteer.launch({headless: true, defaultViewport:false, args: ['--no-sandbox','--start-maximized']});
  const page = await browser.newPage();
  
  const url = "https://www.mintscan.io/cosmos/account/cosmos1dy6ndu0wc5n29lfkw5gh6zpvlh2vf0u8ug8lae";

  await page.goto(url, { waitUntil: "networkidle0", timeout: 0 })
  console.log("waited")

  const addressMint = url.split('/')[5]


 const handleme =await page.waitForXPath("/html/body/div/main/section/div/div[3]/section[2]/div/div[2]/div/div/div/div[2]/div[1]", {
    visible:true,
    timeout:0
  })
  const tokenBalance = await page.evaluate((el) => el.innerText, handleme);
  
  if (tokenBalance && tokenBalance.length) {
    
   
      res.send([addressMint, tokenBalance]);
   
    } 
    
  




   
  

 
})()
  .catch(err => console.error(err))
 
      
 })




 datarouter.get('/api/getpricemintscan', (req, res) => {
  (async () => {
   var browser = await puppeteer.launch({headless: true, defaultViewport:false, args: ['--no-sandbox','--start-maximized']});
    const page = await browser.newPage();
    
    const url = "https://www.coingecko.com/en/coins/cosmos-hub";
  
    await page.goto(url, { waitUntil: "networkidle0", timeout: 0 })
    console.log("waited2");
  

    const kuja = await page.$eval('body > div.container > div.tw-grid.tw-grid-cols-1.lg\:tw-grid-cols-3.tw-mb-4 > div.tw-col-span-3.md\:tw-col-span-2 > div > div.tw-col-span-2.md\:tw-col-span-2 > div.tw-grid-cols-3.tw-mb-1.md\:tw-flex > div > div.tw-text-4xl.tw-font-bold.tw-my-2.tw-flex.tw-items-center > span.tw-text-gray-900.dark\:tw-text-white.tw-text-3xl > span', (el) => el.innerText)
    console.log(kuja)


    if (kuja && kuja.length) {
      console.log(kuja)
     
        res.send( kuja);
     
      } 
      
    
  
  
  
  
     
    
  
   
  })()
    .catch(err => console.error(err))
   
        
   })


module.exports = datarouter



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
    
    const url = "https://www.bybit.com/en-US/coin-price/cosmos/";
  
    await page.goto(url, { waitUntil: "networkidle0", timeout: 0 })
    console.log("waited2");
  

  
  
   const handleme =await page.waitForXPath("/html/body/div[3]/div/main/div[2]/div[2]/div/div[1]/div[1]/div/div[2]/div[1]", {
      timeout:0
    })
    const tokenBalance = await page.evaluate((el) => el.innerText, handleme);
    console.log(tokenBalance)
    if (tokenBalance && tokenBalance.length) {
      console.log(tokenBalance)
     
        res.send( tokenBalance);
     
      } 
      
    
  
  
  
  
     
    
  
   
  })()
    .catch(err => console.error(err))
   
        
   })


module.exports = datarouter


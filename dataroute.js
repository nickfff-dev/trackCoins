
const express = require('express')
const datarouter = express.Router();
const puppeteer = require("puppeteer");




datarouter.get('/api/getmintscan', async (req, res) => {

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
    
  




   
  

 

 
      
 })




 datarouter.get('/api/getpricemintscan', async (req, res) => {

   var browser = await puppeteer.launch({headless: true, defaultViewport:false, args: ['--no-sandbox','--start-maximized']});
    const page = await browser.newPage();
    
    const url = "https://www.coingecko.com/en/coins/cosmos-hub";
  
    await page.goto(url, { waitUntil: "networkidle0", timeout: 0 })
    console.log("waited2");
  

    const kuja = await page.$x('/html/body/div[5]/div[5]/div[1]/div/div[1]/div[3]/div/div[1]/span[1]/span')
    const kujatxt = await page.evaluate((el)=>el.innerText, kuja[0])
    console.log(kuja)


    if (kujatxt && kujatxt.length) {
      console.log(kujatxt)
     
        res.send( kujatxt);
     
      } 
      
    
  
  
  
  
     
    
  
   
  
    
        
   })


module.exports = datarouter


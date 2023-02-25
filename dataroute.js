
const express = require('express')
const datarouter = express.Router();
const puppeteer = require("puppeteer");
const { getMintScan } = require('./index')
const { getThorChain } = require('./index')


let browser;
datarouter.get('/api/getdebank', (req, res) => {


 
(async () => {
  browser = await puppeteer.launch({headless: true, args: ['--no-sandbox'], defaultViewport: false});
  const [page] = await browser.pages();
  const ua = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36";
  await page.setExtraHTTPHeaders({"Accept-Language": "en-US,en;q=0.9" ,"cookie":"_gid=GA1.2.2086014272.1677258577; __cuid=d42818fbe4f5436fbe032118ae92a23c; amp_fef1e8=18b6c936-45d5-4ae5-abdc-19e978097d6cR...1gq2d92ge.1gq2d92gi.1.0.1; _ga=GA1.2.658206106.1677074030; _gat_gtag_UA_160311039_1=1; _ga_XCH1EEPRPW=GS1.1.1677332542.10.1.1677334276.0.0.0"});
  await page.setUserAgent(ua);
  const url = "https://debank.com/profile/0xf99d8717c3c2bb5a4959fab7f152eddee56580e2";
  await page.goto(url,  { waitUntil: "networkidle0",timeout:0});
  const debankaddress = await page.$eval('#root > div > div.DesktopFrame_mainContainer__2V8Re > div.container_mainSubContainer__39U6P > div.DesktopContainer_headerWrap__tOaax > div > div.HeaderInfo_headerInfoWrap__7ddLK > div.HeaderInfo_headerInfo__1niNw > div:nth-child(1) > div > div.HeaderInfo_userInfoContent__2qbyG > div.HeaderInfo_address__2W1kK > span', el => el.innerText)
  const phuture = await page.$eval('#root > div > div.DesktopFrame_mainContainer__2V8Re > div.container_mainSubContainer__39U6P > div.DesktopContainer_main__MG15v.container_pageCenterSubContainer__3encx > div > div.Portfolio_collect__j-mVa.card_suspend__2DfyT.card_card__i5VM9 > div.Portfolio_projectGrid__ZYks1 > div:nth-child(2) > div > div.ProjectCell_assetsItemName__dqjfm > div.ProjectCell_assetsItemWorth__o2_hJ', el => el.innerText)
  const debankwallet = await page.$eval('#root > div > div.DesktopFrame_mainContainer__2V8Re > div.container_mainSubContainer__39U6P > div.DesktopContainer_main__MG15v.container_pageCenterSubContainer__3encx > div > div.Portfolio_collect__j-mVa.card_suspend__2DfyT.card_card__i5VM9 > div.Portfolio_projectGrid__ZYks1 > div:nth-child(1) > div > div.ProjectCell_assetsItemName__dqjfm > div.ProjectCell_assetsItemWorth__o2_hJ', el => el.innerText)
  const gmX = await page.$eval('#root > div > div.DesktopFrame_mainContainer__2V8Re > div.container_mainSubContainer__39U6P > div.DesktopContainer_main__MG15v.container_pageCenterSubContainer__3encx > div > div.Portfolio_collect__j-mVa.card_suspend__2DfyT.card_card__i5VM9 > div.Portfolio_projectGrid__ZYks1 > div:nth-child(3) > div > div.ProjectCell_assetsItemName__dqjfm > div.ProjectCell_assetsItemWorth__o2_hJ', el => el.innerText)
  const camelot = await page.$eval('#root > div > div.DesktopFrame_mainContainer__2V8Re > div.container_mainSubContainer__39U6P > div.DesktopContainer_main__MG15v.container_pageCenterSubContainer__3encx > div > div.Portfolio_collect__j-mVa.card_suspend__2DfyT.card_card__i5VM9 > div.Portfolio_projectGrid__ZYks1 > div:nth-child(4) > div > div.ProjectCell_assetsItemName__dqjfm > div.ProjectCell_assetsItemWorth__o2_hJ', el => el.innerText)


  const values =[debankaddress,debankwallet,phuture,gmX,camelot]
  
  res.send({ data: values });
 
})()
  .catch(err => console.error(err))
  .finally(() => browser?.close())
      
 })

 datarouter.get('/api/getmintscan', (req, res) => {
  const mintscan = getMintScan()
     

  Promise.all([ mintscan ]).then((values) => {
    console.log(values);

    res.send({ data: values });
  })
 })

 datarouter.get('/api/getthorchain', (req, res) => {
  const thorchain =  getThorChain()
    

  Promise.all([ thorchain ]).then((values) => {
    console.log(values);

    res.send({ data: values });
  })
 })




module.exports = datarouter


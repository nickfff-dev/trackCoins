const puppeteer = require("puppeteer");


function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}


exports.getDebank = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
    defaultViewport:false
  });

  // Open a new page
  const page = await browser.newPage();


  await page.goto("https://debank.com/profile/0xf99d8717c3c2bb5a4959fab7f152eddee56580e2", 
    { waitUntil: "networkidle2",timeout:0}
  );


  const debankaddress = await page.$eval('#root > div > div.DesktopFrame_mainContainer__2V8Re > div.container_mainSubContainer__39U6P > div.DesktopContainer_headerWrap__tOaax > div > div.HeaderInfo_headerInfoWrap__7ddLK > div.HeaderInfo_headerInfo__1niNw > div:nth-child(1) > div > div.HeaderInfo_userInfoContent__2qbyG > div.HeaderInfo_address__2W1kK > span', el => el.innerText)
  const phuture = await page.$eval('#root > div > div.DesktopFrame_mainContainer__2V8Re > div.container_mainSubContainer__39U6P > div.DesktopContainer_main__MG15v.container_pageCenterSubContainer__3encx > div > div.Portfolio_collect__j-mVa.card_suspend__2DfyT.card_card__i5VM9 > div.Portfolio_projectGrid__ZYks1 > div:nth-child(2) > div > div.ProjectCell_assetsItemName__dqjfm > div.ProjectCell_assetsItemWorth__o2_hJ', el => el.innerText)
  const debankwallet = await page.$eval('#root > div > div.DesktopFrame_mainContainer__2V8Re > div.container_mainSubContainer__39U6P > div.DesktopContainer_main__MG15v.container_pageCenterSubContainer__3encx > div > div.Portfolio_collect__j-mVa.card_suspend__2DfyT.card_card__i5VM9 > div.Portfolio_projectGrid__ZYks1 > div:nth-child(1) > div > div.ProjectCell_assetsItemName__dqjfm > div.ProjectCell_assetsItemWorth__o2_hJ', el => el.innerText)
  const gmX = await page.$eval('#root > div > div.DesktopFrame_mainContainer__2V8Re > div.container_mainSubContainer__39U6P > div.DesktopContainer_main__MG15v.container_pageCenterSubContainer__3encx > div > div.Portfolio_collect__j-mVa.card_suspend__2DfyT.card_card__i5VM9 > div.Portfolio_projectGrid__ZYks1 > div:nth-child(3) > div > div.ProjectCell_assetsItemName__dqjfm > div.ProjectCell_assetsItemWorth__o2_hJ', el => el.innerText)
  const camelot = await page.$eval('#root > div > div.DesktopFrame_mainContainer__2V8Re > div.container_mainSubContainer__39U6P > div.DesktopContainer_main__MG15v.container_pageCenterSubContainer__3encx > div > div.Portfolio_collect__j-mVa.card_suspend__2DfyT.card_card__i5VM9 > div.Portfolio_projectGrid__ZYks1 > div:nth-child(4) > div > div.ProjectCell_assetsItemName__dqjfm > div.ProjectCell_assetsItemWorth__o2_hJ', el => el.innerText)


  
  browser.close()
  return {debankaddress,debankwallet,phuture,gmX,camelot}

}


  
  
exports.getThorChain = async () => {
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: true,
    args: [ '--no-sandbox'],
    defaultViewport: false
  });

  // Create a page
  const page = await browser.newPage();
  const url = "https://thorchain.net/address/thor1pjy3skfpynxwane8m3gp203ud46vwyc98qeq4q"

  // Go to your site
  await page.goto('https://thorchain.net/address/thor1pjy3skfpynxwane8m3gp203ud46vwyc98qeq4q', { waitUntil: "networkidle0", timeout: 0 });

  const addressThor = await page.$eval("#main-content > div > div > div.address-name > span", el => el.innerText)
  const weza = await page.$eval("#main-content > div > div > div.stat-wrapper.mb-1 > div.card-container.stat-table > div > div > div > div:nth-child(1) > div > div.col-value", el => el.innerText)
  const  balanceThor = weza?.split("(")[1].replace(")","")
  console.log("balance",  balanceThor)
  const tokenThor = weza?.split("(")[0]

  console.log(weza);
  browser.close()
  return {addressThor,balanceThor,tokenThor}

};




exports.getMintScan = async () => {
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
    defaultViewport: false
  });

  // Create a page
  const page = await browser.newPage();

  // Go to your site

  await page.goto('https://www.mintscan.io/cosmos/account/cosmos1dy6ndu0wc5n29lfkw5gh6zpvlh2vf0u8ug8lae', { waitUntil: "networkidle0", timeout: 0 });
  
  Promise.all([await delay(20000)]).then(() => {
   console.log("waited")
  })
  const addressMint = await page.$eval("#__next > main > section > div > div.Account_container__pc9IN > section.Section_container__3OCWW.AccountInfo_container__1RRgK > div.AccountInfo_address__2WY10.AccountInfo_cursor__1Nv86", el => el.innerText);
  const tokenMint = await page.$eval("#__next > main > section > div > div.Account_container__pc9IN > section.Section_container__3OCWW.AccountInfo_container__1RRgK > div.AccountInfo_totalValueWrapper__2Da_d > div.AccountInfo_totalValue__E0ehd > span:nth-child(1)", el => el.innerText);
  browser.close()
  console.log(tokenMint);
  return {addressMint,tokenMint}
};


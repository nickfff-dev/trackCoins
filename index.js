const puppeteer = require("puppeteer");



exports.getDebank = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
    defaultViewport:false
  });

  // Open a new page
  const page = await browser.newPage();


  await page.goto("https://debank.com/profile/0xf99d8717c3c2bb5a4959fab7f152eddee56580e2", 
    { waitUntil: "networkidle0",timeout:0}
  );


  const address = await page.$eval('#root > div > div.DesktopFrame_mainContainer__2V8Re > div.container_mainSubContainer__39U6P > div.DesktopContainer_headerWrap__tOaax > div > div.HeaderInfo_headerInfoWrap__7ddLK > div.HeaderInfo_headerInfo__1niNw > div:nth-child(1) > div > div.HeaderInfo_userInfoContent__2qbyG > div.HeaderInfo_address__2W1kK > span', el => el.innerText)
  const phuture = await page.$eval('#root > div > div.DesktopFrame_mainContainer__2V8Re > div.container_mainSubContainer__39U6P > div.DesktopContainer_main__MG15v.container_pageCenterSubContainer__3encx > div > div.Portfolio_collect__j-mVa.card_suspend__2DfyT.card_card__i5VM9 > div.Portfolio_projectGrid__ZYks1 > div:nth-child(2) > div > div.ProjectCell_assetsItemName__dqjfm > div.ProjectCell_assetsItemWorth__o2_hJ', el => el.innerText)
  const wallet = await page.$eval('#root > div > div.DesktopFrame_mainContainer__2V8Re > div.container_mainSubContainer__39U6P > div.DesktopContainer_main__MG15v.container_pageCenterSubContainer__3encx > div > div.Portfolio_collect__j-mVa.card_suspend__2DfyT.card_card__i5VM9 > div.Portfolio_projectGrid__ZYks1 > div:nth-child(1) > div > div.ProjectCell_assetsItemName__dqjfm > div.ProjectCell_assetsItemWorth__o2_hJ', el => el.innerText)
  const gmX = await page.$eval('#root > div > div.DesktopFrame_mainContainer__2V8Re > div.container_mainSubContainer__39U6P > div.DesktopContainer_main__MG15v.container_pageCenterSubContainer__3encx > div > div.Portfolio_collect__j-mVa.card_suspend__2DfyT.card_card__i5VM9 > div.Portfolio_projectGrid__ZYks1 > div:nth-child(3) > div > div.ProjectCell_assetsItemName__dqjfm > div.ProjectCell_assetsItemWorth__o2_hJ', el => el.innerText)
  const camelot = await page.$eval('#root > div > div.DesktopFrame_mainContainer__2V8Re > div.container_mainSubContainer__39U6P > div.DesktopContainer_main__MG15v.container_pageCenterSubContainer__3encx > div > div.Portfolio_collect__j-mVa.card_suspend__2DfyT.card_card__i5VM9 > div.Portfolio_projectGrid__ZYks1 > div:nth-child(4) > div > div.ProjectCell_assetsItemName__dqjfm > div.ProjectCell_assetsItemWorth__o2_hJ', el => el.innerText)

  const debanData =  `<div style="background:#111827; display:flex; flex-direction:column;justify-content:space-between; margin-bottom:50px">
  <h1>debank</h1>
  <div style="display:flex; flex-direction:row;">address:<span></span><span>${address}</span></div>
  <div style="display:flex; flex-direction:row;">Wallet:<span></span><span>${wallet}</span></div>
  <div style="display:flex; flex-direction:row;">Phuture:<span></span><span>${phuture}</span></div>
  <div style="display:flex; flex-direction:row;">GMX:<span></span><span>${gmX}</span></div>
  <div style="display:flex; flex-direction:row;">Camelot:<span></span><span>${camelot}</span></div>
  </div>`
  console.log(debanData);
  
  browser.close();

  return debanData

};


  
  
exports.getThorChain = async () => {
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--start-maximized'],
    defaultViewport: false
  });

  // Create a page
  const page = await browser.newPage();
  const url = "https://thorchain.net/address/thor1pjy3skfpynxwane8m3gp203ud46vwyc98qeq4q"

  // Go to your site
  await page.goto('https://thorchain.net/address/thor1pjy3skfpynxwane8m3gp203ud46vwyc98qeq4q', { waitUntil: "networkidle0", timeout: 0 });

  const addressThor = await page.$eval("#main-content > div > div > div.address-name > span", el => el.innerText)
  const weza = await page.$eval("#main-content > div > div > div.stat-wrapper.mb-1 > div.card-container.stat-table > div > div > div > div:nth-child(1) > div > div.col-value", el => el.innerText)
  const balance = weza?.split("(")[1].replace(")","")
  console.log("balance", balance)
  const tokenBalance = weza?.split("(")[0]
  
  const thorHtml = `<div  display:flex; flex-direction:column;justify-content:space-between;margin-bottom:50px">
  <h1>thorchain</h1>
  <div style="display:flex; flex-direction:row;">address:<span></span><span>${addressThor}</span></div>
  <div style="display:flex; flex-direction:row;">balance:<span></span><span>${balance}</span></div>
  <div style="display:flex; flex-direction:row;">tokens:<span></span><span>${tokenBalance}</span></div>
  
  </div>`
  console.log(weza);
  browser.close();
  return thorHtml

};




exports.getMintScan = async () => {
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--start-maximized'],
    defaultViewport: false
  });

  // Create a page
  const page = await browser.newPage();
 const url ="https://www.mintscan.io/cosmos/account/cosmos1dy6ndu0wc5n29lfkw5gh6zpvlh2vf0u8ug8lae"
  // Go to your site
  await page.goto('https://www.mintscan.io/cosmos/account/cosmos1dy6ndu0wc5n29lfkw5gh6zpvlh2vf0u8ug8lae', { waitUntil: "networkidle0", timeout: 0 });
  const addressMint = url.split("/")[5]

  const tokenvalue = await page.$eval("#__next > main > section > div > div.Account_container__pc9IN > section.Section_container__3OCWW.AccountInfo_container__1RRgK > div.AccountInfo_totalValueWrapper__2Da_d > div.AccountInfo_totalValue__E0ehd > span:nth-child(1)", el => el.innerText)
  const mintHtml =`<div style="background:#111827; display:flex; flex-direction:column;justify-content:space-between;margin-bottom:50px">
  <h1>Mintscan</h1>
  <div style="display:flex; flex-direction:row;">address:<span></span><span>${addressMint}</span></div>
  <div style="display:flex; flex-direction:row;">balance:<span></span><span>${tokenvalue}</span></div>
 
  
  </div>`
  console.log(tokenvalue)
  browser.close()
  return mintHtml
};


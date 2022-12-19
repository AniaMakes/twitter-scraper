const puppeteer = require("puppeteer");
const fs = require('fs');

const urlToSave = [

]

const visitAndScreenshot = async (page, urlList) => {
	// dismiss notification pop-up
	await page.goto('YOUR TWITTER PROFILE URL');
	await page.waitForTimeout(10000);
	await page.keyboard.press("Tab");
	await page.keyboard.press("Tab");
	await page.keyboard.press("Enter");

	for (i = 0; i < urlList.length; i++) {
		const theName = urlList[i][0]
		const theUrl = urlList[i][1];

		try {
			await page.goto(theUrl, {
				waitUntil: 'networkidle0', timeout: 0
			});

			const bodyHeight = 1080
    		await page.setViewport({ width: 800, height: bodyHeight });
			await page.setDefaultTimeout(5000)

			// See if there's a description and if yes, add it to the enhanced list
			const descriptionSelector = '[data-testid="UserDescription"]'
			await page.waitForSelector(descriptionSelector);
			let elementDescription = await page.$(descriptionSelector);
			let textDescription = await page.evaluate(el => el.textContent, elementDescription)

			if(textDescription){
				urlList[i].push(textDescription)
			}

			// See if there's a url and if yes, add it to the enhanced list
			const urlSelector = '[data-testid="UserUrl"]'
			await page.waitForSelector(urlSelector);
			let elementUrl = await page.$(urlSelector);
			let textUrl = await page.evaluate(el => el.textContent, elementUrl)

			if(textUrl){
				urlList[i].push(textUrl)
			}

			// Save a screenshot for a good measure
			// await page.screenshot({ path: `./${theName}.jpg` })
		}
		catch (error) {
			console.log(error)
		}
	}
}

const fetchScreenshots = async (urlList) => {
	try {
		const browser = await puppeteer.launch({product:'chrome', headless: false});
		const page = await browser.newPage();
		await page.setViewport({ width: 1920, height: 1080 });
		await visitAndScreenshot(page, urlList);
		await browser.close();
		fs.writeFile('enhancedList.json', JSON.stringify(urlList), (err) => {
			if (err) throw err;
			console.log('Saved the enhanced list file')
		}
		)
	}
	catch (error) {
		console.log(error);
	}
}

fetchScreenshots(urlToSave);

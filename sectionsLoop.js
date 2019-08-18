const {Builder, By, Key, until} = require('selenium-webdriver');

(async function sections () {
	try{
		let driver = new Builder().forBrowser('chrome').build();
		driver.manage().setTimeouts( {implicit: 2000} );
		driver.get('http://localhost/litecart/admin/login.php');
		let loginField = await driver.findElement(By.name('username'));
		await loginField.sendKeys('admin');
		let passwordField = await driver.findElement(By.name('password'));
		await passwordField.sendKeys('admin');
		let submitButton = await driver.findElement(By.xpath('//button[@type="submit"]'));		
		await submitButton.click();
		let sections = await driver.findElements(By.xpath('//li[@id="app-"]')); //локатор категорий
		async function clickingSections () {
			for (var i = 0; i <= sections.length-1; i++) {
				let sections = await driver.findElements(By.xpath('//li[@id="app-"]')); 
				await sections[i].click();
				try {				
					let subsections = await driver.executeScript('return document.querySelectorAll("li#app- li")'); //локатор подкатегорий
					for (var j = 0; j <= subsections.length-1; j++) {
						let subsections = await driver.findElements(By.xpath('//li[@id="app-"]//li'));
						await subsections[j].click();
						await driver.wait(until.elementLocated(By.xpath('//h1')), 2000); //проверка заголовка h1 для подкатегории
					};
				} catch (err) {};
				await driver.wait(until.elementLocated(By.xpath('//h1')), 2000); //проверка заголовка h1 для категории
			};
		};
		clickingSections();
	} catch (err) {};
})();
/* 2) на странице http://localhost/litecart/admin/?app=geo_zones&doc=geo_zones
зайти в каждую из стран и проверить что зоны расположены в алфавитном порядке */
const {Builder, By, Key, until} = require('selenium-webdriver');

(async function () {
	let driver = new Builder().forBrowser('chrome').build();
	driver.manage().setTimeouts( {implicit: 3000} );
	await  driver.get('http://localhost/litecart/admin/?app=geo_zones&doc=geo_zones');
	let loginField = await driver.findElement(By.name('username'));
	await loginField.sendKeys('admin');
	let passwordField = await driver.findElement(By.name('password'));
	await passwordField.sendKeys('admin');
	let submitButton = await driver.findElement(By.xpath('//button[@type="submit"]'));
	await submitButton.click();
	let countries = await driver.findElements(By.xpath('//tr[@class="row"]/td/a[text()]'));	//локатор ссылок на страны
	
	(async function chekingZones() {
		for (let i = 0; i <= countries.length-1; i++) {
			let countries = await driver.findElements(By.xpath('//tr[@class="row"]/td/a[text()]'));	//повторное объявление списка стран, чтобы избежать stale element reference
			await countries[i].click();
			let zones = await driver.findElements(By.xpath('//tbody/tr/td[3]/select/option[@selected="selected"]')); //локатор выбранных значений зон
			for (let j = 0; j <= zones.length-1; j++) {
				var listZones = await zones[j].getAttribute("textContent");
				var listZonesArr = await listZones.split('\n'); //текущий список зон
				var sortedListZonesArr = await listZonesArr.sort(); //сортированный список зон
			}
			//сравнение сортированного списка зон с несортированным. Если массивы равны - зоны расположены в алфавитном порядке
			if (listZonesArr != sortedListZonesArr) {
				console.log('Зоны не в алфавитном порядке');
			} else {
				console.log('Зоны в алфавитном порядке');
			}
			await driver.get('http://localhost/litecart/admin/?app=geo_zones&doc=geo_zones');
		};
	})();
})();

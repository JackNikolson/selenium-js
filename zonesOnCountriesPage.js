/*
б) для тех стран, у которых количество зон отлично от нуля -- открыть страницу этой страны и там проверить, 
что зоны расположены в алфавитном порядке
*/
const {Builder, By, Key, until} = require('selenium-webdriver');

(async function () {
	let driver = new Builder().forBrowser('chrome').build();
	driver.manage().setTimeouts( {implicit: 3000} );
	await driver.get('http://localhost/litecart/admin/?app=countries&doc=countries');
	let loginField = await driver.findElement(By.name('username'));
	await loginField.sendKeys('admin');
	let passwordField = await driver.findElement(By.name('password'));
	await passwordField.sendKeys('admin');
	let submitButton = await driver.findElement(By.xpath('//button[@type="submit"]'));
	await submitButton.click();
	let listZones = await driver.findElements(By.xpath('//tr[@class="row"]/td[text()][3]')); //локатор количества зон на экране списка стран
	let geozones = await driver.findElements(By.xpath('//table[2]/tbody/tr/td[3]')); //локатор названий зон на экране страны

	//функция для проверки списка зон на алфавитный порядок
	async function checkingAlphabet() {
		for (let k = 0; k < geozones.length-1; k++) {
			var listZones = await geozones[k].getAttribute("textContent");
			var listZonesArr = await listZones.split('\n');
			var sortedListZonesArr = await listZonesArr.sort(); 
		};
		if (listZonesArr != sortedListZonesArr) {
			console.log('Зоны не в алфавитном порядке');
		}
		else {
			console.log('Зоны в алфавитном порядке');
		}
	};

	//функция для проверки списка стран на количество зон
	async function zones() {
		let numberOfZones = []; //массив со значениями количества зон
		for (let j = 0; j <= listZones.length-1; j++) {
			var list = await listZones[j].getAttribute("textContent");
			var listArr = await list.split('\n');
			await numberOfZones.push(listArr); 
		};
		//переход на экран страны с несколькими зонами
		for (let i = 0; i < numberOfZones.length-1; i++) {
			if (numberOfZones[i] != 0) {
				let link = await driver.findElements(By.xpath('//td/a[text()]'));
				await link[i].click();
				checkingAlphabet(); 
				await driver.get('http://localhost/litecart/admin/?app=countries&doc=countries');
			}; 
		};
	};
	zones();
})();

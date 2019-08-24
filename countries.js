/* 
Сделайте сценарии, которые проверяют сортировку стран и геозон (штатов) в учебном приложении litecart.
1) на странице http://localhost/litecart/admin/?app=countries&doc=countries
а) проверить, что страны расположены в алфавитном порядке
*/

const {Builder, By, Key, until} = require('selenium-webdriver');

(async function () {
	let driver = new Builder().forBrowser('chrome').build();
	driver.manage().setTimeouts( {implicit: 3000} );
	await  driver.get('http://localhost/litecart/admin/?app=countries&doc=countries');
	let loginField = await driver.findElement(By.name('username'));
	await loginField.sendKeys('admin');
	let passwordField = await driver.findElement(By.name('password'));
	await passwordField.sendKeys('admin');
	let submitButton = await driver.findElement(By.xpath('//button[@type="submit"]'));
	await submitButton.click();
	let listCountries = await driver.findElements(By.xpath('//td/a[text()]'));
	
	(async function countries() {
		for (let i = 0; i <= listCountries.length-1; i++) {
			var list = await listCountries[i].getAttribute("textContent");
			var listArr = await list.split('\n'); // конвертация списка стран в массив
			var	sortedListArr = listArr.sort(); // создание сортированного списка стран
		}
		//сравнение сортированного и не сортированного списка стран
		if (listArr != sortedListArr) {
			console.log("Страны не в алфавитном порядке");
		} else {
			console.log("Страны в алфавитном порядке");
		};
	})();
})();





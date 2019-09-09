//Сделайте сценарий, который проверяет, не появляются ли в логе браузера сообщения 
//при открытии страниц в учебном приложении, а именно -- страниц товаров в каталоге в административной панели.

const {Builder, By, Key, until} = require('selenium-webdriver');

(async function() {
	let driver = new Builder().forBrowser('chrome').build();
	driver.manage().setTimeouts( {implicit: 3000} );
	await driver.get('http://localhost/litecart/admin/?app=catalog&doc=catalog&category_id=1');
	await driver.findElement(By.name('username')).sendKeys('admin');
	await driver.findElement(By.name('password')).sendKeys('admin' + Key.ENTER);

	async function checkingLogs() {
		let products = await driver.findElements(By.xpath('//tbody//tr[@class="row"]//a[text()]'));
		for (let i = 0; i <= products.length-1; i++) {
			let products = await driver.findElements(By.xpath('//tbody//tr[@class="row"]//a[text()]'));
			await products[i].click();
			await driver.sleep(1000);
			await driver.get('http://localhost/litecart/admin/?app=catalog&doc=catalog&category_id=1');
			await driver.manage().logs().get("browser").then(function(logsEntries) { //вывод логов консоли браузера
	    	logsEntries.forEach(function(l) {
	        console.log(l);
	    	});
			});
		}
		await driver.quit();
	}
	await checkingLogs();
})();
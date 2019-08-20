/* Сделайте сценарий, проверяющий наличие стикеров у всех товаров в учебном приложении litecart на главной странице. 
Стикеры -- это полоски в левом верхнем углу изображения товара, на которых написано New или Sale или что-нибудь другое. 
Сценарий должен проверять, что у каждого товара имеется ровно один стикер. */
const {Builder, By, Key, until} = require('selenium-webdriver');

(async () => {
	let driver = new Builder().forBrowser('chrome').build();
	driver.manage().setTimeouts( {implicit: 3000} );
	await driver.get('http://localhost/litecart/en/');
	let blocks = await driver.findElements(By.css('li.product')); //локатор товаров
	await blocks.forEach(async function () {
		await driver.wait(until.elementLocated(By.css('li.product div.sticker')), 2000); //проверка наличия у товаров стикеров
	});
})(); 

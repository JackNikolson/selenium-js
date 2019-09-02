//Сделайте сценарий для добавления нового товара (продукта) в учебном приложении litecart (в админке).
const {Builder, By, Key, until} = require('selenium-webdriver');
const path = require('path');

(async function() {
	let driver = new Builder().forBrowser('chrome').build();
	driver.manage().setTimeouts( {implicit: 3000} );
	await driver.get('http://localhost/litecart/admin/');
	await driver.findElement(By.name('username')).sendKeys('admin');
	await driver.findElement(By.name('password')).sendKeys('admin' + Key.ENTER);
	await driver.findElement(By.xpath('//ul[@id="box-apps-menu"]//li[2]')).click();
	await driver.findElement(By.xpath('//div[@style="float: right;"]//a[2]')).click();
	let imagePath = path.join(__dirname, 'falcon.jpg'); //путь до изображения товара
	let rand = Math.floor(Math.random() * Math.floor(999999)); //рандомный код товара
	console.log(imagePath);
	
	async function general() {
		await driver.findElement(By.xpath('//input[@name="name[en]"]')).sendKeys('Millenium Falcon'); //name
		await driver.findElement(By.xpath('//input[@name="code"]')).sendKeys(rand); //code
		await driver.findElement(By.xpath('//div[@id="tab-general"]//table//tbody//tr[7]//input')).click(); //gender
		await driver.findElement(By.xpath('//input[@name="quantity"]')).sendKeys(3); //quantity
		await driver.findElement(By.xpath('//input[@name="date_valid_from"]')).sendKeys('12082019'); //date valid from
		await driver.findElement(By.xpath('//input[@name="date_valid_to"]')).sendKeys('12122020'); //date valid to
		await driver.findElement(By.xpath('//input[@name="new_images[]"]')).sendKeys(imagePath);
	}
	await general();
	
	async function information() {
		await driver.findElement(By.xpath('//div[@class="tabs"]//li[2]//a')).click(); //переход в таб 'information'
		await driver.sleep(1000);
		await driver.findElement(By.xpath('//select[@name="manufacturer_id"]//option[@value="1"]')).click(); //manufacturer id
		await driver.findElement(By.xpath('//input[@name="keywords"]')).sendKeys('falcon'); //keywords
		await driver.findElement(By.xpath('//input[@name="short_description[en]"]')).sendKeys('test test'); //shrot description
		await driver.findElement(By.xpath('//input[@name="head_title[en]"]')).sendKeys('Falcon millenium'); //head title
		await driver.findElement(By.xpath('//input[@name="meta_description[en]"]')).sendKeys('test'); // meta description 
	}
	await information();

	async function prices() {
		await driver.findElement(By.xpath('//div[@class="tabs"]//li[4]//a')).click(); //переход в таб 'prices'
		await driver.sleep(1000); 
		await driver.findElement(By.xpath('//input[@name="purchase_price"]')).clear(); //purchase price
		await driver.findElement(By.xpath('//input[@name="purchase_price"]')).sendKeys('200');
		await driver.findElement(By.xpath('//select[@name="purchase_price_currency_code"]//option[@value="USD"]')).click(); //currency code
    await driver.findElement(By.xpath('//button[@name="save"]')).click(); 
    await driver.wait(until.elementLocated(By.xpath('//div[@class="notice success"]')), 2000); //сообщение о успешном создании элемента
	}
	await prices();
})()

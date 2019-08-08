let webdriver = require('selenium-webdriver');

let driver = new webdriver.Builder().forBrowser('chrome').build();
	
driver.get('http://localhost/litecart/admin/login.php');
	let loginField = driver.findElement(webdriver.By.name('username'));
			loginField.sendKeys('admin');
	let passwordField = driver.findElement(webdriver.By.name('password'));
			passwordField.sendKeys('admin');
	let submitButton = driver.findElement(webdriver.By.xpath('//button[@type="submit"]'));		
			submitButton.click();

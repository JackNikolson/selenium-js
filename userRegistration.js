/*
Сделайте сценарий для регистрации нового пользователя в учебном приложении litecart (не в админке, а в клиентской части магазина).

Сценарий должен состоять из следующих частей:

1) регистрация новой учётной записи с достаточно уникальным адресом электронной почты (чтобы не конфликтовало с ранее созданными пользователями, в том числе при предыдущих запусках того же самого сценария),
2) выход (logout), потому что после успешной регистрации автоматически происходит вход,
3) повторный вход в только что созданную учётную запись,
4) и ещё раз выход.

В качестве страны выбирайте United States, штат произвольный. При этом формат индекса -- пять цифр.
*/

const {Builder, By, Key, until} = require('selenium-webdriver');

(async function() {
	let driver = new Builder().forBrowser('chrome').build();
	driver.manage().setTimeouts( {implicit: 3000} );
	await driver.get('http://localhost/litecart/public_html/en/');
	let registrationButton = await driver.findElement(By.xpath('//tbody//tr//td//a[1]'));
	let rand = Math.floor(Math.random() * Math.floor(999999)); //для создания уникального адреса email
	registrationButton.click();
	
	async function createUser() {
		await driver.sleep(1000);
		await driver.findElement(By.xpath('//input[@name="firstname"]')).sendKeys('Albert'); //fistName
		await driver.findElement(By.xpath('//input[@name="lastname"]')).sendKeys('Wesker'); //lastname
		await driver.findElement(By.xpath('//input[@name="address1"]')).sendKeys('Wall Street, 1'); //address1
		await driver.findElement(By.xpath('//input[@name="postcode"]')).sendKeys('12345'); //postcode
		await driver.findElement(By.xpath('//input[@name="city"]')).sendKeys('New York'); //city
		await driver.findElement(By.xpath('//input[@name="email"]')).sendKeys('test'+ rand + '@mail.com'); //email
		await driver.findElement(By.xpath('//input[@name="phone"]')).sendKeys('+10001112233'); //phone
		await driver.findElement(By.xpath('//input[@name="password"]')).sendKeys('test'); //desiredPass
		await driver.findElement(By.xpath('//input[@name="confirmed_password"]')).sendKeys('test'); // confirmPass
		await driver.findElement(By.xpath('//span[@class="select2-selection__rendered"]')).click(); //country
		await driver.findElement(By.xpath('//input[@class="select2-search__field"]')).sendKeys('United States' + Key.ENTER); //локатор поля ввода страны
		await driver.findElement(By.xpath('//button[@name="create_account"]')).click(); //submit button
		await driver.findElement(By.xpath('//input[@name="password"]')).sendKeys('test');
		await driver.findElement(By.xpath('//input[@name="confirmed_password"]')).sendKeys('test');
		await driver.findElement(By.xpath('//button[@name="create_account"]')).click();
		await driver.wait(until.elementLocated(By.xpath('//div[@class="notice success"]')), 1000); //сообщение о успешнос создании юзера
	}
	await createUser();

	async function logout() {
		await driver.findElement(By.xpath('//div[@id="box-account"]//div//li[4]//a')).click(); //выход из аккаунта
	}
	await logout();

	async function login() {
		await driver.findElement(By.xpath('//input[@name="email"]')).sendKeys('test' + rand + '@mail.com');
		await driver.findElement(By.xpath('//input[@name="password"]')).sendKeys('test');
		await driver.findElement(By.xpath('//button[@name="login"]')).click();
	}
	await login();
	await logout();

})()
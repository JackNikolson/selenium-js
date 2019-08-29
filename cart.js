*/
Сделайте сценарий для добавления товаров в корзину и удаления товаров из корзины.
1) открыть главную страницу
2) открыть первый товар из списка
2) добавить его в корзину (при этом может случайно добавиться товар, который там уже есть, ничего страшного)
3) подождать, пока счётчик товаров в корзине обновится
4) вернуться на главную страницу, повторить предыдущие шаги ещё два раза, чтобы в общей сложности в корзине было 3 единицы товара
5) открыть корзину (в правом верхнем углу кликнуть по ссылке Checkout)
6) удалить все товары из корзины один за другим, после каждого удаления подождать, пока внизу обновится таблица
*/

const {Builder, By, Key, until} = require('selenium-webdriver');

(async function () {
	let driver = new Builder().forBrowser('chrome').build();
	driver.manage().setTimeouts( {implicit: 3000} );
	await driver.get('https://litecart.stqa.ru/en/');

	async function addProduct() {
		for (let i = 1; i <= 3; i++) {
			let firstProduct = await driver.findElement(By.xpath('//div[@id="box-most-popular"]//a[text()]')); //локатор первого товара в категории "популярное"
			await firstProduct.click();
			let addToCart = await driver.findElement(By.xpath('//button[@name="add_cart_product"]'));
			await addToCart.click();
			await driver.sleep(1000);
			try {
				await driver.wait(until.elementLocated(By.xpath('//div[@id="cart"]//span[contains(text(), "'+ i +'")]')), 2000); //ожидаение обновления счетчика корзины
			} catch (err) {
				//условие, если у товара требуется выбрать размер
				let sizeSelector = await driver.wait(until.elementLocated(By.xpath('//select["name=options[Size]"]')), 2000).then(async function (sizeSelector) {
					await sizeSelector.click();
					await driver.findElement(By.xpath('//select[@name="options[Size]"]//option[2]')).click();
					await addToCart.click();
					await driver.wait(until.elementLocated(By.xpath('//div[@id="cart"]//span[contains(text(), "'+ i +'")]')), 2000);
				});	
			}
			await driver.get('https://litecart.stqa.ru/en/');		
		}
		deleteProduct();
	};
	addProduct();

	async function deleteProduct() {
		let cart = await driver.findElement(By.xpath('//div[@id="cart-wrapper"]//a[contains(text(), "Checkout")]'));
		await cart.click();
		for (let j = 1; j <= 3; j++) {
			let totalPrice = await driver.findElement(By.xpath('//table[@class="dataTable rounded-corners"]//tr[4]')); //локатор для проверки обновления таблицы
			let removeButton = await driver.findElement(By.xpath('//button[@name="remove_cart_item"]'));
			try {
				let fistProductInCart = await driver.findElement(By.xpath('//ul[@class="shortcuts"]//a'));
				await fistProductInCart.click();
				await removeButton.click();
			} catch (err) {
				await removeButton.click();
			}
			await driver.wait(until.stalenessOf(totalPrice), 1000);
		}
	};
})();

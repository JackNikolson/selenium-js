const {Builder, By, Key, until} = require('selenium-webdriver');

(async function () {
	let driver = new Builder().forBrowser('firefox').build();
	driver.manage().setTimeouts( {implicit: 3000} );
	await driver.get('http://localhost/litecart/');
	let duck = await driver.findElement(By.xpath('//div[@id="box-campaigns"]//a[1]')); //локатор ссылки на товар
	let lineThrough = 'line-through'; //css значение зачеркнутого текста
	let greyColorRGB = 'rgb(119, 119, 119)'; //css значение серого цвета
	let greyColorRGB1 = 'rgb(102, 102, 102)'; //css значение серого цвета на экране товара
	let redColorRGB = 'rgb(204, 0, 0)'; //css значение красного цвета
	
	async function catalog() {
		let productName = await driver.findElement(By.xpath('//div[@id="box-campaigns"]//div[@class="name"]')).getAttribute('textContent'); //локатор названия продукта
		let productPrice = await driver.findElement(By.css('div#box-campaigns s.regular-price')).getAttribute('textContent'); //локатор зачеркнутой цены
		let promotionalPrice = await driver.findElement(By.css('div#box-campaigns strong.campaign-price')).getAttribute('textContent'); //локатор акционной цены
		let strikeoutPrice = await driver.findElement(By.css('div#box-campaigns s.regular-price')).getCssValue('text-decoration-line'); //css атрибут зачеркнутой цены
		let strikeoutPriceColor = await driver.findElement(By.css('div#box-campaigns s.regular-price')).getCssValue('text-decoration-color'); //css атрибут цвета зачеркнутой цены
		let redPrice = await driver.findElement(By.css('div#box-campaigns strong.campaign-price')).getCssValue('text-decoration-color'); //css атрибут цвета акционной цены
		let redPriceBold = await driver.findElement(By.css('div#box-campaigns strong.campaign-price')).getCssValue('font-weight'); //css шрифта акционной цены		
		let promotionalPriceSize = await driver.findElement(By.css('div#box-campaigns strong.campaign-price')).getCssValue('font-size'); //размер текста акционной цены
		let productPriceSize = await driver.findElement(By.css('div#box-campaigns s.regular-price')).getCssValue('font-size'); //размер текста обычной цены

		(async function productPage() {
			await duck.click();
			let productName1 = await driver.findElement(By.css('div#box-product h1')).getAttribute('textContent');
			let productPrice1 = await driver.findElement(By.css('div#box-product s.regular-price')).getAttribute('textContent');
			let promotionalPrice1= await driver.findElement(By.css('div#box-product strong.campaign-price')).getAttribute('textContent');
			let strikeoutPrice1 = await driver.findElement(By.css('div#box-product s.regular-price')).getCssValue('text-decoration-line');
			let strikeoutPriceColor1 = await driver.findElement(By.css('div#box-product s.regular-price')).getCssValue('text-decoration-color');
			let redPrice1 = await driver.findElement(By.css('div#box-product strong.campaign-price')).getCssValue('text-decoration-color');
			let redPriceBold1 = await driver.findElement(By.css('div#box-product strong.campaign-price')).getCssValue('font-weight'); 		
			let promotionalPriceSize1 = await driver.findElement(By.css('div#box-product strong.campaign-price')).getCssValue('font-size'); 
			let productPriceSize1 = await driver.findElement(By.css('div#box-product s.regular-price')).getCssValue('font-size'); 

			//пункт "а"
			if (productName != productName1) {
				console.log('ОШИБКА. Названия товаров не совпадают')
			} else {
				console.log('Названия товаров совпадают');
			}

			//пункт "б"
			if (promotionalPrice != promotionalPrice1 &&	productPrice != productPrice1) {
				console.log('ОШИБКА. Цены не совпадают')
			} else {
				console.log('Цены совпадают');
			}

			//пукнт "в", проверка зачеркнутой цены
			if (strikeoutPrice == lineThrough && strikeoutPrice1 == lineThrough) {
				console.log('Обычная цена зачеркнута');
			} else {
				console.log('ОШИБКА. Обычная цена не зачеркнута');
			}

			//пункт "в", проверка цвета текста
			if (strikeoutPriceColor == greyColorRGB && strikeoutPriceColor1 == greyColorRGB1) {
				console.log('Обычная цена написана серым цветом');
			} else {
				console.log('ОШИБКА. Обычная цена написана не серым цветом');
			}
			
			//пункт "г", проверка цвета текста
			if (redPrice == redColorRGB && redPrice1 == redColorRGB) {
				console.log('Акционная цена соответствует красному цвету');
			} else {
				console.log('ОШИБКА. Акционная цена не соответствует красному цвету')
			}
			
			//пункт "г", проверка жирного шрифта
			if (parseFloat(redPriceBold) >= 700 && parseFloat(redPriceBold1) >= 700) {
				console.log('Акционная цена написана жирным шрифтом')
			} else {
				console.log('ОШИБКА. Акционная цена написана не жирным шрифтом');
			}

			//пункт "д"
			if (parseFloat(promotionalPriceSize) <= parseFloat(productPriceSize) && parseFloat(promotionalPriceSize1) <= parseFloat(productPriceSize1)) {
				console.log('ОШИБКА. Размер шрифта акционной цены меньше шрифта обычной цен');
			} else {
				console.log('Размер шрифта акционной цены больше шрифта обычной цены');
				await driver.quit();
			}
		})();
	}
	catalog();
})();

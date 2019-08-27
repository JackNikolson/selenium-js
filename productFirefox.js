const {Builder, By, Key, until} = require('selenium-webdriver');

(async function () {
	let driver = new Builder().forBrowser('firefox').build();
	driver.manage().setTimeouts( {implicit: 3000} );
	await driver.get('http://localhost/litecart/public_html/en/');
	let duck = await driver.findElement(By.xpath('//div[@id="box-campaigns"]//a[1]')); //локатор ссылки на товар
	let lineThrough = 'line-through'; //css значение зачеркнутого текста
	
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
			let greyTextColor = strikeoutPriceColor.split(/rgb\((\d+), (\d+), (\d+)\)/);
			let greyTextColor1 = strikeoutPriceColor1.split(/rgb\((\d+), (\d+), (\d+)\)/);
			let greyTextRGB = []; //массив с RGB значениями обычной цены на экране каталога
			let greyTextRGB1 = []; //массив с RGB значениями обычной цены на экране товара
			for (let j = 0; j <= greyTextColor.length-1; j++) {
				if (greyTextColor[j] != '') {
					greyTextRGB.push(parseFloat(greyTextColor[j]));
				}
			}
			for (let k = 0; k <= greyTextColor1.length-1; k++) {
				if (greyTextColor1[k] != '') {
					greyTextRGB1.push(parseFloat(greyTextColor1[k]));
				}
			}
			if (greyTextRGB[0] == greyTextRGB[1] && greyTextRGB[1] == greyTextRGB[2]) {
				console.log('Обычная цена на экране каталога написана серым цветом');
			} else {
				console.log('ОШИБКА. Обычная цена на экране каталога написана не серым цветом');
			}
			if (greyTextRGB1[0] == greyTextRGB1[1] && greyTextRGB1[1] == greyTextRGB1[2]) {
				console.log('Обычная цена на экране товара написана серым цветом');
			} else {
				console.log('ОШИБКА. Обычная цена на экране товара написана не серым цветом');
			}
			
			//пункт "г", проверка цвета текста
			let promotionalPriceColor = redPrice.split(/rgb\((\d+), (\d+), (\d+)\)/); 
			let promotionalPriceColor1 = redPrice1.split(/rgb\((\d+), (\d+), (\d+)\)/); 
			let promotionalPriceColorRGB = []; //массив с RGB значениями акционной цены на экране каталога
			let promotionalPriceColorRGB1 = []; //массив с RGB значениями акционной цены на экране товара
			for (let i = 0; i <= promotionalPriceColor.length-1; i++) {
				if (promotionalPriceColor[i] != '') {
					promotionalPriceColorRGB.push(parseFloat(promotionalPriceColor[i]));
				}
			}
			for (let p = 0; p <= promotionalPriceColor1.length-1; p++) {
				if (promotionalPriceColor1[p] != '') {
					promotionalPriceColorRGB1.push(parseFloat(promotionalPriceColor1[p]));
				}
			}
			if (promotionalPriceColorRGB[0] != 0 && promotionalPriceColorRGB[1] == 0 && promotionalPriceColorRGB[2] == 0) {
				console.log('Акционная цена на экране каталога написана красным цветом');
			} else {
				console.log('ОШИБКА. Акционная цена на экране каталога написана не красным цветом');
			}
			if (promotionalPriceColorRGB1[0] != 0 && promotionalPriceColorRGB1[1] == 0 && promotionalPriceColorRGB1[2] == 0) {
				console.log('Акционная цена на экране товара красным цветом');
			} else {
				console.log('ОШИБКА. Акционная цена на экране товара написана не красным цветом');
			}
			
			//пункт "г", проверка жирного шрифта
			if (parseFloat(redPriceBold) >= 700 && parseFloat(redPriceBold1) >= 700) {
				console.log('Акционная цена написана жирным шрифтом')
			} else {
				console.log('ОШИБКА. Акционная цена написана не жирным шрифтом');
			}

			//пункт "д"
			if (parseFloat(promotionalPriceSize) < parseFloat(productPriceSize) && parseFloat(promotionalPriceSize1) < parseFloat(productPriceSize1)) {
				console.log('ОШИБКА. Размер шрифта акционной цены меньше шрифта обычной цен');
			} else {
				console.log('Размер шрифта акционной цены больше шрифта обычной цены');
				await driver.quit();
			}
		})();
	}
	catalog();
})();
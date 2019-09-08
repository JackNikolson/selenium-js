//Сделайте сценарий, который проверяет, что ссылки на странице редактирования страны открываются в новом окне.

const {Builder, By, Key, until} = require('selenium-webdriver');

(async function () {
  let driver = new Builder().forBrowser('chrome').build();
  driver.manage().setTimeouts( {implicit: 3000} );
  await driver.get('http://localhost/litecart/admin/');
  await driver.findElement(By.name('username')).sendKeys('admin');
  await driver.findElement(By.name('password')).sendKeys('admin' + Key.ENTER);

  async function check() {
    await driver.findElement(By.xpath('//div[@id="box-apps-menu-wrapper"]//li[3]//a')).click();
    await driver.findElement(By.xpath('//a[@class="button"]')).click(); // переход на экран создания страны
		let mainWindow = await driver.getWindowHandle(); 
		let oldWindows = await driver.getAllWindowHandles(); //массив открытых перед открытием ссылок
		
    async function thereIsWindowOtherThanMain() {
			let handels = await driver.getAllWindowHandles(); //новые окна
			let newArr = oldWindows.concat(handels); //соединение массивов id старых и новых окон с целью удалить повторения
			let set = new Set(newArr); // set удаляет все повторяющиеся элементы 
      let newArr1 = await Array.from(set); //set переводится в array
      for (let i = 0; i <= newArr1.length-1; i++) {
        if (mainWindow != newArr1[i]) {
          await driver.switchTo().window(newArr1[i]);
          console.log('Ссылка открыта в новом окне');
          await driver.sleep(1000);
          await driver.close();
          await driver.switchTo().window(mainWindow);
        }
      }
		}
    
    let links = await driver.findElements(By.xpath('//i[@class="fa fa-external-link"]')); // внешние ссылки
    for (let i = 0; i <= links.length-1; i++) {
			await links[i].click();
			let newWindow =  await driver.wait(thereIsWindowOtherThanMain(), 10000);
		}
  }
  await check();
  await driver.quit();
})()

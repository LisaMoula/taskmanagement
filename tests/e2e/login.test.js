const { Builder, By, until } = require('selenium-webdriver');

jest.setTimeout(40000);

describe('Test E2E : Connexion utilisateur', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();  
  });

  afterAll(async () => {
    if (driver) await driver.quit();
  });

  test('Connexion avec email et mot de passe', async () => {
    await driver.get('http://localhost:3000');

    const emailInput = await driver.wait(until.elementLocated(By.id('email')), 5000);
    await emailInput.sendKeys('admin@test.com');

    const passwordInput = await driver.findElement(By.id('password'));
    await passwordInput.sendKeys('password');

    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();

    const dashboardElement = await driver.wait(until.elementLocated(By.css('.task-list')), 10000);
    expect(await dashboardElement.isDisplayed()).toBe(true);
  });

  test('Connexion échoue avec identifiants incorrects', async () => {
    await driver.get('http://localhost:3000');

    const emailInput = await driver.wait(until.elementLocated(By.id('email')), 5000);
    await emailInput.clear(); 
    await emailInput.sendKeys('admin@test.com');

    const passwordInput = await driver.findElement(By.id('password'));
    await passwordInput.clear();
    await passwordInput.sendKeys('mauvaismotdepasse');

    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();

    const errorElement = await driver.wait(until.elementLocated(By.css('.error-message')), 5000);
    expect(await errorElement.isDisplayed()).toBe(true);
  });
});

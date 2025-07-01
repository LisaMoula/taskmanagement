// tests/e2e/login.test.js
const { Builder, By, until } = require('selenium-webdriver');

describe('Test E2E - Connexion utilisateur', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  }, 30000);

  afterAll(async () => {
    await driver.quit();
  });

  test('Connexion réussie redirige vers le dashboard', async () => {
    await driver.get('http://localhost:3000/login'); 

    const emailInput = await driver.findElement(By.name('email'));
    const passwordInput = await driver.findElement(By.name('password'));
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));

    await emailInput.sendKeys('test@example.com');   
    await passwordInput.sendKeys('password123');   
    await submitButton.click();

    await driver.wait(until.urlContains('/dashboard'), 10000);

    const url = await driver.getCurrentUrl();
    expect(url).toContain('/dashboard');
  }, 20000);
});
const { Builder, By, until } = require('selenium-webdriver');

describe('Test E2E - Connexion utilisateur', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  }, 30000);

  afterAll(async () => {
    await driver.quit();
  });

  test('Connexion réussie redirige vers le dashboard', async () => {
    await driver.get('http://localhost:3000/login'); 

    const emailInput = await driver.findElement(By.name('email'));
    const passwordInput = await driver.findElement(By.name('password'));
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));

    await emailInput.sendKeys('admin@test.com');   
    await passwordInput.sendKeys('password');    
    await submitButton.click();

    await driver.wait(until.urlContains('/dashboard'), 10000);

    const url = await driver.getCurrentUrl();
    expect(url).toContain('/dashboard');
  }, 20000);
});

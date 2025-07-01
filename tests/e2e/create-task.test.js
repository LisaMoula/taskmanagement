const { Builder, By, until } = require('selenium-webdriver');

jest.setTimeout(40000);

describe('Test E2E - Création de tâches', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    if (driver) await driver.quit();
  });

  test('Création d\'une tâche avec succès', async () => {
    await driver.get('http://localhost:3000/login');

    const emailInput = await driver.wait(until.elementLocated(By.id('email')), 10000, 'Email input not found');
    const passwordInput = await driver.wait(until.elementLocated(By.id('password')), 10000, 'Password input not found');
    const submitButton = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 10000, 'Submit button not found');

    await emailInput.sendKeys('admin@test.com');
    await passwordInput.sendKeys('password');
    await submitButton.click();

    await driver.wait(until.urlContains('/dashboard'), 10000, 'Dashboard URL not loaded');

    const createTaskButton = await driver.wait(until.elementLocated(By.id('create-task')), 10000, 'Create Task button not found');
    await createTaskButton.click();

    const taskNameInput = await driver.wait(until.elementLocated(By.id('taskName')), 10000, 'Task name input not found');
    const taskDescriptionInput = await driver.wait(until.elementLocated(By.id('taskDescription')), 10000, 'Task description input not found');
    const saveTaskButton = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 10000, 'Save task button not found');

    await taskNameInput.sendKeys('Nouvelle tâche');
    await taskDescriptionInput.sendKeys('Description de la nouvelle tâche');
    await saveTaskButton.click();

    const newTask = await driver.wait(until.elementLocated(By.xpath("//*[text()='Nouvelle tâche']")), 10000, 'New task not found in list');
    expect(await newTask.isDisplayed()).toBe(true);
  });
});
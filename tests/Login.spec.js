
import { test, expect } from '@playwright/test';
import { PASSWORDQA, USERQA , URLTEST } from '../environment';

test('Inicio de sesión con email y password válidos', async ({ page }) => {
  
  //Navegamos a la página principal
  await page.goto(URLTEST);

  // 1.Navegamos al login
  await page.getByRole('link', { name: 'Sign in' }).click();
  // 2.Ingresar email 
  await page.getByRole('textbox', { name: 'Email' }).fill(USERQA);
  // 3.Ingresar password
  await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORDQA);
  // 4. Dar click en el botón Sign in
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.waitForTimeout(5000); //Espera de 5 segundos

  console.log("Titulo página: ", await page.getByRole('heading', { level: 2 }).innerText());

  //Resultado esperado: Redirecciona a la página principal
  expect(await page.getByRole('heading', { level: 2 }).innerText()).toMatch('Products');

});

test('Inicio de sesión con email no válido', async ({ page }) => {
  
  //Navegamos a la página principal
  await page.goto(URLTEST);

  // 1.Navegamos al login
  await page.getByRole('link', { name: 'Sign in' }).click();
  // 2.Ingresar email 
  await page.getByRole('textbox', { name: 'Email' }).fill('a@gmail.com');
  // 3.Ingresar password
  await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORDQA);
  // 4. Dar click en el botón Sign in
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.waitForTimeout(5000); //Espera de 5 segundos

  //Resultado esperado: Se visualiza un texto el cual indica que el email es incorrecto
  console.log("Texto: ", await page.locator('#notice').getByText('Invalid email or password.').innerText());

  await expect(page.locator('#notice').getByText('Invalid email or password.')).toBeVisible();

});

test('Inicio de sesión con password no válido', async ({ page }) => {
  
  //Navegamos a la página principal
  await page.goto(URLTEST);

  // 1.Navegamos al login
  await page.getByRole('link', { name: 'Sign in' }).click();
  // 2.Ingresar email 
  await page.getByRole('textbox', { name: 'Email' }).fill(USERQA);
  // 3.Ingresar password
  await page.getByRole('textbox', { name: 'Password' }).fill('1231321');
  // 4. Dar click en el botón Sign in
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.waitForTimeout(5000); //Espera de 5 segundos

  //Resultado esperado: Se visualiza un texto el cual indica que el password es incorrecto
  console.log("Texto: ", await page.locator('#notice').getByText('Invalid email or password.').innerText());

  await expect(page.locator('#notice').getByText('Invalid email or password.')).toBeVisible();

});

test('Inicio de sesión con los campos vacíos', async ({ page }) => {
  
  //Navegamos a la página principal
  await page.goto(URLTEST);

  // 1.Navegamos al login
  await page.getByRole('link', { name: 'Sign in' }).click();
  // 2.Ingresar email 
  await page.getByRole('textbox', { name: 'Email' }).fill('');
  // 3.Ingresar password
  await page.getByRole('textbox', { name: 'Password' }).fill('');
  // 4. Dar click en el botón Sign in
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.waitForTimeout(5000); //Espera de 5 segundos

  //Resultado esperado: Se visualiza un texto indicando que se debe ingresar las credenciales
  console.log("Texto: ", await page.locator('#notice').getByText('Invalid email or password.').innerText());

  await expect(page.locator('#notice').getByText('Invalid email or password.')).toBeVisible();

});

test('Funcionamiento del enlace Forgot Password?', async ({ page }) => {
  
  //Navegamos a la página principal
  await page.goto(URLTEST);

  // 1.Navegamos al login
  await page.getByRole('link', { name: 'Sign in' }).click();
  // 2. Dar clic en el enlace Forgot Password?
  await page.getByRole('link', { name: 'Forgot Password?' }).click();
  // 3. Ingresar el email
  await page.getByRole('textbox', { name: 'Email' }).fill('testqa782@gmail.com');
  // 4. Dar click en el botón Submit
  await page.getByRole('button', { name: 'Submit' }).click();

  //Resultado esperado: Redirecciona a una página en donde se indica que fue enviado un correo para la recuperación de la cuenta

  await expect(page.getByRole('heading', { name: 'Help is on the way!' })).toBeVisible();

});


//Debido a que la plataforma cuenta con la seguridad de Cloudflare 
// no se pueden implementar los casos de prueba para el módulo de creación de cuentas
test('Creación de cuenta con email existente', async ({ page }) => {
  
  //Navegamos a la página principal
  await page.goto(URLTEST);

  // 1.Navegamos al login
  await page.getByRole('link', { name: 'Sign in' }).click();
  // 2. Dar clic en el enlace Create a new account
  await page.getByRole('link', { name: 'Create a new account' }).click();
  await page.pause(); //Espera de 5 segundos
  // 3. Ingresar datos en todos los campos
  await page.getByRole('textbox', { name: 'First Name' }).fill('Test');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('QA 2');
  await page.getByRole('textbox', { name: 'Email' }).fill(USERQA);
  await page.getByRole('textbox', { name: 'Password' }).fill('TestQA456!');
  // 4. Dar click en el checkbox
  await page.getByRole('checkbox', { name: 'I have read and agree to the' }).check()
  // 5. Dar click en el botón Sign up
  await page.getByRole('button', { name: 'Sign up' }).click();


  //Resultado esperado: Se visualiza un mensaje indicando que el email ya está en uso
  expect(page.getByText('The username and/or password')).toBeVisible();

});


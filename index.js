const express = require('express');
const app = express();
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

app.listen(3000, () => console.log('Server running on port 3000'));
app.get('/', (req, res) => {
    res.send('Hello world');
});


// Función para ejecutar pruebas
async function runTests() {
    let driver;
    try {
        // Inicia el navegador y abre la aplicación
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://localhost:3000');
        // Espera hasta que se cargue la página y busca el texto "Hello world"
        await driver.wait(until.elementLocated(By.css('body')), 5000);
        // Captura el texto de la página y verifica que sea "Hello world"
        const bodyText = await driver.findElement(By.css('body')).getText();
        assert.strictEqual(bodyText, 'Hola mundo');
        console.log('Prueba exitosa: La página muestra "Hello world"');
    } catch (error) {
        console.error('Error en la prueba:', error.message);
    } finally {
        // Cierra el navegador después de la prueba
        if (driver) {
            await driver.quit();
        }
    }
}
// Ejecuta las pruebas
runTests();

const puppeteer = require('puppeteer')

const variables = require('../configs/config.json')
const configRegion = require('../configs/config.json').URL_REGION

const caputeValuesForRegion = async () => {
    console.log("[ROBOT-CAPTURE-FOR-REGION]> Abrindo o navegador!")
    const browser = await puppeteer.launch({headless:false});
    console.log("[ROBOT-CAPTURE-FOR-REGION]> Abrindo uma nova aba!")
    const page = await browser.newPage();
    // waitUntil => espera a pagina carregar por completo
    console.log("[ROBOT-CAPTURE-FOR-REGION]> Passando a URL de acesso!")
    await page.goto(configRegion , {waitUntil: 'load'} );
    await page.waitFor(5000);
 
    console.log("[ROBOT-CAPTURE-FOR-REGION]>> Clicando na mensagem de erro para fecha-la!")
    //await page.keyboard.press('Escape') // String.fromCharCode(27) || 'Escap
}

module.exports = caputeValuesForRegion
const puppeteer = require('puppeteer')

const robot_put = async () => {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto('http://10.85.0.88/backoffice/login.jsf');
    await page.waitFor(1000)
    //await page.screenshot({path: 'example.png'});
    // Input Login => formulario:txLoginInput
    // Input Senha => formulario:txSenhaInput
    // Button      => formulario:botaoEntrar
  
   // await browser.close();
}

module.exports = robot_put
const puppeteer = require('puppeteer')

const variables = require('../configs.json')

const robot_put = async ( params ) => {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    // waitUntil => espera a pagina carregar por completo
    await page.goto(variables.URL);
    await page.waitFor(3000);
    //await page.click('.ui-widget-content > table');
    await page.keyboard.press(String.fromCharCode(27))
    await page.waitFor(3000);
   /* await page.evaluate(()=> {
       console.log(document.querySelector('.ui-dialog-content > table'));
    })*/
    await page.waitFor('input[name="formulario:txLoginInput"]')
    await page.waitFor(1000)
    await page.type('input[name="formulario:txLoginInput"]', variables.LOGIN , { delay:300 })
    await page.waitFor(1000)

    await page.type('input[name="formulario:txSenhaInput"]', variables.PASS , { delay:300 })
    await page.waitFor(1000)
    await page.keyboard.press('Enter')
    //await page.goto(variables.URL)
    //await page.screenshot({path: 'example.png'});
    // Input Login => formulario:txLoginInput
    // Input Senha => formulario:txSenhaInput
    // Button      => formulario:botaoEntrar
    // Mensagem de Erro => messages:messagesId
    // .ui-dialog-content.ui-widget-content
  
   // await browser.close();
}

module.exports = robot_put
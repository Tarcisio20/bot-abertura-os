const puppeteer = require('puppeteer')

const variables = require('../config.json')


const robot_put = async (  ) => {
    console.log(">>>> Abrindo o navegador")
    const browser = await puppeteer.launch({headless:false});
    console.log(">>>> Abrindo uma nova aba")
    const page = await browser.newPage();
    // waitUntil => espera a pagina carregar por completo
    console.log(">>>> Passando a URL de acesso")
    await page.goto(variables.URL);
    await page.waitFor(3000);
    //await page.click('.ui-widget-content > table');
    console.log(">>>> ESC para limpar msg de erro")
    //await page.keyboard.press('Escape') // String.fromCharCode(27) || 'Escape'
   
    await page.waitFor(1000);
    const result = await page.evaluate((  )=> {
        const vf  = ( arg ) =>{
            arg.onclick()
        }
       const v = document.querySelector('.ui-dialog-content > table');
       vf(v)
       return v
    })
    //console.log("Sai com o valor de V: "+result)
    await page.waitFor('input[name="formulario:txLoginInput"]')
    await page.waitFor(1000)
    console.log(">>> Inserindo Login")
    await page.type('input[name="formulario:txLoginInput"]', variables.LOGIN , { delay:100 })
    await page.waitFor(1000)
    console.log(">>> Inserindo Senha")
    await page.type('input[name="formulario:txSenhaInput"]', variables.PASS , { delay:100 })
    await page.waitFor(1000)
    console.log(">>> Enter no Form")
    await page.keyboard.press('Enter')
    await page.waitFor(2000)
    console.log(">>> Acessando URL de OS's")
    await page.goto(variables.URL_S)
    await page.waitFor(1000)
    console.log(">>> Clicando no Botão NOVO")
    //await page.click('button#formularioOrdemServicoAtmConsultar:j_idt518')
    // /html/body/div[2]/div[2]/form/span[1]/table/tbody/tr/td[2]/button
   // const [button] = await page.$x("//button[contains(., 'Button text')]");
    const [button] = await page.$x('//*[@id="formularioOrdemServicoAtmConsultar:j_idt518"]/span[2][contains(., "Novo")]')
    if(button){
       await button.click() 
       console.log("### Clicou")
    }
    await page.waitFor(1000)
    console.log(">>> Preenchendo ID do Terminal")
    await page.type('input[name="formularioOrdemServicoAtmJanelaPreCadastrar:idAtmCodigo"]', variables.ID_TERMINAL , { delay:100 })
    console.log(">>> Tab para confirmar")
    await page.keyboard.press('Tab')
    console.log(">>> Selecionando opção Transporte de valores ")
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Enter')

    ///html/body/div[2]/div[2]/div[1]/div[2]/form/span/div/table/tbody/tr[2]/td[2]/span/table/tbody/tr/td[1]/div/label
    // //*[@id="formularioOrdemServicoAtmJanelaPreCadastrar:tpOrdemServicoInput_label"]
   /* const [buutonConfirma] = await page.$x('//*[@id="formularioOrdemServicoAtmJanelaPreCadastrar:j_idt599"]/span[2][contains(., "Continuar")]')
    if(buttonConfirma){
       await buttonConfirma.click() 
       console.log("### Clicou")
    }else{
        console.log('### Não Clicou')
    }*/
    //console.log(button)
    //await page.click( '//*[@id="formularioOrdemServicoAtmConsultar:j_idt518"]/span[2]')
   /*const result1 = await page.evaluate((  )=> {
        const vf  = ( arg ) =>{
            arg.onclick()
        }
       const v1 = document.querySelector('table > td > span.iconNew');
       vf(v1)
       console.log(`>>> ${v1}`)
       return v1
    })
    console.log("Sai com o retorno do Result1: "+ result1)*/

    await page.waitFor(2000)
    // Input Login => formulario:txLoginInput
    // Input Senha => formulario:txSenhaInput
    // Button      => formulario:botaoEntrar
    // Mensagem de Erro => messages:messagesId
    // .ui-dialog-content.ui-widget-content

    // formularioOrdemServicoAtmJanelaPreCadastrar:idAtmCodigo => Campo da OS
    // formularioOrdemServicoAtmJanelaPreCadastrar:tpOrdemServicoInput
  
   // await browser.close();
}

module.exports = robot_put
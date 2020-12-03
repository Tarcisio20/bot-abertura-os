const puppeteer = require('puppeteer')

const variables = require('../configs/config.json')
const infos = require('../configs/infos.json')


const finishOS = async () => {
    console.log("[ROBOT-FINISH-OS]> Abrindo o navegador!")
    const browser = await puppeteer.launch({headless:false});
    console.log("[ROBOT-FINISH-OS]> Abrindo uma nova aba!")
    const page = await browser.newPage();
    // waitUntil => espera a pagina carregar por completo
    console.log("[ROBOT-FINISH-OS]> Passando a URL de acesso!")
    await page.goto(variables.URL, {waitUntil: 'load'} );
    await page.waitFor(5000);
 
    console.log("[ROBOT-FINISH-OS]>> Clicando na mensagem de erro para fecha-la!")
    //await page.keyboard.press('Escape') // String.fromCharCode(27) || 'Escape'
   
    await page.waitFor(2000);
    const result = await page.evaluate((  )=> {
        const vf  = ( arg ) =>{
            arg.onclick()
        }
       const v = document.querySelector('.ui-dialog-content > table');
       vf(v)
       return v
    })

    console.log("[ROBOT-FINISH-OS]>> Localizando o Campo de Login!")
    await page.waitFor('input[name="formulario:txLoginInput"]')
    await page.waitFor(2000)
    
    console.log("[ROBOT-FINISH-OS]>> Inserindo Usuario!")
    await page.type('input[name="formulario:txLoginInput"]', variables.LOGIN , { delay:100 })
    await page.waitFor(2000)
    
    console.log("[ROBOT-FINISH-OS]>> Inserindo Senha!")
    await page.type('input[name="formulario:txSenhaInput"]', variables.PASS , { delay:100 })
    await page.waitFor(2000)

    console.log("[ROBOT-FINISH-OS]>> Enter no Form de Login!")
    await page.keyboard.press('Enter')
    await page.waitFor(3000)

    console.log("[ROBOT-FINISH-OS]>>> Acessando URL de OS's!")
    await page.goto(variables.URL_S)
    await page.waitFor(2000)

    console.log("[ROBOT-FINISH-OS]>>> Inserindo número da OS!")
    await page.type('input[name="formularioOrdemServicoAtmConsultar\\:idOrdemServicoAtmInput"]', "52438" , { delay:100 })
    await page.waitFor(2000)

    // formularioOrdemServicoAtmConsultar:idOrdemServicoAtmInput
    //formularioOrdemServicoAtmConsultar:idOrdemServicoAtmInput

    console.log("[ROBOT-FINISH-OS]>>> Clicando no Botão de Pesquisa!")
    const [button] = await page.$x('//*[@id="formularioOrdemServicoAtmConsultar:botaoPesquisar"]/span[2][contains(., "Pesquisar")]')
    if(button){
        await button.click() 
        console.log("     ### Clicou")
     }
     await page.waitFor(3000)



     console.log("[ROBOT-FINISH-OS]>>> Acessando URL de OS's!")
    await page.goto(variables.URL_S)
    await page.waitFor(2000)

    console.log("[ROBOT-FINISH-OS]>>> Inserindo número da OS!")
    await page.type('input[name="formularioOrdemServicoAtmConsultar\\:idOrdemServicoAtmInput"]', "52438" , { delay:100 })
    await page.waitFor(2000)

    // formularioOrdemServicoAtmConsultar:idOrdemServicoAtmInput
    //formularioOrdemServicoAtmConsultar:idOrdemServicoAtmInput

    console.log("[ROBOT-FINISH-OS]>>> Clicando no Botão de Pesquisa!")
    const [button1] = await page.$x('//*[@id="formularioOrdemServicoAtmConsultar:botaoPesquisar"]/span[2][contains(., "Pesquisar")]')
    if(button1){
        await button1.click() 
        console.log("     ### Clicou")
     }
     await page.waitFor(3000)

     

}

module.exports = finishOS
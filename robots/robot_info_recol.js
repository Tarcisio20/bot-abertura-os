const puppeteer = require('puppeteer')

const variables = require('../configs/config.json')
const infos = require('../configs/infos_recol.json')


const infoRecol = async (  ) => {
    
    console.log("[ROBOT-INFO-RECOL]> Abrindo o navegador!")
    const browser = await puppeteer.launch({headless:false});
    console.log("[ROBOT-INFO-RECOL]> Abrindo uma nova aba!")
    const page = await browser.newPage();
    await page.waitFor(2000);
    // waitUntil => espera a pagina carregar por completo
    console.log("[ROBOT-INFO-RECOL]> Passando a URL de acesso!")
    await page.goto(variables.URL, {waitUntil: 'load'} );
    await page.waitFor(5000);
 
    console.log("[ROBOT-INFO-RECOL]>> Clicando na mensagem de erro para fecha-la!")
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

    console.log("[ROBOT-INFO-RECOL]>> Localizando o Campo de Login!")
    await page.waitFor('input[name="formulario:txLoginInput"]')
    await page.waitFor(2000)
    
    console.log("[ROBOT-INFO-RECOL]>> Inserindo Usuario!")
    await page.type('input[name="formulario:txLoginInput"]', variables.LOGIN , { delay:100 })
    await page.waitFor(2000)
    
    console.log("[ROBOT-INFO-RECOL]>> Inserindo Senha!")
    await page.type('input[name="formulario:txSenhaInput"]', variables.PASS , { delay:100 })
    await page.waitFor(2000)

    console.log("[ROBOT-INFO-RECOL]>> Enter no Form de Login!")
    await page.keyboard.press('Enter')
    await page.waitFor(3000)

    console.log("[ROBOT-INFO-RECOL]>>> Acessando URL de OS's!")
    await page.goto(variables.URL_S, {waitUntil: 'load'} )
    await page.waitFor(3000)

    console.log("[ROBOT-INFO-RECOL]>>> Digitando o número da OS!")
    await page.type('input[name="formularioOrdemServicoAtmConsultar:idOrdemServicoAtmInput"]', infos.NUM_OS , { delay:200 })
    await page.keyboard.press('Tab')

    console.log("[ROBOT-OPEN-OS]>>> Clicando no Botão de Pesquisar OS!")
    const [button] = await page.$x('//*[@id="formularioOrdemServicoAtmConsultar:botaoPesquisar"]/span[2][contains(., "Pesquisar")]')
    if(button){
       await button.click() 
       console.log("     ### Clicou")
    }
}

module.exports = infoRecol
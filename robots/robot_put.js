const puppeteer = require('puppeteer')

const variables = require('../configs/config.json')
const infos = require('../configs/infos.json')


const openOS = async (  ) => {
    
    console.log("[ROBOT-OPEN-OS]> Abrindo o navegador!")
    const browser = await puppeteer.launch({headless:false});
    console.log("[ROBOT-OPEN-OS]> Abrindo uma nova aba!")
    const page = await browser.newPage();
    await page.waitFor(2000);
    // waitUntil => espera a pagina carregar por completo
    console.log("[ROBOT-OPEN-OS]> Passando a URL de acesso!")
    await page.goto(variables.URL, {waitUntil: 'load'} );
    await page.waitFor(5000);
 
    console.log("[ROBOT-OPEN-OS]>> Clicando na mensagem de erro para fecha-la!")
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

    console.log("[ROBOT-OPEN-OS]>> Localizando o Campo de Login!")
    await page.waitFor('input[name="formulario:txLoginInput"]')
    await page.waitFor(2000)
    
    console.log("[ROBOT-OPEN-OS]>> Inserindo Usuario!")
    await page.type('input[name="formulario:txLoginInput"]', variables.LOGIN , { delay:100 })
    await page.waitFor(2000)
    
    console.log("[ROBOT-OPEN-OS]>> Inserindo Senha!")
    await page.type('input[name="formulario:txSenhaInput"]', variables.PASS , { delay:100 })
    await page.waitFor(2000)

    console.log("[ROBOT-OPEN-OS]>> Enter no Form de Login!")
    await page.keyboard.press('Enter')
    await page.waitFor(3000)

    console.log("[ROBOT-OPEN-OS]>>> Acessando URL de OS's!")
    await page.goto(variables.URL_S, {waitUntil: 'load'} )
    await page.waitFor(3000)

    console.log("[ROBOT-OPEN-OS]>>> Clicando no Botão de Nova OS!")
    const [button] = await page.$x('//*[@id="formularioOrdemServicoAtmConsultar:j_idt548"]/span[2][contains(., "Novo")]')
    if(button){
       await button.click() 
       console.log("     ### Clicou")
    }
    await page.waitFor(5000)

    console.log("[ROBOT-OPEN-OS]>>>> Preenchendo ID do Terminal!")
    await page.type('input[name="formularioOrdemServicoAtmJanelaPreCadastrar:idAtmCodigo"]', infos.ID_TERMINAL , { delay:200 })
    
    console.log("[ROBOT-OPEN-OS]>>>> Tab para confirmar ID")
    await page.keyboard.press('Tab')

    console.log("[ROBOT-OPEN-OS]>>>> Selecionando opção Transporte de valores!")
    await page.keyboard.press('ArrowDown')
    await page.waitFor(2000)

    console.log("[ROBOT-OPEN-OS]>>>> Selecionando botão de confirmar!")
    await page.keyboard.press('Tab')
    await page.waitFor(2000)

    console.log("[ROBOT-OPEN-OS]>>>> Enter no botao de confirmar ")
    await page.keyboard.press('Enter')
    await page.waitFor(4000)
    await page.keyboard.press('Tab')
    await page.waitFor(2000)
    if (infos.TROCA_TOTAL === true){
        
        console.log("[ROBOT-OPEN-OS]>>>>> Preenchendo o campo de Descrição!")
        // //*[@id="formularioOrdemServicoAtmJanelaCadastrar:txDescricaoInput"]',
        // ui-inputfield ui-inputtextarea ui-widget ui-state-default ui-corner-all estiloCampo
        // textarea[name="formularioOrdemServicoAtmJanelaCadastrar:txDescricaoInput"]
        await page.type('.ui-inputfield', infos.DESCRIPTION_TROCA_TOTAL , { delay:100 })
    
        console.log("[ROBOT-OPEN-OS]>>>>> Check no campo de Troca total!")
        const el = await page.$x('//*[@id="formularioOrdemServicoAtmJanelaCadastrar:j_idt642"]/div[2]')
        await el[0].click()

    }else{
        console.log("[ROBOT-OPEN-OS]>>>>> Preenchendo o campo de Descrição!")
        await page.type('.ui-inputfield', infos.DESCRIPTION_COMPLEMENTAR , { delay:100 })
    }

    await page.waitFor(2000)
    
    console.log("[ROBOT-OPEN-OS]>>>>> Check para preenchimento de cassetes!")
    // formularioOrdemServicoAtmJanelaCadastrar:j_idt645_input
    //await page.click('.ui-chkbox-box > span')
    //await page.click('.ui-chkbox-icon')
    const elements = await page.$x('//*[@id="formularioOrdemServicoAtmJanelaCadastrar:j_idt674"]/div[2]')
    await elements[0].click() 
    await page.waitFor(2000)
    
    console.log("[ROBOT-OPEN-OS]>>>>> Check em todos os cassetes!")
    if ( infos.CASSETE_A > "0" ) { 
        const elementsCheckA = await page.$x('//*[@id="formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:0:j_idt688"]/div[2]')
        await elementsCheckA[0].click() 
        console.log(`    ### Clicando no  CheckBox [A]`)
        await page.waitFor(2000)

        console.log(`    ### Inserindo valor do cassete [A]`)
        await page.type('input[name="formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:0:j_idt695_input"]', infos.CASSETE_A , { delay:100 })
        await page.waitFor(2000)
    }

    if(infos.CASSETE_B > "0"){
        const elementsCheckB = await page.$x('//*[@id="formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:1:j_idt688"]/div[2]')
        await elementsCheckB[0].click() 
        console.log(`    ### Clicando no  CheckBox [B]`)
        await page.waitFor(2000)
        console.log(`    ### Inserindo valor do cassete [B]`)
        await page.type('input[name="formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:1:j_idt695_input"]', infos.CASSETE_B , { delay:100 })
        await page.waitFor(2000)
    }

    if(infos.CASSETE_C > "0"){
        const elementsCheckC = await page.$x('//*[@id="formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:2:j_idt688"]/div[2]')
        await elementsCheckC[0].click() 
        console.log(`    ### Clicando no  CheckBox [C]`)
        await page.waitFor(2000)
        console.log(`    ### Inserindo valor do cassete [C]`)
        await page.type('input[name="formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:2:j_idt695_input"]', infos.CASSETE_C , { delay:100 })
        await page.waitFor(2000)
    }

    if(infos.CASSETE_D > "0"){
        const elementsCheckD = await page.$x('//*[@id="formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:3:j_idt688"]/div[2]')
        await elementsCheckD[0].click() 
        console.log(`    ### Clicando no  CheckBox [D]`)
        await page.waitFor(2000)
        console.log(`    ### Inserindo valor do cassete [D]`)
        await page.type('input[name="formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:3:j_idt695_input"]', infos.CASSETE_D , { delay:100 })
        await page.waitFor(2000)
    }
    
    console.log("[ROBOT-OPEN-OS]>>>>> Selecionando botão de Salvar!")
    await page.keyboard.press('Tab')
    await page.waitFor(2000)
    console.log("[ROBOT-OPEN-OS]>>>>> Enter no botao de Salvar!")
    //await page.keyboard.press('Enter')
    
    console.log("###############")
    console.log(">> OS ABERTA <<")
    console.log("###############")
    await page.waitFor(2000)
    await browser.close();
}

const finishOS = async () => {

}

module.exports = openOS
const puppeteer = require('puppeteer')

const variables = require('../configs/config.json')
const infos = require('../configs/infos.json')


const openOS = async (  ) => {
    
    console.log("[ROBOT-OPEN-OS]> Abrindo o navegador!")
    const browser = await puppeteer.launch({headless:false});
    console.log("[ROBOT-OPEN-OS]> Abrindo uma nova aba!")
    const page = await browser.newPage();
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
    await page.goto(variables.URL_S)
    await page.waitFor(2000)

    console.log("[ROBOT-OPEN-OS]>>> Clicando no Botão de Nova OS!")
    const [button] = await page.$x('//*[@id="formularioOrdemServicoAtmConsultar:j_idt552"]/span[2][contains(., "Novo")]')
    // j_idt518
    //formularioOrdemServicoAtmConsultar:j_idt550
    // formularioOrdemServicoAtmConsultar:j_idt552
    if(button){
       await button.click() 
       console.log("     ### Clicou")
    }
    await page.waitFor(3000)

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

    console.log("[ROBOT-OPEN-OS]>>> Enter no botao de confirmar ")
    await page.keyboard.press('Enter')
    await page.waitFor(4000)

    if (infos.TROCA_TOTAL){
        console.log("[ROBOT-OPEN-OS]>>>>> Check no campo de Troca total!")
        const el = await page.$x('//*[@id="formularioOrdemServicoAtmJanelaCadastrar:j_idt674"]/div[2]')
        //j_idt642
        //formularioOrdemServicoAtmJanelaCadastrar:j_idt674
        await el[0].click()
        await page.waitFor(2000)

        console.log("[ROBOT-OPEN-OS]>>>>> Preenchendo o campo de Descrição!")
        await page.type('textarea[name="formularioOrdemServicoAtmJanelaCadastrar:txDescricaoInput"]', infos.DESCRIPTION_TROCA_TOTAL , { delay:100 })
    }else{
        console.log("[ROBOT-OPEN-OS]>>>>> Preenchendo o campo de Descrição!")
        await page.type('textarea[name="formularioOrdemServicoAtmJanelaCadastrar:txDescricaoInput"]', infos.DESCRIPTION_COMPLEMENTAR , { delay:100 })
    }

    await page.waitFor(2000)
    
    console.log("[ROBOT-OPEN-OS]>>>>> Check para preenchimento de cassetes!")
    const elements = await page.$x('//*[@id="formularioOrdemServicoAtmJanelaCadastrar:j_idt678"]/div[2]')
    //j_idt644
    // formularioOrdemServicoAtmJanelaCadastrar:j_idt676
    // formularioOrdemServicoAtmJanelaCadastrar:j_idt678
    await elements[0].click() 
    await page.waitFor(2000)
    
    console.log("[ROBOT-OPEN-OS]>>>>> Check em todos os cassetes!")
    if ( infos.CASSETE_A > 0 ) {
        const elementsCheck = await page.$x('//*[@id="formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:0:j_idt692"]')
        // formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:0:j_idt658_input
        // formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:0:j_idt692
        // id="formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:0:j_idt690"
        await elementsCheck[0].click() 
        console.log(`    ### Clicando no  CheckBox [A]`)
        await page.waitFor(2000)

        console.log(`    ### Inserindo valor do cassete [A]`)
        await page.type('input[name="formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:0:j_idt699_input"]', infos.CASSETE_A , { delay:100 })
        //j_idt665
        // formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:0:j_idt699_input
        // formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:0:j_idt697_input
        await page.waitFor(2000)
    }

    if(infos.CASSETE_B > 0){
        const elementsCheckB = await page.$x('//*[@id="formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:1:j_idt692"]')
        //formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:1:j_idt658_input
        // 
        await elementsCheckB[0].click() 
        console.log(`    ### Clicando no  CheckBox [B]`)
        await page.waitFor(2000)
        console.log(`    ### Inserindo valor do cassete [B]`)
        await page.type('input[name="formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:1:j_idt699_input"]', infos.CASSETE_B , { delay:100 })
        await page.waitFor(2000)
    }

    if(infos.CASSETE_C > 0){
        const elementsCheckC = await page.$x('//*[@id="formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:2:j_idt692"]')
        //formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:2:j_idt658_input
        // 
        await elementsCheckC[0].click() 
        console.log(`    ### Clicando no  CheckBox [C]`)
        await page.waitFor(2000)
        console.log(`    ### Inserindo valor do cassete [C]`)
        await page.type('input[name="formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:2:j_idt699_input"]', infos.CASSETE_C , { delay:100 })
        await page.waitFor(2000)
    }

    if(infos.CASSETE_D > 0){
        const elementsCheckD = await page.$x('//*[@id="formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:3:j_idt692"]')
        //formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:3:j_idt658_input
        await elementsCheckD[0].click() 
        console.log(`    ### Clicando no  CheckBox [D]`)
        await page.waitFor(2000)
        console.log(`    ### Inserindo valor do cassete [D]`)
        await page.type('input[name="formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:3:j_idt699_input"]', infos.CASSETE_D , { delay:100 })
        await page.waitFor(2000)
    }
    
    console.log("[ROBOT-OPEN-OS]>>>>> Selecionando botão de Salvar!")
    await page.keyboard.press('Tab')
    await page.waitFor(2000)
    console.log("[ROBOT-OPEN-OS]>>>>> Enter no botao de Salvar!")
   // await page.keyboard.press('Enter')
    
    console.log("###############")
    console.log(">> OS ABERTA <<")
    console.log("###############")
    console.log("[ROBOT-OPEN-OS]>>>>> Saindo do Bot!")
    await page.waitFor(2000)
    await browser.close();
}

module.exports = openOS
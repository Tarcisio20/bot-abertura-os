const puppeteer = require('puppeteer')

const variables = require('../configs/config.json')
const infos = require('../configs/infos.json')


const robot_put = async (  ) => {
    console.log(">>>> Abrindo o navegador")
    const browser = await puppeteer.launch({headless:false});
    console.log(">>>> Abrindo uma nova aba")
    const page = await browser.newPage();
    // waitUntil => espera a pagina carregar por completo
    console.log(">>>> Passando a URL de acesso")
    await page.goto(variables.URL);
    await page.waitFor(3000);
 
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
    await page.waitFor(1000)
    console.log(">>> Selecionando botão de confirmar ")
    await page.keyboard.press('Tab')
    await page.waitFor(1000)
    console.log(">>> Enter no botao de confirmar ")
    await page.keyboard.press('Enter')
    await page.waitFor(3000)
   // console.log(">>> Selecionando o campo de descriçao ")
    // await page.keyboard.press('Tab')
    console.log(">>> Preenchendo o campo de Descrição ")
    await page.type('textarea[name="formularioOrdemServicoAtmJanelaCadastrar:txDescricaoInput"]', infos.DESCRIPTION , { delay:100 })
    console.log(">>> Check para preenchimento de cassetes ")
    const elements = await page.$x('//*[@id="formularioOrdemServicoAtmJanelaCadastrar:j_idt644"]/div[2]')
    await elements[0].click() 
    await page.waitFor(1000)
    console.log(">>> Check em todos os cassetes ")

    const elementsCheck = await page.$x('//*[@id="formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:0:j_idt658_input"]')
    await elementsCheck[0].click() 
    console.log(`### Clicando no  CheckBox [1]`)
    await page.waitFor(1000)
    console.log(`### Inserindo valor do cassete [A]`)
    await page.type('input[name="formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:0:j_idt665_input"]', infos.CASSETE_A , { delay:100 })
    await page.waitFor(1000)

    const elementsCheckB = await page.$x('//*[@id="formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:1:j_idt658_input"]')
    await elementsCheckB[0].click() 
    console.log(`### Clicando no  CheckBox [2]`)
    await page.waitFor(1000)
    console.log(`### Inserindo valor do cassete [B]`)
    await page.type('input[name="formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:1:j_idt665_input"]', infos.CASSETE_B , { delay:100 })
    await page.waitFor(1000)

    const elementsCheckC = await page.$x('//*[@id="formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:2:j_idt658_input"]')
    await elementsCheckC[0].click() 
    console.log(`### Clicando no  CheckBox [3]`)
    await page.waitFor(1000)
    console.log(`### Inserindo valor do cassete [C]`)
    await page.type('input[name="formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:2:j_idt665_input"]', infos.CASSETE_C , { delay:100 })
    await page.waitFor(1000)


    const elementsCheckD = await page.$x('//*[@id="formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:3:j_idt658_input"]')
    await elementsCheckD[0].click() 
    console.log(`### Clicando no  CheckBox [4]`)
    await page.waitFor(1000)
    console.log(`### Inserindo valor do cassete [D]`)
    await page.type('input[name="formularioOrdemServicoAtmJanelaCadastrar:tabelaCassetesAbastecimento:3:j_idt665_input"]', infos.CASSETE_D , { delay:100 })
    await page.waitFor(1000)

    console.log(">>> Selecionando botão de Salvar ")
    await page.keyboard.press('Tab')
    await page.waitFor(1000)
    console.log(">>> Enter no botao de Salvar ")
    await page.keyboard.press('Enter')
    
    console.log(">>>> OS ABERTA =) <<<<")
    await page.waitFor(3000)
    await browser.close();
}

module.exports = robot_put
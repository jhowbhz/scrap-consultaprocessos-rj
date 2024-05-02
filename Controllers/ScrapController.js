const puppeteer = require('puppeteer');

const fs = require('fs');


class ScrapController {

    static async start(params) {

        // cookie de sessão
        const cookie = {
            name: 'JSESSIONID',
            value: 'FF6629BF12BB4C70CB7100CD7C64413D',
            domain: 'www.consultaprocessos.rj.gov.br',
            path: '/UPOWEB',
            expires: -1,
            size: 50,
            httpOnly: true,
            secure: true,
            session: true,
            sameSite: 'None'
        };

        // URL do site alvo
        const URL_TARGET = "https://www.consultaprocessos.rj.gov.br/UPOWEB/servlet/StartCISPage?PAGEURL=/cisnatural/NatLogon.html&xciParameters.natsession=Consulta_UPO";
        // URL do frame
        const URL_FRAME = "https://www.consultaprocessos.rj.gov.br/UPOWEB/UICConsulta/UPOTCM01.html";

        const browser = await puppeteer.launch({
            headless: false,
            devtools: false,
        });

        // abrir uma nova página
        const page = await browser.newPage();

        // setar o cookie
        await page.setCookie(cookie);

        // acessar o site alvo
        await page.goto(URL_TARGET, { 
            timeout: 30000,
            visible: true,
            waitUntil: 'domcontentloaded'
        });

        // coletar todas as páginas abertas
        let pages = await browser.pages();

        // pegar a penúltima página aberta
        let popup = pages[pages.length - 2];

        // fechar a penúltima página aberta
        await popup.close();

        // aguardar o frame carregar
        await page.waitForSelector('iframe[name="WA1"]', {
            timeout: 30000, // 30 segundos
            waitUntil: 'domcontentloaded', // aguardar o frame carregar
            visible: true // visível
        });

        // pegar o frame
        const frame = page.frames().find(frame => frame.name() === 'WA1');

        // acessar o frame
        await frame.goto(URL_FRAME, { waitUntil: 'domcontentloaded', visible:true, timeout: 30000 }); // 30 segundos

        // aguardar o arquivo de gabarito ser lido
        const gabarito_captcha = fs.readFileSync('./gabarito.txt', 'utf8');

        // preencher os campos do formulário
        await frame.evaluate((gabarito_captcha) => {

            // preencher os campos do formulário
            document.querySelector('input[id="F_77"]').value = params.f_77;
            document.querySelector('input[id="F_89"]').value = params.f_89;
            document.querySelector('input[id="F_80"]').value = params.f_80;
            document.querySelector('input[id="F_92"]').value = params.f_92;
            document.querySelector('input[id="F_102"]').value = params.f_102;
            
            // pegar todas as imagens do site
            const imgs = document.querySelectorAll('img');

            // percorrer as imagens do site
            imgs.forEach(img => {

                let strings = `fd_cod`;
            
                // verificar se a imagem contém a string 'fd_cod'
                if (img.src.includes(strings)) {

                    const img_name = img.src.split('.').slice(-2)[0].split('/').slice(-1)[0];

                    // verificar se a imagem está no gabarito
                    if (gabarito_captcha.includes(img_name)) {

                        const gabarito = gabarito_captcha.split('\n').find((item) => item.includes(img_name)).split(',')[1];
                        document.querySelector('input[id="F_124"]').value = gabarito;
                        
                    }
                }
            
            });

            // enviar o formulário
            document.querySelector('input[id="F_124"]').dispatchEvent(
                
                new KeyboardEvent('keydown', {
                    key: 'Enter',
                    code: 'Enter',
                    keyCode: 13,
                    which: 13,
                    bubbles: true,
                    cancelable: true,
                })

            );

        }, gabarito_captcha);

    }

}

exports.ScrapController = ScrapController;
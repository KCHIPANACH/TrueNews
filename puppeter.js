const puppeteer = require('puppeteer');

class Puppetter { 

/*         async run(key){ */
            async getPageData(key){

                let newKey = key.replace(/ /g, "%20")
                    newKey = key.replace("%", "%25");
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
            
                await page.goto(`https://news.google.com/search?q=${newKey}&hl=es-419&gl=PE&ceid=PE%3Aes-419`,{waitUntil: 'domcontentloaded'});

                const dataTitle = await page.evaluate(()=>{
                    const titulos = document.querySelectorAll(".NiLAwe.y6IFtc.R7GTQ.keNKEd.j7vNaf.nID9nc > div > article > h3.ipQwMb.ekueJc.gEATFF.RD0gLb > a");
                    const fuente = document.querySelectorAll(".NiLAwe.y6IFtc.R7GTQ.keNKEd.j7vNaf.nID9nc > div > article > div.QmrVtf.RD0gLb > div > .wEwyrc");
                    let links = document.querySelectorAll(".NiLAwe.y6IFtc.R7GTQ.keNKEd.j7vNaf.nID9nc > a ");
                    let figure = document.querySelectorAll(".NiLAwe.y6IFtc.R7GTQ.keNKEd.j7vNaf.nID9nc > a > figure > img");
                    const dataTitleArray = [];
                    titulos.forEach((element,x,a) =>{
                        dataTitleArray.push({
                            titulo: `${element.textContent.trim()}`,
                            fuente: `${fuente[x].textContent.trim()}`,
                            url: `${(links[x]) ? links[x].href: ""}`, 
                            figure: `${(figure[x]) ? figure[x].src : ""}` 
                        })
                    })

                    return{
                        titulos: dataTitleArray
                    }
                })
                 if(dataTitle){
                    await browser.close(); 
                 }
/*                  console.log(dataTitle);   */
                return dataTitle
            }
/*             getPageData(); */
        /*     await browser.close(); */
/*         } */

        async prueba (key){
            const newKey = key.replace(/ /g, "%20")
            return newKey;
        }

}

module.exports = Puppetter;


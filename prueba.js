var stringSimilarity = require('string-similarity');

class Verificar {

    async verify(key, datos){
        let puntos = 0;
        let verificar = false;
        let matchData = [];
        let data = [];
        let dataRespaldo = [];
        let count = 0;
        let countQuitar = 0;
        datos.map(item=>{
            var similar = stringSimilarity.compareTwoStrings(key, item.titulo);
            count ++
            if(count < 9){
                dataRespaldo.push({
                    'key':puntos,
                    titulo:item.titulo,
                    fuente: item.fuente,
                    url:item.url,
                    img: item.figure
                })
            }

            if(similar >= 0.45){
                puntos++
                data.push({
                    'key':puntos,
                    titulo:item.titulo,
                    fuente: item.fuente,
                    url:item.url,
                    img: item.figure
                })
/*                 console.log(item.titulo); */
            }
            
            if( item.titulo.includes("falso") || item.titulo.includes("falsa") || item.titulo.includes("falsas")){
                    countQuitar++;
                    puntos--;
/*                     console.log("QUITO"); */
             } 


             if(item.titulo.includes("desmiente")){
                 countQuitar++;
                 puntos = puntos - 100;
             }



             if(count == datos.length){
                if(countQuitar == 0){
                    puntos = puntos + 100;
                }
                if(countQuitar > 2){
                    puntos = puntos - 100;
                 }
             }
 

/*             console.log(puntos)
            console.log(similar) */
        })
        if(puntos > 3){
            verificar = true;
            if(puntos < 100){
                matchData.push(data,{
                    verificar: verificar,
                })
            }else{
                matchData.push(dataRespaldo,{
                    verificar: verificar,
                })
            }
        }else{
            matchData.push(dataRespaldo,{
                verificar: verificar,
            })
        }

/*             console.log(matchData); */
        return matchData;
    }

}

module.exports = Verificar;
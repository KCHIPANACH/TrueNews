const express = require('express');
var body_parser = require('body-parser');

const app = express();
app.use(body_parser.urlencoded({extended:true}));

const Puppeteer = require("./puppeter");
const Verificar = require("./prueba");

const puppeteer = new Puppeteer();
const verificar = new Verificar();

app.post("/verify", async (req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "*");
    const respuesta = await puppeteer.getPageData(req.body.key);
    const verify = await verificar.verify(req.body.key, respuesta.titulos);
    try{
        res.status(200).json({
            message:verify[1].verificar ,
            data: verify[0]
        })
    }catch(err){
        next(err)
    }
})

    app.listen(3000, ()=>{
        console.log(`listening http://localhost:3000`);
    })


const express = require('express');
const moment = require('moment');
const router = express.Router();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const dateFormat = 'MM-DD-YYYY HH:mm';

const pool = new Pool({
    user: 'user',
    host: 'host.com.br',
    database: 'producao',
    password: '',
    port: 5433
})



async function getCreationDate(start, finish){

  

    const startDate = moment(start, 'YYYY/MM/DD HH:mm');
    const endDate = moment(finish, 'YYYY/MM/DD HH:mm');
    console.log(startDate, endDate)
    console.log(`SELECT dados FROM vendas_vtex.vtex_oms WHERE data_criacao_pedido BETWEEN '${startDate.format(dateFormat)}' AND '${endDate.format(dateFormat)}'`)
    if( startDate > endDate){
        return "Data inicial maior que data final.";
    }

    let queryResults = await pool.query(`SELECT dados FROM vendas_vtex.vtex_oms WHERE data_criacao_pedido BETWEEN '${startDate.format(dateFormat)}' AND '${endDate.format(dateFormat)}'`);
    return queryResults.rows;
}

async function getLastChange(start, finish){

   

    const startDate = moment(start, 'YYYY/MM/DD HH:mm');
    const endDate = moment(finish, 'YYYY/MM/DD HH:mm');
    
    if( startDate > endDate){
        return "Data inicial maior que data final.";
    }

    let queryResults = await pool.query(`SELECT dados FROM vendas_vtex.vtex_oms WHERE data_ultima_atualizacao BETWEEN  '${startDate.format(dateFormat)}' AND '${endDate.format(dateFormat)}'`);
   
    return queryResults.rows;
}

async function getInvoicedDate(start, finish){

   

    const startDate = moment(start, 'YYYY/MM/DD HH:mm');
    const endDate = moment(finish, 'YYYY/MM/DD HH:mm');
   if( startDate > endDate){
       return "Data inicial maior que data final.";
   }
    let queryResults = await pool.query(`SELECT dados FROM vendas_vtex.vtex_oms WHERE data_faturamento BETWEEN '${startDate.format(dateFormat)}' AND '${endDate.format(dateFormat)}'`);
    
    return queryResults.rows;
}



router.use(function (request, response, next) {
    // se não for Lupeon
    if(request.headers.identity !== "bHVwZW9uc2FsZXNleHRyYWN0"){ 
        response.status(403);
        response.send(JSON.stringify({"status": "acesso negado!"}));
    } else{
        next()
    }
    
  });





router.get('/creationdate/:start/:finish', async function (request, response){
    response.setHeader('Content-Type', 'application/json');
    let dados = await getCreationDate(request.params.start, request.params.finish)
    //console.log(dados)
    if(dados === "Data inicial maior que data final."){
        response.status(403);
    }
    response.send(JSON.stringify(dados));

});

router.get('/lastchange/:start/:finish', async function (request, response){
    response.setHeader('Content-Type', 'application/json');
    let dados = await getLastChange(request.params.start, request.params.finish)
    //console.log(dados)
    if(dados === "Data inicial maior que data final."){
        response.status(403);
    }
    response.send(JSON.stringify(dados));
});

router.get('/invoiceddate/:start/:finish', async function (request, response){
    response.setHeader('Content-Type', 'application/json');
    let dados = await getInvoicedDate(request.params.start, request.params.finish)
    //console.log(dados)
    if(dados === "Data inicial maior que data final."){
        response.status(403);
    }
    response.send(JSON.stringify(dados));
});

router.get('*', function(req, res){
    res.send('Algum erro aconteceu, verifique se executou a requisição corretamente', 404);
  });
module.exports = router;

//bHVwZW9uc2FsZXNleHRyYWN0
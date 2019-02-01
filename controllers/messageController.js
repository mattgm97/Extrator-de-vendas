const express = require('express');
const moment = require('moment');
const router = express.Router();
const fs = require('fs');
const path = require('path');



async function generateLog(date, body){
    fs.writeFile(`controllers/logs/${date}relatorio.txt`, body, function (err) {
  
        if (err) throw err;
      
        console.log('arquivo salvo na pasta!');
              
          });
}



router.post('/send', async function (request, response){
    const date = moment().format('YYYY[-]MM[-]DD[T]HH-mm-ss');
    //console.log(request.body);
    let dados = await generateLog(date, JSON.stringify(request.body));
    
    //console.log(dados)
    response.sendStatus(200)

});






module.exports = router;


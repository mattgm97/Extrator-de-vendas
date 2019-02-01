(function onStart(){
    const express = require('express');
    const bodyParser = require("body-parser");
    const port = process.env.API_PORT || 5050;
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static(`${__dirname}/content`));
    app.use('/vendas-vtex', express.static(`${__dirname}/views/vendasVtex`));

    const DataBaseRequests = require('./controllers/DataBaseRequests');
    const messageController = require('./controllers/messageController');
    app.use('/salesextract', DataBaseRequests);
    app.use('/messages', messageController);
    
    app.listen(port, () => console.log(`API de Extração de Relatório de Vendas VTEX iniciando na porta ${port}`));
})()
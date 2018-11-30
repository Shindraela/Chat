/*
Imports and configuration
*/
    const express = require('express');
    const path = require('path');
    const bodyParser = require('body-parser');
    require('dotenv').config();

    const port = process.env.PORT;
    const server = express();
    const { mainRouter } = require('./routes/main.router');
    const db = require('./services/db');
//

/*
Server initialisation
*/
    const init = () => {
        //=> MongoDB
        db.initClient()

        //=> Body-parser
        server.use(bodyParser.json({limit: '10mb'}));
        server.use(bodyParser.urlencoded({ extended: true }));

        //=> Router
        server.use('/', mainRouter);

        //=> Launch
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        });
    };
//

/*
Start server
*/
    init();
//
/*
Import
*/
    const mongoose = require('mongoose');
//

/*
Mongoose config
*/
    const initClient = () => {
        mongoose.connect( process.env.MONGO_URL ).then(
            () => console.log('Mongoose is alive'),
            (error) => console.error('Unable to connect to mongoose', error)
        )
    };
//

/*
Export
*/
    module.exports = {
        initClient
    };
//
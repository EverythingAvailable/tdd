const app = require('../server.js');
const models = require('../models');
const syncDB = require('./sync-db');




syncDB().then(_=> {
        console.log('Sync database!');
        app.listen(2500, () => {
            console.log('port number 2500 is running on');
        });
    })


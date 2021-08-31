const app = require('../server');
const syncDB = require('./sync-db');
const models = require('../models');


syncDB().then(_=> {
    console.log('completely synced');
    app.listen(2500, () => {
        console.log('port number 2500 is running on');
    });
})

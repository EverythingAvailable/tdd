const models = require('./models');


models.sequelize.drop();
console.log('all tables are dropped');


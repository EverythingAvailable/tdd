const models = require('./models');

exports.createSqlite = async function(tableName, data) {
    const result = await tableName.create(data);    
    return result;
};


exports.getSqlite = async function(tableName, queryParams, atr ) {
    const result = await tableName.findOne({ where: queryParams, attributes: atr});
    return result;
};

exports.updateSqlite = async function(tableName, newData, queryParams) {
    await tableName.update(newData, { where: queryParams });
    const result = await tableName.findOne({ where: queryParams }); 
    return result;
};

exports.getSqlites = async function(tableName, atr, lim, queryParams) {
    const result = await tableName.findAll({attributes: atr, limit: lim, where: queryParams });
    return result;
};

exports.deleteSqlite = async function(tableName, queryParams) {
    await tableName.destroy({ where: queryParams });
    return true;
};



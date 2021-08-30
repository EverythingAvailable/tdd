const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    logging: false, // delete create a table blah blah message
    dialect: 'sqlite',
    storage: './sqlite/db.sqlite',
});


// javascript 객체와 실체 테이블을 매핑(실체 테이블은 어디에?? 정의하지 않았잖아??)
const Player = sequelize.define('Player', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    salary: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    final_mvp: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});



module.exports = { Player, sequelize, Sequelize };

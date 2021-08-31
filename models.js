const Sequelize = require('sequelize');
const sqlite3 = require('sqlite3');

// 시퀄라이즈 객체 생성 및 sqlite db 연결
const sequelize = new Sequelize({
    logging: false, // 불필요한 로그 지우기
    dialect: 'sqlite',
    storage: './db.sqlite',
});

// 아예 돌지를 않는데? Player가 정의되지 않는데?
const Player = sequelize.define('Cowboy', {
    // id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true
    // },
    // club: {
    //     type: Sequelize.STRING,
    //     allowNull: true
    // },
    // name: {
    //     type: Sequelize.STRING,
    //     allowNull: true
    // },
    // age: {
    //     type: Sequelize.INTEGER,
    //     allowNull: true
    // },
    // salary: {
    //     type: Sequelize.INTEGER,
    //     allowNull: true
    // },
    // final_mvp: {
    //     type: Sequelize.INTEGER,
    //     allowNull: true
    // }
    club: Sequelize.STRING,
    name: Sequelize.STRING,
    age: Sequelize.INTEGER,
    salary: Sequelize.INTEGER,
    final_mvp: Sequelize.INTEGER
});





module.exports = { Player, sequelize, Sequelize };


// 그니까 한마디로 테이블이 정의되긴 하는데, 정의되기 이전에 생성이 호출되어 테이블이 없다고 뜨는 것이다. 
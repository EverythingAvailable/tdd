// const sqliteDB = require('../../models');
const models = require('../../models');
const sqliteHandler = require('../../handler');



exports.getPlayers =  async(req, res) => {
    if (req.query.limit === undefined) limit = players.length;
    else limit = parseInt(req.query.limit, 10); 
    if(Number.isNaN(limit)) return res.status(400).end();
    res.status(200);
    const attributes = ['club', 'name', ['age', 'how old is he?']]; // field값 제한
    const result = await sqliteHandler.getSqlites(models.Player, attributes, limit) 
    // 프라퍼티에 따라 유동적으로 매서드를 활용하면 된다.
    res.json(result).end();
    // await models.Player.findAll({}).then(players => {
    //         res.json(players);
    //     });
}; 

exports.getMvpPlayer =  async (req, res) => {
    const final_mvp = parseInt(req.params.final_mvp, 10);
    console.log(final_mvp);
    if (Number.isNaN(final_mvp)) return res.status(400).end();
    const queryParams = {
        final_mvp
    }
    const attributes = ['club', 'name', ['final_mvp', `who's the best?`]];
    // const player = players.filter( player => player.final_mvp === mvp);
    const result = await sqliteHandler.getSqlite(models.Player, queryParams, attributes);
    res.json(result).end();
    // models.Player.findAll({})
    //         .then(players => {
    //             res.json(players);
    //         });
    };


exports.deleteMvpPlayer =  async (req, res) => {
    const mvp = parseInt(req.params.mvp, 10);
    if (Number.isNaN(mvp)) res.status(400).end();
    // players =   players.filter( player => player.final_mvp !== mvp);
    queryParams = {
        mvp 
    }
    const result = await sqliteHandler.deleteSqlite(models.Player, queryParams);
    res.status(204).json(result).end();
};


exports.createPlayer =   async (req, res) => {
    // console.log(req);
    // const name = req.body.name;
    // const new_player = {club: 'bulls', age: 24, salary: 21, final_mvp: 0};
    const { club, name, age, salary, final_mvp } = req.body;
    if( !name ) {
        console.log('파라미터가 부족합니다');
        res.status(400).end();
    }
    const data = {
        club,
        name,
        age: Number(age),
        salary: Number(salary),
        final_mvp: Number(final_mvp)
    };
    const queryParams = {
        name
    }
    const NameConflictPlayer = await sqliteHandler.getSqlite(models.Player, queryParams);
    if (NameConflictPlayer) return res.status(409).end(); 
    const result = await sqliteHandler.createSqlite(models.Player, data);
    res.status(201);
    res.json(result).end();
};

exports. editPlayer =   async (req, res) => {
    const { id } = req.params;
    const findQueryParams = {
        id
    }
    const { club, name, age, salary, final_mvp } = req.body;
    const nameQueryParams = {
        name
    }
    const data = {
        club,
        name,
        age,
        salary,
        final_mvp
    }
    const tableName = models.Player;
    if (typeof club != 'string' || !name) return res.status(400).end(); // 이름이 없거나 클럽명이 숫자인 경우
    const AlreadyExistPlayer = await sqliteHandler.getSqlite(tableName, findQueryParams); // key값에 해당하는 데이터 존재여부 파악
    if ( !AlreadyExistPlayer ) return res.status(404).end(); // 데이터 미존재
    const CheckNameConflict = await sqliteHandler.getSqlite(tableName, nameQueryParams); // key값에 해당하는 데이터 존재여부 파악
    if ( CheckNameConflict ) return res.status(409).end(); // 이름 이미 존재하는 경우
    
    const result = await sqliteHandler.updateSqlite(tableName, data, findQueryParams);
    console.log(result);
    res.json(result).end();
};

// 데이터베이스 테이블을 ORM으로 추상화한 것을 모델이라 하며 이 모델을 통해 각종 매서드들에 접근하는 것이다.
// 모델을 정의하고(sequelize.define()) -> 정의된 모델과 데이터베이스를 연동한다. (sequelize.sync())

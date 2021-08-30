// const sqliteDB = require('../../models');
const models = require('../../models');

// dummy data
// players = [
//     {club: 'lakers', name: 'lebron', age: 36, salary: 38, final_mvp: 4},
//     {club: 'celtics', name: 'tatum', age: 23, salary: 28, final_mvp: 0},
//     {club: 'nets', name: 'durant', age: 32, salary: 41, final_mvp: 2},
//     {club: 'hawks', name: 'trae', age: 22, salary: 8, final_mvp: 0},
//     {club: 'mavs', name: 'doncic', age: 22, salary: 10, final_mvp: 0},
//     {club: 'clippers', name: 'kawai', age: 30, salary: 36, final_mvp: 2},
//     {club: 'raptors', name: 'siakam', age: 27, salary: 31, final_mvp: 0},
//     {club: 'heat', name: 'butler', age: 31, salary: 36, final_mvp: 0},
//     {club: 'jazz', name: 'mitchel', age: 24, salary: 28, final_mvp: 0},
//     {club: 'bucks', name: 'giannis', age: 26, salary: 38, final_mvp: 1},
//     {club: 'knicks', name: 'walker', age: 33, salary: 32, final_mvp: 0},
// ];






exports.getPlayers =  async(req, res) => {
    if (req.query.limit === undefined) limit = players.length;
    else limit = parseInt(req.query.limit, 10); 
    if(Number.isNaN(limit)) return res.status(400).end();
    res.status(200);
    // await models.Player.findAll({}).then(players => {
    //         res.json(players);
    //     });
}; 

exports.getMvpPlayer =  (req, res) => {
    const mvp = parseInt(req.params.mvp, 10);
    if (Number.isNaN(mvp)) return res.status(400).end();
    // models.Player.findAll({})
    //         .then(players => {
    //             res.json(players);
    //         });
    };


exports.deleteMvpPlayer =   (req, res) => {
    const mvp = parseInt(req.params.mvp, 10);
    players =   players.filter( player => player.final_mvp !== mvp);
    if (Number.isNaN(mvp)) res.status(400).end();
    res.status(204).end();
};


exports.createPlayer =   (req, res) => {
    // console.log(req);
    const name = req.body.name;
    const new_player = {club: 'bulls', age: 24, salary: 21, final_mvp: 0};
    const AlreadyExistPlayer =   players.filter( player => player.name == name).length;
    if (!name) return res.status(400).end();
    if (AlreadyExistPlayer) return res.status(409).end(); 
    new_player.name = name;
    players.push(new_player);
    const data = { club:'bulls', name, age: 23, salary: 24, final_mvp: 0 };
    res.status(201);
    res.json(new_player).end();
    res.end();
};

exports. editPlayer =   (req, res) => {
    const name = req.body.name;
    if (typeof name != 'string' || !name) return res.status(400).end();
    const AEplayer =   players.filter( player => player.name == name);
    if ( AEplayer.length != 0) return res.status(409).end();
    const club = req.query.club
    const playerList =  players.filter( player => player.club == club );
    if (playerList.length === 0) return res.status(404).end();
    const player = playerList[0];
    player.name = name;
    res.json(player).end();
};

// 데이터베이스 테이블을 ORM으로 추상화한 것을 모델이라 하며 이 모델을 통해 각종 매서드들에 접근하는 것이다.
// 모델을 정의하고(sequelize.define()) -> 정의된 모델과 데이터베이스를 연동한다. (sequelize.sync())

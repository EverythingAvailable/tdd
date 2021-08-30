/*node.js 총정리*/
/*~ section 4*/
/*
const express = require('express');
const morgan = require('morgan'); // server에 로그를 남겨준다. 클라가 요청을 보낼 시 상태코드 - 걸린시간 - response용량 을 찍어주는 역할.

const app = express();
// middleware는 next()를 호출해줘야한다.


// 일반미들웨어
function commonMw(req, res ,next) {
    console.log('commonmw');
    next(new Error('error occured'));
}

// 에러미들웨어
function commonMw2(err, req, res, next) {
    if (err) {
        console.log(err.message);
    }
    next();
}

app.use(commonMw);
app.use(commonMw2);

app.use(morgan('dev'));



app.listen(3000, () => {
    console.log('server is running..')
})
*/ 

// npm init -> npm i middleware --save-dev : node_modules file / package.json file
// cat filename -> show file contents in terminal
// rm -rf node_modules -> delete node_modules file
/* http 상태코드 
1. 1xx : pending
2. 2xx : 성공(200, ...and so forth)
3. 3xx : 다른 곳으로 튕겨버리기
4. 4xx : 너 요청 잘못됨 (400 : bad request / 401 : unauthorized / 404 : notfound / 409 : conflict - alreadyexist error)
5. 5xx : server erorr(우리 서버가 잘못됨..!)
*/

// 호출 in terminal : curl -X GET(method) 'address' -v(detail)
// tdd를 위한 세가지 라이브러리 : mocha should supertest
// mocha : 테스트를 돌려주는 테스트 러너, 테스트수트는 describe() 로 테스트케이스는 it()로 만들어준다.

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const player = require('./api/player/router.js');
const record = require('./record');

if (process.env.NODE_ENV != 'test') {
    app.use(morgan('dev')); // 로그를 찍어준당
}


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

/* app.get('/players', (req, res) => {
    const limit = parseInt(req.query.limit) || players.length;
    if (Number.isNaN(limit)) return res.status(400).end();
    else limit ? res.json(players.slice(0,limit)) : res.json(players);
}); 

app.get('/players/:mvp', (req, res) => {
    const mvp = parseInt(req.params.mvp, 10);
    if (Number.isNaN(mvp)) return res.status(400).end();
    const player = players.filter( player => player.final_mvp === mvp)[0];
    if (player.length == 0) return res.status(404).end();
    res.json(player).end();
    });

app.delete('/players/:mvp', (req, res) => {
    const mvp = parseInt(req.params.mvp, 10);
    players = players.filter( player => player.final_mvp !== mvp);
    if (Number.isNaN(mvp)) res.status(400).end();
    res.status(204).end();
});


app.post('/players', (req, res) => {
    const name = req.body.name;
    const new_player = {club: 'bulls', age: 24, salary: 21, final_mvp: 0};
    const AlreadyExistPlayer = players.filter( player => player.name == name).length;
    if (!name) return res.status(400).end();
    if (AlreadyExistPlayer) return res.status(409).end(); 
    new_player.name = name;
    players.push(new_player);
    res.status(201);
    res.json(new_player).end();
});

app.put('/players', (req, res) => {
    const name = req.body.name;
    if (typeof name != 'string' || !name) return res.status(400).end();
    const AEplayer = players.filter( player => player.name == name);
    if ( AEplayer.length != 0) return res.status(409).end();
    const club = req.query.club
    const playerList = players.filter( player => player.club == club );
    if (playerList.length === 0) return res.status(404).end();
    const player = playerList[0];
    player.name = name;
    res.json(player).end();
});
*/



app.use('/players', player);
module.exports = app; // for supertest

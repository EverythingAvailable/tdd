// 이걸 handler 파일에 묶어서 미들웨어처럼 사용할 수 있지 않을까??
const push = ( data ) => {
    players.push( data );
};

const deletion = (club, name) => {
    players = players.filter( player => !(player.club === club && player.name === name));
    console.log(players);
};

const edit = (club, name, data) => {
    player = players.filter(player => player.club === club && player.name === name);
    player = data;
};

module.exports = { push, deletion, edit };

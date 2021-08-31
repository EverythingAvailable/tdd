const request = require('supertest');
const app = require('../../server');
const should = require('should')
const models = require('../../models');




 describe('GET : /players는', () => {
    before( () => models.sequelize.sync({}));
     describe('성공 시', () => {
         it('player list를 반환한다.', (done) => {
             request(app)
                .get('/players')
                .end((err, res) => {
                    if(err) throw err;                                
                    res.body.should.be.instanceOf(Array); 
                    done();               
                });
         });
         it('최대 limit갯수만큼 응답한다.', (done) => {
             request(app)
                .get('/players?limit=3')
                .end((err, res) => {
                    if (err) throw err;
                    res.body.should.have.lengthOf(3)
                    done();
                });
         });
     });
     describe('실패 시', () => {
         it('limit이 숫자형이아니면 400을 응답한다.', (done) => {
             request(app)
                .get('/players?limit=three')
                .expect(400, done);
                /* .end((err, res) => {
                    if (err) throw err; // expect에서 발생하는 error가 end매서드로 던져진 것. 따라서 throw처리를 하지 않으면 에러가 처리되지 않음.
                    done();
                });
                */
         });
     });
 });

 describe('GET : /players:mvp 는', () => {
     describe('성공 시', () => {
         it('mvp가 2인 객체를 반환한다.', (done) => {
             request(app)
                .get('/players/2')
                .end((err, res) => {
                    if(err) throw err;
                    res.body.should.have.property(`who's the best?`, 2);
                    done();
                });
         });
     });
 });



describe('DELETE : /players/:mvp는', () => {
    before( () => models.sequelize.sync({}));
    describe('성공 시', () => {
        it('상태코드 204를 반환한다.', (done) => {
            request(app)
               .delete('/players/6')
               .expect(204)
               .end((err, res) => {
                   done();
               });
        });
    });
    describe('실패 시', () => {
        it('mvp가 숫자가 아니면 상태코드 400을 반환한다.', async () => {
            await request(app)
               .delete('/players/four')
               .expect(400)
        });
    });
});

describe('POST : /players 는', () => {
    before( () => models.sequelize.sync({}));
    describe('성공 시', () => {
        let body;
        before(done => {
            request(app)
               .post('/players')
               .send({
                   club: 'pistons',
                   name: 'cunningham',
                   age: 19,
                   salary: 10,
                   final_mvp: 0
                })
               .expect(201)
               .end((err, res) => {
                   if (err) throw err;
                   body = res.body;
                   done();  
               });
        });
        it('입력한 이름을 반환한다.', () => {
            body.should.have.property('name', 'cunningham');
        });
        it('생성된 유저객체를 반환한다.', () => {
            body.should.be.instanceOf(Object); // 객체를 반환한다.
        });
    });
    describe('실패 시', () => {
        it('이름 누락 시 400을 반환한다.', done => {
            request(app)
               .post('/players')
               .send({
                   club: 'cleveland',
                   age: 33,
                   salary: 24,
                   final_mvp: 0
               })
               .expect(400)
               .end(done);
        });
        it('name이 중복일 경우 409를 반환한다.', done => {
            request(app)
               .post('/players')
               .send({
                   club: 'celtics',
                   name: 'durant',
                   age: 33,
                   salary: 33,
                   final_mvp: 0
                })
               .expect(409)
               .end(done);
        });
    });
});

describe.only('PUT : /players 은', () => {
    before( () => models.sequelize.sync({})); // sequelize와 동기화(return 으로 비동기 처리)
    describe('성공 시', () => {
        data1 = {
            club: 'jazz',
            name: 'ingles',
            age: 29,
            salary: 20,
            final_mvp:0,  
        }
        it('변경된 정보를 응답한다.', done => {
            request(app)
               .put('/players/1')
               .send(data1)
               .end((err, res) => {
                   if (err) throw err;                   
                   res.body.should.have.property('name', 'ingles');
                   done();
               });
        });
    });
    describe('실패 시', () => {
        data2 = {
            club: 3,
            name: 'Russ',
            age: 32,
            salary: 42,
            final_mvp: 0        
        }
        it('문자열이 아닌 club일 경우 400을 응답', done => {
            request(app)
               .put('/players/1')
               .send(data2)
               .expect(400)
               .end(done);
        });
        data3 = {
            club: 'lakers',
            age: 23,
            salary: 30,
            final_mvp: 0        
        }
        it('name이 없을 경우 400 응답', done => {
            request(app)
               .put('/players/1')
               .send(data3)
               .expect(400)
               .end(done);
        });
        data4 = {
            club: 'GSW',
            name: 'curry',
            age: 33,
            salary: 25,
            final_mvp: 0        
        }
        it('조건에 맞는 선수가 없을 경우 404 응답', done => {
            request(app)
               .put('/players/100')
               .send(data4)
               .expect(404)
               .end(done);
        });
        data5 = {
            club: 'lakers',
            name: 'doncic',
            age: 31,
            salary: 25,
            final_mvp: 0        
        }
        it('이름이 중복일 경우 409 응답', done => {
            request(app)
               .put('/players/2')
               .send(data4)
               .expect(409)
               .end(done);
        });
    });
});
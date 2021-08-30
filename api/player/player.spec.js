const request = require('supertest');
const app = require('../../server');
const should = require('should')
const models = require('../../models');




 describe('GET : /players는', () => {
     describe('성공 시', () => {
         before( () => models.sequelize.sync({force:true}));
         it.only('player list를 반환한다.', (done) => {
             return request(app)
                .get('/players')
                .end((err, res) => {
                    if(err) throw err;                                
                    res.body.should.be.instanceOf(Array); 
                    done();               
                });
         });
         it('최대 limit갯수만큼 응답한다.', (done) => {
             request(app)
                .get('/players?limit=2')
                .end((err, res) => {
                    if (err) throw err;
                    res.body.should.have.lengthOf(2)
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
         it('mvp가 4인 객체를 반환한다.', (done) => {
             request(app)
                .get('/players/4')
                .end((err, res) => {
                    if(err) throw err;
                    res.body[0].should.have.property('final_mvp', 4);
                    done();
                });
         });
     });
 });



describe('DELETE : /players/:mvp는', () => {
    describe('성공 시', () => {
        it('상태코드 204를 반환한다.', (done) => {
            request(app)
               .delete('/players/4')
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
    describe('성공 시', () => {
        let body;
        before(done => {
            request(app)
               .post('/players')
               .send({name: 'ball'})
               .expect(201)
               .end((err, res) => {
                   if (err) throw err;
                   body = res.body;
                   done();  
               });
        });
        it('입력한 이름을 반환한다.', () => {
            body.should.have.property('name', 'ball');
        });
        it('생성된 유저객체를 반환한다.', () => {
            body.should.have.property('club', 'bulls');
        });
    });
    describe('실패 시', () => {
        it('파라매터 누락 시 400을 반환한다.', done => {
            request(app)
               .post('/players')
               .send({})
               .expect(400)
               .end(done);
        });
        it('name이 중복일 경우 409를 반환한다.', done => {
            request(app)
               .post('/players')
               .send({name: 'tatum'})
               .expect(409)
               .end(done);
        });
    });
});

describe('PUT : /players 은', () => {
    describe('성공 시', () => {
        const name = 'zrue';
        it('변경된 name을 응답한다.', done => {
            request(app)
               .put('/players?club=bucks')
               .send({name})
               .end((err, res) => {
                   if (err) throw err;                   
                   res.body.should.have.property('name', 'zrue');
                   done();
               });
        });
    });
    describe('실패 시', () => {
        const name = 'howard';
        it('문자열이 아닌 club일 경우 400을 응답', done => {
            request(app)
               .put('/players?club=4')
               .send(name)
               .expect(400)
               .end(done);
        });
        it('name이 없을 경우 400 응답', done => {
            request(app)
               .put('/players?club=nets')
               .send()
               .expect(400)
               .end(done);
        });
        it('없는 클럽일 경우 404 응답', done => {
            request(app)
               .put('/players?club=w')
               .send({ name: 'howard' })
               .expect(404)
               .end(done);
        });
        it('이름이 중복일 경우 409 응답', done => {
            request(app)
               .put('/players?club=knicks')
               .send({ name: 'tatum'})
               .expect(409)
               .end(done);
        });
    });
});
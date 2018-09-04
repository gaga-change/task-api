const {app, db} = require('../app')
const server = app.listen()
const request = require('supertest').agent(server)

describe('Index Page', function indexPage () {
    const successCode = 200

    after(function after () {
        server.close()
        db.close()
    })

    it('should say "Hello World"', function index (done) {
        request.
            get('/').
            expect(successCode).
            expect('我的清单 - 接口', done)
    })
})
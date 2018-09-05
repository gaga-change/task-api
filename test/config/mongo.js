require('should')
const config = require('../../config/mongo')

describe('config mongo.js', function mian () {
    it('前缀拼接校验', function check () {
        if (config.mongodbUsername) {
            config.getUserPwd().should.not.be.empty()
        } else {
            const copy = Object.create(config)

            copy.mongodbUsername = 'a'
            copy.mongodbPassword = 'b'
            copy.getUserPwd().should.be.eql('a:b@')
        }
    })
})
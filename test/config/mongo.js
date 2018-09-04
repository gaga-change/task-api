require('should')
const config = require('../../config/mongo')

describe('config mongo.js', function mian () {
    if ('"mongodbUsername" is empty', function () {
        if (config.mongodbUsername === '' || config.mongodbPassword === '') {
            config.mongodbPassword
        }
    })
})

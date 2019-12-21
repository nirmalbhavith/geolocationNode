var supertest = require('supertest');
var chai = require('chai');
var app  = require('../server');

global.app = app;
global.expect = chai.expect;
global.request = supertest(app);

describe('POST /nearby/location/search', function() {
    it('Testing Geolocation api', function(done) {
        request.post('/nearby/location/search')
            .send({
                lang: 'en',
                lat: '-33.8670522',
                long:'151.1957362',
                customer_name:'cruise',
                radius:1500
            })
            .expect(200)
            .end(function(err, res) {
                done(err);
            });
    });
});
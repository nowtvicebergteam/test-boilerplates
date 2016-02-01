var sinon = require('sinon'),
    DiffService = require('./service'),
    DiffModel = require('./model'),
    expect = require('chai').expect;

describe('Diff Service', function () {

    var sandbox;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('find returns a 200 and a list of all Diffs if successful', function (done) {
        var findStub = sandbox.stub(DiffModel, 'find').yields(null, [
            {
                _id: 1,
                name: 'test1'
            },
            {
                _id: 2,
                name: 'test2'
            }
        ]);
        DiffService.find('someName', function (statusCode, results) {
            expect(findStub.calledOnce).to.be.true;
            expect(statusCode).to.equal(200);
            expect(results.length).to.equal(2);
            done();
        });
    });

});
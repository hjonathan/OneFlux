var chai = require('chai'),
    sinon = require('sinon'),
    expect = chai.expect,
    assert = chai.assert,
    Container = require("./../src/ContainerBase");

describe('ContainerBase', function () {
    var con;
    beforeEach(function () {
        con = new Container();
    });

    it('add() - findByKey()', function (done) {
        var obj = {
            id: "one"
        };
        con.add(obj);
        expect(con.findByKey("id", "one")).to.be.equal(obj);
        done();
    });
});
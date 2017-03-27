var chai = require('chai'),
    sinon = require('sinon'),
    expect = chai.expect,
    assert = chai.assert,
    OneFlux = require("./../src/OneFlux");

describe('ActionBus', function () {
    var con;
    beforeEach(function () {
        con = OneFlux.service("ActionBus");
    });

    it('init()', function (done) {
        done();
    });
});
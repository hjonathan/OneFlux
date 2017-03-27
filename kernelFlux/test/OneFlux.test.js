var chai = require('chai'),
    sinon = require('sinon'),
    expect = chai.expect,
    assert = chai.assert,
    OneFlux = require("./../src/OneFlux");

describe('OneFlux', function () {
    var con;
    beforeEach(function () {
        con = OneFlux;
    });

    it('module()', function (done) {
        var v = {
            value: "one"
        };
        con.module("test", v);
        expect(con.module("test")).to.be.equal(v);
        done();
    });
    it('factory()', function (done) {
        var ex,
            fn = function () {
                this.init = function () {
                    return "test";
                };
            };
        con.factory("fact1", [], fn);
        ex = con.factory("fact1");
        expect(ex.init()).to.be.equal("test");
        done();
    });
    it('service()', function (done) {
        var obj = {
                label: "test"
            },
            fn = function () {
                return obj;
            },
            ex;

        con.service("serv1", [], fn);
        ex = con.service("serv1");
        expect(ex).to.be.equal(obj);
        done();
    });
});
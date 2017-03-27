var chai = require('chai'),
    sinon = require('sinon'),
    expect = chai.expect,
    assert = chai.assert,
    Component = require("./../src/ComponentBase");

describe('ComponentBase', function () {
    var con, bon;
    beforeEach(function () {
        con = new Component();
        bon = new Component();
    });

    it('addComponent()', function (done) {
        var cb = function (a) {
                a++;
                return a;
            },
            coll;

        con.addComponent("login", cb);
        coll = con.collection;
        expect(coll[0].id).to.be.equal("login");
        expect(coll[0].component).to.be.equal(cb);
        done();
    });

    it('getComponent()', function (done) {
        var cb = function (a) {
            a++;
            return a;
        };

        con.addComponent("login", cb);
        expect(con.getComponent("login")).to.be.equal(cb);
        done();
    });

    it('set()', function (done) {
        var v = {
            value: "value",
            label: "label"
        };
        con.set("one", "SET");
        expect(con.data.one).to.be.equal("SET");
        con.set("two", v);
        expect(con.data.two).to.be.equal(v);
        done();
    });

    it('get()', function (done) {
        var v = {
            value: "value",
            label: "label"
        };
        con.set("one", "SET");
        expect(con.get("one")).to.be.equal("SET");
        con.set("two", v);
        expect(con.get("two")).to.be.equal(v);
        done();
    });
    it('setId()', function (done) {
        con.setId("TEST");
        expect("TEST").to.be.equal(con.id);
        done();
    });

    it('getId()', function (done) {
        con.setId("SET");
        expect(con.getId()).to.be.equal("SET");
        done();
    });

    it('setParent()', function (done) {
        var p = {
            value: "value"
        };
        con.setParent(p);
        expect(con.parent).to.be.equal(p);
        done();
    });

    it('getParent()', function (done) {
        var p = {
            value: "value"
        };
        con.setParent(p);
        expect(con.getParent()).to.be.equal(p);
        done();
    });

    it('dispatch()', function (done) {
        var p = {
            value: "value"
        };
        con.on("action", function (obj) {
            expect(obj).to.be.equal(p);
        });
        bon.on("action", function (obj) {
            expect(obj).to.be.equal(p);
        });
        con.addComponent("bon", bon);
        con.dispatch("action", p);
        done();
    });

    it('dispatchParent()', function (done) {
        var p = {
            label: "label"
        };
        con.on("action1", function (obj) {
            expect(obj).to.be.equal(p);
        });
        bon.on("action1", function (obj) {
            expect(obj).to.be.equal(p);
        });
        con.addComponent("bon", bon);
        bon.dispatchParent("action1", p);
        done();
    });
});
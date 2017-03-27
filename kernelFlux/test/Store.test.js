var chai = require('chai'),
    sinon = require('sinon'),
    expect = chai.expect,
    assert = chai.assert,
    Store = require("./../src/Store");

describe('Store.js', function () {
    var st,
        testID = "testid";

    beforeEach(function () {
        st = new Store({
            id: testID,
            state: {}
        });
    });

    it('setID() -- getID()', function (done) {
        expect(testID).to.be.equal(st.getId());
        st.setId("Testj");
        expect("Testj").to.be.equal(st.getId());
        done();
    });

    it('adopt() -- getChilds()', function (done) {
        var childs,
            st2 = new Store({
                id: "test1"
            });
        st.adopt(st2);
        childs = st.getChilds();
        expect(childs.length).to.be.equal(1);
        expect(childs[0]).to.be.equal(st2);
        done();
    });


    it('getReducers()', function (done) {
        var reducers,
            cb = function (state, action) {
            };

        st.addReducer("action1", cb);
        reducers = st.getReducers();
        expect(reducers.length).to.be.equal(1);
        expect(reducers[0].type).to.be.equal("action1");
        expect(reducers[0].callback).to.be.equal(cb);
        done();
    });

    it('dispatch() -- subscribe()', function (done) {
        var action1 = "actionone",
            action2 = "actiontwo",
            actiond1 = {
                type: "actionone",
                data: {
                    myVar: "myVar"
                }
            },
            actiond2 = {
                type: "actiontwo",
                data: {
                    myVar: "myVar"
                }
            },
            callback = function (actionInput, newState) {
                expect(actionInput).to.be.equal(actiond1);
                expect(newState).to.be.an('array');
            },
            callback1 = function (actionInput, newState) {
                expect(actionInput).to.be.equal(actiond1);
                expect(newState).to.be.an('array');
            },
            callback2 = function (actionInput, newState) {
                expect(actionInput).to.be.equal(actiond2);
                expect(newState).to.be.an('array');
            };
        st.subscribe(action1, callback);
        st.subscribe(action1, callback1);
        st.subscribe(action2, callback2);
        st.dispatch(actiond1);
        st.dispatch(actiond2);
        done();
    });
});
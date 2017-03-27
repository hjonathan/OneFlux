const uuid = require('node-uuid'),
    Immutable = require("immutable"),
    Event = require("events"),
    _ = require("lodash");

var Store = function (options) {
    var that = this,
        id = uuid.v1(),
        emitter = new Event.EventEmitter(),
        childs = [],
        reducers = [],
        listeners = [],
        parent = null,
        state = Immutable.Map({}),
        initialize = function () {
        };

    this.init = function (options) {
        if (_.isObject(options)) {
            that.setId(options.id);
            that.setInitState(options.state);
        }
        initialize(options);
    };

    /**
     * Set a initialize callback
     * @param init
     */
    this.setInitialize = function (init) {
        initialize = _.isFunction(init) ? init : initialize;
    };

    /**
     * Set a new ID in a store
     * @param newId
     */
    this.setId = function (newId) {
        id = _.isString(newId) ? newId : id;
    };

    /**
     * Set a init state in store
     * @param newId
     */
    this.setInitState = function (st) {
        state = _.isObject(st) ? Immutable.Map(st) : Immutable.Map({});
    };

    /**
     * Return a ID
     * @param newId
     */
    this.getId = function (newId) {
        return id;
    };

    /**
     * add a child a new store
     * @param newId
     */
    this.adopt = function (child) {
        var nChild;
        if (child instanceof Store) {
            childs.push(child);
            child.setParent(this);
        } else if (_.isObject(child)) {
            nChild = new Store(child);
            childs.push(nChild);
            nchild.setParent(this);
        }
    };

    /**
     * set a New Parent to this store
     * @param newId
     */
    this.setParent = function (newParent) {
        if (newParent instanceof Store) {
            parent = newParent;
        }
    };

    /**
     * Return the childs
     * @returns {Array|List<T>}
     */
    this.getChilds = function () {
        return childs;
    };

    /**
     * add a new Reducers into store
     * @param newId
     */
    this.addReducer = function (action, callback) {
        var obj = {};
        if (_.isString(action) && _.isFunction(callback)) {
            obj[action] = callback;
            reducers.push({
                type: action,
                callback: callback
            });
        }
    };

    /**
     * get all Reducers
     * @param newId
     */
    this.getReducers = function () {
        return reducers;
    };

    /**
     * Set listener for each action
     * @param newId
     */
    this.subscribe = function (channel, callback) {
        if (_.isString(channel) && _.isFunction(callback)) {
            emitter.on(channel, callback);
        }
        return this;
    };

    /**
     * Emit the action
     * @param newId
     */
    this.dispatch = function (channel, payload) {
        emitter.emit(channel, payload);
        return this;
    };

    /**
     * Emit the action
     * @param newId
     */
    this.dispatchFromParent = function (action, parentState) {
        var states = [state];
        states.concat(parentState);
        if (_.isObject(action) && action.type) {
            that.callReducers(action, states);
            states = [state].concat(parentState);
            that.callListeners(action, states);
            that.callToChilds(action, states);
        }
    };

    /**
     * Emit the action
     * @param newId
     */
    this.dispatchParent = function (action) {
        if (_.isObject(action) && action.type) {
            parent.dispatch(action);
        }
    };


    /**
     * Call the all listeners
     * @param newId
     */
    this.callListeners = function (action, states) {
        var index,
            arrayList = _.filter(listeners, function (o) {
                return action.type === o.type ? true : false;
            });

        for (index = 0; index < arrayList.length; index += 1) {
            if (arrayList[index].callback) {
                arrayList[index].callback(action, states);
            }
        }
    };

    /**
     * Call the all listeners
     * @param newId
     */
    this.callReducers = function (action, states) {
        var index,
            newState,
            arrayList = _.filter(reducers, function (o) {
                return action.type === o.type ? true : false;
            });
        for (index = 0; index < arrayList.length; index += 1) {
            if (arrayList[index].callback) {
                newState = arrayList[index].callback.call(that, action, states);
                if (newState) {
                    state = newState;
                }
            }
        }
    };

    /**
     * Call to the childs dispatch
     * @param newId
     */
    this.callToChilds = function (action, states) {
        var index;
        if (_.isArray(childs) && childs.length > 0) {
            for (index = 0; index < childs.length; index += 1) {
                childs[index].dispatchFromParent(action, states);
            }
        }
    };

    /**
     * Call to the childs dispatch
     * @param newId
     */
    this.destroy = function (bool) {
        if (parent instanceof Store) {
            parent.removeChild(this, bool);
        }
    };

    /**
     * Call to the childs dispatch
     * @param newId
     */
    this.getState = function () {
        return state;
    };

    /**
     * Call to the childs dispatch
     * @param newId
     */
    this.removeChild = function (childStore) {
        var evens = _.remove(childs, function (n) {
            if (childStore instanceof Store) {
                return n.getId() === childStore.getId();
            } else if (_.isString(childStore)) {
                return n.getId() === childStore;
            }
        });
    };

    this.init(options);
};

module.exports = Store;
const _ = require("lodash"),
    Event = require("events"),
    Emitter = new Event.EventEmitter();

var ContainerBase = function (options) {
    ContainerBase.prototype.init.call(this, options);
};

_.extend(ContainerBase.prototype, Emitter);
_.extend(ContainerBase.prototype, {
    /**
     * Init method
     * @param options
     * @returns {ContainerBase}
     */
    init: function (options) {
        this.collection = [];
        return this;
    },
    /**
     * Add a some object to this container
     * @param obj
     * @returns {ContainerBase}
     */
    add: function (obj) {
        this.collection.push(obj);
        return this;
    },
    /**
     * Find a object from key & value
     * @param key
     * @param alias
     * @returns {*}
     */
    findByKey: function (key, alias) {
        var el;
        if (_.isString(alias)) {
            el = _.find(this.collection, function (o) {
                if (o[key]) {
                    return o[key] === alias;
                }
            });
        }
        return el;
    },
    /**
     * Find a object from callbcak
     * @param callback
     * @returns {*}
     */
    find: function (callback) {
        var el;
        if (_.isFunction(callback)) {
            el = _.find(this.collection, callback);
        }
        return el;
    }
});

module.exports = ContainerBase;
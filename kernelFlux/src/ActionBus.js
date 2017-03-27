const _ = require("lodash"),
    Event = require("events"),
    uuid = require('node-uuid'),
    Emitter = new Event.EventEmitter();

var ActionBus = function (options) {
    ActionBus.prototype.init.call(this, options);
};

_.extend(ActionBus.prototype, Emitter);
_.extend(ActionBus.prototype, {
    init: function (options) {

    },
    subscribe: function (action, callback) {
        this.on(action, callback);
        return this;
    },
    dispatch: function (action, data) {
        this.emit(action, data);
        return this;
    }
});

module.exports = ActionBus;

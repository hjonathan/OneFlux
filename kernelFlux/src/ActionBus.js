const _ = require("lodash"),
    Event = require("events"),
    uuid = require('node-uuid'),
    Emitter = new Event.EventEmitter();

/**
 * Based in Postal js, xNgel is an advanced eventBus
 */
var xNgel = function (options) {
    xNgel.prototype.init.call(this, options);
};

_.extend(xNgel.prototype, Emitter);
_.extend(xNgel.prototype, {
    init: function (options) {

    },
    publish: function (){

    },
    subscribe: function (){

    }
});

module.exports = xNgel;

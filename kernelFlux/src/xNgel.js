const _ = require("lodash"),
    Event = require("events"),
    uuid = require('node-uuid');
/**
 * Normal publish
 * eventBus.publish({
 *     channel: "orders",
 *     topic: "item.add",
 *     data: {
 *         sku: "AZDTF4346",
 *         qty: 21
 *     }
 * })
 *
 * Normal Subscribe
 * eventBus.subscribe({
 *      channel: "orders",
 *      topic: "item.add",
 *      callback: function(data, envelope) {
 *    }
 * });
 *
 * waitFor Subscribe
 * waitFor Subscribe
 * this.waitFor({
 * events : [
 *    {
 *      channel: "orders",
 *      topic: "item.add",
 *    },
 *    {
 *      channel: "orders",
 *      topic: "item.add",
 *    }
 *  ],
 * callback : function (){
 *  }

 */

/**
 * Based in Postal js, xNgel is an advanced eventBus
 */
var xNgel = function (options) {
    this.eventBus = null;
    this.collectionWaitFor = [];
    xNgel.prototype.init.call(this, options);
};

_.extend(xNgel.prototype, {
    init: function (options) {
        this.eventBus = options && options.eventBus ? options.eventBus : null;
        return this;
    },

    publish: function (config) {
        return this.eventBus.publish(config);
    },
    subscribe: function (config) {
        return this.eventBus.subscribe(config);
    },
    /**
     * WaitFor generals
     * @param config
     */
    waitFor: function (config) {
        var conf = {
                counter: 0,
                data: []
            },
            that = this;
        if (_.isObject(config) && _.isArray(config.events) && _.isFunction(config.callback)) {
            _.extend(conf, config);
            this.collectionWaitFor.push(conf);
            _.each(config.events, function (value, index) {
                var event = {};
                _.extend(event, value);
                event.callback = that.handlerWaitFor();
                that.eventBus.subscribe(event);
            });
        }
    },
    handlerWaitFor: function () {
        var that = this;
        return function (data, envelope) {
            var evs = _.filter(that.collectionWaitFor, function (obj, index) {
                var flag = true,
                    event = _.find(obj.events, {
                        channel: envelope.channel,
                        topic: envelope.topic
                    });
                if (event) {
                    event.data = envelope.data;
                }
                _.each(obj.events, function (ev, i) {
                    if (ev && !ev.hasOwnProperty("data")) {
                        flag = false;
                    }
                });
                return flag;
            });

            _.each(evs, function (evss) {
                    if (_.isFunction(evss.callback)) {
                        evss.callback(evss.events);
                    }
                    _.each(evss.events, function (evr, index) {
                        if (evr && !evr.hasOwnProperty("data")) {
                            delete evr.data;
                        }
                    });
                }
            );
        };
    }
});

module.exports = xNgel;
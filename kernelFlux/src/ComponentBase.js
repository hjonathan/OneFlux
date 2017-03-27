const _ = require("lodash"),
    Event = require("events"),
    uuid = require('node-uuid');

var ComponentBase = function (options) {
    ComponentBase.prototype.init.call(this, options);
};

_.extend(ComponentBase.prototype, {
    /**
     * Init method
     * @param options
     * @returns {ComponentBase}
     */
    init: function (options) {
        var emitter = new Event.EventEmitter();
        _.extend(this, emitter);
        this.data = {};
        this.parent = null;
        this.id = options && options.id ? options.id : uuid.v1();
        this.collection = [];
        return this;
    },
    /**
     * Set id component
     * @param id
     * @returns {ComponentBase}
     */
    setId: function (id) {
        this.id = _.isString(id) ? id : this.id;
        return this;
    },
    /**
     *Return the id from the component
     * @returns {*}
     */
    getId: function () {
        return this.id;
    },
    /**
     * Add a new component a this object
     * @param alias
     * @param el
     * @returns {ComponentBase}
     */
    addComponent: function (alias, el) {
        this.collection.push({
            id: alias,
            component: el
        });
        if (el.setParent) {
            el.setParent(this);
        }
        return this;
    },
    /**
     * Returns a component by Id or alias
     * @param alias
     * @returns {*}
     */
    getComponent: function (alias) {
        var el,
            arr = [],
            that = this;

        if (_.isString(alias)) {
            el = _.find(this.collection, function (o) {
                return o.id === alias;
            });
            return el.component;
        }
        if (_.isArray(alias)) {
            _.each(alias, function (value) {
                el = _.find(that.collection, function (o) {
                    return o.id === value;
                });
                arr.push(el.component);
            });
            return arr;
        }
        return null;
    },
    /**
     * Remoce a component by alias
     * @param alias
     */
    removeComponent: function (alias) {
        var evens = _.remove(this.collection, function (n) {
            return n.id == alias;
        });
    },
    /**
     * Get the data by key
     * @param key
     * @returns {*}
     */
    get: function (key) {
        return this.data[key];
    },
    /**
     * Set a some data by key
     * @param key
     * @param value
     * @returns {ComponentBase}
     */
    set: function (key, value) {
        this.data[key] = value;
        return this;
    },
    /**
     * Set a parent component
     * @param parent
     * @returns {ComponentBase}
     */
    setParent: function (parent) {
        if (_.isObject(parent)) {
            this.parent = parent;
        }
        return this;
    },
    /**
     * Get parent component
     * @returns {null|*}
     */
    getParent: function () {
        return this.parent;
    },
    /**
     * Dispatch the action from this component to childs
     * @param action
     * @param obj
     * @returns {ComponentBase}
     */
    dispatch: function (action, obj) {
        this.emit(action, obj);
        _.each(this.collection, function (value, index) {
            if (value.component) {
                value.component.dispatch(action, obj);
            }
        });
        return this;
    },
    /**
     * Dispatch the action to parent from this component
     * @param action
     * @param obj
     */
    dispatchParent: function (action, obj) {
        if (this.parent && this.parent.dispatch) {
            this.parent.dispatch(action, obj);
        }
    }
});

module.exports = ComponentBase;

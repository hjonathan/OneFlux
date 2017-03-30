const _ = require("lodash"),
    postal = require("postal"),
    Comp = require("./ComponentBase"),
    Cont = require("./ContainerBase");


function get_params(func, options) {
    var text = func.prototype.initOne.toString();
    var open = text.indexOf("(");
    var close = text.indexOf(")");
    var params_text = text.substring(open + 1, close);
    var param_names = _(params_text.split(","))
        .map(function (param_name) {
            param_name = param_name.trim();
            return param_name === "" ? null : param_name;
        })
        .compact()
        .value();

    var params = _.map(param_names, function (param_name) {
        var res;
        res = OneFlux.containerServices.findByKey("id", param_name);
        if (res && res.element) {
            res = res.element;
        }
        if (param_name === "options") {
            res = options;
        }
        return res;
    });

    return params;
};

var OneFlux = {
    containerServices: new Cont(),
    containerFactory: new Cont(),
    containerComponents: new Cont(),
    /**
     * Add o get a object service
     * @param alias
     * @param obj
     * @returns {*}
     */
    service: function (alias, obj) {
        var res;
        if (_.isObject(obj)) {
            OneFlux.containerServices.add({
                id: alias,
                type: "service",
                element: obj
            });
        } else {
            res = OneFlux.containerServices.findByKey("id", alias);
            if (res && res.element) {
                res = res.element;
            }
            return res;
        }
    },
    /**
     * Add o get a object component
     * @param alias
     * @param obj
     * @returns {*}
     */
    component: function (alias, obj) {
        var res;
        if (_.isObject(obj)) {
            OneFlux.containerComponents.add({
                id: alias,
                element: obj
            });
        } else {
            res = OneFlux.containerComponents.findByKey("id", alias);
            if (res && res.element) {
                res = res.element;
            }
            return res;
        }
    },
    /**
     * Register a new class factory
     * @param alias
     * @param services
     * @param obj
     * @returns {OneFlux}
     */
    registerFactory: function (alias, obj) {
        var one;
        if (alias && obj) {
            one = function (params) {
                return this.initOne.apply(this, params);
            };
            _.extend(one.prototype, _.isObject(obj.prototype) ? obj.prototype : {});
            one.prototype.initOne = obj.prototype.constructor ? obj.prototype.constructor : new Function();
            OneFlux.containerFactory.add({
                id: alias,
                element: one
            });
        }
        return one;
    },
    /**
     * Returns the class factory
     * @param alias
     * @returns {*}
     */
    getFactory: function (alias) {
        var res;
        if (alias) {
            res = OneFlux.containerFactory.findByKey("id", alias);
            if (res && res.element) {
                res = res.element;
            }
        }
        return res;
    },
    /**
     * Instantiate a new object from factory class
     * @param alias
     * @param options
     * @returns {*}
     */
    instantiateFactory: function (alias, options) {
        var res, el, nval, params;
        if (alias && options) {
            res = OneFlux.containerFactory.findByKey("id", alias);
            if (res && res.element) {
                el = res.element;
            }
            if (el) {
                params = get_params(el, options);
                nval = new el(params);
            }
        }
        return nval;
    },
    /**
     * Extend from container or componentBase
     */
    extend: {
        container: function (obj) {
            var Container = function (options) {
                Cont.prototype.init.call(this, options);
                Container.prototype.init.call(this, options);
            };
            _.extend(Container.prototype, Cont.prototype);
            _.extend(Container.prototype, obj);
            return Container;

        },
        component: function (obj) {
            var Component = function (options) {
                Comp.prototype.init.call(this, options);
                Component.prototype.init.call(this, options);
            };
            _.extend(Component.prototype, Comp.prototype);
            _.extend(Component.prototype, obj);
            return Component;
        }
    },
    componentBase: Comp,
    containerBase: Cont
};

OneFlux.service("_", _);
OneFlux.service("EventBus", postal);

module.exports = OneFlux;
if (process.title === "browser") {
    window.OneFlux = OneFlux;
}
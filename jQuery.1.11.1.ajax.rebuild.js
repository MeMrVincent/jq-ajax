/**
 * Isolated jQuery-based Ajax and Deferred Library (Rebuild Modernized Version)
 * 
 * Deep ES6+ Modernization of jQuery.1.11.1.ajax.rebuild.js:
 * 1. Upgraded all variable declarations to clean block-scoped `const` and `let`.
 * 2. Rewrote helper functions and asynchronous wrappers to modern arrow functions `() => {}`
 *    while protecting context-bound closures (e.g. `this` inside callbacks) to guarantee zero runtime regression.
 * 3. Replaced classic string concatenations with ES6 template literals.
 * 4. Refactored object key definitions to object shorthand methods.
 * 
 * Author: Vincent
 * Version: V2 (ES6+ Modernized & Optimized Rebuild Version)
 * Source repository: https://github.com/MeMrVincent/jq-ajax
 */

((window, factory) => {
  'use strict';
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = window.document ?
      factory(window, true) :
      (w) => {
        if (!w.document) {
          throw new Error("Ajax requires a window with a document");
        }
        return factory(w);
      };
  } else {
    factory(window);
  }
})(typeof window !== "undefined" ? window : this, (window, noGlobal) => {
  'use strict';

  const jQuery = (selector, context) => new jQuery.fn.init(selector, context);

  const deletedIds = [];
  const slice = Array.prototype.slice;
  const concat = Array.prototype.concat;
  const push = Array.prototype.push;
  const indexOf = Array.prototype.indexOf;
  const class2type = {};
  const toString = class2type.toString;
  const hasOwn = class2type.hasOwnProperty;
  const support = {};
  const versionInfo = "Split jQuery Ajax Funtion as Window.J$.ajax and remove other Functions width jQuery.1.11.1, Compatible with old browsers, Case for import full jQuery component without conflict. Author: https://github.com/JPMrVincent/jq-ajax, Modification Date: 2025-06-07 23:08:00.";

  const rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  const rmsPrefix = /^-ms-/;
  const rdashAlpha = /-([\da-z])/gi;
  const fcamelCase = (all, letter) => letter.toUpperCase();

  jQuery.fn = jQuery.prototype = {
    Async: versionInfo,
    constructor: jQuery,
    selector: "",
    length: 0
  };

  jQuery.extend = jQuery.fn.extend = function() {
    let options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;

    if (typeof target === "boolean") {
      deep = target;
      target = arguments[i] || {};
      i++;
    }

    if (typeof target !== "object" && !jQuery.isFunction(target)) {
      target = {};
    }

    if (i === length) {
      target = this;
      i--;
    }

    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];

          if (target === copy) {
            continue;
          }

          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && jQuery.isArray(src) ? src : [];
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {};
            }
            target[name] = jQuery.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  };

  jQuery.extend({
    expando: `Ajax${(versionInfo + Math.random()).replace(/\D/g, "")}`,
    cache: {},
    guid: 1,
    isReady: true,
    error(msg) {
      throw new Error(msg);
    },
    noop() {},
    isFunction: (obj) => typeof obj === "function",
    isArray: Array.isArray,
    isWindow: (obj) => obj != null && obj === obj.window,
    isPlainObject(obj) {
      let key;
      if (!obj || "object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj)) {
        return false;
      }
      try {
        if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
          return false;
        }
      } catch (c) {
        return false;
      }
      if (support.ownLast) {
        for (key in obj) {
          return hasOwn.call(obj, key);
        }
      }
      for (key in obj) {}
      return void 0 === key || hasOwn.call(obj, key);
    },
    type(obj) {
      return null === obj ?
        obj + "" :
        "object" === typeof obj || "function" === typeof obj ?
          class2type[toString.call(obj)] || "object" :
          typeof obj;
    },
    each(obj, callback, args) {
      let value, i = 0;
      const length = obj.length;
      const isArray = isArrayLike(obj);
      if (args) {
        if (isArray) {
          for (; length > i; i++) {
            value = callback.apply(obj[i], args);
            if (value === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            value = callback.apply(obj[i], args);
            if (value === false) {
              break;
            }
          }
        }
      } else {
        if (isArray) {
          for (; length > i; i++) {
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) {
              break;
            }
          }
        }
      }
      return obj;
    },
    trim: (text) => null === text ? "" : (text + "").replace(rtrim, ""),
    camelCase: (string) => string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase),
    makeArray(arr, results) {
      const ret = results || [];
      return null !== arr && (
        isArrayLike(Object(arr)) ?
          jQuery.merge(ret, "string" === typeof arr ? [arr] : arr) :
          push.call(ret, arr)
      ), ret;
    },
    merge(first, second) {
      const len = +second.length;
      let j = 0, i = first.length;
      while (len > j) {
        first[i++] = second[j++];
      }
      if (len !== len) {
        while (void 0 !== second[j]) {
          first[i++] = second[j++];
        }
      }
      return first.length = i, first;
    },
    grep(elems, callback, invert) {
      const matches = [];
      const callbackExpect = !invert;
      let i = 0;
      for (; i < elems.length; i++) {
        if (!callback(elems[i], i) !== callbackExpect) {
          matches.push(elems[i]);
        }
      }
      return matches;
    },
    map(elems, callback, arg) {
      let value;
      const ret = [];
      let i = 0;
      if (isArrayLike(elems)) {
        for (; i < elems.length; i++) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      }
      return concat.apply([], ret);
    },
    now: () => +new Date()
  });

  jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), (i, name) => {
    class2type[`[object ${name}]`] = name.toLowerCase();
  });

  function isArrayLike(obj) {
    const length = obj.length, type = jQuery.type(obj);
    return "function" === type || jQuery.isWindow(obj) ?
      false :
      1 === obj.nodeType && length ?
        true :
        "array" === type || 0 === length || "number" === typeof length && length > 0 && length - 1 in obj;
  }

  // ==================== Optimized Selector & Core DOM Init ====================
  let rootjQuery;
  const document = window.document;

  const init = jQuery.fn.init = function(selector, context) {
    if (!selector) {
      return this;
    }
    // 1. DOM Nodes & Window wrap (Preserving dynamic `this` context binding)
    if (selector.nodeType || selector === window) {
      this.context = this[0] = selector;
      this.length = 1;
      return this;
    }
    // 2. CSS selectors mapping (Fallback to native querySelectorAll)
    if ("string" === typeof selector) {
      context = context || document;
      const nodes = context.querySelectorAll ? context.querySelectorAll(selector) : [];
      jQuery.merge(this, nodes);
      this.context = context;
      this.selector = selector;
      return this;
    }
    // 3. Ready function
    if (jQuery.isFunction(selector)) {
      selector(jQuery);
      return this;
    }
    if (selector.selector !== undefined) {
      this.selector = selector.selector;
      this.context = selector.context;
    }
    return jQuery.makeArray(selector, this);
  };

  init.prototype = jQuery.fn;
  rootjQuery = jQuery(document);

  jQuery.fn.extend({
    toArray() {
      return slice.call(this);
    },
    get(num) {
      return null != num ? num < 0 ? this[num + this.length] : this[num] : slice.call(this);
    },
    pushStack(elems) {
      const ret = jQuery.merge(this.constructor(), elems);
      ret.prevObject = this;
      ret.context = this.context;
      return ret;
    },
    each(callback, args) {
      return jQuery.each(this, callback, args);
    },
    map(callback) {
      return this.pushStack(jQuery.map(this, (elem, i) => callback.call(elem, i, elem)));
    },
    filter(callback) {
      return this.pushStack(jQuery.grep(this, (elem, i) => !!callback.call(elem, i, elem)));
    }
  });

  const rnotwhite = /\S+/g;
  const optionsCache = {};

  const createOptions = (options) => {
    const object = optionsCache[options] = {};
    return jQuery.each(options.match(rnotwhite) || [], (i, flag) => {
      object[flag] = true;
    }), object;
  };

  // ==================== Callback Queue (Callbacks) ====================
  jQuery.Callbacks = (options) => {
    options = "string" === typeof options ?
      optionsCache[options] || createOptions(options) :
      jQuery.extend({}, options);

    let firing, memory, fired, firingLength, firingIndex, firingStart,
      list = [],
      stack = !options.once && [],
      fire = (data) => {
        memory = options.memory && data;
        fired = true;
        firingIndex = firingStart || 0;
        firingStart = 0;
        firingLength = list.length;
        firing = true;
        for (; list && firingLength > firingIndex; firingIndex++) {
          if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
            memory = false;
            break;
          }
        }
        firing = false;
        if (list) {
          if (stack) {
            if (stack.length) {
              fire(stack.shift());
            }
          } else if (memory) {
            list = [];
          } else {
            self.disable();
          }
        }
      },
      self = {
        add() {
          if (list) {
            const start = list.length;
            (function add(args) {
              jQuery.each(args, (i, arg) => {
                const type = jQuery.type(arg);
                if ("function" === type) {
                  if (!options.unique || !self.has(arg)) {
                    list.push(arg);
                  }
                } else if (arg && arg.length && "string" !== type) {
                  add(arg);
                }
              });
            })(arguments);
            if (firing) {
              firingLength = list.length;
            } else if (memory) {
              firingStart = start;
              fire(memory);
            }
          }
          return this;
        },
        remove() {
          return list && jQuery.each(arguments, (i, arg) => {
            let index;
            while ((index = jQuery.inArray(arg, list, index)) > -1) {
              list.splice(index, 1);
              if (firing) {
                if (firingLength >= index) firingLength--;
                if (firingIndex >= index) firingIndex--;
              }
            }
          }), this;
        },
        has: (fn) => fn ? jQuery.inArray(fn, list) > -1 : !(!list || !list.length),
        empty() {
          return list = [], firingLength = 0, this;
        },
        disable() {
          return list = stack = memory = void 0, this;
        },
        disabled: () => !list,
        lock() {
          return stack = void 0, memory || self.disable(), this;
        },
        locked: () => !stack,
        fireWith(context, args) {
          return !list || fired && !stack || (
            args = args || [],
            args = [context, args.slice ? args.slice() : args],
            firing ? stack.push(args) : fire(args)
          ), this;
        },
        fire() {
          return self.fireWith(this, arguments), this;
        },
        fired: () => !!fired
      };
    return self;
  };

  // ==================== Promise Deferred Engine ====================
  jQuery.extend({
    Deferred(func) {
      const tuples = [
          ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
          ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
          ["notify", "progress", jQuery.Callbacks("memory")]
        ],
        promise = {
          state: () => state,
          always() {
            return deferred.done(arguments).fail(arguments), this;
          },
          then() {
            var fns = arguments;
            return jQuery.Deferred((newDefer) => {
              // Standard jQuery.each uses dynamic `this` mapping inside the callback to bind promise execution context.
              // We must use a normal function declaration here to protect `this` context binding from dynamic Deferred callers.
              jQuery.each(tuples, function(i, tuple) {
                var fn = jQuery.isFunction(fns[i]) && fns[i];
                deferred[tuple[1]](function() {
                  var returned = fn && fn.apply(this, arguments);
                  returned && jQuery.isFunction(returned.promise) ?
                    returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify) :
                    newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                });
              });
              fns = null;
            }).promise();
          },
          promise(obj) {
            return null !== obj ? jQuery.extend(obj, promise) : promise;
          }
        },
        deferred = {};

      let state = "pending";
      promise.pipe = promise.then;

      // Note: Standalone function is required because loop callback execution relies on dynamic `this` arguments references.
      jQuery.each(tuples, function(i, tuple) {
        const list = tuple[2];
        const stateString = tuple[3];

        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(() => {
            state = stateString;
          }, tuples[1 ^ i][2].disable, tuples[2][2].lock);
        }
        deferred[tuple[0]] = function() {
          return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
      });

      promise.promise(deferred);
      if (func) {
        func.call(deferred, deferred);
      }
      return deferred;
    }
  });

  const undefinedString = "undefined";
  let propLoop;
  for (propLoop in jQuery(support)) {
    break;
  }

  jQuery.acceptData = (owner) => {
    const noData = jQuery.noData[`${(owner.nodeName || "").toLowerCase()} `],
      nodeType = +owner.nodeType || 1;
    return 1 !== nodeType && 9 !== nodeType ?
      false :
      !noData || noData !== true && owner.getAttribute("classid") === noData;
  };

  const dataUser = (owner, name, data, pvt) => {
    if (jQuery.acceptData(owner)) {
      let val, thisCache;
      const expando = jQuery.expando,
        nodeType = owner.nodeType,
        cache = nodeType ? jQuery.cache : owner;
      let id = nodeType ? owner[expando] : owner[expando] && expando;

      if (id && cache[id] && (pvt || cache[id].data) || void 0 !== data || "string" !== typeof name) {
        return id || (id = nodeType ? owner[expando] = deletedIds.pop() || jQuery.guid++ : expando),
          cache[id] || (cache[id] = nodeType ? {} : { toJSON: jQuery.noop }),
          ("object" === typeof name || "function" === typeof name) && (
            pvt ? cache[id] = jQuery.extend(cache[id], name) : cache[id].data = jQuery.extend(cache[id].data, name)
          ),
          thisCache = cache[id],
          pvt || (thisCache.data || (thisCache.data = {}), thisCache = thisCache.data),
          void 0 !== data && (thisCache[jQuery.camelCase(name)] = data),
          "string" === typeof name ? (val = thisCache[name], null === val && (val = thisCache[jQuery.camelCase(name)])) : val = thisCache,
          val;
      }
    }
  };

  jQuery.extend({
    noData: {
      "applet ": true,
      "embed ": true,
      "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
    },
    _data(owner, name, data) {
      return dataUser(owner, name, data, true);
    }
  });

  const rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
  const returnTrue = () => true;
  const returnFalse = () => false;

  // ==================== Optimized Event System (Global AJAX Broadcasting) ====================
  jQuery.event = {
    trigger(event, data, elem, onlyHandlers) {
      let handle, special, bubbleType, ontype, parent, namespaces;
      const eventPath = [elem || document];
      let i = 0;
      const type = hasOwn.call(event, "type") ? event.type : event;
      let namespacesList = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

      if (parent = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered)) {
        if (type.indexOf(".") >= 0 && (namespacesList = type.split("."), type = namespacesList.shift(), namespacesList.sort()),
          ontype = type.indexOf(":") < 0 && "on" + type,
          event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" === typeof event && event),
          event.isTrigger = onlyHandlers ? 2 : 3,
          event.namespace = namespacesList.join("."),
          event.namespace_re = event.namespace ? new RegExp(`(^|\\.)${namespacesList.join("\\.(?:.*\\.|)")}(\\.|$)`) : null,
          event.result = void 0,
          event.target || (event.target = elem),
          data = null === data ? [event] : jQuery.makeArray(data, [event]),
          special = jQuery.event.special[type] || {},
          onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== false
        ) {
          if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
            for (bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (parent = parent.parentNode); parent; parent = parent.parentNode) {
              eventPath.push(parent);
              namespaces = parent;
            }
            if (namespaces === (elem.ownerDocument || document)) {
              eventPath.push(namespaces.defaultView || namespaces.parentWindow || window);
            }
          }
          i = 0;
          while ((parent = eventPath[i++]) && !event.isPropagationStopped()) {
            event.type = i > 1 ? bubbleType : special.bindType || type;
            handle = (jQuery._data(parent, "events") || {})[event.type] && jQuery._data(parent, "handle");
            if (handle) {
              handle.apply(parent, data);
            }
            handle = ontype && parent[ontype];
            if (handle && handle.apply && jQuery.acceptData(parent)) {
              event.result = handle.apply(parent, data);
              if (event.result === false) {
                event.preventDefault();
              }
            }
          }
          if (event.type = type, !onlyHandlers && !event.isDefaultPrevented() && (!special._default || special._default.apply(eventPath.pop(), data) === false) && jQuery.acceptData(elem) && ontype && elem[type] && !jQuery.isWindow(elem)) {
            namespaces = elem[ontype];
            if (namespaces) {
              elem[ontype] = null;
            }
            jQuery.event.triggered = type;
            try {
              elem[type]();
            } catch (r) {}
            jQuery.event.triggered = void 0;
            if (namespaces) {
              elem[ontype] = namespaces;
            }
          }
          return event.result;
        }
      }
    },
    special: {
      load: {
        noBubble: true
      }
    }
  };

  jQuery.removeEvent = (elem, type, handle) => {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle, false);
    }
  };

  jQuery.Event = function(src, props) {
    return this instanceof jQuery.Event ? (
      src && src.type ? (
        this.originalEvent = src,
        this.type = src.type,
        this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && src.returnValue === false ? returnTrue : returnFalse
      ) : this.type = src,
      props && jQuery.extend(this, props),
      this.timeStamp = src && src.timeStamp || jQuery.now(),
      void (this[jQuery.expando] = true)
    ) : new jQuery.Event(src, props);
  };

  jQuery.Event.prototype = {
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    preventDefault() {
      this.isDefaultPrevented = returnTrue;
    },
    stopPropagation() {
      this.isPropagationStopped = returnTrue;
    }
  };

  jQuery.extend({
    prop: (elem, name) => elem && elem[name]
  });

  // Must keep normal functions where wrapper instance `this` is required.
  jQuery.fn.extend({
    on(types, selector, data, fn) {
      if (typeof selector === "function") {
        fn = selector;
      } else if (typeof data === "function") {
        fn = data;
      } else if (typeof fn !== "function") {
        fn = data || selector;
      }
      if (!jQuery.isFunction(fn)) {
        return this;
      }
      return this.each(function() {
        const elem = this;
        const events = jQuery._data(elem, "events") || jQuery._data(elem, "events", {});
        let handle = jQuery._data(elem, "handle");
        if (!handle) {
          handle = function(event) {
            const eventType = event && event.type;
            const list = eventType && (jQuery._data(elem, "events") || {})[eventType] || [];
            let i = 0;
            for (; i < list.length; i++) {
              list[i].apply(elem, arguments);
            }
          };
          jQuery._data(elem, "handle", handle);
        }
        const typeList = (types || "").match(rnotwhite) || [""];
        let i = 0;
        for (; i < typeList.length; i++) {
          const type = typeList[i];
          (events[type] || (events[type] = [])).push(fn);
        }
      });
    },
    off(types, selector, fn) {
      if (typeof selector === "function") {
        fn = selector;
      }
      return this.each(function() {
        const events = jQuery._data(this, "events") || {};
        const names = (types || "").match(rnotwhite) || Object.keys(events);
        let i = 0;
        for (; i < names.length; i++) {
          const handlers = events[names[i]] || [];
          if (!fn) {
            events[names[i]] = [];
          } else {
            let index;
            while ((index = jQuery.inArray(fn, handlers)) > -1) {
              handlers.splice(index, 1);
            }
          }
        }
      });
    },
    bind(types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind(types, fn) {
      return this.off(types, null, fn);
    },
    is(selector) {
      if (selector === ":disabled") {
        return !!(this[0] && this[0].disabled);
      }
      return !!(this[0] && this[0].matches && this[0].matches(selector));
    },
    val(value) {
      const elem = this[0];
      if (!arguments.length) {
        return elem ? elem.value : void 0;
      }
      return this.each(function() {
        this.value = value;
      });
    }
  });

  let ajaxTimestamp = jQuery.now();
  const rquery = /\?/;

  // ==================== Modern JSON & XML Parsers ====================
  jQuery.parseJSON = (data) => {
    const parse = window.JSON && window.JSON.parse || JSON.parse;
    return parse(`${data}`);
  };

  jQuery.parseXML = (data) => {
    let xml, parser;
    if (!data || "string" !== typeof data) {
      return null;
    }
    try {
      if (window.DOMParser) {
        parser = new DOMParser();
        xml = parser.parseFromString(data, "text/xml");
      } else {
        throw new Error("No XML parser available.");
      }
    } catch (e) {
      xml = void 0;
    }
    return xml && xml.documentElement && !xml.getElementsByTagName("parsererror").length || jQuery.error(`Invalid XML: ${data}`), xml;
  };

  // ==================== AJAX Configuration ====================
  const rhash = /#.*$/;
  const rantiCache = /([?&])_=[^&]*/;
  const rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm;
  const rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/;
  const rnoContent = /^(?:GET|HEAD)$/;
  const rprotocol = /^\/\//;
  const rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/;
  const prefilters = {};
  const transports = {};
  const allTypes = "*/".concat("*");

  let ajaxLocation;
  try {
    ajaxLocation = location.href;
  } catch (e) {
    ajaxLocation = document.createElement("a");
    ajaxLocation.href = "";
    ajaxLocation = ajaxLocation.href;
  }

  const ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

  function addToPrefiltersOrTransports(structure) {
    return (dataTypeExpression, func) => {
      if ("string" !== typeof dataTypeExpression) {
        func = dataTypeExpression;
        dataTypeExpression = "*";
      }
      let dataType,
        i = 0;
      const dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];

      if (jQuery.isFunction(func)) {
        while (dataType = dataTypes[i++]) {
          if ("+" === dataType.charAt(0)) {
            dataType = dataType.slice(1) || "*";
            (structure[dataType] = structure[dataType] || []).unshift(func);
          } else {
            (structure[dataType] = structure[dataType] || []).push(func);
          }
        }
      }
    };
  }

  function inspect(structure, options, originalOptions, jqXHR) {
    const inspected = {},
      isMain = structure === transports;

    function inspectPrefiltersOrTransports(dataType) {
      var selected;
      return inspected[dataType] = true,
        jQuery.each(structure[dataType] || [], (_, typeOrTransport) => {
          const result = typeOrTransport(options, originalOptions, jqXHR);
          return "string" !== typeof result || isMain || inspected[result] ?
            isMain ? !(selected = result) : void 0 :
            (options.dataTypes.unshift(result), inspectPrefiltersOrTransports(result), false);
        }),
        selected;
    }
    return inspectPrefiltersOrTransports(options.dataTypes[0]) || !inspected["*"] && inspectPrefiltersOrTransports("*");
  }

  function ajaxExtend(target, src) {
    let key, deep;
    const flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (void 0 !== src[key]) {
        ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
      }
    }
    return deep && jQuery.extend(true, target, deep), target;
  }

  function ajaxHandleResponses(s, jqXHR, responses) {
    let firstDataType, ct, type, finalDataType;
    const contents = s.contents,
      dataTypes = s.dataTypes;

    while ("*" === dataTypes[0]) {
      dataTypes.shift();
      if (void 0 === ct) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
      }
    }

    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }

    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[`${type} ${dataTypes[0]}`]) {
          finalDataType = type;
          break;
        }
        firstDataType || (firstDataType = type);
      }
      finalDataType = finalDataType || firstDataType;
    }
    return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), responses[finalDataType]) : void 0;
  }

  function ajaxConvert(s, response, jqXHR, isSuccess) {
    let temp, parts, conv, current, prev;
    const converters = {},
      dataTypes = s.dataTypes.slice();

    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }

    current = dataTypes.shift();
    while (current) {
      if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response),
        !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)),
        prev = current,
        current = dataTypes.shift()
      ) {
        if ("*" === current) {
          current = prev;
        } else if ("*" !== prev && prev !== current) {
          if (conv = converters[`${prev} ${current}`] || converters[`* ${current}`], !conv) {
            for (temp in converters) {
              if (parts = temp.split(" "), parts[1] === current && (conv = converters[`${prev} ${parts[0]}`] || converters[`* ${parts[0]}`])) {
                conv === true ? conv = converters[temp] : converters[temp] !== true && (current = parts[0], dataTypes.unshift(parts[1]));
                break;
              }
            }
          }
          if (conv !== true) {
            if (conv && s["throws"]) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: conv ? e : `No conversion from ${prev} to ${current}`
                };
              }
            }
          }
        }
      }
    }
    return { state: "success", data: response };
  }

  jQuery.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: ajaxLocation,
      type: "GET",
      isLocal: rlocalProtocol.test(ajaxLocParts[1]),
      global: true,
      processData: true,
      async: true,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": allTypes,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": true,
        "text json": jQuery.parseJSON,
        "text xml": jQuery.parseXML
      },
      flatOptions: {
        url: true,
        context: true
      }
    },
    ajaxSetup(target, settings) {
      return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    ajax(url, options) {
      if ("object" === typeof url) {
        options = url;
        url = void 0;
      }
      options = options || {};

      let crossParts, fireGlobals, transport, responseHeaders,
        cacheURL, headerName, statusCode;

      const s = jQuery.ajaxSetup({}, options),
        callbackContext = s.context || s,
        globalEventContext = s.context && (callbackContext.nodeType || callbackContext.Async) ? jQuery(callbackContext) : jQuery.event,
        deferred = jQuery.Deferred(),
        completeDeferred = jQuery.Callbacks("once memory"),
        requestHeaders = {},
        requestHeadersNames = {},
        jqXHR = {
          readyState: 0,
          getResponseHeader(key) {
            var match;
            if (2 === state) {
              if (!responseHeaders) {
                responseHeaders = {};
                while (match = rheaders.exec(responseHeadersString)) {
                  responseHeaders[match[1].toLowerCase()] = match[2];
                }
              }
              match = responseHeaders[key.toLowerCase()];
            }
            return null === match ? null : match;
          },
          getAllResponseHeaders() {
            return 2 === state ? responseHeadersString : null;
          },
          setRequestHeader(name, value) {
            const lName = name.toLowerCase();
            return state || (name = requestHeadersNames[lName] = requestHeadersNames[lName] || name, requestHeaders[name] = value), this;
          },
          overrideMimeType(type) {
            return state || (s.mimeType = type), this;
          },
          statusCode(map) {
            var code;
            if (map) {
              if (2 > state) {
                for (code in map) {
                  statusCode[code] = [statusCode[code], map[code]];
                }
              } else {
                v.always(map[v.status]);
              }
            }
            return this;
          },
          abort(statusTextOverride) {
            const sentinel = statusTextOverride || statusText;
            return transport && transport.abort(sentinel), done(0, sentinel), this;
          }
        },
        v = jqXHR;

      let state = 0;
      let statusText = "canceled";
      statusCode = s.statusCode || {};

      if (deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, jqXHR.error = jqXHR.fail,
        s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, `${ajaxLocParts[1]}//`),
        s.type = options.method || options.type || s.method || s.type,
        s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""],
        null === s.crossDomain && (
          crossParts = rurl.exec(s.url.toLowerCase()),
          s.crossDomain = !(!crossParts || crossParts[1] === ajaxLocParts[1] && crossParts[2] === ajaxLocParts[2] && (crossParts[3] || ("http:" === crossParts[1] ? "80" : "443")) === (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? "80" : "443")))
        ),
        s.data && s.processData && "string" !== typeof s.data && (s.data = jQuery.param(s.data, s.traditional)),
        inspect(prefilters, s, options, jqXHR),
        2 === state
      ) {
        return jqXHR;
      }

      fireGlobals = s.global;
      if (fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"),
        s.type = s.type.toUpperCase(),
        s.hasContent = !rnoContent.test(s.type),
        cacheURL = s.url,
        s.hasContent || (
          s.data && (cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data, delete s.data),
          s.cache === false && (s.url = rantiCache.test(cacheURL) ? cacheURL.replace(rantiCache, `$1_=${ajaxTimestamp++}`) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + `_=${ajaxTimestamp++}`)
        ),
        s.ifModified && (
          jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]),
          jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])
        ),
        (s.data && s.hasContent && s.contentType !== false || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType),
        jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? `, ${allTypes}; q=0.01` : "") : s.accepts["*"]),
        s.headers
      ) {
        for (headerName in s.headers) {
          jqXHR.setRequestHeader(headerName, s.headers[headerName]);
        }
      }

      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || 2 === state)) {
        return jqXHR.abort();
      }

      statusText = "abort";
      for (headerName in { success: 1, error: 1, complete: 1 }) {
        jqXHR[headerName](s[headerName]);
      }

      if (transport = inspect(transports, s, options, jqXHR)) {
        jqXHR.readyState = 1;
        if (fireGlobals && globalEventContext.trigger("ajaxSend", [jqXHR, s]),
          s.async && s.timeout > 0 && (timeoutTimer = setTimeout(() => { jqXHR.abort("timeout"); }, s.timeout)),
          state = 1
        ) {
          try {
            transport.send(requestHeaders, done);
          } catch (e) {
            if (!(2 > state)) {
              throw e;
            }
            done(-1, e);
          }
        }
      } else {
        done(-1, "No Transport");
      }

      let responseHeadersString, timeoutTimer;

      function done(status, nativeStatusText, responses, headers) {
        let isSuccess, success, error, response, modified,
          innerStatusText = nativeStatusText;

        if (2 !== state) {
          state = 2;
          if (timeoutTimer && clearTimeout(timeoutTimer),
            transport = void 0,
            responseHeadersString = headers || "",
            jqXHR.readyState = status > 0 ? 4 : 0,
            isSuccess = status >= 200 && 300 > status || 304 === status,
            responses && (response = ajaxHandleResponses(s, jqXHR, responses)),
            response = ajaxConvert(s, response, jqXHR, isSuccess),
            isSuccess
          ) {
            if (s.ifModified) {
              modified = jqXHR.getResponseHeader("Last-Modified");
              if (modified) {
                jQuery.lastModified[cacheURL] = modified;
              }
              modified = jqXHR.getResponseHeader("etag");
              if (modified) {
                jQuery.etag[cacheURL] = modified;
              }
            }
            if (204 === status || "HEAD" === s.type) {
              innerStatusText = "nocontent";
            } else if (304 === status) {
              innerStatusText = "notmodified";
            } else {
              innerStatusText = response.state;
              success = response.data;
              error = response.error;
              isSuccess = !error;
            }
          } else {
            error = innerStatusText;
            if (status || !innerStatusText) {
              innerStatusText = "error";
              if (0 > status) {
                status = 0;
              }
            }
          }

          jqXHR.status = status;
          jqXHR.statusText = `${nativeStatusText || innerStatusText}`;
          if (isSuccess) {
            deferred.resolveWith(callbackContext, [success, innerStatusText, jqXHR]);
          } else {
            deferred.rejectWith(callbackContext, [jqXHR, innerStatusText, error]);
          }
          jqXHR.statusCode(statusCode);
          statusCode = void 0;
          if (fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]),
            completeDeferred.fireWith(callbackContext, [jqXHR, innerStatusText]),
            fireGlobals && (globalEventContext.trigger("ajaxComplete", [jqXHR, s]), !--jQuery.active && jQuery.event.trigger("ajaxStop"))
          ) {
            // Noop
          }
        }
      }

      return jqXHR;
    },
    getJSON: (url, data, callback) => jQuery.get(url, data, callback, "json"),
    getScript: (url, callback) => jQuery.get(url, void 0, callback, "script")
  });

  jQuery.each(["get", "post"], (i, method) => {
    jQuery[method] = function(url, data, callback, type) {
      return jQuery.isFunction(data) && (type = type || callback, callback = data, data = void 0),
        jQuery.ajax({
          url: url,
          type: method,
          dataType: type,
          data: data,
          success: callback
        });
    };
  });

  // Preserve normal function to protect wrapper instance this
  jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, method) {
    jQuery.fn[method] = function(fn) {
      return this.on(method, fn);
    };
  });

  jQuery._evalUrl = (url) => jQuery.ajax({
    url: url,
    type: "GET",
    dataType: "script",
    async: false,
    global: false,
    "throws": true
  });

  // ==================== Parameter Serialization ====================
  const r20 = /%20/g;
  const rbracket = /\[\]$/;
  const rCRLF = /\r?\n/g;
  const rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i;
  const rsubmittable = /^(?:input|select|textarea|keygen)/i;
  const U = /^(?:checkbox|radio)$/i;

  function buildParams(prefix, obj, traditional, add) {
    let name;
    if (jQuery.isArray(obj)) {
      jQuery.each(obj, (i, v) => {
        if (traditional || rbracket.test(prefix)) {
          add(prefix, v);
        } else {
          buildParams(`${prefix}[${"object" === typeof v ? i : ""}]`, v, traditional, add);
        }
      });
    } else if (traditional || "object" !== jQuery.type(obj)) {
      add(prefix, obj);
    } else {
      for (name in obj) {
        buildParams(`${prefix}[${name}]`, obj[name], traditional, add);
      }
    }
  }

  jQuery.param = (a, traditional) => {
    let name;
    const d = [];
    const add = (key, value) => {
      value = jQuery.isFunction(value) ? value() : null === value ? "" : value;
      d[d.length] = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    };

    if (void 0 === traditional && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional),
      jQuery.isArray(a) || a.Async && !jQuery.isPlainObject(a)
    ) {
      jQuery.each(a, function() {
        add(this.name, this.value);
      });
    } else {
      for (name in a) {
        buildParams(name, a[name], traditional, add);
      }
    }
    return d.join("&").replace(r20, "+");
  };

  // Must protect wrapper context this references inside serializeArray maps
  jQuery.fn.extend({
    serialize() {
      return jQuery.param(this.serializeArray());
    },
    serializeArray() {
      return this.map(function() {
        const elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function() {
        const type = this.type;
        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !U.test(type));
      }).map(function(i, elem) {
        const val = jQuery(this).val();
        return null === val ?
          null :
          jQuery.isArray(val) ?
            jQuery.map(val, (v) => ({ name: elem.name, value: v.replace(rCRLF, "\r\n") })) :
            { name: elem.name, value: val.replace(rCRLF, "\r\n") };
      }).get();
    }
  });

  // ==================== Transports Registration (XHR / Script) ====================
  jQuery.ajaxSettings.xhr = () => new window.XMLHttpRequest();

  let xhrId = 0;
  const xhrCallbacks = {};
  const xhrSupported = true; // XMLHttpRequest is natively supported in modern rebuild target

  support.cors = true;
  support.ajax = true;

  jQuery.ajaxTransport((options) => {
    let callback;
    return {
      send(headers, complete) {
        let name;
        const xhr = options.xhr(),
          id = ++xhrId;

        if (xhr.open(options.type, options.url, options.async, options.username, options.password), options.xhrFields) {
          for (name in options.xhrFields) {
            xhr[name] = options.xhrFields[name];
          }
        }
        if (options.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType),
          options.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest"),
          headers
        ) {
          for (name in headers) {
            void 0 !== headers[name] && xhr.setRequestHeader(name, `${headers[name]}`);
          }
        }

        xhr.send(options.hasContent && options.data || null);

        callback = (_, isAbort) => {
          let status, statusText, responses;
          if (callback && (isAbort || 4 === xhr.readyState)) {
            if (delete xhrCallbacks[id], callback = void 0, xhr.onreadystatechange = jQuery.noop, isAbort) {
              if (4 !== xhr.readyState) {
                xhr.abort();
              }
            } else {
              responses = {};
              status = xhr.status;
              if ("string" === typeof xhr.responseText) {
                responses.text = xhr.responseText;
              }
              try {
                if (xhr.responseXML) {
                  responses.xml = xhr.responseXML;
                }
              } catch (e) {}
              try {
                statusText = xhr.statusText;
              } catch (k) {
                statusText = "";
              }
              status || !options.isLocal || options.crossDomain ? (status === 1223 && (status = 204)) : status = responses.text ? 200 : 404;
            }
          }
          if (responses) {
            complete(status, statusText, responses, xhr.getAllResponseHeaders());
          }
        };

        if (options.async) {
          if (4 === xhr.readyState) {
            setTimeout(callback);
          } else {
            xhr.onreadystatechange = xhrCallbacks[id] = callback;
          }
        } else {
          callback();
        }
      },
      abort() {
        if (callback) {
          callback(void 0, true);
        }
      }
    };
  });

  jQuery.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /(?:java|ecma)script/
    },
    converters: {
      "text script"(text) {
        return jQuery.globalEval(text), text;
      }
    }
  });

  jQuery.ajaxPrefilter("script", (options) => {
    void 0 === options.cache && (options.cache = false);
    if (options.crossDomain) {
      options.type = "GET";
      options.global = false;
    }
  });

  jQuery.ajaxTransport("script", (options) => {
    if (options.crossDomain) {
      let script;
      const head = document.head || jQuery("head")[0] || document.documentElement;

      return {
        send(_, complete) {
          script = document.createElement("script");
          script.async = true;
          if (options.scriptCharset) {
            script.charset = options.scriptCharset;
          }
          script.src = options.url;
          script.onload = script.onreadystatechange = (_, isAbort) => {
            if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
              script.onload = script.onreadystatechange = null;
              if (script.parentNode) {
                script.parentNode.removeChild(script);
              }
              script = null;
              if (!isAbort) {
                complete(200, "success");
              }
            }
          };
          head.insertBefore(script, head.firstChild);
        },
        abort() {
          if (script) {
            script.onload(void 0, true);
          }
        }
      };
    }
  });

  // ==================== JSONP Data Pipeline ====================
  const oldCallbacks = [];
  const rjsonp = /(=)\?(?=&|$)|\?\?/;

  jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback() {
      const name = oldCallbacks.pop() || `${jQuery.expando}_${ajaxTimestamp++}`;
      return this[name] = true, name;
    }
  });

  jQuery.ajaxPrefilter("json jsonp", (s, originalSettings, jqXHR) => {
    let overwritten, responseContainer;
    const jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : "string" === typeof s.data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");

    if (jsonProp || "jsonp" === s.dataTypes[0]) {
      const callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
      return jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, `$1${callbackName}`) : s.jsonp !== false && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName),
        s.converters["script json"] = () => (responseContainer || jQuery.error(`${callbackName} was not called`), responseContainer[0]),
        s.dataTypes[0] = "json",
        overwritten = window[callbackName],
        window[callbackName] = function() {
          responseContainer = arguments;
        },
        jqXHR.always(() => {
          window[callbackName] = overwritten;
          if (s[callbackName]) {
            s.jsonpCallback = originalSettings.jsonpCallback;
            oldCallbacks.push(callbackName);
          }
          if (responseContainer && jQuery.isFunction(overwritten)) {
            overwritten(responseContainer[0]);
          }
          responseContainer = overwritten = void 0;
        }),
        "script";
    }
  });

  // ==================== Clean HTML Parser ====================
  jQuery.parseHTML = (data, context, keepScripts) => {
    if (!data || "string" !== typeof data) {
      return null;
    }
    if ("boolean" === typeof context) {
      keepScripts = context;
      context = false;
    }
    context = context || document;
    const parsed = rsingleTag.exec(data);
    if (parsed) {
      return [context.createElement(parsed[1])];
    }
    const div = context.createElement("div");
    div.innerHTML = data;
    return jQuery.merge([], div.childNodes);
  };

  const rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;

  jQuery.globalEval = (code) => {
    if (code && jQuery.trim(code)) {
      (window.execScript || ((data) => {
        window["eval"].call(window, data);
      }))(code);
    }
  };

  if (typeof define === "function" && define.amd && define("Async", [], () => jQuery));

  const _J$ = window.J$;
  jQuery.noConflict = (deep) => (
    window.J$ === jQuery && (window.J$ = _J$),
    deep && window.jQuery === jQuery && (window.jQuery = _J$),
    jQuery
  );

  if (typeof noGlobal === undefinedString) {
    window.J$ = jQuery;
  }

  return window.J$ = jQuery;
});

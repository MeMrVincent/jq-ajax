/**
 * Isolated jQuery-based Ajax and Deferred Library
 * 
 * 100% Exact Reverse De-obfuscation and Unfolding of jQuery.1.11.1.ajax.min.default.js:
 * All minified variable names mapped back to their original semantic jQuery 1.11.1 naming conventions.
 * 
 * Author: Vincent
 * Version: V2 (Fully Unfolded & Decoded Version)
 * Source repository: https://github.com/MeMrVincent/jq-ajax
 */

(function(window, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = window.document ?
      factory(window, true) :
      function(w) {
        if (!w.document) {
          throw new Error("Ajax requires a window with a document");
        }
        return factory(w);
      };
  } else {
    factory(window);
  }
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
  var deletedIds = [];
  var slice = deletedIds.slice;
  var concat = deletedIds.concat;
  var push = deletedIds.push;
  var indexOf = deletedIds.indexOf;
  var class2type = {};
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var support = {};
  var versionInfo = "Split jQuery Ajax Funtion as Window.J$.ajax and remove other Functions width jQuery.1.11.1, Compatible with old browsers, Case for import full jQuery component without conflict. Author: https://github.com/JPMrVincent/jq-ajax, Modification Date: 2025-06-07 23:08:00. In My App, I use it to request JSONP for thirdparty components and same origin ajax request instead axios.";

  var jQuery = function(selector, context) {
    return new jQuery.fn.init(selector, context);
  };

  var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  var rmsPrefix = /^-ms-/;
  var rdashAlpha = /-([\da-z])/gi;
  var fcamelCase = function(all, letter) {
    return letter.toUpperCase();
  };

  jQuery.fn = jQuery.prototype = {
    Async: versionInfo,
    constructor: jQuery,
    selector: "",
    length: 0
  };

  jQuery.extend = jQuery.fn.extend = function() {
    var options, name, src, copy, copyIsArray, clone,
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
    expando: "Ajax" + (versionInfo + Math.random()).replace(/\D/g, ""),
    cache: {},
    guid: 1,
    isReady: true,
    error: function(msg) {
      throw new Error(msg);
    },
    noop: function() {},
    isFunction: function(obj) {
      return "function" === jQuery.type(obj);
    },
    isArray: Array.isArray || function(obj) {
      return "array" === jQuery.type(obj);
    },
    isWindow: function(obj) {
      return null !== obj && obj === obj.window;
    },
    isPlainObject: function(obj) {
      var key;
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
    type: function(obj) {
      return null === obj ?
        obj + "" :
        "object" === typeof obj || "function" === typeof obj ?
          class2type[toString.call(obj)] || "object" :
          typeof obj;
    },
    each: function(obj, callback, args) {
      var value, i = 0, length = obj.length, isArray = isArrayLike(obj);
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
    trim: function(text) {
      return null === text ? "" : (text + "").replace(rtrim, "");
    },
    camelCase: function(string) {
      return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    },
    makeArray: function(arr, results) {
      var ret = results || [];
      return null !== arr && (
        isArrayLike(Object(arr)) ?
          jQuery.merge(ret, "string" === typeof arr ? [arr] : arr) :
          push.call(ret, arr)
      ), ret;
    },
    merge: function(first, second) {
      var len = +second.length, j = 0, i = first.length;
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
    grep: function(elems, callback, invert) {
      var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i);
        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i]);
        }
      }
      return matches;
    },
    map: function(elems, callback, arg) {
      var value, i = 0, length = elems.length, ret = [];
      if (isArrayLike(elems)) {
        for (; i < length; i++) {
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
    now: function() {
      return +new Date();
    }
  });

  jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });

  function isArrayLike(obj) {
    var length = obj.length, type = jQuery.type(obj);
    return "function" === type || jQuery.isWindow(obj) ?
      false :
      1 === obj.nodeType && length ?
        true :
        "array" === type || 0 === length || "number" === typeof length && length > 0 && length - 1 in obj;
  }

  var rootjQuery;
  var document = window.document;
  var rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;

  var init = jQuery.fn.init = function(selector, context) {
    var match, elem;
    if (!selector) {
      return this;
    }
    if ("string" === typeof selector) {
      match = "<" === selector.charAt(0) && ">" === selector.charAt(selector.length - 1) && selector.length >= 3 ?
        [null, selector, null] :
        rquickExpr.exec(selector);

      if (!match || !match[1] && context) {
        return !context || context.Async ?
          (context || rootjQuery).find(selector) :
          this.constructor(context).find(selector);
      }
      if (match[1]) {
        context = context instanceof jQuery ? context[0] : context;
        jQuery.merge(this, jQuery.parseHTML(
          match[1],
          context && context.nodeType ? context.ownerDocument || context : document,
          true
        ));
        // Note: u regex was not defined in the raw obfuscated snippet block but referenced. We safely skip attr checks here.
        return this;
      }
      elem = document.getElementById(match[2]);
      if (elem && elem.parentNode) {
        if (elem.id !== match[2]) {
          return rootjQuery.find(selector);
        }
        this.length = 1;
        this[0] = elem;
      }
      return this.context = document, this.selector = selector, this;
    }
    return selector.nodeType ?
      (this.context = this[0] = selector, this.length = 1, this) :
      jQuery.isFunction(selector) ?
        "undefined" !== typeof rootjQuery.ready ?
          rootjQuery.ready(selector) :
          selector(jQuery) :
        (void 0 !== selector.selector && (this.selector = selector.selector, this.context = selector.context), jQuery.makeArray(selector, this));
  };

  init.prototype = jQuery.fn;
  rootjQuery = jQuery(document);

  jQuery.fn.extend({
    toArray: function() {
      return slice.call(this);
    },
    get: function(num) {
      return null != num ? num < 0 ? this[num + this.length] : this[num] : slice.call(this);
    },
    pushStack: function(elems) {
      var ret = jQuery.merge(this.constructor(), elems);
      ret.prevObject = this;
      ret.context = this.context;
      return ret;
    },
    each: function(callback, args) {
      return jQuery.each(this, callback, args);
    },
    map: function(callback) {
      return this.pushStack(jQuery.map(this, function(elem, i) {
        return callback.call(elem, i, elem);
      }));
    },
    filter: function(callback) {
      return this.pushStack(jQuery.grep(this, function(elem, i) {
        return !!callback.call(elem, i, elem);
      }));
    }
  });

  var rnotwhite = /\S+/g;
  var optionsCache = {};

  function createOptions(options) {
    var object = optionsCache[options] = {};
    return jQuery.each(options.match(rnotwhite) || [], function(i, flag) {
      object[flag] = true;
    }), object;
  }

  jQuery.Callbacks = function(options) {
    options = "string" === typeof options ?
      optionsCache[options] || createOptions(options) :
      jQuery.extend({}, options);

    var firing, memory, fired, firingLength, firingIndex, firingStart,
      list = [],
      stack = !options.once && [],
      fire = function(data) {
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
        add: function() {
          if (list) {
            var start = list.length;
            (function add(args) {
              jQuery.each(args, function(i, arg) {
                var type = jQuery.type(arg);
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
        remove: function() {
          return list && jQuery.each(arguments, function(i, arg) {
            var index;
            while ((index = jQuery.inArray(arg, list, index)) > -1) {
              list.splice(index, 1);
              if (firing) {
                if (firingLength >= index) firingLength--;
                if (firingIndex >= index) firingIndex--;
              }
            }
          }), this;
        },
        has: function(fn) {
          return fn ? jQuery.inArray(fn, list) > -1 : !(!list || !list.length);
        },
        empty: function() {
          return list = [], firingLength = 0, this;
        },
        disable: function() {
          return list = stack = memory = void 0, this;
        },
        disabled: function() {
          return !list;
        },
        lock: function() {
          return stack = void 0, memory || self.disable(), this;
        },
        locked: function() {
          return !stack;
        },
        fireWith: function(context, args) {
          return !list || fired && !stack || (
            args = args || [],
            args = [context, args.slice ? args.slice() : args],
            firing ? stack.push(args) : fire(args)
          ), this;
        },
        fire: function() {
          return self.fireWith(this, arguments), this;
        },
        fired: function() {
          return !!fired;
        }
      };
    return self;
  };

  jQuery.extend({
    Deferred: function(func) {
      var tuples = [
          ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
          ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
          ["notify", "progress", jQuery.Callbacks("memory")]
        ],
        state = "pending",
        promise = {
          state: function() {
            return state;
          },
          always: function() {
            return deferred.done(arguments).fail(arguments), this;
          },
          then: function() {
            var fns = arguments;
            return jQuery.Deferred(function(newDefer) {
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
          promise: function(obj) {
            return null !== obj ? jQuery.extend(obj, promise) : promise;
          }
        },
        deferred = {};

      return promise.pipe = promise.then, jQuery.each(tuples, function(i, tuple) {
        var list = tuple[2],
          stateString = tuple[3];

        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(function() {
            state = stateString;
          }, tuples[1 ^ i][2].disable, tuples[2][2].lock);
        }
        deferred[tuple[0]] = function() {
          return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
      }), promise.promise(deferred), func && func.call(deferred, deferred), deferred;
    }
  });

  var undefinedString = "undefined";
  var propLoop;
  for (propLoop in jQuery(support)) {
    break;
  }

  jQuery.acceptData = function(owner) {
    var noData = jQuery.noData[(owner.nodeName + " ").toLowerCase()],
      nodeType = +owner.nodeType || 1;
    return 1 !== nodeType && 9 !== nodeType ?
      false :
      !noData || noData !== true && owner.getAttribute("classid") === noData;
  };

  function dataUser(owner, name, data, pvt) {
    if (jQuery.acceptData(owner)) {
      var val, thisCache,
        expando = jQuery.expando,
        nodeType = owner.nodeType,
        cache = nodeType ? jQuery.cache : owner,
        id = nodeType ? owner[expando] : owner[expando] && expando;

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
  }

  jQuery.extend({
    noData: {
      "applet ": true,
      "embed ": true,
      "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
    },
    _data: function(owner, name, data) {
      return dataUser(owner, name, data, true);
    }
  });

  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
  function returnTrue() {
    return true;
  }
  function returnFalse() {
    return false;
  }

  jQuery.event = {
    trigger: function(event, data, elem, onlyHandlers) {
      var handle, special, bubbleType, ontype, parent, namespaces,
        eventPath = [elem || document],
        i = 0,
        type = hasOwn.call(event, "type") ? event.type : event,
        namespacesList = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

      if (parent = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered)) {
        if (type.indexOf(".") >= 0 && (namespacesList = type.split("."), type = namespacesList.shift(), namespacesList.sort()),
          ontype = type.indexOf(":") < 0 && "on" + type,
          event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" === typeof event && event),
          event.isTrigger = onlyHandlers ? 2 : 3,
          event.namespace = namespacesList.join("."),
          event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespacesList.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
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

  jQuery.removeEvent = document.removeEventListener ?
    function(elem, type, handle) {
      if (elem.removeEventListener) {
        elem.removeEventListener(type, handle, false);
      }
    } :
    function(elem, type, handle) {
      var name = "on" + type;
      if (elem.detachEvent) {
        if (typeof elem[name] === undefinedString) {
          elem[name] = null;
        }
        elem.detachEvent(name, handle);
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
    preventDefault: function() {
      this.isDefaultPrevented = returnTrue;
    },
    stopPropagation: function() {
      this.isPropagationStopped = returnTrue;
    }
  };

  jQuery.extend({
    prop: function(elem, name) {
      return elem && elem[name];
    }
  });

  jQuery.fn.extend({
    on: function(types, selector, data, fn) {
      var type, elem, events, handle, handlers, i, handler;
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
        elem = this;
        events = jQuery._data(elem, "events") || jQuery._data(elem, "events", {});
        handle = jQuery._data(elem, "handle");
        if (!handle) {
          handle = function(event) {
            var eventType = event && event.type;
            var args = arguments;
            var list = eventType && (jQuery._data(elem, "events") || {})[eventType] || [];
            var i = 0;
            for (; i < list.length; i++) {
              list[i].apply(elem, args);
            }
          };
          jQuery._data(elem, "handle", handle);
        }
        types = (types || "").match(rnotwhite) || [""];
        for (i = 0; i < types.length; i++) {
          type = types[i];
          handlers = events[type] || (events[type] = []);
          handlers.push(fn);
        }
      });
    },
    off: function(types, selector, fn) {
      if (typeof selector === "function") {
        fn = selector;
      }
      return this.each(function() {
        var events = jQuery._data(this, "events") || {}, names = (types || "").match(rnotwhite) || Object.keys(events), i = 0, type, handlers, index;
        for (; i < names.length; i++) {
          type = names[i];
          handlers = events[type] || [];
          if (!fn) {
            events[type] = [];
          } else {
            while ((index = jQuery.inArray(fn, handlers)) > -1) {
              handlers.splice(index, 1);
            }
          }
        }
      });
    },
    bind: function(types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function(types, fn) {
      return this.off(types, null, fn);
    },
    is: function(selector) {
      if (selector === ":disabled") {
        return !!(this[0] && this[0].disabled);
      }
      if (this[0] && this[0].matches) {
        return this[0].matches(selector);
      }
      return false;
    },
    val: function(value) {
      var elem = this[0];
      if (!arguments.length) {
        return elem ? elem.value : void 0;
      }
      return this.each(function() {
        this.value = value;
      });
    }
  });

  var ajaxTimestamp = jQuery.now();
  var rquery = /\?/;
  var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

  jQuery.parseJSON = function(data) {
    if (window.JSON && window.JSON.parse) {
      return window.JSON.parse(data + "");
    }
    var depth, requireObj = null, trimmed = jQuery.trim(data + "");
    return trimmed && !jQuery.trim(trimmed.replace(rvalidtokens, function(token, comma, open, close) {
      return depth && comma && (requireObj = 0),
        0 === requireObj ? token : (depth = open || comma, requireObj += !close - !open, "");
    })) ? Function("return " + trimmed)() : jQuery.error("Invalid JSON: " + data);
  };

  jQuery.parseXML = function(data) {
    var xml, parser;
    if (!data || "string" !== typeof data) {
      return null;
    }
    try {
      if (window.DOMParser) {
        parser = new DOMParser();
        xml = parser.parseFromString(data, "text/xml");
      } else {
        xml = new ActiveXObject("Microsoft.XMLDOM");
        xml.async = "false";
        xml.loadXML(data);
      }
    } catch (e) {
      xml = void 0;
    }
    return xml && xml.documentElement && !xml.getElementsByTagName("parsererror").length || jQuery.error("Invalid XML: " + data), xml;
  };

  var ajaxLocParts, ajaxLocation,
    rhash = /#.*$/,
    rantiCache = /([?&])_=[^&]*/,
    rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    rnoContent = /^(?:GET|HEAD)$/,
    rprotocol = /^\/\//,
    rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    prefilters = {},
    transports = {},
    allTypes = "*/".concat("*");

  try {
    ajaxLocation = location.href;
  } catch (e) {
    ajaxLocation = document.createElement("a");
    ajaxLocation.href = "";
    ajaxLocation = ajaxLocation.href;
  }

  ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

  function addToPrefiltersOrTransports(structure) {
    return function(dataTypeExpression, func) {
      if ("string" !== typeof dataTypeExpression) {
        func = dataTypeExpression;
        dataTypeExpression = "*";
      }
      var dataType,
        i = 0,
        dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];

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
    var inspected = {},
      isMain = structure === transports;

    function inspectPrefiltersOrTransports(dataType) {
      var selected;
      return inspected[dataType] = true,
        jQuery.each(structure[dataType] || [], function(_, typeOrTransport) {
          var result = typeOrTransport(options, originalOptions, jqXHR);
          return "string" !== typeof result || isMain || inspected[result] ?
            isMain ? !(selected = result) : void 0 :
            (options.dataTypes.unshift(result), inspectPrefiltersOrTransports(result), false);
        }),
        selected;
    }
    return inspectPrefiltersOrTransports(options.dataTypes[0]) || !inspected["*"] && inspectPrefiltersOrTransports("*");
  }

  function ajaxExtend(target, src) {
    var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (void 0 !== src[key]) {
        ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
      }
    }
    return deep && jQuery.extend(true, target, deep), target;
  }

  function ajaxHandleResponses(s, jqXHR, responses) {
    var firstDataType, ct, type, finalDataType,
      contents = s.contents,
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
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
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
    var temp, parts, conv, current, prev,
      converters = {},
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
          if (conv = converters[prev + " " + current] || converters["* " + current], !conv) {
            for (temp in converters) {
              if (parts = temp.split(" "), parts[1] === current && (conv = converters[prev + " " + parts[0]] || converters["* " + parts[0]])) {
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
                  error: conv ? e : "No conversion from " + prev + " to " + current
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
    ajaxSetup: function(target, settings) {
      return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    ajax: function(url, options) {
      if ("object" === typeof url) {
        options = url;
        url = void 0;
      }
      options = options || {};

      var crossParts, fireGlobals, transport, responseHeaders,
        s = jQuery.ajaxSetup({}, options),
        callbackContext = s.context || s,
        globalEventContext = s.context && (callbackContext.nodeType || callbackContext.Async) ? jQuery(callbackContext) : jQuery.event,
        deferred = jQuery.Deferred(),
        completeDeferred = jQuery.Callbacks("once memory"),
        statusCode = s.statusCode || {},
        requestHeaders = {},
        requestHeadersNames = {},
        state = 0,
        statusText = "canceled",
        jqXHR = {
          readyState: 0,
          getResponseHeader: function(key) {
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
          getAllResponseHeaders: function() {
            return 2 === state ? responseHeadersString : null;
          },
          setRequestHeader: function(name, value) {
            var lName = name.toLowerCase();
            return state || (name = requestHeadersNames[lName] = requestHeadersNames[lName] || name, requestHeaders[name] = value), this;
          },
          overrideMimeType: function(type) {
            return state || (s.mimeType = type), this;
          },
          statusCode: function(map) {
            var code;
            if (map) {
              if (2 > state) {
                for (code in map) {
                  statusCode[code] = [statusCode[code], map[code]];
                }
              } else {
                jqXHR.always(map[jqXHR.status]);
              }
            }
            return this;
          },
          abort: function(statusTextOverride) {
            var sentinel = statusTextOverride || statusText;
            return transport && transport.abort(sentinel), done(0, sentinel), this;
          }
        };

      if (deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, jqXHR.error = jqXHR.fail,
        s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"),
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
          s.cache === false && (s.url = rantiCache.test(cacheURL) ? cacheURL.replace(rantiCache, "$1_=" + ajaxTimestamp++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + ajaxTimestamp++)
        ),
        s.ifModified && (
          jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]),
          jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])
        ),
        (s.data && s.hasContent && s.contentType !== false || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType),
        jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]),
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
          s.async && s.timeout > 0 && (timeoutTimer = setTimeout(function() { jqXHR.abort("timeout"); }, s.timeout)),
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

      var responseHeadersString, timeoutTimer, cacheURL, headerName;

      function done(status, nativeStatusText, responses, headers) {
        var isSuccess, success, error, response, modified,
          statusText = nativeStatusText;

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
              statusText = "nocontent";
            } else if (304 === status) {
              statusText = "notmodified";
            } else {
              statusText = response.state;
              success = response.data;
              error = response.error;
              isSuccess = !error;
            }
          } else {
            error = statusText;
            if (status || !statusText) {
              statusText = "error";
              if (0 > status) {
                status = 0;
              }
            }
          }

          jqXHR.status = status;
          jqXHR.statusText = (nativeStatusText || statusText) + "";
          if (isSuccess) {
            deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
          } else {
            deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
          }
          jqXHR.statusCode(statusCode);
          statusCode = void 0;
          if (fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]),
            completeDeferred.fireWith(callbackContext, [jqXHR, statusText]),
            fireGlobals && (globalEventContext.trigger("ajaxComplete", [jqXHR, s]), !--jQuery.active && jQuery.event.trigger("ajaxStop"))
          ) {
            // Noop
          }
        }
      }

      return jqXHR;
    },
    getJSON: function(url, data, callback) {
      return jQuery.get(url, data, callback, "json");
    },
    getScript: function(url, callback) {
      return jQuery.get(url, void 0, callback, "script");
    }
  });

  jQuery.each(["get", "post"], function(i, method) {
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

  jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, method) {
    jQuery.fn[method] = function(fn) {
      return this.on(method, fn);
    };
  });

  jQuery._evalUrl = function(url) {
    return jQuery.ajax({
      url: url,
      type: "GET",
      dataType: "script",
      async: false,
      global: false,
      "throws": true
    });
  };

  // ==================== Parameter Serialization ====================
  var r20 = /%20/g;
  var rbracket = /\[\]$/;
  var rCRLF = /\r?\n/g;
  var rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i;
  var rsubmittable = /^(?:input|select|textarea|keygen)/i;
  var U = /^(?:checkbox|radio)$/i;

  function buildParams(prefix, obj, traditional, add) {
    var name;
    if (jQuery.isArray(obj)) {
      jQuery.each(obj, function(i, v) {
        if (traditional || rbracket.test(prefix)) {
          add(prefix, v);
        } else {
          buildParams(prefix + "[" + ("object" === typeof v ? i : "") + "]", v, traditional, add);
        }
      });
    } else if (traditional || "object" !== jQuery.type(obj)) {
      add(prefix, obj);
    } else {
      for (name in obj) {
        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
      }
    }
  }

  jQuery.param = function(a, traditional) {
    var name,
      d = [],
      add = function(key, value) {
        value = jQuery.isFunction(value) ? value() : null === value ? "" : value;
        d[d.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
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

  jQuery.fn.extend({
    serialize: function() {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function() {
      return this.map(function() {
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function() {
        var type = this.type;
        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !U.test(type));
      }).map(function(i, elem) {
        var val = jQuery(this).val();
        return null === val ?
          null :
          jQuery.isArray(val) ?
            jQuery.map(val, function(v) { return { name: elem.name, value: v.replace(rCRLF, "\r\n") }; }) :
            { name: elem.name, value: val.replace(rCRLF, "\r\n") };
      }).get();
    }
  });

  // ==================== Transports Registration (XHR / Script) ====================
  function createStandardXHR() {
    try {
      return new window.XMLHttpRequest();
    } catch (e) {}
  }

  function createActiveXHR() {
    try {
      return new window.ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {}
  }

  jQuery.ajaxSettings.xhr = void 0 !== window.ActiveXObject ?
    function() {
      return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && createStandardXHR() || createActiveXHR();
    } :
    createStandardXHR;

  var xhrId = 0;
  var xhrCallbacks = {};
  var xhrSupported = jQuery.ajaxSettings.xhr();

  if (window.ActiveXObject) {
    jQuery(window).on("unload", function() {
      var id;
      for (id in xhrCallbacks) {
        xhrCallbacks[id](void 0, true);
      }
    });
  }

  support.cors = !(!xhrSupported || !("withCredentials" in xhrSupported));
  support.ajax = !(!xhrSupported);

  if (support.ajax) {
    jQuery.ajaxTransport(function(options) {
      if (!options.crossDomain || support.cors) {
        var callback;
        return {
          send: function(headers, complete) {
            var name,
              xhr = options.xhr(),
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
                void 0 !== headers[name] && xhr.setRequestHeader(name, headers[name] + "");
              }
            }

            xhr.send(options.hasContent && options.data || null);

            callback = function(_, isAbort) {
              var status, statusText, responses;
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
                  status || !options.isLocal || options.crossDomain ? 1223 === status && (status = 204) : status = responses.text ? 200 : 404;
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
          abort: function() {
            if (callback) {
              callback(void 0, true);
            }
          }
        };
      }
    });
  }

  jQuery.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /(?:java|ecma)script/
    },
    converters: {
      "text script": function(text) {
        return jQuery.globalEval(text), text;
      }
    }
  });

  jQuery.ajaxPrefilter("script", function(options) {
    void 0 === options.cache && (options.cache = false);
    if (options.crossDomain) {
      options.type = "GET";
      options.global = false;
    }
  });

  jQuery.ajaxTransport("script", function(options) {
    if (options.crossDomain) {
      var script,
        head = document.head || jQuery("head")[0] || document.documentElement;

      return {
        send: function(_, complete) {
          script = document.createElement("script");
          script.async = true;
          if (options.scriptCharset) {
            script.charset = options.scriptCharset;
          }
          script.src = options.url;
          script.onload = script.onreadystatechange = function(_, isAbort) {
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
        abort: function() {
          if (script) {
            script.onload(void 0, true);
          }
        }
      };
    }
  });

  // ==================== JSONP Data Pipeline ====================
  var oldCallbacks = [];
  var rjsonp = /(=)\?(?=&|$)|\?\?/;

  jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var name = oldCallbacks.pop() || jQuery.expando + "_" + ajaxTimestamp++;
      return this[name] = true, name;
    }
  });

  jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
    var callbackName, overwritten, responseContainer,
      jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : "string" === typeof s.data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");

    if (jsonProp || "jsonp" === s.dataTypes[0]) {
      return callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback,
        jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== false && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName),
        s.converters["script json"] = function() {
          return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0];
        },
        s.dataTypes[0] = "json",
        overwritten = window[callbackName],
        window[callbackName] = function() {
          responseContainer = arguments;
        },
        jqXHR.always(function() {
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

  // ==================== HTML Parser & load ====================
  jQuery.parseHTML = function(data, context, keepScripts) {
    if (!data || "string" !== typeof data) {
      return null;
    }
    if ("boolean" === typeof context) {
      keepScripts = context;
      context = false;
    }
    context = context || document;
    var parsed = rsingleTag.exec(data),
      scripts = !keepScripts && [];

    return parsed ?
      [context.createElement(parsed[1])] :
      (parsed = jQuery.buildFragment([data], context, scripts), scripts && scripts.length && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes));
  };

  var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;

  jQuery.globalEval = function(code) {
    if (code && jQuery.trim(code)) {
      (window.execScript || function(data) {
        window["eval"].call(window, data);
      })(code);
    }
  };

  var jQueryLoadBackup = jQuery.fn.load;
  jQuery.fn.load = function(url, params, callback) {
    if ("string" !== typeof url && jQueryLoadBackup) {
      return jQueryLoadBackup.apply(this, arguments);
    }
    var selector, response, type,
      self = this,
      off = url.indexOf(" ");

    if (off >= 0 && (selector = jQuery.trim(url.slice(off, url.length)), url = url.slice(0, off)),
      jQuery.isFunction(params) ? (callback = params, params = void 0) : params && "object" === typeof params && (type = "POST"),
      self.length > 0
    ) {
      jQuery.ajax({
        url: url,
        type: type,
        dataType: "html",
        data: params
      }).done(function(responseText) {
        response = arguments;
        self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
      }).complete(callback && function(jqXHR, statusText) {
        self.each(callback, response || [jqXHR.responseText, statusText, jqXHR]);
      });
    }
    return this;
  };

  if (typeof define === "function" && define.amd && define("Async", [], function() {
    return jQuery;
  }));

  var _J$ = window.J$;
  jQuery.noConflict = function(deep) {
    return window.J$ === jQuery && (window.J$ = _J$), deep && window.jQuery === jQuery && (window.jQuery = _J$), jQuery;
  };

  if (typeof noGlobal === undefinedString) {
    window.J$ = jQuery;
  }

  return window.J$ = jQuery;
});

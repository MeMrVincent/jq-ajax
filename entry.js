import { jQuery } from "./node_modules/jquery/src/core.js";

// Include callbacks and deferred dependencies
import "./node_modules/jquery/src/callbacks.js";
import "./node_modules/jquery/src/deferred.js";
import "./node_modules/jquery/src/deferred/exceptionHook.js";

// Include serialization utility (jQuery.param)
import "./node_modules/jquery/src/serialize.js";

// Include attributes helper (.attr() and .prop() are required by script/jsonp transports)
import "./node_modules/jquery/src/attributes.js";

// Include DOM manipulation (.remove() is required to recycle script tags)
import "./node_modules/jquery/src/manipulation.js";

// Include events helper (.on() is required to monitor script load/error states)
import "./node_modules/jquery/src/event.js";

// Include main Ajax implementation and sub-transports
import "./node_modules/jquery/src/ajax.js";
import "./node_modules/jquery/src/ajax/xhr.js";
import "./node_modules/jquery/src/ajax/script.js";
import "./node_modules/jquery/src/ajax/jsonp.js";
import "./node_modules/jquery/src/ajax/binary.js";

// Optional: XML and HTML parsers (Required by DOM node instantiation)
import "./node_modules/jquery/src/core/parseXML.js";
import "./node_modules/jquery/src/core/parseHTML.js";

// Standard noConflict implementation
const _jQuery = globalThis.jQuery;
const _$ = globalThis.$;

jQuery.noConflict = function(deep) {
  if (globalThis.$ === jQuery) {
    globalThis.$ = _$;
  }
  if (deep && globalThis.jQuery === jQuery) {
    globalThis.jQuery = _jQuery;
  }
  return jQuery;
};

// Expose jQuery globally as default window.$ / window.jQuery
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = jQuery;
} else {
  globalThis.jQuery = globalThis.$ = jQuery;
}

export default jQuery;

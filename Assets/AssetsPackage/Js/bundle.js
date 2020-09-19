/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/GameMain.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@protobufjs/aspromise/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@protobufjs/aspromise/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = asPromise;

/**
 * Callback as used by {@link util.asPromise}.
 * @typedef asPromiseCallback
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {...*} params Additional arguments
 * @returns {undefined}
 */

/**
 * Returns a promise from a node-style callback function.
 * @memberof util
 * @param {asPromiseCallback} fn Function to call
 * @param {*} ctx Function context
 * @param {...*} params Function arguments
 * @returns {Promise<*>} Promisified function
 */
function asPromise(fn, ctx/*, varargs */) {
    var params  = new Array(arguments.length - 1),
        offset  = 0,
        index   = 2,
        pending = true;
    while (index < arguments.length)
        params[offset++] = arguments[index++];
    return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err/*, varargs */) {
            if (pending) {
                pending = false;
                if (err)
                    reject(err);
                else {
                    var params = new Array(arguments.length - 1),
                        offset = 0;
                    while (offset < params.length)
                        params[offset++] = arguments[offset];
                    resolve.apply(null, params);
                }
            }
        };
        try {
            fn.apply(ctx || null, params);
        } catch (err) {
            if (pending) {
                pending = false;
                reject(err);
            }
        }
    });
}


/***/ }),

/***/ "./node_modules/@protobufjs/base64/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@protobufjs/base64/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A minimal base64 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var base64 = exports;

/**
 * Calculates the byte length of a base64 encoded string.
 * @param {string} string Base64 encoded string
 * @returns {number} Byte length
 */
base64.length = function length(string) {
    var p = string.length;
    if (!p)
        return 0;
    var n = 0;
    while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
    return Math.ceil(string.length * 3) / 4 - n;
};

// Base64 encoding table
var b64 = new Array(64);

// Base64 decoding table
var s64 = new Array(123);

// 65..90, 97..122, 48..57, 43, 47
for (var i = 0; i < 64;)
    s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;

/**
 * Encodes a buffer to a base64 encoded string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} Base64 encoded string
 */
base64.encode = function encode(buffer, start, end) {
    var parts = null,
        chunk = [];
    var i = 0, // output index
        j = 0, // goto index
        t;     // temporary
    while (start < end) {
        var b = buffer[start++];
        switch (j) {
            case 0:
                chunk[i++] = b64[b >> 2];
                t = (b & 3) << 4;
                j = 1;
                break;
            case 1:
                chunk[i++] = b64[t | b >> 4];
                t = (b & 15) << 2;
                j = 2;
                break;
            case 2:
                chunk[i++] = b64[t | b >> 6];
                chunk[i++] = b64[b & 63];
                j = 0;
                break;
        }
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (j) {
        chunk[i++] = b64[t];
        chunk[i++] = 61;
        if (j === 1)
            chunk[i++] = 61;
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

var invalidEncoding = "invalid encoding";

/**
 * Decodes a base64 encoded string to a buffer.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Number of bytes written
 * @throws {Error} If encoding is invalid
 */
base64.decode = function decode(string, buffer, offset) {
    var start = offset;
    var j = 0, // goto index
        t;     // temporary
    for (var i = 0; i < string.length;) {
        var c = string.charCodeAt(i++);
        if (c === 61 && j > 1)
            break;
        if ((c = s64[c]) === undefined)
            throw Error(invalidEncoding);
        switch (j) {
            case 0:
                t = c;
                j = 1;
                break;
            case 1:
                buffer[offset++] = t << 2 | (c & 48) >> 4;
                t = c;
                j = 2;
                break;
            case 2:
                buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
                t = c;
                j = 3;
                break;
            case 3:
                buffer[offset++] = (t & 3) << 6 | c;
                j = 0;
                break;
        }
    }
    if (j === 1)
        throw Error(invalidEncoding);
    return offset - start;
};

/**
 * Tests if the specified string appears to be base64 encoded.
 * @param {string} string String to test
 * @returns {boolean} `true` if probably base64 encoded, otherwise false
 */
base64.test = function test(string) {
    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
};


/***/ }),

/***/ "./node_modules/@protobufjs/eventemitter/index.js":
/*!********************************************************!*\
  !*** ./node_modules/@protobufjs/eventemitter/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = EventEmitter;

/**
 * Constructs a new event emitter instance.
 * @classdesc A minimal event emitter.
 * @memberof util
 * @constructor
 */
function EventEmitter() {

    /**
     * Registered listeners.
     * @type {Object.<string,*>}
     * @private
     */
    this._listeners = {};
}

/**
 * Registers an event listener.
 * @param {string} evt Event name
 * @param {function} fn Listener
 * @param {*} [ctx] Listener context
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.on = function on(evt, fn, ctx) {
    (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn  : fn,
        ctx : ctx || this
    });
    return this;
};

/**
 * Removes an event listener or any matching listeners if arguments are omitted.
 * @param {string} [evt] Event name. Removes all listeners if omitted.
 * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.off = function off(evt, fn) {
    if (evt === undefined)
        this._listeners = {};
    else {
        if (fn === undefined)
            this._listeners[evt] = [];
        else {
            var listeners = this._listeners[evt];
            for (var i = 0; i < listeners.length;)
                if (listeners[i].fn === fn)
                    listeners.splice(i, 1);
                else
                    ++i;
        }
    }
    return this;
};

/**
 * Emits an event by calling its listeners with the specified arguments.
 * @param {string} evt Event name
 * @param {...*} args Arguments
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.emit = function emit(evt) {
    var listeners = this._listeners[evt];
    if (listeners) {
        var args = [],
            i = 1;
        for (; i < arguments.length;)
            args.push(arguments[i++]);
        for (i = 0; i < listeners.length;)
            listeners[i].fn.apply(listeners[i++].ctx, args);
    }
    return this;
};


/***/ }),

/***/ "./node_modules/@protobufjs/float/index.js":
/*!*************************************************!*\
  !*** ./node_modules/@protobufjs/float/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = factory(factory);

/**
 * Reads / writes floats / doubles from / to buffers.
 * @name util.float
 * @namespace
 */

/**
 * Writes a 32 bit float to a buffer using little endian byte order.
 * @name util.float.writeFloatLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 32 bit float to a buffer using big endian byte order.
 * @name util.float.writeFloatBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 32 bit float from a buffer using little endian byte order.
 * @name util.float.readFloatLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 32 bit float from a buffer using big endian byte order.
 * @name util.float.readFloatBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Writes a 64 bit double to a buffer using little endian byte order.
 * @name util.float.writeDoubleLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 64 bit double to a buffer using big endian byte order.
 * @name util.float.writeDoubleBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 64 bit double from a buffer using little endian byte order.
 * @name util.float.readDoubleLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 64 bit double from a buffer using big endian byte order.
 * @name util.float.readDoubleBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

// Factory function for the purpose of node-based testing in modified global environments
function factory(exports) {

    // float: typed array
    if (typeof Float32Array !== "undefined") (function() {

        var f32 = new Float32Array([ -0 ]),
            f8b = new Uint8Array(f32.buffer),
            le  = f8b[3] === 128;

        function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
        }

        function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
        /* istanbul ignore next */
        exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;

        function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
        }

        function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos    ];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
        }

        /* istanbul ignore next */
        exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
        /* istanbul ignore next */
        exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;

    // float: ieee754
    })(); else (function() {

        function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0)
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos);
            else if (isNaN(val))
                writeUint(2143289344, buf, pos);
            else if (val > 3.4028234663852886e+38) // +-Infinity
                writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 1.1754943508222875e-38) // denormal
                writeUint((sign << 31 | Math.round(val / 1.401298464324817e-45)) >>> 0, buf, pos);
            else {
                var exponent = Math.floor(Math.log(val) / Math.LN2),
                    mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
                writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
        }

        exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
        exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);

        function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos),
                sign = (uint >> 31) * 2 + 1,
                exponent = uint >>> 23 & 255,
                mantissa = uint & 8388607;
            return exponent === 255
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 1.401298464324817e-45 * mantissa
                : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
        }

        exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
        exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);

    })();

    // double: typed array
    if (typeof Float64Array !== "undefined") (function() {

        var f64 = new Float64Array([-0]),
            f8b = new Uint8Array(f64.buffer),
            le  = f8b[7] === 128;

        function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
        }

        function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
        /* istanbul ignore next */
        exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;

        function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
        }

        function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos    ];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
        }

        /* istanbul ignore next */
        exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
        /* istanbul ignore next */
        exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;

    // double: ieee754
    })(); else (function() {

        function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0) {
                writeUint(0, buf, pos + off0);
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
                writeUint(0, buf, pos + off0);
                writeUint(2146959360, buf, pos + off1);
            } else if (val > 1.7976931348623157e+308) { // +-Infinity
                writeUint(0, buf, pos + off0);
                writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
                var mantissa;
                if (val < 2.2250738585072014e-308) { // denormal
                    mantissa = val / 5e-324;
                    writeUint(mantissa >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
                } else {
                    var exponent = Math.floor(Math.log(val) / Math.LN2);
                    if (exponent === 1024)
                        exponent = 1023;
                    mantissa = val * Math.pow(2, -exponent);
                    writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
                }
            }
        }

        exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
        exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);

        function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0),
                hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1,
                exponent = hi >>> 20 & 2047,
                mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 5e-324 * mantissa
                : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
        }

        exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
        exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);

    })();

    return exports;
}

// uint helpers

function writeUintLE(val, buf, pos) {
    buf[pos    ] =  val        & 255;
    buf[pos + 1] =  val >>> 8  & 255;
    buf[pos + 2] =  val >>> 16 & 255;
    buf[pos + 3] =  val >>> 24;
}

function writeUintBE(val, buf, pos) {
    buf[pos    ] =  val >>> 24;
    buf[pos + 1] =  val >>> 16 & 255;
    buf[pos + 2] =  val >>> 8  & 255;
    buf[pos + 3] =  val        & 255;
}

function readUintLE(buf, pos) {
    return (buf[pos    ]
          | buf[pos + 1] << 8
          | buf[pos + 2] << 16
          | buf[pos + 3] << 24) >>> 0;
}

function readUintBE(buf, pos) {
    return (buf[pos    ] << 24
          | buf[pos + 1] << 16
          | buf[pos + 2] << 8
          | buf[pos + 3]) >>> 0;
}


/***/ }),

/***/ "./node_modules/@protobufjs/inquire/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@protobufjs/inquire/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = inquire;

/**
 * Requires a module only if available.
 * @memberof util
 * @param {string} moduleName Module to require
 * @returns {?Object} Required module if available and not empty, otherwise `null`
 */
function inquire(moduleName) {
    try {
        var mod = eval("quire".replace(/^/,"re"))(moduleName); // eslint-disable-line no-eval
        if (mod && (mod.length || Object.keys(mod).length))
            return mod;
    } catch (e) {} // eslint-disable-line no-empty
    return null;
}


/***/ }),

/***/ "./node_modules/@protobufjs/pool/index.js":
/*!************************************************!*\
  !*** ./node_modules/@protobufjs/pool/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = pool;

/**
 * An allocator as used by {@link util.pool}.
 * @typedef PoolAllocator
 * @type {function}
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */

/**
 * A slicer as used by {@link util.pool}.
 * @typedef PoolSlicer
 * @type {function}
 * @param {number} start Start offset
 * @param {number} end End offset
 * @returns {Uint8Array} Buffer slice
 * @this {Uint8Array}
 */

/**
 * A general purpose buffer pool.
 * @memberof util
 * @function
 * @param {PoolAllocator} alloc Allocator
 * @param {PoolSlicer} slice Slicer
 * @param {number} [size=8192] Slab size
 * @returns {PoolAllocator} Pooled allocator
 */
function pool(alloc, slice, size) {
    var SIZE   = size || 8192;
    var MAX    = SIZE >>> 1;
    var slab   = null;
    var offset = SIZE;
    return function pool_alloc(size) {
        if (size < 1 || size > MAX)
            return alloc(size);
        if (offset + size > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size);
        if (offset & 7) // align to 32 bit
            offset = (offset | 7) + 1;
        return buf;
    };
}


/***/ }),

/***/ "./node_modules/@protobufjs/utf8/index.js":
/*!************************************************!*\
  !*** ./node_modules/@protobufjs/utf8/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A minimal UTF8 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var utf8 = exports;

/**
 * Calculates the UTF8 byte length of a string.
 * @param {string} string String
 * @returns {number} Byte length
 */
utf8.length = function utf8_length(string) {
    var len = 0,
        c = 0;
    for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
            len += 1;
        else if (c < 2048)
            len += 2;
        else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
            ++i;
            len += 4;
        } else
            len += 3;
    }
    return len;
};

/**
 * Reads UTF8 bytes as a string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} String read
 */
utf8.read = function utf8_read(buffer, start, end) {
    var len = end - start;
    if (len < 1)
        return "";
    var parts = null,
        chunk = [],
        i = 0, // char offset
        t;     // temporary
    while (start < end) {
        t = buffer[start++];
        if (t < 128)
            chunk[i++] = t;
        else if (t > 191 && t < 224)
            chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
            chunk[i++] = 0xD800 + (t >> 10);
            chunk[i++] = 0xDC00 + (t & 1023);
        } else
            chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

/**
 * Writes a string as UTF8 bytes.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Bytes written
 */
utf8.write = function utf8_write(string, buffer, offset) {
    var start = offset,
        c1, // character 1
        c2; // character 2
    for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
            buffer[offset++] = c1;
        } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6       | 192;
            buffer[offset++] = c1       & 63 | 128;
        } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
            ++i;
            buffer[offset++] = c1 >> 18      | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        } else {
            buffer[offset++] = c1 >> 12      | 224;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        }
    }
    return offset - start;
};


/***/ }),

/***/ "./node_modules/long/src/long.js":
/*!***************************************!*\
  !*** ./node_modules/long/src/long.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = Long;

/**
 * wasm optimizations, to do native i64 multiplication and divide
 */
var wasm = null;

try {
  wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
    0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11
  ])), {}).exports;
} catch (e) {
  // no wasm support :(
}

/**
 * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
 *  See the from* functions below for more convenient ways of constructing Longs.
 * @exports Long
 * @class A Long class for representing a 64 bit two's-complement integer value.
 * @param {number} low The low (signed) 32 bits of the long
 * @param {number} high The high (signed) 32 bits of the long
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @constructor
 */
function Long(low, high, unsigned) {

    /**
     * The low 32 bits as a signed value.
     * @type {number}
     */
    this.low = low | 0;

    /**
     * The high 32 bits as a signed value.
     * @type {number}
     */
    this.high = high | 0;

    /**
     * Whether unsigned or not.
     * @type {boolean}
     */
    this.unsigned = !!unsigned;
}

// The internal representation of a long is the two given signed, 32-bit values.
// We use 32-bit pieces because these are the size of integers on which
// Javascript performs bit-operations.  For operations like addition and
// multiplication, we split each number into 16 bit pieces, which can easily be
// multiplied within Javascript's floating-point representation without overflow
// or change in sign.
//
// In the algorithms below, we frequently reduce the negative case to the
// positive case by negating the input(s) and then post-processing the result.
// Note that we must ALWAYS check specially whether those values are MIN_VALUE
// (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
// a positive number, it overflows back into a negative).  Not handling this
// case would often result in infinite recursion.
//
// Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
// methods on which they depend.

/**
 * An indicator used to reliably determine if an object is a Long or not.
 * @type {boolean}
 * @const
 * @private
 */
Long.prototype.__isLong__;

Object.defineProperty(Long.prototype, "__isLong__", { value: true });

/**
 * @function
 * @param {*} obj Object
 * @returns {boolean}
 * @inner
 */
function isLong(obj) {
    return (obj && obj["__isLong__"]) === true;
}

/**
 * Tests if the specified object is a Long.
 * @function
 * @param {*} obj Object
 * @returns {boolean}
 */
Long.isLong = isLong;

/**
 * A cache of the Long representations of small integer values.
 * @type {!Object}
 * @inner
 */
var INT_CACHE = {};

/**
 * A cache of the Long representations of small unsigned integer values.
 * @type {!Object}
 * @inner
 */
var UINT_CACHE = {};

/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromInt(value, unsigned) {
    var obj, cachedObj, cache;
    if (unsigned) {
        value >>>= 0;
        if (cache = (0 <= value && value < 256)) {
            cachedObj = UINT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
        if (cache)
            UINT_CACHE[value] = obj;
        return obj;
    } else {
        value |= 0;
        if (cache = (-128 <= value && value < 128)) {
            cachedObj = INT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = fromBits(value, value < 0 ? -1 : 0, false);
        if (cache)
            INT_CACHE[value] = obj;
        return obj;
    }
}

/**
 * Returns a Long representing the given 32 bit integer value.
 * @function
 * @param {number} value The 32 bit integer in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromInt = fromInt;

/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromNumber(value, unsigned) {
    if (isNaN(value))
        return unsigned ? UZERO : ZERO;
    if (unsigned) {
        if (value < 0)
            return UZERO;
        if (value >= TWO_PWR_64_DBL)
            return MAX_UNSIGNED_VALUE;
    } else {
        if (value <= -TWO_PWR_63_DBL)
            return MIN_VALUE;
        if (value + 1 >= TWO_PWR_63_DBL)
            return MAX_VALUE;
    }
    if (value < 0)
        return fromNumber(-value, unsigned).neg();
    return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
}

/**
 * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
 * @function
 * @param {number} value The number in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromNumber = fromNumber;

/**
 * @param {number} lowBits
 * @param {number} highBits
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromBits(lowBits, highBits, unsigned) {
    return new Long(lowBits, highBits, unsigned);
}

/**
 * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
 *  assumed to use 32 bits.
 * @function
 * @param {number} lowBits The low 32 bits
 * @param {number} highBits The high 32 bits
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromBits = fromBits;

/**
 * @function
 * @param {number} base
 * @param {number} exponent
 * @returns {number}
 * @inner
 */
var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)

/**
 * @param {string} str
 * @param {(boolean|number)=} unsigned
 * @param {number=} radix
 * @returns {!Long}
 * @inner
 */
function fromString(str, unsigned, radix) {
    if (str.length === 0)
        throw Error('empty string');
    if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
        return ZERO;
    if (typeof unsigned === 'number') {
        // For goog.math.long compatibility
        radix = unsigned,
        unsigned = false;
    } else {
        unsigned = !! unsigned;
    }
    radix = radix || 10;
    if (radix < 2 || 36 < radix)
        throw RangeError('radix');

    var p;
    if ((p = str.indexOf('-')) > 0)
        throw Error('interior hyphen');
    else if (p === 0) {
        return fromString(str.substring(1), unsigned, radix).neg();
    }

    // Do several (8) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = fromNumber(pow_dbl(radix, 8));

    var result = ZERO;
    for (var i = 0; i < str.length; i += 8) {
        var size = Math.min(8, str.length - i),
            value = parseInt(str.substring(i, i + size), radix);
        if (size < 8) {
            var power = fromNumber(pow_dbl(radix, size));
            result = result.mul(power).add(fromNumber(value));
        } else {
            result = result.mul(radixToPower);
            result = result.add(fromNumber(value));
        }
    }
    result.unsigned = unsigned;
    return result;
}

/**
 * Returns a Long representation of the given string, written using the specified radix.
 * @function
 * @param {string} str The textual representation of the Long
 * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to signed
 * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
 * @returns {!Long} The corresponding Long value
 */
Long.fromString = fromString;

/**
 * @function
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromValue(val, unsigned) {
    if (typeof val === 'number')
        return fromNumber(val, unsigned);
    if (typeof val === 'string')
        return fromString(val, unsigned);
    // Throws for non-objects, converts non-instanceof Long:
    return fromBits(val.low, val.high, typeof unsigned === 'boolean' ? unsigned : val.unsigned);
}

/**
 * Converts the specified value to a Long using the appropriate from* function for its type.
 * @function
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long}
 */
Long.fromValue = fromValue;

// NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
// no runtime penalty for these.

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_16_DBL = 1 << 16;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_24_DBL = 1 << 24;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;

/**
 * @type {!Long}
 * @const
 * @inner
 */
var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);

/**
 * @type {!Long}
 * @inner
 */
var ZERO = fromInt(0);

/**
 * Signed zero.
 * @type {!Long}
 */
Long.ZERO = ZERO;

/**
 * @type {!Long}
 * @inner
 */
var UZERO = fromInt(0, true);

/**
 * Unsigned zero.
 * @type {!Long}
 */
Long.UZERO = UZERO;

/**
 * @type {!Long}
 * @inner
 */
var ONE = fromInt(1);

/**
 * Signed one.
 * @type {!Long}
 */
Long.ONE = ONE;

/**
 * @type {!Long}
 * @inner
 */
var UONE = fromInt(1, true);

/**
 * Unsigned one.
 * @type {!Long}
 */
Long.UONE = UONE;

/**
 * @type {!Long}
 * @inner
 */
var NEG_ONE = fromInt(-1);

/**
 * Signed negative one.
 * @type {!Long}
 */
Long.NEG_ONE = NEG_ONE;

/**
 * @type {!Long}
 * @inner
 */
var MAX_VALUE = fromBits(0xFFFFFFFF|0, 0x7FFFFFFF|0, false);

/**
 * Maximum signed value.
 * @type {!Long}
 */
Long.MAX_VALUE = MAX_VALUE;

/**
 * @type {!Long}
 * @inner
 */
var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF|0, 0xFFFFFFFF|0, true);

/**
 * Maximum unsigned value.
 * @type {!Long}
 */
Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;

/**
 * @type {!Long}
 * @inner
 */
var MIN_VALUE = fromBits(0, 0x80000000|0, false);

/**
 * Minimum signed value.
 * @type {!Long}
 */
Long.MIN_VALUE = MIN_VALUE;

/**
 * @alias Long.prototype
 * @inner
 */
var LongPrototype = Long.prototype;

/**
 * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
 * @returns {number}
 */
LongPrototype.toInt = function toInt() {
    return this.unsigned ? this.low >>> 0 : this.low;
};

/**
 * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
 * @returns {number}
 */
LongPrototype.toNumber = function toNumber() {
    if (this.unsigned)
        return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
    return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
};

/**
 * Converts the Long to a string written in the specified radix.
 * @param {number=} radix Radix (2-36), defaults to 10
 * @returns {string}
 * @override
 * @throws {RangeError} If `radix` is out of range
 */
LongPrototype.toString = function toString(radix) {
    radix = radix || 10;
    if (radix < 2 || 36 < radix)
        throw RangeError('radix');
    if (this.isZero())
        return '0';
    if (this.isNegative()) { // Unsigned Longs are never negative
        if (this.eq(MIN_VALUE)) {
            // We need to change the Long value before it can be negated, so we remove
            // the bottom-most digit in this base and then recurse to do the rest.
            var radixLong = fromNumber(radix),
                div = this.div(radixLong),
                rem1 = div.mul(radixLong).sub(this);
            return div.toString(radix) + rem1.toInt().toString(radix);
        } else
            return '-' + this.neg().toString(radix);
    }

    // Do several (6) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
        rem = this;
    var result = '';
    while (true) {
        var remDiv = rem.div(radixToPower),
            intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
            digits = intval.toString(radix);
        rem = remDiv;
        if (rem.isZero())
            return digits + result;
        else {
            while (digits.length < 6)
                digits = '0' + digits;
            result = '' + digits + result;
        }
    }
};

/**
 * Gets the high 32 bits as a signed integer.
 * @returns {number} Signed high bits
 */
LongPrototype.getHighBits = function getHighBits() {
    return this.high;
};

/**
 * Gets the high 32 bits as an unsigned integer.
 * @returns {number} Unsigned high bits
 */
LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
    return this.high >>> 0;
};

/**
 * Gets the low 32 bits as a signed integer.
 * @returns {number} Signed low bits
 */
LongPrototype.getLowBits = function getLowBits() {
    return this.low;
};

/**
 * Gets the low 32 bits as an unsigned integer.
 * @returns {number} Unsigned low bits
 */
LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
    return this.low >>> 0;
};

/**
 * Gets the number of bits needed to represent the absolute value of this Long.
 * @returns {number}
 */
LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
    if (this.isNegative()) // Unsigned Longs are never negative
        return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
    var val = this.high != 0 ? this.high : this.low;
    for (var bit = 31; bit > 0; bit--)
        if ((val & (1 << bit)) != 0)
            break;
    return this.high != 0 ? bit + 33 : bit + 1;
};

/**
 * Tests if this Long's value equals zero.
 * @returns {boolean}
 */
LongPrototype.isZero = function isZero() {
    return this.high === 0 && this.low === 0;
};

/**
 * Tests if this Long's value equals zero. This is an alias of {@link Long#isZero}.
 * @returns {boolean}
 */
LongPrototype.eqz = LongPrototype.isZero;

/**
 * Tests if this Long's value is negative.
 * @returns {boolean}
 */
LongPrototype.isNegative = function isNegative() {
    return !this.unsigned && this.high < 0;
};

/**
 * Tests if this Long's value is positive.
 * @returns {boolean}
 */
LongPrototype.isPositive = function isPositive() {
    return this.unsigned || this.high >= 0;
};

/**
 * Tests if this Long's value is odd.
 * @returns {boolean}
 */
LongPrototype.isOdd = function isOdd() {
    return (this.low & 1) === 1;
};

/**
 * Tests if this Long's value is even.
 * @returns {boolean}
 */
LongPrototype.isEven = function isEven() {
    return (this.low & 1) === 0;
};

/**
 * Tests if this Long's value equals the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.equals = function equals(other) {
    if (!isLong(other))
        other = fromValue(other);
    if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
        return false;
    return this.high === other.high && this.low === other.low;
};

/**
 * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.eq = LongPrototype.equals;

/**
 * Tests if this Long's value differs from the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.notEquals = function notEquals(other) {
    return !this.eq(/* validates */ other);
};

/**
 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.neq = LongPrototype.notEquals;

/**
 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.ne = LongPrototype.notEquals;

/**
 * Tests if this Long's value is less than the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lessThan = function lessThan(other) {
    return this.comp(/* validates */ other) < 0;
};

/**
 * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lt = LongPrototype.lessThan;

/**
 * Tests if this Long's value is less than or equal the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
    return this.comp(/* validates */ other) <= 0;
};

/**
 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lte = LongPrototype.lessThanOrEqual;

/**
 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.le = LongPrototype.lessThanOrEqual;

/**
 * Tests if this Long's value is greater than the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.greaterThan = function greaterThan(other) {
    return this.comp(/* validates */ other) > 0;
};

/**
 * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.gt = LongPrototype.greaterThan;

/**
 * Tests if this Long's value is greater than or equal the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
    return this.comp(/* validates */ other) >= 0;
};

/**
 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.gte = LongPrototype.greaterThanOrEqual;

/**
 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.ge = LongPrototype.greaterThanOrEqual;

/**
 * Compares this Long's value with the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
 *  if the given one is greater
 */
LongPrototype.compare = function compare(other) {
    if (!isLong(other))
        other = fromValue(other);
    if (this.eq(other))
        return 0;
    var thisNeg = this.isNegative(),
        otherNeg = other.isNegative();
    if (thisNeg && !otherNeg)
        return -1;
    if (!thisNeg && otherNeg)
        return 1;
    // At this point the sign bits are the same
    if (!this.unsigned)
        return this.sub(other).isNegative() ? -1 : 1;
    // Both are positive if at least one is unsigned
    return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
};

/**
 * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
 *  if the given one is greater
 */
LongPrototype.comp = LongPrototype.compare;

/**
 * Negates this Long's value.
 * @returns {!Long} Negated Long
 */
LongPrototype.negate = function negate() {
    if (!this.unsigned && this.eq(MIN_VALUE))
        return MIN_VALUE;
    return this.not().add(ONE);
};

/**
 * Negates this Long's value. This is an alias of {@link Long#negate}.
 * @function
 * @returns {!Long} Negated Long
 */
LongPrototype.neg = LongPrototype.negate;

/**
 * Returns the sum of this and the specified Long.
 * @param {!Long|number|string} addend Addend
 * @returns {!Long} Sum
 */
LongPrototype.add = function add(addend) {
    if (!isLong(addend))
        addend = fromValue(addend);

    // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;

    var b48 = addend.high >>> 16;
    var b32 = addend.high & 0xFFFF;
    var b16 = addend.low >>> 16;
    var b00 = addend.low & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 + b48;
    c48 &= 0xFFFF;
    return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
};

/**
 * Returns the difference of this and the specified Long.
 * @param {!Long|number|string} subtrahend Subtrahend
 * @returns {!Long} Difference
 */
LongPrototype.subtract = function subtract(subtrahend) {
    if (!isLong(subtrahend))
        subtrahend = fromValue(subtrahend);
    return this.add(subtrahend.neg());
};

/**
 * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
 * @function
 * @param {!Long|number|string} subtrahend Subtrahend
 * @returns {!Long} Difference
 */
LongPrototype.sub = LongPrototype.subtract;

/**
 * Returns the product of this and the specified Long.
 * @param {!Long|number|string} multiplier Multiplier
 * @returns {!Long} Product
 */
LongPrototype.multiply = function multiply(multiplier) {
    if (this.isZero())
        return ZERO;
    if (!isLong(multiplier))
        multiplier = fromValue(multiplier);

    // use wasm support if present
    if (wasm) {
        var low = wasm.mul(this.low,
                           this.high,
                           multiplier.low,
                           multiplier.high);
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    if (multiplier.isZero())
        return ZERO;
    if (this.eq(MIN_VALUE))
        return multiplier.isOdd() ? MIN_VALUE : ZERO;
    if (multiplier.eq(MIN_VALUE))
        return this.isOdd() ? MIN_VALUE : ZERO;

    if (this.isNegative()) {
        if (multiplier.isNegative())
            return this.neg().mul(multiplier.neg());
        else
            return this.neg().mul(multiplier).neg();
    } else if (multiplier.isNegative())
        return this.mul(multiplier.neg()).neg();

    // If both longs are small, use float multiplication
    if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
        return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);

    // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
    // We can skip products that would overflow.

    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;

    var b48 = multiplier.high >>> 16;
    var b32 = multiplier.high & 0xFFFF;
    var b16 = multiplier.low >>> 16;
    var b00 = multiplier.low & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 0xFFFF;
    return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
};

/**
 * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
 * @function
 * @param {!Long|number|string} multiplier Multiplier
 * @returns {!Long} Product
 */
LongPrototype.mul = LongPrototype.multiply;

/**
 * Returns this Long divided by the specified. The result is signed if this Long is signed or
 *  unsigned if this Long is unsigned.
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Quotient
 */
LongPrototype.divide = function divide(divisor) {
    if (!isLong(divisor))
        divisor = fromValue(divisor);
    if (divisor.isZero())
        throw Error('division by zero');

    // use wasm support if present
    if (wasm) {
        // guard against signed division overflow: the largest
        // negative number / -1 would be 1 larger than the largest
        // positive number, due to two's complement.
        if (!this.unsigned &&
            this.high === -0x80000000 &&
            divisor.low === -1 && divisor.high === -1) {
            // be consistent with non-wasm code path
            return this;
        }
        var low = (this.unsigned ? wasm.div_u : wasm.div_s)(
            this.low,
            this.high,
            divisor.low,
            divisor.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    if (this.isZero())
        return this.unsigned ? UZERO : ZERO;
    var approx, rem, res;
    if (!this.unsigned) {
        // This section is only relevant for signed longs and is derived from the
        // closure library as a whole.
        if (this.eq(MIN_VALUE)) {
            if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
                return MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
            else if (divisor.eq(MIN_VALUE))
                return ONE;
            else {
                // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                var halfThis = this.shr(1);
                approx = halfThis.div(divisor).shl(1);
                if (approx.eq(ZERO)) {
                    return divisor.isNegative() ? ONE : NEG_ONE;
                } else {
                    rem = this.sub(divisor.mul(approx));
                    res = approx.add(rem.div(divisor));
                    return res;
                }
            }
        } else if (divisor.eq(MIN_VALUE))
            return this.unsigned ? UZERO : ZERO;
        if (this.isNegative()) {
            if (divisor.isNegative())
                return this.neg().div(divisor.neg());
            return this.neg().div(divisor).neg();
        } else if (divisor.isNegative())
            return this.div(divisor.neg()).neg();
        res = ZERO;
    } else {
        // The algorithm below has not been made for unsigned longs. It's therefore
        // required to take special care of the MSB prior to running it.
        if (!divisor.unsigned)
            divisor = divisor.toUnsigned();
        if (divisor.gt(this))
            return UZERO;
        if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
            return UONE;
        res = UZERO;
    }

    // Repeat the following until the remainder is less than other:  find a
    // floating-point that approximates remainder / other *from below*, add this
    // into the result, and subtract it from the remainder.  It is critical that
    // the approximate value is less than or equal to the real value so that the
    // remainder never becomes negative.
    rem = this;
    while (rem.gte(divisor)) {
        // Approximate the result of division. This may be a little greater or
        // smaller than the actual value.
        approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));

        // We will tweak the approximate result by changing it in the 48-th digit or
        // the smallest non-fractional digit, whichever is larger.
        var log2 = Math.ceil(Math.log(approx) / Math.LN2),
            delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48),

        // Decrease the approximation until it is smaller than the remainder.  Note
        // that if it is too large, the product overflows and is negative.
            approxRes = fromNumber(approx),
            approxRem = approxRes.mul(divisor);
        while (approxRem.isNegative() || approxRem.gt(rem)) {
            approx -= delta;
            approxRes = fromNumber(approx, this.unsigned);
            approxRem = approxRes.mul(divisor);
        }

        // We know the answer can't be zero... and actually, zero would cause
        // infinite recursion since we would make no progress.
        if (approxRes.isZero())
            approxRes = ONE;

        res = res.add(approxRes);
        rem = rem.sub(approxRem);
    }
    return res;
};

/**
 * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Quotient
 */
LongPrototype.div = LongPrototype.divide;

/**
 * Returns this Long modulo the specified.
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.modulo = function modulo(divisor) {
    if (!isLong(divisor))
        divisor = fromValue(divisor);

    // use wasm support if present
    if (wasm) {
        var low = (this.unsigned ? wasm.rem_u : wasm.rem_s)(
            this.low,
            this.high,
            divisor.low,
            divisor.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    return this.sub(this.div(divisor).mul(divisor));
};

/**
 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.mod = LongPrototype.modulo;

/**
 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.rem = LongPrototype.modulo;

/**
 * Returns the bitwise NOT of this Long.
 * @returns {!Long}
 */
LongPrototype.not = function not() {
    return fromBits(~this.low, ~this.high, this.unsigned);
};

/**
 * Returns the bitwise AND of this Long and the specified.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.and = function and(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
};

/**
 * Returns the bitwise OR of this Long and the specified.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.or = function or(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
};

/**
 * Returns the bitwise XOR of this Long and the given one.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.xor = function xor(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
};

/**
 * Returns this Long with bits shifted to the left by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftLeft = function shiftLeft(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    if ((numBits &= 63) === 0)
        return this;
    else if (numBits < 32)
        return fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
    else
        return fromBits(0, this.low << (numBits - 32), this.unsigned);
};

/**
 * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shl = LongPrototype.shiftLeft;

/**
 * Returns this Long with bits arithmetically shifted to the right by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftRight = function shiftRight(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    if ((numBits &= 63) === 0)
        return this;
    else if (numBits < 32)
        return fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
    else
        return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
};

/**
 * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shr = LongPrototype.shiftRight;

/**
 * Returns this Long with bits logically shifted to the right by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    numBits &= 63;
    if (numBits === 0)
        return this;
    else {
        var high = this.high;
        if (numBits < 32) {
            var low = this.low;
            return fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
        } else if (numBits === 32)
            return fromBits(high, 0, this.unsigned);
        else
            return fromBits(high >>> (numBits - 32), 0, this.unsigned);
    }
};

/**
 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shru = LongPrototype.shiftRightUnsigned;

/**
 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;

/**
 * Converts this Long to signed.
 * @returns {!Long} Signed long
 */
LongPrototype.toSigned = function toSigned() {
    if (!this.unsigned)
        return this;
    return fromBits(this.low, this.high, false);
};

/**
 * Converts this Long to unsigned.
 * @returns {!Long} Unsigned long
 */
LongPrototype.toUnsigned = function toUnsigned() {
    if (this.unsigned)
        return this;
    return fromBits(this.low, this.high, true);
};

/**
 * Converts this Long to its byte representation.
 * @param {boolean=} le Whether little or big endian, defaults to big endian
 * @returns {!Array.<number>} Byte representation
 */
LongPrototype.toBytes = function toBytes(le) {
    return le ? this.toBytesLE() : this.toBytesBE();
};

/**
 * Converts this Long to its little endian byte representation.
 * @returns {!Array.<number>} Little endian byte representation
 */
LongPrototype.toBytesLE = function toBytesLE() {
    var hi = this.high,
        lo = this.low;
    return [
        lo        & 0xff,
        lo >>>  8 & 0xff,
        lo >>> 16 & 0xff,
        lo >>> 24       ,
        hi        & 0xff,
        hi >>>  8 & 0xff,
        hi >>> 16 & 0xff,
        hi >>> 24
    ];
};

/**
 * Converts this Long to its big endian byte representation.
 * @returns {!Array.<number>} Big endian byte representation
 */
LongPrototype.toBytesBE = function toBytesBE() {
    var hi = this.high,
        lo = this.low;
    return [
        hi >>> 24       ,
        hi >>> 16 & 0xff,
        hi >>>  8 & 0xff,
        hi        & 0xff,
        lo >>> 24       ,
        lo >>> 16 & 0xff,
        lo >>>  8 & 0xff,
        lo        & 0xff
    ];
};

/**
 * Creates a Long from its byte representation.
 * @param {!Array.<number>} bytes Byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @param {boolean=} le Whether little or big endian, defaults to big endian
 * @returns {Long} The corresponding Long value
 */
Long.fromBytes = function fromBytes(bytes, unsigned, le) {
    return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
};

/**
 * Creates a Long from its little endian byte representation.
 * @param {!Array.<number>} bytes Little endian byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {Long} The corresponding Long value
 */
Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
    return new Long(
        bytes[0]       |
        bytes[1] <<  8 |
        bytes[2] << 16 |
        bytes[3] << 24,
        bytes[4]       |
        bytes[5] <<  8 |
        bytes[6] << 16 |
        bytes[7] << 24,
        unsigned
    );
};

/**
 * Creates a Long from its big endian byte representation.
 * @param {!Array.<number>} bytes Big endian byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {Long} The corresponding Long value
 */
Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
    return new Long(
        bytes[4] << 24 |
        bytes[5] << 16 |
        bytes[6] <<  8 |
        bytes[7],
        bytes[0] << 24 |
        bytes[1] << 16 |
        bytes[2] <<  8 |
        bytes[3],
        unsigned
    );
};


/***/ }),

/***/ "./node_modules/protobufjs/minimal.js":
/*!********************************************!*\
  !*** ./node_modules/protobufjs/minimal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// minimal library entry point.


module.exports = __webpack_require__(/*! ./src/index-minimal */ "./node_modules/protobufjs/src/index-minimal.js");


/***/ }),

/***/ "./node_modules/protobufjs/src/index-minimal.js":
/*!******************************************************!*\
  !*** ./node_modules/protobufjs/src/index-minimal.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var protobuf = exports;

/**
 * Build type, one of `"full"`, `"light"` or `"minimal"`.
 * @name build
 * @type {string}
 * @const
 */
protobuf.build = "minimal";

// Serialization
protobuf.Writer       = __webpack_require__(/*! ./writer */ "./node_modules/protobufjs/src/writer.js");
protobuf.BufferWriter = __webpack_require__(/*! ./writer_buffer */ "./node_modules/protobufjs/src/writer_buffer.js");
protobuf.Reader       = __webpack_require__(/*! ./reader */ "./node_modules/protobufjs/src/reader.js");
protobuf.BufferReader = __webpack_require__(/*! ./reader_buffer */ "./node_modules/protobufjs/src/reader_buffer.js");

// Utility
protobuf.util         = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");
protobuf.rpc          = __webpack_require__(/*! ./rpc */ "./node_modules/protobufjs/src/rpc.js");
protobuf.roots        = __webpack_require__(/*! ./roots */ "./node_modules/protobufjs/src/roots.js");
protobuf.configure    = configure;

/* istanbul ignore next */
/**
 * Reconfigures the library according to the environment.
 * @returns {undefined}
 */
function configure() {
    protobuf.util._configure();
    protobuf.Writer._configure(protobuf.BufferWriter);
    protobuf.Reader._configure(protobuf.BufferReader);
}

// Set up buffer utility according to the environment
configure();


/***/ }),

/***/ "./node_modules/protobufjs/src/reader.js":
/*!***********************************************!*\
  !*** ./node_modules/protobufjs/src/reader.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Reader;

var util      = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

var BufferReader; // cyclic

var LongBits  = util.LongBits,
    utf8      = util.utf8;

/* istanbul ignore next */
function indexOutOfRange(reader, writeLength) {
    return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
}

/**
 * Constructs a new reader instance using the specified buffer.
 * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 * @param {Uint8Array} buffer Buffer to read from
 */
function Reader(buffer) {

    /**
     * Read buffer.
     * @type {Uint8Array}
     */
    this.buf = buffer;

    /**
     * Read buffer position.
     * @type {number}
     */
    this.pos = 0;

    /**
     * Read buffer length.
     * @type {number}
     */
    this.len = buffer.length;
}

var create_array = typeof Uint8Array !== "undefined"
    ? function create_typed_array(buffer) {
        if (buffer instanceof Uint8Array || Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    }
    /* istanbul ignore next */
    : function create_array(buffer) {
        if (Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    };

var create = function create() {
    return util.Buffer
        ? function create_buffer_setup(buffer) {
            return (Reader.create = function create_buffer(buffer) {
                return util.Buffer.isBuffer(buffer)
                    ? new BufferReader(buffer)
                    /* istanbul ignore next */
                    : create_array(buffer);
            })(buffer);
        }
        /* istanbul ignore next */
        : create_array;
};

/**
 * Creates a new reader using the specified buffer.
 * @function
 * @param {Uint8Array|Buffer} buffer Buffer to read from
 * @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
 * @throws {Error} If `buffer` is not a valid buffer
 */
Reader.create = create();

Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */ util.Array.prototype.slice;

/**
 * Reads a varint as an unsigned 32 bit value.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.uint32 = (function read_uint32_setup() {
    var value = 4294967295; // optimizer type-hint, tends to deopt otherwise (?!)
    return function read_uint32() {
        value = (         this.buf[this.pos] & 127       ) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) <<  7) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] &  15) << 28) >>> 0; if (this.buf[this.pos++] < 128) return value;

        /* istanbul ignore if */
        if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
        }
        return value;
    };
})();

/**
 * Reads a varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.int32 = function read_int32() {
    return this.uint32() | 0;
};

/**
 * Reads a zig-zag encoded varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.sint32 = function read_sint32() {
    var value = this.uint32();
    return value >>> 1 ^ -(value & 1) | 0;
};

/* eslint-disable no-invalid-this */

function readLongVarint() {
    // tends to deopt with local vars for octet etc.
    var bits = new LongBits(0, 0);
    var i = 0;
    if (this.len - this.pos > 4) { // fast route (lo)
        for (; i < 4; ++i) {
            // 1st..4th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 5th
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >>  4) >>> 0;
        if (this.buf[this.pos++] < 128)
            return bits;
        i = 0;
    } else {
        for (; i < 3; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 1st..3th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 4th
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
    }
    if (this.len - this.pos > 4) { // fast route (hi)
        for (; i < 5; ++i) {
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    } else {
        for (; i < 5; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    }
    /* istanbul ignore next */
    throw Error("invalid varint encoding");
}

/* eslint-enable no-invalid-this */

/**
 * Reads a varint as a signed 64 bit value.
 * @name Reader#int64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as an unsigned 64 bit value.
 * @name Reader#uint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a zig-zag encoded varint as a signed 64 bit value.
 * @name Reader#sint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as a boolean.
 * @returns {boolean} Value read
 */
Reader.prototype.bool = function read_bool() {
    return this.uint32() !== 0;
};

function readFixed32_end(buf, end) { // note that this uses `end`, not `pos`
    return (buf[end - 4]
          | buf[end - 3] << 8
          | buf[end - 2] << 16
          | buf[end - 1] << 24) >>> 0;
}

/**
 * Reads fixed 32 bits as an unsigned 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.fixed32 = function read_fixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4);
};

/**
 * Reads fixed 32 bits as a signed 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.sfixed32 = function read_sfixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4) | 0;
};

/* eslint-disable no-invalid-this */

function readFixed64(/* this: Reader */) {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);

    return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
}

/* eslint-enable no-invalid-this */

/**
 * Reads fixed 64 bits.
 * @name Reader#fixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads zig-zag encoded fixed 64 bits.
 * @name Reader#sfixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a float (32 bit) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.float = function read_float() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readFloatLE(this.buf, this.pos);
    this.pos += 4;
    return value;
};

/**
 * Reads a double (64 bit float) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.double = function read_double() {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readDoubleLE(this.buf, this.pos);
    this.pos += 8;
    return value;
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @returns {Uint8Array} Value read
 */
Reader.prototype.bytes = function read_bytes() {
    var length = this.uint32(),
        start  = this.pos,
        end    = this.pos + length;

    /* istanbul ignore if */
    if (end > this.len)
        throw indexOutOfRange(this, length);

    this.pos += length;
    if (Array.isArray(this.buf)) // plain array
        return this.buf.slice(start, end);
    return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
        ? new this.buf.constructor(0)
        : this._slice.call(this.buf, start, end);
};

/**
 * Reads a string preceeded by its byte length as a varint.
 * @returns {string} Value read
 */
Reader.prototype.string = function read_string() {
    var bytes = this.bytes();
    return utf8.read(bytes, 0, bytes.length);
};

/**
 * Skips the specified number of bytes if specified, otherwise skips a varint.
 * @param {number} [length] Length if known, otherwise a varint is assumed
 * @returns {Reader} `this`
 */
Reader.prototype.skip = function skip(length) {
    if (typeof length === "number") {
        /* istanbul ignore if */
        if (this.pos + length > this.len)
            throw indexOutOfRange(this, length);
        this.pos += length;
    } else {
        do {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
    }
    return this;
};

/**
 * Skips the next element of the specified wire type.
 * @param {number} wireType Wire type received
 * @returns {Reader} `this`
 */
Reader.prototype.skipType = function(wireType) {
    switch (wireType) {
        case 0:
            this.skip();
            break;
        case 1:
            this.skip(8);
            break;
        case 2:
            this.skip(this.uint32());
            break;
        case 3:
            while ((wireType = this.uint32() & 7) !== 4) {
                this.skipType(wireType);
            }
            break;
        case 5:
            this.skip(4);
            break;

        /* istanbul ignore next */
        default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
    }
    return this;
};

Reader._configure = function(BufferReader_) {
    BufferReader = BufferReader_;
    Reader.create = create();
    BufferReader._configure();

    var fn = util.Long ? "toLong" : /* istanbul ignore next */ "toNumber";
    util.merge(Reader.prototype, {

        int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
        },

        uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
        },

        sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
        },

        fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
        },

        sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
        }

    });
};


/***/ }),

/***/ "./node_modules/protobufjs/src/reader_buffer.js":
/*!******************************************************!*\
  !*** ./node_modules/protobufjs/src/reader_buffer.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = BufferReader;

// extends Reader
var Reader = __webpack_require__(/*! ./reader */ "./node_modules/protobufjs/src/reader.js");
(BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;

var util = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

/**
 * Constructs a new buffer reader instance.
 * @classdesc Wire format reader using node buffers.
 * @extends Reader
 * @constructor
 * @param {Buffer} buffer Buffer to read from
 */
function BufferReader(buffer) {
    Reader.call(this, buffer);

    /**
     * Read buffer.
     * @name BufferReader#buf
     * @type {Buffer}
     */
}

BufferReader._configure = function () {
    /* istanbul ignore else */
    if (util.Buffer)
        BufferReader.prototype._slice = util.Buffer.prototype.slice;
};


/**
 * @override
 */
BufferReader.prototype.string = function read_string_buffer() {
    var len = this.uint32(); // modifies pos
    return this.buf.utf8Slice
        ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len))
        : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @name BufferReader#bytes
 * @function
 * @returns {Buffer} Value read
 */

BufferReader._configure();


/***/ }),

/***/ "./node_modules/protobufjs/src/roots.js":
/*!**********************************************!*\
  !*** ./node_modules/protobufjs/src/roots.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = {};

/**
 * Named roots.
 * This is where pbjs stores generated structures (the option `-r, --root` specifies a name).
 * Can also be used manually to make roots available accross modules.
 * @name roots
 * @type {Object.<string,Root>}
 * @example
 * // pbjs -r myroot -o compiled.js ...
 *
 * // in another module:
 * require("./compiled.js");
 *
 * // in any subsequent module:
 * var root = protobuf.roots["myroot"];
 */


/***/ }),

/***/ "./node_modules/protobufjs/src/rpc.js":
/*!********************************************!*\
  !*** ./node_modules/protobufjs/src/rpc.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Streaming RPC helpers.
 * @namespace
 */
var rpc = exports;

/**
 * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
 * @typedef RPCImpl
 * @type {function}
 * @param {Method|rpc.ServiceMethod<Message<{}>,Message<{}>>} method Reflected or static method being called
 * @param {Uint8Array} requestData Request data
 * @param {RPCImplCallback} callback Callback function
 * @returns {undefined}
 * @example
 * function rpcImpl(method, requestData, callback) {
 *     if (protobuf.util.lcFirst(method.name) !== "myMethod") // compatible with static code
 *         throw Error("no such method");
 *     asynchronouslyObtainAResponse(requestData, function(err, responseData) {
 *         callback(err, responseData);
 *     });
 * }
 */

/**
 * Node-style callback as used by {@link RPCImpl}.
 * @typedef RPCImplCallback
 * @type {function}
 * @param {Error|null} error Error, if any, otherwise `null`
 * @param {Uint8Array|null} [response] Response data or `null` to signal end of stream, if there hasn't been an error
 * @returns {undefined}
 */

rpc.Service = __webpack_require__(/*! ./rpc/service */ "./node_modules/protobufjs/src/rpc/service.js");


/***/ }),

/***/ "./node_modules/protobufjs/src/rpc/service.js":
/*!****************************************************!*\
  !*** ./node_modules/protobufjs/src/rpc/service.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Service;

var util = __webpack_require__(/*! ../util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

// Extends EventEmitter
(Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;

/**
 * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
 *
 * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
 * @typedef rpc.ServiceMethodCallback
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {TRes} [response] Response message
 * @returns {undefined}
 */

/**
 * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
 * @typedef rpc.ServiceMethod
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
 * @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
 */

/**
 * Constructs a new RPC service instance.
 * @classdesc An RPC service as returned by {@link Service#create}.
 * @exports rpc.Service
 * @extends util.EventEmitter
 * @constructor
 * @param {RPCImpl} rpcImpl RPC implementation
 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
 */
function Service(rpcImpl, requestDelimited, responseDelimited) {

    if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");

    util.EventEmitter.call(this);

    /**
     * RPC implementation. Becomes `null` once the service is ended.
     * @type {RPCImpl|null}
     */
    this.rpcImpl = rpcImpl;

    /**
     * Whether requests are length-delimited.
     * @type {boolean}
     */
    this.requestDelimited = Boolean(requestDelimited);

    /**
     * Whether responses are length-delimited.
     * @type {boolean}
     */
    this.responseDelimited = Boolean(responseDelimited);
}

/**
 * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
 * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
 * @param {Constructor<TReq>} requestCtor Request constructor
 * @param {Constructor<TRes>} responseCtor Response constructor
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
 * @returns {undefined}
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 */
Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {

    if (!request)
        throw TypeError("request must be specified");

    var self = this;
    if (!callback)
        return util.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);

    if (!self.rpcImpl) {
        setTimeout(function() { callback(Error("already ended")); }, 0);
        return undefined;
    }

    try {
        return self.rpcImpl(
            method,
            requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
            function rpcCallback(err, response) {

                if (err) {
                    self.emit("error", err, method);
                    return callback(err);
                }

                if (response === null) {
                    self.end(/* endedByRPC */ true);
                    return undefined;
                }

                if (!(response instanceof responseCtor)) {
                    try {
                        response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
                    } catch (err) {
                        self.emit("error", err, method);
                        return callback(err);
                    }
                }

                self.emit("data", response, method);
                return callback(null, response);
            }
        );
    } catch (err) {
        self.emit("error", err, method);
        setTimeout(function() { callback(err); }, 0);
        return undefined;
    }
};

/**
 * Ends this service and emits the `end` event.
 * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
 * @returns {rpc.Service} `this`
 */
Service.prototype.end = function end(endedByRPC) {
    if (this.rpcImpl) {
        if (!endedByRPC) // signal end to rpcImpl
            this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
    }
    return this;
};


/***/ }),

/***/ "./node_modules/protobufjs/src/util/longbits.js":
/*!******************************************************!*\
  !*** ./node_modules/protobufjs/src/util/longbits.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = LongBits;

var util = __webpack_require__(/*! ../util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

/**
 * Constructs new long bits.
 * @classdesc Helper class for working with the low and high bits of a 64 bit value.
 * @memberof util
 * @constructor
 * @param {number} lo Low 32 bits, unsigned
 * @param {number} hi High 32 bits, unsigned
 */
function LongBits(lo, hi) {

    // note that the casts below are theoretically unnecessary as of today, but older statically
    // generated converter code might still call the ctor with signed 32bits. kept for compat.

    /**
     * Low bits.
     * @type {number}
     */
    this.lo = lo >>> 0;

    /**
     * High bits.
     * @type {number}
     */
    this.hi = hi >>> 0;
}

/**
 * Zero bits.
 * @memberof util.LongBits
 * @type {util.LongBits}
 */
var zero = LongBits.zero = new LongBits(0, 0);

zero.toNumber = function() { return 0; };
zero.zzEncode = zero.zzDecode = function() { return this; };
zero.length = function() { return 1; };

/**
 * Zero hash.
 * @memberof util.LongBits
 * @type {string}
 */
var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";

/**
 * Constructs new long bits from the specified number.
 * @param {number} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.fromNumber = function fromNumber(value) {
    if (value === 0)
        return zero;
    var sign = value < 0;
    if (sign)
        value = -value;
    var lo = value >>> 0,
        hi = (value - lo) / 4294967296 >>> 0;
    if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295)
                hi = 0;
        }
    }
    return new LongBits(lo, hi);
};

/**
 * Constructs new long bits from a number, long or string.
 * @param {Long|number|string} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.from = function from(value) {
    if (typeof value === "number")
        return LongBits.fromNumber(value);
    if (util.isString(value)) {
        /* istanbul ignore else */
        if (util.Long)
            value = util.Long.fromString(value);
        else
            return LongBits.fromNumber(parseInt(value, 10));
    }
    return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
};

/**
 * Converts this long bits to a possibly unsafe JavaScript number.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {number} Possibly unsafe number
 */
LongBits.prototype.toNumber = function toNumber(unsigned) {
    if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0,
            hi = ~this.hi     >>> 0;
        if (!lo)
            hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
};

/**
 * Converts this long bits to a long.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long} Long
 */
LongBits.prototype.toLong = function toLong(unsigned) {
    return util.Long
        ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
        /* istanbul ignore next */
        : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
};

var charCodeAt = String.prototype.charCodeAt;

/**
 * Constructs new long bits from the specified 8 characters long hash.
 * @param {string} hash Hash
 * @returns {util.LongBits} Bits
 */
LongBits.fromHash = function fromHash(hash) {
    if (hash === zeroHash)
        return zero;
    return new LongBits(
        ( charCodeAt.call(hash, 0)
        | charCodeAt.call(hash, 1) << 8
        | charCodeAt.call(hash, 2) << 16
        | charCodeAt.call(hash, 3) << 24) >>> 0
    ,
        ( charCodeAt.call(hash, 4)
        | charCodeAt.call(hash, 5) << 8
        | charCodeAt.call(hash, 6) << 16
        | charCodeAt.call(hash, 7) << 24) >>> 0
    );
};

/**
 * Converts this long bits to a 8 characters long hash.
 * @returns {string} Hash
 */
LongBits.prototype.toHash = function toHash() {
    return String.fromCharCode(
        this.lo        & 255,
        this.lo >>> 8  & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24      ,
        this.hi        & 255,
        this.hi >>> 8  & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24
    );
};

/**
 * Zig-zag encodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzEncode = function zzEncode() {
    var mask =   this.hi >> 31;
    this.hi  = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    this.lo  = ( this.lo << 1                   ^ mask) >>> 0;
    return this;
};

/**
 * Zig-zag decodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzDecode = function zzDecode() {
    var mask = -(this.lo & 1);
    this.lo  = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    this.hi  = ( this.hi >>> 1                  ^ mask) >>> 0;
    return this;
};

/**
 * Calculates the length of this longbits when encoded as a varint.
 * @returns {number} Length
 */
LongBits.prototype.length = function length() {
    var part0 =  this.lo,
        part1 = (this.lo >>> 28 | this.hi << 4) >>> 0,
        part2 =  this.hi >>> 24;
    return part2 === 0
         ? part1 === 0
           ? part0 < 16384
             ? part0 < 128 ? 1 : 2
             : part0 < 2097152 ? 3 : 4
           : part1 < 16384
             ? part1 < 128 ? 5 : 6
             : part1 < 2097152 ? 7 : 8
         : part2 < 128 ? 9 : 10;
};


/***/ }),

/***/ "./node_modules/protobufjs/src/util/minimal.js":
/*!*****************************************************!*\
  !*** ./node_modules/protobufjs/src/util/minimal.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
var util = exports;

// used to return a Promise where callback is omitted
util.asPromise = __webpack_require__(/*! @protobufjs/aspromise */ "./node_modules/@protobufjs/aspromise/index.js");

// converts to / from base64 encoded strings
util.base64 = __webpack_require__(/*! @protobufjs/base64 */ "./node_modules/@protobufjs/base64/index.js");

// base class of rpc.Service
util.EventEmitter = __webpack_require__(/*! @protobufjs/eventemitter */ "./node_modules/@protobufjs/eventemitter/index.js");

// float handling accross browsers
util.float = __webpack_require__(/*! @protobufjs/float */ "./node_modules/@protobufjs/float/index.js");

// requires modules optionally and hides the call from bundlers
util.inquire = __webpack_require__(/*! @protobufjs/inquire */ "./node_modules/@protobufjs/inquire/index.js");

// converts to / from utf8 encoded strings
util.utf8 = __webpack_require__(/*! @protobufjs/utf8 */ "./node_modules/@protobufjs/utf8/index.js");

// provides a node-like buffer pool in the browser
util.pool = __webpack_require__(/*! @protobufjs/pool */ "./node_modules/@protobufjs/pool/index.js");

// utility to work with the low and high bits of a 64 bit value
util.LongBits = __webpack_require__(/*! ./longbits */ "./node_modules/protobufjs/src/util/longbits.js");

/**
 * Whether running within node or not.
 * @memberof util
 * @type {boolean}
 */
util.isNode = Boolean(typeof global !== "undefined"
                   && global
                   && global.process
                   && global.process.versions
                   && global.process.versions.node);

/**
 * Global object reference.
 * @memberof util
 * @type {Object}
 */
util.global = util.isNode && global
           || typeof window !== "undefined" && window
           || typeof self   !== "undefined" && self
           || this; // eslint-disable-line no-invalid-this

/**
 * An immuable empty array.
 * @memberof util
 * @type {Array.<*>}
 * @const
 */
util.emptyArray = Object.freeze ? Object.freeze([]) : /* istanbul ignore next */ []; // used on prototypes

/**
 * An immutable empty object.
 * @type {Object}
 * @const
 */
util.emptyObject = Object.freeze ? Object.freeze({}) : /* istanbul ignore next */ {}; // used on prototypes

/**
 * Tests if the specified value is an integer.
 * @function
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is an integer
 */
util.isInteger = Number.isInteger || /* istanbul ignore next */ function isInteger(value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};

/**
 * Tests if the specified value is a string.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a string
 */
util.isString = function isString(value) {
    return typeof value === "string" || value instanceof String;
};

/**
 * Tests if the specified value is a non-null object.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a non-null object
 */
util.isObject = function isObject(value) {
    return value && typeof value === "object";
};

/**
 * Checks if a property on a message is considered to be present.
 * This is an alias of {@link util.isSet}.
 * @function
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isset =

/**
 * Checks if a property on a message is considered to be present.
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isSet = function isSet(obj, prop) {
    var value = obj[prop];
    if (value != null && obj.hasOwnProperty(prop)) // eslint-disable-line eqeqeq, no-prototype-builtins
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
    return false;
};

/**
 * Any compatible Buffer instance.
 * This is a minimal stand-alone definition of a Buffer instance. The actual type is that exported by node's typings.
 * @interface Buffer
 * @extends Uint8Array
 */

/**
 * Node's Buffer class if available.
 * @type {Constructor<Buffer>}
 */
util.Buffer = (function() {
    try {
        var Buffer = util.inquire("buffer").Buffer;
        // refuse to use non-node buffers if not explicitly assigned (perf reasons):
        return Buffer.prototype.utf8Write ? Buffer : /* istanbul ignore next */ null;
    } catch (e) {
        /* istanbul ignore next */
        return null;
    }
})();

// Internal alias of or polyfull for Buffer.from.
util._Buffer_from = null;

// Internal alias of or polyfill for Buffer.allocUnsafe.
util._Buffer_allocUnsafe = null;

/**
 * Creates a new buffer of whatever type supported by the environment.
 * @param {number|number[]} [sizeOrArray=0] Buffer size or number array
 * @returns {Uint8Array|Buffer} Buffer
 */
util.newBuffer = function newBuffer(sizeOrArray) {
    /* istanbul ignore next */
    return typeof sizeOrArray === "number"
        ? util.Buffer
            ? util._Buffer_allocUnsafe(sizeOrArray)
            : new util.Array(sizeOrArray)
        : util.Buffer
            ? util._Buffer_from(sizeOrArray)
            : typeof Uint8Array === "undefined"
                ? sizeOrArray
                : new Uint8Array(sizeOrArray);
};

/**
 * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
 * @type {Constructor<Uint8Array>}
 */
util.Array = typeof Uint8Array !== "undefined" ? Uint8Array /* istanbul ignore next */ : Array;

/**
 * Any compatible Long instance.
 * This is a minimal stand-alone definition of a Long instance. The actual type is that exported by long.js.
 * @interface Long
 * @property {number} low Low bits
 * @property {number} high High bits
 * @property {boolean} unsigned Whether unsigned or not
 */

/**
 * Long.js's Long class if available.
 * @type {Constructor<Long>}
 */
util.Long = /* istanbul ignore next */ util.global.dcodeIO && /* istanbul ignore next */ util.global.dcodeIO.Long
         || /* istanbul ignore next */ util.global.Long
         || util.inquire("long");

/**
 * Regular expression used to verify 2 bit (`bool`) map keys.
 * @type {RegExp}
 * @const
 */
util.key2Re = /^true|false|0|1$/;

/**
 * Regular expression used to verify 32 bit (`int32` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;

/**
 * Regular expression used to verify 64 bit (`int64` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;

/**
 * Converts a number or long to an 8 characters long hash string.
 * @param {Long|number} value Value to convert
 * @returns {string} Hash
 */
util.longToHash = function longToHash(value) {
    return value
        ? util.LongBits.from(value).toHash()
        : util.LongBits.zeroHash;
};

/**
 * Converts an 8 characters long hash string to a long or number.
 * @param {string} hash Hash
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long|number} Original value
 */
util.longFromHash = function longFromHash(hash, unsigned) {
    var bits = util.LongBits.fromHash(hash);
    if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
    return bits.toNumber(Boolean(unsigned));
};

/**
 * Merges the properties of the source object into the destination object.
 * @memberof util
 * @param {Object.<string,*>} dst Destination object
 * @param {Object.<string,*>} src Source object
 * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
 * @returns {Object.<string,*>} Destination object
 */
function merge(dst, src, ifNotSet) { // used by converters
    for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === undefined || !ifNotSet)
            dst[keys[i]] = src[keys[i]];
    return dst;
}

util.merge = merge;

/**
 * Converts the first character of a string to lower case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.lcFirst = function lcFirst(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
};

/**
 * Creates a custom error constructor.
 * @memberof util
 * @param {string} name Error name
 * @returns {Constructor<Error>} Custom error constructor
 */
function newError(name) {

    function CustomError(message, properties) {

        if (!(this instanceof CustomError))
            return new CustomError(message, properties);

        // Error.call(this, message);
        // ^ just returns a new error instance because the ctor can be called as a function

        Object.defineProperty(this, "message", { get: function() { return message; } });

        /* istanbul ignore next */
        if (Error.captureStackTrace) // node
            Error.captureStackTrace(this, CustomError);
        else
            Object.defineProperty(this, "stack", { value: new Error().stack || "" });

        if (properties)
            merge(this, properties);
    }

    (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;

    Object.defineProperty(CustomError.prototype, "name", { get: function() { return name; } });

    CustomError.prototype.toString = function toString() {
        return this.name + ": " + this.message;
    };

    return CustomError;
}

util.newError = newError;

/**
 * Constructs a new protocol error.
 * @classdesc Error subclass indicating a protocol specifc error.
 * @memberof util
 * @extends Error
 * @template T extends Message<T>
 * @constructor
 * @param {string} message Error message
 * @param {Object.<string,*>} [properties] Additional properties
 * @example
 * try {
 *     MyMessage.decode(someBuffer); // throws if required fields are missing
 * } catch (e) {
 *     if (e instanceof ProtocolError && e.instance)
 *         console.log("decoded so far: " + JSON.stringify(e.instance));
 * }
 */
util.ProtocolError = newError("ProtocolError");

/**
 * So far decoded message instance.
 * @name util.ProtocolError#instance
 * @type {Message<T>}
 */

/**
 * A OneOf getter as returned by {@link util.oneOfGetter}.
 * @typedef OneOfGetter
 * @type {function}
 * @returns {string|undefined} Set field name, if any
 */

/**
 * Builds a getter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfGetter} Unbound getter
 */
util.oneOfGetter = function getOneOf(fieldNames) {
    var fieldMap = {};
    for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;

    /**
     * @returns {string|undefined} Set field name, if any
     * @this Object
     * @ignore
     */
    return function() { // eslint-disable-line consistent-return
        for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i)
            if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null)
                return keys[i];
    };
};

/**
 * A OneOf setter as returned by {@link util.oneOfSetter}.
 * @typedef OneOfSetter
 * @type {function}
 * @param {string|undefined} value Field name
 * @returns {undefined}
 */

/**
 * Builds a setter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfSetter} Unbound setter
 */
util.oneOfSetter = function setOneOf(fieldNames) {

    /**
     * @param {string} name Field name
     * @returns {undefined}
     * @this Object
     * @ignore
     */
    return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
            if (fieldNames[i] !== name)
                delete this[fieldNames[i]];
    };
};

/**
 * Default conversion options used for {@link Message#toJSON} implementations.
 *
 * These options are close to proto3's JSON mapping with the exception that internal types like Any are handled just like messages. More precisely:
 *
 * - Longs become strings
 * - Enums become string keys
 * - Bytes become base64 encoded strings
 * - (Sub-)Messages become plain objects
 * - Maps become plain objects with all string keys
 * - Repeated fields become arrays
 * - NaN and Infinity for float and double fields become strings
 *
 * @type {IConversionOptions}
 * @see https://developers.google.com/protocol-buffers/docs/proto3?hl=en#json
 */
util.toJSONOptions = {
    longs: String,
    enums: String,
    bytes: String,
    json: true
};

// Sets up buffer utility according to the environment (called in index-minimal)
util._configure = function() {
    var Buffer = util.Buffer;
    /* istanbul ignore if */
    if (!Buffer) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
    }
    // because node 4.x buffers are incompatible & immutable
    // see: https://github.com/dcodeIO/protobuf.js/pull/665
    util._Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from ||
        /* istanbul ignore next */
        function Buffer_from(value, encoding) {
            return new Buffer(value, encoding);
        };
    util._Buffer_allocUnsafe = Buffer.allocUnsafe ||
        /* istanbul ignore next */
        function Buffer_allocUnsafe(size) {
            return new Buffer(size);
        };
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/protobufjs/src/writer.js":
/*!***********************************************!*\
  !*** ./node_modules/protobufjs/src/writer.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Writer;

var util      = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

var BufferWriter; // cyclic

var LongBits  = util.LongBits,
    base64    = util.base64,
    utf8      = util.utf8;

/**
 * Constructs a new writer operation instance.
 * @classdesc Scheduled writer operation.
 * @constructor
 * @param {function(*, Uint8Array, number)} fn Function to call
 * @param {number} len Value byte length
 * @param {*} val Value to write
 * @ignore
 */
function Op(fn, len, val) {

    /**
     * Function to call.
     * @type {function(Uint8Array, number, *)}
     */
    this.fn = fn;

    /**
     * Value byte length.
     * @type {number}
     */
    this.len = len;

    /**
     * Next operation.
     * @type {Writer.Op|undefined}
     */
    this.next = undefined;

    /**
     * Value to write.
     * @type {*}
     */
    this.val = val; // type varies
}

/* istanbul ignore next */
function noop() {} // eslint-disable-line no-empty-function

/**
 * Constructs a new writer state instance.
 * @classdesc Copied writer state.
 * @memberof Writer
 * @constructor
 * @param {Writer} writer Writer to copy state from
 * @ignore
 */
function State(writer) {

    /**
     * Current head.
     * @type {Writer.Op}
     */
    this.head = writer.head;

    /**
     * Current tail.
     * @type {Writer.Op}
     */
    this.tail = writer.tail;

    /**
     * Current buffer length.
     * @type {number}
     */
    this.len = writer.len;

    /**
     * Next state.
     * @type {State|null}
     */
    this.next = writer.states;
}

/**
 * Constructs a new writer instance.
 * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 */
function Writer() {

    /**
     * Current length.
     * @type {number}
     */
    this.len = 0;

    /**
     * Operations head.
     * @type {Object}
     */
    this.head = new Op(noop, 0, 0);

    /**
     * Operations tail
     * @type {Object}
     */
    this.tail = this.head;

    /**
     * Linked forked states.
     * @type {Object|null}
     */
    this.states = null;

    // When a value is written, the writer calculates its byte length and puts it into a linked
    // list of operations to perform when finish() is called. This both allows us to allocate
    // buffers of the exact required size and reduces the amount of work we have to do compared
    // to first calculating over objects and then encoding over objects. In our case, the encoding
    // part is just a linked list walk calling operations with already prepared values.
}

var create = function create() {
    return util.Buffer
        ? function create_buffer_setup() {
            return (Writer.create = function create_buffer() {
                return new BufferWriter();
            })();
        }
        /* istanbul ignore next */
        : function create_array() {
            return new Writer();
        };
};

/**
 * Creates a new writer.
 * @function
 * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
 */
Writer.create = create();

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */
Writer.alloc = function alloc(size) {
    return new util.Array(size);
};

// Use Uint8Array buffer pool in the browser, just like node does with buffers
/* istanbul ignore else */
if (util.Array !== Array)
    Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);

/**
 * Pushes a new operation to the queue.
 * @param {function(Uint8Array, number, *)} fn Function to call
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @returns {Writer} `this`
 * @private
 */
Writer.prototype._push = function push(fn, len, val) {
    this.tail = this.tail.next = new Op(fn, len, val);
    this.len += len;
    return this;
};

function writeByte(val, buf, pos) {
    buf[pos] = val & 255;
}

function writeVarint32(val, buf, pos) {
    while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
    }
    buf[pos] = val;
}

/**
 * Constructs a new varint writer operation instance.
 * @classdesc Scheduled varint writer operation.
 * @extends Op
 * @constructor
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @ignore
 */
function VarintOp(len, val) {
    this.len = len;
    this.next = undefined;
    this.val = val;
}

VarintOp.prototype = Object.create(Op.prototype);
VarintOp.prototype.fn = writeVarint32;

/**
 * Writes an unsigned 32 bit value as a varint.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.uint32 = function write_uint32(value) {
    // here, the call to this.push has been inlined and a varint specific Op subclass is used.
    // uint32 is by far the most frequently used operation and benefits significantly from this.
    this.len += (this.tail = this.tail.next = new VarintOp(
        (value = value >>> 0)
                < 128       ? 1
        : value < 16384     ? 2
        : value < 2097152   ? 3
        : value < 268435456 ? 4
        :                     5,
    value)).len;
    return this;
};

/**
 * Writes a signed 32 bit value as a varint.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.int32 = function write_int32(value) {
    return value < 0
        ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) // 10 bytes per spec
        : this.uint32(value);
};

/**
 * Writes a 32 bit value as a varint, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sint32 = function write_sint32(value) {
    return this.uint32((value << 1 ^ value >> 31) >>> 0);
};

function writeVarint64(val, buf, pos) {
    while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
    }
    while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
    }
    buf[pos++] = val.lo;
}

/**
 * Writes an unsigned 64 bit value as a varint.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.uint64 = function write_uint64(value) {
    var bits = LongBits.from(value);
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a signed 64 bit value as a varint.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.int64 = Writer.prototype.uint64;

/**
 * Writes a signed 64 bit value as a varint, zig-zag encoded.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sint64 = function write_sint64(value) {
    var bits = LongBits.from(value).zzEncode();
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a boolish value as a varint.
 * @param {boolean} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.bool = function write_bool(value) {
    return this._push(writeByte, 1, value ? 1 : 0);
};

function writeFixed32(val, buf, pos) {
    buf[pos    ] =  val         & 255;
    buf[pos + 1] =  val >>> 8   & 255;
    buf[pos + 2] =  val >>> 16  & 255;
    buf[pos + 3] =  val >>> 24;
}

/**
 * Writes an unsigned 32 bit value as fixed 32 bits.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.fixed32 = function write_fixed32(value) {
    return this._push(writeFixed32, 4, value >>> 0);
};

/**
 * Writes a signed 32 bit value as fixed 32 bits.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sfixed32 = Writer.prototype.fixed32;

/**
 * Writes an unsigned 64 bit value as fixed 64 bits.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.fixed64 = function write_fixed64(value) {
    var bits = LongBits.from(value);
    return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
};

/**
 * Writes a signed 64 bit value as fixed 64 bits.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sfixed64 = Writer.prototype.fixed64;

/**
 * Writes a float (32 bit).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.float = function write_float(value) {
    return this._push(util.float.writeFloatLE, 4, value);
};

/**
 * Writes a double (64 bit float).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.double = function write_double(value) {
    return this._push(util.float.writeDoubleLE, 8, value);
};

var writeBytes = util.Array.prototype.set
    ? function writeBytes_set(val, buf, pos) {
        buf.set(val, pos); // also works for plain array values
    }
    /* istanbul ignore next */
    : function writeBytes_for(val, buf, pos) {
        for (var i = 0; i < val.length; ++i)
            buf[pos + i] = val[i];
    };

/**
 * Writes a sequence of bytes.
 * @param {Uint8Array|string} value Buffer or base64 encoded string to write
 * @returns {Writer} `this`
 */
Writer.prototype.bytes = function write_bytes(value) {
    var len = value.length >>> 0;
    if (!len)
        return this._push(writeByte, 1, 0);
    if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
    }
    return this.uint32(len)._push(writeBytes, len, value);
};

/**
 * Writes a string.
 * @param {string} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.string = function write_string(value) {
    var len = utf8.length(value);
    return len
        ? this.uint32(len)._push(utf8.write, len, value)
        : this._push(writeByte, 1, 0);
};

/**
 * Forks this writer's state by pushing it to a stack.
 * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
 * @returns {Writer} `this`
 */
Writer.prototype.fork = function fork() {
    this.states = new State(this);
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
    return this;
};

/**
 * Resets this instance to the last state.
 * @returns {Writer} `this`
 */
Writer.prototype.reset = function reset() {
    if (this.states) {
        this.head   = this.states.head;
        this.tail   = this.states.tail;
        this.len    = this.states.len;
        this.states = this.states.next;
    } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len  = 0;
    }
    return this;
};

/**
 * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
 * @returns {Writer} `this`
 */
Writer.prototype.ldelim = function ldelim() {
    var head = this.head,
        tail = this.tail,
        len  = this.len;
    this.reset().uint32(len);
    if (len) {
        this.tail.next = head.next; // skip noop
        this.tail = tail;
        this.len += len;
    }
    return this;
};

/**
 * Finishes the write operation.
 * @returns {Uint8Array} Finished buffer
 */
Writer.prototype.finish = function finish() {
    var head = this.head.next, // skip noop
        buf  = this.constructor.alloc(this.len),
        pos  = 0;
    while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
    }
    // this.head = this.tail = null;
    return buf;
};

Writer._configure = function(BufferWriter_) {
    BufferWriter = BufferWriter_;
    Writer.create = create();
    BufferWriter._configure();
};


/***/ }),

/***/ "./node_modules/protobufjs/src/writer_buffer.js":
/*!******************************************************!*\
  !*** ./node_modules/protobufjs/src/writer_buffer.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = BufferWriter;

// extends Writer
var Writer = __webpack_require__(/*! ./writer */ "./node_modules/protobufjs/src/writer.js");
(BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;

var util = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

/**
 * Constructs a new buffer writer instance.
 * @classdesc Wire format writer using node buffers.
 * @extends Writer
 * @constructor
 */
function BufferWriter() {
    Writer.call(this);
}

BufferWriter._configure = function () {
    /**
     * Allocates a buffer of the specified size.
     * @function
     * @param {number} size Buffer size
     * @returns {Buffer} Buffer
     */
    BufferWriter.alloc = util._Buffer_allocUnsafe;

    BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set"
        ? function writeBytesBuffer_set(val, buf, pos) {
          buf.set(val, pos); // faster than copy (requires node >= 4 where Buffers extend Uint8Array and set is properly inherited)
          // also works for plain array values
        }
        /* istanbul ignore next */
        : function writeBytesBuffer_copy(val, buf, pos) {
          if (val.copy) // Buffer values
            val.copy(buf, pos, 0, val.length);
          else for (var i = 0; i < val.length;) // plain array values
            buf[pos++] = val[i++];
        };
};


/**
 * @override
 */
BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
    if (util.isString(value))
        value = util._Buffer_from(value, "base64");
    var len = value.length >>> 0;
    this.uint32(len);
    if (len)
        this._push(BufferWriter.writeBytesBuffer, len, value);
    return this;
};

function writeStringBuffer(val, buf, pos) {
    if (val.length < 40) // plain js is faster for short strings (probably due to redundant assertions)
        util.utf8.write(val, buf, pos);
    else if (buf.utf8Write)
        buf.utf8Write(val, pos);
    else
        buf.write(val, pos);
}

/**
 * @override
 */
BufferWriter.prototype.string = function write_string_buffer(value) {
    var len = util.Buffer.byteLength(value);
    this.uint32(len);
    if (len)
        this._push(writeStringBuffer, len, value);
    return this;
};


/**
 * Finishes the write operation.
 * @name BufferWriter#finish
 * @function
 * @returns {Buffer} Finished buffer
 */

BufferWriter._configure();


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/GameMain.ts":
/*!*************************!*\
  !*** ./src/GameMain.ts ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _unittest_UnitTest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./unittest/UnitTest */ "./src/unittest/UnitTest.ts");
/* harmony import */ var _framework_common_GameObjectPool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./framework/common/GameObjectPool */ "./src/framework/common/GameObjectPool.ts");
/* harmony import */ var _framework_ui_UIManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./framework/ui/UIManager */ "./src/framework/ui/UIManager.ts");
/* harmony import */ var _framework_common_ResManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./framework/common/ResManager */ "./src/framework/common/ResManager.ts");
/* harmony import */ var _data_excel_ExcelManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data/excel/ExcelManager */ "./src/data/excel/ExcelManager.ts");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _framework_scene_SceneDef__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./framework/scene/SceneDef */ "./src/framework/scene/SceneDef.ts");
/* harmony import */ var _framework_scene_SceneManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./framework/scene/SceneManager */ "./src/framework/scene/SceneManager.ts");








class GameMain {
    constructor() {
        csharp__WEBPACK_IMPORTED_MODULE_5__["JsManager"].Instance.JsOnApplicationQuit = () => this.onApplicationQuit();
        csharp__WEBPACK_IMPORTED_MODULE_5__["JsManager"].Instance.JsOnDispose = () => this.onDispose();
    }
    async start() {
        try {
            console.log("Game start in JS....");
            //启动单例
            _framework_common_GameObjectPool__WEBPACK_IMPORTED_MODULE_1__["GameObjectPool"].Instance(_framework_common_GameObjectPool__WEBPACK_IMPORTED_MODULE_1__["GameObjectPool"]);
            _framework_ui_UIManager__WEBPACK_IMPORTED_MODULE_2__["UIManager"].Instance(_framework_ui_UIManager__WEBPACK_IMPORTED_MODULE_2__["UIManager"]);
            _framework_common_ResManager__WEBPACK_IMPORTED_MODULE_3__["ResManager"].Instance(_framework_common_ResManager__WEBPACK_IMPORTED_MODULE_3__["ResManager"]);
            //预加载excel数据
            _data_excel_ExcelManager__WEBPACK_IMPORTED_MODULE_4__["ExcelManager"].Instance(_data_excel_ExcelManager__WEBPACK_IMPORTED_MODULE_4__["ExcelManager"]);
            //do Unit Test
            _unittest_UnitTest__WEBPACK_IMPORTED_MODULE_0__["UnitTest"].doTest();
            //进入登录模块
            _framework_scene_SceneManager__WEBPACK_IMPORTED_MODULE_7__["SceneManager"].Instance(_framework_scene_SceneManager__WEBPACK_IMPORTED_MODULE_7__["SceneManager"]).loadScene(_framework_scene_SceneDef__WEBPACK_IMPORTED_MODULE_6__["SceneDef"].LoginScene, () => { });
            //JS启动完成，通知C#层
            csharp__WEBPACK_IMPORTED_MODULE_5__["GameLaunch"].Instance.JsLuanchFinish();
        }
        catch (ex) {
            console.error(ex);
        }
    }
    onApplicationQuit() {
        _framework_common_GameObjectPool__WEBPACK_IMPORTED_MODULE_1__["GameObjectPool"].Instance(_framework_common_GameObjectPool__WEBPACK_IMPORTED_MODULE_1__["GameObjectPool"]).cleanup(true);
        console.log("Game onApplicationQuit in JS....");
    }
    onDispose() {
        console.log("Game onDispose in JS....");
    }
}
new GameMain().start();


/***/ }),

/***/ "./src/data/excel/ExcelManager.ts":
/*!****************************************!*\
  !*** ./src/data/excel/ExcelManager.ts ***!
  \****************************************/
/*! exports provided: ExcelManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExcelManager", function() { return ExcelManager; });
/* harmony import */ var _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/common/Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _HeroConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HeroConfig */ "./src/data/excel/HeroConfig.ts");
/* harmony import */ var _SkillConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SkillConfig */ "./src/data/excel/SkillConfig.ts");
/* harmony import */ var _UnitConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UnitConfig */ "./src/data/excel/UnitConfig.ts");




class ExcelManager extends _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_0__["Singleton"] {
    constructor() {
        super();
        _HeroConfig__WEBPACK_IMPORTED_MODULE_1__["HeroConfigTB"].Instance(_HeroConfig__WEBPACK_IMPORTED_MODULE_1__["HeroConfigTB"]);
        _SkillConfig__WEBPACK_IMPORTED_MODULE_2__["SkillConfigTB"].Instance(_SkillConfig__WEBPACK_IMPORTED_MODULE_2__["SkillConfigTB"]);
        _UnitConfig__WEBPACK_IMPORTED_MODULE_3__["UnitConfigTB"].Instance(_UnitConfig__WEBPACK_IMPORTED_MODULE_3__["UnitConfigTB"]);
    }
}


/***/ }),

/***/ "./src/data/excel/HeroConfig.ts":
/*!**************************************!*\
  !*** ./src/data/excel/HeroConfig.ts ***!
  \**************************************/
/*! exports provided: HeroConfigTR, HeroConfigTB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeroConfigTR", function() { return HeroConfigTR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeroConfigTB", function() { return HeroConfigTB; });
/* harmony import */ var _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/common/Singleton */ "./src/framework/common/Singleton.ts");

class HeroConfigTR {
    constructor(_id, _BaseATK, _SP, _HP, _AttackDistance, _AttackInterval) {
        this._id = _id;
        this._BaseATK = _BaseATK;
        this._SP = _SP;
        this._HP = _HP;
        this._AttackDistance = _AttackDistance;
        this._AttackInterval = _AttackInterval;
    }
}
class HeroConfigTB extends _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_0__["Singleton"] {
    constructor() {
        super();
        this.trs = new Map();
        this.trs.set(2001, new HeroConfigTR(2001, 100, 200, 200, 1, 1));
        this.trs.set(2002, new HeroConfigTR(2002, 101, 220, 202, 2, 2));
        this.trs.set(2003, new HeroConfigTR(2003, 104, 210, 200, 1, 3));
        this.trs.set(2004, new HeroConfigTR(2004, 109, 200, 200, 1, 2));
    }
}


/***/ }),

/***/ "./src/data/excel/SkillConfig.ts":
/*!***************************************!*\
  !*** ./src/data/excel/SkillConfig.ts ***!
  \***************************************/
/*! exports provided: SkillConfigTR, SkillConfigTB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillConfigTR", function() { return SkillConfigTR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillConfigTB", function() { return SkillConfigTB; });
/* harmony import */ var _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/common/Singleton */ "./src/framework/common/Singleton.ts");

class SkillConfigTR {
    constructor(_id, _Name, _Description, _CoolTime, _CostSP, _AttackDistance, _AttackAngle, _AttackTargetTags, _ImpactType, _NextBattlerId, _AtkRatio, _DurationTime, _AtkInterval, _SkillPrefab, _AnimationName, _HitFxPrefab, _Level, _AttackType, _SelectorType) {
        this._id = _id;
        this._Name = _Name;
        this._Description = _Description;
        this._CoolTime = _CoolTime;
        this._CostSP = _CostSP;
        this._AttackDistance = _AttackDistance;
        this._AttackAngle = _AttackAngle;
        this._AttackTargetTags = _AttackTargetTags;
        this._ImpactType = _ImpactType;
        this._NextBattlerId = _NextBattlerId;
        this._AtkRatio = _AtkRatio;
        this._DurationTime = _DurationTime;
        this._AtkInterval = _AtkInterval;
        this._SkillPrefab = _SkillPrefab;
        this._AnimationName = _AnimationName;
        this._HitFxPrefab = _HitFxPrefab;
        this._Level = _Level;
        this._AttackType = _AttackType;
        this._SelectorType = _SelectorType;
    }
}
class SkillConfigTB extends _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_0__["Singleton"] {
    constructor() {
        super();
        this.trs = new Map();
        this.trs.set(1001, new SkillConfigTR(1001, "降龙十八掌", "带有强力攻击技能", 10, 178, 1, 30, ["Enemy"], ["CostSP", "Damage"], 0, 2, 2, 1, "Effect/Prefab/UI/ef_ui_TaskFinish.prefab", "skill1", "Effect/Prefab/UI/ef_ui_TaskFinish.prefab", 1, 1, 1));
        this.trs.set(1002, new SkillConfigTR(1002, "暴雨梨花", "带有强力攻击技能", 10, 178, 1, 30, ["Enemy"], ["CostSP", "Damage"], 0, 2, 2, 1, "Effect/Prefab/UI/ef_ui_TaskFinish.prefab", "skill2", "Effect/Prefab/UI/ef_ui_TaskFinish.prefab", 1, 1, 1));
        this.trs.set(1003, new SkillConfigTR(1003, "排山倒海", "带有强力攻击技能", 10, 178, 1, 30, ["Enemy"], ["CostSP", "Damage"], 0, 2, 2, 1, "Effect/Prefab/UI/ef_ui_TaskFinish.prefab", "skill3", "Effect/Prefab/UI/ef_ui_TaskFinish.prefab", 1, 1, 1));
        this.trs.set(1004, new SkillConfigTR(1004, "葵花点穴手", "带有强力攻击技能", 10, 178, 1, 30, ["Enemy"], ["CostSP", "Damage"], 0, 2, 2, 1, "Effect/Prefab/UI/ef_ui_TaskFinish.prefab", "skill4", "Effect/Prefab/UI/ef_ui_TaskFinish.prefab", 1, 1, 1));
    }
}


/***/ }),

/***/ "./src/data/excel/UnitConfig.ts":
/*!**************************************!*\
  !*** ./src/data/excel/UnitConfig.ts ***!
  \**************************************/
/*! exports provided: UnitConfigTR, UnitConfigTB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnitConfigTR", function() { return UnitConfigTR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnitConfigTB", function() { return UnitConfigTB; });
/* harmony import */ var _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/common/Singleton */ "./src/framework/common/Singleton.ts");

class UnitConfigTR {
    constructor(_id, _Name, _Desc, _Position, _Height, _Weight) {
        this._id = _id;
        this._Name = _Name;
        this._Desc = _Desc;
        this._Position = _Position;
        this._Height = _Height;
        this._Weight = _Weight;
    }
}
class UnitConfigTB extends _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_0__["Singleton"] {
    constructor() {
        super();
        this.trs = new Map();
        this.trs.set(1001, new UnitConfigTR(1001, "米克尔", "带有强力攻击技能", 1, 178, 68));
    }
}


/***/ }),

/***/ "./src/data/pb/Opcode.ts":
/*!*******************************!*\
  !*** ./src/data/pb/Opcode.ts ***!
  \*******************************/
/*! exports provided: DecodeMsg, Opcode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DecodeMsg", function() { return DecodeMsg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Opcode", function() { return Opcode; });
/* harmony import */ var _OuterMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OuterMessage */ "./src/data/pb/OuterMessage.js");
/* harmony import */ var _OuterMessage__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_OuterMessage__WEBPACK_IMPORTED_MODULE_0__);

class DecodeMsg {
}
class Opcode {
    static decode(opcode, msg) {
        let msgObj = this.map[opcode](msg);
        let decodeMsg = new DecodeMsg();
        decodeMsg.rpcId = msgObj.RpcId;
        decodeMsg.msgObj = msgObj;
        return decodeMsg;
    }
}
Opcode.C2M_TESTREQUEST = 101;
Opcode.M2C_TESTRESPONSE = 102;
Opcode.ACTOR_TRANSFERREQUEST = 103;
Opcode.ACTOR_TRANSFERRESPONSE = 104;
Opcode.C2G_ENTERMAP = 105;
Opcode.G2C_ENTERMAP = 106;
Opcode.UNITINFO = 107;
Opcode.M2C_CREATEUNITS = 108;
Opcode.FRAME_CLICKMAP = 109;
Opcode.M2C_PATHFINDINGRESULT = 110;
Opcode.C2R_PING = 111;
Opcode.R2C_PING = 112;
Opcode.G2C_TEST = 113;
Opcode.C2M_RELOAD = 114;
Opcode.M2C_RELOAD = 115;
Opcode.C2R_LOGIN = 116;
Opcode.R2C_LOGIN = 117;
Opcode.C2G_LOGINGATE = 118;
Opcode.G2C_LOGINGATE = 119;
Opcode.G2C_TESTHOTFIXMESSAGE = 120;
Opcode.C2M_TESTACTORREQUEST = 121;
Opcode.M2C_TESTACTORRESPONSE = 122;
Opcode.PLAYERINFO = 123;
Opcode.C2G_PLAYERINFO = 124;
Opcode.G2C_PLAYERINFO = 125;
Opcode.map = {
    101: _OuterMessage__WEBPACK_IMPORTED_MODULE_0__["NiceET"].C2M_TestRequest.decode,
    102: _OuterMessage__WEBPACK_IMPORTED_MODULE_0__["NiceET"].M2C_TestResponse.decode,
    103: _OuterMessage__WEBPACK_IMPORTED_MODULE_0__["NiceET"].Actor_TransferRequest.decode,
    104: _OuterMessage__WEBPACK_IMPORTED_MODULE_0__["NiceET"].Actor_TransferResponse.decode,
    105: _OuterMessage__WEBPACK_IMPORTED_MODULE_0__["NiceET"].C2G_EnterMap.decode,
    106: _OuterMessage__WEBPACK_IMPORTED_MODULE_0__["NiceET"].G2C_EnterMap.decode,
    107: _OuterMessage__WEBPACK_IMPORTED_MODULE_0__["NiceET"].UnitInfo.decode,
    108: _OuterMessage__WEBPACK_IMPORTED_MODULE_0__["NiceET"].M2C_CreateUnits.decode,
    109: _OuterMessage__WEBPACK_IMPORTED_MODULE_0__["NiceET"].Frame_ClickMap.decode,
    110: _OuterMessage__WEBPACK_IMPORTED_MODULE_0__["NiceET"].M2C_PathfindingResult.decode,
    111: _OuterMessage__WEBPACK_IMPORTED_MODULE_0__["NiceET"].C2R_Ping.decode,
    112: _OuterMessage__WEBPACK_IMPORTED_MODULE_0__["NiceET"].R2C_Ping.decode,
    113: _OuterMessage__WEBPACK_IMPORTED_MODULE_0__["NiceET"].G2C_Test.decode,
    114: _OuterMessage__WEBPACK_IMPORTED_MODULE_0__["NiceET"].C2M_Reload.decode,
    115: _OuterMessage__WEBPACK_IMPORTED_MODULE_0__["NiceET"].M2C_Reload.decode,
    116: _OuterMessage__WEBPACK_IMPORTED_MODULE_0__["NiceET"].C2R_Login.decode,
    117: _OuterMessage__WEBPACK_IMPORTED_MODULE_0__["NiceET"].R2C_Login.decode,
    118: _OuterMessage__WEBPACK_IMPORTED_MODULE_0__["NiceET"].C2G_LoginGate.decode,
    119: _OuterMessage__WEBPACK_IMPORTED_MODULE_0__["NiceET"].G2C_LoginGate.decode,
    120: _OuterMessage__WEBPACK_IMPORTED_MODULE_0__["NiceET"].G2C_TestHotfixMessage.decode,
    121: _OuterMessage__WEBPACK_IMPORTED_MODULE_0__["NiceET"].C2M_TestActorRequest.decode,
    122: _OuterMessage__WEBPACK_IMPORTED_MODULE_0__["NiceET"].M2C_TestActorResponse.decode,
    123: _OuterMessage__WEBPACK_IMPORTED_MODULE_0__["NiceET"].PlayerInfo.decode,
    124: _OuterMessage__WEBPACK_IMPORTED_MODULE_0__["NiceET"].C2G_PlayerInfo.decode,
    125: _OuterMessage__WEBPACK_IMPORTED_MODULE_0__["NiceET"].G2C_PlayerInfo.decode,
};


/***/ }),

/***/ "./src/data/pb/OuterMessage.js":
/*!*************************************!*\
  !*** ./src/data/pb/OuterMessage.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/


var $protobuf = __webpack_require__(/*! protobufjs/minimal */ "./node_modules/protobufjs/minimal.js");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

var Long = __webpack_require__(/*! long */ "./node_modules/long/src/long.js");
$protobuf.util.Long = Long;
$protobuf.configure();


// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.NiceET = (function() {

    /**
     * Namespace NiceET.
     * @exports NiceET
     * @namespace
     */
    var NiceET = {};

    NiceET.C2M_TestRequest = (function() {

        /**
         * Properties of a C2M_TestRequest.
         * @memberof NiceET
         * @interface IC2M_TestRequest
         * @property {number|null} [RpcId] C2M_TestRequest RpcId
         * @property {number|Long|null} [ActorId] C2M_TestRequest ActorId
         * @property {string|null} [request] C2M_TestRequest request
         */

        /**
         * Constructs a new C2M_TestRequest.
         * @memberof NiceET
         * @classdesc Represents a C2M_TestRequest.
         * @implements IC2M_TestRequest
         * @constructor
         * @param {NiceET.IC2M_TestRequest=} [properties] Properties to set
         */
        function C2M_TestRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2M_TestRequest RpcId.
         * @member {number} RpcId
         * @memberof NiceET.C2M_TestRequest
         * @instance
         */
        C2M_TestRequest.prototype.RpcId = 0;

        /**
         * C2M_TestRequest ActorId.
         * @member {number|Long} ActorId
         * @memberof NiceET.C2M_TestRequest
         * @instance
         */
        C2M_TestRequest.prototype.ActorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * C2M_TestRequest request.
         * @member {string} request
         * @memberof NiceET.C2M_TestRequest
         * @instance
         */
        C2M_TestRequest.prototype.request = "";

        /**
         * Creates a new C2M_TestRequest instance using the specified properties.
         * @function create
         * @memberof NiceET.C2M_TestRequest
         * @static
         * @param {NiceET.IC2M_TestRequest=} [properties] Properties to set
         * @returns {NiceET.C2M_TestRequest} C2M_TestRequest instance
         */
        C2M_TestRequest.create = function create(properties) {
            return new C2M_TestRequest(properties);
        };

        /**
         * Encodes the specified C2M_TestRequest message. Does not implicitly {@link NiceET.C2M_TestRequest.verify|verify} messages.
         * @function encode
         * @memberof NiceET.C2M_TestRequest
         * @static
         * @param {NiceET.IC2M_TestRequest} message C2M_TestRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2M_TestRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.request != null && message.hasOwnProperty("request"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.request);
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                writer.uint32(/* id 90, wireType 0 =*/720).int32(message.RpcId);
            if (message.ActorId != null && message.hasOwnProperty("ActorId"))
                writer.uint32(/* id 93, wireType 0 =*/744).sint64(message.ActorId);
            return writer;
        };

        /**
         * Encodes the specified C2M_TestRequest message, length delimited. Does not implicitly {@link NiceET.C2M_TestRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NiceET.C2M_TestRequest
         * @static
         * @param {NiceET.IC2M_TestRequest} message C2M_TestRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2M_TestRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2M_TestRequest message from the specified reader or buffer.
         * @function decode
         * @memberof NiceET.C2M_TestRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NiceET.C2M_TestRequest} C2M_TestRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2M_TestRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NiceET.C2M_TestRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 90:
                    message.RpcId = reader.int32();
                    break;
                case 93:
                    message.ActorId = reader.sint64();
                    break;
                case 1:
                    message.request = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2M_TestRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NiceET.C2M_TestRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NiceET.C2M_TestRequest} C2M_TestRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2M_TestRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2M_TestRequest message.
         * @function verify
         * @memberof NiceET.C2M_TestRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2M_TestRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                if (!$util.isInteger(message.RpcId))
                    return "RpcId: integer expected";
            if (message.ActorId != null && message.hasOwnProperty("ActorId"))
                if (!$util.isInteger(message.ActorId) && !(message.ActorId && $util.isInteger(message.ActorId.low) && $util.isInteger(message.ActorId.high)))
                    return "ActorId: integer|Long expected";
            if (message.request != null && message.hasOwnProperty("request"))
                if (!$util.isString(message.request))
                    return "request: string expected";
            return null;
        };

        /**
         * Creates a C2M_TestRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NiceET.C2M_TestRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NiceET.C2M_TestRequest} C2M_TestRequest
         */
        C2M_TestRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.NiceET.C2M_TestRequest)
                return object;
            var message = new $root.NiceET.C2M_TestRequest();
            if (object.RpcId != null)
                message.RpcId = object.RpcId | 0;
            if (object.ActorId != null)
                if ($util.Long)
                    (message.ActorId = $util.Long.fromValue(object.ActorId)).unsigned = false;
                else if (typeof object.ActorId === "string")
                    message.ActorId = parseInt(object.ActorId, 10);
                else if (typeof object.ActorId === "number")
                    message.ActorId = object.ActorId;
                else if (typeof object.ActorId === "object")
                    message.ActorId = new $util.LongBits(object.ActorId.low >>> 0, object.ActorId.high >>> 0).toNumber();
            if (object.request != null)
                message.request = String(object.request);
            return message;
        };

        /**
         * Creates a plain object from a C2M_TestRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NiceET.C2M_TestRequest
         * @static
         * @param {NiceET.C2M_TestRequest} message C2M_TestRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2M_TestRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.request = "";
                object.RpcId = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.ActorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.ActorId = options.longs === String ? "0" : 0;
            }
            if (message.request != null && message.hasOwnProperty("request"))
                object.request = message.request;
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                object.RpcId = message.RpcId;
            if (message.ActorId != null && message.hasOwnProperty("ActorId"))
                if (typeof message.ActorId === "number")
                    object.ActorId = options.longs === String ? String(message.ActorId) : message.ActorId;
                else
                    object.ActorId = options.longs === String ? $util.Long.prototype.toString.call(message.ActorId) : options.longs === Number ? new $util.LongBits(message.ActorId.low >>> 0, message.ActorId.high >>> 0).toNumber() : message.ActorId;
            return object;
        };

        /**
         * Converts this C2M_TestRequest to JSON.
         * @function toJSON
         * @memberof NiceET.C2M_TestRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2M_TestRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2M_TestRequest;
    })();

    NiceET.M2C_TestResponse = (function() {

        /**
         * Properties of a M2C_TestResponse.
         * @memberof NiceET
         * @interface IM2C_TestResponse
         * @property {number|null} [RpcId] M2C_TestResponse RpcId
         * @property {number|null} [Error] M2C_TestResponse Error
         * @property {string|null} [Message] M2C_TestResponse Message
         * @property {string|null} [response] M2C_TestResponse response
         */

        /**
         * Constructs a new M2C_TestResponse.
         * @memberof NiceET
         * @classdesc Represents a M2C_TestResponse.
         * @implements IM2C_TestResponse
         * @constructor
         * @param {NiceET.IM2C_TestResponse=} [properties] Properties to set
         */
        function M2C_TestResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * M2C_TestResponse RpcId.
         * @member {number} RpcId
         * @memberof NiceET.M2C_TestResponse
         * @instance
         */
        M2C_TestResponse.prototype.RpcId = 0;

        /**
         * M2C_TestResponse Error.
         * @member {number} Error
         * @memberof NiceET.M2C_TestResponse
         * @instance
         */
        M2C_TestResponse.prototype.Error = 0;

        /**
         * M2C_TestResponse Message.
         * @member {string} Message
         * @memberof NiceET.M2C_TestResponse
         * @instance
         */
        M2C_TestResponse.prototype.Message = "";

        /**
         * M2C_TestResponse response.
         * @member {string} response
         * @memberof NiceET.M2C_TestResponse
         * @instance
         */
        M2C_TestResponse.prototype.response = "";

        /**
         * Creates a new M2C_TestResponse instance using the specified properties.
         * @function create
         * @memberof NiceET.M2C_TestResponse
         * @static
         * @param {NiceET.IM2C_TestResponse=} [properties] Properties to set
         * @returns {NiceET.M2C_TestResponse} M2C_TestResponse instance
         */
        M2C_TestResponse.create = function create(properties) {
            return new M2C_TestResponse(properties);
        };

        /**
         * Encodes the specified M2C_TestResponse message. Does not implicitly {@link NiceET.M2C_TestResponse.verify|verify} messages.
         * @function encode
         * @memberof NiceET.M2C_TestResponse
         * @static
         * @param {NiceET.IM2C_TestResponse} message M2C_TestResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        M2C_TestResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.response != null && message.hasOwnProperty("response"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.response);
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                writer.uint32(/* id 90, wireType 0 =*/720).int32(message.RpcId);
            if (message.Error != null && message.hasOwnProperty("Error"))
                writer.uint32(/* id 91, wireType 0 =*/728).int32(message.Error);
            if (message.Message != null && message.hasOwnProperty("Message"))
                writer.uint32(/* id 92, wireType 2 =*/738).string(message.Message);
            return writer;
        };

        /**
         * Encodes the specified M2C_TestResponse message, length delimited. Does not implicitly {@link NiceET.M2C_TestResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NiceET.M2C_TestResponse
         * @static
         * @param {NiceET.IM2C_TestResponse} message M2C_TestResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        M2C_TestResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a M2C_TestResponse message from the specified reader or buffer.
         * @function decode
         * @memberof NiceET.M2C_TestResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NiceET.M2C_TestResponse} M2C_TestResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        M2C_TestResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NiceET.M2C_TestResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 90:
                    message.RpcId = reader.int32();
                    break;
                case 91:
                    message.Error = reader.int32();
                    break;
                case 92:
                    message.Message = reader.string();
                    break;
                case 1:
                    message.response = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a M2C_TestResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NiceET.M2C_TestResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NiceET.M2C_TestResponse} M2C_TestResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        M2C_TestResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a M2C_TestResponse message.
         * @function verify
         * @memberof NiceET.M2C_TestResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        M2C_TestResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                if (!$util.isInteger(message.RpcId))
                    return "RpcId: integer expected";
            if (message.Error != null && message.hasOwnProperty("Error"))
                if (!$util.isInteger(message.Error))
                    return "Error: integer expected";
            if (message.Message != null && message.hasOwnProperty("Message"))
                if (!$util.isString(message.Message))
                    return "Message: string expected";
            if (message.response != null && message.hasOwnProperty("response"))
                if (!$util.isString(message.response))
                    return "response: string expected";
            return null;
        };

        /**
         * Creates a M2C_TestResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NiceET.M2C_TestResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NiceET.M2C_TestResponse} M2C_TestResponse
         */
        M2C_TestResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.NiceET.M2C_TestResponse)
                return object;
            var message = new $root.NiceET.M2C_TestResponse();
            if (object.RpcId != null)
                message.RpcId = object.RpcId | 0;
            if (object.Error != null)
                message.Error = object.Error | 0;
            if (object.Message != null)
                message.Message = String(object.Message);
            if (object.response != null)
                message.response = String(object.response);
            return message;
        };

        /**
         * Creates a plain object from a M2C_TestResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NiceET.M2C_TestResponse
         * @static
         * @param {NiceET.M2C_TestResponse} message M2C_TestResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        M2C_TestResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.response = "";
                object.RpcId = 0;
                object.Error = 0;
                object.Message = "";
            }
            if (message.response != null && message.hasOwnProperty("response"))
                object.response = message.response;
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                object.RpcId = message.RpcId;
            if (message.Error != null && message.hasOwnProperty("Error"))
                object.Error = message.Error;
            if (message.Message != null && message.hasOwnProperty("Message"))
                object.Message = message.Message;
            return object;
        };

        /**
         * Converts this M2C_TestResponse to JSON.
         * @function toJSON
         * @memberof NiceET.M2C_TestResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        M2C_TestResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return M2C_TestResponse;
    })();

    NiceET.Actor_TransferRequest = (function() {

        /**
         * Properties of an Actor_TransferRequest.
         * @memberof NiceET
         * @interface IActor_TransferRequest
         * @property {number|null} [RpcId] Actor_TransferRequest RpcId
         * @property {number|Long|null} [ActorId] Actor_TransferRequest ActorId
         * @property {number|null} [MapIndex] Actor_TransferRequest MapIndex
         */

        /**
         * Constructs a new Actor_TransferRequest.
         * @memberof NiceET
         * @classdesc Represents an Actor_TransferRequest.
         * @implements IActor_TransferRequest
         * @constructor
         * @param {NiceET.IActor_TransferRequest=} [properties] Properties to set
         */
        function Actor_TransferRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Actor_TransferRequest RpcId.
         * @member {number} RpcId
         * @memberof NiceET.Actor_TransferRequest
         * @instance
         */
        Actor_TransferRequest.prototype.RpcId = 0;

        /**
         * Actor_TransferRequest ActorId.
         * @member {number|Long} ActorId
         * @memberof NiceET.Actor_TransferRequest
         * @instance
         */
        Actor_TransferRequest.prototype.ActorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Actor_TransferRequest MapIndex.
         * @member {number} MapIndex
         * @memberof NiceET.Actor_TransferRequest
         * @instance
         */
        Actor_TransferRequest.prototype.MapIndex = 0;

        /**
         * Creates a new Actor_TransferRequest instance using the specified properties.
         * @function create
         * @memberof NiceET.Actor_TransferRequest
         * @static
         * @param {NiceET.IActor_TransferRequest=} [properties] Properties to set
         * @returns {NiceET.Actor_TransferRequest} Actor_TransferRequest instance
         */
        Actor_TransferRequest.create = function create(properties) {
            return new Actor_TransferRequest(properties);
        };

        /**
         * Encodes the specified Actor_TransferRequest message. Does not implicitly {@link NiceET.Actor_TransferRequest.verify|verify} messages.
         * @function encode
         * @memberof NiceET.Actor_TransferRequest
         * @static
         * @param {NiceET.IActor_TransferRequest} message Actor_TransferRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Actor_TransferRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.MapIndex != null && message.hasOwnProperty("MapIndex"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.MapIndex);
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                writer.uint32(/* id 90, wireType 0 =*/720).int32(message.RpcId);
            if (message.ActorId != null && message.hasOwnProperty("ActorId"))
                writer.uint32(/* id 93, wireType 0 =*/744).sint64(message.ActorId);
            return writer;
        };

        /**
         * Encodes the specified Actor_TransferRequest message, length delimited. Does not implicitly {@link NiceET.Actor_TransferRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NiceET.Actor_TransferRequest
         * @static
         * @param {NiceET.IActor_TransferRequest} message Actor_TransferRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Actor_TransferRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Actor_TransferRequest message from the specified reader or buffer.
         * @function decode
         * @memberof NiceET.Actor_TransferRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NiceET.Actor_TransferRequest} Actor_TransferRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Actor_TransferRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NiceET.Actor_TransferRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 90:
                    message.RpcId = reader.int32();
                    break;
                case 93:
                    message.ActorId = reader.sint64();
                    break;
                case 1:
                    message.MapIndex = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Actor_TransferRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NiceET.Actor_TransferRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NiceET.Actor_TransferRequest} Actor_TransferRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Actor_TransferRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Actor_TransferRequest message.
         * @function verify
         * @memberof NiceET.Actor_TransferRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Actor_TransferRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                if (!$util.isInteger(message.RpcId))
                    return "RpcId: integer expected";
            if (message.ActorId != null && message.hasOwnProperty("ActorId"))
                if (!$util.isInteger(message.ActorId) && !(message.ActorId && $util.isInteger(message.ActorId.low) && $util.isInteger(message.ActorId.high)))
                    return "ActorId: integer|Long expected";
            if (message.MapIndex != null && message.hasOwnProperty("MapIndex"))
                if (!$util.isInteger(message.MapIndex))
                    return "MapIndex: integer expected";
            return null;
        };

        /**
         * Creates an Actor_TransferRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NiceET.Actor_TransferRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NiceET.Actor_TransferRequest} Actor_TransferRequest
         */
        Actor_TransferRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.NiceET.Actor_TransferRequest)
                return object;
            var message = new $root.NiceET.Actor_TransferRequest();
            if (object.RpcId != null)
                message.RpcId = object.RpcId | 0;
            if (object.ActorId != null)
                if ($util.Long)
                    (message.ActorId = $util.Long.fromValue(object.ActorId)).unsigned = false;
                else if (typeof object.ActorId === "string")
                    message.ActorId = parseInt(object.ActorId, 10);
                else if (typeof object.ActorId === "number")
                    message.ActorId = object.ActorId;
                else if (typeof object.ActorId === "object")
                    message.ActorId = new $util.LongBits(object.ActorId.low >>> 0, object.ActorId.high >>> 0).toNumber();
            if (object.MapIndex != null)
                message.MapIndex = object.MapIndex | 0;
            return message;
        };

        /**
         * Creates a plain object from an Actor_TransferRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NiceET.Actor_TransferRequest
         * @static
         * @param {NiceET.Actor_TransferRequest} message Actor_TransferRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Actor_TransferRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.MapIndex = 0;
                object.RpcId = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.ActorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.ActorId = options.longs === String ? "0" : 0;
            }
            if (message.MapIndex != null && message.hasOwnProperty("MapIndex"))
                object.MapIndex = message.MapIndex;
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                object.RpcId = message.RpcId;
            if (message.ActorId != null && message.hasOwnProperty("ActorId"))
                if (typeof message.ActorId === "number")
                    object.ActorId = options.longs === String ? String(message.ActorId) : message.ActorId;
                else
                    object.ActorId = options.longs === String ? $util.Long.prototype.toString.call(message.ActorId) : options.longs === Number ? new $util.LongBits(message.ActorId.low >>> 0, message.ActorId.high >>> 0).toNumber() : message.ActorId;
            return object;
        };

        /**
         * Converts this Actor_TransferRequest to JSON.
         * @function toJSON
         * @memberof NiceET.Actor_TransferRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Actor_TransferRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Actor_TransferRequest;
    })();

    NiceET.Actor_TransferResponse = (function() {

        /**
         * Properties of an Actor_TransferResponse.
         * @memberof NiceET
         * @interface IActor_TransferResponse
         * @property {number|null} [RpcId] Actor_TransferResponse RpcId
         * @property {number|null} [Error] Actor_TransferResponse Error
         * @property {string|null} [Message] Actor_TransferResponse Message
         */

        /**
         * Constructs a new Actor_TransferResponse.
         * @memberof NiceET
         * @classdesc Represents an Actor_TransferResponse.
         * @implements IActor_TransferResponse
         * @constructor
         * @param {NiceET.IActor_TransferResponse=} [properties] Properties to set
         */
        function Actor_TransferResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Actor_TransferResponse RpcId.
         * @member {number} RpcId
         * @memberof NiceET.Actor_TransferResponse
         * @instance
         */
        Actor_TransferResponse.prototype.RpcId = 0;

        /**
         * Actor_TransferResponse Error.
         * @member {number} Error
         * @memberof NiceET.Actor_TransferResponse
         * @instance
         */
        Actor_TransferResponse.prototype.Error = 0;

        /**
         * Actor_TransferResponse Message.
         * @member {string} Message
         * @memberof NiceET.Actor_TransferResponse
         * @instance
         */
        Actor_TransferResponse.prototype.Message = "";

        /**
         * Creates a new Actor_TransferResponse instance using the specified properties.
         * @function create
         * @memberof NiceET.Actor_TransferResponse
         * @static
         * @param {NiceET.IActor_TransferResponse=} [properties] Properties to set
         * @returns {NiceET.Actor_TransferResponse} Actor_TransferResponse instance
         */
        Actor_TransferResponse.create = function create(properties) {
            return new Actor_TransferResponse(properties);
        };

        /**
         * Encodes the specified Actor_TransferResponse message. Does not implicitly {@link NiceET.Actor_TransferResponse.verify|verify} messages.
         * @function encode
         * @memberof NiceET.Actor_TransferResponse
         * @static
         * @param {NiceET.IActor_TransferResponse} message Actor_TransferResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Actor_TransferResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                writer.uint32(/* id 90, wireType 0 =*/720).int32(message.RpcId);
            if (message.Error != null && message.hasOwnProperty("Error"))
                writer.uint32(/* id 91, wireType 0 =*/728).int32(message.Error);
            if (message.Message != null && message.hasOwnProperty("Message"))
                writer.uint32(/* id 92, wireType 2 =*/738).string(message.Message);
            return writer;
        };

        /**
         * Encodes the specified Actor_TransferResponse message, length delimited. Does not implicitly {@link NiceET.Actor_TransferResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NiceET.Actor_TransferResponse
         * @static
         * @param {NiceET.IActor_TransferResponse} message Actor_TransferResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Actor_TransferResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Actor_TransferResponse message from the specified reader or buffer.
         * @function decode
         * @memberof NiceET.Actor_TransferResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NiceET.Actor_TransferResponse} Actor_TransferResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Actor_TransferResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NiceET.Actor_TransferResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 90:
                    message.RpcId = reader.int32();
                    break;
                case 91:
                    message.Error = reader.int32();
                    break;
                case 92:
                    message.Message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Actor_TransferResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NiceET.Actor_TransferResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NiceET.Actor_TransferResponse} Actor_TransferResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Actor_TransferResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Actor_TransferResponse message.
         * @function verify
         * @memberof NiceET.Actor_TransferResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Actor_TransferResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                if (!$util.isInteger(message.RpcId))
                    return "RpcId: integer expected";
            if (message.Error != null && message.hasOwnProperty("Error"))
                if (!$util.isInteger(message.Error))
                    return "Error: integer expected";
            if (message.Message != null && message.hasOwnProperty("Message"))
                if (!$util.isString(message.Message))
                    return "Message: string expected";
            return null;
        };

        /**
         * Creates an Actor_TransferResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NiceET.Actor_TransferResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NiceET.Actor_TransferResponse} Actor_TransferResponse
         */
        Actor_TransferResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.NiceET.Actor_TransferResponse)
                return object;
            var message = new $root.NiceET.Actor_TransferResponse();
            if (object.RpcId != null)
                message.RpcId = object.RpcId | 0;
            if (object.Error != null)
                message.Error = object.Error | 0;
            if (object.Message != null)
                message.Message = String(object.Message);
            return message;
        };

        /**
         * Creates a plain object from an Actor_TransferResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NiceET.Actor_TransferResponse
         * @static
         * @param {NiceET.Actor_TransferResponse} message Actor_TransferResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Actor_TransferResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.RpcId = 0;
                object.Error = 0;
                object.Message = "";
            }
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                object.RpcId = message.RpcId;
            if (message.Error != null && message.hasOwnProperty("Error"))
                object.Error = message.Error;
            if (message.Message != null && message.hasOwnProperty("Message"))
                object.Message = message.Message;
            return object;
        };

        /**
         * Converts this Actor_TransferResponse to JSON.
         * @function toJSON
         * @memberof NiceET.Actor_TransferResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Actor_TransferResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Actor_TransferResponse;
    })();

    NiceET.C2G_EnterMap = (function() {

        /**
         * Properties of a C2G_EnterMap.
         * @memberof NiceET
         * @interface IC2G_EnterMap
         * @property {number|null} [RpcId] C2G_EnterMap RpcId
         */

        /**
         * Constructs a new C2G_EnterMap.
         * @memberof NiceET
         * @classdesc Represents a C2G_EnterMap.
         * @implements IC2G_EnterMap
         * @constructor
         * @param {NiceET.IC2G_EnterMap=} [properties] Properties to set
         */
        function C2G_EnterMap(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2G_EnterMap RpcId.
         * @member {number} RpcId
         * @memberof NiceET.C2G_EnterMap
         * @instance
         */
        C2G_EnterMap.prototype.RpcId = 0;

        /**
         * Creates a new C2G_EnterMap instance using the specified properties.
         * @function create
         * @memberof NiceET.C2G_EnterMap
         * @static
         * @param {NiceET.IC2G_EnterMap=} [properties] Properties to set
         * @returns {NiceET.C2G_EnterMap} C2G_EnterMap instance
         */
        C2G_EnterMap.create = function create(properties) {
            return new C2G_EnterMap(properties);
        };

        /**
         * Encodes the specified C2G_EnterMap message. Does not implicitly {@link NiceET.C2G_EnterMap.verify|verify} messages.
         * @function encode
         * @memberof NiceET.C2G_EnterMap
         * @static
         * @param {NiceET.IC2G_EnterMap} message C2G_EnterMap message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2G_EnterMap.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                writer.uint32(/* id 90, wireType 0 =*/720).int32(message.RpcId);
            return writer;
        };

        /**
         * Encodes the specified C2G_EnterMap message, length delimited. Does not implicitly {@link NiceET.C2G_EnterMap.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NiceET.C2G_EnterMap
         * @static
         * @param {NiceET.IC2G_EnterMap} message C2G_EnterMap message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2G_EnterMap.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2G_EnterMap message from the specified reader or buffer.
         * @function decode
         * @memberof NiceET.C2G_EnterMap
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NiceET.C2G_EnterMap} C2G_EnterMap
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2G_EnterMap.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NiceET.C2G_EnterMap();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 90:
                    message.RpcId = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2G_EnterMap message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NiceET.C2G_EnterMap
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NiceET.C2G_EnterMap} C2G_EnterMap
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2G_EnterMap.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2G_EnterMap message.
         * @function verify
         * @memberof NiceET.C2G_EnterMap
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2G_EnterMap.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                if (!$util.isInteger(message.RpcId))
                    return "RpcId: integer expected";
            return null;
        };

        /**
         * Creates a C2G_EnterMap message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NiceET.C2G_EnterMap
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NiceET.C2G_EnterMap} C2G_EnterMap
         */
        C2G_EnterMap.fromObject = function fromObject(object) {
            if (object instanceof $root.NiceET.C2G_EnterMap)
                return object;
            var message = new $root.NiceET.C2G_EnterMap();
            if (object.RpcId != null)
                message.RpcId = object.RpcId | 0;
            return message;
        };

        /**
         * Creates a plain object from a C2G_EnterMap message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NiceET.C2G_EnterMap
         * @static
         * @param {NiceET.C2G_EnterMap} message C2G_EnterMap
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2G_EnterMap.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.RpcId = 0;
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                object.RpcId = message.RpcId;
            return object;
        };

        /**
         * Converts this C2G_EnterMap to JSON.
         * @function toJSON
         * @memberof NiceET.C2G_EnterMap
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2G_EnterMap.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2G_EnterMap;
    })();

    NiceET.G2C_EnterMap = (function() {

        /**
         * Properties of a G2C_EnterMap.
         * @memberof NiceET
         * @interface IG2C_EnterMap
         * @property {number|null} [RpcId] G2C_EnterMap RpcId
         * @property {number|null} [Error] G2C_EnterMap Error
         * @property {string|null} [Message] G2C_EnterMap Message
         * @property {number|Long|null} [UnitId] G2C_EnterMap UnitId
         * @property {Array.<NiceET.IUnitInfo>|null} [Units] G2C_EnterMap Units
         */

        /**
         * Constructs a new G2C_EnterMap.
         * @memberof NiceET
         * @classdesc Represents a G2C_EnterMap.
         * @implements IG2C_EnterMap
         * @constructor
         * @param {NiceET.IG2C_EnterMap=} [properties] Properties to set
         */
        function G2C_EnterMap(properties) {
            this.Units = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * G2C_EnterMap RpcId.
         * @member {number} RpcId
         * @memberof NiceET.G2C_EnterMap
         * @instance
         */
        G2C_EnterMap.prototype.RpcId = 0;

        /**
         * G2C_EnterMap Error.
         * @member {number} Error
         * @memberof NiceET.G2C_EnterMap
         * @instance
         */
        G2C_EnterMap.prototype.Error = 0;

        /**
         * G2C_EnterMap Message.
         * @member {string} Message
         * @memberof NiceET.G2C_EnterMap
         * @instance
         */
        G2C_EnterMap.prototype.Message = "";

        /**
         * G2C_EnterMap UnitId.
         * @member {number|Long} UnitId
         * @memberof NiceET.G2C_EnterMap
         * @instance
         */
        G2C_EnterMap.prototype.UnitId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * G2C_EnterMap Units.
         * @member {Array.<NiceET.IUnitInfo>} Units
         * @memberof NiceET.G2C_EnterMap
         * @instance
         */
        G2C_EnterMap.prototype.Units = $util.emptyArray;

        /**
         * Creates a new G2C_EnterMap instance using the specified properties.
         * @function create
         * @memberof NiceET.G2C_EnterMap
         * @static
         * @param {NiceET.IG2C_EnterMap=} [properties] Properties to set
         * @returns {NiceET.G2C_EnterMap} G2C_EnterMap instance
         */
        G2C_EnterMap.create = function create(properties) {
            return new G2C_EnterMap(properties);
        };

        /**
         * Encodes the specified G2C_EnterMap message. Does not implicitly {@link NiceET.G2C_EnterMap.verify|verify} messages.
         * @function encode
         * @memberof NiceET.G2C_EnterMap
         * @static
         * @param {NiceET.IG2C_EnterMap} message G2C_EnterMap message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        G2C_EnterMap.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.UnitId != null && message.hasOwnProperty("UnitId"))
                writer.uint32(/* id 1, wireType 0 =*/8).sint64(message.UnitId);
            if (message.Units != null && message.Units.length)
                for (var i = 0; i < message.Units.length; ++i)
                    $root.NiceET.UnitInfo.encode(message.Units[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                writer.uint32(/* id 90, wireType 0 =*/720).int32(message.RpcId);
            if (message.Error != null && message.hasOwnProperty("Error"))
                writer.uint32(/* id 91, wireType 0 =*/728).int32(message.Error);
            if (message.Message != null && message.hasOwnProperty("Message"))
                writer.uint32(/* id 92, wireType 2 =*/738).string(message.Message);
            return writer;
        };

        /**
         * Encodes the specified G2C_EnterMap message, length delimited. Does not implicitly {@link NiceET.G2C_EnterMap.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NiceET.G2C_EnterMap
         * @static
         * @param {NiceET.IG2C_EnterMap} message G2C_EnterMap message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        G2C_EnterMap.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a G2C_EnterMap message from the specified reader or buffer.
         * @function decode
         * @memberof NiceET.G2C_EnterMap
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NiceET.G2C_EnterMap} G2C_EnterMap
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        G2C_EnterMap.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NiceET.G2C_EnterMap();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 90:
                    message.RpcId = reader.int32();
                    break;
                case 91:
                    message.Error = reader.int32();
                    break;
                case 92:
                    message.Message = reader.string();
                    break;
                case 1:
                    message.UnitId = reader.sint64();
                    break;
                case 2:
                    if (!(message.Units && message.Units.length))
                        message.Units = [];
                    message.Units.push($root.NiceET.UnitInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a G2C_EnterMap message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NiceET.G2C_EnterMap
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NiceET.G2C_EnterMap} G2C_EnterMap
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        G2C_EnterMap.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a G2C_EnterMap message.
         * @function verify
         * @memberof NiceET.G2C_EnterMap
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        G2C_EnterMap.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                if (!$util.isInteger(message.RpcId))
                    return "RpcId: integer expected";
            if (message.Error != null && message.hasOwnProperty("Error"))
                if (!$util.isInteger(message.Error))
                    return "Error: integer expected";
            if (message.Message != null && message.hasOwnProperty("Message"))
                if (!$util.isString(message.Message))
                    return "Message: string expected";
            if (message.UnitId != null && message.hasOwnProperty("UnitId"))
                if (!$util.isInteger(message.UnitId) && !(message.UnitId && $util.isInteger(message.UnitId.low) && $util.isInteger(message.UnitId.high)))
                    return "UnitId: integer|Long expected";
            if (message.Units != null && message.hasOwnProperty("Units")) {
                if (!Array.isArray(message.Units))
                    return "Units: array expected";
                for (var i = 0; i < message.Units.length; ++i) {
                    var error = $root.NiceET.UnitInfo.verify(message.Units[i]);
                    if (error)
                        return "Units." + error;
                }
            }
            return null;
        };

        /**
         * Creates a G2C_EnterMap message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NiceET.G2C_EnterMap
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NiceET.G2C_EnterMap} G2C_EnterMap
         */
        G2C_EnterMap.fromObject = function fromObject(object) {
            if (object instanceof $root.NiceET.G2C_EnterMap)
                return object;
            var message = new $root.NiceET.G2C_EnterMap();
            if (object.RpcId != null)
                message.RpcId = object.RpcId | 0;
            if (object.Error != null)
                message.Error = object.Error | 0;
            if (object.Message != null)
                message.Message = String(object.Message);
            if (object.UnitId != null)
                if ($util.Long)
                    (message.UnitId = $util.Long.fromValue(object.UnitId)).unsigned = false;
                else if (typeof object.UnitId === "string")
                    message.UnitId = parseInt(object.UnitId, 10);
                else if (typeof object.UnitId === "number")
                    message.UnitId = object.UnitId;
                else if (typeof object.UnitId === "object")
                    message.UnitId = new $util.LongBits(object.UnitId.low >>> 0, object.UnitId.high >>> 0).toNumber();
            if (object.Units) {
                if (!Array.isArray(object.Units))
                    throw TypeError(".NiceET.G2C_EnterMap.Units: array expected");
                message.Units = [];
                for (var i = 0; i < object.Units.length; ++i) {
                    if (typeof object.Units[i] !== "object")
                        throw TypeError(".NiceET.G2C_EnterMap.Units: object expected");
                    message.Units[i] = $root.NiceET.UnitInfo.fromObject(object.Units[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a G2C_EnterMap message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NiceET.G2C_EnterMap
         * @static
         * @param {NiceET.G2C_EnterMap} message G2C_EnterMap
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        G2C_EnterMap.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.Units = [];
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.UnitId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.UnitId = options.longs === String ? "0" : 0;
                object.RpcId = 0;
                object.Error = 0;
                object.Message = "";
            }
            if (message.UnitId != null && message.hasOwnProperty("UnitId"))
                if (typeof message.UnitId === "number")
                    object.UnitId = options.longs === String ? String(message.UnitId) : message.UnitId;
                else
                    object.UnitId = options.longs === String ? $util.Long.prototype.toString.call(message.UnitId) : options.longs === Number ? new $util.LongBits(message.UnitId.low >>> 0, message.UnitId.high >>> 0).toNumber() : message.UnitId;
            if (message.Units && message.Units.length) {
                object.Units = [];
                for (var j = 0; j < message.Units.length; ++j)
                    object.Units[j] = $root.NiceET.UnitInfo.toObject(message.Units[j], options);
            }
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                object.RpcId = message.RpcId;
            if (message.Error != null && message.hasOwnProperty("Error"))
                object.Error = message.Error;
            if (message.Message != null && message.hasOwnProperty("Message"))
                object.Message = message.Message;
            return object;
        };

        /**
         * Converts this G2C_EnterMap to JSON.
         * @function toJSON
         * @memberof NiceET.G2C_EnterMap
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        G2C_EnterMap.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return G2C_EnterMap;
    })();

    NiceET.UnitInfo = (function() {

        /**
         * Properties of an UnitInfo.
         * @memberof NiceET
         * @interface IUnitInfo
         * @property {number|Long|null} [UnitId] UnitInfo UnitId
         * @property {number|null} [X] UnitInfo X
         * @property {number|null} [Y] UnitInfo Y
         * @property {number|null} [Z] UnitInfo Z
         */

        /**
         * Constructs a new UnitInfo.
         * @memberof NiceET
         * @classdesc Represents an UnitInfo.
         * @implements IUnitInfo
         * @constructor
         * @param {NiceET.IUnitInfo=} [properties] Properties to set
         */
        function UnitInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UnitInfo UnitId.
         * @member {number|Long} UnitId
         * @memberof NiceET.UnitInfo
         * @instance
         */
        UnitInfo.prototype.UnitId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UnitInfo X.
         * @member {number} X
         * @memberof NiceET.UnitInfo
         * @instance
         */
        UnitInfo.prototype.X = 0;

        /**
         * UnitInfo Y.
         * @member {number} Y
         * @memberof NiceET.UnitInfo
         * @instance
         */
        UnitInfo.prototype.Y = 0;

        /**
         * UnitInfo Z.
         * @member {number} Z
         * @memberof NiceET.UnitInfo
         * @instance
         */
        UnitInfo.prototype.Z = 0;

        /**
         * Creates a new UnitInfo instance using the specified properties.
         * @function create
         * @memberof NiceET.UnitInfo
         * @static
         * @param {NiceET.IUnitInfo=} [properties] Properties to set
         * @returns {NiceET.UnitInfo} UnitInfo instance
         */
        UnitInfo.create = function create(properties) {
            return new UnitInfo(properties);
        };

        /**
         * Encodes the specified UnitInfo message. Does not implicitly {@link NiceET.UnitInfo.verify|verify} messages.
         * @function encode
         * @memberof NiceET.UnitInfo
         * @static
         * @param {NiceET.IUnitInfo} message UnitInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UnitInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.UnitId != null && message.hasOwnProperty("UnitId"))
                writer.uint32(/* id 1, wireType 0 =*/8).sint64(message.UnitId);
            if (message.X != null && message.hasOwnProperty("X"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.X);
            if (message.Y != null && message.hasOwnProperty("Y"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.Y);
            if (message.Z != null && message.hasOwnProperty("Z"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.Z);
            return writer;
        };

        /**
         * Encodes the specified UnitInfo message, length delimited. Does not implicitly {@link NiceET.UnitInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NiceET.UnitInfo
         * @static
         * @param {NiceET.IUnitInfo} message UnitInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UnitInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an UnitInfo message from the specified reader or buffer.
         * @function decode
         * @memberof NiceET.UnitInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NiceET.UnitInfo} UnitInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UnitInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NiceET.UnitInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.UnitId = reader.sint64();
                    break;
                case 2:
                    message.X = reader.float();
                    break;
                case 3:
                    message.Y = reader.float();
                    break;
                case 4:
                    message.Z = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an UnitInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NiceET.UnitInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NiceET.UnitInfo} UnitInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UnitInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UnitInfo message.
         * @function verify
         * @memberof NiceET.UnitInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UnitInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.UnitId != null && message.hasOwnProperty("UnitId"))
                if (!$util.isInteger(message.UnitId) && !(message.UnitId && $util.isInteger(message.UnitId.low) && $util.isInteger(message.UnitId.high)))
                    return "UnitId: integer|Long expected";
            if (message.X != null && message.hasOwnProperty("X"))
                if (typeof message.X !== "number")
                    return "X: number expected";
            if (message.Y != null && message.hasOwnProperty("Y"))
                if (typeof message.Y !== "number")
                    return "Y: number expected";
            if (message.Z != null && message.hasOwnProperty("Z"))
                if (typeof message.Z !== "number")
                    return "Z: number expected";
            return null;
        };

        /**
         * Creates an UnitInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NiceET.UnitInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NiceET.UnitInfo} UnitInfo
         */
        UnitInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.NiceET.UnitInfo)
                return object;
            var message = new $root.NiceET.UnitInfo();
            if (object.UnitId != null)
                if ($util.Long)
                    (message.UnitId = $util.Long.fromValue(object.UnitId)).unsigned = false;
                else if (typeof object.UnitId === "string")
                    message.UnitId = parseInt(object.UnitId, 10);
                else if (typeof object.UnitId === "number")
                    message.UnitId = object.UnitId;
                else if (typeof object.UnitId === "object")
                    message.UnitId = new $util.LongBits(object.UnitId.low >>> 0, object.UnitId.high >>> 0).toNumber();
            if (object.X != null)
                message.X = Number(object.X);
            if (object.Y != null)
                message.Y = Number(object.Y);
            if (object.Z != null)
                message.Z = Number(object.Z);
            return message;
        };

        /**
         * Creates a plain object from an UnitInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NiceET.UnitInfo
         * @static
         * @param {NiceET.UnitInfo} message UnitInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UnitInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.UnitId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.UnitId = options.longs === String ? "0" : 0;
                object.X = 0;
                object.Y = 0;
                object.Z = 0;
            }
            if (message.UnitId != null && message.hasOwnProperty("UnitId"))
                if (typeof message.UnitId === "number")
                    object.UnitId = options.longs === String ? String(message.UnitId) : message.UnitId;
                else
                    object.UnitId = options.longs === String ? $util.Long.prototype.toString.call(message.UnitId) : options.longs === Number ? new $util.LongBits(message.UnitId.low >>> 0, message.UnitId.high >>> 0).toNumber() : message.UnitId;
            if (message.X != null && message.hasOwnProperty("X"))
                object.X = options.json && !isFinite(message.X) ? String(message.X) : message.X;
            if (message.Y != null && message.hasOwnProperty("Y"))
                object.Y = options.json && !isFinite(message.Y) ? String(message.Y) : message.Y;
            if (message.Z != null && message.hasOwnProperty("Z"))
                object.Z = options.json && !isFinite(message.Z) ? String(message.Z) : message.Z;
            return object;
        };

        /**
         * Converts this UnitInfo to JSON.
         * @function toJSON
         * @memberof NiceET.UnitInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UnitInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UnitInfo;
    })();

    NiceET.M2C_CreateUnits = (function() {

        /**
         * Properties of a M2C_CreateUnits.
         * @memberof NiceET
         * @interface IM2C_CreateUnits
         * @property {number|null} [RpcId] M2C_CreateUnits RpcId
         * @property {number|Long|null} [ActorId] M2C_CreateUnits ActorId
         * @property {Array.<NiceET.IUnitInfo>|null} [Units] M2C_CreateUnits Units
         */

        /**
         * Constructs a new M2C_CreateUnits.
         * @memberof NiceET
         * @classdesc Represents a M2C_CreateUnits.
         * @implements IM2C_CreateUnits
         * @constructor
         * @param {NiceET.IM2C_CreateUnits=} [properties] Properties to set
         */
        function M2C_CreateUnits(properties) {
            this.Units = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * M2C_CreateUnits RpcId.
         * @member {number} RpcId
         * @memberof NiceET.M2C_CreateUnits
         * @instance
         */
        M2C_CreateUnits.prototype.RpcId = 0;

        /**
         * M2C_CreateUnits ActorId.
         * @member {number|Long} ActorId
         * @memberof NiceET.M2C_CreateUnits
         * @instance
         */
        M2C_CreateUnits.prototype.ActorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * M2C_CreateUnits Units.
         * @member {Array.<NiceET.IUnitInfo>} Units
         * @memberof NiceET.M2C_CreateUnits
         * @instance
         */
        M2C_CreateUnits.prototype.Units = $util.emptyArray;

        /**
         * Creates a new M2C_CreateUnits instance using the specified properties.
         * @function create
         * @memberof NiceET.M2C_CreateUnits
         * @static
         * @param {NiceET.IM2C_CreateUnits=} [properties] Properties to set
         * @returns {NiceET.M2C_CreateUnits} M2C_CreateUnits instance
         */
        M2C_CreateUnits.create = function create(properties) {
            return new M2C_CreateUnits(properties);
        };

        /**
         * Encodes the specified M2C_CreateUnits message. Does not implicitly {@link NiceET.M2C_CreateUnits.verify|verify} messages.
         * @function encode
         * @memberof NiceET.M2C_CreateUnits
         * @static
         * @param {NiceET.IM2C_CreateUnits} message M2C_CreateUnits message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        M2C_CreateUnits.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Units != null && message.Units.length)
                for (var i = 0; i < message.Units.length; ++i)
                    $root.NiceET.UnitInfo.encode(message.Units[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                writer.uint32(/* id 90, wireType 0 =*/720).int32(message.RpcId);
            if (message.ActorId != null && message.hasOwnProperty("ActorId"))
                writer.uint32(/* id 93, wireType 0 =*/744).sint64(message.ActorId);
            return writer;
        };

        /**
         * Encodes the specified M2C_CreateUnits message, length delimited. Does not implicitly {@link NiceET.M2C_CreateUnits.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NiceET.M2C_CreateUnits
         * @static
         * @param {NiceET.IM2C_CreateUnits} message M2C_CreateUnits message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        M2C_CreateUnits.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a M2C_CreateUnits message from the specified reader or buffer.
         * @function decode
         * @memberof NiceET.M2C_CreateUnits
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NiceET.M2C_CreateUnits} M2C_CreateUnits
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        M2C_CreateUnits.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NiceET.M2C_CreateUnits();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 90:
                    message.RpcId = reader.int32();
                    break;
                case 93:
                    message.ActorId = reader.sint64();
                    break;
                case 1:
                    if (!(message.Units && message.Units.length))
                        message.Units = [];
                    message.Units.push($root.NiceET.UnitInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a M2C_CreateUnits message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NiceET.M2C_CreateUnits
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NiceET.M2C_CreateUnits} M2C_CreateUnits
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        M2C_CreateUnits.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a M2C_CreateUnits message.
         * @function verify
         * @memberof NiceET.M2C_CreateUnits
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        M2C_CreateUnits.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                if (!$util.isInteger(message.RpcId))
                    return "RpcId: integer expected";
            if (message.ActorId != null && message.hasOwnProperty("ActorId"))
                if (!$util.isInteger(message.ActorId) && !(message.ActorId && $util.isInteger(message.ActorId.low) && $util.isInteger(message.ActorId.high)))
                    return "ActorId: integer|Long expected";
            if (message.Units != null && message.hasOwnProperty("Units")) {
                if (!Array.isArray(message.Units))
                    return "Units: array expected";
                for (var i = 0; i < message.Units.length; ++i) {
                    var error = $root.NiceET.UnitInfo.verify(message.Units[i]);
                    if (error)
                        return "Units." + error;
                }
            }
            return null;
        };

        /**
         * Creates a M2C_CreateUnits message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NiceET.M2C_CreateUnits
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NiceET.M2C_CreateUnits} M2C_CreateUnits
         */
        M2C_CreateUnits.fromObject = function fromObject(object) {
            if (object instanceof $root.NiceET.M2C_CreateUnits)
                return object;
            var message = new $root.NiceET.M2C_CreateUnits();
            if (object.RpcId != null)
                message.RpcId = object.RpcId | 0;
            if (object.ActorId != null)
                if ($util.Long)
                    (message.ActorId = $util.Long.fromValue(object.ActorId)).unsigned = false;
                else if (typeof object.ActorId === "string")
                    message.ActorId = parseInt(object.ActorId, 10);
                else if (typeof object.ActorId === "number")
                    message.ActorId = object.ActorId;
                else if (typeof object.ActorId === "object")
                    message.ActorId = new $util.LongBits(object.ActorId.low >>> 0, object.ActorId.high >>> 0).toNumber();
            if (object.Units) {
                if (!Array.isArray(object.Units))
                    throw TypeError(".NiceET.M2C_CreateUnits.Units: array expected");
                message.Units = [];
                for (var i = 0; i < object.Units.length; ++i) {
                    if (typeof object.Units[i] !== "object")
                        throw TypeError(".NiceET.M2C_CreateUnits.Units: object expected");
                    message.Units[i] = $root.NiceET.UnitInfo.fromObject(object.Units[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a M2C_CreateUnits message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NiceET.M2C_CreateUnits
         * @static
         * @param {NiceET.M2C_CreateUnits} message M2C_CreateUnits
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        M2C_CreateUnits.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.Units = [];
            if (options.defaults) {
                object.RpcId = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.ActorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.ActorId = options.longs === String ? "0" : 0;
            }
            if (message.Units && message.Units.length) {
                object.Units = [];
                for (var j = 0; j < message.Units.length; ++j)
                    object.Units[j] = $root.NiceET.UnitInfo.toObject(message.Units[j], options);
            }
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                object.RpcId = message.RpcId;
            if (message.ActorId != null && message.hasOwnProperty("ActorId"))
                if (typeof message.ActorId === "number")
                    object.ActorId = options.longs === String ? String(message.ActorId) : message.ActorId;
                else
                    object.ActorId = options.longs === String ? $util.Long.prototype.toString.call(message.ActorId) : options.longs === Number ? new $util.LongBits(message.ActorId.low >>> 0, message.ActorId.high >>> 0).toNumber() : message.ActorId;
            return object;
        };

        /**
         * Converts this M2C_CreateUnits to JSON.
         * @function toJSON
         * @memberof NiceET.M2C_CreateUnits
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        M2C_CreateUnits.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return M2C_CreateUnits;
    })();

    NiceET.Frame_ClickMap = (function() {

        /**
         * Properties of a Frame_ClickMap.
         * @memberof NiceET
         * @interface IFrame_ClickMap
         * @property {number|null} [RpcId] Frame_ClickMap RpcId
         * @property {number|Long|null} [ActorId] Frame_ClickMap ActorId
         * @property {number|Long|null} [Id] Frame_ClickMap Id
         * @property {number|null} [X] Frame_ClickMap X
         * @property {number|null} [Y] Frame_ClickMap Y
         * @property {number|null} [Z] Frame_ClickMap Z
         */

        /**
         * Constructs a new Frame_ClickMap.
         * @memberof NiceET
         * @classdesc Represents a Frame_ClickMap.
         * @implements IFrame_ClickMap
         * @constructor
         * @param {NiceET.IFrame_ClickMap=} [properties] Properties to set
         */
        function Frame_ClickMap(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Frame_ClickMap RpcId.
         * @member {number} RpcId
         * @memberof NiceET.Frame_ClickMap
         * @instance
         */
        Frame_ClickMap.prototype.RpcId = 0;

        /**
         * Frame_ClickMap ActorId.
         * @member {number|Long} ActorId
         * @memberof NiceET.Frame_ClickMap
         * @instance
         */
        Frame_ClickMap.prototype.ActorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Frame_ClickMap Id.
         * @member {number|Long} Id
         * @memberof NiceET.Frame_ClickMap
         * @instance
         */
        Frame_ClickMap.prototype.Id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Frame_ClickMap X.
         * @member {number} X
         * @memberof NiceET.Frame_ClickMap
         * @instance
         */
        Frame_ClickMap.prototype.X = 0;

        /**
         * Frame_ClickMap Y.
         * @member {number} Y
         * @memberof NiceET.Frame_ClickMap
         * @instance
         */
        Frame_ClickMap.prototype.Y = 0;

        /**
         * Frame_ClickMap Z.
         * @member {number} Z
         * @memberof NiceET.Frame_ClickMap
         * @instance
         */
        Frame_ClickMap.prototype.Z = 0;

        /**
         * Creates a new Frame_ClickMap instance using the specified properties.
         * @function create
         * @memberof NiceET.Frame_ClickMap
         * @static
         * @param {NiceET.IFrame_ClickMap=} [properties] Properties to set
         * @returns {NiceET.Frame_ClickMap} Frame_ClickMap instance
         */
        Frame_ClickMap.create = function create(properties) {
            return new Frame_ClickMap(properties);
        };

        /**
         * Encodes the specified Frame_ClickMap message. Does not implicitly {@link NiceET.Frame_ClickMap.verify|verify} messages.
         * @function encode
         * @memberof NiceET.Frame_ClickMap
         * @static
         * @param {NiceET.IFrame_ClickMap} message Frame_ClickMap message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Frame_ClickMap.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.X != null && message.hasOwnProperty("X"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.X);
            if (message.Y != null && message.hasOwnProperty("Y"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.Y);
            if (message.Z != null && message.hasOwnProperty("Z"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.Z);
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                writer.uint32(/* id 90, wireType 0 =*/720).int32(message.RpcId);
            if (message.ActorId != null && message.hasOwnProperty("ActorId"))
                writer.uint32(/* id 93, wireType 0 =*/744).sint64(message.ActorId);
            if (message.Id != null && message.hasOwnProperty("Id"))
                writer.uint32(/* id 94, wireType 0 =*/752).sint64(message.Id);
            return writer;
        };

        /**
         * Encodes the specified Frame_ClickMap message, length delimited. Does not implicitly {@link NiceET.Frame_ClickMap.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NiceET.Frame_ClickMap
         * @static
         * @param {NiceET.IFrame_ClickMap} message Frame_ClickMap message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Frame_ClickMap.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Frame_ClickMap message from the specified reader or buffer.
         * @function decode
         * @memberof NiceET.Frame_ClickMap
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NiceET.Frame_ClickMap} Frame_ClickMap
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Frame_ClickMap.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NiceET.Frame_ClickMap();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 90:
                    message.RpcId = reader.int32();
                    break;
                case 93:
                    message.ActorId = reader.sint64();
                    break;
                case 94:
                    message.Id = reader.sint64();
                    break;
                case 1:
                    message.X = reader.float();
                    break;
                case 2:
                    message.Y = reader.float();
                    break;
                case 3:
                    message.Z = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Frame_ClickMap message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NiceET.Frame_ClickMap
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NiceET.Frame_ClickMap} Frame_ClickMap
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Frame_ClickMap.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Frame_ClickMap message.
         * @function verify
         * @memberof NiceET.Frame_ClickMap
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Frame_ClickMap.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                if (!$util.isInteger(message.RpcId))
                    return "RpcId: integer expected";
            if (message.ActorId != null && message.hasOwnProperty("ActorId"))
                if (!$util.isInteger(message.ActorId) && !(message.ActorId && $util.isInteger(message.ActorId.low) && $util.isInteger(message.ActorId.high)))
                    return "ActorId: integer|Long expected";
            if (message.Id != null && message.hasOwnProperty("Id"))
                if (!$util.isInteger(message.Id) && !(message.Id && $util.isInteger(message.Id.low) && $util.isInteger(message.Id.high)))
                    return "Id: integer|Long expected";
            if (message.X != null && message.hasOwnProperty("X"))
                if (typeof message.X !== "number")
                    return "X: number expected";
            if (message.Y != null && message.hasOwnProperty("Y"))
                if (typeof message.Y !== "number")
                    return "Y: number expected";
            if (message.Z != null && message.hasOwnProperty("Z"))
                if (typeof message.Z !== "number")
                    return "Z: number expected";
            return null;
        };

        /**
         * Creates a Frame_ClickMap message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NiceET.Frame_ClickMap
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NiceET.Frame_ClickMap} Frame_ClickMap
         */
        Frame_ClickMap.fromObject = function fromObject(object) {
            if (object instanceof $root.NiceET.Frame_ClickMap)
                return object;
            var message = new $root.NiceET.Frame_ClickMap();
            if (object.RpcId != null)
                message.RpcId = object.RpcId | 0;
            if (object.ActorId != null)
                if ($util.Long)
                    (message.ActorId = $util.Long.fromValue(object.ActorId)).unsigned = false;
                else if (typeof object.ActorId === "string")
                    message.ActorId = parseInt(object.ActorId, 10);
                else if (typeof object.ActorId === "number")
                    message.ActorId = object.ActorId;
                else if (typeof object.ActorId === "object")
                    message.ActorId = new $util.LongBits(object.ActorId.low >>> 0, object.ActorId.high >>> 0).toNumber();
            if (object.Id != null)
                if ($util.Long)
                    (message.Id = $util.Long.fromValue(object.Id)).unsigned = false;
                else if (typeof object.Id === "string")
                    message.Id = parseInt(object.Id, 10);
                else if (typeof object.Id === "number")
                    message.Id = object.Id;
                else if (typeof object.Id === "object")
                    message.Id = new $util.LongBits(object.Id.low >>> 0, object.Id.high >>> 0).toNumber();
            if (object.X != null)
                message.X = Number(object.X);
            if (object.Y != null)
                message.Y = Number(object.Y);
            if (object.Z != null)
                message.Z = Number(object.Z);
            return message;
        };

        /**
         * Creates a plain object from a Frame_ClickMap message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NiceET.Frame_ClickMap
         * @static
         * @param {NiceET.Frame_ClickMap} message Frame_ClickMap
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Frame_ClickMap.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.X = 0;
                object.Y = 0;
                object.Z = 0;
                object.RpcId = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.ActorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.ActorId = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.Id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.Id = options.longs === String ? "0" : 0;
            }
            if (message.X != null && message.hasOwnProperty("X"))
                object.X = options.json && !isFinite(message.X) ? String(message.X) : message.X;
            if (message.Y != null && message.hasOwnProperty("Y"))
                object.Y = options.json && !isFinite(message.Y) ? String(message.Y) : message.Y;
            if (message.Z != null && message.hasOwnProperty("Z"))
                object.Z = options.json && !isFinite(message.Z) ? String(message.Z) : message.Z;
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                object.RpcId = message.RpcId;
            if (message.ActorId != null && message.hasOwnProperty("ActorId"))
                if (typeof message.ActorId === "number")
                    object.ActorId = options.longs === String ? String(message.ActorId) : message.ActorId;
                else
                    object.ActorId = options.longs === String ? $util.Long.prototype.toString.call(message.ActorId) : options.longs === Number ? new $util.LongBits(message.ActorId.low >>> 0, message.ActorId.high >>> 0).toNumber() : message.ActorId;
            if (message.Id != null && message.hasOwnProperty("Id"))
                if (typeof message.Id === "number")
                    object.Id = options.longs === String ? String(message.Id) : message.Id;
                else
                    object.Id = options.longs === String ? $util.Long.prototype.toString.call(message.Id) : options.longs === Number ? new $util.LongBits(message.Id.low >>> 0, message.Id.high >>> 0).toNumber() : message.Id;
            return object;
        };

        /**
         * Converts this Frame_ClickMap to JSON.
         * @function toJSON
         * @memberof NiceET.Frame_ClickMap
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Frame_ClickMap.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Frame_ClickMap;
    })();

    NiceET.M2C_PathfindingResult = (function() {

        /**
         * Properties of a M2C_PathfindingResult.
         * @memberof NiceET
         * @interface IM2C_PathfindingResult
         * @property {number|Long|null} [ActorId] M2C_PathfindingResult ActorId
         * @property {number|Long|null} [Id] M2C_PathfindingResult Id
         * @property {number|null} [X] M2C_PathfindingResult X
         * @property {number|null} [Y] M2C_PathfindingResult Y
         * @property {number|null} [Z] M2C_PathfindingResult Z
         * @property {Array.<number>|null} [Xs] M2C_PathfindingResult Xs
         * @property {Array.<number>|null} [Ys] M2C_PathfindingResult Ys
         * @property {Array.<number>|null} [Zs] M2C_PathfindingResult Zs
         */

        /**
         * Constructs a new M2C_PathfindingResult.
         * @memberof NiceET
         * @classdesc Represents a M2C_PathfindingResult.
         * @implements IM2C_PathfindingResult
         * @constructor
         * @param {NiceET.IM2C_PathfindingResult=} [properties] Properties to set
         */
        function M2C_PathfindingResult(properties) {
            this.Xs = [];
            this.Ys = [];
            this.Zs = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * M2C_PathfindingResult ActorId.
         * @member {number|Long} ActorId
         * @memberof NiceET.M2C_PathfindingResult
         * @instance
         */
        M2C_PathfindingResult.prototype.ActorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * M2C_PathfindingResult Id.
         * @member {number|Long} Id
         * @memberof NiceET.M2C_PathfindingResult
         * @instance
         */
        M2C_PathfindingResult.prototype.Id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * M2C_PathfindingResult X.
         * @member {number} X
         * @memberof NiceET.M2C_PathfindingResult
         * @instance
         */
        M2C_PathfindingResult.prototype.X = 0;

        /**
         * M2C_PathfindingResult Y.
         * @member {number} Y
         * @memberof NiceET.M2C_PathfindingResult
         * @instance
         */
        M2C_PathfindingResult.prototype.Y = 0;

        /**
         * M2C_PathfindingResult Z.
         * @member {number} Z
         * @memberof NiceET.M2C_PathfindingResult
         * @instance
         */
        M2C_PathfindingResult.prototype.Z = 0;

        /**
         * M2C_PathfindingResult Xs.
         * @member {Array.<number>} Xs
         * @memberof NiceET.M2C_PathfindingResult
         * @instance
         */
        M2C_PathfindingResult.prototype.Xs = $util.emptyArray;

        /**
         * M2C_PathfindingResult Ys.
         * @member {Array.<number>} Ys
         * @memberof NiceET.M2C_PathfindingResult
         * @instance
         */
        M2C_PathfindingResult.prototype.Ys = $util.emptyArray;

        /**
         * M2C_PathfindingResult Zs.
         * @member {Array.<number>} Zs
         * @memberof NiceET.M2C_PathfindingResult
         * @instance
         */
        M2C_PathfindingResult.prototype.Zs = $util.emptyArray;

        /**
         * Creates a new M2C_PathfindingResult instance using the specified properties.
         * @function create
         * @memberof NiceET.M2C_PathfindingResult
         * @static
         * @param {NiceET.IM2C_PathfindingResult=} [properties] Properties to set
         * @returns {NiceET.M2C_PathfindingResult} M2C_PathfindingResult instance
         */
        M2C_PathfindingResult.create = function create(properties) {
            return new M2C_PathfindingResult(properties);
        };

        /**
         * Encodes the specified M2C_PathfindingResult message. Does not implicitly {@link NiceET.M2C_PathfindingResult.verify|verify} messages.
         * @function encode
         * @memberof NiceET.M2C_PathfindingResult
         * @static
         * @param {NiceET.IM2C_PathfindingResult} message M2C_PathfindingResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        M2C_PathfindingResult.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Id != null && message.hasOwnProperty("Id"))
                writer.uint32(/* id 1, wireType 0 =*/8).sint64(message.Id);
            if (message.X != null && message.hasOwnProperty("X"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.X);
            if (message.Y != null && message.hasOwnProperty("Y"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.Y);
            if (message.Z != null && message.hasOwnProperty("Z"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.Z);
            if (message.Xs != null && message.Xs.length) {
                writer.uint32(/* id 5, wireType 2 =*/42).fork();
                for (var i = 0; i < message.Xs.length; ++i)
                    writer.float(message.Xs[i]);
                writer.ldelim();
            }
            if (message.Ys != null && message.Ys.length) {
                writer.uint32(/* id 6, wireType 2 =*/50).fork();
                for (var i = 0; i < message.Ys.length; ++i)
                    writer.float(message.Ys[i]);
                writer.ldelim();
            }
            if (message.Zs != null && message.Zs.length) {
                writer.uint32(/* id 7, wireType 2 =*/58).fork();
                for (var i = 0; i < message.Zs.length; ++i)
                    writer.float(message.Zs[i]);
                writer.ldelim();
            }
            if (message.ActorId != null && message.hasOwnProperty("ActorId"))
                writer.uint32(/* id 93, wireType 0 =*/744).sint64(message.ActorId);
            return writer;
        };

        /**
         * Encodes the specified M2C_PathfindingResult message, length delimited. Does not implicitly {@link NiceET.M2C_PathfindingResult.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NiceET.M2C_PathfindingResult
         * @static
         * @param {NiceET.IM2C_PathfindingResult} message M2C_PathfindingResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        M2C_PathfindingResult.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a M2C_PathfindingResult message from the specified reader or buffer.
         * @function decode
         * @memberof NiceET.M2C_PathfindingResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NiceET.M2C_PathfindingResult} M2C_PathfindingResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        M2C_PathfindingResult.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NiceET.M2C_PathfindingResult();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 93:
                    message.ActorId = reader.sint64();
                    break;
                case 1:
                    message.Id = reader.sint64();
                    break;
                case 2:
                    message.X = reader.float();
                    break;
                case 3:
                    message.Y = reader.float();
                    break;
                case 4:
                    message.Z = reader.float();
                    break;
                case 5:
                    if (!(message.Xs && message.Xs.length))
                        message.Xs = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.Xs.push(reader.float());
                    } else
                        message.Xs.push(reader.float());
                    break;
                case 6:
                    if (!(message.Ys && message.Ys.length))
                        message.Ys = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.Ys.push(reader.float());
                    } else
                        message.Ys.push(reader.float());
                    break;
                case 7:
                    if (!(message.Zs && message.Zs.length))
                        message.Zs = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.Zs.push(reader.float());
                    } else
                        message.Zs.push(reader.float());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a M2C_PathfindingResult message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NiceET.M2C_PathfindingResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NiceET.M2C_PathfindingResult} M2C_PathfindingResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        M2C_PathfindingResult.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a M2C_PathfindingResult message.
         * @function verify
         * @memberof NiceET.M2C_PathfindingResult
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        M2C_PathfindingResult.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.ActorId != null && message.hasOwnProperty("ActorId"))
                if (!$util.isInteger(message.ActorId) && !(message.ActorId && $util.isInteger(message.ActorId.low) && $util.isInteger(message.ActorId.high)))
                    return "ActorId: integer|Long expected";
            if (message.Id != null && message.hasOwnProperty("Id"))
                if (!$util.isInteger(message.Id) && !(message.Id && $util.isInteger(message.Id.low) && $util.isInteger(message.Id.high)))
                    return "Id: integer|Long expected";
            if (message.X != null && message.hasOwnProperty("X"))
                if (typeof message.X !== "number")
                    return "X: number expected";
            if (message.Y != null && message.hasOwnProperty("Y"))
                if (typeof message.Y !== "number")
                    return "Y: number expected";
            if (message.Z != null && message.hasOwnProperty("Z"))
                if (typeof message.Z !== "number")
                    return "Z: number expected";
            if (message.Xs != null && message.hasOwnProperty("Xs")) {
                if (!Array.isArray(message.Xs))
                    return "Xs: array expected";
                for (var i = 0; i < message.Xs.length; ++i)
                    if (typeof message.Xs[i] !== "number")
                        return "Xs: number[] expected";
            }
            if (message.Ys != null && message.hasOwnProperty("Ys")) {
                if (!Array.isArray(message.Ys))
                    return "Ys: array expected";
                for (var i = 0; i < message.Ys.length; ++i)
                    if (typeof message.Ys[i] !== "number")
                        return "Ys: number[] expected";
            }
            if (message.Zs != null && message.hasOwnProperty("Zs")) {
                if (!Array.isArray(message.Zs))
                    return "Zs: array expected";
                for (var i = 0; i < message.Zs.length; ++i)
                    if (typeof message.Zs[i] !== "number")
                        return "Zs: number[] expected";
            }
            return null;
        };

        /**
         * Creates a M2C_PathfindingResult message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NiceET.M2C_PathfindingResult
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NiceET.M2C_PathfindingResult} M2C_PathfindingResult
         */
        M2C_PathfindingResult.fromObject = function fromObject(object) {
            if (object instanceof $root.NiceET.M2C_PathfindingResult)
                return object;
            var message = new $root.NiceET.M2C_PathfindingResult();
            if (object.ActorId != null)
                if ($util.Long)
                    (message.ActorId = $util.Long.fromValue(object.ActorId)).unsigned = false;
                else if (typeof object.ActorId === "string")
                    message.ActorId = parseInt(object.ActorId, 10);
                else if (typeof object.ActorId === "number")
                    message.ActorId = object.ActorId;
                else if (typeof object.ActorId === "object")
                    message.ActorId = new $util.LongBits(object.ActorId.low >>> 0, object.ActorId.high >>> 0).toNumber();
            if (object.Id != null)
                if ($util.Long)
                    (message.Id = $util.Long.fromValue(object.Id)).unsigned = false;
                else if (typeof object.Id === "string")
                    message.Id = parseInt(object.Id, 10);
                else if (typeof object.Id === "number")
                    message.Id = object.Id;
                else if (typeof object.Id === "object")
                    message.Id = new $util.LongBits(object.Id.low >>> 0, object.Id.high >>> 0).toNumber();
            if (object.X != null)
                message.X = Number(object.X);
            if (object.Y != null)
                message.Y = Number(object.Y);
            if (object.Z != null)
                message.Z = Number(object.Z);
            if (object.Xs) {
                if (!Array.isArray(object.Xs))
                    throw TypeError(".NiceET.M2C_PathfindingResult.Xs: array expected");
                message.Xs = [];
                for (var i = 0; i < object.Xs.length; ++i)
                    message.Xs[i] = Number(object.Xs[i]);
            }
            if (object.Ys) {
                if (!Array.isArray(object.Ys))
                    throw TypeError(".NiceET.M2C_PathfindingResult.Ys: array expected");
                message.Ys = [];
                for (var i = 0; i < object.Ys.length; ++i)
                    message.Ys[i] = Number(object.Ys[i]);
            }
            if (object.Zs) {
                if (!Array.isArray(object.Zs))
                    throw TypeError(".NiceET.M2C_PathfindingResult.Zs: array expected");
                message.Zs = [];
                for (var i = 0; i < object.Zs.length; ++i)
                    message.Zs[i] = Number(object.Zs[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a M2C_PathfindingResult message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NiceET.M2C_PathfindingResult
         * @static
         * @param {NiceET.M2C_PathfindingResult} message M2C_PathfindingResult
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        M2C_PathfindingResult.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.Xs = [];
                object.Ys = [];
                object.Zs = [];
            }
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.Id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.Id = options.longs === String ? "0" : 0;
                object.X = 0;
                object.Y = 0;
                object.Z = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.ActorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.ActorId = options.longs === String ? "0" : 0;
            }
            if (message.Id != null && message.hasOwnProperty("Id"))
                if (typeof message.Id === "number")
                    object.Id = options.longs === String ? String(message.Id) : message.Id;
                else
                    object.Id = options.longs === String ? $util.Long.prototype.toString.call(message.Id) : options.longs === Number ? new $util.LongBits(message.Id.low >>> 0, message.Id.high >>> 0).toNumber() : message.Id;
            if (message.X != null && message.hasOwnProperty("X"))
                object.X = options.json && !isFinite(message.X) ? String(message.X) : message.X;
            if (message.Y != null && message.hasOwnProperty("Y"))
                object.Y = options.json && !isFinite(message.Y) ? String(message.Y) : message.Y;
            if (message.Z != null && message.hasOwnProperty("Z"))
                object.Z = options.json && !isFinite(message.Z) ? String(message.Z) : message.Z;
            if (message.Xs && message.Xs.length) {
                object.Xs = [];
                for (var j = 0; j < message.Xs.length; ++j)
                    object.Xs[j] = options.json && !isFinite(message.Xs[j]) ? String(message.Xs[j]) : message.Xs[j];
            }
            if (message.Ys && message.Ys.length) {
                object.Ys = [];
                for (var j = 0; j < message.Ys.length; ++j)
                    object.Ys[j] = options.json && !isFinite(message.Ys[j]) ? String(message.Ys[j]) : message.Ys[j];
            }
            if (message.Zs && message.Zs.length) {
                object.Zs = [];
                for (var j = 0; j < message.Zs.length; ++j)
                    object.Zs[j] = options.json && !isFinite(message.Zs[j]) ? String(message.Zs[j]) : message.Zs[j];
            }
            if (message.ActorId != null && message.hasOwnProperty("ActorId"))
                if (typeof message.ActorId === "number")
                    object.ActorId = options.longs === String ? String(message.ActorId) : message.ActorId;
                else
                    object.ActorId = options.longs === String ? $util.Long.prototype.toString.call(message.ActorId) : options.longs === Number ? new $util.LongBits(message.ActorId.low >>> 0, message.ActorId.high >>> 0).toNumber() : message.ActorId;
            return object;
        };

        /**
         * Converts this M2C_PathfindingResult to JSON.
         * @function toJSON
         * @memberof NiceET.M2C_PathfindingResult
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        M2C_PathfindingResult.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return M2C_PathfindingResult;
    })();

    NiceET.C2R_Ping = (function() {

        /**
         * Properties of a C2R_Ping.
         * @memberof NiceET
         * @interface IC2R_Ping
         * @property {number|null} [RpcId] C2R_Ping RpcId
         */

        /**
         * Constructs a new C2R_Ping.
         * @memberof NiceET
         * @classdesc Represents a C2R_Ping.
         * @implements IC2R_Ping
         * @constructor
         * @param {NiceET.IC2R_Ping=} [properties] Properties to set
         */
        function C2R_Ping(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2R_Ping RpcId.
         * @member {number} RpcId
         * @memberof NiceET.C2R_Ping
         * @instance
         */
        C2R_Ping.prototype.RpcId = 0;

        /**
         * Creates a new C2R_Ping instance using the specified properties.
         * @function create
         * @memberof NiceET.C2R_Ping
         * @static
         * @param {NiceET.IC2R_Ping=} [properties] Properties to set
         * @returns {NiceET.C2R_Ping} C2R_Ping instance
         */
        C2R_Ping.create = function create(properties) {
            return new C2R_Ping(properties);
        };

        /**
         * Encodes the specified C2R_Ping message. Does not implicitly {@link NiceET.C2R_Ping.verify|verify} messages.
         * @function encode
         * @memberof NiceET.C2R_Ping
         * @static
         * @param {NiceET.IC2R_Ping} message C2R_Ping message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2R_Ping.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                writer.uint32(/* id 90, wireType 0 =*/720).int32(message.RpcId);
            return writer;
        };

        /**
         * Encodes the specified C2R_Ping message, length delimited. Does not implicitly {@link NiceET.C2R_Ping.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NiceET.C2R_Ping
         * @static
         * @param {NiceET.IC2R_Ping} message C2R_Ping message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2R_Ping.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2R_Ping message from the specified reader or buffer.
         * @function decode
         * @memberof NiceET.C2R_Ping
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NiceET.C2R_Ping} C2R_Ping
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2R_Ping.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NiceET.C2R_Ping();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 90:
                    message.RpcId = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2R_Ping message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NiceET.C2R_Ping
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NiceET.C2R_Ping} C2R_Ping
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2R_Ping.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2R_Ping message.
         * @function verify
         * @memberof NiceET.C2R_Ping
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2R_Ping.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                if (!$util.isInteger(message.RpcId))
                    return "RpcId: integer expected";
            return null;
        };

        /**
         * Creates a C2R_Ping message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NiceET.C2R_Ping
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NiceET.C2R_Ping} C2R_Ping
         */
        C2R_Ping.fromObject = function fromObject(object) {
            if (object instanceof $root.NiceET.C2R_Ping)
                return object;
            var message = new $root.NiceET.C2R_Ping();
            if (object.RpcId != null)
                message.RpcId = object.RpcId | 0;
            return message;
        };

        /**
         * Creates a plain object from a C2R_Ping message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NiceET.C2R_Ping
         * @static
         * @param {NiceET.C2R_Ping} message C2R_Ping
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2R_Ping.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.RpcId = 0;
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                object.RpcId = message.RpcId;
            return object;
        };

        /**
         * Converts this C2R_Ping to JSON.
         * @function toJSON
         * @memberof NiceET.C2R_Ping
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2R_Ping.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2R_Ping;
    })();

    NiceET.R2C_Ping = (function() {

        /**
         * Properties of a R2C_Ping.
         * @memberof NiceET
         * @interface IR2C_Ping
         * @property {number|null} [RpcId] R2C_Ping RpcId
         * @property {number|null} [Error] R2C_Ping Error
         * @property {string|null} [Message] R2C_Ping Message
         */

        /**
         * Constructs a new R2C_Ping.
         * @memberof NiceET
         * @classdesc Represents a R2C_Ping.
         * @implements IR2C_Ping
         * @constructor
         * @param {NiceET.IR2C_Ping=} [properties] Properties to set
         */
        function R2C_Ping(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * R2C_Ping RpcId.
         * @member {number} RpcId
         * @memberof NiceET.R2C_Ping
         * @instance
         */
        R2C_Ping.prototype.RpcId = 0;

        /**
         * R2C_Ping Error.
         * @member {number} Error
         * @memberof NiceET.R2C_Ping
         * @instance
         */
        R2C_Ping.prototype.Error = 0;

        /**
         * R2C_Ping Message.
         * @member {string} Message
         * @memberof NiceET.R2C_Ping
         * @instance
         */
        R2C_Ping.prototype.Message = "";

        /**
         * Creates a new R2C_Ping instance using the specified properties.
         * @function create
         * @memberof NiceET.R2C_Ping
         * @static
         * @param {NiceET.IR2C_Ping=} [properties] Properties to set
         * @returns {NiceET.R2C_Ping} R2C_Ping instance
         */
        R2C_Ping.create = function create(properties) {
            return new R2C_Ping(properties);
        };

        /**
         * Encodes the specified R2C_Ping message. Does not implicitly {@link NiceET.R2C_Ping.verify|verify} messages.
         * @function encode
         * @memberof NiceET.R2C_Ping
         * @static
         * @param {NiceET.IR2C_Ping} message R2C_Ping message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        R2C_Ping.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                writer.uint32(/* id 90, wireType 0 =*/720).int32(message.RpcId);
            if (message.Error != null && message.hasOwnProperty("Error"))
                writer.uint32(/* id 91, wireType 0 =*/728).int32(message.Error);
            if (message.Message != null && message.hasOwnProperty("Message"))
                writer.uint32(/* id 92, wireType 2 =*/738).string(message.Message);
            return writer;
        };

        /**
         * Encodes the specified R2C_Ping message, length delimited. Does not implicitly {@link NiceET.R2C_Ping.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NiceET.R2C_Ping
         * @static
         * @param {NiceET.IR2C_Ping} message R2C_Ping message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        R2C_Ping.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a R2C_Ping message from the specified reader or buffer.
         * @function decode
         * @memberof NiceET.R2C_Ping
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NiceET.R2C_Ping} R2C_Ping
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        R2C_Ping.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NiceET.R2C_Ping();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 90:
                    message.RpcId = reader.int32();
                    break;
                case 91:
                    message.Error = reader.int32();
                    break;
                case 92:
                    message.Message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a R2C_Ping message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NiceET.R2C_Ping
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NiceET.R2C_Ping} R2C_Ping
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        R2C_Ping.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a R2C_Ping message.
         * @function verify
         * @memberof NiceET.R2C_Ping
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        R2C_Ping.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                if (!$util.isInteger(message.RpcId))
                    return "RpcId: integer expected";
            if (message.Error != null && message.hasOwnProperty("Error"))
                if (!$util.isInteger(message.Error))
                    return "Error: integer expected";
            if (message.Message != null && message.hasOwnProperty("Message"))
                if (!$util.isString(message.Message))
                    return "Message: string expected";
            return null;
        };

        /**
         * Creates a R2C_Ping message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NiceET.R2C_Ping
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NiceET.R2C_Ping} R2C_Ping
         */
        R2C_Ping.fromObject = function fromObject(object) {
            if (object instanceof $root.NiceET.R2C_Ping)
                return object;
            var message = new $root.NiceET.R2C_Ping();
            if (object.RpcId != null)
                message.RpcId = object.RpcId | 0;
            if (object.Error != null)
                message.Error = object.Error | 0;
            if (object.Message != null)
                message.Message = String(object.Message);
            return message;
        };

        /**
         * Creates a plain object from a R2C_Ping message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NiceET.R2C_Ping
         * @static
         * @param {NiceET.R2C_Ping} message R2C_Ping
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        R2C_Ping.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.RpcId = 0;
                object.Error = 0;
                object.Message = "";
            }
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                object.RpcId = message.RpcId;
            if (message.Error != null && message.hasOwnProperty("Error"))
                object.Error = message.Error;
            if (message.Message != null && message.hasOwnProperty("Message"))
                object.Message = message.Message;
            return object;
        };

        /**
         * Converts this R2C_Ping to JSON.
         * @function toJSON
         * @memberof NiceET.R2C_Ping
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        R2C_Ping.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return R2C_Ping;
    })();

    NiceET.G2C_Test = (function() {

        /**
         * Properties of a G2C_Test.
         * @memberof NiceET
         * @interface IG2C_Test
         */

        /**
         * Constructs a new G2C_Test.
         * @memberof NiceET
         * @classdesc Represents a G2C_Test.
         * @implements IG2C_Test
         * @constructor
         * @param {NiceET.IG2C_Test=} [properties] Properties to set
         */
        function G2C_Test(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new G2C_Test instance using the specified properties.
         * @function create
         * @memberof NiceET.G2C_Test
         * @static
         * @param {NiceET.IG2C_Test=} [properties] Properties to set
         * @returns {NiceET.G2C_Test} G2C_Test instance
         */
        G2C_Test.create = function create(properties) {
            return new G2C_Test(properties);
        };

        /**
         * Encodes the specified G2C_Test message. Does not implicitly {@link NiceET.G2C_Test.verify|verify} messages.
         * @function encode
         * @memberof NiceET.G2C_Test
         * @static
         * @param {NiceET.IG2C_Test} message G2C_Test message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        G2C_Test.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified G2C_Test message, length delimited. Does not implicitly {@link NiceET.G2C_Test.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NiceET.G2C_Test
         * @static
         * @param {NiceET.IG2C_Test} message G2C_Test message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        G2C_Test.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a G2C_Test message from the specified reader or buffer.
         * @function decode
         * @memberof NiceET.G2C_Test
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NiceET.G2C_Test} G2C_Test
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        G2C_Test.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NiceET.G2C_Test();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a G2C_Test message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NiceET.G2C_Test
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NiceET.G2C_Test} G2C_Test
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        G2C_Test.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a G2C_Test message.
         * @function verify
         * @memberof NiceET.G2C_Test
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        G2C_Test.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a G2C_Test message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NiceET.G2C_Test
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NiceET.G2C_Test} G2C_Test
         */
        G2C_Test.fromObject = function fromObject(object) {
            if (object instanceof $root.NiceET.G2C_Test)
                return object;
            return new $root.NiceET.G2C_Test();
        };

        /**
         * Creates a plain object from a G2C_Test message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NiceET.G2C_Test
         * @static
         * @param {NiceET.G2C_Test} message G2C_Test
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        G2C_Test.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this G2C_Test to JSON.
         * @function toJSON
         * @memberof NiceET.G2C_Test
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        G2C_Test.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return G2C_Test;
    })();

    NiceET.C2M_Reload = (function() {

        /**
         * Properties of a C2M_Reload.
         * @memberof NiceET
         * @interface IC2M_Reload
         * @property {number|null} [RpcId] C2M_Reload RpcId
         * @property {string|null} [Account] C2M_Reload Account
         * @property {string|null} [Password] C2M_Reload Password
         */

        /**
         * Constructs a new C2M_Reload.
         * @memberof NiceET
         * @classdesc Represents a C2M_Reload.
         * @implements IC2M_Reload
         * @constructor
         * @param {NiceET.IC2M_Reload=} [properties] Properties to set
         */
        function C2M_Reload(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2M_Reload RpcId.
         * @member {number} RpcId
         * @memberof NiceET.C2M_Reload
         * @instance
         */
        C2M_Reload.prototype.RpcId = 0;

        /**
         * C2M_Reload Account.
         * @member {string} Account
         * @memberof NiceET.C2M_Reload
         * @instance
         */
        C2M_Reload.prototype.Account = "";

        /**
         * C2M_Reload Password.
         * @member {string} Password
         * @memberof NiceET.C2M_Reload
         * @instance
         */
        C2M_Reload.prototype.Password = "";

        /**
         * Creates a new C2M_Reload instance using the specified properties.
         * @function create
         * @memberof NiceET.C2M_Reload
         * @static
         * @param {NiceET.IC2M_Reload=} [properties] Properties to set
         * @returns {NiceET.C2M_Reload} C2M_Reload instance
         */
        C2M_Reload.create = function create(properties) {
            return new C2M_Reload(properties);
        };

        /**
         * Encodes the specified C2M_Reload message. Does not implicitly {@link NiceET.C2M_Reload.verify|verify} messages.
         * @function encode
         * @memberof NiceET.C2M_Reload
         * @static
         * @param {NiceET.IC2M_Reload} message C2M_Reload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2M_Reload.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Account != null && message.hasOwnProperty("Account"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Account);
            if (message.Password != null && message.hasOwnProperty("Password"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.Password);
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                writer.uint32(/* id 90, wireType 0 =*/720).int32(message.RpcId);
            return writer;
        };

        /**
         * Encodes the specified C2M_Reload message, length delimited. Does not implicitly {@link NiceET.C2M_Reload.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NiceET.C2M_Reload
         * @static
         * @param {NiceET.IC2M_Reload} message C2M_Reload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2M_Reload.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2M_Reload message from the specified reader or buffer.
         * @function decode
         * @memberof NiceET.C2M_Reload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NiceET.C2M_Reload} C2M_Reload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2M_Reload.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NiceET.C2M_Reload();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 90:
                    message.RpcId = reader.int32();
                    break;
                case 1:
                    message.Account = reader.string();
                    break;
                case 2:
                    message.Password = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2M_Reload message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NiceET.C2M_Reload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NiceET.C2M_Reload} C2M_Reload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2M_Reload.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2M_Reload message.
         * @function verify
         * @memberof NiceET.C2M_Reload
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2M_Reload.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                if (!$util.isInteger(message.RpcId))
                    return "RpcId: integer expected";
            if (message.Account != null && message.hasOwnProperty("Account"))
                if (!$util.isString(message.Account))
                    return "Account: string expected";
            if (message.Password != null && message.hasOwnProperty("Password"))
                if (!$util.isString(message.Password))
                    return "Password: string expected";
            return null;
        };

        /**
         * Creates a C2M_Reload message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NiceET.C2M_Reload
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NiceET.C2M_Reload} C2M_Reload
         */
        C2M_Reload.fromObject = function fromObject(object) {
            if (object instanceof $root.NiceET.C2M_Reload)
                return object;
            var message = new $root.NiceET.C2M_Reload();
            if (object.RpcId != null)
                message.RpcId = object.RpcId | 0;
            if (object.Account != null)
                message.Account = String(object.Account);
            if (object.Password != null)
                message.Password = String(object.Password);
            return message;
        };

        /**
         * Creates a plain object from a C2M_Reload message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NiceET.C2M_Reload
         * @static
         * @param {NiceET.C2M_Reload} message C2M_Reload
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2M_Reload.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Account = "";
                object.Password = "";
                object.RpcId = 0;
            }
            if (message.Account != null && message.hasOwnProperty("Account"))
                object.Account = message.Account;
            if (message.Password != null && message.hasOwnProperty("Password"))
                object.Password = message.Password;
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                object.RpcId = message.RpcId;
            return object;
        };

        /**
         * Converts this C2M_Reload to JSON.
         * @function toJSON
         * @memberof NiceET.C2M_Reload
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2M_Reload.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2M_Reload;
    })();

    NiceET.M2C_Reload = (function() {

        /**
         * Properties of a M2C_Reload.
         * @memberof NiceET
         * @interface IM2C_Reload
         * @property {number|null} [RpcId] M2C_Reload RpcId
         * @property {number|null} [Error] M2C_Reload Error
         * @property {string|null} [Message] M2C_Reload Message
         */

        /**
         * Constructs a new M2C_Reload.
         * @memberof NiceET
         * @classdesc Represents a M2C_Reload.
         * @implements IM2C_Reload
         * @constructor
         * @param {NiceET.IM2C_Reload=} [properties] Properties to set
         */
        function M2C_Reload(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * M2C_Reload RpcId.
         * @member {number} RpcId
         * @memberof NiceET.M2C_Reload
         * @instance
         */
        M2C_Reload.prototype.RpcId = 0;

        /**
         * M2C_Reload Error.
         * @member {number} Error
         * @memberof NiceET.M2C_Reload
         * @instance
         */
        M2C_Reload.prototype.Error = 0;

        /**
         * M2C_Reload Message.
         * @member {string} Message
         * @memberof NiceET.M2C_Reload
         * @instance
         */
        M2C_Reload.prototype.Message = "";

        /**
         * Creates a new M2C_Reload instance using the specified properties.
         * @function create
         * @memberof NiceET.M2C_Reload
         * @static
         * @param {NiceET.IM2C_Reload=} [properties] Properties to set
         * @returns {NiceET.M2C_Reload} M2C_Reload instance
         */
        M2C_Reload.create = function create(properties) {
            return new M2C_Reload(properties);
        };

        /**
         * Encodes the specified M2C_Reload message. Does not implicitly {@link NiceET.M2C_Reload.verify|verify} messages.
         * @function encode
         * @memberof NiceET.M2C_Reload
         * @static
         * @param {NiceET.IM2C_Reload} message M2C_Reload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        M2C_Reload.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                writer.uint32(/* id 90, wireType 0 =*/720).int32(message.RpcId);
            if (message.Error != null && message.hasOwnProperty("Error"))
                writer.uint32(/* id 91, wireType 0 =*/728).int32(message.Error);
            if (message.Message != null && message.hasOwnProperty("Message"))
                writer.uint32(/* id 92, wireType 2 =*/738).string(message.Message);
            return writer;
        };

        /**
         * Encodes the specified M2C_Reload message, length delimited. Does not implicitly {@link NiceET.M2C_Reload.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NiceET.M2C_Reload
         * @static
         * @param {NiceET.IM2C_Reload} message M2C_Reload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        M2C_Reload.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a M2C_Reload message from the specified reader or buffer.
         * @function decode
         * @memberof NiceET.M2C_Reload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NiceET.M2C_Reload} M2C_Reload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        M2C_Reload.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NiceET.M2C_Reload();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 90:
                    message.RpcId = reader.int32();
                    break;
                case 91:
                    message.Error = reader.int32();
                    break;
                case 92:
                    message.Message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a M2C_Reload message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NiceET.M2C_Reload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NiceET.M2C_Reload} M2C_Reload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        M2C_Reload.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a M2C_Reload message.
         * @function verify
         * @memberof NiceET.M2C_Reload
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        M2C_Reload.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                if (!$util.isInteger(message.RpcId))
                    return "RpcId: integer expected";
            if (message.Error != null && message.hasOwnProperty("Error"))
                if (!$util.isInteger(message.Error))
                    return "Error: integer expected";
            if (message.Message != null && message.hasOwnProperty("Message"))
                if (!$util.isString(message.Message))
                    return "Message: string expected";
            return null;
        };

        /**
         * Creates a M2C_Reload message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NiceET.M2C_Reload
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NiceET.M2C_Reload} M2C_Reload
         */
        M2C_Reload.fromObject = function fromObject(object) {
            if (object instanceof $root.NiceET.M2C_Reload)
                return object;
            var message = new $root.NiceET.M2C_Reload();
            if (object.RpcId != null)
                message.RpcId = object.RpcId | 0;
            if (object.Error != null)
                message.Error = object.Error | 0;
            if (object.Message != null)
                message.Message = String(object.Message);
            return message;
        };

        /**
         * Creates a plain object from a M2C_Reload message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NiceET.M2C_Reload
         * @static
         * @param {NiceET.M2C_Reload} message M2C_Reload
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        M2C_Reload.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.RpcId = 0;
                object.Error = 0;
                object.Message = "";
            }
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                object.RpcId = message.RpcId;
            if (message.Error != null && message.hasOwnProperty("Error"))
                object.Error = message.Error;
            if (message.Message != null && message.hasOwnProperty("Message"))
                object.Message = message.Message;
            return object;
        };

        /**
         * Converts this M2C_Reload to JSON.
         * @function toJSON
         * @memberof NiceET.M2C_Reload
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        M2C_Reload.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return M2C_Reload;
    })();

    NiceET.C2R_Login = (function() {

        /**
         * Properties of a C2R_Login.
         * @memberof NiceET
         * @interface IC2R_Login
         * @property {number|null} [RpcId] C2R_Login RpcId
         * @property {string|null} [Account] C2R_Login Account
         * @property {string|null} [Password] C2R_Login Password
         */

        /**
         * Constructs a new C2R_Login.
         * @memberof NiceET
         * @classdesc Represents a C2R_Login.
         * @implements IC2R_Login
         * @constructor
         * @param {NiceET.IC2R_Login=} [properties] Properties to set
         */
        function C2R_Login(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2R_Login RpcId.
         * @member {number} RpcId
         * @memberof NiceET.C2R_Login
         * @instance
         */
        C2R_Login.prototype.RpcId = 0;

        /**
         * C2R_Login Account.
         * @member {string} Account
         * @memberof NiceET.C2R_Login
         * @instance
         */
        C2R_Login.prototype.Account = "";

        /**
         * C2R_Login Password.
         * @member {string} Password
         * @memberof NiceET.C2R_Login
         * @instance
         */
        C2R_Login.prototype.Password = "";

        /**
         * Creates a new C2R_Login instance using the specified properties.
         * @function create
         * @memberof NiceET.C2R_Login
         * @static
         * @param {NiceET.IC2R_Login=} [properties] Properties to set
         * @returns {NiceET.C2R_Login} C2R_Login instance
         */
        C2R_Login.create = function create(properties) {
            return new C2R_Login(properties);
        };

        /**
         * Encodes the specified C2R_Login message. Does not implicitly {@link NiceET.C2R_Login.verify|verify} messages.
         * @function encode
         * @memberof NiceET.C2R_Login
         * @static
         * @param {NiceET.IC2R_Login} message C2R_Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2R_Login.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Account != null && message.hasOwnProperty("Account"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Account);
            if (message.Password != null && message.hasOwnProperty("Password"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.Password);
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                writer.uint32(/* id 90, wireType 0 =*/720).int32(message.RpcId);
            return writer;
        };

        /**
         * Encodes the specified C2R_Login message, length delimited. Does not implicitly {@link NiceET.C2R_Login.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NiceET.C2R_Login
         * @static
         * @param {NiceET.IC2R_Login} message C2R_Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2R_Login.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2R_Login message from the specified reader or buffer.
         * @function decode
         * @memberof NiceET.C2R_Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NiceET.C2R_Login} C2R_Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2R_Login.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NiceET.C2R_Login();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 90:
                    message.RpcId = reader.int32();
                    break;
                case 1:
                    message.Account = reader.string();
                    break;
                case 2:
                    message.Password = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2R_Login message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NiceET.C2R_Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NiceET.C2R_Login} C2R_Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2R_Login.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2R_Login message.
         * @function verify
         * @memberof NiceET.C2R_Login
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2R_Login.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                if (!$util.isInteger(message.RpcId))
                    return "RpcId: integer expected";
            if (message.Account != null && message.hasOwnProperty("Account"))
                if (!$util.isString(message.Account))
                    return "Account: string expected";
            if (message.Password != null && message.hasOwnProperty("Password"))
                if (!$util.isString(message.Password))
                    return "Password: string expected";
            return null;
        };

        /**
         * Creates a C2R_Login message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NiceET.C2R_Login
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NiceET.C2R_Login} C2R_Login
         */
        C2R_Login.fromObject = function fromObject(object) {
            if (object instanceof $root.NiceET.C2R_Login)
                return object;
            var message = new $root.NiceET.C2R_Login();
            if (object.RpcId != null)
                message.RpcId = object.RpcId | 0;
            if (object.Account != null)
                message.Account = String(object.Account);
            if (object.Password != null)
                message.Password = String(object.Password);
            return message;
        };

        /**
         * Creates a plain object from a C2R_Login message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NiceET.C2R_Login
         * @static
         * @param {NiceET.C2R_Login} message C2R_Login
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2R_Login.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Account = "";
                object.Password = "";
                object.RpcId = 0;
            }
            if (message.Account != null && message.hasOwnProperty("Account"))
                object.Account = message.Account;
            if (message.Password != null && message.hasOwnProperty("Password"))
                object.Password = message.Password;
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                object.RpcId = message.RpcId;
            return object;
        };

        /**
         * Converts this C2R_Login to JSON.
         * @function toJSON
         * @memberof NiceET.C2R_Login
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2R_Login.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2R_Login;
    })();

    NiceET.R2C_Login = (function() {

        /**
         * Properties of a R2C_Login.
         * @memberof NiceET
         * @interface IR2C_Login
         * @property {number|null} [RpcId] R2C_Login RpcId
         * @property {number|null} [Error] R2C_Login Error
         * @property {string|null} [Message] R2C_Login Message
         * @property {string|null} [Address] R2C_Login Address
         * @property {number|Long|null} [Key] R2C_Login Key
         * @property {number|Long|null} [GateId] R2C_Login GateId
         */

        /**
         * Constructs a new R2C_Login.
         * @memberof NiceET
         * @classdesc Represents a R2C_Login.
         * @implements IR2C_Login
         * @constructor
         * @param {NiceET.IR2C_Login=} [properties] Properties to set
         */
        function R2C_Login(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * R2C_Login RpcId.
         * @member {number} RpcId
         * @memberof NiceET.R2C_Login
         * @instance
         */
        R2C_Login.prototype.RpcId = 0;

        /**
         * R2C_Login Error.
         * @member {number} Error
         * @memberof NiceET.R2C_Login
         * @instance
         */
        R2C_Login.prototype.Error = 0;

        /**
         * R2C_Login Message.
         * @member {string} Message
         * @memberof NiceET.R2C_Login
         * @instance
         */
        R2C_Login.prototype.Message = "";

        /**
         * R2C_Login Address.
         * @member {string} Address
         * @memberof NiceET.R2C_Login
         * @instance
         */
        R2C_Login.prototype.Address = "";

        /**
         * R2C_Login Key.
         * @member {number|Long} Key
         * @memberof NiceET.R2C_Login
         * @instance
         */
        R2C_Login.prototype.Key = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * R2C_Login GateId.
         * @member {number|Long} GateId
         * @memberof NiceET.R2C_Login
         * @instance
         */
        R2C_Login.prototype.GateId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new R2C_Login instance using the specified properties.
         * @function create
         * @memberof NiceET.R2C_Login
         * @static
         * @param {NiceET.IR2C_Login=} [properties] Properties to set
         * @returns {NiceET.R2C_Login} R2C_Login instance
         */
        R2C_Login.create = function create(properties) {
            return new R2C_Login(properties);
        };

        /**
         * Encodes the specified R2C_Login message. Does not implicitly {@link NiceET.R2C_Login.verify|verify} messages.
         * @function encode
         * @memberof NiceET.R2C_Login
         * @static
         * @param {NiceET.IR2C_Login} message R2C_Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        R2C_Login.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Address != null && message.hasOwnProperty("Address"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Address);
            if (message.Key != null && message.hasOwnProperty("Key"))
                writer.uint32(/* id 2, wireType 0 =*/16).sint64(message.Key);
            if (message.GateId != null && message.hasOwnProperty("GateId"))
                writer.uint32(/* id 3, wireType 0 =*/24).sint64(message.GateId);
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                writer.uint32(/* id 90, wireType 0 =*/720).int32(message.RpcId);
            if (message.Error != null && message.hasOwnProperty("Error"))
                writer.uint32(/* id 91, wireType 0 =*/728).int32(message.Error);
            if (message.Message != null && message.hasOwnProperty("Message"))
                writer.uint32(/* id 92, wireType 2 =*/738).string(message.Message);
            return writer;
        };

        /**
         * Encodes the specified R2C_Login message, length delimited. Does not implicitly {@link NiceET.R2C_Login.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NiceET.R2C_Login
         * @static
         * @param {NiceET.IR2C_Login} message R2C_Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        R2C_Login.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a R2C_Login message from the specified reader or buffer.
         * @function decode
         * @memberof NiceET.R2C_Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NiceET.R2C_Login} R2C_Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        R2C_Login.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NiceET.R2C_Login();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 90:
                    message.RpcId = reader.int32();
                    break;
                case 91:
                    message.Error = reader.int32();
                    break;
                case 92:
                    message.Message = reader.string();
                    break;
                case 1:
                    message.Address = reader.string();
                    break;
                case 2:
                    message.Key = reader.sint64();
                    break;
                case 3:
                    message.GateId = reader.sint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a R2C_Login message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NiceET.R2C_Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NiceET.R2C_Login} R2C_Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        R2C_Login.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a R2C_Login message.
         * @function verify
         * @memberof NiceET.R2C_Login
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        R2C_Login.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                if (!$util.isInteger(message.RpcId))
                    return "RpcId: integer expected";
            if (message.Error != null && message.hasOwnProperty("Error"))
                if (!$util.isInteger(message.Error))
                    return "Error: integer expected";
            if (message.Message != null && message.hasOwnProperty("Message"))
                if (!$util.isString(message.Message))
                    return "Message: string expected";
            if (message.Address != null && message.hasOwnProperty("Address"))
                if (!$util.isString(message.Address))
                    return "Address: string expected";
            if (message.Key != null && message.hasOwnProperty("Key"))
                if (!$util.isInteger(message.Key) && !(message.Key && $util.isInteger(message.Key.low) && $util.isInteger(message.Key.high)))
                    return "Key: integer|Long expected";
            if (message.GateId != null && message.hasOwnProperty("GateId"))
                if (!$util.isInteger(message.GateId) && !(message.GateId && $util.isInteger(message.GateId.low) && $util.isInteger(message.GateId.high)))
                    return "GateId: integer|Long expected";
            return null;
        };

        /**
         * Creates a R2C_Login message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NiceET.R2C_Login
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NiceET.R2C_Login} R2C_Login
         */
        R2C_Login.fromObject = function fromObject(object) {
            if (object instanceof $root.NiceET.R2C_Login)
                return object;
            var message = new $root.NiceET.R2C_Login();
            if (object.RpcId != null)
                message.RpcId = object.RpcId | 0;
            if (object.Error != null)
                message.Error = object.Error | 0;
            if (object.Message != null)
                message.Message = String(object.Message);
            if (object.Address != null)
                message.Address = String(object.Address);
            if (object.Key != null)
                if ($util.Long)
                    (message.Key = $util.Long.fromValue(object.Key)).unsigned = false;
                else if (typeof object.Key === "string")
                    message.Key = parseInt(object.Key, 10);
                else if (typeof object.Key === "number")
                    message.Key = object.Key;
                else if (typeof object.Key === "object")
                    message.Key = new $util.LongBits(object.Key.low >>> 0, object.Key.high >>> 0).toNumber();
            if (object.GateId != null)
                if ($util.Long)
                    (message.GateId = $util.Long.fromValue(object.GateId)).unsigned = false;
                else if (typeof object.GateId === "string")
                    message.GateId = parseInt(object.GateId, 10);
                else if (typeof object.GateId === "number")
                    message.GateId = object.GateId;
                else if (typeof object.GateId === "object")
                    message.GateId = new $util.LongBits(object.GateId.low >>> 0, object.GateId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a R2C_Login message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NiceET.R2C_Login
         * @static
         * @param {NiceET.R2C_Login} message R2C_Login
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        R2C_Login.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Address = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.Key = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.Key = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.GateId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.GateId = options.longs === String ? "0" : 0;
                object.RpcId = 0;
                object.Error = 0;
                object.Message = "";
            }
            if (message.Address != null && message.hasOwnProperty("Address"))
                object.Address = message.Address;
            if (message.Key != null && message.hasOwnProperty("Key"))
                if (typeof message.Key === "number")
                    object.Key = options.longs === String ? String(message.Key) : message.Key;
                else
                    object.Key = options.longs === String ? $util.Long.prototype.toString.call(message.Key) : options.longs === Number ? new $util.LongBits(message.Key.low >>> 0, message.Key.high >>> 0).toNumber() : message.Key;
            if (message.GateId != null && message.hasOwnProperty("GateId"))
                if (typeof message.GateId === "number")
                    object.GateId = options.longs === String ? String(message.GateId) : message.GateId;
                else
                    object.GateId = options.longs === String ? $util.Long.prototype.toString.call(message.GateId) : options.longs === Number ? new $util.LongBits(message.GateId.low >>> 0, message.GateId.high >>> 0).toNumber() : message.GateId;
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                object.RpcId = message.RpcId;
            if (message.Error != null && message.hasOwnProperty("Error"))
                object.Error = message.Error;
            if (message.Message != null && message.hasOwnProperty("Message"))
                object.Message = message.Message;
            return object;
        };

        /**
         * Converts this R2C_Login to JSON.
         * @function toJSON
         * @memberof NiceET.R2C_Login
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        R2C_Login.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return R2C_Login;
    })();

    NiceET.C2G_LoginGate = (function() {

        /**
         * Properties of a C2G_LoginGate.
         * @memberof NiceET
         * @interface IC2G_LoginGate
         * @property {number|null} [RpcId] C2G_LoginGate RpcId
         * @property {number|Long|null} [Key] C2G_LoginGate Key
         * @property {number|Long|null} [GateId] C2G_LoginGate GateId
         */

        /**
         * Constructs a new C2G_LoginGate.
         * @memberof NiceET
         * @classdesc Represents a C2G_LoginGate.
         * @implements IC2G_LoginGate
         * @constructor
         * @param {NiceET.IC2G_LoginGate=} [properties] Properties to set
         */
        function C2G_LoginGate(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2G_LoginGate RpcId.
         * @member {number} RpcId
         * @memberof NiceET.C2G_LoginGate
         * @instance
         */
        C2G_LoginGate.prototype.RpcId = 0;

        /**
         * C2G_LoginGate Key.
         * @member {number|Long} Key
         * @memberof NiceET.C2G_LoginGate
         * @instance
         */
        C2G_LoginGate.prototype.Key = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * C2G_LoginGate GateId.
         * @member {number|Long} GateId
         * @memberof NiceET.C2G_LoginGate
         * @instance
         */
        C2G_LoginGate.prototype.GateId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new C2G_LoginGate instance using the specified properties.
         * @function create
         * @memberof NiceET.C2G_LoginGate
         * @static
         * @param {NiceET.IC2G_LoginGate=} [properties] Properties to set
         * @returns {NiceET.C2G_LoginGate} C2G_LoginGate instance
         */
        C2G_LoginGate.create = function create(properties) {
            return new C2G_LoginGate(properties);
        };

        /**
         * Encodes the specified C2G_LoginGate message. Does not implicitly {@link NiceET.C2G_LoginGate.verify|verify} messages.
         * @function encode
         * @memberof NiceET.C2G_LoginGate
         * @static
         * @param {NiceET.IC2G_LoginGate} message C2G_LoginGate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2G_LoginGate.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Key != null && message.hasOwnProperty("Key"))
                writer.uint32(/* id 1, wireType 0 =*/8).sint64(message.Key);
            if (message.GateId != null && message.hasOwnProperty("GateId"))
                writer.uint32(/* id 2, wireType 0 =*/16).sint64(message.GateId);
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                writer.uint32(/* id 90, wireType 0 =*/720).int32(message.RpcId);
            return writer;
        };

        /**
         * Encodes the specified C2G_LoginGate message, length delimited. Does not implicitly {@link NiceET.C2G_LoginGate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NiceET.C2G_LoginGate
         * @static
         * @param {NiceET.IC2G_LoginGate} message C2G_LoginGate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2G_LoginGate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2G_LoginGate message from the specified reader or buffer.
         * @function decode
         * @memberof NiceET.C2G_LoginGate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NiceET.C2G_LoginGate} C2G_LoginGate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2G_LoginGate.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NiceET.C2G_LoginGate();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 90:
                    message.RpcId = reader.int32();
                    break;
                case 1:
                    message.Key = reader.sint64();
                    break;
                case 2:
                    message.GateId = reader.sint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2G_LoginGate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NiceET.C2G_LoginGate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NiceET.C2G_LoginGate} C2G_LoginGate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2G_LoginGate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2G_LoginGate message.
         * @function verify
         * @memberof NiceET.C2G_LoginGate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2G_LoginGate.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                if (!$util.isInteger(message.RpcId))
                    return "RpcId: integer expected";
            if (message.Key != null && message.hasOwnProperty("Key"))
                if (!$util.isInteger(message.Key) && !(message.Key && $util.isInteger(message.Key.low) && $util.isInteger(message.Key.high)))
                    return "Key: integer|Long expected";
            if (message.GateId != null && message.hasOwnProperty("GateId"))
                if (!$util.isInteger(message.GateId) && !(message.GateId && $util.isInteger(message.GateId.low) && $util.isInteger(message.GateId.high)))
                    return "GateId: integer|Long expected";
            return null;
        };

        /**
         * Creates a C2G_LoginGate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NiceET.C2G_LoginGate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NiceET.C2G_LoginGate} C2G_LoginGate
         */
        C2G_LoginGate.fromObject = function fromObject(object) {
            if (object instanceof $root.NiceET.C2G_LoginGate)
                return object;
            var message = new $root.NiceET.C2G_LoginGate();
            if (object.RpcId != null)
                message.RpcId = object.RpcId | 0;
            if (object.Key != null)
                if ($util.Long)
                    (message.Key = $util.Long.fromValue(object.Key)).unsigned = false;
                else if (typeof object.Key === "string")
                    message.Key = parseInt(object.Key, 10);
                else if (typeof object.Key === "number")
                    message.Key = object.Key;
                else if (typeof object.Key === "object")
                    message.Key = new $util.LongBits(object.Key.low >>> 0, object.Key.high >>> 0).toNumber();
            if (object.GateId != null)
                if ($util.Long)
                    (message.GateId = $util.Long.fromValue(object.GateId)).unsigned = false;
                else if (typeof object.GateId === "string")
                    message.GateId = parseInt(object.GateId, 10);
                else if (typeof object.GateId === "number")
                    message.GateId = object.GateId;
                else if (typeof object.GateId === "object")
                    message.GateId = new $util.LongBits(object.GateId.low >>> 0, object.GateId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a C2G_LoginGate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NiceET.C2G_LoginGate
         * @static
         * @param {NiceET.C2G_LoginGate} message C2G_LoginGate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2G_LoginGate.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.Key = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.Key = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.GateId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.GateId = options.longs === String ? "0" : 0;
                object.RpcId = 0;
            }
            if (message.Key != null && message.hasOwnProperty("Key"))
                if (typeof message.Key === "number")
                    object.Key = options.longs === String ? String(message.Key) : message.Key;
                else
                    object.Key = options.longs === String ? $util.Long.prototype.toString.call(message.Key) : options.longs === Number ? new $util.LongBits(message.Key.low >>> 0, message.Key.high >>> 0).toNumber() : message.Key;
            if (message.GateId != null && message.hasOwnProperty("GateId"))
                if (typeof message.GateId === "number")
                    object.GateId = options.longs === String ? String(message.GateId) : message.GateId;
                else
                    object.GateId = options.longs === String ? $util.Long.prototype.toString.call(message.GateId) : options.longs === Number ? new $util.LongBits(message.GateId.low >>> 0, message.GateId.high >>> 0).toNumber() : message.GateId;
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                object.RpcId = message.RpcId;
            return object;
        };

        /**
         * Converts this C2G_LoginGate to JSON.
         * @function toJSON
         * @memberof NiceET.C2G_LoginGate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2G_LoginGate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2G_LoginGate;
    })();

    NiceET.G2C_LoginGate = (function() {

        /**
         * Properties of a G2C_LoginGate.
         * @memberof NiceET
         * @interface IG2C_LoginGate
         * @property {number|null} [RpcId] G2C_LoginGate RpcId
         * @property {number|null} [Error] G2C_LoginGate Error
         * @property {string|null} [Message] G2C_LoginGate Message
         * @property {number|Long|null} [PlayerId] G2C_LoginGate PlayerId
         */

        /**
         * Constructs a new G2C_LoginGate.
         * @memberof NiceET
         * @classdesc Represents a G2C_LoginGate.
         * @implements IG2C_LoginGate
         * @constructor
         * @param {NiceET.IG2C_LoginGate=} [properties] Properties to set
         */
        function G2C_LoginGate(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * G2C_LoginGate RpcId.
         * @member {number} RpcId
         * @memberof NiceET.G2C_LoginGate
         * @instance
         */
        G2C_LoginGate.prototype.RpcId = 0;

        /**
         * G2C_LoginGate Error.
         * @member {number} Error
         * @memberof NiceET.G2C_LoginGate
         * @instance
         */
        G2C_LoginGate.prototype.Error = 0;

        /**
         * G2C_LoginGate Message.
         * @member {string} Message
         * @memberof NiceET.G2C_LoginGate
         * @instance
         */
        G2C_LoginGate.prototype.Message = "";

        /**
         * G2C_LoginGate PlayerId.
         * @member {number|Long} PlayerId
         * @memberof NiceET.G2C_LoginGate
         * @instance
         */
        G2C_LoginGate.prototype.PlayerId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new G2C_LoginGate instance using the specified properties.
         * @function create
         * @memberof NiceET.G2C_LoginGate
         * @static
         * @param {NiceET.IG2C_LoginGate=} [properties] Properties to set
         * @returns {NiceET.G2C_LoginGate} G2C_LoginGate instance
         */
        G2C_LoginGate.create = function create(properties) {
            return new G2C_LoginGate(properties);
        };

        /**
         * Encodes the specified G2C_LoginGate message. Does not implicitly {@link NiceET.G2C_LoginGate.verify|verify} messages.
         * @function encode
         * @memberof NiceET.G2C_LoginGate
         * @static
         * @param {NiceET.IG2C_LoginGate} message G2C_LoginGate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        G2C_LoginGate.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.PlayerId != null && message.hasOwnProperty("PlayerId"))
                writer.uint32(/* id 1, wireType 0 =*/8).sint64(message.PlayerId);
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                writer.uint32(/* id 90, wireType 0 =*/720).int32(message.RpcId);
            if (message.Error != null && message.hasOwnProperty("Error"))
                writer.uint32(/* id 91, wireType 0 =*/728).int32(message.Error);
            if (message.Message != null && message.hasOwnProperty("Message"))
                writer.uint32(/* id 92, wireType 2 =*/738).string(message.Message);
            return writer;
        };

        /**
         * Encodes the specified G2C_LoginGate message, length delimited. Does not implicitly {@link NiceET.G2C_LoginGate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NiceET.G2C_LoginGate
         * @static
         * @param {NiceET.IG2C_LoginGate} message G2C_LoginGate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        G2C_LoginGate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a G2C_LoginGate message from the specified reader or buffer.
         * @function decode
         * @memberof NiceET.G2C_LoginGate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NiceET.G2C_LoginGate} G2C_LoginGate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        G2C_LoginGate.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NiceET.G2C_LoginGate();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 90:
                    message.RpcId = reader.int32();
                    break;
                case 91:
                    message.Error = reader.int32();
                    break;
                case 92:
                    message.Message = reader.string();
                    break;
                case 1:
                    message.PlayerId = reader.sint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a G2C_LoginGate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NiceET.G2C_LoginGate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NiceET.G2C_LoginGate} G2C_LoginGate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        G2C_LoginGate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a G2C_LoginGate message.
         * @function verify
         * @memberof NiceET.G2C_LoginGate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        G2C_LoginGate.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                if (!$util.isInteger(message.RpcId))
                    return "RpcId: integer expected";
            if (message.Error != null && message.hasOwnProperty("Error"))
                if (!$util.isInteger(message.Error))
                    return "Error: integer expected";
            if (message.Message != null && message.hasOwnProperty("Message"))
                if (!$util.isString(message.Message))
                    return "Message: string expected";
            if (message.PlayerId != null && message.hasOwnProperty("PlayerId"))
                if (!$util.isInteger(message.PlayerId) && !(message.PlayerId && $util.isInteger(message.PlayerId.low) && $util.isInteger(message.PlayerId.high)))
                    return "PlayerId: integer|Long expected";
            return null;
        };

        /**
         * Creates a G2C_LoginGate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NiceET.G2C_LoginGate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NiceET.G2C_LoginGate} G2C_LoginGate
         */
        G2C_LoginGate.fromObject = function fromObject(object) {
            if (object instanceof $root.NiceET.G2C_LoginGate)
                return object;
            var message = new $root.NiceET.G2C_LoginGate();
            if (object.RpcId != null)
                message.RpcId = object.RpcId | 0;
            if (object.Error != null)
                message.Error = object.Error | 0;
            if (object.Message != null)
                message.Message = String(object.Message);
            if (object.PlayerId != null)
                if ($util.Long)
                    (message.PlayerId = $util.Long.fromValue(object.PlayerId)).unsigned = false;
                else if (typeof object.PlayerId === "string")
                    message.PlayerId = parseInt(object.PlayerId, 10);
                else if (typeof object.PlayerId === "number")
                    message.PlayerId = object.PlayerId;
                else if (typeof object.PlayerId === "object")
                    message.PlayerId = new $util.LongBits(object.PlayerId.low >>> 0, object.PlayerId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a G2C_LoginGate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NiceET.G2C_LoginGate
         * @static
         * @param {NiceET.G2C_LoginGate} message G2C_LoginGate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        G2C_LoginGate.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.PlayerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.PlayerId = options.longs === String ? "0" : 0;
                object.RpcId = 0;
                object.Error = 0;
                object.Message = "";
            }
            if (message.PlayerId != null && message.hasOwnProperty("PlayerId"))
                if (typeof message.PlayerId === "number")
                    object.PlayerId = options.longs === String ? String(message.PlayerId) : message.PlayerId;
                else
                    object.PlayerId = options.longs === String ? $util.Long.prototype.toString.call(message.PlayerId) : options.longs === Number ? new $util.LongBits(message.PlayerId.low >>> 0, message.PlayerId.high >>> 0).toNumber() : message.PlayerId;
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                object.RpcId = message.RpcId;
            if (message.Error != null && message.hasOwnProperty("Error"))
                object.Error = message.Error;
            if (message.Message != null && message.hasOwnProperty("Message"))
                object.Message = message.Message;
            return object;
        };

        /**
         * Converts this G2C_LoginGate to JSON.
         * @function toJSON
         * @memberof NiceET.G2C_LoginGate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        G2C_LoginGate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return G2C_LoginGate;
    })();

    NiceET.G2C_TestHotfixMessage = (function() {

        /**
         * Properties of a G2C_TestHotfixMessage.
         * @memberof NiceET
         * @interface IG2C_TestHotfixMessage
         * @property {string|null} [Info] G2C_TestHotfixMessage Info
         */

        /**
         * Constructs a new G2C_TestHotfixMessage.
         * @memberof NiceET
         * @classdesc Represents a G2C_TestHotfixMessage.
         * @implements IG2C_TestHotfixMessage
         * @constructor
         * @param {NiceET.IG2C_TestHotfixMessage=} [properties] Properties to set
         */
        function G2C_TestHotfixMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * G2C_TestHotfixMessage Info.
         * @member {string} Info
         * @memberof NiceET.G2C_TestHotfixMessage
         * @instance
         */
        G2C_TestHotfixMessage.prototype.Info = "";

        /**
         * Creates a new G2C_TestHotfixMessage instance using the specified properties.
         * @function create
         * @memberof NiceET.G2C_TestHotfixMessage
         * @static
         * @param {NiceET.IG2C_TestHotfixMessage=} [properties] Properties to set
         * @returns {NiceET.G2C_TestHotfixMessage} G2C_TestHotfixMessage instance
         */
        G2C_TestHotfixMessage.create = function create(properties) {
            return new G2C_TestHotfixMessage(properties);
        };

        /**
         * Encodes the specified G2C_TestHotfixMessage message. Does not implicitly {@link NiceET.G2C_TestHotfixMessage.verify|verify} messages.
         * @function encode
         * @memberof NiceET.G2C_TestHotfixMessage
         * @static
         * @param {NiceET.IG2C_TestHotfixMessage} message G2C_TestHotfixMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        G2C_TestHotfixMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Info != null && message.hasOwnProperty("Info"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Info);
            return writer;
        };

        /**
         * Encodes the specified G2C_TestHotfixMessage message, length delimited. Does not implicitly {@link NiceET.G2C_TestHotfixMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NiceET.G2C_TestHotfixMessage
         * @static
         * @param {NiceET.IG2C_TestHotfixMessage} message G2C_TestHotfixMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        G2C_TestHotfixMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a G2C_TestHotfixMessage message from the specified reader or buffer.
         * @function decode
         * @memberof NiceET.G2C_TestHotfixMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NiceET.G2C_TestHotfixMessage} G2C_TestHotfixMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        G2C_TestHotfixMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NiceET.G2C_TestHotfixMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Info = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a G2C_TestHotfixMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NiceET.G2C_TestHotfixMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NiceET.G2C_TestHotfixMessage} G2C_TestHotfixMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        G2C_TestHotfixMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a G2C_TestHotfixMessage message.
         * @function verify
         * @memberof NiceET.G2C_TestHotfixMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        G2C_TestHotfixMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Info != null && message.hasOwnProperty("Info"))
                if (!$util.isString(message.Info))
                    return "Info: string expected";
            return null;
        };

        /**
         * Creates a G2C_TestHotfixMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NiceET.G2C_TestHotfixMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NiceET.G2C_TestHotfixMessage} G2C_TestHotfixMessage
         */
        G2C_TestHotfixMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.NiceET.G2C_TestHotfixMessage)
                return object;
            var message = new $root.NiceET.G2C_TestHotfixMessage();
            if (object.Info != null)
                message.Info = String(object.Info);
            return message;
        };

        /**
         * Creates a plain object from a G2C_TestHotfixMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NiceET.G2C_TestHotfixMessage
         * @static
         * @param {NiceET.G2C_TestHotfixMessage} message G2C_TestHotfixMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        G2C_TestHotfixMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.Info = "";
            if (message.Info != null && message.hasOwnProperty("Info"))
                object.Info = message.Info;
            return object;
        };

        /**
         * Converts this G2C_TestHotfixMessage to JSON.
         * @function toJSON
         * @memberof NiceET.G2C_TestHotfixMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        G2C_TestHotfixMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return G2C_TestHotfixMessage;
    })();

    NiceET.C2M_TestActorRequest = (function() {

        /**
         * Properties of a C2M_TestActorRequest.
         * @memberof NiceET
         * @interface IC2M_TestActorRequest
         * @property {number|null} [RpcId] C2M_TestActorRequest RpcId
         * @property {number|Long|null} [ActorId] C2M_TestActorRequest ActorId
         * @property {string|null} [Info] C2M_TestActorRequest Info
         */

        /**
         * Constructs a new C2M_TestActorRequest.
         * @memberof NiceET
         * @classdesc Represents a C2M_TestActorRequest.
         * @implements IC2M_TestActorRequest
         * @constructor
         * @param {NiceET.IC2M_TestActorRequest=} [properties] Properties to set
         */
        function C2M_TestActorRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2M_TestActorRequest RpcId.
         * @member {number} RpcId
         * @memberof NiceET.C2M_TestActorRequest
         * @instance
         */
        C2M_TestActorRequest.prototype.RpcId = 0;

        /**
         * C2M_TestActorRequest ActorId.
         * @member {number|Long} ActorId
         * @memberof NiceET.C2M_TestActorRequest
         * @instance
         */
        C2M_TestActorRequest.prototype.ActorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * C2M_TestActorRequest Info.
         * @member {string} Info
         * @memberof NiceET.C2M_TestActorRequest
         * @instance
         */
        C2M_TestActorRequest.prototype.Info = "";

        /**
         * Creates a new C2M_TestActorRequest instance using the specified properties.
         * @function create
         * @memberof NiceET.C2M_TestActorRequest
         * @static
         * @param {NiceET.IC2M_TestActorRequest=} [properties] Properties to set
         * @returns {NiceET.C2M_TestActorRequest} C2M_TestActorRequest instance
         */
        C2M_TestActorRequest.create = function create(properties) {
            return new C2M_TestActorRequest(properties);
        };

        /**
         * Encodes the specified C2M_TestActorRequest message. Does not implicitly {@link NiceET.C2M_TestActorRequest.verify|verify} messages.
         * @function encode
         * @memberof NiceET.C2M_TestActorRequest
         * @static
         * @param {NiceET.IC2M_TestActorRequest} message C2M_TestActorRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2M_TestActorRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Info != null && message.hasOwnProperty("Info"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Info);
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                writer.uint32(/* id 90, wireType 0 =*/720).int32(message.RpcId);
            if (message.ActorId != null && message.hasOwnProperty("ActorId"))
                writer.uint32(/* id 91, wireType 0 =*/728).sint64(message.ActorId);
            return writer;
        };

        /**
         * Encodes the specified C2M_TestActorRequest message, length delimited. Does not implicitly {@link NiceET.C2M_TestActorRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NiceET.C2M_TestActorRequest
         * @static
         * @param {NiceET.IC2M_TestActorRequest} message C2M_TestActorRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2M_TestActorRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2M_TestActorRequest message from the specified reader or buffer.
         * @function decode
         * @memberof NiceET.C2M_TestActorRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NiceET.C2M_TestActorRequest} C2M_TestActorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2M_TestActorRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NiceET.C2M_TestActorRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 90:
                    message.RpcId = reader.int32();
                    break;
                case 91:
                    message.ActorId = reader.sint64();
                    break;
                case 1:
                    message.Info = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2M_TestActorRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NiceET.C2M_TestActorRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NiceET.C2M_TestActorRequest} C2M_TestActorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2M_TestActorRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2M_TestActorRequest message.
         * @function verify
         * @memberof NiceET.C2M_TestActorRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2M_TestActorRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                if (!$util.isInteger(message.RpcId))
                    return "RpcId: integer expected";
            if (message.ActorId != null && message.hasOwnProperty("ActorId"))
                if (!$util.isInteger(message.ActorId) && !(message.ActorId && $util.isInteger(message.ActorId.low) && $util.isInteger(message.ActorId.high)))
                    return "ActorId: integer|Long expected";
            if (message.Info != null && message.hasOwnProperty("Info"))
                if (!$util.isString(message.Info))
                    return "Info: string expected";
            return null;
        };

        /**
         * Creates a C2M_TestActorRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NiceET.C2M_TestActorRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NiceET.C2M_TestActorRequest} C2M_TestActorRequest
         */
        C2M_TestActorRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.NiceET.C2M_TestActorRequest)
                return object;
            var message = new $root.NiceET.C2M_TestActorRequest();
            if (object.RpcId != null)
                message.RpcId = object.RpcId | 0;
            if (object.ActorId != null)
                if ($util.Long)
                    (message.ActorId = $util.Long.fromValue(object.ActorId)).unsigned = false;
                else if (typeof object.ActorId === "string")
                    message.ActorId = parseInt(object.ActorId, 10);
                else if (typeof object.ActorId === "number")
                    message.ActorId = object.ActorId;
                else if (typeof object.ActorId === "object")
                    message.ActorId = new $util.LongBits(object.ActorId.low >>> 0, object.ActorId.high >>> 0).toNumber();
            if (object.Info != null)
                message.Info = String(object.Info);
            return message;
        };

        /**
         * Creates a plain object from a C2M_TestActorRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NiceET.C2M_TestActorRequest
         * @static
         * @param {NiceET.C2M_TestActorRequest} message C2M_TestActorRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2M_TestActorRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Info = "";
                object.RpcId = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.ActorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.ActorId = options.longs === String ? "0" : 0;
            }
            if (message.Info != null && message.hasOwnProperty("Info"))
                object.Info = message.Info;
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                object.RpcId = message.RpcId;
            if (message.ActorId != null && message.hasOwnProperty("ActorId"))
                if (typeof message.ActorId === "number")
                    object.ActorId = options.longs === String ? String(message.ActorId) : message.ActorId;
                else
                    object.ActorId = options.longs === String ? $util.Long.prototype.toString.call(message.ActorId) : options.longs === Number ? new $util.LongBits(message.ActorId.low >>> 0, message.ActorId.high >>> 0).toNumber() : message.ActorId;
            return object;
        };

        /**
         * Converts this C2M_TestActorRequest to JSON.
         * @function toJSON
         * @memberof NiceET.C2M_TestActorRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2M_TestActorRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2M_TestActorRequest;
    })();

    NiceET.M2C_TestActorResponse = (function() {

        /**
         * Properties of a M2C_TestActorResponse.
         * @memberof NiceET
         * @interface IM2C_TestActorResponse
         * @property {number|null} [RpcId] M2C_TestActorResponse RpcId
         * @property {number|null} [Error] M2C_TestActorResponse Error
         * @property {string|null} [Message] M2C_TestActorResponse Message
         * @property {string|null} [Info] M2C_TestActorResponse Info
         */

        /**
         * Constructs a new M2C_TestActorResponse.
         * @memberof NiceET
         * @classdesc Represents a M2C_TestActorResponse.
         * @implements IM2C_TestActorResponse
         * @constructor
         * @param {NiceET.IM2C_TestActorResponse=} [properties] Properties to set
         */
        function M2C_TestActorResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * M2C_TestActorResponse RpcId.
         * @member {number} RpcId
         * @memberof NiceET.M2C_TestActorResponse
         * @instance
         */
        M2C_TestActorResponse.prototype.RpcId = 0;

        /**
         * M2C_TestActorResponse Error.
         * @member {number} Error
         * @memberof NiceET.M2C_TestActorResponse
         * @instance
         */
        M2C_TestActorResponse.prototype.Error = 0;

        /**
         * M2C_TestActorResponse Message.
         * @member {string} Message
         * @memberof NiceET.M2C_TestActorResponse
         * @instance
         */
        M2C_TestActorResponse.prototype.Message = "";

        /**
         * M2C_TestActorResponse Info.
         * @member {string} Info
         * @memberof NiceET.M2C_TestActorResponse
         * @instance
         */
        M2C_TestActorResponse.prototype.Info = "";

        /**
         * Creates a new M2C_TestActorResponse instance using the specified properties.
         * @function create
         * @memberof NiceET.M2C_TestActorResponse
         * @static
         * @param {NiceET.IM2C_TestActorResponse=} [properties] Properties to set
         * @returns {NiceET.M2C_TestActorResponse} M2C_TestActorResponse instance
         */
        M2C_TestActorResponse.create = function create(properties) {
            return new M2C_TestActorResponse(properties);
        };

        /**
         * Encodes the specified M2C_TestActorResponse message. Does not implicitly {@link NiceET.M2C_TestActorResponse.verify|verify} messages.
         * @function encode
         * @memberof NiceET.M2C_TestActorResponse
         * @static
         * @param {NiceET.IM2C_TestActorResponse} message M2C_TestActorResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        M2C_TestActorResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Info != null && message.hasOwnProperty("Info"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Info);
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                writer.uint32(/* id 90, wireType 0 =*/720).int32(message.RpcId);
            if (message.Error != null && message.hasOwnProperty("Error"))
                writer.uint32(/* id 91, wireType 0 =*/728).int32(message.Error);
            if (message.Message != null && message.hasOwnProperty("Message"))
                writer.uint32(/* id 92, wireType 2 =*/738).string(message.Message);
            return writer;
        };

        /**
         * Encodes the specified M2C_TestActorResponse message, length delimited. Does not implicitly {@link NiceET.M2C_TestActorResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NiceET.M2C_TestActorResponse
         * @static
         * @param {NiceET.IM2C_TestActorResponse} message M2C_TestActorResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        M2C_TestActorResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a M2C_TestActorResponse message from the specified reader or buffer.
         * @function decode
         * @memberof NiceET.M2C_TestActorResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NiceET.M2C_TestActorResponse} M2C_TestActorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        M2C_TestActorResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NiceET.M2C_TestActorResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 90:
                    message.RpcId = reader.int32();
                    break;
                case 91:
                    message.Error = reader.int32();
                    break;
                case 92:
                    message.Message = reader.string();
                    break;
                case 1:
                    message.Info = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a M2C_TestActorResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NiceET.M2C_TestActorResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NiceET.M2C_TestActorResponse} M2C_TestActorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        M2C_TestActorResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a M2C_TestActorResponse message.
         * @function verify
         * @memberof NiceET.M2C_TestActorResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        M2C_TestActorResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                if (!$util.isInteger(message.RpcId))
                    return "RpcId: integer expected";
            if (message.Error != null && message.hasOwnProperty("Error"))
                if (!$util.isInteger(message.Error))
                    return "Error: integer expected";
            if (message.Message != null && message.hasOwnProperty("Message"))
                if (!$util.isString(message.Message))
                    return "Message: string expected";
            if (message.Info != null && message.hasOwnProperty("Info"))
                if (!$util.isString(message.Info))
                    return "Info: string expected";
            return null;
        };

        /**
         * Creates a M2C_TestActorResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NiceET.M2C_TestActorResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NiceET.M2C_TestActorResponse} M2C_TestActorResponse
         */
        M2C_TestActorResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.NiceET.M2C_TestActorResponse)
                return object;
            var message = new $root.NiceET.M2C_TestActorResponse();
            if (object.RpcId != null)
                message.RpcId = object.RpcId | 0;
            if (object.Error != null)
                message.Error = object.Error | 0;
            if (object.Message != null)
                message.Message = String(object.Message);
            if (object.Info != null)
                message.Info = String(object.Info);
            return message;
        };

        /**
         * Creates a plain object from a M2C_TestActorResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NiceET.M2C_TestActorResponse
         * @static
         * @param {NiceET.M2C_TestActorResponse} message M2C_TestActorResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        M2C_TestActorResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Info = "";
                object.RpcId = 0;
                object.Error = 0;
                object.Message = "";
            }
            if (message.Info != null && message.hasOwnProperty("Info"))
                object.Info = message.Info;
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                object.RpcId = message.RpcId;
            if (message.Error != null && message.hasOwnProperty("Error"))
                object.Error = message.Error;
            if (message.Message != null && message.hasOwnProperty("Message"))
                object.Message = message.Message;
            return object;
        };

        /**
         * Converts this M2C_TestActorResponse to JSON.
         * @function toJSON
         * @memberof NiceET.M2C_TestActorResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        M2C_TestActorResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return M2C_TestActorResponse;
    })();

    NiceET.PlayerInfo = (function() {

        /**
         * Properties of a PlayerInfo.
         * @memberof NiceET
         * @interface IPlayerInfo
         * @property {number|null} [RpcId] PlayerInfo RpcId
         */

        /**
         * Constructs a new PlayerInfo.
         * @memberof NiceET
         * @classdesc Represents a PlayerInfo.
         * @implements IPlayerInfo
         * @constructor
         * @param {NiceET.IPlayerInfo=} [properties] Properties to set
         */
        function PlayerInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerInfo RpcId.
         * @member {number} RpcId
         * @memberof NiceET.PlayerInfo
         * @instance
         */
        PlayerInfo.prototype.RpcId = 0;

        /**
         * Creates a new PlayerInfo instance using the specified properties.
         * @function create
         * @memberof NiceET.PlayerInfo
         * @static
         * @param {NiceET.IPlayerInfo=} [properties] Properties to set
         * @returns {NiceET.PlayerInfo} PlayerInfo instance
         */
        PlayerInfo.create = function create(properties) {
            return new PlayerInfo(properties);
        };

        /**
         * Encodes the specified PlayerInfo message. Does not implicitly {@link NiceET.PlayerInfo.verify|verify} messages.
         * @function encode
         * @memberof NiceET.PlayerInfo
         * @static
         * @param {NiceET.IPlayerInfo} message PlayerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                writer.uint32(/* id 90, wireType 0 =*/720).int32(message.RpcId);
            return writer;
        };

        /**
         * Encodes the specified PlayerInfo message, length delimited. Does not implicitly {@link NiceET.PlayerInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NiceET.PlayerInfo
         * @static
         * @param {NiceET.IPlayerInfo} message PlayerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerInfo message from the specified reader or buffer.
         * @function decode
         * @memberof NiceET.PlayerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NiceET.PlayerInfo} PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NiceET.PlayerInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 90:
                    message.RpcId = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NiceET.PlayerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NiceET.PlayerInfo} PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerInfo message.
         * @function verify
         * @memberof NiceET.PlayerInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                if (!$util.isInteger(message.RpcId))
                    return "RpcId: integer expected";
            return null;
        };

        /**
         * Creates a PlayerInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NiceET.PlayerInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NiceET.PlayerInfo} PlayerInfo
         */
        PlayerInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.NiceET.PlayerInfo)
                return object;
            var message = new $root.NiceET.PlayerInfo();
            if (object.RpcId != null)
                message.RpcId = object.RpcId | 0;
            return message;
        };

        /**
         * Creates a plain object from a PlayerInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NiceET.PlayerInfo
         * @static
         * @param {NiceET.PlayerInfo} message PlayerInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.RpcId = 0;
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                object.RpcId = message.RpcId;
            return object;
        };

        /**
         * Converts this PlayerInfo to JSON.
         * @function toJSON
         * @memberof NiceET.PlayerInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PlayerInfo;
    })();

    NiceET.C2G_PlayerInfo = (function() {

        /**
         * Properties of a C2G_PlayerInfo.
         * @memberof NiceET
         * @interface IC2G_PlayerInfo
         * @property {number|null} [RpcId] C2G_PlayerInfo RpcId
         */

        /**
         * Constructs a new C2G_PlayerInfo.
         * @memberof NiceET
         * @classdesc Represents a C2G_PlayerInfo.
         * @implements IC2G_PlayerInfo
         * @constructor
         * @param {NiceET.IC2G_PlayerInfo=} [properties] Properties to set
         */
        function C2G_PlayerInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2G_PlayerInfo RpcId.
         * @member {number} RpcId
         * @memberof NiceET.C2G_PlayerInfo
         * @instance
         */
        C2G_PlayerInfo.prototype.RpcId = 0;

        /**
         * Creates a new C2G_PlayerInfo instance using the specified properties.
         * @function create
         * @memberof NiceET.C2G_PlayerInfo
         * @static
         * @param {NiceET.IC2G_PlayerInfo=} [properties] Properties to set
         * @returns {NiceET.C2G_PlayerInfo} C2G_PlayerInfo instance
         */
        C2G_PlayerInfo.create = function create(properties) {
            return new C2G_PlayerInfo(properties);
        };

        /**
         * Encodes the specified C2G_PlayerInfo message. Does not implicitly {@link NiceET.C2G_PlayerInfo.verify|verify} messages.
         * @function encode
         * @memberof NiceET.C2G_PlayerInfo
         * @static
         * @param {NiceET.IC2G_PlayerInfo} message C2G_PlayerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2G_PlayerInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                writer.uint32(/* id 90, wireType 0 =*/720).int32(message.RpcId);
            return writer;
        };

        /**
         * Encodes the specified C2G_PlayerInfo message, length delimited. Does not implicitly {@link NiceET.C2G_PlayerInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NiceET.C2G_PlayerInfo
         * @static
         * @param {NiceET.IC2G_PlayerInfo} message C2G_PlayerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2G_PlayerInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2G_PlayerInfo message from the specified reader or buffer.
         * @function decode
         * @memberof NiceET.C2G_PlayerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NiceET.C2G_PlayerInfo} C2G_PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2G_PlayerInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NiceET.C2G_PlayerInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 90:
                    message.RpcId = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2G_PlayerInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NiceET.C2G_PlayerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NiceET.C2G_PlayerInfo} C2G_PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2G_PlayerInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2G_PlayerInfo message.
         * @function verify
         * @memberof NiceET.C2G_PlayerInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2G_PlayerInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                if (!$util.isInteger(message.RpcId))
                    return "RpcId: integer expected";
            return null;
        };

        /**
         * Creates a C2G_PlayerInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NiceET.C2G_PlayerInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NiceET.C2G_PlayerInfo} C2G_PlayerInfo
         */
        C2G_PlayerInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.NiceET.C2G_PlayerInfo)
                return object;
            var message = new $root.NiceET.C2G_PlayerInfo();
            if (object.RpcId != null)
                message.RpcId = object.RpcId | 0;
            return message;
        };

        /**
         * Creates a plain object from a C2G_PlayerInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NiceET.C2G_PlayerInfo
         * @static
         * @param {NiceET.C2G_PlayerInfo} message C2G_PlayerInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2G_PlayerInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.RpcId = 0;
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                object.RpcId = message.RpcId;
            return object;
        };

        /**
         * Converts this C2G_PlayerInfo to JSON.
         * @function toJSON
         * @memberof NiceET.C2G_PlayerInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2G_PlayerInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2G_PlayerInfo;
    })();

    NiceET.G2C_PlayerInfo = (function() {

        /**
         * Properties of a G2C_PlayerInfo.
         * @memberof NiceET
         * @interface IG2C_PlayerInfo
         * @property {number|null} [RpcId] G2C_PlayerInfo RpcId
         * @property {number|null} [Error] G2C_PlayerInfo Error
         * @property {string|null} [Message] G2C_PlayerInfo Message
         * @property {NiceET.IPlayerInfo|null} [PlayerInfo] G2C_PlayerInfo PlayerInfo
         * @property {Array.<NiceET.IPlayerInfo>|null} [PlayerInfos] G2C_PlayerInfo PlayerInfos
         * @property {Array.<string>|null} [TestRepeatedString] G2C_PlayerInfo TestRepeatedString
         * @property {Array.<number>|null} [TestRepeatedInt32] G2C_PlayerInfo TestRepeatedInt32
         * @property {Array.<number|Long>|null} [TestRepeatedInt64] G2C_PlayerInfo TestRepeatedInt64
         */

        /**
         * Constructs a new G2C_PlayerInfo.
         * @memberof NiceET
         * @classdesc Represents a G2C_PlayerInfo.
         * @implements IG2C_PlayerInfo
         * @constructor
         * @param {NiceET.IG2C_PlayerInfo=} [properties] Properties to set
         */
        function G2C_PlayerInfo(properties) {
            this.PlayerInfos = [];
            this.TestRepeatedString = [];
            this.TestRepeatedInt32 = [];
            this.TestRepeatedInt64 = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * G2C_PlayerInfo RpcId.
         * @member {number} RpcId
         * @memberof NiceET.G2C_PlayerInfo
         * @instance
         */
        G2C_PlayerInfo.prototype.RpcId = 0;

        /**
         * G2C_PlayerInfo Error.
         * @member {number} Error
         * @memberof NiceET.G2C_PlayerInfo
         * @instance
         */
        G2C_PlayerInfo.prototype.Error = 0;

        /**
         * G2C_PlayerInfo Message.
         * @member {string} Message
         * @memberof NiceET.G2C_PlayerInfo
         * @instance
         */
        G2C_PlayerInfo.prototype.Message = "";

        /**
         * G2C_PlayerInfo PlayerInfo.
         * @member {NiceET.IPlayerInfo|null|undefined} PlayerInfo
         * @memberof NiceET.G2C_PlayerInfo
         * @instance
         */
        G2C_PlayerInfo.prototype.PlayerInfo = null;

        /**
         * G2C_PlayerInfo PlayerInfos.
         * @member {Array.<NiceET.IPlayerInfo>} PlayerInfos
         * @memberof NiceET.G2C_PlayerInfo
         * @instance
         */
        G2C_PlayerInfo.prototype.PlayerInfos = $util.emptyArray;

        /**
         * G2C_PlayerInfo TestRepeatedString.
         * @member {Array.<string>} TestRepeatedString
         * @memberof NiceET.G2C_PlayerInfo
         * @instance
         */
        G2C_PlayerInfo.prototype.TestRepeatedString = $util.emptyArray;

        /**
         * G2C_PlayerInfo TestRepeatedInt32.
         * @member {Array.<number>} TestRepeatedInt32
         * @memberof NiceET.G2C_PlayerInfo
         * @instance
         */
        G2C_PlayerInfo.prototype.TestRepeatedInt32 = $util.emptyArray;

        /**
         * G2C_PlayerInfo TestRepeatedInt64.
         * @member {Array.<number|Long>} TestRepeatedInt64
         * @memberof NiceET.G2C_PlayerInfo
         * @instance
         */
        G2C_PlayerInfo.prototype.TestRepeatedInt64 = $util.emptyArray;

        /**
         * Creates a new G2C_PlayerInfo instance using the specified properties.
         * @function create
         * @memberof NiceET.G2C_PlayerInfo
         * @static
         * @param {NiceET.IG2C_PlayerInfo=} [properties] Properties to set
         * @returns {NiceET.G2C_PlayerInfo} G2C_PlayerInfo instance
         */
        G2C_PlayerInfo.create = function create(properties) {
            return new G2C_PlayerInfo(properties);
        };

        /**
         * Encodes the specified G2C_PlayerInfo message. Does not implicitly {@link NiceET.G2C_PlayerInfo.verify|verify} messages.
         * @function encode
         * @memberof NiceET.G2C_PlayerInfo
         * @static
         * @param {NiceET.IG2C_PlayerInfo} message G2C_PlayerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        G2C_PlayerInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.PlayerInfo != null && message.hasOwnProperty("PlayerInfo"))
                $root.NiceET.PlayerInfo.encode(message.PlayerInfo, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.PlayerInfos != null && message.PlayerInfos.length)
                for (var i = 0; i < message.PlayerInfos.length; ++i)
                    $root.NiceET.PlayerInfo.encode(message.PlayerInfos[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.TestRepeatedString != null && message.TestRepeatedString.length)
                for (var i = 0; i < message.TestRepeatedString.length; ++i)
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.TestRepeatedString[i]);
            if (message.TestRepeatedInt32 != null && message.TestRepeatedInt32.length) {
                writer.uint32(/* id 4, wireType 2 =*/34).fork();
                for (var i = 0; i < message.TestRepeatedInt32.length; ++i)
                    writer.int32(message.TestRepeatedInt32[i]);
                writer.ldelim();
            }
            if (message.TestRepeatedInt64 != null && message.TestRepeatedInt64.length) {
                writer.uint32(/* id 5, wireType 2 =*/42).fork();
                for (var i = 0; i < message.TestRepeatedInt64.length; ++i)
                    writer.sint64(message.TestRepeatedInt64[i]);
                writer.ldelim();
            }
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                writer.uint32(/* id 90, wireType 0 =*/720).int32(message.RpcId);
            if (message.Error != null && message.hasOwnProperty("Error"))
                writer.uint32(/* id 91, wireType 0 =*/728).int32(message.Error);
            if (message.Message != null && message.hasOwnProperty("Message"))
                writer.uint32(/* id 92, wireType 2 =*/738).string(message.Message);
            return writer;
        };

        /**
         * Encodes the specified G2C_PlayerInfo message, length delimited. Does not implicitly {@link NiceET.G2C_PlayerInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NiceET.G2C_PlayerInfo
         * @static
         * @param {NiceET.IG2C_PlayerInfo} message G2C_PlayerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        G2C_PlayerInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a G2C_PlayerInfo message from the specified reader or buffer.
         * @function decode
         * @memberof NiceET.G2C_PlayerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NiceET.G2C_PlayerInfo} G2C_PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        G2C_PlayerInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NiceET.G2C_PlayerInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 90:
                    message.RpcId = reader.int32();
                    break;
                case 91:
                    message.Error = reader.int32();
                    break;
                case 92:
                    message.Message = reader.string();
                    break;
                case 1:
                    message.PlayerInfo = $root.NiceET.PlayerInfo.decode(reader, reader.uint32());
                    break;
                case 2:
                    if (!(message.PlayerInfos && message.PlayerInfos.length))
                        message.PlayerInfos = [];
                    message.PlayerInfos.push($root.NiceET.PlayerInfo.decode(reader, reader.uint32()));
                    break;
                case 3:
                    if (!(message.TestRepeatedString && message.TestRepeatedString.length))
                        message.TestRepeatedString = [];
                    message.TestRepeatedString.push(reader.string());
                    break;
                case 4:
                    if (!(message.TestRepeatedInt32 && message.TestRepeatedInt32.length))
                        message.TestRepeatedInt32 = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.TestRepeatedInt32.push(reader.int32());
                    } else
                        message.TestRepeatedInt32.push(reader.int32());
                    break;
                case 5:
                    if (!(message.TestRepeatedInt64 && message.TestRepeatedInt64.length))
                        message.TestRepeatedInt64 = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.TestRepeatedInt64.push(reader.sint64());
                    } else
                        message.TestRepeatedInt64.push(reader.sint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a G2C_PlayerInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NiceET.G2C_PlayerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NiceET.G2C_PlayerInfo} G2C_PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        G2C_PlayerInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a G2C_PlayerInfo message.
         * @function verify
         * @memberof NiceET.G2C_PlayerInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        G2C_PlayerInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                if (!$util.isInteger(message.RpcId))
                    return "RpcId: integer expected";
            if (message.Error != null && message.hasOwnProperty("Error"))
                if (!$util.isInteger(message.Error))
                    return "Error: integer expected";
            if (message.Message != null && message.hasOwnProperty("Message"))
                if (!$util.isString(message.Message))
                    return "Message: string expected";
            if (message.PlayerInfo != null && message.hasOwnProperty("PlayerInfo")) {
                var error = $root.NiceET.PlayerInfo.verify(message.PlayerInfo);
                if (error)
                    return "PlayerInfo." + error;
            }
            if (message.PlayerInfos != null && message.hasOwnProperty("PlayerInfos")) {
                if (!Array.isArray(message.PlayerInfos))
                    return "PlayerInfos: array expected";
                for (var i = 0; i < message.PlayerInfos.length; ++i) {
                    var error = $root.NiceET.PlayerInfo.verify(message.PlayerInfos[i]);
                    if (error)
                        return "PlayerInfos." + error;
                }
            }
            if (message.TestRepeatedString != null && message.hasOwnProperty("TestRepeatedString")) {
                if (!Array.isArray(message.TestRepeatedString))
                    return "TestRepeatedString: array expected";
                for (var i = 0; i < message.TestRepeatedString.length; ++i)
                    if (!$util.isString(message.TestRepeatedString[i]))
                        return "TestRepeatedString: string[] expected";
            }
            if (message.TestRepeatedInt32 != null && message.hasOwnProperty("TestRepeatedInt32")) {
                if (!Array.isArray(message.TestRepeatedInt32))
                    return "TestRepeatedInt32: array expected";
                for (var i = 0; i < message.TestRepeatedInt32.length; ++i)
                    if (!$util.isInteger(message.TestRepeatedInt32[i]))
                        return "TestRepeatedInt32: integer[] expected";
            }
            if (message.TestRepeatedInt64 != null && message.hasOwnProperty("TestRepeatedInt64")) {
                if (!Array.isArray(message.TestRepeatedInt64))
                    return "TestRepeatedInt64: array expected";
                for (var i = 0; i < message.TestRepeatedInt64.length; ++i)
                    if (!$util.isInteger(message.TestRepeatedInt64[i]) && !(message.TestRepeatedInt64[i] && $util.isInteger(message.TestRepeatedInt64[i].low) && $util.isInteger(message.TestRepeatedInt64[i].high)))
                        return "TestRepeatedInt64: integer|Long[] expected";
            }
            return null;
        };

        /**
         * Creates a G2C_PlayerInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NiceET.G2C_PlayerInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NiceET.G2C_PlayerInfo} G2C_PlayerInfo
         */
        G2C_PlayerInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.NiceET.G2C_PlayerInfo)
                return object;
            var message = new $root.NiceET.G2C_PlayerInfo();
            if (object.RpcId != null)
                message.RpcId = object.RpcId | 0;
            if (object.Error != null)
                message.Error = object.Error | 0;
            if (object.Message != null)
                message.Message = String(object.Message);
            if (object.PlayerInfo != null) {
                if (typeof object.PlayerInfo !== "object")
                    throw TypeError(".NiceET.G2C_PlayerInfo.PlayerInfo: object expected");
                message.PlayerInfo = $root.NiceET.PlayerInfo.fromObject(object.PlayerInfo);
            }
            if (object.PlayerInfos) {
                if (!Array.isArray(object.PlayerInfos))
                    throw TypeError(".NiceET.G2C_PlayerInfo.PlayerInfos: array expected");
                message.PlayerInfos = [];
                for (var i = 0; i < object.PlayerInfos.length; ++i) {
                    if (typeof object.PlayerInfos[i] !== "object")
                        throw TypeError(".NiceET.G2C_PlayerInfo.PlayerInfos: object expected");
                    message.PlayerInfos[i] = $root.NiceET.PlayerInfo.fromObject(object.PlayerInfos[i]);
                }
            }
            if (object.TestRepeatedString) {
                if (!Array.isArray(object.TestRepeatedString))
                    throw TypeError(".NiceET.G2C_PlayerInfo.TestRepeatedString: array expected");
                message.TestRepeatedString = [];
                for (var i = 0; i < object.TestRepeatedString.length; ++i)
                    message.TestRepeatedString[i] = String(object.TestRepeatedString[i]);
            }
            if (object.TestRepeatedInt32) {
                if (!Array.isArray(object.TestRepeatedInt32))
                    throw TypeError(".NiceET.G2C_PlayerInfo.TestRepeatedInt32: array expected");
                message.TestRepeatedInt32 = [];
                for (var i = 0; i < object.TestRepeatedInt32.length; ++i)
                    message.TestRepeatedInt32[i] = object.TestRepeatedInt32[i] | 0;
            }
            if (object.TestRepeatedInt64) {
                if (!Array.isArray(object.TestRepeatedInt64))
                    throw TypeError(".NiceET.G2C_PlayerInfo.TestRepeatedInt64: array expected");
                message.TestRepeatedInt64 = [];
                for (var i = 0; i < object.TestRepeatedInt64.length; ++i)
                    if ($util.Long)
                        (message.TestRepeatedInt64[i] = $util.Long.fromValue(object.TestRepeatedInt64[i])).unsigned = false;
                    else if (typeof object.TestRepeatedInt64[i] === "string")
                        message.TestRepeatedInt64[i] = parseInt(object.TestRepeatedInt64[i], 10);
                    else if (typeof object.TestRepeatedInt64[i] === "number")
                        message.TestRepeatedInt64[i] = object.TestRepeatedInt64[i];
                    else if (typeof object.TestRepeatedInt64[i] === "object")
                        message.TestRepeatedInt64[i] = new $util.LongBits(object.TestRepeatedInt64[i].low >>> 0, object.TestRepeatedInt64[i].high >>> 0).toNumber();
            }
            return message;
        };

        /**
         * Creates a plain object from a G2C_PlayerInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NiceET.G2C_PlayerInfo
         * @static
         * @param {NiceET.G2C_PlayerInfo} message G2C_PlayerInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        G2C_PlayerInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.PlayerInfos = [];
                object.TestRepeatedString = [];
                object.TestRepeatedInt32 = [];
                object.TestRepeatedInt64 = [];
            }
            if (options.defaults) {
                object.PlayerInfo = null;
                object.RpcId = 0;
                object.Error = 0;
                object.Message = "";
            }
            if (message.PlayerInfo != null && message.hasOwnProperty("PlayerInfo"))
                object.PlayerInfo = $root.NiceET.PlayerInfo.toObject(message.PlayerInfo, options);
            if (message.PlayerInfos && message.PlayerInfos.length) {
                object.PlayerInfos = [];
                for (var j = 0; j < message.PlayerInfos.length; ++j)
                    object.PlayerInfos[j] = $root.NiceET.PlayerInfo.toObject(message.PlayerInfos[j], options);
            }
            if (message.TestRepeatedString && message.TestRepeatedString.length) {
                object.TestRepeatedString = [];
                for (var j = 0; j < message.TestRepeatedString.length; ++j)
                    object.TestRepeatedString[j] = message.TestRepeatedString[j];
            }
            if (message.TestRepeatedInt32 && message.TestRepeatedInt32.length) {
                object.TestRepeatedInt32 = [];
                for (var j = 0; j < message.TestRepeatedInt32.length; ++j)
                    object.TestRepeatedInt32[j] = message.TestRepeatedInt32[j];
            }
            if (message.TestRepeatedInt64 && message.TestRepeatedInt64.length) {
                object.TestRepeatedInt64 = [];
                for (var j = 0; j < message.TestRepeatedInt64.length; ++j)
                    if (typeof message.TestRepeatedInt64[j] === "number")
                        object.TestRepeatedInt64[j] = options.longs === String ? String(message.TestRepeatedInt64[j]) : message.TestRepeatedInt64[j];
                    else
                        object.TestRepeatedInt64[j] = options.longs === String ? $util.Long.prototype.toString.call(message.TestRepeatedInt64[j]) : options.longs === Number ? new $util.LongBits(message.TestRepeatedInt64[j].low >>> 0, message.TestRepeatedInt64[j].high >>> 0).toNumber() : message.TestRepeatedInt64[j];
            }
            if (message.RpcId != null && message.hasOwnProperty("RpcId"))
                object.RpcId = message.RpcId;
            if (message.Error != null && message.hasOwnProperty("Error"))
                object.Error = message.Error;
            if (message.Message != null && message.hasOwnProperty("Message"))
                object.Message = message.Message;
            return object;
        };

        /**
         * Converts this G2C_PlayerInfo to JSON.
         * @function toJSON
         * @memberof NiceET.G2C_PlayerInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        G2C_PlayerInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return G2C_PlayerInfo;
    })();

    return NiceET;
})();

module.exports = $root;


/***/ }),

/***/ "./src/data/ui/common.ts":
/*!*******************************!*\
  !*** ./src/data/ui/common.ts ***!
  \*******************************/
/*! exports provided: commonUI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commonUI", function() { return commonUI; });
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class commonUI {
}
commonUI.PackageName = "common";
commonUI.UILoadingPage = "LoadingPage";
commonUI.UIUINoticeWin = "UINoticeWin";


/***/ }),

/***/ "./src/data/ui/home.ts":
/*!*****************************!*\
  !*** ./src/data/ui/home.ts ***!
  \*****************************/
/*! exports provided: homeUI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "homeUI", function() { return homeUI; });
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class homeUI {
}
homeUI.PackageName = "home";
homeUI.UIHomePage = "HomePage";


/***/ }),

/***/ "./src/data/ui/login.ts":
/*!******************************!*\
  !*** ./src/data/ui/login.ts ***!
  \******************************/
/*! exports provided: loginUI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginUI", function() { return loginUI; });
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class loginUI {
}
loginUI.PackageName = "login";
loginUI.UILoginPage = "LoginPage";
loginUI.UISelServerWin = "SelServerWin";
loginUI.UILevelPage = "LevelPage";
loginUI.UIShopPage = "ShopPage";
loginUI.UIAreaItem = "AreaItem";


/***/ }),

/***/ "./src/framework/common/GameObjectPool.ts":
/*!************************************************!*\
  !*** ./src/framework/common/GameObjectPool.ts ***!
  \************************************************/
/*! exports provided: GameObjectPool */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameObjectPool", function() { return GameObjectPool; });
/* harmony import */ var _Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _ResManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResManager */ "./src/framework/common/ResManager.ts");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_2__);



// -- GameObject缓存池
// -- 注意：
// -- 1、所有需要预设都从这里加载，不要直接到ResourcesManager去加载，由这里统一做缓存管理
// -- 2、缓存分为两部分：从资源层加载的原始GameObject(Asset)，从GameObject实例化出来的多个Inst
class GameObjectPool extends _Singleton__WEBPACK_IMPORTED_MODULE_0__["Singleton"] {
    constructor() {
        super();
        this.__cacheTransRoot = null;
        this.__goPool = new Map();
        this.__instCache = new Map();
        let go = csharp__WEBPACK_IMPORTED_MODULE_2__["UnityEngine"].GameObject.Find("GameObjectCacheRoot");
        if (go == undefined) {
            go = new csharp__WEBPACK_IMPORTED_MODULE_2__["UnityEngine"].GameObject("GameObjectCacheRoot");
            csharp__WEBPACK_IMPORTED_MODULE_2__["UnityEngine"].Object.DontDestroyOnLoad(go);
        }
        this.__cacheTransRoot = go.transform;
    }
    //-- 检测是否已经被缓存
    checkHasCached(path) {
        let cachedInst = this.__instCache.get(path);
        if (cachedInst != undefined && cachedInst.length > 0) {
            return true;
        }
        let pooledGo = this.__goPool.get(path);
        return pooledGo != undefined;
    }
    //-- 缓存并实例化GameObject
    cacheAndInstGameObject(path, go, inst_count = 1) {
        this.__goPool.set(path, go);
        if (inst_count > 0) {
            let cachedInst = this.__instCache.get(path);
            for (let i = 0; i < inst_count; i++) {
                let inst = csharp__WEBPACK_IMPORTED_MODULE_2__["UnityEngine"].GameObject.Instantiate(go);
                inst.transform.SetParent(this.__cacheTransRoot);
                inst.SetActive(false);
                cachedInst.push(inst);
            }
        }
    }
    //-- 尝试从缓存中获取
    tryGetFromCache(path) {
        if (!this.checkHasCached(path)) {
            return null;
        }
        let cachedInst = this.__instCache.get(path);
        if (cachedInst != undefined && cachedInst.length > 0) {
            let inst = cachedInst.pop();
            return inst;
        }
        let pooledGo = this.__goPool.get(path);
        if (pooledGo != undefined) {
            let inst = csharp__WEBPACK_IMPORTED_MODULE_2__["UnityEngine"].GameObject.Instantiate(pooledGo);
            return inst;
        }
        return null;
    }
    //预加载：可提供初始实例化个数
    async preLoadGameObjectAsync(path, inst_count, callback, ...params) {
        if (this.checkHasCached(path)) {
            if (callback != null) {
                callback(params);
            }
            return;
        }
        let go = await _ResManager__WEBPACK_IMPORTED_MODULE_1__["ResManager"].Instance(_ResManager__WEBPACK_IMPORTED_MODULE_1__["ResManager"]).loadPrefab(path);
        if (go != undefined) {
            this.cacheAndInstGameObject(path, go, inst_count);
        }
        if (callback != null) {
            callback(params);
        }
    }
    //-- 异步获取：必要时加载
    async getGameObjectAsync(path, callback, ...params) {
        let inst = this.tryGetFromCache(path);
        if (inst == null) {
            await this.preLoadGameObjectAsync(path, 1, callback, params);
        }
        inst = this.tryGetFromCache(path);
        inst.SetActive(true);
    }
    //-- 回收
    recycleGameObject(path, inst) {
        inst.transform.SetParent(this.__cacheTransRoot);
        inst.SetActive(false);
        let cachedInst = this.__instCache.get(path) || new Array();
        cachedInst.push(inst);
        this.__instCache.set(path, cachedInst);
    }
    //-- 清理缓存
    cleanup(includePooledGo = false) {
        this.__instCache.forEach((values, key) => {
            for (let inst of values) {
                if (inst != null) {
                    csharp__WEBPACK_IMPORTED_MODULE_2__["UnityEngine"].GameObject.Destroy(inst);
                }
            }
        });
        this.__instCache.clear();
        if (includePooledGo) {
            this.__goPool.forEach((go, key) => {
                if (go != null) {
                    _ResManager__WEBPACK_IMPORTED_MODULE_1__["ResManager"].Instance(_ResManager__WEBPACK_IMPORTED_MODULE_1__["ResManager"]).releaseAddressGO(go);
                }
            });
            this.__goPool.clear();
        }
    }
}


/***/ }),

/***/ "./src/framework/common/Messenger.ts":
/*!*******************************************!*\
  !*** ./src/framework/common/Messenger.ts ***!
  \*******************************************/
/*! exports provided: MesObj, Messenger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MesObj", function() { return MesObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Messenger", function() { return Messenger; });
class MesObj {
}
class Messenger {
    constructor() {
        this.listenerMap = new Map();
    }
    addListener(e_type, e_obj, e_listner) {
        let msgObj = this.listenerMap.get(e_type);
        if (typeof (msgObj) == "undefined") {
            msgObj = new MesObj();
            msgObj.obj = e_obj;
            msgObj.listeners = new Array();
        }
        msgObj.listeners.push(e_listner);
        this.listenerMap.set(e_type, msgObj);
    }
    getListener(e_type) {
        return this.listenerMap.get(e_type);
    }
    broadcast(e_type, ...params) {
        let msgObj = this.listenerMap.get(e_type);
        if (typeof (msgObj) != "undefined") {
            for (let l of msgObj.listeners) {
                l.apply(msgObj.obj, params);
            }
        }
    }
    removeListenerByType(e_type) {
        this.listenerMap.delete(e_type);
    }
    removeListener(e_type, e_listener) {
        let msgObj = this.listenerMap.get(e_type);
        if (typeof (msgObj) != "undefined") {
            for (let i = 0; i < msgObj.listeners.length; i++) {
                if (msgObj.listeners[i] == e_listener) {
                    msgObj.listeners.splice(i, 1);
                }
            }
        }
    }
    clearup() {
        this.listenerMap.clear();
    }
}


/***/ }),

/***/ "./src/framework/common/NiceDecorator.ts":
/*!***********************************************!*\
  !*** ./src/framework/common/NiceDecorator.ts ***!
  \***********************************************/
/*! exports provided: binder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "binder", function() { return binder; });
// FairyGUI 元件 绑定器
function binder(name) {
    return function (target, key) {
        target["binders"] = target["binders"] || {};
        target["binders"][key] = name;
    };
}


/***/ }),

/***/ "./src/framework/common/ResManager.ts":
/*!********************************************!*\
  !*** ./src/framework/common/ResManager.ts ***!
  \********************************************/
/*! exports provided: ResManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResManager", function() { return ResManager; });
/* harmony import */ var _Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var puerts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! puerts */ "puerts");
/* harmony import */ var puerts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(puerts__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_2__);



class ResManager extends _Singleton__WEBPACK_IMPORTED_MODULE_0__["Singleton"] {
    constructor() {
        super();
    }
    async loadPrefab(address) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_2__["NiceTS"].ResourceManager.LoadPrefab(address);
            let go = await Object(puerts__WEBPACK_IMPORTED_MODULE_1__["$promise"])(task);
            return go;
        }
        catch (ex) {
            console.error(`Load prefab :${address} : ${ex}`);
            return null;
        }
    }
    async loadTextAsset(address) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_2__["NiceTS"].ResourceManager.LoadTextAsset(address);
            let go = await Object(puerts__WEBPACK_IMPORTED_MODULE_1__["$promise"])(task);
            return go;
        }
        catch (ex) {
            console.error(`Load textasset :${address} : ${ex}`);
            return null;
        }
    }
    async loadSprite(address) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_2__["NiceTS"].ResourceManager.LoadSprite(address);
            let go = await Object(puerts__WEBPACK_IMPORTED_MODULE_1__["$promise"])(task);
            return go;
        }
        catch (ex) {
            console.error(`Load sprite :${address} : ${ex}`);
            return null;
        }
    }
    async loadFairyGUIPackage(address, packageName, callback) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_2__["NiceTS"].ResourceManager.LoadFairyGUIPackage(address, packageName);
            await Object(puerts__WEBPACK_IMPORTED_MODULE_1__["$promise"])(task);
            if (callback)
                callback();
        }
        catch (ex) {
            console.error(`Load fairyGUI :${address} : ${ex}`);
        }
    }
    releaseAddressGO(go) {
        csharp__WEBPACK_IMPORTED_MODULE_2__["NiceTS"].ResourceManager.ReleaseAddressGO(go);
    }
    releaseFairyGUIPackage(packageName) {
        csharp__WEBPACK_IMPORTED_MODULE_2__["NiceTS"].ResourceManager.ReleaseFGUIPackage(packageName);
    }
}


/***/ }),

/***/ "./src/framework/common/Singleton.ts":
/*!*******************************************!*\
  !*** ./src/framework/common/Singleton.ts ***!
  \*******************************************/
/*! exports provided: Singleton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Singleton", function() { return Singleton; });
class Singleton {
    static Instance(c) {
        if (this.instance == null) {
            this.instance = new c();
        }
        return this.instance;
    }
}
Singleton.instance = null;


/***/ }),

/***/ "./src/framework/net/GameSession.ts":
/*!******************************************!*\
  !*** ./src/framework/net/GameSession.ts ***!
  \******************************************/
/*! exports provided: MsgPack, GameSession */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MsgPack", function() { return MsgPack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameSession", function() { return GameSession; });
/* harmony import */ var _common_Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _data_pb_Opcode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data/pb/Opcode */ "./src/data/pb/Opcode.ts");
/* harmony import */ var _NetErrorCode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NetErrorCode */ "./src/framework/net/NetErrorCode.ts");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_3__);




class MsgPack {
    constructor() {
        this.retryTimes = 0;
    }
}
class GameSession extends _common_Singleton__WEBPACK_IMPORTED_MODULE_0__["Singleton"] {
    constructor() {
        super();
        this.id = 0; //session ID
        this.reSendInterval = 10000; //10秒重发一次
        this.timeoutInterval = 5000; //5秒检查一次是否超时
        this.maxReSendTimes = 5; //最大重发次数
        this._rpcId = 1;
        this.requestCallback = new Map();
        this.listeners = new Map();
    }
    get rpcId() {
        return ++this._rpcId;
    }
    //address-> ip:port
    connectChannel(address, connCaback) {
        this.channel = csharp__WEBPACK_IMPORTED_MODULE_3__["NiceTS"].TService.Instance.GetChannel();
        this.channel.errorCallback = (channel, code) => {
            if (code == _NetErrorCode__WEBPACK_IMPORTED_MODULE_2__["NetErrorCode"].ERR_SocketConnSucc) {
                this.timeoutIimer = setInterval(() => {
                    this.checkTimeoutMsg();
                }, this.timeoutInterval);
            }
            connCaback(channel, code);
        };
        this.channel.readCallback = (buffer) => {
            this.onReceive(buffer);
        };
        this.channel.Connect(address);
        return this;
    }
    //接收服务器通知
    listen(opcode, callback) {
        this.listeners.set(opcode, callback);
    }
    //发送protoubf消息
    send(opcode, rpcid, message, callBack) {
        //封装消息：opcode+msg
        let lenBuf = new Uint8Array(2);
        lenBuf[1] = opcode >>> 8;
        lenBuf[0] = opcode & 0xff;
        let sendArray = new Uint8Array(message.length + 2);
        sendArray.set(lenBuf);
        sendArray.set(message, 2);
        if (callBack != null) {
            let msgPack = new MsgPack();
            msgPack.sendTime = new Date().getTime();
            msgPack.callback = callBack;
            msgPack.bytes = sendArray;
            this.requestCallback.set(rpcid, msgPack);
        }
        //Logger.log("send array: "+sendArray);
        this.channel.Send(sendArray);
    }
    reSend(bytes) {
        this.channel.Send(bytes);
    }
    onReceive(buffer) {
        let msgBuf = new Uint8Array(buffer);
        let opcode = msgBuf[1] << 8 | msgBuf[0];
        let msgBytes = msgBuf.subarray(2);
        let decodeMsg = _data_pb_Opcode__WEBPACK_IMPORTED_MODULE_1__["Opcode"].decode(opcode, msgBytes);
        let rpcId = decodeMsg.rpcId;
        if (rpcId == undefined || !this.requestCallback.has(rpcId)) {
            //检查是否是服务器下发的消息
            if (this.listeners.has(opcode)) {
                let listen = this.listeners.get(opcode);
                listen(decodeMsg.msgObj);
            }
        }
        else {
            let msgPack = this.requestCallback.get(rpcId);
            msgPack.callback(decodeMsg.msgObj);
            this.requestCallback.delete(rpcId);
        }
    }
    checkTimeoutMsg() {
        let currTime = new Date().getTime();
        this.requestCallback.forEach((value, key) => {
            if (value.retryTimes >= this.maxReSendTimes) {
                //超过最大重发次数，丢弃
                console.log(`Message resend too more, opcode:${key}, lastsend:${value.sendTime}`);
                this.requestCallback.delete(key);
            }
            else {
                if ((currTime - value.sendTime) >= this.reSendInterval) {
                    value.retryTimes++;
                    value.sendTime = currTime;
                    //重发消息
                    this.reSend(value.bytes);
                    console.log(`resend message:, opcode:${key}, retry times:${value.retryTimes}`);
                }
            }
        });
    }
    disconnect() {
        clearInterval(this.timeoutIimer);
        this.channel.Dispose();
    }
}


/***/ }),

/***/ "./src/framework/net/NetErrorCode.ts":
/*!*******************************************!*\
  !*** ./src/framework/net/NetErrorCode.ts ***!
  \*******************************************/
/*! exports provided: NetErrorCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetErrorCode", function() { return NetErrorCode; });
class NetErrorCode {
}
NetErrorCode.ERR_SocketConnSucc = 100000;
NetErrorCode.ERR_ConnectGateKeyError = 100006;
NetErrorCode.ERR_PeerDisconnect = 102008;
NetErrorCode.ERR_SocketCantSend = 102009;
NetErrorCode.ERR_SocketError = 102010;
NetErrorCode.ERR_SocketConnError = 102011;


/***/ }),

/***/ "./src/framework/net/SessionManager.ts":
/*!*********************************************!*\
  !*** ./src/framework/net/SessionManager.ts ***!
  \*********************************************/
/*! exports provided: SessionManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SessionManager", function() { return SessionManager; });
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _common_Singleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _GameSession__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameSession */ "./src/framework/net/GameSession.ts");
/* harmony import */ var _NetErrorCode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NetErrorCode */ "./src/framework/net/NetErrorCode.ts");




class SessionManager extends _common_Singleton__WEBPACK_IMPORTED_MODULE_1__["Singleton"] {
    get realmRpcID() {
        return this.sessionReam.rpcId;
    }
    get gateRpcID() {
        return this.sessionGate.rpcId;
    }
    connectRealmServer(onSucc, onError) {
        //登录验证服
        this.sessionReam = _GameSession__WEBPACK_IMPORTED_MODULE_2__["GameSession"].Instance(_GameSession__WEBPACK_IMPORTED_MODULE_2__["GameSession"]).connectChannel(_global_GameConfig__WEBPACK_IMPORTED_MODULE_0__["GameConfig"].realmServerIP + ":" + _global_GameConfig__WEBPACK_IMPORTED_MODULE_0__["GameConfig"].realmServerPort, (channel, code) => {
            this.onReamSocketErr(channel, code, onSucc, onError);
        });
    }
    onReamSocketErr(channel, code, onSucc, onError) {
        if (code == _NetErrorCode__WEBPACK_IMPORTED_MODULE_3__["NetErrorCode"].ERR_SocketConnSucc) {
            this.sessionReam.id = channel.Id;
            onSucc(code);
        }
        else {
            onError(code);
            console.error("login reamserver err, code: " + code + ",id:" + channel.Id);
        }
    }
    disconnectRealmServer() {
        this.sessionReam.disconnect();
        this.sessionReam = null;
    }
    sendRealmMsg(opcode, rpcID, buf, callback) {
        this.sessionReam.send(opcode, rpcID, buf, (response) => {
            callback(response);
        });
    }
    connectGateServer(address, onSucc, onError) {
        this.sessionGate = _GameSession__WEBPACK_IMPORTED_MODULE_2__["GameSession"].Instance(_GameSession__WEBPACK_IMPORTED_MODULE_2__["GameSession"]).connectChannel(address, (channel, code) => {
            console.log("login Gate Server: " + code);
            this.onGateSocketErr(channel, code, onSucc, onError);
        });
    }
    onGateSocketErr(channel, code, onSucc, onError) {
        if (code == _NetErrorCode__WEBPACK_IMPORTED_MODULE_3__["NetErrorCode"].ERR_SocketConnSucc) {
            this.sessionGate.id = channel.Id;
            onSucc(code);
        }
        else {
            onError(code);
            console.error("gate server err, code: " + code + ",id:" + channel.Id);
        }
    }
    disconnectGateServer() {
        this.sessionGate.disconnect();
        this.sessionGate = null;
    }
    sendGateMsg(opcode, rpcID, buf, callback) {
        this.sessionGate.send(opcode, rpcID, buf, (response) => {
            callback(response);
        });
    }
}


/***/ }),

/***/ "./src/framework/scene/BaseScene.ts":
/*!******************************************!*\
  !*** ./src/framework/scene/BaseScene.ts ***!
  \******************************************/
/*! exports provided: BaseScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseScene", function() { return BaseScene; });
/* harmony import */ var _common_GameObjectPool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/GameObjectPool */ "./src/framework/common/GameObjectPool.ts");
/* harmony import */ var _common_ResManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/ResManager */ "./src/framework/common/ResManager.ts");


class BaseScene {
    constructor() {
        this.finishCount = 0;
        this.totalCount = 0;
        this.preloadFairyGUIPackage = new Map();
        this.preloadPrefab = new Map();
        this.finishCount = 0;
    }
    addPreloadFairyGUIPackage(address, packageName) {
        this.preloadFairyGUIPackage.set(address, packageName);
    }
    addPreloadPrefab(address, instCount) {
        this.preloadPrefab.set(address, instCount);
    }
    async onPrepare() {
        let fguiPkgCount = this.preloadFairyGUIPackage.size;
        let prefabCount = this.preloadPrefab.size;
        this.totalCount = fguiPkgCount + prefabCount;
        let premises = [];
        this.preloadFairyGUIPackage.forEach((value, key) => {
            let premise = _common_ResManager__WEBPACK_IMPORTED_MODULE_1__["ResManager"].Instance(_common_ResManager__WEBPACK_IMPORTED_MODULE_1__["ResManager"]).loadFairyGUIPackage(key, value, () => {
                this.finishCount++;
            });
            premises.push(premise);
        });
        this.preloadPrefab.forEach((value, key) => {
            let premise = _common_GameObjectPool__WEBPACK_IMPORTED_MODULE_0__["GameObjectPool"].Instance(_common_GameObjectPool__WEBPACK_IMPORTED_MODULE_0__["GameObjectPool"]).preLoadGameObjectAsync(key, value, () => {
                this.finishCount++;
            });
            premises.push(premise);
        });
        await Promise.all(premises);
    }
    onDestroy() {
        this.preloadFairyGUIPackage.forEach((value, key) => {
            console.log("destroy scene: " + key);
            _common_ResManager__WEBPACK_IMPORTED_MODULE_1__["ResManager"].Instance(_common_ResManager__WEBPACK_IMPORTED_MODULE_1__["ResManager"]).releaseFairyGUIPackage(value);
        });
        //清理资源缓存
        _common_GameObjectPool__WEBPACK_IMPORTED_MODULE_0__["GameObjectPool"].Instance(_common_GameObjectPool__WEBPACK_IMPORTED_MODULE_0__["GameObjectPool"]).cleanup(true);
        this.preloadFairyGUIPackage.clear();
        this.preloadPrefab.clear();
    }
}


/***/ }),

/***/ "./src/framework/scene/SceneDef.ts":
/*!*****************************************!*\
  !*** ./src/framework/scene/SceneDef.ts ***!
  \*****************************************/
/*! exports provided: SceneDef */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SceneDef", function() { return SceneDef; });
class SceneDef {
}
SceneDef.LoadingScene = "LoadingScene";
SceneDef.LaunchScene = "LaunchScene";
SceneDef.HomeScene = "HomeScene";
SceneDef.LoginScene = "LoginScene";
SceneDef.BattleScene = "BattleScene";


/***/ }),

/***/ "./src/framework/scene/SceneFactory.ts":
/*!*********************************************!*\
  !*** ./src/framework/scene/SceneFactory.ts ***!
  \*********************************************/
/*! exports provided: SceneFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SceneFactory", function() { return SceneFactory; });
/* harmony import */ var _game_module_pve_scene_BattleScene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game/module/pve/scene/BattleScene */ "./src/game/module/pve/scene/BattleScene.ts");
/* harmony import */ var _game_module_home_scene_HomeScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game/module/home/scene/HomeScene */ "./src/game/module/home/scene/HomeScene.ts");
/* harmony import */ var _game_module_login_scene_LoginScene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game/module/login/scene/LoginScene */ "./src/game/module/login/scene/LoginScene.ts");
/* harmony import */ var _SceneDef__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SceneDef */ "./src/framework/scene/SceneDef.ts");




class SceneFactory {
    static createScene(sceneName) {
        let scene = null;
        switch (sceneName) {
            case _SceneDef__WEBPACK_IMPORTED_MODULE_3__["SceneDef"].LoginScene:
                scene = new _game_module_login_scene_LoginScene__WEBPACK_IMPORTED_MODULE_2__["LoginScene"]();
                break;
            case _SceneDef__WEBPACK_IMPORTED_MODULE_3__["SceneDef"].HomeScene:
                scene = new _game_module_home_scene_HomeScene__WEBPACK_IMPORTED_MODULE_1__["HomeScene"]();
                break;
            case _SceneDef__WEBPACK_IMPORTED_MODULE_3__["SceneDef"].BattleScene:
                scene = new _game_module_pve_scene_BattleScene__WEBPACK_IMPORTED_MODULE_0__["BattleScene"]();
                break;
        }
        return scene;
    }
}


/***/ }),

/***/ "./src/framework/scene/SceneManager.ts":
/*!*********************************************!*\
  !*** ./src/framework/scene/SceneManager.ts ***!
  \*********************************************/
/*! exports provided: SceneManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SceneManager", function() { return SceneManager; });
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data_ui_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data/ui/common */ "./src/data/ui/common.ts");
/* harmony import */ var _common_Singleton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _ui_UIManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/UIManager */ "./src/framework/ui/UIManager.ts");
/* harmony import */ var _SceneFactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SceneFactory */ "./src/framework/scene/SceneFactory.ts");





class SceneManager extends _common_Singleton__WEBPACK_IMPORTED_MODULE_2__["Singleton"] {
    constructor() {
        super();
        csharp__WEBPACK_IMPORTED_MODULE_0__["UnityEngine"].SceneManagement.SceneManager.add_sceneLoaded((scene, mode) => {
            if (this.onSceneLoadedOnly != null)
                this.onSceneLoadedOnly(scene.name);
        });
    }
    //更新进度条
    updateProgress(progress) {
        this.loadingUI.showProgress(progress);
    }
    async loadScene(scene, onLoadComplete) {
        this.onSceneLoadedOnly = async (sceneName) => {
            if (sceneName == scene) {
                this.onSceneLoadedOnly = null;
                this.currentScene = _SceneFactory__WEBPACK_IMPORTED_MODULE_4__["SceneFactory"].createScene(scene);
                this.currentScene.onEnter();
                let progressInterval = setInterval(() => {
                    this.updateProgress(this.currentScene.finishCount / this.currentScene.totalCount);
                }, 500);
                await this.currentScene.onPrepare();
                clearInterval(progressInterval);
                //加载完成
                this.currentScene.onComplete();
                if (onLoadComplete != null)
                    onLoadComplete();
                _ui_UIManager__WEBPACK_IMPORTED_MODULE_3__["UIManager"].Instance(_ui_UIManager__WEBPACK_IMPORTED_MODULE_3__["UIManager"]).closeLoading(_data_ui_common__WEBPACK_IMPORTED_MODULE_1__["commonUI"].UILoadingPage);
            }
        };
        this.loadingUI = _ui_UIManager__WEBPACK_IMPORTED_MODULE_3__["UIManager"].Instance(_ui_UIManager__WEBPACK_IMPORTED_MODULE_3__["UIManager"]).openLoading(_data_ui_common__WEBPACK_IMPORTED_MODULE_1__["commonUI"].PackageName, _data_ui_common__WEBPACK_IMPORTED_MODULE_1__["commonUI"].UILoadingPage);
        //清理旧场景
        if (this.currentScene) {
            this.currentScene.onLeave();
            this.currentScene.onDestroy();
        }
        csharp__WEBPACK_IMPORTED_MODULE_0__["UnityEngine"].SceneManagement.SceneManager.LoadScene(scene);
    }
}


/***/ }),

/***/ "./src/framework/ui/UIDefine.ts":
/*!**************************************!*\
  !*** ./src/framework/ui/UIDefine.ts ***!
  \**************************************/
/*! exports provided: UITypeDef, UILayerDef, UIComDefs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UITypeDef", function() { return UITypeDef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UILayerDef", function() { return UILayerDef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIComDefs", function() { return UIComDefs; });
var UITypeDef;
(function (UITypeDef) {
    UITypeDef[UITypeDef["Unkown"] = 0] = "Unkown";
    UITypeDef[UITypeDef["Page"] = 1] = "Page";
    UITypeDef[UITypeDef["Window"] = 2] = "Window";
    UITypeDef[UITypeDef["Widget"] = 3] = "Widget";
    UITypeDef[UITypeDef["Loading"] = 4] = "Loading";
})(UITypeDef || (UITypeDef = {}));
class UILayerDef {
    static getDefaultLayer(type) {
        switch (type) {
            case UITypeDef.Loading: return this.Loading;
            case UITypeDef.Widget: return this.Widget;
            case UITypeDef.Window: return this.NormalWindow;
            case UITypeDef.Page: return this.Page;
            case UITypeDef.Unkown: return this.Unkown;
            default: return this.Unkown;
        }
    }
}
UILayerDef.Background = 0;
UILayerDef.Page = 1000;
UILayerDef.NormalWindow = 2000;
UILayerDef.TopWindow = 3000;
UILayerDef.Widget = 4000;
UILayerDef.Loading = 5000;
UILayerDef.Unkown = 9999;
class UIComDefs {
}
UIComDefs.BackBtn = "back_btn";
UIComDefs.WindowCloseBtn = "win_close_btn";


/***/ }),

/***/ "./src/framework/ui/UIFactory.ts":
/*!***************************************!*\
  !*** ./src/framework/ui/UIFactory.ts ***!
  \***************************************/
/*! exports provided: UIFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIFactory", function() { return UIFactory; });
/* harmony import */ var _game_module_login_ui_UILoginPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game/module/login/ui/UILoginPage */ "./src/game/module/login/ui/UILoginPage.ts");
/* harmony import */ var _game_module_home_ui_UIHomePage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game/module/home/ui/UIHomePage */ "./src/game/module/home/ui/UIHomePage.ts");
/* harmony import */ var _UILib_UILoading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UILib/UILoading */ "./src/framework/ui/UILib/UILoading.ts");
/* harmony import */ var _data_ui_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../data/ui/login */ "./src/data/ui/login.ts");
/* harmony import */ var _data_ui_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../data/ui/common */ "./src/data/ui/common.ts");
/* harmony import */ var _data_ui_home__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../data/ui/home */ "./src/data/ui/home.ts");
/* harmony import */ var _UILib_UIMsgBox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./UILib/UIMsgBox */ "./src/framework/ui/UILib/UIMsgBox.ts");
/* harmony import */ var _game_module_login_ui_UISelServerWin__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../game/module/login/ui/UISelServerWin */ "./src/game/module/login/ui/UISelServerWin.ts");








const CS = __webpack_require__(/*! csharp */ "csharp");
class UIFactory {
    static createUI(pkg, name) {
        console.log(`create UI: ${pkg}:${name}`);
        let comp = CS.FairyGUI.UIPackage.CreateObject(pkg, name).asCom;
        let ui = null;
        switch (name) {
            //common
            case _data_ui_common__WEBPACK_IMPORTED_MODULE_4__["commonUI"].UIUINoticeWin:
                ui = new _UILib_UIMsgBox__WEBPACK_IMPORTED_MODULE_6__["UIMsgBox"]();
                break;
            case _data_ui_common__WEBPACK_IMPORTED_MODULE_4__["commonUI"].UILoadingPage:
                ui = new _UILib_UILoading__WEBPACK_IMPORTED_MODULE_2__["UILoading"]();
                break;
            //login
            case _data_ui_login__WEBPACK_IMPORTED_MODULE_3__["loginUI"].UILoginPage:
                ui = new _game_module_login_ui_UILoginPage__WEBPACK_IMPORTED_MODULE_0__["UILoginPage"]();
                break;
            case _data_ui_login__WEBPACK_IMPORTED_MODULE_3__["loginUI"].UISelServerWin:
                ui = new _game_module_login_ui_UISelServerWin__WEBPACK_IMPORTED_MODULE_7__["UISelServerWin"]();
                break;
            //home
            case _data_ui_home__WEBPACK_IMPORTED_MODULE_5__["homeUI"].UIHomePage:
                ui = new _game_module_home_ui_UIHomePage__WEBPACK_IMPORTED_MODULE_1__["UIHomePage"]();
                break;
        }
        if (ui != null) {
            ui.fui = comp;
            ui.name = name;
            //绑定FairyGUI控件
            ui.bindAll(ui);
            ui.awake();
        }
        else {
            console.error(`not create ui: ${pkg}-${name}`);
        }
        return ui;
    }
}


/***/ }),

/***/ "./src/framework/ui/UILib/UILoading.ts":
/*!*********************************************!*\
  !*** ./src/framework/ui/UILib/UILoading.ts ***!
  \*********************************************/
/*! exports provided: UILoadingArg, UILoading */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UILoadingArg", function() { return UILoadingArg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UILoading", function() { return UILoading; });
/* harmony import */ var _UIPanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../UIPanel */ "./src/framework/ui/UIPanel.ts");
/* harmony import */ var _UIDefine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UIDefine */ "./src/framework/ui/UIDefine.ts");


class UILoadingArg {
    constructor() {
        this.title = "";
        this.tips = "";
        this.progress = 0;
    }
}
class UILoading extends _UIPanel__WEBPACK_IMPORTED_MODULE_0__["UIPanel"] {
    get arg() {
        return this.m_arg;
    }
    onAwake() {
        this.bindAll(this);
    }
    get uiType() {
        return _UIDefine__WEBPACK_IMPORTED_MODULE_1__["UITypeDef"].Loading;
    }
    onOpen(arg) {
        super.onOpen(arg);
        this.m_arg = arg;
        if (!this.m_arg) {
            this.m_arg = new UILoadingArg();
        }
        this.updateText();
    }
    showProgress(progress) {
        this.m_arg.progress = progress;
        this.updateText();
    }
    updateText() {
        console.log("loading progress:" + this.m_arg.progress);
        // if (txtTitle != null)
        // {
        //     txtTitle.text = m_arg.title + "(" + (int)(m_arg.progress * 100) + "%)";
        // }
        // if (txtTips != null)
        // {
        //     txtTips.text = m_arg.tips;
        // }
    }
}


/***/ }),

/***/ "./src/framework/ui/UILib/UIMsgBox.ts":
/*!********************************************!*\
  !*** ./src/framework/ui/UILib/UIMsgBox.ts ***!
  \********************************************/
/*! exports provided: UIMsgBoxArg, UIMsgBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIMsgBoxArg", function() { return UIMsgBoxArg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIMsgBox", function() { return UIMsgBox; });
/* harmony import */ var _framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../framework/common/NiceDecorator */ "./src/framework/common/NiceDecorator.ts");
/* harmony import */ var _UIWindow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UIWindow */ "./src/framework/ui/UIWindow.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// 通用弹窗
class UIMsgBoxArg {
    constructor() {
        this.title = "";
        this.content = "";
        this.btnText = ""; //"确定|取消|关闭"
    }
}
class UIMsgBox extends _UIWindow__WEBPACK_IMPORTED_MODULE_1__["UIWindow"] {
    onAwake() {
        super.onAwake();
        this.bindAll(this);
    }
    onOpen(arg) {
        super.onOpen(arg);
    }
    onClose(arg) {
        super.onClose(arg);
    }
}
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__["binder"])("msgTxt")
], UIMsgBox.prototype, "m_txt", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__["binder"])("okBtn")
], UIMsgBox.prototype, "m_okBtn", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__["binder"])("cancelBtn")
], UIMsgBox.prototype, "m_cancelBtn", void 0);


/***/ }),

/***/ "./src/framework/ui/UIManager.ts":
/*!***************************************!*\
  !*** ./src/framework/ui/UIManager.ts ***!
  \***************************************/
/*! exports provided: UIPageTrack, UIManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIPageTrack", function() { return UIPageTrack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIManager", function() { return UIManager; });
/* harmony import */ var _common_Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _UIFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UIFactory */ "./src/framework/ui/UIFactory.ts");
/* harmony import */ var _data_ui_home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../data/ui/home */ "./src/data/ui/home.ts");



class UIPageTrack {
}
class UIManager extends _common_Singleton__WEBPACK_IMPORTED_MODULE_0__["Singleton"] {
    constructor() {
        super();
        this.m_pageTrackStack = new Array();
        this.m_listLoadedPanel = new Array();
    }
    closeAllLoadedPanel() {
        for (let i = this.m_listLoadedPanel.length - 1; i >= 0; i--) {
            let panel = this.m_listLoadedPanel[i];
            if (panel.isOpen) {
                panel.close();
            }
            this.m_listLoadedPanel.slice(i, 1);
            panel.dispose();
        }
    }
    clean() {
        this.closeAllLoadedPanel();
        this.m_pageTrackStack.length = 0;
        this.m_listLoadedPanel.length = 0;
    }
    open(pkg, name, arg) {
        let ui = this.getUI(name);
        if (ui == null) {
            ui = _UIFactory__WEBPACK_IMPORTED_MODULE_1__["UIFactory"].createUI(pkg, name);
            this.m_listLoadedPanel.push(ui);
        }
        if (ui != null) {
            ui.open(arg);
        }
        return ui;
    }
    getUI(name) {
        for (const panel of this.m_listLoadedPanel) {
            if (panel.name == name) {
                console.log("find panel in cache: " + name);
                return panel;
            }
        }
        return null;
    }
    //打开场景页面,此页面不计入页面栈,无返回上一面按钮
    openPageInScene(pkg, page, arg) {
        this.openPageWorker(pkg, page, arg);
    }
    //==========================================================UILoading
    //打开Loading界面
    openLoading(pkg, name, arg) {
        let ui = this.open(pkg, name, arg);
        return ui;
    }
    //关闭Loading界面
    closeLoading(name, arg) {
        let ui = this.getUI(name);
        if (ui != null) {
            ui.close(arg);
        }
    }
    //==========================================================Page
    openPageWorker(pkg, page, arg) {
        this.m_currentPage = new UIPageTrack();
        this.m_currentPage.pkg = pkg;
        this.m_currentPage.name = page;
        this.m_currentPage.arg = arg;
        this.closeAllLoadedPanel();
        this.open(pkg, page, arg);
    }
    //打开页面, 会关闭上一个页面上的所有窗口,Widiget等
    openPage(pkg, name, arg) {
        if (this.m_currentPage != undefined && this.m_currentPage.name != name) {
            this.m_pageTrackStack.push(this.m_currentPage);
        }
        this.openPageWorker(pkg, name, arg);
    }
    //返回上一个页面
    goBackPage() {
        if (this.m_pageTrackStack.length > 0) {
            let track = this.m_pageTrackStack.pop();
            this.openPageWorker(track.pkg, track.name, track.arg);
        }
        else {
            this.enterMainPage();
        }
    }
    //回到主城
    enterMainPage() {
        this.m_pageTrackStack.length = 0;
        this.openPageInScene(_data_ui_home__WEBPACK_IMPORTED_MODULE_2__["homeUI"].PackageName, _data_ui_home__WEBPACK_IMPORTED_MODULE_2__["homeUI"].UIHomePage, null);
    }
    //==========================================================UIWindow
    //打开窗口
    openWindow(pkg, name, arg) {
        let ui = this.open(pkg, name, arg);
        return ui;
    }
    //关闭窗口
    closeWindow(name, arg) {
        let ui = this.getUI(name);
        if (ui != null) {
            ui.close(arg);
        }
    }
    //==========================================================UIWidget
    //打开Widiget
    openWidget(pkg, name, arg) {
        let ui = this.open(pkg, name, arg);
        return ui;
    }
    //u关闭Widiget
    closeWidget(name, arg) {
        let ui = this.getUI(name);
        if (ui != null) {
            ui.close(arg);
        }
    }
}


/***/ }),

/***/ "./src/framework/ui/UIPage.ts":
/*!************************************!*\
  !*** ./src/framework/ui/UIPage.ts ***!
  \************************************/
/*! exports provided: UIPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIPage", function() { return UIPage; });
/* harmony import */ var _UIPanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIPanel */ "./src/framework/ui/UIPanel.ts");
/* harmony import */ var _UIDefine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UIDefine */ "./src/framework/ui/UIDefine.ts");
/* harmony import */ var _UIManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UIManager */ "./src/framework/ui/UIManager.ts");



class UIPage extends _UIPanel__WEBPACK_IMPORTED_MODULE_0__["UIPanel"] {
    get uiType() {
        return _UIDefine__WEBPACK_IMPORTED_MODULE_1__["UITypeDef"].Page;
    }
    onAwake() {
        this.m_btnGoBack = this.fui.GetChild(_UIDefine__WEBPACK_IMPORTED_MODULE_1__["UIComDefs"].BackBtn);
        if (this.m_btnGoBack != undefined) {
            this.m_btnGoBack.onClick.Add(() => {
                this.onBtnGoBack();
            });
        }
    }
    onOpen(vo) {
        super.onOpen(vo);
    }
    onClose(arg) {
        super.onClose(arg);
    }
    onBtnGoBack() {
        _UIManager__WEBPACK_IMPORTED_MODULE_2__["UIManager"].Instance(_UIManager__WEBPACK_IMPORTED_MODULE_2__["UIManager"]).goBackPage();
    }
}


/***/ }),

/***/ "./src/framework/ui/UIPanel.ts":
/*!*************************************!*\
  !*** ./src/framework/ui/UIPanel.ts ***!
  \*************************************/
/*! exports provided: UIPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIPanel", function() { return UIPanel; });
/* harmony import */ var _UIDefine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIDefine */ "./src/framework/ui/UIDefine.ts");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_1__);


class UIPanel {
    constructor() {
        this.m_layer = _UIDefine__WEBPACK_IMPORTED_MODULE_0__["UILayerDef"].Unkown;
    }
    set name(v) {
        this._name = v;
    }
    get name() {
        return this._name;
    }
    get uiType() {
        return _UIDefine__WEBPACK_IMPORTED_MODULE_0__["UITypeDef"].Unkown;
    }
    get layer() {
        return this.m_layer;
    }
    set layer(v) {
        this.m_layer = v;
    }
    get isOpen() {
        return this.fui.visible;
    }
    onUpdate() { }
    onOpen(vo) {
        this.layer = _UIDefine__WEBPACK_IMPORTED_MODULE_0__["UILayerDef"].getDefaultLayer(this.uiType);
    }
    onClose(arg) { }
    awake() {
        this.onAwake();
    }
    //绑定FairyGUI元件
    bindAll(target) {
        for (let k in target["binders"]) {
            let fguiName = this["binders"][k];
            this[k] = this.fui.GetChild(fguiName);
        }
    }
    update() {
        this.onUpdate();
    }
    open(arg) {
        this.onOpen(arg);
        csharp__WEBPACK_IMPORTED_MODULE_1__["FairyGUI"].GRoot.inst.AddChild(this.fui);
    }
    close(arg = null) {
        this.onClose(arg);
        csharp__WEBPACK_IMPORTED_MODULE_1__["FairyGUI"].GRoot.inst.RemoveChild(this.fui);
    }
    dispose() {
        this.fui.Dispose();
    }
}


/***/ }),

/***/ "./src/framework/ui/UIWindow.ts":
/*!**************************************!*\
  !*** ./src/framework/ui/UIWindow.ts ***!
  \**************************************/
/*! exports provided: UIWindow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIWindow", function() { return UIWindow; });
/* harmony import */ var _UIPanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIPanel */ "./src/framework/ui/UIPanel.ts");
/* harmony import */ var _UIDefine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UIDefine */ "./src/framework/ui/UIDefine.ts");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_2__);



class UIWindow extends _UIPanel__WEBPACK_IMPORTED_MODULE_0__["UIPanel"] {
    get uiType() {
        return _UIDefine__WEBPACK_IMPORTED_MODULE_1__["UITypeDef"].Window;
    }
    onAwake() {
        this.m_btnClose = this.fui.GetChild(_UIDefine__WEBPACK_IMPORTED_MODULE_1__["UIComDefs"].WindowCloseBtn);
    }
    onOpen(arg) {
        super.onOpen(arg);
        this.fui.x = csharp__WEBPACK_IMPORTED_MODULE_2__["FairyGUI"].GRoot.inst.width / 2 - this.fui.width / 2;
        this.fui.y = csharp__WEBPACK_IMPORTED_MODULE_2__["FairyGUI"].GRoot.inst.height / 2 - this.fui.height / 2;
        if (this.m_btnClose != undefined) {
            this.m_btnClose.onClick.Add(this.onBtnClose);
        }
    }
    onClose(arg) {
        super.onClose(arg);
        if (this.m_btnClose != undefined) {
            this.m_btnClose.onClick.Remove(this.onBtnClose);
        }
    }
    onBtnClose() {
        this.close(0);
    }
}


/***/ }),

/***/ "./src/framework/util/TimeUtil.ts":
/*!****************************************!*\
  !*** ./src/framework/util/TimeUtil.ts ***!
  \****************************************/
/*! exports provided: TimeUtil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimeUtil", function() { return TimeUtil; });
class TimeUtil {
    static prefixInteger(num, length) {
        return (Array(length).join('0') + num).slice(-length);
    }
    //将一个时间数转换成"00:00:00"格式
    static getTimeString1(timeInt) {
        if (timeInt <= 0) {
            return "00:00:00";
        }
        else {
            let hour = Math.floor(timeInt / (60 * 60));
            let hourstr = this.prefixInteger(hour, 2);
            let minnute = Math.floor(timeInt / 60) % 60;
            let minutestr = this.prefixInteger(minnute, 2);
            let second = timeInt % 60;
            let secondstr = this.prefixInteger(second, 2);
            return `${hourstr}:${minutestr}:${secondstr}`;
        }
    }
    //将一个时间数转换成"00:00"格式
    static getTimeString(timeInt) {
        if (timeInt <= 0) {
            return "00:00:00";
        }
        else {
            let hour = Math.floor(timeInt / (60 * 60));
            let hourstr = this.prefixInteger(hour, 2);
            let minnute = Math.floor(timeInt / 60) % 60;
            let minutestr = this.prefixInteger(minnute, 2);
            return `${hourstr}:${minutestr}`;
        }
    }
    //将一个时间数转换成"00"分格式
    static getTimeMinuteString(timeInt) {
        if (timeInt <= 0) {
            return "00:00:00";
        }
        else {
            let minnute = Math.floor(timeInt / 60) % 60;
            let minutestr = this.prefixInteger(minnute, 2);
            return `${minutestr}`;
        }
    }
    //将一个时间数转换成"00“秒格式
    static getTimeSecondString(timeInt) {
        if (timeInt <= 0) {
            return "00:00:00";
        }
        else {
            let second = timeInt % 60;
            let secondstr = this.prefixInteger(second, 2);
            return `${secondstr}`;
        }
    }
    //获取本月1号是星期几
    static getWeekOfMonthFirstDay(time) {
        let date = new Date(time);
        date.setDate(1);
        return date.getDay();
    }
    //判断是否为闰年
    static isLeapYear(year) {
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            return true;
        }
        return false;
    }
    static getMonthDays_(year, month) {
        if (month == 2) {
            if (this.isLeapYear(year))
                return 29;
            else {
                return 28;
            }
        }
        else {
            return this.months[month];
        }
    }
    static getMonthDays(time) {
        let t = new Date(time);
        return this.getMonthDays_(t.getFullYear(), t.getMonth());
    }
    static async sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('');
            }, ms);
        });
    }
    static test() {
        let t1 = this.getTimeString1(5000);
        console.log(t1);
        let t2 = this.getTimeString(5000);
        console.log(t2);
        let t3 = this.getTimeMinuteString(5000);
        console.log(t3);
        let t4 = this.getTimeSecondString(5000);
        console.log(t4);
        let time = new Date().getTime();
        let t5 = this.getWeekOfMonthFirstDay(time);
        console.log("getWeekOfMonthFirstDay: " + t5 + " ,time:" + time);
        let t6 = this.getMonthDays(time);
        console.log("getMonthDays: " + t6);
    }
}
//每个月对应的天数
TimeUtil.months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


/***/ }),

/***/ "./src/game/api/LoginAPI.ts":
/*!**********************************!*\
  !*** ./src/game/api/LoginAPI.ts ***!
  \**********************************/
/*! exports provided: LoginAPI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginAPI", function() { return LoginAPI; });
/* harmony import */ var _data_pb_Opcode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../data/pb/Opcode */ "./src/data/pb/Opcode.ts");
/* harmony import */ var _data_pb_OuterMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data/pb/OuterMessage */ "./src/data/pb/OuterMessage.js");
/* harmony import */ var _data_pb_OuterMessage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_data_pb_OuterMessage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _framework_net_SessionManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../framework/net/SessionManager */ "./src/framework/net/SessionManager.ts");



class LoginAPI {
    static loginRealmServer(account, password, callback) {
        let msg = _data_pb_OuterMessage__WEBPACK_IMPORTED_MODULE_1__["NiceET"].C2R_Login.create();
        msg.RpcId = _framework_net_SessionManager__WEBPACK_IMPORTED_MODULE_2__["SessionManager"].Instance(_framework_net_SessionManager__WEBPACK_IMPORTED_MODULE_2__["SessionManager"]).realmRpcID;
        msg.Account = account;
        msg.Password = password;
        let buf = _data_pb_OuterMessage__WEBPACK_IMPORTED_MODULE_1__["NiceET"].C2R_Login.encode(msg).finish();
        _framework_net_SessionManager__WEBPACK_IMPORTED_MODULE_2__["SessionManager"].Instance(_framework_net_SessionManager__WEBPACK_IMPORTED_MODULE_2__["SessionManager"]).sendRealmMsg(_data_pb_Opcode__WEBPACK_IMPORTED_MODULE_0__["Opcode"].C2R_LOGIN, msg.RpcId, buf, (response) => {
            let msg = response;
            callback(msg);
        });
    }
    static loginGateServer(gateId, gateKey, callback) {
        let rpcId = _framework_net_SessionManager__WEBPACK_IMPORTED_MODULE_2__["SessionManager"].Instance(_framework_net_SessionManager__WEBPACK_IMPORTED_MODULE_2__["SessionManager"]).gateRpcID;
        let msg = _data_pb_OuterMessage__WEBPACK_IMPORTED_MODULE_1__["NiceET"].C2G_LoginGate.create();
        msg.RpcId = rpcId;
        msg.GateId = gateId;
        msg.Key = gateKey;
        let buf = _data_pb_OuterMessage__WEBPACK_IMPORTED_MODULE_1__["NiceET"].C2G_LoginGate.encode(msg).finish();
        _framework_net_SessionManager__WEBPACK_IMPORTED_MODULE_2__["SessionManager"].Instance(_framework_net_SessionManager__WEBPACK_IMPORTED_MODULE_2__["SessionManager"]).sendGateMsg(_data_pb_Opcode__WEBPACK_IMPORTED_MODULE_0__["Opcode"].C2G_LOGINGATE, rpcId, buf, (response) => {
            let msg = response;
            callback(msg);
        });
    }
}


/***/ }),

/***/ "./src/game/event/UIMessage.ts":
/*!*************************************!*\
  !*** ./src/game/event/UIMessage.ts ***!
  \*************************************/
/*! exports provided: UIMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIMessage", function() { return UIMessage; });
class UIMessage {
}
UIMessage.MSG_SELECT_SERVER = 1000;


/***/ }),

/***/ "./src/game/event/UIMessageManager.ts":
/*!********************************************!*\
  !*** ./src/game/event/UIMessageManager.ts ***!
  \********************************************/
/*! exports provided: UIMessageManger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIMessageManger", function() { return UIMessageManger; });
/* harmony import */ var _framework_common_Messenger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/common/Messenger */ "./src/framework/common/Messenger.ts");
/* harmony import */ var _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../framework/common/Singleton */ "./src/framework/common/Singleton.ts");


class UIMessageManger extends _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_1__["Singleton"] {
    constructor() {
        super(...arguments);
        this.uiMessage = new _framework_common_Messenger__WEBPACK_IMPORTED_MODULE_0__["Messenger"]();
    }
    addListener(msgCode, obj, listener) {
        this.uiMessage.addListener(msgCode, obj, listener);
    }
    removeListener(msgCode, listener) {
        this.uiMessage.removeListener(msgCode, listener);
    }
    removeListenerByCode(msgCode) {
        this.uiMessage.removeListenerByType(msgCode);
    }
    clearup() {
        this.uiMessage.clearup();
    }
    broadcast(msgCode, params) {
        this.uiMessage.broadcast(msgCode, params);
    }
}


/***/ }),

/***/ "./src/game/module/home/scene/HomeScene.ts":
/*!*************************************************!*\
  !*** ./src/game/module/home/scene/HomeScene.ts ***!
  \*************************************************/
/*! exports provided: HomeScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeScene", function() { return HomeScene; });
/* harmony import */ var _data_ui_home__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../data/ui/home */ "./src/data/ui/home.ts");
/* harmony import */ var _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../framework/scene/BaseScene */ "./src/framework/scene/BaseScene.ts");
/* harmony import */ var _framework_ui_UIManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../framework/ui/UIManager */ "./src/framework/ui/UIManager.ts");



class HomeScene extends _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_1__["BaseScene"] {
    constructor() {
        super();
    }
    onEnter() {
        this.addPreloadFairyGUIPackage("home_fui.bytes", "home");
    }
    onComplete() {
        _framework_ui_UIManager__WEBPACK_IMPORTED_MODULE_2__["UIManager"].Instance(_framework_ui_UIManager__WEBPACK_IMPORTED_MODULE_2__["UIManager"]).openPageInScene(_data_ui_home__WEBPACK_IMPORTED_MODULE_0__["homeUI"].PackageName, _data_ui_home__WEBPACK_IMPORTED_MODULE_0__["homeUI"].UIHomePage, null);
    }
    onLeave() {
    }
}


/***/ }),

/***/ "./src/game/module/home/ui/UIHomePage.ts":
/*!***********************************************!*\
  !*** ./src/game/module/home/ui/UIHomePage.ts ***!
  \***********************************************/
/*! exports provided: UIHomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIHomePage", function() { return UIHomePage; });
/* harmony import */ var _framework_ui_UIPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../framework/ui/UIPage */ "./src/framework/ui/UIPage.ts");
/* harmony import */ var _framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../framework/common/NiceDecorator */ "./src/framework/common/NiceDecorator.ts");
/* harmony import */ var _framework_ui_UIManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../framework/ui/UIManager */ "./src/framework/ui/UIManager.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



class UIHomePage extends _framework_ui_UIPage__WEBPACK_IMPORTED_MODULE_0__["UIPage"] {
    onAwake() {
        super.onAwake();
        this.m_chatBtn.onClick.Add(() => {
            this.onchatBtn();
        });
        this.m_bagBtn.onClick.Add(() => {
            this.onbagBtn();
        });
        this.m_shopBtn.onClick.Add(() => {
            this.onshopBtn();
        });
        this.m_levelBtn.onClick.Add(() => {
            this.onlevelBtn();
        });
    }
    onOpen(vo) {
        super.onOpen(vo);
    }
    onClose(arg) {
        super.onClose(arg);
    }
    onchatBtn() {
        _framework_ui_UIManager__WEBPACK_IMPORTED_MODULE_2__["UIManager"].Instance(_framework_ui_UIManager__WEBPACK_IMPORTED_MODULE_2__["UIManager"]).openWindow("common", "UINoticeWin", null);
        console.log("on chat...");
    }
    onbagBtn() {
        console.log("on bag ..");
    }
    onshopBtn() {
        console.log("on shop...");
    }
    onlevelBtn() {
        console.log("on level...");
    }
}
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__["binder"])("chatBtn")
], UIHomePage.prototype, "m_chatBtn", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__["binder"])("bagBtn")
], UIHomePage.prototype, "m_bagBtn", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__["binder"])("shopBtn")
], UIHomePage.prototype, "m_shopBtn", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__["binder"])("levelBtn")
], UIHomePage.prototype, "m_levelBtn", void 0);


/***/ }),

/***/ "./src/game/module/login/scene/LoginScene.ts":
/*!***************************************************!*\
  !*** ./src/game/module/login/scene/LoginScene.ts ***!
  \***************************************************/
/*! exports provided: LoginScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginScene", function() { return LoginScene; });
/* harmony import */ var _data_ui_login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../data/ui/login */ "./src/data/ui/login.ts");
/* harmony import */ var _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../framework/scene/BaseScene */ "./src/framework/scene/BaseScene.ts");
/* harmony import */ var _framework_ui_UIManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../framework/ui/UIManager */ "./src/framework/ui/UIManager.ts");



class LoginScene extends _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_1__["BaseScene"] {
    onEnter() {
        //添加预加载资源
        this.addPreloadFairyGUIPackage("login_fui.bytes", _data_ui_login__WEBPACK_IMPORTED_MODULE_0__["loginUI"].PackageName);
    }
    onComplete() {
        _framework_ui_UIManager__WEBPACK_IMPORTED_MODULE_2__["UIManager"].Instance(_framework_ui_UIManager__WEBPACK_IMPORTED_MODULE_2__["UIManager"]).openPageInScene(_data_ui_login__WEBPACK_IMPORTED_MODULE_0__["loginUI"].PackageName, _data_ui_login__WEBPACK_IMPORTED_MODULE_0__["loginUI"].UILoginPage, null);
    }
    onLeave() {
    }
}


/***/ }),

/***/ "./src/game/module/login/ui/UILoginPage.ts":
/*!*************************************************!*\
  !*** ./src/game/module/login/ui/UILoginPage.ts ***!
  \*************************************************/
/*! exports provided: UILoginPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UILoginPage", function() { return UILoginPage; });
/* harmony import */ var _framework_ui_UIPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../framework/ui/UIPage */ "./src/framework/ui/UIPage.ts");
/* harmony import */ var _framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../framework/common/NiceDecorator */ "./src/framework/common/NiceDecorator.ts");
/* harmony import */ var _framework_net_SessionManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../framework/net/SessionManager */ "./src/framework/net/SessionManager.ts");
/* harmony import */ var _api_LoginAPI__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../api/LoginAPI */ "./src/game/api/LoginAPI.ts");
/* harmony import */ var _framework_ui_UIManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../framework/ui/UIManager */ "./src/framework/ui/UIManager.ts");
/* harmony import */ var _data_ui_login__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../data/ui/login */ "./src/data/ui/login.ts");
/* harmony import */ var _vo_VoServer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../vo/VoServer */ "./src/game/module/login/vo/VoServer.ts");
/* harmony import */ var _event_UIMessageManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../event/UIMessageManager */ "./src/game/event/UIMessageManager.ts");
/* harmony import */ var _event_UIMessage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../event/UIMessage */ "./src/game/event/UIMessage.ts");
/* harmony import */ var _framework_scene_SceneManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../framework/scene/SceneManager */ "./src/framework/scene/SceneManager.ts");
/* harmony import */ var _framework_scene_SceneDef__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../framework/scene/SceneDef */ "./src/framework/scene/SceneDef.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











class UILoginPage extends _framework_ui_UIPage__WEBPACK_IMPORTED_MODULE_0__["UIPage"] {
    onAwake() {
        super.onAwake();
        this.m_loginBtn.onClick.Add(() => {
            this.onLoginClick();
        });
        this.m_selserverBtn.onClick.Add(() => {
            this.openSelServerWin();
        });
        this.m_loginBtn.enabled = false;
        _framework_net_SessionManager__WEBPACK_IMPORTED_MODULE_2__["SessionManager"].Instance(_framework_net_SessionManager__WEBPACK_IMPORTED_MODULE_2__["SessionManager"]).connectRealmServer((code) => {
            this.m_loginBtn.enabled = true;
        }, (code) => {
        });
    }
    onSelectServer(serverItem) {
        console.log(" server selected: " + serverItem.serverName);
        this.m_selserverBtn.text = serverItem.serverName;
    }
    onOpen(vo) {
        super.onOpen(vo);
        //监听选服消息
        _event_UIMessageManager__WEBPACK_IMPORTED_MODULE_7__["UIMessageManger"].Instance(_event_UIMessageManager__WEBPACK_IMPORTED_MODULE_7__["UIMessageManger"]).addListener(_event_UIMessage__WEBPACK_IMPORTED_MODULE_8__["UIMessage"].MSG_SELECT_SERVER, this, this.onSelectServer);
    }
    onClose(arg) {
        super.onClose(arg);
        _event_UIMessageManager__WEBPACK_IMPORTED_MODULE_7__["UIMessageManger"].Instance(_event_UIMessageManager__WEBPACK_IMPORTED_MODULE_7__["UIMessageManger"]).removeListener(_event_UIMessage__WEBPACK_IMPORTED_MODULE_8__["UIMessage"].MSG_SELECT_SERVER, this.onSelectServer);
    }
    openSelServerWin() {
        // 测试数据
        let voServer = new _vo_VoServer__WEBPACK_IMPORTED_MODULE_6__["VoServer"]();
        for (let i = 1; i < 10; i++) {
            voServer.areaMap.set(i, "分区" + i);
            voServer.serverMap.set(i, new Array());
            for (let j = 1; j < 20; j++) {
                let voServerItem = new _vo_VoServer__WEBPACK_IMPORTED_MODULE_6__["VoServerItem"]();
                voServerItem.areaId = i;
                voServerItem.serverId = j;
                voServerItem.serverName = "测试服务器" + i + ":" + j;
                voServerItem.serverStatus = Math.floor(Math.random() * 3 + 1);
                voServer.serverMap.get(i).push(voServerItem);
            }
        }
        _framework_ui_UIManager__WEBPACK_IMPORTED_MODULE_4__["UIManager"].Instance(_framework_ui_UIManager__WEBPACK_IMPORTED_MODULE_4__["UIManager"]).openWindow(_data_ui_login__WEBPACK_IMPORTED_MODULE_5__["loginUI"].PackageName, _data_ui_login__WEBPACK_IMPORTED_MODULE_5__["loginUI"].UISelServerWin, voServer);
    }
    onLoginClick() {
        let account = this.m_account.text;
        let password = this.m_password.text;
        console.log(`account:${account} - password: ${password}`);
        if (account != "" && password != "") {
            _api_LoginAPI__WEBPACK_IMPORTED_MODULE_3__["LoginAPI"].loginRealmServer(account, password, (msg) => {
                this.gateId = msg.GateId;
                this.gateKey = msg.Key;
                console.log("login ream succ, gate addr:" + msg.Address + ",key:" + msg.Key);
                _framework_net_SessionManager__WEBPACK_IMPORTED_MODULE_2__["SessionManager"].Instance(_framework_net_SessionManager__WEBPACK_IMPORTED_MODULE_2__["SessionManager"]).disconnectRealmServer();
                //登录网关服
                _framework_net_SessionManager__WEBPACK_IMPORTED_MODULE_2__["SessionManager"].Instance(_framework_net_SessionManager__WEBPACK_IMPORTED_MODULE_2__["SessionManager"]).connectGateServer(msg.Address, (code) => { this.onConnGateSucc(code); }, (code) => { this.onConnGateErr(code); });
            });
        }
    }
    onConnGateSucc(code) {
        console.log("connect gate succ: " + code);
        _api_LoginAPI__WEBPACK_IMPORTED_MODULE_3__["LoginAPI"].loginGateServer(this.gateId, this.gateKey, (msg) => {
            let playerID = msg.PlayerId;
            console.log("login gate response.." + playerID);
            _framework_scene_SceneManager__WEBPACK_IMPORTED_MODULE_9__["SceneManager"].Instance(_framework_scene_SceneManager__WEBPACK_IMPORTED_MODULE_9__["SceneManager"]).loadScene(_framework_scene_SceneDef__WEBPACK_IMPORTED_MODULE_10__["SceneDef"].HomeScene, () => { });
        });
    }
    onConnGateErr(code) {
        console.log("connect gate err: " + code);
    }
}
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__["binder"])("account")
], UILoginPage.prototype, "m_account", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__["binder"])("password")
], UILoginPage.prototype, "m_password", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__["binder"])("selserverBtn")
], UILoginPage.prototype, "m_selserverBtn", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_1__["binder"])("loginBtn")
], UILoginPage.prototype, "m_loginBtn", void 0);


/***/ }),

/***/ "./src/game/module/login/ui/UISelServerWin.ts":
/*!****************************************************!*\
  !*** ./src/game/module/login/ui/UISelServerWin.ts ***!
  \****************************************************/
/*! exports provided: UISelServerWin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UISelServerWin", function() { return UISelServerWin; });
/* harmony import */ var _framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../framework/common/NiceDecorator */ "./src/framework/common/NiceDecorator.ts");
/* harmony import */ var _framework_ui_UIWindow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../framework/ui/UIWindow */ "./src/framework/ui/UIWindow.ts");
/* harmony import */ var _event_UIMessage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../event/UIMessage */ "./src/game/event/UIMessage.ts");
/* harmony import */ var _event_UIMessageManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../event/UIMessageManager */ "./src/game/event/UIMessageManager.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




class UISelServerWin extends _framework_ui_UIWindow__WEBPACK_IMPORTED_MODULE_1__["UIWindow"] {
    constructor() {
        super(...arguments);
        this.clickAreaIndex = 0;
        this.clickServerIndex = 0;
    }
    onAwake() {
        super.onAwake();
        this.backBtn.onClick.Add(() => {
            this.close();
        });
        this.okBtn.onClick.Add(() => {
            this.onSelectServer();
        });
        this.areaList.onClickItem.Add((event) => {
            this.clickAreaIndex = this.areaList.GetChildIndex(event.data);
            this.serverList.numItems = this.voServer.serverMap.get(this.clickAreaIndex + 1).length;
            this.serverList.RefreshVirtualList();
        });
        this.serverList.onClickItem.Add((event) => {
            this.clickServerIndex = this.serverList.GetChildIndex(event.data);
            this.title.text = "已选择服务器：" + this.clickServerIndex;
        });
    }
    onSelectServer() {
        let selItem = this.voServer.serverMap.get(this.clickAreaIndex + 1)[this.clickServerIndex];
        _event_UIMessageManager__WEBPACK_IMPORTED_MODULE_3__["UIMessageManger"].Instance(_event_UIMessageManager__WEBPACK_IMPORTED_MODULE_3__["UIMessageManger"]).broadcast(_event_UIMessage__WEBPACK_IMPORTED_MODULE_2__["UIMessage"].MSG_SELECT_SERVER, selItem);
        this.close();
    }
    onOpen(vo) {
        super.onOpen(vo);
        this.voServer = vo;
        this.areaList.SetVirtual();
        this.areaList.itemRenderer = (index, obj) => {
            this.renderAreaListItem(index, obj);
        };
        this.areaList.numItems = vo.areaMap.size;
        this.serverList.SetVirtual();
        this.serverList.itemRenderer = (index, obj) => {
            this.renderServerListItem(index, obj);
        };
        this.serverList.numItems = vo.serverMap.get(this.clickAreaIndex + 1).length;
    }
    renderAreaListItem(index, obj) {
        let areaBtn = obj.asButton;
        areaBtn.text = this.voServer.areaMap.get(index + 1);
    }
    renderServerListItem(index, obj) {
        let serverBtn = obj.asButton;
        serverBtn.text = this.voServer.serverMap.get(this.clickAreaIndex + 1)[index].serverName;
        //serverBtn.icon = FairyGUI.UIPackage.
    }
    onClose(arg) {
        super.onClose(arg);
    }
}
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__["binder"])("areaList")
], UISelServerWin.prototype, "areaList", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__["binder"])("serverList")
], UISelServerWin.prototype, "serverList", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__["binder"])("backBtn")
], UISelServerWin.prototype, "backBtn", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__["binder"])("okBtn")
], UISelServerWin.prototype, "okBtn", void 0);
__decorate([
    Object(_framework_common_NiceDecorator__WEBPACK_IMPORTED_MODULE_0__["binder"])("title")
], UISelServerWin.prototype, "title", void 0);


/***/ }),

/***/ "./src/game/module/login/vo/VoServer.ts":
/*!**********************************************!*\
  !*** ./src/game/module/login/vo/VoServer.ts ***!
  \**********************************************/
/*! exports provided: VoServerItem, VoServer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VoServerItem", function() { return VoServerItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VoServer", function() { return VoServer; });
class VoServerItem {
}
class VoServer {
    constructor() {
        this.serverMap = new Map();
        this.areaMap = new Map();
    }
}


/***/ }),

/***/ "./src/game/module/pve/scene/BattleScene.ts":
/*!**************************************************!*\
  !*** ./src/game/module/pve/scene/BattleScene.ts ***!
  \**************************************************/
/*! exports provided: BattleScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BattleScene", function() { return BattleScene; });
/* harmony import */ var _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../framework/scene/BaseScene */ "./src/framework/scene/BaseScene.ts");

class BattleScene extends _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_0__["BaseScene"] {
    constructor() {
        super();
    }
    onEnter() {
    }
    onComplete() {
    }
    onLeave() {
    }
}


/***/ }),

/***/ "./src/global/GameConfig.ts":
/*!**********************************!*\
  !*** ./src/global/GameConfig.ts ***!
  \**********************************/
/*! exports provided: GameConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameConfig", function() { return GameConfig; });
class GameConfig {
}
GameConfig.debug = true;
GameConfig.realmServerIP = "127.0.0.1";
GameConfig.realmServerPort = 10002;


/***/ }),

/***/ "./src/unittest/SingletonTest.ts":
/*!***************************************!*\
  !*** ./src/unittest/SingletonTest.ts ***!
  \***************************************/
/*! exports provided: SingletonTest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SingletonTest", function() { return SingletonTest; });
/* harmony import */ var _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/common/Singleton */ "./src/framework/common/Singleton.ts");

class SingletonTest extends _framework_common_Singleton__WEBPACK_IMPORTED_MODULE_0__["Singleton"] {
    constructor() {
        super();
        this.num = 0;
        console.log("SingletonTest call constructor");
    }
    add() {
        this.num += 1;
    }
    test() {
        return this.num;
    }
}


/***/ }),

/***/ "./src/unittest/UnitTest.ts":
/*!**********************************!*\
  !*** ./src/unittest/UnitTest.ts ***!
  \**********************************/
/*! exports provided: UnitTest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnitTest", function() { return UnitTest; });
/* harmony import */ var _framework_util_TimeUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/util/TimeUtil */ "./src/framework/util/TimeUtil.ts");
/* harmony import */ var _SingletonTest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SingletonTest */ "./src/unittest/SingletonTest.ts");
/* harmony import */ var _framework_common_Messenger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../framework/common/Messenger */ "./src/framework/common/Messenger.ts");
/* harmony import */ var _framework_common_ResManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../framework/common/ResManager */ "./src/framework/common/ResManager.ts");
/* harmony import */ var _data_pb_OuterMessage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../data/pb/OuterMessage */ "./src/data/pb/OuterMessage.js");
/* harmony import */ var _data_pb_OuterMessage__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_data_pb_OuterMessage__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _data_excel_SkillConfig__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../data/excel/SkillConfig */ "./src/data/excel/SkillConfig.ts");
/* harmony import */ var _data_pb_Opcode__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../data/pb/Opcode */ "./src/data/pb/Opcode.ts");







class UnitTest {
    static async doTest() {
        console.log("TimeUtil =============================");
        _framework_util_TimeUtil__WEBPACK_IMPORTED_MODULE_0__["TimeUtil"].test();
        console.log("Singleton =============================");
        _SingletonTest__WEBPACK_IMPORTED_MODULE_1__["SingletonTest"].Instance(_SingletonTest__WEBPACK_IMPORTED_MODULE_1__["SingletonTest"]);
        console.log("===");
        let t1 = _SingletonTest__WEBPACK_IMPORTED_MODULE_1__["SingletonTest"].Instance(_SingletonTest__WEBPACK_IMPORTED_MODULE_1__["SingletonTest"]);
        let t2 = _SingletonTest__WEBPACK_IMPORTED_MODULE_1__["SingletonTest"].Instance(_SingletonTest__WEBPACK_IMPORTED_MODULE_1__["SingletonTest"]);
        console.log(t1.test() + " : " + t2.test());
        t1.add();
        console.log(t1.test() + " : " + t2.test());
        t2.add();
        console.log(t1.test() + " : " + t2.test());
        console.log("Messager =============================");
        let messenger = new _framework_common_Messenger__WEBPACK_IMPORTED_MODULE_2__["Messenger"]();
        let listen = function (a, b) {
            console.log(`listen call: ${a} , ${b}`);
        };
        let listen2 = function (a, b) {
            console.log(`listen call2: ${a} , ${b}`);
        };
        let EVENT_CODE = 100;
        messenger.addListener(EVENT_CODE, this, listen);
        messenger.addListener(EVENT_CODE, this, listen2);
        messenger.broadcast(EVENT_CODE, 999, " Hello");
        messenger.removeListener(EVENT_CODE, listen);
        messenger.broadcast(EVENT_CODE, 999, " Hello");
        messenger.clearup();
        messenger.broadcast(EVENT_CODE, 999, " Hello");
        console.log("Timer =============================");
        let interval = setInterval(() => {
            console.log("inter val..");
        }, 1000);
        let timeout = setTimeout(() => {
            clearInterval(interval);
        }, 5000);
        console.log("ResourceManager =============================");
        let prefab = await _framework_common_ResManager__WEBPACK_IMPORTED_MODULE_3__["ResManager"].Instance(_framework_common_ResManager__WEBPACK_IMPORTED_MODULE_3__["ResManager"]).loadPrefab("Models/1001/Character.prefab");
        console.log(prefab);
        //let inst = CS.UnityEngine.GameObject.Instantiate(prefab);
        //inst.name = "Test Ch";
        console.log("引用类型 =============================");
        let testMap = new Map();
        testMap.set("key1", new Array());
        let arr1 = testMap.get("key1");
        arr1.push(12);
        arr1.push(333);
        let arr2 = testMap.get("key1");
        console.log(arr2);
        // Logger.log("FariyGUI =============================");
        //  let page:UI_LoginPage = new UI_LoginPage();
        //  CS.FairyGUI.GRoot.inst.AddChild(page._ui);
        //  Logger.log(page._ui);
        // Logger.log("ModuleManager =============================");
        // ModuleManager.Instance(ModuleManager).createModule(ModuleDef.LoginModule,"create login");
        // ModuleManager.Instance(ModuleManager).sendMessage(ModuleDef.LoginModule, "test1",2233);
        // ModuleManager.Instance(ModuleManager).sendMessage(ModuleDef.HomeModule, "test2",2233);
        // Logger.log("then create Home");
        // ModuleManager.Instance(ModuleManager).createModule(ModuleDef.HomeModule,"create login");
        console.log("UIManager =============================");
        console.log("excel data =============================");
        let skillMap = _data_excel_SkillConfig__WEBPACK_IMPORTED_MODULE_5__["SkillConfigTB"].Instance(_data_excel_SkillConfig__WEBPACK_IMPORTED_MODULE_5__["SkillConfigTB"]).trs;
        let skilltr = skillMap.get(1003);
        console.log(`${skilltr._Name} : ${skilltr._AttackType}`);
        let impacttype = skilltr._ImpactType;
        console.log(impacttype);
        console.log("Protobuf =============================");
        try {
            let c2m_req = {
                "RpcId": 11,
                "ActorId": 998,
                "request": "test"
            };
            //验证
            let v1 = _data_pb_OuterMessage__WEBPACK_IMPORTED_MODULE_4__["NiceET"].C2M_TestRequest.verify(c2m_req);
            console.log("verify pb: " + v1);
            let msg = _data_pb_OuterMessage__WEBPACK_IMPORTED_MODULE_4__["NiceET"].C2M_TestRequest.create(c2m_req);
            msg.RpcId = 100000;
            msg.request = "good bye";
            msg.ActorId = 88888;
            console.log(msg);
            let buf = _data_pb_OuterMessage__WEBPACK_IMPORTED_MODULE_4__["NiceET"].C2M_TestRequest.encode(msg).finish();
            console.log(buf);
            let de_buf = _data_pb_OuterMessage__WEBPACK_IMPORTED_MODULE_4__["NiceET"].C2M_TestRequest.decode(buf);
            console.log(de_buf.RpcId);
            console.log(de_buf.request);
            let de_m = _data_pb_OuterMessage__WEBPACK_IMPORTED_MODULE_4__["NiceET"].C2M_TestRequest.decode;
            let de_m_t = de_m(buf);
            console.log("========:" + de_m_t.request);
            console.log("protobuf opcode:");
            let op_test = _data_pb_Opcode__WEBPACK_IMPORTED_MODULE_6__["Opcode"].map[_data_pb_Opcode__WEBPACK_IMPORTED_MODULE_6__["Opcode"].C2M_TESTREQUEST](buf);
            console.log("test opcode: " + op_test.request);
        }
        catch (ex) {
            console.log(ex);
        }
        console.log("UintArray =============================");
        let opcode_arr = new Uint8Array([257, 25]);
        console.log(opcode_arr.subarray(0, 1));
        console.log(opcode_arr.length);
        let opcode_arr2 = new Uint8Array([33]);
        //合并 Uint8Array
        let merge_arr = new Uint8Array(opcode_arr.length + opcode_arr2.length);
        merge_arr.set(opcode_arr2);
        merge_arr.set(opcode_arr, opcode_arr2.length);
        console.log(merge_arr.length);
        let n = 5678;
        let buffer = new Uint8Array(4);
        // << 左移  >> 右移  >>> 无符号右移
        //n转uint8Array
        buffer[0] = n >>> 24;
        buffer[1] = n >>> 16;
        buffer[2] = n >>> 8;
        buffer[3] = n & 0xff;
        //unit8Array转n
        n = buffer[0] << 24 | buffer[1] << 16 | buffer[2] << 8 | buffer[3];
        console.log(n);
        n = 300;
        let buffer1 = new Uint8Array(2);
        buffer1[0] = n >>> 8;
        buffer1[1] = n & 0xff;
        console.log(buffer1);
        n = buffer1[0] << 8 | buffer1[1];
        console.log(n);
        console.log("sleep =============================");
        await _framework_util_TimeUtil__WEBPACK_IMPORTED_MODULE_0__["TimeUtil"].sleep(5000);
        console.log("sleep ..end");
    }
}
UnitTest.testVar = 10000;


/***/ }),

/***/ "csharp":
/*!*************************!*\
  !*** external "csharp" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("csharp");

/***/ }),

/***/ "puerts":
/*!*************************!*\
  !*** external "puerts" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("puerts");

/***/ })

/******/ });
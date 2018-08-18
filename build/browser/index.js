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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Browser/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Browser/Domain.ts":
/*!*******************************!*\
  !*** ./src/Browser/Domain.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Domain; });\n/* harmony import */ var _Promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Promise */ \"./src/Browser/Promise/index.ts\");\n\r\n\r\n;\r\nclass Domain {\r\n    constructor(parameters) {\r\n        this.promise = _Promise__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\r\n        this.initialiseProperties(parameters);\r\n    }\r\n    ;\r\n    initialiseProperties(parameters) {\r\n        const keys = Object.keys(parameters);\r\n        for (let key of keys) {\r\n            const value = parameters[key];\r\n            this[key] = value;\r\n        }\r\n        ;\r\n    }\r\n    ;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Browser/Domain.ts?");

/***/ }),

/***/ "./src/Browser/Promise/Error.ts":
/*!**************************************!*\
  !*** ./src/Browser/Promise/Error.ts ***!
  \**************************************/
/*! exports provided: ErrorDefinition, throwJsonResponseError, throwRawResponseError, throwUnexpected, RequestError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ErrorDefinition\", function() { return ErrorDefinition; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"throwJsonResponseError\", function() { return throwJsonResponseError; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"throwRawResponseError\", function() { return throwRawResponseError; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"throwUnexpected\", function() { return throwUnexpected; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RequestError\", function() { return RequestError; });\n\r\nvar ErrorDefinition;\r\n(function (ErrorDefinition) {\r\n    let Variants;\r\n    (function (Variants) {\r\n        ;\r\n        ;\r\n        ;\r\n    })(Variants = ErrorDefinition.Variants || (ErrorDefinition.Variants = {}));\r\n    ;\r\n})(ErrorDefinition || (ErrorDefinition = {}));\r\n;\r\nfunction throwJsonResponseError(json) {\r\n    throw new RequestError({ type: 'jsonResponse', json });\r\n}\r\n;\r\nfunction throwRawResponseError(response) {\r\n    throw new RequestError({ type: 'rawResponse', response });\r\n}\r\n;\r\nfunction throwUnexpected(error) {\r\n    throw new RequestError({ type: 'unexpected', error });\r\n}\r\n;\r\nclass RequestError extends Error {\r\n    constructor(definition) {\r\n        super('Failed.');\r\n        this.definition = definition;\r\n    }\r\n    ;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Browser/Promise/Error.ts?");

/***/ }),

/***/ "./src/Browser/Promise/index.ts":
/*!**************************************!*\
  !*** ./src/Browser/Promise/index.ts ***!
  \**************************************/
/*! exports provided: default, Result */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Result\", function() { return Result; });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ */ \"./src/Browser/index.ts\");\n/* harmony import */ var _Error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Error */ \"./src/Browser/Promise/Error.ts\");\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (definition) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const domain = this instanceof ___WEBPACK_IMPORTED_MODULE_0__[\"Domain\"] ? this : null;\r\n        parseDefinition(definition);\r\n        const headers = new Headers();\r\n        const options = {\r\n            method: definition.method,\r\n            headers\r\n        };\r\n        handleAuth(definition, domain, headers);\r\n        const type = handleType(definition, domain, headers);\r\n        handleHeaders(definition, headers);\r\n        handleBody(definition, type, options);\r\n        let request;\r\n        try {\r\n            request = new Request(definition.path, options);\r\n        }\r\n        catch (error) {\r\n            Object(_Error__WEBPACK_IMPORTED_MODULE_1__[\"throwUnexpected\"])(error);\r\n            return;\r\n        }\r\n        ;\r\n        let response;\r\n        try {\r\n            response = yield fetch(request);\r\n        }\r\n        catch (error) {\r\n            Object(_Error__WEBPACK_IMPORTED_MODULE_1__[\"throwUnexpected\"])(error);\r\n            return;\r\n        }\r\n        ;\r\n        if (!response.ok) {\r\n            if (definition.jsonResponseError) {\r\n                let json;\r\n                try {\r\n                    json = yield response.json();\r\n                }\r\n                catch (error) {\r\n                    Object(_Error__WEBPACK_IMPORTED_MODULE_1__[\"throwUnexpected\"])(error);\r\n                    return;\r\n                }\r\n                ;\r\n                Object(_Error__WEBPACK_IMPORTED_MODULE_1__[\"throwJsonResponseError\"])(json);\r\n            }\r\n            else {\r\n                Object(_Error__WEBPACK_IMPORTED_MODULE_1__[\"throwRawResponseError\"])(response);\r\n            }\r\n            ;\r\n            return;\r\n        }\r\n        ;\r\n        if (definition.jsonResponseSuccess) {\r\n            let json;\r\n            try {\r\n                json = yield response.json();\r\n            }\r\n            catch (error) {\r\n                Object(_Error__WEBPACK_IMPORTED_MODULE_1__[\"throwUnexpected\"])(error);\r\n                return;\r\n            }\r\n            ;\r\n            const result = new Result({ response, json });\r\n            return result;\r\n        }\r\n        ;\r\n        const result = new Result({ response });\r\n        return result;\r\n    });\r\n});\r\n;\r\nfunction handleAuth(definition, domain, headers) {\r\n    let auth;\r\n    if (definition.auth) {\r\n        auth = definition.auth;\r\n    }\r\n    else if (domain && domain.auth) {\r\n        if (typeof domain.auth === 'string') {\r\n            auth = domain.auth;\r\n        }\r\n        else {\r\n            auth = domain.auth();\r\n        }\r\n        ;\r\n    }\r\n    ;\r\n    headers.set('Authorization', auth);\r\n}\r\n;\r\nfunction handleType(definition, domain, headers) {\r\n    let type;\r\n    if (definition.type) {\r\n        type = definition.type;\r\n    }\r\n    else if (domain && domain.type) {\r\n        type = domain.type;\r\n    }\r\n    ;\r\n    headers.set('Content-Type', type);\r\n    return type;\r\n}\r\n;\r\nfunction handleHeaders(definition, headers) {\r\n    if (definition.headers) {\r\n        const keys = Object.keys(definition.headers);\r\n        for (let key of keys) {\r\n            const value = definition.headers[key];\r\n            headers.set(key, value);\r\n        }\r\n        ;\r\n    }\r\n    ;\r\n}\r\n;\r\nfunction handleBody(definition, type, options) {\r\n    if (definition.body) {\r\n        if (type === 'application/json') {\r\n            let json;\r\n            try {\r\n                json = JSON.stringify(definition.body);\r\n            }\r\n            catch (error) {\r\n                Object(_Error__WEBPACK_IMPORTED_MODULE_1__[\"throwUnexpected\"])(error);\r\n                return;\r\n            }\r\n            ;\r\n            options.body = json;\r\n        }\r\n        else if (type === 'application/x-www-form-urlencoded') {\r\n            const form = new URLSearchParams();\r\n            const keys = Object.keys(definition.body);\r\n            for (let key of keys) {\r\n                const value = definition.body[key];\r\n                form.set(key, value);\r\n            }\r\n            ;\r\n            options.body = form;\r\n        }\r\n        ;\r\n    }\r\n    ;\r\n}\r\n;\r\nfunction parseDefinition(definition) {\r\n    if (typeof definition.type !== 'string') {\r\n        definition.type = 'application/json';\r\n    }\r\n    ;\r\n}\r\n;\r\nclass Result {\r\n    constructor({ response, json }) {\r\n        this.response = response;\r\n        if (json) {\r\n            this.json = json;\r\n        }\r\n        ;\r\n    }\r\n    ;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Browser/Promise/index.ts?");

/***/ }),

/***/ "./src/Browser/index.ts":
/*!******************************!*\
  !*** ./src/Browser/index.ts ***!
  \******************************/
/*! exports provided: promise, Result, Domain */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Promise */ \"./src/Browser/Promise/index.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"promise\", function() { return _Promise__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Result\", function() { return _Promise__WEBPACK_IMPORTED_MODULE_0__[\"Result\"]; });\n\n/* harmony import */ var _Domain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Domain */ \"./src/Browser/Domain.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Domain\", function() { return _Domain__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n\r\n;\r\n;\r\n;\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/Browser/index.ts?");

/***/ })

/******/ });
"use strict";

var _app = _interopRequireDefault(require("./app.js"));

require("./database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = 3000;

_app["default"].listen(PORT);

console.log("server listening on port ".concat(PORT));
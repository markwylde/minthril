"use strict"

var pushStateMock = require("./pushStateMock")
var domMock = require("./domMock")

module.exports = function(env) {
	env = env || {}
	var $window = env.window = {}

	var dom = domMock()
	for (var key in dom) if (!$window[key]) $window[key] = dom[key]
	pushStateMock(env)

	return $window
}
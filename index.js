const hyperscript = require('./lib/hyperscript');

function minthril () {
  return hyperscript.apply(this, arguments);
}

minthril.m = require('./lib/hyperscript');
minthril.render = require('./lib/render')(window);
minthril.vnode = require('./lib/vnode');
minthril.createComponent = require('./lib/createComponent')(minthril);

module.exports = minthril;

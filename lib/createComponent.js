'use strict';

module.exports = (minthril) => {
  const componentsStates = new WeakMap();

  function createComponent (buildComponentDomTree, initialState) {
    function handleCreate (event) {
      componentsStates.set(event.dom, { ...initialState });
      draw(event);
    }

    function handleUpdate (event) {
      componentsStates.set(event.dom, { ...componentsStates.get(event.dom), ...initialState });
      draw(event);
    }

    function draw (event) {
      const componentState = componentsStates.get(event.dom);
      const dom = buildComponentDomTree(componentState, draw.bind(null, { dom: event.dom }));
      minthril.render(event.dom, dom);
    }

    return minthril('div', { oncreate: handleCreate, onupdate: handleUpdate });
  }

  return createComponent;
};

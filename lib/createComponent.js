'use strict';

module.exports = (minthril) => {
  const componentsStates = new WeakMap();

  function createComponent (buildComponentDomTree, initialState, tagName = 'div') {
    let component = null;

    function handleCreate (event) {
      component.isFirstDraw = true;
      componentsStates.set(event.dom, { ...initialState });
      draw(event);
    }

    function handleUpdate (event) {
      componentsStates.set(event.dom, { ...componentsStates.get(event.dom), ...initialState });
      draw(event);
    }

    function handleDelete (event) {
      minthril.render(event.dom, '');
    }

    function draw (event) {
      const componentState = componentsStates.get(event.dom);
      const dom = buildComponentDomTree(componentState, draw.bind(null, { dom: event.dom }), component);
      component.isFirstDraw = false;
      minthril.render(event.dom, dom);
    }

    component = minthril(tagName, { oncreate: handleCreate, onupdate: handleUpdate, ondelete: handleDelete });

    return component;
  }

  return createComponent;
};

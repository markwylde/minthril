minthril
========

## What is Minthril?

A modern client-side Javascript library for building web user interfaces. It's small, fast and minimal.

Minthril is based on the rendering section from an amazing library called [mithril.js](https://github.com/MithrilJS/mithril.js). Out of the box, the original library offers a lot of features, and this project attempts to strip down those features to the core dom diffing functionality.

## Installation
### npm

```bash
npm install minthril --save
```

### Simple Example
```javascript
const minthril = require('minthril');
const m = minthril;

document.addEventListener('DOMContentLoaded', function () {
  const container = document.body

  const ui = m('div',
    m('h1', 'Testing'),
    m('p', 'This is a test.')
  )

  minthril.render(container, ui);

  setTimeout(function () {
    const updatedUi = m('div',
      m('h1', 'Testing'),
      m('p', 'This line has changed changed.')
    )

    minthril.render(container, updatedUi);
  }, 500);
});
```

### Creating stateful components
```javascript
function infoBox (options) {
  const state = {
    message: options.message
  }

  function handleClick () {
    state.expanded = !state.expanded;
    minthril.redraw(); // or your app.emitStateChanged();
  }

  return {
    view: () => {
      return html`
        <div>
          <button onclick=${handleClick}>Toggle</button>
          <div ${state.expanded ? '' : 'hidden'}>
            ${state.message}
          </div>
        </div>
      `;
    }
  }
};

const ui = m('div',
  m('h1', 'Testing'),
  m(infoBox, {message: 'my test message'})
);
```

### Example with Hyperx
```javascript
const minthril = require('minthril');
const html = require('hyperx')(minthril);

document.addEventListener('DOMContentLoaded', function () {
  const container = document.body

  const ui = html`
    <div>
      <h1>Testing</h1>
      <p>This is a test.</p>
    </div>
  `;

  minthril.render(container, ui);

  setTimeout(function () {
    const updatedUi = html`
      <div>
        <h1>Testing</h1>
        <p>This line has changed changed.</p>
      </div>
    `;

    minthril.render(container, updatedUi);
  }, 500);
});
```

A great place to start is the [example](./example) folder that's included with this project.

For a full example checkout the minthril example repo:

https://github.com/markwylde/minthril-demo

## Documentation

You may be interested in the [API Docs](./docs/render.md).

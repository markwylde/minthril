const minthril = require('../');
const html = require('hyperx')(minthril);

function infoBox ({ attrs }) {
  const state = {};

  function handleClick () {
    state.expanded = !state.expanded;
    window.redraw();
  }

  return {
    view: () => {
      return html`
        <div>
          <button onclick=${handleClick}>Toggle</button>
          <div ${state.expanded ? '' : 'hidden'}>
            ${attrs.message}
          </div>
        </div>
      `;
    }
  };
}

document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('app');

  var i = 0;

  let inputValue = '';

  function handleKeyUp (e) {
    inputValue = e.target.value;
    window.redraw();
  }
  window.redraw = () => {
    i = i + 1;
    const newVnode = html`
      <div class="yes" amazing="testing">
        <h1>Testing (two)</h1>
        <input onkeyup=${handleKeyUp}/>
        <p>InputValue: ${inputValue}</p>
        <p>Redrawed: ${i}</p>
        ${minthril(infoBox, { message: 'hello there' })}
      </div>
    `;

    minthril.render(container, newVnode);
  };

  window.redraw();
});

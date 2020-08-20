const minthril = require('../');
const html = require('hyperx')(minthril);

function clickeroo (prefix) {
  return function () {
    console.log(prefix, 'Hello  there');
  };
}

function infoBox (options) {
  return minthril.createComponent(function (state, draw) {
    function handleClick () {
      state.expanded = !state.expanded;
      draw();
    }

    return html`
      <div>
        <button onclick=${handleClick}>Toggle</button>
        <div ${state.expanded ? '' : 'hidden'}>
          ${state.message}
        </div>
      </div>
    `;
  }, { message: options.message });
}

document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('app');

  var vnode = html`
    <div>
      <h1>.Testing</h1>
      <button oninput=${clickeroo('one')}>CLICK ME</button>
      <p>This is a test</p>
    </div>
  `;

  minthril.render(container, vnode);

  var i = 0;

  let inputValue = 'abc';
  setInterval(function () {
    i = i + 1;
    const newVnode = html`
      <div class="yes" amazing="testing">
        <h1>.Testing (two)</h1>
        <button onclick=${clickeroo('two')}>CLICK ME</button>
        <input onkeyup=${(e) => { inputValue = e.target.value; }}/>
        <p>InputValue: ${inputValue}</p>
        <p>This is another test ${i}</p>
        ${infoBox({ message: 'hello there' })}
      </div>
    `;

    minthril.render(container, newVnode);
  }, 500);
});

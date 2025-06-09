const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const uiLayer = document.getElementById('ui-layer');

let currentState = null;
let lastTimestamp = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (currentState && currentState.onResize) {
        currentState.onResize();
    }
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function switchState(newState) {
    if (currentState && currentState.cleanup) {
        currentState.cleanup();
    }
    uiLayer.innerHTML = '';
    currentState = newState;
    if (currentState.init) currentState.init();
}

function gameLoop(timestamp) {
    const delta = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;
    if (currentState && currentState.update) currentState.update(delta);
    if (currentState && currentState.render) currentState.render(ctx);
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

// Start with menu
switchState(MenuState);

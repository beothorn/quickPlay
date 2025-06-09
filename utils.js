// Utility for fading transitions
function fadeOut(element, duration = 500) {
    element.style.transition = `opacity ${duration}ms`;
    element.style.opacity = 0;
}

function fadeIn(element, duration = 500) {
    element.style.transition = `opacity ${duration}ms`;
    element.style.opacity = 1;
}

const MenuState = {
    init() {
        const menuDiv = document.createElement('div');
        menuDiv.className = 'menu fade';

        const title = document.createElement('h1');
        title.textContent = 'MiniGame Collection';
        menuDiv.appendChild(title);

        const btn1 = document.createElement('button');
        btn1.textContent = '1. Swinging Target Game';
        btn1.addEventListener('click', () => switchState(SwingingTargetGame));
        menuDiv.appendChild(btn1);

        const btn2 = document.createElement('button');
        btn2.textContent = '2. Break the Rock (coming soon)';
        menuDiv.appendChild(btn2);

        const btn3 = document.createElement('button');
        btn3.textContent = '3. Turn the Motor On (coming soon)';
        menuDiv.appendChild(btn3);

        uiLayer.appendChild(menuDiv);
        requestAnimationFrame(() => menuDiv.style.opacity = 1);
    },
    update() {},
    render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    cleanup() {
        const menuDiv = uiLayer.querySelector('.menu');
        if (menuDiv) menuDiv.style.opacity = 0;
    }
};

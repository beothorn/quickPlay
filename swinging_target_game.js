const SwingingTargetGame = {
    angle: 0,
    time: 0,
    score: 0,
    swings: 0,
    maxSwings: 5,
    hitFlash: 0,

    init() {
        this.angle = 0;
        this.time = 0;
        this.score = 0;
        this.swings = 0;
        this.hitFlash = 0;
        this.bindEvents();
        this.createUI();
    },

    bindEvents() {
        this.onInput = this.handleInput.bind(this);
        window.addEventListener('keydown', e => {
            if (e.code === 'Space') this.onInput();
        });
        canvas.addEventListener('touchstart', this.onInput);
        canvas.addEventListener('mousedown', this.onInput);
    },

    createUI() {
        const backBtn = document.createElement('button');
        backBtn.textContent = 'Back to Menu';
        backBtn.addEventListener('click', () => switchState(MenuState));
        backBtn.style.position = 'absolute';
        backBtn.style.top = '10px';
        backBtn.style.left = '10px';
        uiLayer.appendChild(backBtn);
    },

    handleInput() {
        const offsetDeg = Math.abs(this.angle * 180 / Math.PI);
        let pts = 0;
        if (offsetDeg < 2) pts = 100;
        else if (offsetDeg < 5) pts = 75;
        else if (offsetDeg < 10) pts = 50;
        this.score += pts;
        this.hitFlash = 0.2;
    },

    update(dt) {
        this.time += dt;
        this.angle = 0.5 * Math.sin(this.time * 2.5);
        if (Math.sign(Math.sin((this.time - dt) * 2.5)) !== Math.sign(Math.sin(this.time * 2.5))) {
            this.swings++;
            if (this.swings >= this.maxSwings) {
                this.endGame();
            }
        }
        if (this.hitFlash > 0) this.hitFlash -= dt;
    },

    render(ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);

        // draw center line
        ctx.strokeStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(-canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, 0);
        ctx.stroke();

        // draw target
        const swingRadius = Math.min(canvas.width, canvas.height) / 4;
        const x = swingRadius * Math.sin(this.angle);
        const y = -swingRadius * Math.cos(this.angle);
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fillStyle = this.hitFlash > 0 ? '#0f0' : '#f00';
        ctx.fill();

        ctx.restore();

        // score
        ctx.fillStyle = '#fff';
        ctx.font = '24px Arial';
        ctx.fillText(`Score: ${this.score}`, 20, 30);
        ctx.fillText(`Swing: ${this.swings}/${this.maxSwings}`, 20, 60);
    },

    endGame() {
        ctx.fillStyle = '#000a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const resultDiv = document.createElement('div');
        resultDiv.className = 'menu fade';
        resultDiv.innerHTML = `<h2>Round Over</h2><p>Total Score: ${this.score}</p>`;
        const againBtn = document.createElement('button');
        againBtn.textContent = 'Play Again';
        againBtn.addEventListener('click', () => switchState(SwingingTargetGame));
        const menuBtn = document.createElement('button');
        menuBtn.textContent = 'Back to Menu';
        menuBtn.addEventListener('click', () => switchState(MenuState));
        resultDiv.appendChild(againBtn);
        resultDiv.appendChild(menuBtn);
        uiLayer.appendChild(resultDiv);
    },

    cleanup() {
        uiLayer.innerHTML = '';
        canvas.removeEventListener('touchstart', this.onInput);
        canvas.removeEventListener('mousedown', this.onInput);
    }
};

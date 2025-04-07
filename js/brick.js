class Brick {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = this.getRandomColor();
        this.element = this.createBrickElement();
    }

    getRandomColor() {
        const colors = [
            '#00c4d7',
            '#00e5ff',
            '#00b0bf',
            '#00a3c6',
            '#2196F3', 
            '#00d4ff',
            '#00d0e6',
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    createBrickElement() {
        const brick = document.createElement('div');
        brick.classList.add('brick');
        brick.style.width = `${this.width}%`;
        brick.style.height = `${this.height}%`;
        brick.style.backgroundColor = this.color;
        brick.style.left = `${this.x}%`;
        brick.style.top = `${this.y}%`;
        return brick;
    }

    render(gameArea) {
        gameArea.appendChild(this.element);
    }

    destroy() {
        if (this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}
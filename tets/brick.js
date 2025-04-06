class Brick {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.element = this.createBrickElement();
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
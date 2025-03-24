class Brick {
    constructor(x, y, width = 60, height = 20, color = '#33cc33') {
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
        brick.style.width = `${this.width}px`;
        brick.style.height = `${this.height}px`;
        brick.style.backgroundColor = this.color;
        brick.style.position = 'absolute';
        brick.style.left = `${this.x}px`;
        brick.style.top = `${this.y}px`;
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
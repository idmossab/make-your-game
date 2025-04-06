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
            '#FF5252', // Red
            '#FF9800', // Orange
            '#FFEB3B', // Yellow
            '#4CAF50', // Green
            '#2196F3', // Blue
            '#9C27B0', // Purple
            '#00BCD4', // Cyan
            '#E91E63'  // Pink
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
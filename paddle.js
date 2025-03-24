class Paddle {
    constructor(element, speed, gameArea) {
        this.element = element;
        this.speed = speed;
        this.gameArea = gameArea;
    }

    move(event) {
        if (event.key === 'ArrowLeft') {
            let newLeft = this.element.offsetLeft - this.speed
            if (newLeft > this.speed) {
                this.element.style.left = newLeft + 'px'
            }
        } else if (event.key === 'ArrowRight') {
            let newLeft = this.element.offsetLeft + this.speed
            if (newLeft + this.element.offsetWidth <= this.gameArea.with + this.speed * 3) {
                this.element.style.left = newLeft + 'px'
            }
        }
    }
}
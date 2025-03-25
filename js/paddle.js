class Paddle {
    constructor(element, speed, gameAreaElement) {
        this.element = element;
        this.speed = speed;
        this.gameAreaElement = gameAreaElement;
    }

    move(event) {
        const gameArea = this.gameAreaElement.getBoundingClientRect();

        if (event.key === 'ArrowLeft') {
            let newLeft = this.element.offsetLeft - this.speed
            if (newLeft > this.speed) {
                this.element.style.left = newLeft + 'px'
            }
        } else if (event.key === 'ArrowRight') {
            let newLeft = this.element.offsetLeft + this.speed
            if (newLeft + this.element.offsetWidth <= gameArea.width + (this.speed * 3)) {
                this.element.style.left = newLeft + 'px'
            }
        }
    }
}
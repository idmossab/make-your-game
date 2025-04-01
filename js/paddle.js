class Paddle {
    constructor(element, speed, gameAreaElement) {
        this.element = element;
        this.speed = speed;
        this.gameAreaElement = gameAreaElement;
    }

    move(event) {
        const gameArea = this.gameAreaElement.getBoundingClientRect();
        const element1 = this.element.getBoundingClientRect();

        if (event.key === "ArrowLeft") {
            let newLeft = this.element.offsetLeft - this.speed;
            if (newLeft >= element1.width / 2) {
                this.element.style.left = newLeft + "px";
            }
        } else
        if (event.key === "ArrowRight") {
            let newLeft = this.element.offsetLeft + this.speed;
            // console.log(newLeft, this.speed, element1.width, gameArea.width)

            if (newLeft <= gameArea.width - element1.width / 2) {
                this.element.style.left = newLeft + "px";
            }
        }
        animationIdPaddle = requestAnimationFrame(() => this.move(event));
    }
}
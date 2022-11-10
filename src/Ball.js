import { CollisionDetection } from "./CollisionDetection.js"

export default class Ball {
    constructor(game) {
        this.image = document.getElementById("ball")
        this.size = 30
        this.baseSpeed = 5

        this.gameWidth = game.gameWidth
        this.gameHeight = game.gameHeight

        this.game = game
        this.resetPosition()
    }

    resetPosition() {
        const regulatedSpeed = this.baseSpeed > 8 ? 8 : this.baseSpeed
        this.speed = {
            x: regulatedSpeed,
            y: -regulatedSpeed
        }
        this.position = {
            x: this.game.gameWidth / 2, y: 500
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size)
    }

    update() {
        this.position.x += this.speed.x
        this.position.y += this.speed.y

        //wall on right and left
        if (this.position.x + this.size > this.gameWidth || this.position.x < 0) this.speed.x = -this.speed.x
        //wall on top
        if (this.position.y < 0) this.speed.y = -this.speed.y
        //wall on bottom
        if (this.position.y + this.size > this.gameHeight) {
            this.game.lives--
            this.resetPosition()
        }

        if (CollisionDetection(this, this.game.paddle)) {
            this.speed.y = -this.speed.y
            this.position.y = this.game.paddle.position.y - this.size
        }
    }
}
import { CollisionDetection } from "./CollisionDetection.js"

export default class Brick {
    constructor(game, position) {
        this.image = document.getElementById("brick")
        this.width = 90
        this.height = 30
        this.position = position
        this.markedForDeletion = false

        this.game = game
    }
    update() {
        if (CollisionDetection(this.game.ball, this)) {
            this.game.ball.speed.y *= -1
            this.markedForDeletion = true
            this.game.score++
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

}
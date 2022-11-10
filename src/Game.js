import Paddle from "./Paddle.js";
import InputHandler from "./InputHandler.js";
import Ball from "./Ball.js";
import { buildLevel, LevelDesign } from "./Levels.js";
import { ScreenStyle, TextStyle } from "./ScreenStyle.js";

const GAME_STATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4
}

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.GAME_STATE = GAME_STATE

        this.gamestate = GAME_STATE.MENU
        this.paddle = new Paddle(this)
        this.ball = new Ball(this)
        this.gameObjects = []
        this.bricks = []
        this.lives = 3
        this.level = 1
        this.score = 0

        new InputHandler(this.paddle, this)
    }

    start() {
        if (this.gamestate !== GAME_STATE.MENU && this.gamestate !== GAME_STATE.NEWLEVEL) return

        this.gamestate = GAME_STATE.RUNNING
        this.bricks = buildLevel(this, LevelDesign(this))

        this.gameObjects = [this.paddle, this.ball]
        this.ball.resetPosition()
    }

    update(deltaTime) {
        if (this.lives === 0) this.gamestate = GAME_STATE.GAMEOVER
        if (this.gamestate === GAME_STATE.PAUSED || this.gamestate === GAME_STATE.MENU || this.gamestate === GAME_STATE.GAMEOVER) return
        [...this.gameObjects, ...this.bricks].forEach(obj => obj.update(deltaTime))

        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion)

        if (this.bricks.length === 0) {
            this.gamestate = GAME_STATE.NEWLEVEL
            this.level++
            this.start()
        }

        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
        document.documentElement.style.setProperty("--hue", hue + deltaTime * 0.01)
    }

    draw(ctx) {
        [...this.gameObjects, ...this.bricks].forEach(obj => obj.draw(ctx))

        TextStyle(ctx, `Lives: ${this.lives}`, 70)
        TextStyle(ctx, `Level: ${this.level}`, this.gameWidth / 2)
        TextStyle(ctx, `Score: ${this.score}`, this.gameWidth - 70)

        const gameDimensions = { gameWidth: this.gameWidth, gameHeight: this.gameHeight }

        switch (this.gamestate) {
            case GAME_STATE.PAUSED:
                ScreenStyle(ctx, "rgba(0,0,0,0.4)", "Paused", gameDimensions)
                break;
            case GAME_STATE.MENU:
                ScreenStyle(ctx, "#1F1D36", "Press Spacebar to start", gameDimensions)
                break;
            case GAME_STATE.GAMEOVER:
                ScreenStyle(ctx, "#1F1D36", "Game Over", gameDimensions,this.score)
                break;
        }
    }

    togglePause() {
        if (this.gamestate === GAME_STATE.PAUSED) {
            this.gamestate = GAME_STATE.RUNNING
        } else {
            this.gamestate = GAME_STATE.PAUSED
        }
    }

    gameover() {
        this.gamestate = this.GAME_STATE.MENU
        this.lives = 3
        this.score = 0
        this.level = 1
    }
}
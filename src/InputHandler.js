
export default class InputHandler {
    constructor(paddle, game) {
        document.addEventListener("keydown", e => {
            switch (e.key) {
                case "a":
                case "ArrowLeft":
                    paddle.moveLeft()
                    break
                case "d":
                case "ArrowRight":
                    paddle.moveRight()
                    break
                case " ":
                    if (game.gamestate === game.GAME_STATE.GAMEOVER) game.gameover()
                    game.start()
                    break
            }
        })

        document.addEventListener("keyup", e => {
            switch (e.key) {
                case "a":
                case "ArrowLeft":
                    if (paddle.speed < 0)
                        paddle.stop()
                    break
                case "d":
                case "ArrowRight":
                    if (paddle.speed > 0)
                        paddle.stop()
                    break
                case "Escape":
                    game.togglePause()
                    break
            }
        })
    }
}
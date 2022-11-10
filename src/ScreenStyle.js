export const ScreenStyle = (ctx, fillStyle, fillText, { gameWidth, gameHeight }, score) => {
    ctx.rect(0, 0, gameWidth, gameHeight)
    ctx.fillStyle = fillStyle
    ctx.fill()

    ctx.font = "30px Arial"
    ctx.fillStyle = "#fff"
    ctx.textAlign = "center"
    ctx.fillText(fillText, gameWidth / 2, gameHeight / 2)
    if (score) ctx.fillText(`Score: ${score}`, gameWidth / 2, gameHeight / 2 + 38)
}

export const TextStyle = (ctx, fillText, width) => {
    ctx.font = "30px Arial"
    ctx.fillStyle = "#000"
    ctx.fillText(fillText, width, 40)
}


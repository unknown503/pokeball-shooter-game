export function CollisionDetection(ball, gameObject) {
    const topOfBall = ball.position.y
    const bottomOfBall = ball.position.y + ball.size

    const topOfObject = gameObject.position.y
    const bottomOfObject = gameObject.position.y + gameObject.height
    const leftOfObject = gameObject.position.x
    const rightOfObject = gameObject.position.x + gameObject.width

    if (bottomOfBall >= topOfObject && topOfBall <= bottomOfObject && ball.position.x >= leftOfObject && ball.position.x + ball.size <= rightOfObject) {
        return true
    } else {
        return false
    }
}
import Brick from './Brick.js'
import BrickObj from './BrickProps.js'

export function buildLevel(game, level) {
    let bricks = []
    const topSpace = 60

    level.forEach((row, rowIndex) => {
        row.forEach((brick, brickIndex) => {
            if (brick === 1) {
                let position = {
                    x: BrickObj.width * brickIndex,
                    y: topSpace + BrickObj.height * rowIndex
                }
                bricks.push(new Brick(game, position))
            }
        });
    });
    return bricks
}

export const LevelDesign = (game) => {
    let array = []
    const rows = 10
    
    const blocksPerRow = Math.floor(game.gameWidth / BrickObj.width)
    for (let i = 0; i < rows; i++) {
        let inside = []
        for (let j = 0; j < blocksPerRow; j++) {
            inside.push(Math.random() < 0.5 ? 0 : 1)
        }
        array.push(inside)
    }
    return array
}
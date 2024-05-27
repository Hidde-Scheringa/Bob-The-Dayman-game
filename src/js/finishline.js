import { Actor, Keys, Vector, CollisionType } from "excalibur"
import { Resources } from './resources'

export class Finishline extends Actor {
    constructor(x, y) {
        super({ width: Resources.Finishline.width, height: Resources.Finishline.height })
        this.pos = new Vector(x, y)
        this.body.collisionType = CollisionType.Fixed;
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Finishline.toSprite());
        this.scale = new Vector(0.17, 0.23)

    }
}
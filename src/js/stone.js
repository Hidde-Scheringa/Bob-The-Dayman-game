import { Actor, Keys, Vector, CollisionType } from "excalibur"
import { Resources } from './resources'

export class Stonewall extends Actor {
    constructor(x, y) {
        super({ width: Resources.Stonewall.width, height: Resources.Stonewall.height })
        this.pos = new Vector(x, y)
        this.body.collisionType = CollisionType.Fixed;
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Stonewall.toSprite());
        this.scale = new Vector(.30, .30)

    }
}
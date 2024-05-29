import { Actor, Keys, SpriteSheet, Vector, Animation, range, CollisionType, Engine } from "excalibur"
import { Resources } from './resources'

export class Hat extends Actor {

    onInitialize(engine) {
        this.graphics.use(Resources.Daymanhat.toSprite());
        this.scale = new Vector(0.15, 0.15)
    }
}
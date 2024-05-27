import { Actor, Keys, SpriteSheet, Vector, Animation, range, CollisionType } from "excalibur"
import { Resources } from './resources'

export class Spikes extends Actor {
    constructor(x,y){
        super({ width: 250, height: Resources.Spikes.height })
        this.pos = new Vector(x, y)
    }
    onInitialize(){
        this.graphics.use(Resources.Spikes.toSprite());
        this.scale = new Vector(0.3,0.3)
    }
}
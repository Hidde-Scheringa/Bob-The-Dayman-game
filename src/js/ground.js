import { Actor, Keys, Vector, CollisionType } from "excalibur"
import { Resources } from './resources'

export class Ground extends Actor {
    constructor(x,y){
        super({ width: Resources.Grasstile.width, height: Resources.Grasstile.height })
        this.pos = new Vector(x,y)
        this.body.collisionType = CollisionType.Fixed;
    }

    onInitialize(engine){
            this.graphics.use(Resources.Grasstile.toSprite());
            this.scale = new Vector(1.5,1.8)
            
    }
}
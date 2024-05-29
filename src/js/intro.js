import { Actor, Keys, Vector, CollisionType, Scene, Input } from "excalibur"
import { Resources } from './resources'

export class Intro extends Scene {
    onInitialize(){
        
        const background = new Actor({
            pos: new Vector(765, 362.5),
            width: 800,
            height: 600,
            scale: new Vector(1.3, 1.3)
        });

        background.graphics.use(Resources.Introscreen.toSprite())

        this.add(background);
    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Input.Keys.Enter)) {
            engine.goToScene('level');
        }
    }

        

    
}
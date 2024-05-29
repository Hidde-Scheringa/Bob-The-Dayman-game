import { Actor, Keys, SpriteSheet, Vector, Animation, range, Label, Engine } from "excalibur"
import { Resources } from './resources'
import { Hero } from "./hero.js"
import { Game } from "./game.js"

export class Coin extends Actor {
    
    
    

    constructor(x, y) {
        super({ width: 50, height: 50 }) //hitbox
        const runSheet = SpriteSheet.fromImageSource({
            image: Resources.Coin,
            grid: { rows: 5, columns: 14, spriteWidth: 52.81, spriteHeight: 45 }
            
        })
        
        const idle = Animation.fromSpriteSheet(runSheet, range(0, 14), 78)
        this.graphics.add("idle", idle)
        this.graphics.use(idle)
        this.pos = new Vector(x, y)
    }
       
    onInitialize(engine) {
        this.on("exitviewport", () => this.resetPosition())
        this.on('collisionstart', (event) => this.collectCoin(event))
        console.log(this.events);
        this.scale = new Vector(.8, .8)
    }

    resetPosition() {
        this.scene.engine.currentScene.scoreUpdate()
    }

    collectCoin(event) {
        const target = event.other;
        if (target instanceof Hero) {
            console.log('Je hebt een coin gepakt')
            this.scene.engine.currentScene.addScore();
            this.kill()
        }
    }
            
            
            
           
    

        



}
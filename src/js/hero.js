import { Actor, Keys, SpriteSheet, Vector, Animation, range, CollisionType, Engine} from "excalibur"
import { Resources } from './resources'
import { Spikes } from "./spikes"
import { Ground } from "./ground"
import { Stonewall } from "./stone"
import { Finishline } from "./finishline.js";

export class Hero extends Actor {
    constructor (){
        super({ width: 60, height: 110 })
        const runSheet = SpriteSheet.fromImageSource({
            image: Resources.Hero,
            grid: {rows: 19, columns: 16, spriteWidth: 128, spriteHeight: 128}, 
        })
        const idle = runSheet.sprites[0] 
        const runRight = Animation.fromSpriteSheet(runSheet, range(0, 7), 80)
        const jump = Animation.fromSpriteSheet(runSheet, range(0, 8), 80)
        const dead = Animation.fromSpriteSheet(runSheet, range(9, 9), 80)
        const runleft = runRight.clone();
        runleft.flipHorizontal = true

        this.graphics.add("idle", idle)
        this.graphics.add("runright", runRight)
        this.graphics.add("runleft", runleft)
        this.graphics.add("jump", jump)
        this.graphics.add("dead", dead)
        this.graphics.use(idle)
        this.body.collisionType = CollisionType.Active;
        this.isJumping = false;
        this.isPlayingDeathAnimation = false;
    }
    
    onInitialize(engine) {
        this.pos = new Vector(100, 615)
        this.vel = new Vector(0, 0)
        this.on('collisionstart', (event) => this.collisionHandler(event))
        console.log(this.events);
       
    }

    collisionHandler(event) {
        if (event.other instanceof Ground || event.other instanceof Stonewall || event.other instanceof Finishline) {
            console.log('je raakt gras, stenen muur of de finishline');
            this.isJumping = false;
        } else if (event.other instanceof Spikes) {
            console.log('hit spikes');
            this.graphics.use('dead')
            this.playDeathAniBeforeKill();
        }
    }

    playDeathAniBeforeKill(){
        this.isPlayingDeathAnimation = true;
        setTimeout(() => {
            this.kill();
        }, 2000);
    }
            
   
    onPreUpdate(engine) {

        let xspeed = 0
        let yspeed = this.vel.y

        if (this.isPlayingDeathAnimation) {
            xspeed = 0
            yspeed = 0
            return
        }
        
        this.graphics.use('idle')

        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -110
            this.graphics.use('runleft')
        }
        if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = 110
            this.graphics.use('runright')
        }
        if (!this.isJumping && engine.input.keyboard.wasPressed(Keys.W) || engine.input.keyboard.wasPressed(Keys.Up)) {
            yspeed = -500
            this.graphics.use('jump')
            this.isJumping = true
        }
            
        

        this.vel = new Vector(xspeed, yspeed)
    }
}
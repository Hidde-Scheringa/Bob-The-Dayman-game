import { Actor, Keys, SpriteSheet, Vector, Animation, range, CollisionType, Engine} from "excalibur"
import { Resources } from './resources'
import { Spikes } from "./spikes"
import { Ground } from "./ground"
import { Stonewall } from "./stone"
import { Finishline } from "./finishline.js";
import { Intro } from "./intro.js";
import { Endscene } from "./endscene.js";
import { Hat } from "./hat.js";

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
        
        const hat = new Hat()
        
        

        this.body.collisionType = CollisionType.Active;

        this.isJumping = false;
        this.isPlayingDeathAnimation = false;
    }
    
    onInitialize(engine) {
        this.pos = new Vector(100, 615)
        this.vel = new Vector(0, 0)
        this.on('collisionstart', (event) => this.collisionHandler(event, engine))
        console.log(this.events);
        this.hat = new Hat()
        this.addChild(this.hat)
    }
       

    collisionHandler(event, engine) {
        if (event.other instanceof Ground || event.other instanceof Stonewall) {
            console.log('je raakt gras of een stenen muur');
            this.isJumping = false;
        } else if (event.other instanceof Finishline){
            console.log('je raakt de finishline');
            this.isJumping = false;
            engine.goToScene('endscene');
            this.kill()
            this.hat.kill
        }
         else if (event.other instanceof Spikes) {
            console.log('hit spikes');
            this.graphics.use('dead')
            this.playDeathAniBeforeKill( engine);
            this.hat.kill()
        }
    }

    playDeathAniBeforeKill(engine){
        this.isPlayingDeathAnimation = true;
        setTimeout(() => {
            this.kill();
            engine.goToScene('intro');
        }, 2000);
    }
            
   
    onPreUpdate(engine) {

        let xspeed = 0
        let yspeed = this.vel.y
        this.hat.graphics.current.flipHorizontal = false
        

        if (this.isPlayingDeathAnimation) {
            xspeed = 0
            yspeed = 0
            return
        }

        if (xspeed === 0) {
            this.hat.pos = new Vector(0, -58)
        }
        
        this.graphics.use('idle')

        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -110
            this.graphics.use('runleft')
            if (this.hat) {
                this.hat.graphics.current.flipHorizontal = true
                this.hat.pos = new Vector (-4, -58)
            }
        }
        if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = 110
            this.graphics.use('runright')
            if (this.hat) {
                this.hat.graphics.current.flipHorizontal = false
                this.hat.pos = new Vector(4, -58)
            }
        }
        if (!this.isJumping && engine.input.keyboard.wasPressed(Keys.W) || !this.isJumping && engine.input.keyboard.wasPressed(Keys.Up)) {
            if (yspeed === 0) {
                yspeed = -500
                this.graphics.use('jump')
                this.isJumping = true
            }
        }
            
            
            
        

        this.vel = new Vector(xspeed, yspeed)
    }
}
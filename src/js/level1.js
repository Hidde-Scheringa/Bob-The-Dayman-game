import '../css/style.css'
import { Actor, Engine, Vector, Label, Font, FontUnit, SolverStrategy, Scene } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { vector } from 'excalibur/build/dist/Util/DrawUtil.js'
import { Hero } from './hero.js';
import { Ground } from './ground.js';
import { Spikes } from './spikes.js';
import { Coin } from "./coin.js"
import { Stonewall } from './stone.js';
import { Finishline } from "./finishline.js";


export class Level1 extends Scene {


    mylabel
    coins = []
    score = 0

    spawnHero() {
        const hero = new Hero();
        this.add(hero);
    }

    spawnGround(amount = 5, startX = 0, startY = 700, spacing = 52.5) {
        for (let i = 0; i < amount; i++) {
            const ground = new Ground(startX + i * spacing, startY);
            this.add(ground);
        }
    }


    spawnVerticalGround(amount = 2, startX = 600, startY = 394, spacing = 52.5) {
        for (let i = 0; i < amount; i++) {
            const StoneWall = new Stonewall(startX, i * spacing + startY);
            this.add(StoneWall);
        }
    }

    spawnSpikes(amount = 15, startX = 285, startY = 700, spacing = 98.7) {
        for (let i = 0; i < amount; i++) {
            const spikes = new Spikes(startX + i * spacing, startY);
            this.add(spikes);
        }
    }

    spawnVerticalSpikes(amount = 2, startX = 955, startY = 477, spacing = 90, rotation = Math.PI / 2) { // math.pi/2 is punten naar rechts en -2 naar links.
        for (let i = 0; i < amount; i++) {
            const spikes = new Spikes(startX, i * spacing + startY);
            spikes.rotation = rotation;
            this.add(spikes);
        }
    }

    spawnCoin(x, y) {
        const coin = new Coin(x, y)
        this.add(coin);
        this.coins.push(coin)
    }

    addScore() {
        this.score++
        this.mylabel.text = `Score: ${this.score}`
    }

    spawnFinishLine(amount = 0, startX = 0, startY = 0, spacing = 0) {
        for (let i = 0; i < amount; i++) {
            const finishline = new Finishline(startX + i * spacing, startY);
            this.add(finishline);
        }
    }

    spawnCoins(){
        this.spawnCoin(200, 620); // de eerste coin van het level
        this.spawnCoin(40, 80) //coin links boven op het platform
        this.spawnCoin(90, 80) //coin links boven op het platform
        this.spawnCoin(140, 80) //coin links boven op het platform
        this.spawnCoin(190, 80) //coin links boven op het platform
        this.spawnCoin(240, 80) //coin links boven op het platform
        this.spawnCoin(290, 80) //coin links boven op het platform
        this.spawnCoin(340, 80) //coin links boven op het platform
        this.spawnCoin(950, 330) // coin boven de 2 stenen muur
        this.spawnCoin(1230, 50)
        this.spawnCoin(600, 320) //  de coin die op de tweede stenenmuur staat.
        this.spawnCoin(1050, 570)
        this.spawnCoin(1200, 470) // de coin die op de laatste stenen muur staat
        this.spawnCoin(1430, 610)
    }

    spawnedElements() {
        
        
        this.spawnGround(); // het start platform
        this.spawnGround(2, 310, 600, 52.5) // de 2 zwevende blokken aan het begen van het level.
        this.spawnGround(8, 495, 505, 52.5) // platform waar de spikes bovenop staan
        this.spawnGround(1, 750, 290, 52.5) // blok boven het spike platform
        this.spawnGround(1, 585, 160,) //het platform om de sprong naar het grote platform links boven te komen
        this.spawnGround(9, -28, 139, 52.5) //platform linksboven
       
        this.spawnGround(2, 890, 399, 52.5) //de blokken boven de 2e stenen muur
        
        this.spawnVerticalSpikes()
        this.spawnGround(4, 1215, 540,)


        this.spawnGround(1, 1500, 400,)
        this.spawnGround(1, 1350, 265,)
        this.spawnGround(3, 1125, 120,)

        this.spawnSpikes(1, 1150, 65, 80)
        
        this.spawnSpikes(); // de spikes die over de gele onderkant van de map lopen
        this.spawnVerticalGround(5, 1366, 600,)
        this.spawnVerticalGround(20, 1564, 0)
        this.spawnVerticalGround(20, -35, 0,)

        this.spawnVerticalSpikes(3, 1490, 480, 98.7, Math.PI / -2)
        this.spawnVerticalGround(5, 1540, 460,)
        this.spawnVerticalGround(2, 1431, 680)
        
        this.spawnVerticalGround(2, 1496, 680)
        this.spawnGround(30, 0, 760, 52.5); //grond onder de spikes
        this.spawnSpikes(1, 580, 450, 98.7); // de spike die links van de 1e stenenmuur staat
        this.spawnSpikes(3, 627, 450, 98.7) // spikes die rechts van de eerste stenen muur staan boven op het platform
        this.spawnVerticalGround(); // de eerste stenenmuur
        
        this.spawnVerticalGround(5, 897, 458, 47); // de tweede stenenmuur
        this.spawnGround(5, 956, 646,)
        
        this.spawnVerticalGround(7, 1200, 540, 60) // de derde stenenmuur
        this.spawnVerticalSpikes(1, 1142, 565, 100, Math.PI / -2)
        
        this.spawnGround(3, 1490, 140)
        this.spawnFinishLine(1, 1510, 120,)
    }

    onInitialize(engine) {
        console.log("initializing game");

        this.spawnedElements();
        console.log("start de game!")
        this.score
        this.mylabel = new Label({
            text: `SCORE: ${this.score}`,
            pos: new Vector(10, 10),
            font: new Font({
                family: 'impact',
                unit: FontUnit.Px,
                size: 40,
            })
        })
        this.add(this.mylabel)
    }

    onActivate(ctx) {
        console.log("the game has switched to this level. player already exists. reset score to 0")
        this.spawnHero();
        for (const coin of this.coins) {
            coin.kill()
        }

        this.spawnCoins();

        
        this.score = 0
        this.mylabel.text = `Score: ${this.score}`
    }

    
}









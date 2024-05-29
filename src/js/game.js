import '../css/style.css'
import { Actor, Engine, Vector, Label, Font, FontUnit, SolverStrategy, } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Level1} from './level1.js'
import { Intro } from './intro.js'
import { Endscene } from "./endscene.js";




export class Game extends Engine {

        
    constructor() {
        const options = {
            width: 1530, height: 725,
            physics: { solver: SolverStrategy.Arcade, gravity: new Vector(0, 800), }
        };

        super(options)
        this.options
        this.score = 0;
        this.start(ResourceLoader).then(() => this.startGame())
    }
        
        


    onInitialize(engine) {
        
    }

    startGame() {

        console.log("Starting game");
        this.add('intro', new Intro)
        this.add('level', new Level1)
        this.add('endscene', new Endscene)
        this.goToScene('intro');

    }

}
    


new Game()
        

    

        

        
        


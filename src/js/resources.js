import { ImageSource, Sound, Resource, Loader } from 'excalibur'

const Resources = {
    Hero: new ImageSource('images/char_pink_full.png'),
    Grasstile: new ImageSource('images/grass_tile.png'),
    Spikes: new ImageSource('images/spikes.png'),
    Coin: new ImageSource('images/coin_sprite.png'),
    Stonewall: new ImageSource('images/stone-tile.jpg'),
    Finishline: new ImageSource('images/finishline-tile.jpg')
    

}

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader }
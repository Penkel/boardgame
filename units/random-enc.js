import { randomEl } from "../utilities.js";
import GameObject from "./game-obj.js";

export default class RandomEnc extends GameObject {
    constructor(x, y) {
        super(x,y, 'random.jpg', 'Случайная Встреча', 0)
        this.id = Math.random()* this.position.x
        this.game
        this.respawning = true
    }

    action() {
        for (let player of this.game.players) {
            if(player.position.x == this.position.x && player.position.y == this.position.y) {
                this.giveEnc(player);
                break
            }
        };
    }

    giveEnc(player) {
        this.removeObject()
        console.warn(this.game.rngEnc)
        let unit = randomEl(this.game.rngEnc)
        console.log(unit)
        unit.placeObject(player.position.x, player.position.y)
        this.game.encounter.startEnc(player, unit)
    }
}
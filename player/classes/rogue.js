import Stats from "../../builders/boards.js";
import Player from "../player.js";

export default class Rouge extends Player {
    constructor(x,y) {
        super(x, y, 'rogue.jpg', 'Хитрый Разбойник', 3, new Stats(1,3,1,4))
        this.description = 'Разбойник явно знает пути по подземелью...'
    }
}
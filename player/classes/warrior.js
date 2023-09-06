import Stats from "../../builders/boards.js";
import Player from "../player.js";

export default class Warrior extends Player {
    constructor(x,y) {
        super(x, y, 'warrior.jpg', 'Храбрый Воин', 2, new Stats(2,2,1,7))
        this.description = 'Этот воин решил применить свою силу в испытании подземелья...'
    }
}
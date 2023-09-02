import GameObject from "../game-obj.js";

export default class Totem extends GameObject {
    constructor(x,y, game) {
        super(x,y, 'totem.jpg', 'Тотем', 0) 
        this.game = game
        this.id = Math.random()
    }
}
import { getSquare } from "../utilities.js";
import Item from "./item.js";

export default class Key extends Item {
    constructor(player) {
        super(player, 'Ключ к свободе', 'key.jpg')
    }
    
    onUse() {
        console.log('ИСПОЛЬЗУЮСЬ!')
        let nbrs = [
        getSquare(this.player.position.x, this.player.position.y - 1), 
        getSquare(this.player.position.x, this.player.position.y + 1), 
        getSquare(this.player.position.x + 1, this.player.position.y), 
        getSquare(this.player.position.x - 1, this.player.position.y)]
        nbrs.forEach(nbr => {
            if (nbr.classList.contains('sqDoor')) {
                console.log('СИМ СИМ ОТКРОЙСЯ!')
                nbr.classList.remove('sqDoor', 'sqWall')
                nbr.classList.add('sqEscape')
            }
        }) 
    }
}
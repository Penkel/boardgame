export default class Item {
    constructor(player, name, img) {
        this.player = player
        this.name = name
        this.img = '../models/' + img
        this.used = false
    }

    onUse() {
        console.log('ОБЩЕЕ')
    }
}
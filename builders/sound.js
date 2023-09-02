export default class SFX {
    constructor() {

    }

    play(name) {
        let sound = new Audio(`./sfx/${name}`)
        sound.play()
    }
}
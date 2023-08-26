import Guardian from "../units/enemies/guardian.js"
import Player from "../player/player.js"
import Game from "../game.js"
import RandomEnc from "../units/random-enc.js"
import CryingLady from "../units/encounters/enc-crying-lady.js"
import MagicSymbols from "../units/encounters/enc-magic-symbols.js"
import Skeleton from "../units/enemies/skeleton.js"

class Stats {
    constructor(str, agl, int, hp) {
        this.str = str
        this.agl = agl
        this.int = int
        this.hp = hp
    }
}

export const boards = [
    {
        name: 'Пещера',
        players: [
            new Player(2,2,'rogue.JPG', 'Хитрый Разбойник', 2, 3, new Stats(1,3,1, 4)),
            new Player(2,4,'warrior.jpg', 'Сильный Воин', 2, 2, new Stats(2,2,1, 7))
        ],
        units: [
            new RandomEnc(1,9),
            new Guardian(4,1, 'guardian.jpg', 'Стражник', 2, 1),
            new Guardian(4,1, 'guardian.jpg', 'Стражник номер два', 2, 1),
            new Guardian(4,4, 'guardian.jpg', 'Стражник номер Три', 2, 1)
        ],
        rngEnc: [
            new CryingLady(),
            new MagicSymbols()
        ],
        size: {x: 11, y: 11},
        field: [
            [1, 2, 1, 1, 1, 1, 1, 1,1 ,1 ,1],
            [0, 0, 1, 0, 0, 0, 1, 1,1 ,1 ,1],
            [0, 0, 0, 1, 1, 0, 0, 0,0 ,0 ,0],
            [0, 0, 0, 0, 0, 0, 0, 0,0 ,1 ,1],
            [0, 0, 0, 0, 0, 0, 1, 1,1 ,1 ,1],
            [0, 1, 0, 1, 0, 0, 1, 1,1 ,1 ,1],
            [0, 0, 0, 1, 0, 0, 1, 1,1 ,1 ,1],
            [0, 0, 0, 1, 0, 0, 0, 0,0 ,0 ,1],
            [0, 1, 0, 0, 0, 0, 1, 1,1 ,1 ,1],
            [0, 0, 0, 0, 0, 0, 1, 1,1 ,1 ,1],
            [1, 1, 1, 1, 1, 1, 1, 1,1 ,1 ,1]
        ]
    }
    // {
    //     name: 'Пещера',
    //     players: [
    //         new Player(2,2,'rogue.jpg', 'Хитрый Разбойник', 2, 3, new Stats(1,3,1, 5)),
    //         // new Player(2,4,'warrior.jpg', 'Сильный Воин', 2, 2, new Stats(2,2,1, 4))
    //     ],
    //     units: [
    //         new RandomEnc(1,1)
    //     ],
    //     rngEnc: [
    //         // new CryingLady(),
    //         new MagicSymbols()
    //     ],
    //     size: {x: 6, y: 6},
    //     field: [
    //         [1, 2, 1, 1, 1, 1],
    //         [0, 0, 1, 0, 0, 0],
    //         [0, 1, 0, 1, 1, 0],
    //         [0, 0, 0, 1, 0, 0],
    //         [0, 1, 0, 0, 0, 0],
    //         [1, 1, 1, 1, 1, 1]
    //     ]
    // }
]
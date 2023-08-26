import Skeleton from "../enemies/skeleton.js";
import GameObject from "../game-obj.js";
import Key from "../../items/item-key.js";

export default class MagicSymbols extends GameObject {
    constructor(x,y) {
        super(x,y, 'symbols.jpg', "Таинственные символы", 0)
        this.id = Math.random()
        this.game
        this.encounter = [
            {
                id: 0,
                text: 'На стене вы увидели волшебные символы, выбитые древними гномами',
                options: [
                    {
                        text: 'Попытаться изучить (Проверка интеллекта - 6)',
                        type: 'skillcheck',
                        skill: 'int',
                        diff: 6,
                        wNext: 2,
                        lNext: 3
                    },
                    {
                        text: 'Пройти мимо',
                        type: 'common',
                        next: 1
                    }
                ]
            },
                    {
                        enterEffect(player, unit) {
                            unit.removeObject()
                        },
                        id: 1,
                        text: 'Понимаю, не каждому дано...',
                        options: [
                            {
                                text: 'Да, я тупой',
                                type: 'end'
                            }
                        ]
                    },
                    {
                        enterEffect(player, unit) {
                            player.reward = new Key(player)
                            unit.removeObject()
                        },
                        id: 2,
                        text: 'Переведя с древнего языка на русский, вы понимаете, что под символами зарыт ключ, и вы его достаете!',
                        options: [
                            {
                                text: 'Это же путь к спасению!',
                                type: 'end'
                            }
                        ]
                    },
                    {
                        enterEffect(player, unit) {
                            let sk = new Skeleton(0,0, player)
                            sk.respawn()
                            unit.removeObject()
                        },
                        id: 3,
                        text: 'Пытаясь перевести текст, вы случайно призвали бессмертного скелета...',
                        options: [
                            {
                                text: 'Бляяя, вот я еблан...',
                                type: 'end'
                            }
                        ]
                    }
        ]
    }
}
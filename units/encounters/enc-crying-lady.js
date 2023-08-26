import Key from "../../items/item-key.js";
import GameObject from "../game-obj.js";

export default class CryingLady extends GameObject {
    constructor(x,y) {
        super(x,y, 'crying lady.jpg', "Плачущая Девушка", 0)
        this.id = Math.random()
        this.game
        this.encounter = [
            {
                id: 0,
                text: 'Вы заметили плачущую женщину, сидящую на камне.',
                options: [
                    {
                        text: 'Поинтересоваться, как у неё дела',
                        type: 'random',
                        ways: [2,3]
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
                text: 'Ваша нерешимость не дает вам поздороваться с женщиной',
                options: [
                    {
                        text: 'Ну и хер с ней',
                        type: 'end'

                    }
                ]
            },
            {
                enterEffect(player, unit) {
                    unit.removeObject()
                    console.log('У ВАС КЛЮЧ!')
                    player.reward = new Key(player)
                },
                id: 2,
                text: 'Эта дамочка дала вам ключ!',
                options: [
                    {
                        text: 'Вот он, путь к свободе!',
                        type: 'end'
                    }
                ]
            },
            {
                enterEffect(player, unit) {
                    unit.removeObject()
                    unit.dealDmg(4, player, 'был сведен с ума криком ведьмы!')
                },
                id: 3,
                text: 'Она оказалась ведьмой, её крик свел вас с ума!',
                options: [{
                    text: 'Больше никогда не поверю женщине...',
                    type: 'end'
                }]
            }
        ]
    }


}
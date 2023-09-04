import GameObject from "../game-obj.js";
import { findPath } from "../pathfinding.js";

export default class Skeleton extends GameObject {
    constructor(x,y,target) {
        super(x,y, 'skeleton.jpg', 'Скелетон', 4)
        this.game = target.game
        this.maxAp = 4
        this.ap = 4
        this.status = 'hunting'
        this.target = target
        this.respawning = true
        this.encounter = [
            {
                id: 0,
                text: 'Это он, бессмертный секлет! Мало шансов у тебя, дружок..',
                options: [
                    {
                        text: 'Попробовать победить скелета (Проверка силы - 7)',
                        type: 'skillcheck',
                        skill: 'str',
                        diff: 7,
                        wNext: 1,
                        lNext: 4
                    },
                    {
                        text: 'Незаметно ускользнуть (Проверка ловкости - 6)',
                        type: 'skillcheck',
                        skill: 'agl',
                        diff: 6,
                        wNext: 2,
                        lNext: 4
                    },
                    {
                        text: 'Попытаться убедить его, что вы не его цель (Проверка интеллекта - 5)',
                        type: 'skillcheck',
                        skill: 'int',
                        diff: 5,
                        wNext: 3,
                        lNext: 4
                    }
                ]
            },
            {   
                enterEffect(player, unit) {
                    unit.removeObject()
                },
                id: 1,
                text: 'Вы победили скелета.. Но он бессмертен, надеюсь, вы помните...',
                options: [
                    {
                        text: 'Ну хоть сейчас я от него избавился',
                        type: 'end'
                    }
                ]
            },
            {
                id: 2,
                text: 'Вы укрылись в тенях',
                options: [
                    {
                        text: 'Фууух..',
                        type: 'end'
                    }
                ]
            },
            {
                enterEffect(player, unit) {
                    let targetIndex = [...unit.game.players].indexOf(unit.target)
                    if (targetIndex + 1 == [...unit.game.players].length) {
                        unit.target = [...unit.game.players][targetIndex - 1]
                    } else {
                        unit.target = [...unit.game.players][targetIndex + 1]
                    }
                },
                id: 3,
                text: `Каким-то чудом вы убедили Скелетона, теперь его новая цель - ${this.target.name}`,
                options: [
                    {
                        text: 'Отлично!',
                        type: 'end'
                    }
                ]
            },
            {   
                enterEffect(player, unit) {
                    unit.dealDmg(2, player, 'был избит до смерти Скелетоном')
                    // if(unit.game.deadPlayers.some(pl => pl.id == player.id)) {
                    //     unit.break = true
                    //     unit.game.encounter.renderEncBox(unit, player, 5)
                    // }
                },
                id: 4,
                text: 'Это только разозлило Скелетона! Но теперь уже никуда не денешься',
                options: [
                    {
                        text: 'Попробовать все же победить его... (Проверка силы - 8)',
                        type: 'skillcheck',
                        skill: 'str',
                        diff: 8,
                        wNext: 1,
                        lNext: 4
                    },
                    {
                        text: 'Он мне не по силам..',
                        type: 'common',
                        next: 5
                    }
                ]
            },
            {
                enterEffect(player, unit) {
                    unit.dealDmg(player.stats.hp, player, 'сдался на растерзание Скелетону')
                },
                id: 5,
                text: 'Что ж, может быть смерть не будет такой мучительной',
                options: [
                    {
                        text: 'Нет... Похоже, что будет..',
                        type: 'end'
                    }
                ]
            },
            {
                id: 6,
                text: 'Сложно выстоять в бою со скелетоном, я тебя не виню',
                options: [ {
                    text: 'Я умираю в мучениях..',
                    type: 'end'
                }
                ]
            }
        ]
    }

async action() {
    if (!this.game.players.some(player => player == this.target)) this.chooseRngTarget()
        let path = findPath(this, this.target, this)
        await this.pathStep(path)
        console.warn(path)
        console.log('путь', path)
        console.log(`я сейчас тут`,this.position)
        console.log('action')
    }
}
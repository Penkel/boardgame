import GameObject from "../game-obj.js";
import { findPath } from "../pathfinding.js";
// import NPC from "./npc.js";

export default class Guardian extends GameObject {
    constructor(x,y, name){
    super(x,y,'guardian.jpg', name)
        this.maxAp = 1
        this.status = 'patrolling'
        this.encounter = [
                {
                    enterEffect() {
                      console.log('ТАДАМ')
                    },
                    id: 0,
                    text: 'Страж - это начало вашего конца. Лишь удачный уворот поможет вам избежать его кары',
                    options: [
                        {
                           text: 'Увернуться от его удара (Проверка ловкости - 8)',
                           type: 'skillcheck',
                           skill: 'agl',
                           diff: 8,
                           wNext: 1,
                           lNext: 2
                        },
                        {
                            text: 'Принять смерть',
                            type: 'common',
                            next: 2
                        }
                    ],
                    }, {
                        id:1,
                        text: 'Вам удалось избежать кары... на этот раз',
                        options:[
                            {
                                text: 'Фух, вот это повезло!',
                                type: 'end'
                            }
                        ]
                    },
                    {
                        enterEffect(player, unit) {
                            unit.dealDmg(player.stats.hp, player, 'был раздавлен, его убийца - '+unit.name)
                            console.log(player.stats.hp)
                        },
                        id:2,
                        text: 'Вас ебнули жестко',
                        options: [{
                            text: "ну бля...",
                            type: 'end'

                        }]
                    }]
}
    async action() {
        
        let path = await findPath(this, this.game.players[0], this)
        await this.pathStep(path)
        console.warn(path)
        console.log('путь', path)
        console.log(`я сейчас тут`,this.position)
        console.log('action')
    }
}
import Game from "../../game.js";
import GameObject from "../game-obj.js";
import Totem from "../objects/totem.js";
import { findPath, } from "../pathfinding.js";
import { rng, sleep } from "../../utilities.js";

export default class MageGoblin extends GameObject {
    constructor(x,y) {
        super(x,y)
        this.maxAp = 4
        this.ignores = true
        this.img = 'mage goblin.jpg'
        this.status = 'patrolling'
        this.encounter = [
                {
                    id: 0,
                    text: 'Гоблин маг довольно прыткий, попробуй теперь поймай его!',
                    options: [
                        {
                            text: "Попробовать поймать (Проверка ловкости - 7)",
                            type: "skillcheck",
                            skill: "agl",
                            diff: 7,
                            wNext: 1,
                            lNext: 2,
                          },
                          {
                            text: 'Дождаться более подходящего момента',
                            type: 'common',
                            next: 3
                          }
                    ]
                },
                {
                    enterEffect(player, unit) {
                        unit.removeObject()
                        unit.totem.removeObject()
                    },
                    id: 1,
                    text: 'Попался, маленький гад!',
                    options: [
                        {
                            text: 'Отлично!',
                            type: 'end'
                        }
                    ]
                },
                {
                    enterEffect(player, unit) {
                        unit.dealDmg(
                          rng(3),
                          player,
                          "растворен ядовитым зельем гоблина"
                        );
                        console.log(player.stats.hp);
                      },
                    id: 2,
                    text: 'Гоблин убежал в щель, бросив напоследок в вас ядовитое зелье!',
                    options: [
                        {
                            text: 'Ай, ай, щипит сильно!',
                            type: 'end'
                        }
                    ]
                },
                {
                    id:3,
                    text: 'Вы оставляется гоблина в покое',
                    options: [
                        {
                            text: 'Я до тебя доберусь ещё..',
                            type: 'end'
                        }
                    ]
                }
        ]
    }

    async action() {
        if(!this.game.units.some(u => u.name == 'Тотем')) {
            console.log('нет тотема')
            this.totem = new Totem(0,0, this.game)
            console.log('вот тотем', this.totem)
            this.totem.respawn()
            this.ap--
            console.log('вот тотем', this.totem)
        }
        let path = await findPath(this, this.totem, this)
        await this.pathStep(path)
        if(this.position.x == this.totem.position.x && this.totem.position.y == this.position.y) {
            this.game.sfx.play('magic-explosion.mp3')
            document.querySelector('.board').classList.add('explode-screen')
            await sleep(1)
            this.game.players.forEach(async player => {
                this.dealDmg(3, player, 'убит заклинанием гоблина-мага')
                this.totem.removeObject()
                this.totem.respawn()
            })
            document.querySelector('.board').classList.remove('explode-screen')
        }
    }
}
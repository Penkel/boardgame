import GameObject from "../game-obj.js";

export default class MageGoblin extends GameObject {
    constructor(x,y) {
        super(x,y)
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

    action() {
        
    }
}
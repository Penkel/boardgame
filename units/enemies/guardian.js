import { getSquare, getSquareObject } from "../../utilities.js";
import GameObject from "../game-obj.js";
import { findPath } from "../pathfinding.js";
// import NPC from "./npc.js";

export default class Guardian extends GameObject {
  constructor(x, y, name) {
    super(x, y, "guardian.jpg", name);
    this.maxAp = 9;
    this.status = "patrolling";
    this.patrols = [{x:0,y:1}, {x:0,y:9}];
    this.currPatrol = 0;
    this.encounter = [
      {
        enterEffect() {
          console.log("ТАДАМ");
        },
        id: 0,
        text: "Страж - это начало вашего конца. Лишь удачный уворот поможет вам избежать его кары",
        options: [
          {
            text: "Увернуться от его удара (Проверка ловкости - 8)",
            type: "skillcheck",
            skill: "agl",
            diff: 8,
            wNext: 1,
            lNext: 2,
          },
          {
            text: "Принять смерть",
            type: "common",
            next: 2,
          },
        ],
      },
      {
        id: 1,
        text: "Вам удалось избежать кары... на этот раз",
        options: [
          {
            text: "Фух, вот это повезло!",
            type: "end",
          },
        ],
      },
      {
        enterEffect(player, unit) {
          unit.dealDmg(
            player.stats.hp,
            player,
            "был раздавлен, его убийца - " + unit.name
          );
          console.log(player.stats.hp);
        },
        id: 2,
        text: "Вас ебнули жестко",
        options: [
          {
            text: "ну бля...",
            type: "end",
          },
        ],
      },
    ];
  }
  async action() {
    console.log(this.patrols)
    // let path = await findPath(this, this.game.players[0], this);
    let path = await findPath(this, getSquareObject(getSquare(this.patrols[this.currPatrol].x, this.patrols[this.currPatrol].y)), this);
    await this.pathStep(path);
    if (
      this.position.x == this.patrols[this.currPatrol].x &&
      this.position.y == this.patrols[this.currPatrol].y
    ) {
        if(this.currPatrol + 2 > this.patrols.length) {
            this.currPatrol = 0
        }
        else {
            this.currPatrol++
        }
    }
  }
}

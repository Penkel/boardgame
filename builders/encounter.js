import { randomEl } from "../utilities.js";

let optionsCont = document.querySelector(".options-container");

export default class Encounter {
  constructor(game) {
    this.game = game
    this.active = false
  }

  async startEnc(player, unit) {
    this.active = true
    console.log(unit.name, "встретился с", player.name);
    document.querySelector(".enc-player-img").src = `/models/${player.img}`;
    document.querySelector(".enc-unit-img").src = `/models/${unit.img}`;
    this.renderEncBox(player, unit, 0)
}

async renderEncBox(player, unit, id) {
  optionsCont.querySelectorAll('button').forEach(btn => {
    optionsCont.removeChild(btn)
  })
      let curState = unit.encounter[id]
      unit.break = false
      if (typeof curState.enterEffect == 'function') {
       await curState.enterEffect(player, unit)
      }
      if(unit.break == true) {
        return
      } else {
      let desc = document.querySelector(".enc-description");
    desc.textContent = curState.text;
    if (curState.options) {
    curState.options.forEach((option) => {
      let btn = document.createElement("button");
      btn.innerText = option.text;
      btn.addEventListener("click", () => {
        switch (option.type) {
          case 'common':
            this.renderEncBox(player, unit, option.next)
            break;
          case "skillcheck":
            console.log("твой ролл" + Math.ceil(Math.random() * 6));
            let result = player.checkSkill(option.skill, option.diff);
            if (result) {
              this.renderEncBox(player, unit, option.wNext)
            } else {
              this.renderEncBox(player, unit, option.lNext)
            }
            break;

          case "random":
            this.renderEncBox(player, unit, randomEl(option.ways))
            break  

          case "special":
            console.log("специальное действие!");
            break;
            
          case 'end':
          optionsCont.querySelectorAll('button').forEach(btn => {
              optionsCont.removeChild(btn)
            })
          desc.textContent = ""
          this.active = false;
          document.querySelector(".enc-player-img").src = ``;
          document.querySelector(".enc-unit-img").src = ``;
          this.game.startUnitsTurn()
          break;
        }
      });
      optionsCont.appendChild(btn);
    })};
  }
}
}

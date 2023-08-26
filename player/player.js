import GameObject from "../units/game-obj.js";
import { getSquare } from "../utilities.js";
import { rng } from "../utilities.js";

export default class Player extends GameObject {
  player = true
  constructor(x, y, img, name, speed, ap, stats) {
    super(x, y, img, name, speed);
    this.maxAp = ap;
    this.ap = this.maxAp;
    this.stats = stats;
    this.deathMsg = ''
    this.inventory = []
  }

  set hp(num) {
    console.log('урон', num)
    this.stats.hp += num
    document.querySelector(`[hp-display-id="${this.id}"]`).textContent = this.stats.hp
    if (this.stats.hp <= 0) this.die()
  }

  set reward(item) {
    if(this.inventory.some(itm => item == this.item)) {
      alert('Да у тебя уже блин есть этот айтем!')
    } else {
      this.inventory.push(item)
      this.fillInventory()
    }
  } 
  
  fillInventory() {
    let i = 1
    this.inventory.forEach(item => {
      let img = document.createElement('img')
      img.src = item.img
      img.addEventListener('click', () => {
        console.log('АЙТЕМ ДЕЛАЕТ ДЕЙСТВИЕ!')
        if([...this.game.players].indexOf(this) == this.game.currPlayer)
        item.onUse()
      })
    document.querySelector(`[sheet-id="${this.id}"] .item${i}`).appendChild(img)
    })
  }

  die() {
    console.log(this.name, 'здох..')
    this.game.deadPlayers.push(this)
    console.log(this.game.deadPlayers)
    // let sheets = document.querySelectorAll('.char-sheets-container table tr')
    // console.log(sheets)
    // console.log(sheets[[...this.game.players].indexOf(this) + 1], 'зачернобелить!')
    document.querySelectorAll(`[sheet-id="${this.id}"] td`).forEach(td => {
      td.style.filter = 'grayscale(1)'
    })
    let el = document.querySelector(`.board [id="${this.id}"]`);
    getSquare(this.position.x, this.position.y).removeChild(el);
    this.game.players = this.game.players.filter((pl) => pl.id != this.id)
    if(this.game.players.length == 0) {
      this.game.youLost('Все искатели приключений погибли...')
    }
  }

  checkSkill(skill, diff) {
    console.log(this)
    let stat = this.stats[skill];
    let roll = rng(6)
    let result = roll + stat;
    console.log(result + 'выпало')
    document.querySelector(".roll-interface").textContent = `Результат броска - ${roll}, ваш скилл - ${stat}, вместе - ${result}`
    if (result < diff) return false;
    else return true;
  }
}

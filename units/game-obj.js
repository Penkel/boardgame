// import Player from "./player.js"
import { getSquare, randomEl, sleep } from "../utilities.js";
import { createHoverDescription } from "../builders/descriptions.js";

export default class GameObject {
  constructor(positionX, positionY, img, name) {
    this.position = { x: positionX, y: positionY };
    this.img = img;
    this.name = name;
    this.id = Math.random();
    this.description = 'Тут могло быть описание'
    // this.id = crypto.randomUUID
    this.game;
  }
  get curPos() {
    return this.position;
  }
  set setAp(num) {
    console.log(this);
    console.log("СНИЖАЮ АП");
    this.ap = num;
    console.warn(this.ap);
    if (this.player) {
      document.querySelector(`[ap-display-id="${this.id}"]`).textContent =
        this.ap;
    }
  }
  placeObject(x, y) {
    this.position.x = x;
    this.position.y = y;
    let el = document.createElement("img");
    el.classList.add('with-description')
    el.src = `./models/${this.img}`;
    el.setAttribute("id", this.id);
    getSquare(x, y).appendChild(el);

    let d = document.createElement("div");
    d.innerHTML = createHoverDescription(this)
    d.classList.add('hover-description')
    getSquare(x, y).appendChild(d)
  }

  removeObject() {
    let el = document.querySelector(`[id="${this.id}"]`);
    getSquare(this.position.x, this.position.y).removeChild(el);
    console.log(this.game.players);
    this.game.players = this.game.players.filter((pl) => pl.id != this.id);
    this.game.units = this.game.units.filter((pl) => pl.id != this.id);
    if (this.respawning) this.respawn();
  }

  glow(toTurnOn, color) {
    if (toTurnOn) {
      document
        .querySelector(`[id="${this.id}"]`)
        .classList.add(`glow-${color}`);
    } else {
      document
        .querySelector(`[id="${this.id}"]`)
        .classList.remove(`glow-${color}`);
    }
  }

  respawn() {
    let emp = document.querySelectorAll(".sqEmpty");
    console.log(emp);
    let spawns = [...emp].filter((sq) => sq.firstChild == null);
    let spawn = randomEl(spawns);
    console.log(spawn);
    this.game.units.push(this);
    this.placeObject(spawn.getAttribute("cordx"), spawn.getAttribute("cordy"));
  }

  action() {}

  chooseRngTarget() {
    this.target = randomEl(this.game.players)
  }

  move(x, y) {
    if (!getSquare(x, y).classList.contains("sqWall") || this.ghost == true)
      if (this.ap) {
        let el = document.querySelector(`[id="${this.id}"]`);
        console.log(el);
        // getSquare(this.position.x, this.position.y).removeChild(el);
        // this.placeObject(x,y)
        getSquare(x, y).appendChild(el);
        this.position.x = x;
        this.position.y = y;
        this.setAp = this.ap - 1;
        console.log(this.ap);
        if (getSquare(x, y).classList.contains("sqEscape")) {
          this.game.players = this.game.players.filter(
            (pl) => pl.id != this.id
          );
          this.deathMsg = "сбежал на свободу!";
          this.game.escapedPlayers.push(this);
          getSquare(this.position.x, this.position.y).removeChild(
            document.querySelector(`[id="${this.id}"]`)
          );
          this.game.currPlayer--;
          this.game.passTurn();
          if (this.game.players.length == 0) {
            this.game.youLost("Кому-то всё же удалось сбежать..");
          }
        }
      }
  }

  dealDmg(dmg, target, msg) {
    target.hp = -dmg;
    target.deathMsg = msg;
  }

  step(x, y) {
    this.move(this.position.x + x, this.position.y + y);
    console.log("шажок");
  }
  async pathStep(path) {
    console.log(path);
    for (let player of this.game.players) {
        if (
          player.position.x == this.position.x &&
          player.position.y == this.position.y
        ) {
          console.log("евент!");
          this.game.encounter.startEnc(player, this);
          return
        }
      }

    
      console.log(path);
      walking: for (
        let i = 0;
        this.ap > 0 &&
        (this.position.x != path[path.length - 1].x ||
          this.position.y != path[path.length - 1].y) ||
          this.path == 0;
        i++
      ) {
        await sleep(1);
        this.move(path[i].x, path[i].y);
        for (let player of this.game.players) {
          if (
            player.position.x == this.position.x &&
            player.position.y == this.position.y &&
            !this.ignores
          ) {
            console.log("евент!");
            this.game.encounter.startEnc(player, this);
            break walking;
          }
        }
        if (this.game.encounter.active) {
          break;
        }
      }
    console.log("шаги", this.name, "кончились");
  }
}


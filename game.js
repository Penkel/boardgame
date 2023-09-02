import { getSquare } from "./utilities.js";
import { boards } from "./builders/boards.js";
import GameObject from "./units/game-obj.js";
import { sleep } from "./utilities.js";
import Encounter from './builders/encounter.js'
import SFX from "./builders/sound.js";

const turnInfo = document.querySelector('.turn-info span')
console.log(turnInfo)

const TURN = {
    PLAYERS: 0,
    UNITS: 1
}

const overlay = document.querySelector('.overlay')

export default class Game {
    constructor(board) {
        this.board = board;
        this.encounter = new Encounter(this)
        this.sfx = new SFX()
        this.rngEnc = board.rngEnc
        this.units = board.units
        console.log(this.units)
        this.players = board.players
        this.deadPlayers = []
        this.escapedPlayers = []
        this.turn = TURN.PLAYERS
        this.currPlayer = 0
        this.currUnit = 0
        }

    async start() {
        // document.querySelector('.test-btn').addEventListener('click', () => {
        //     this.sfx.play('magic-explosion.mp3')
        // })

        this.buildBoard();
        this.players.forEach(unit => {
            unit.placeObject(unit.position.x, unit.position.y)
            unit.game = this
        })
        this.units.forEach(unit => {
            unit.placeObject(unit.position.x, unit.position.y)
            unit.game = this
        })

        this.rngEnc.forEach(enc => {
            enc.game = this
        })
        this.buildCharSheets()
        this.gameLoop()
        document.addEventListener('keydown', (event) => {
            if(this.turn == TURN.PLAYERS) {
            event.preventDefault();
            switch(event.keyCode) {
                case 37: 
                case 65:
                    this.players[this.currPlayer].step(-1, 0);
                    break;

                case 38:
                case 87:
                    this.players[this.currPlayer].step(0, -1);
                    break;

                case 39:
                case 68:
                    this.players[this.currPlayer].step(1, 0);
                    break; 
                
                case 40:
                case 83:
                    this.players[this.currPlayer].step(0, 1);
                    break;
                
                case 32:
                    this.passTurn()
            }
        }
        })

    }

    buildCharSheets() {
        const charSheets = document.querySelector('.char-sheets-container table')
        console.log(charSheets)
        this.players.forEach(player => {
            let tr = document.createElement('tr')
            tr.setAttribute('sheet-id', player.id)
            charSheets.appendChild(tr)
            let ap = document.createElement('td')
            ap.classList.add('ap')
            ap.setAttribute('ap-display-id', player.id)
            ap.textContent = player.ap
            tr.appendChild(ap)
            let hp = document.createElement('td')
            hp.classList.add('hp')
            hp.setAttribute('hp-display-id', player.id)
            hp.textContent = player.stats.hp
            tr.appendChild(hp)
            let img = document.createElement('td')
            img.classList.add(player.id)
            img.style.background = `center/ contain no-repeat url('./models/${player.img}')`
            tr.appendChild(img)

            let stats = ['str', 'agl', 'int']
            stats.forEach(stat => {
                let el = document.createElement('td')
                el.textContent = player.stats[stat]
                el.classList.add(stat)
                el.classList.add(player.id)
                tr.appendChild(el)
            })
            let items = ['item1', 'item2']
            items.forEach(item => {
                let el = document.createElement('td')
                el.classList.add(item)
                el.classList.add('item')
                el.classList.add(player.id)
                tr.appendChild(el)
            })
        })
    }

    buildBoard() {
        let game = this.board;
        const board = document.querySelector('.board table');
        for(let i = 0; i < game.size.x; i++) {
            let r = document.createElement('tr')
            board.appendChild(r)
        }
        let raws = [...board.querySelectorAll('tr')];
        console.log(raws)
        raws.forEach(raw => {
            for(let i = 0; i < game.size.x; i++) {
                let d = document.createElement('td')
                let type
                switch (game.field[raws.indexOf(raw)][i]) {
                    case 0:
                       type = ['sqEmpty']
                        break;
                    case 1:
                        type = ['sqWall']
                        break;
                    case 2:
                        type = ['sqWall', 'sqDoor']
                        break;
                    case 3:
                        type = ['sqEscape']
                        break;
                }
                type.forEach(t => {
                    d.classList.add(t)
                })
                d.setAttribute('cordX', i)
                d.setAttribute('cordY', raws.indexOf(raw))
                // d.addEventListener('click', () => {
                //     if(d.classList.contains('sqWall') || this.turn != TURN.PLAYERS) {
                //         console.log('НЕТ!!')
                //     }
                //     else {
                //         this.players[this.currPlayer].move(i, raws.indexOf(raw))
                //     }
                // })
                raw.appendChild(d)
            }
        })
    }
    async startPlayersTurn() {
        this.turn = TURN.PLAYERS
        this.currPlayer = 0
        turnInfo.textContent = this.players[this.currPlayer].name
        this.players[this.currPlayer].glow(true, 'green')
        this.players.forEach(player => {
            player.setAp = player.maxAp
        })

    }

    async gameLoop() {
        console.log('пошла жара!')
        this.startPlayersTurn()
    }

    async passTurn() {
        if(this.players[this.currPlayer])
        this.players[this.currPlayer].glow(false, 'green')
        this.currPlayer++
        if(this.currPlayer > this.players.length - 1) {
            console.log(this.currPlayer)
            this.currUnit = -1;
            this.startUnitsTurn()
        }
        else {
            turnInfo.textContent = this.players[this.currPlayer].name
            this.players[this.currPlayer].glow(true, 'green')
        }
    }

    async startUnitsTurn() {
        this.turn = TURN.UNITS
        this.currUnit++
        if (this.currUnit > this.units.length - 1) {
            this.startPlayersTurn()
        }
        this.units[this.currUnit].glow(true, 'red')
        console.log('jjj')
        for (let unit of this.units) {
            if([...this.units].indexOf(unit) != this.currUnit) {
                continue
            }
            this.units[this.currUnit].glow(true, 'red')
            turnInfo.textContent = unit.name
            // await sleep(2)
            unit.ap = unit.maxAp
            if (typeof unit.action == 'function'){
                await unit.action()
            }
            if(this.encounter.active) {
                break
            }
            await sleep(1)
            console.log('начнут...')
            this.units[this.currUnit].glow(false, 'red')
            this.currUnit++
        }
                if (!this.encounter.active) {
        await this.startPlayersTurn()
        }
            }

    async youLost(msg) {
        await sleep(2)
        console.log('СМЭРТ!')
        overlay.textContent = msg
        this.escapedPlayers.forEach(player => {
            let p = document.createElement('p')
            p.textContent = `${player.name} ${player.deathMsg}`
            overlay.appendChild(p)
        })
        this.deadPlayers.forEach(player => {
            let p = document.createElement('p')
            p.textContent = `${player.name} ${player.deathMsg}`
            overlay.appendChild(p)
        })
        overlay.style.display = 'block'
    }
    }



import Game from "./game.js";
import { boards } from "./builders/boards.js";
const board = document.querySelector('.board');
import { sleep } from "./utilities.js";

const game = new Game(boards[0]);

let endTurnBtn = document.querySelector('.endTurn')
endTurnBtn.addEventListener('click', () => {game.passTurn()})

game.start();


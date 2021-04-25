import { generateLogs } from './modules/logs.js';
import { getHP } from './modules/getHP.js';
import { player1, player2 } from './modules/players.js';
import { createElement } from './modules/utils.js';
import { Game } from './modules/game.js';
import { ATTACK, HIT } from './modules/constants.js';
import { randomValue } from './modules/utils.js';

const arenas = document.querySelector('.arenas');
const formFight = document.querySelector('.control');
const formFightButton = formFight.querySelector('.button');
const chat = document.querySelector('.chat');

const game = new Game({
  generateLogs,
  formFight,
  HIT,
  ATTACK,
  randomValue,
  getHP,
  chat,
  player1,
  player2,
  arenas,
  formFightButton,
  createElement,
});

game.start();

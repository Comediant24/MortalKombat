import { enemyAttack, playerAttack } from './modules/battle.js';
import { generateLogs } from './modules/logs.js';
import { getHP } from './modules/getHP.js';
import { player1, player2 } from './modules/player.js';
import { createElement } from './modules/utils.js';
import { showResult } from './modules/result.js';

const arenas = document.querySelector('.arenas');
const formFight = document.querySelector('.control');
const formFightButton = formFight.querySelector('.button');
const chat = document.querySelector('.chat');

const createPlayer = (playerConfig) => {
  const { player, hp, name, img } = playerConfig;
  const newPlayer = createElement('div', `player${player}`);

  const progressbar = createElement('div', 'progressbar');
  const character = createElement('div', 'character');

  const life = createElement('div', 'life');
  life.style.width = `${hp}%`;

  const namePlayer = createElement('div', 'name');
  namePlayer.innerText = name;

  const image = createElement('img');
  image.src = img;

  newPlayer.appendChild(progressbar);
  newPlayer.appendChild(character);

  progressbar.appendChild(life);
  progressbar.appendChild(namePlayer);

  character.appendChild(image);

  return newPlayer;
};

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));

generateLogs(chat, 'start', player2, player1);

const submitFight = (e) => {
  e.preventDefault();
  const enemy = enemyAttack();
  const player = playerAttack(formFight);
  getHP(chat, player1, player2, player, enemy);
  getHP(chat, player2, player1, enemy, player);
  showResult(formFightButton, arenas, chat, player1, player2);
};

formFight.addEventListener('submit', (e) => submitFight(e));

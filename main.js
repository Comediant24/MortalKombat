const arenas = document.querySelector('.arenas');

const formFight = document.querySelector('.control');
const formFightButton = formFight.querySelector('.button');

const player1 = {
  player: 1,
  name: 'Liukang',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
  weapon: ['gun', 'knife', 'humor'],
  attack: function () {
    console.log(`${this.name} + fight`);
  },
  elHP,
  changeHP,
  renderHP,
};

const player2 = {
  player: 2,
  name: 'Sonya',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
  weapon: ['knife', 'humor', 'face'],
  attack: function () {
    console.log(`${this.name} + fight`);
  },
  elHP,
  changeHP,
  renderHP,
};

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

function randomDamage(upperLimit) {
  return Math.ceil(Math.random() * upperLimit);
}

function createElement(tag, className) {
  const element = document.createElement(tag);
  if (className) {
    element.classList.add(className);
  }
  return element;
}

function createPlayer(playerConfig) {
  const player = createElement('div', `player${playerConfig.player}`);

  const progressbar = createElement('div', 'progressbar');
  const character = createElement('div', 'character');

  const life = createElement('div', 'life');
  life.style.width = `${playerConfig.hp}%`;

  const name = createElement('div', 'name');
  name.innerText = playerConfig.name;

  const img = createElement('img');
  img.src = playerConfig.img;

  player.appendChild(progressbar);
  player.appendChild(character);

  progressbar.appendChild(life);
  progressbar.appendChild(name);

  character.appendChild(img);

  return player;
}

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));

function changeHP(damage) {
  this.hp -= damage;
  if (this.hp < 0) {
    this.hp = 0;
  }
}

function elHP() {
  return document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
  this.elHP().style.width = this.hp + '%';
}

function playerWin(name) {
  const winTitle = createElement('div', 'loseTitle');
  if (name) {
    winTitle.innerText = `${name} win`;
  } else {
    winTitle.innerText = 'Draw';
  }
  return winTitle;
}

function createReloadButton() {
  const div = createElement('div', 'reloadWrap');
  const button = createElement('button', 'button');
  button.innerText = 'Restart';
  div.appendChild(button);

  button.addEventListener('click', function () {
    window.location.reload();
  });

  return div;
}

function enemyAttack() {
  const hit = ATTACK[randomDamage(3) - 1];
  const defence = ATTACK[randomDamage(3) - 1];
  console.log('hit: ', hit, 'defence: ', defence);

  return {
    value: randomDamage(HIT[hit]),
    hit,
    defence,
  };
}

function playerAttack() {
  const attack = {};

  for (let item of formFight) {
    if (item.checked && item.name === 'hit') {
      attack.value = randomDamage(HIT[item.value]);
      attack.hit = item.value;
    }
    if (item.checked && item.name === 'defence') {
      attack.defence = item.value;
    }
    item.checked = false;
  }
  return attack;
}

function showResult() {
  if (player1.hp === 0 || player2.hp === 0) {
    formFightButton.disabled = true;
    arenas.appendChild(createReloadButton());

    if (player1.hp > player2.hp) {
      arenas.appendChild(playerWin(player1.name));
    } else if (player1.hp < player2.hp) {
      arenas.appendChild(playerWin(player2.name));
    } else if (player1.hp === player2.hp) {
      arenas.appendChild(playerWin(player2.name));
    }
  }
}

function getHP(player, hitPlayer, defencePlayer) {
  if (hitPlayer.hit !== defencePlayer.defence) {
    player.changeHP(hitPlayer.value);
    player.renderHP();
  }
}

formFight.addEventListener('submit', function (e) {
  e.preventDefault();

  const enemy = enemyAttack();
  const player = playerAttack();

  getHP(player1, enemy, player);
  getHP(player2, player, enemy);

  showResult();
});

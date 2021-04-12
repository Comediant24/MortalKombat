const arenas = document.querySelector('.arenas');
const randomButton = document.querySelector('.button');

const player1 = {
  player: 1,
  name: 'Liukang',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
  weapon: ['gun', 'knife', 'humor'],
  attack: function () {
    console.log(`${this.name} + fight`);
  },
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
};

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

function changeHP(player) {
  const playerLife = document.querySelector(`.player${player.player} .life`);
  player.hp -= randomDamage(20);
  if (player.hp < 0) {
    player.hp = 0;
  }
  playerLife.style.width = player.hp + '%';
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

randomButton.addEventListener('click', function () {
  changeHP(player1);
  changeHP(player2);

  if (player1.hp === 0 || player2.hp === 0) {
    randomButton.disabled = true;
    randomButton.style.backgroundColor = 'gray';
    if (player1.hp > player2.hp) {
      arenas.appendChild(playerWin(player1.name));
    } else if (player1.hp < player2.hp) {
      arenas.appendChild(playerWin(player2.name));
    } else if (player1.hp === player2.hp) {
      arenas.appendChild(playerWin(player2.name));
    }
  }
});

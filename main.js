const player1 = {
  name: 'Liukang',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
  weapon: ['gun', 'knife', 'humor'],
  attack: function () {
    console.log(`${this.name} + fight`);
  },
};

const player2 = {
  name: 'Sonya',
  hp: 80,
  img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
  weapon: ['knife', 'humor', 'face'],
  attack: function () {
    console.log(`${this.name} + fight`);
  },
};

function createPlayer(playerName, playerConfig) {
  const arenas = document.querySelector('.arenas');

  const player = document.createElement('div');
  player.classList.add(playerName);

  const progressbar = document.createElement('div');
  progressbar.classList.add('progressbar');

  const character = document.createElement('div');
  character.classList.add('character');

  const life = document.createElement('div');
  life.classList.add('life');
  life.style.width = `${playerConfig.hp}%`;

  const name = document.createElement('div');
  name.classList.add('name');
  name.innerText = playerConfig.name;

  const img = document.createElement('img');
  img.src = playerConfig.img;

  player.appendChild(progressbar);
  player.appendChild(character);

  progressbar.appendChild(life);
  progressbar.appendChild(name);

  character.appendChild(img);

  arenas.appendChild(player);
}

createPlayer('player1', player1);
createPlayer('player2', player2);

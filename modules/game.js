export class Game {
  constructor({
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
  }) {
    this.generateLogs = generateLogs;
    this.form = formFight;
    this.attack = ATTACK;
    this.hit = HIT;
    this.randomValue = randomValue;
    this.getHP = getHP;
    this.chat = chat;
    this.player1 = player1;
    this.player2 = player2;
    this.arenas = arenas;
    this.formFightButton = formFightButton;
    this.createElement = createElement;
  }

  createPlayer = (playerConfig) => {
    const { player, hp, name, img } = playerConfig;
    const newPlayer = this.createElement('div', `player${player}`);

    const progressbar = this.createElement('div', 'progressbar');
    const character = this.createElement('div', 'character');

    const life = this.createElement('div', 'life');
    life.style.width = `${hp}%`;

    const namePlayer = this.createElement('div', 'name');
    namePlayer.innerText = name;

    const image = this.createElement('img');
    image.src = img;

    newPlayer.appendChild(progressbar);
    newPlayer.appendChild(character);

    progressbar.appendChild(life);
    progressbar.appendChild(namePlayer);

    character.appendChild(image);

    return newPlayer;
  };

  enemyAttack = () => {
    const hit = this.attack[this.randomValue(3) - 1];
    const defence = this.attack[this.randomValue(3) - 1];
    return {
      value: this.randomValue(this.hit[hit]),
      hit,
      defence,
    };
  };

  playerWin = (name) => {
    const winTitle = this.createElement('div', 'loseTitle');
    if (name) {
      winTitle.innerText = `${name} win`;
    } else {
      winTitle.innerText = 'Draw';
    }
    return winTitle;
  };

  createReloadButton = () => {
    const div = this.createElement('div', 'reloadWrap');
    const button = this.createElement('button', 'button');
    button.innerText = 'Restart';
    div.appendChild(button);

    button.addEventListener('click', () => {
      window.location.reload();
    });

    return div;
  };

  showResult = () => {
    if (this.player1.hp === 0 || this.player2.hp === 0) {
      this.formFightButton.disabled = true;
      this.arenas.appendChild(this.createReloadButton());

      if (this.player1.hp > this.player2.hp) {
        this.arenas.appendChild(this.playerWin(this.player1.name));
        this.generateLogs(this.chat, 'end', this.player1, this.player2);
      } else if (this.player1.hp < this.player2.hp) {
        this.arenas.appendChild(this.playerWin(this.player2.name));
        this.generateLogs(this.chat, 'end', this.player2, this.player1);
      } else if (this.player1.hp === this.player2.hp) {
        this.arenas.appendChild(this.playerWin());
        this.generateLogs(this.chat, 'draw');
      }
    }
  };

  playerAttack = () => {
    const attack = {};

    for (let item of this.form) {
      if (item.checked && item.name === 'hit') {
        attack.value = this.randomValue(this.hit[item.value]);
        attack.hit = item.value;
      }
      if (item.checked && item.name === 'defence') {
        attack.defence = item.value;
      }
      item.checked = false;
    }
    return attack;
  };

  submitFight = (e) => {
    e.preventDefault();
    const enemy = this.enemyAttack();
    const player = this.playerAttack(this.form);
    this.getHP(this.chat, this.player1, this.player2, player, enemy);
    this.getHP(this.chat, this.player2, this.player1, enemy, player);

    this.showResult();
  };

  start = () => {
    this.arenas.appendChild(this.createPlayer(this.player1));
    this.arenas.appendChild(this.createPlayer(this.player2));

    this.generateLogs(this.chat, 'start', this.player2, this.player1);
    this.form.addEventListener('submit', this.submitFight);
  };
}

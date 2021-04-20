const player1 = {
  player: 1,
  name: 'Liukang',
  hp: 30,
  img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
  weapon: ['gun', 'knife', 'humor'],
  elHP,
  changeHP,
  renderHP,
};

const player2 = {
  player: 2,
  name: 'Sonya',
  hp: 20,
  img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
  weapon: ['knife', 'humor', 'face'],
  elHP,
  changeHP,
  renderHP,
};

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

export { player1, player2 };

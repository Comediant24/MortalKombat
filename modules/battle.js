import { randomValue } from './utils.js';

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

const enemyAttack = () => {
  const hit = ATTACK[randomValue(3) - 1];
  const defence = ATTACK[randomValue(3) - 1];
  return {
    value: randomValue(HIT[hit]),
    hit,
    defence,
  };
};

const playerAttack = (form) => {
  const attack = {};

  for (let item of form) {
    if (item.checked && item.name === 'hit') {
      attack.value = randomValue(HIT[item.value]);
      attack.hit = item.value;
    }
    if (item.checked && item.name === 'defence') {
      attack.defence = item.value;
    }
    item.checked = false;
  }
  return attack;
};

export { enemyAttack, playerAttack };
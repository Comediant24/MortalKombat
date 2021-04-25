import { generateLogs } from './logs.js';
import { createElement } from './utils.js';

const playerWin = (name) => {
  const winTitle = createElement('div', 'loseTitle');
  if (name) {
    winTitle.innerText = `${name} win`;
  } else {
    winTitle.innerText = 'Draw';
  }
  return winTitle;
};

const createReloadButton = () => {
  const div = createElement('div', 'reloadWrap');
  const button = createElement('button', 'button');
  button.innerText = 'Restart';
  div.appendChild(button);

  button.addEventListener('click', () => {
    window.location.reload();
  });

  return div;
};

const showResult = (fightBtn, parrentEl, chat, player1, player2) => {
  if (player1.hp === 0 || player2.hp === 0) {
    fightBtn.disabled = true;
    parrentEl.appendChild(createReloadButton());

    if (player1.hp > player2.hp) {
      parrentEl.appendChild(playerWin(player1.name));
      generateLogs(chat, 'end', player1, player2);
    } else if (player1.hp < player2.hp) {
      parrentEl.appendChild(playerWin(player2.name));
      generateLogs(chat, 'end', player2, player1);
    } else if (player1.hp === player2.hp) {
      parrentEl.appendChild(playerWin());
      generateLogs(chat, 'draw');
    }
  }
};

export { showResult };

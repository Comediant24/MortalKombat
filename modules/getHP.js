import { generateLogs } from './logs.js';

const getHP = (
  logDisplay,
  playerDefence,
  playerHit,
  defenceCongig,
  hitConfig
) => {
  const { hit, value } = hitConfig;
  const { defence } = defenceCongig;
  if (hit !== defence) {
    playerDefence.changeHP(value);
    playerDefence.renderHP();
    generateLogs(logDisplay, 'hit', playerHit, playerDefence, value);
  } else generateLogs(logDisplay, 'defence', playerHit, playerDefence);
};

export { getHP };

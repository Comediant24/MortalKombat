const insertHTML = (parentEl, text) => {
  const el = `<p>${text}</p>`;
  parentEl.insertAdjacentHTML('afterbegin', el);
};

const getTime = () => {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}`;
};

const randomValue = (upperLimit) => {
  return Math.ceil(Math.random() * upperLimit);
};

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  if (className) {
    element.classList.add(className);
  }
  return element;
};

export { insertHTML, getTime, randomValue, createElement };

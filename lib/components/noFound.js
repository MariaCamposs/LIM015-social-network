export const noFound = () => {
  const container = document.createElement('section');
  container.classList.add('noFoundContainer');
  const element = document.createElement('section');
  element.classList.add('noFoundSection');
  element.innerHTML = `
    <h1 class="noFoundTitle">Upps... No se encontro la página</h1>
  `;
  container.appendChild(element);
  return container;
};

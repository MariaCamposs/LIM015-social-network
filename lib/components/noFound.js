export const noFound = () => {
  const container = document.createElement('section');
  container.innerHTML = `
    <h1>No encontrado</h1>`;
  return container;
};

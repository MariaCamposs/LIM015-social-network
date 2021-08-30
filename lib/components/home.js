export const home = () => {
  const container = document.createElement('section');
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  container.innerHTML = `
    <h1>Hola!!!!! Aquí va la Página de Inicio</h1>`;
  return container;
};

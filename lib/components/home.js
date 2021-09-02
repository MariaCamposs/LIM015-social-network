import { onAuthStateChanged, signOut } from '../firebase/functions.js';

const userState = () => {
  onAuthStateChanged((user) => {
    if (user === null || user === undefined) window.location.hash = '#/login';
  });
};

export const home = () => {
  userState();
  const container = document.createElement('section');
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  container.innerHTML = `
    <h1>Hola!!!!! Aquí va la Página de Inicio</h1>
    <button id="cerrar">Cerrar</button>`;
  container.querySelector('#cerrar').addEventListener('click', () => {
    signOut();
    window.location.hash = '#/login';
  });
  return container;
};

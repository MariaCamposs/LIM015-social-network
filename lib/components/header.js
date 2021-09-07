import { signOut } from '../firebase/functions.js';

export const mobileHeader = () => {
  const header = document.createElement('header');
  header.classList.add('mobileHeader');
  header.innerHTML = `
    <img class="mobil-logo" src="./assets/img/logo.svg" alt="petstagram"/>`;
  return header;
};
const logOut = (container) => {
  container.querySelector('#close').addEventListener('click', () => {
    signOut();
    window.location.hash = '#/login';
    window.localStorage.removeItem('user');
  });
};

export const desktopHeader = () => {
  const header = document.createElement('header');
  header.classList.add('desktopHeader');
  header.innerHTML = `
    <img class="mobil-logo" src="./assets/img/logo-mobile.svg" alt="petstagram"/>
    <nav class="navDesktop">
          <ul>
              <li><a href="#/home"><i class="ai-home icon menu"></i></a></li>
              <li><a href="#/createpost"><img class="icon menu" src="./assets/img/addpost.svg" alt="add post icon"/></a></li>
              <li><a href="#/profile"><img class="icon menu" src="./assets/img/profile.svg" alt="profile icon"/></a></li>
              <li><a id="close"><img class="icon" src="./assets/img/signout.svg" alt="signout icon"/></i></a></li>
          </ul>
    </nav>`;
  logOut(header);
  return header;
};

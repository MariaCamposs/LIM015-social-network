/* eslint-disable max-len */
import { signOut } from '../firebase/functions.js';

const logOut = (container) => {
  container.querySelector('#close').addEventListener('click', () => {
    signOut();
    window.location.hash = '#/login';
    window.localStorage.removeItem('user');
  });
};

export const mobileHeader = () => {
  const header = document.createElement('header');
  header.classList.add('mobileHeader');
  header.innerHTML = `
    <img class="mobil-logo-post" src="./assets/img/logo.svg" alt="petstagram"/>
    <a id="close"><img class="icon" src="./assets/img/signout.svg" alt="signout icon"/></i></a>`;
  logOut(header);
  return header;
};

const addBackground = (header) => {
  switch (window.location.hash.toLowerCase()) {
    case '#/home':
      header.querySelector('a.home-icon').classList.add('active');
      break;
    case '#/home/createpost':
      header.querySelector('a.createpost-icon').classList.add('active');
      break;
    case '#/home/profile':
      header.querySelector('a.profile-icon').classList.add('active');
      break;
    case '#/home/profile/editprofile':
      header.querySelector('a.profile-icon').classList.add('active');
      break;
    default:
      header.querySelectorAll('a').classList.remove('active');
  }
};

export const desktopHeader = () => {
  const header = document.createElement('header');
  header.classList.add('desktopHeader');
  // header.style.display = 'none';
  header.innerHTML = `
    <section class="headerBox">
      <img src="./assets/img/logo-white.svg" alt="petstagram"/>
      <nav class="navDesktop">
        <a href="#/home" class= "home-icon"><img class="icon-header" src="./assets/img/home.svg" alt="home icon"/></a>
        <a href="#/home/createpost" class="createpost-icon"><img class="icon-header" src="./assets/img/addpost.svg" alt="add post icon"/></a>
        <a href="#/home/profile" class="profile-icon"><img class="icon-header" src="./assets/img/profile.svg" alt="profile icon"/></a>
        <a id="close"><img class="icon-header" src="./assets/img/signout.svg" alt="signout icon"/></i></a>
      </nav>
    </section>`;
  logOut(header);
  addBackground(header);
  return header;
};

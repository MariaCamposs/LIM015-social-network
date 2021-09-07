import { addPost } from '../firebase/firestore.js';
import { mobileFooter } from './footer.js';
import { mobileHeader, desktopHeader } from './header.js';

const savePost = (container) => {
  const petsUser = firebase.auth().currentUser;
  // --------------
  let displayName;
  let uid;
  let photoURL;
  if (petsUser !== null) {
    displayName = petsUser.displayName;
    uid = petsUser.uid;
    photoURL = petsUser.photoURL;
  } else {
    window.location.hash = '#/login';
  }

  const btnPost = container.querySelector('#postButton');
  btnPost.addEventListener('click', async (event) => {
    event.preventDefault();
    const post = container.querySelector('#inputPost').value;
    const ubication = container.querySelector('#inputUbication').value;
    const namePet = container.querySelector('#inputNamePet').value;
    const photoPost = container.querySelector('#photoButton').value;
    if (post === '') {
      console.log('Publicacion vacia');
    } else {
      addPost(uid, displayName, photoURL, post, ubication, namePet, photoPost);
      window.location.hash = '#/profile';
    }
  });
  return container;
};

export const createPost = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const container = document.createElement('section');
  container.classList.add('createPostContainer');
  const element = document.createElement('section');
  element.classList.add('createPostSection');
  element.innerHTML = `
    <form id="login" class="postForm">
      <div class= "first-section-form">
      <label class="createPostSection">Crear publicación</label>
      <img class="circle photoProfile" src="${user.photoURL}"/>
      <label class="userName">Firulais</label>
      <label class="privacyIcons">Amigos
        <i class="ai-people-multiple"></i>
        <i class="ai-toggle-off"></i>
        <i class="ai-globe"></i>
        Público
      </label>
      <input id="inputPost" placeholder="¿Qué está haciendo tu mascota?"/>
      <span class="characters">0/300 caracteres</span>
      <i class="ai-location icon"></i><input id="inputUbication"placeholder="Ubicación"/>
        <img class="icon sharp-pet" src="./assets/img/ic_sharp-pets.svg"/><input id="inputNamePet" placeholder="Nombre de mascota"/>
      </div>
      <div class="second-section-form">
      <img class="pet-desktop" src="./assets/img/mascotas.svg"/>
      <label class="formButton imgButton"> Subir foto <i class="ai-image"></i>
      <input type="file" id="photoButton" class="file"/>
      </label>
      <button id="postButton" class="formButton">Publlicar</button>
      <div>
    </form>
  `;
  container.appendChild(mobileHeader());
  container.appendChild(desktopHeader());
  container.appendChild(element);
  container.appendChild(mobileFooter());
  savePost(container);
  return container;
};

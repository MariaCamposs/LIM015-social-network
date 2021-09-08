import { addPost } from '../firebase/firestore.js';
import { mobileFooter, desktopFooter } from './footer.js';
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
    console.log('vacio');
  }

  const btnPost = container.querySelector('#postButton');
  btnPost.addEventListener('click', async (event) => {
    event.preventDefault();
    const post = container.querySelector('.inputPost').value;
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
  console.log(user);
  const container = document.createElement('section');
  container.classList.add('createPostContainer');
  const element = document.createElement('section');
  element.classList.add('createPostSection');
  element.innerHTML = `
    <form id="login" class="postForm">
      <div class= "first-section-form">
      <label class="createPostSection">Crear publicación</label>
      <img class="photoProfile-post" src="${user.photoURL}"/>
      <label class="userName">Firulais</label>
      <label class="privacyIcons">Amigos
        <i class="ai-people-multiple"></i>
        <i class="ai-toggle-off"></i>
        <i class="ai-globe"></i>
        Público
      </label>
      <textarea class="inputPost" id ="post" rows="3" maxlength="300" placeholder="¿Qué está haciendo tu mascota?"></textarea>
      <span id="count" class="characters">0/300 caracteres</span>
      <i class="ai-location icon"></i><input id="inputUbication" maxlength="30" placeholder="Ubicación"/>
        <img class="icon sharp-pet" src="./assets/img/ic_sharp-pets.svg"/><input id="inputNamePet" maxlength="15" placeholder="Nombre de mascota"/>
      </div>
      <div class="second-section-form">
      <img class="pet-desktop" src="./assets/img/mascotas.svg"/>
      <label class="formButton imgButton"> Subir foto <i class="ai-image"></i>
      <input type="file" id="photoButton" class="file"/>
      </label>
      <button id="postButton" class="formButton">Publlicar</button>
      </div>
    </form>
  `;

  container.appendChild(mobileHeader());
  container.appendChild(desktopHeader());
  container.appendChild(element);
  container.appendChild(desktopFooter());
  container.appendChild(mobileFooter());

  const post = container.querySelector('#post');
  const count = container.querySelector('#count');
  post.addEventListener('input', (e) => {
    const target = e.target;
    const longitudMax = target.getAttribute('maxlength');
    const longitudAct = target.value.length;
    count.innerHTML = `${longitudAct}/${longitudMax}`;
  });
  savePost(container);
  return container;
};

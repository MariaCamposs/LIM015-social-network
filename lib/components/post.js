import { addPost } from '../firebase/firestore.js';

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
    }
  });
  return container;
};

export const createPost = () => {
  const container = document.createElement('section');
  container.classList.add('createPostContainer');
  const element = document.createElement('section');
  element.classList.add('createPostSection');
  element.innerHTML = `
    <form id="login" class="postForm">
      <label class="createPostSection">Crear publicación</label>
      <img class="userPhoto" src=""/>
      <label class="userName">Firulais</label>
      <label>Amigos
        <i class="ai-people-multiple"></i>
        <i class="ai-toggle-off"></i>
        <i class="ai-globe"></i>
        Público
      </label>
      <input id="inputPost" placeholder="¿Qué está haciendo tu mascota?"/>
      <span class="characters">0/300 caracteres</span>
      <input id="inputUbication"placeholder="Ubicación"/>
      <input id="inputNamePet" placeholder="Nombre de mascota"/>
      <input type="file" id="photoButton" class="formButton"><i class="ai-image"></i></input>
      <button id="postButton" class="formButton">Publlicar</button>
    </form>
  `;
  container.appendChild(element);
  savePost(container);
  return container;
};

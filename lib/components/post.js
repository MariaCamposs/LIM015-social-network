import { addPost, getUserWithOnSnapshot } from '../firebase/firestore.js';
import { onAuthStateChanged } from '../firebase/functions.js';
import { imagesProfileRef, putImageFile, getPhotoURL } from '../firebase/storage.js';

const userState = () => {
  onAuthStateChanged((user) => {
    if (user === null || user === undefined || !user.emailVerified) window.location.hash = '#/login';
  });
};

const savePost = (container) => {
  const petsUser = JSON.parse(localStorage.getItem('user'));
  const displayName = petsUser.name;
  const uid = petsUser.uid;
  const photoURL = petsUser.photoURL;
  console.log(displayName);
  // --------------
  const btnPost = container.querySelector('#postButton');
  btnPost.addEventListener('click', async (event) => {
    event.preventDefault();
    const post = container.querySelector('.inputPost').value;
    const ubication = container.querySelector('#inputUbication').value;
    const namePet = container.querySelector('#inputNamePet').value;
    const photoPost = container.querySelector('#photoButton').files[0];
    if (post === '') console.log('Publicacion vacia');
    if (photoPost) {
      // se crea post con imagen
      putImageFile(photoPost)
        .then(() => getPhotoURL(imagesProfileRef(photoPost.name).fullPath))
        .then((imageURL) => addPost(uid, displayName, photoURL, post, ubication, namePet, imageURL))
        .then(() => {
          console.log('imagen cargada ok');
          window.location.hash = '#/home/profile';
        });
    } else {
      // se crea post sin imagen
      addPost(uid, displayName, photoURL, post, ubication, namePet, '');
      window.location.hash = '#/home/profile';
    }
  });
  return container;
};

const userDocDataInRealTime = (callback) => {
  const user = JSON.parse(localStorage.getItem('user'));
  getUserWithOnSnapshot(user.uid, (doc) => {
    const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
    // console.log(source);
    localStorage.setItem('user', JSON.stringify({ ...user, ...doc.data() }));
    callback(doc.data());
  });
};

export const createPost = () => {
  userState();
  const container = document.createElement('section');
  container.classList.add('createPostContainer');
  const element = document.createElement('section');
  element.classList.add('createPostSection');
  userDocDataInRealTime((docData) => {
    element.innerHTML = `
    <form id="login" class="postForm">
      <div class= "first-section-form">
      <label class="createPostSection">Crear publicación</label>
      <img class="photoProfile-post" src="${(docData.photoURL || './assets/img/perrito.jpg')}"/>
      <label class="userName">${(docData.name || '')}</label>
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
    container.appendChild(element);
    const post = container.querySelector('#post');
    const count = container.querySelector('#count');
    savePost(container);
    post.addEventListener('input', (e) => {
      const target = e.target;
      const longitudMax = target.getAttribute('maxlength');
      const longitudAct = target.value.length;
      count.innerHTML = `${longitudAct}/${longitudMax}`;
    });
  });
  return container;
};

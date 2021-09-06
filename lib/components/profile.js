/* eslint-disable max-len */
import { onAuthStateChanged, signOut } from '../firebase/functions.js';
import {
  addUserInFirestore, updateDocDatainFirestore, getUser, getUserWithOnSnapshot,
} from '../firebase/firestore.js';
import { imagesProfileRef, putImageFile } from '../firebase/storage.js';
import { mobileFooter } from './footer.js';

const userState = () => {
  onAuthStateChanged((user) => {
    if ((user === null || user === undefined)) window.location.hash = '#/login';
  });
};

const logOut = (container) => {
  container.querySelector('#close').addEventListener('click', () => {
    signOut();
    window.location.hash = '#/login';
    window.localStorage.removeItem('user');
  });
};

const initialAddUserInFirestore = () => {
// se coloca el uid como docRef para crear cada documento en users
  onAuthStateChanged(({ uid, displayName, email }) => {
    getUser(uid)
      .then((doc) => {
        if (!doc.exists) { // si el doc no existe se crea uno
          addUserInFirestore(uid, { uid, name: displayName, email })
            .then(() => {
              console.log('Document successfully written!');
            })
            .catch((error) => {
              console.error('Error writing document: ', error);
            });
        } else { // si el documento existe se muestra la data
          // console.log('Document data:', doc.data());
        }
      });
  });
};

const putImageInFirebaseStorage = (photoFile) => {
  // se nombra la carpeta en storage con el uid del usuario
  const imageProfileRef = imagesProfileRef(photoFile.name);
  putImageFile(photoFile)
    .then(() => console.log('Uploaded a blob or file!'))
    .catch((err) => console.log(err));
  return imageProfileRef;
};

const updateDataUser = (userNameInput, photoFileInput, petNameInput, descriptionInput, breedInput, locationInput, updateProfile) => {
  const user = JSON.parse(window.localStorage.getItem('user'));
  updateProfile.addEventListener('click', (e) => {
    e.preventDefault();
    let imageUrl;
    if (photoFileInput.files[0]) {
      imageUrl = putImageInFirebaseStorage(photoFileInput.files[0]).fullPath;
    } else {
      imageUrl = null;
    }
    // se actualiza el nombre de usuario en la autenticación
    onAuthStateChanged((currentUser) => {
      currentUser.updateProfile({
        photoURL: imageUrl,
        displayName: userNameInput.value,
      });
      // localStorage.setItem('user', JSON.stringify(currentUser));
    });
    // se actualiza los datos del doc  en la colección users
    const docData = {
      name: userNameInput.value,
      photoURL: imageUrl,
      petName: petNameInput.value,
      breed: breedInput.value,
      profileDescription: descriptionInput.value,
      location: locationInput.value,
    };
    updateDocDatainFirestore(user.uid, docData)
      .then(() => console.log('Document successfully updated!'))
      .catch((error) => console.error('Error updating document: ', error));
  });
};
const updateDataLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  getUserWithOnSnapshot(user.uid, (doc) => {
    const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
    localStorage.setItem('user', JSON.stringify({ ...user, ...doc.data() }));
    console.log(source, ' data: ', doc.data());
  });
};

export const editProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const fragment = document.createDocumentFragment();
  const section = document.createElement('section');
  section.classList.add('editProfile');
  section.innerHTML = `
      <form id="profileForm">
        <section class="headerForm">
          <img id="headerPhoto" src="./assets/img/avatar.svg">
          <label class="titleForm">
            <span>${user.name}</span>
          </label>
        </section>
        <label class="profileLabel"> Correo electrónico
          <span>${user.email}</span>
        </label>
        <label class="profileLabel"> Nombre de usuario
          <input class="inputs" id="profileUserName" value="${user.name}"/>
        </label>
        <section class="petData">
          <label class="profileLabel"> Editar foto de perfil
            <input class="inputs" id="photoFile" type="file" name="photo"/>
          </label>
          <h2>Información de tu mascota</h2>
          <label class="profileLabel"> Nombre de mascota
            <input class="inputs" id="petName" value="${user.petName}"/>
          </label>
          <label class="profileLabel"> Presentación de Mascota
            <textarea class="inputs" id="description" name="Presentación de Mascota" rows="4" cols="50" maxlength="350" value="${user.profileDescription}"></textarea>
          </label>
          <label class="profileLabel"> Raza
            <input class="inputs" id="breed" value="${user.breed}"/>
          </label>
          <label class="profileLabel"> Ubicación
            <input class="inputs" id="location" value="${user.location}">
          </label>
        </section>
        <button id="updateProfile">Actualizar Perfil</button>
      </form>`;
  fragment.appendChild(section);
  section.appendChild(mobileFooter());
  const [userNameInput, photoFileInput, petNameInput, descriptionInput, breedInput, locationInput] = section.querySelectorAll('.inputs');
  const updateProfile = section.querySelector('#updateProfile');
  updateDataUser(userNameInput, photoFileInput, petNameInput, descriptionInput, breedInput, locationInput, updateProfile);
  updateDataLocalStorage();
  return fragment;
};

export const profile = () => {
  updateDataLocalStorage();
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  userState();
  const fragment = document.createDocumentFragment();
  const section = document.createElement('section');
  section.classList.add('profile');
  section.innerHTML = `
        <section class="headerProfile">
        <img id="mainImgProfile" class="mainImgProfile" src="./assets/img/mainImgProfile.png">
        <a id="toEditProfile" href="#/editprofile"><img class="icon pen" src="./assets/img/pen.svg" alt="pen icon"/></i></a>
        <a><img id="close" class="icon signOut" src="./assets/img/signout.svg" alt="signout icon"/></i></a>
        <img id="circleImgProfile" class="circleImgProfile" src="./assets/img/avatar.svg">
        </section>
        <section class="profileDscription">
            <h2 id="nameProfile"></h2>
            <label>
                <span id="numberFollowers" class="profileNumbers"></span><span class="textProfile">Seguidores</span>
                <span id="numberFollowing" class="profileNumbers"></span><span class="textProfile">Siguiendo</span>
            </label>
            <p id="profileDescription" class="textProfile">${user.profileDescription}</p>
            <span class="textProfile">Sigue mis aventuras en este perfil</span>
            <span id="profileUbication" class="textProfile"></span>
        </section>
        
        <section id="mainProfile" class="mainProfile">
        </section>`;
  fragment.appendChild(section);
  section.appendChild(mobileFooter());
  initialAddUserInFirestore();
  logOut(section);
  return fragment;
};

import { onAuthStateChanged, signOut } from '../firebase/functions.js';
import {
  updateDocDatainFirestore, getUserWithOnSnapshot, getPostsWithOnSnapshot,
  getUser, addUserInFirestore,
} from '../firebase/firestore.js';
import { imagesProfileRef, putImageFile, getPhotoURL } from '../firebase/storage.js';
import { dataUploadedModal } from './modal.js';
import {
  templatePost, addViewPost, likePost, addMoreActions,
} from './post.js';

const initialAddUserInFirestore = () => { // se crea por primera el documento, colección users;
  onAuthStateChanged((user) => {
    getUser(user.uid)
      .then((doc) => {
        if (!doc.exists) { // si el doc no existe se crea uno
          addUserInFirestore(user.uid, { // se coloca el uid como docRef para crear cada doc user
            uid: user.uid, name: user.displayName, email: user.email, photoURL: (user.photoURL ? user.photoURL : ''), coverPhotoURL: '',
          });
        }
      });
  });
};

const logOut = (container) => {
  container.querySelector('#close').addEventListener('click', () => {
    signOut();
    window.location.hash = '#/login';
    window.localStorage.removeItem('user');
  });
};

const putImageInFirebaseStorage = (photoFile, key, section) => {
  const user = firebase.auth().currentUser;
  putImageFile(photoFile)
    .then(() => getPhotoURL(imagesProfileRef(photoFile.name).fullPath))
    .then((imageURL) => {
      // se actualiza photoURL del usuario en la autenticación
      user.updateProfile({ photoURL: imageURL });
      updateDocDatainFirestore(user.uid, { [key]: imageURL });
    })
    .then(() => section.appendChild(dataUploadedModal()))
    .catch((err) => console.log(err));
};

const updateDataUser = (nameI, photoFileI, coverPhotoI, petNameI, descriptionI,
  breedI, locationI, profileForm, section) => {
  const user = firebase.auth().currentUser;
  profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // sólo si existe una nueva imagen en el formulario
    if (photoFileI.files[0]) putImageInFirebaseStorage(photoFileI.files[0], 'photoURL', section);
    if (coverPhotoI.files[0]) putImageInFirebaseStorage(coverPhotoI.files[0], 'coverPhotoURL', section);
    // se actualiza el nombre de usuario en la autenticación
    user.updateProfile({ displayName: nameI.value });
    const docData = {
      name: nameI.value,
      petName: petNameI.value,
      breed: breedI.value,
      profileDescription: descriptionI.value,
      location: locationI.value,
    };
    updateDocDatainFirestore(user.uid, docData) // se actualiza los datos doc, colección users
      .then(() => section.appendChild(dataUploadedModal()))
      .catch((error) => console.error('Error updating document: ', error));
  });
};

const userDocDataInRealTime = (callback) => {
  const user = JSON.parse(localStorage.getItem('user'));
  getUserWithOnSnapshot(user.uid, (doc) => {
    const userLocaleStorage = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem('user', JSON.stringify({ ...userLocaleStorage, ...doc.data() }));
    callback(doc.data());
  });
};

export const editProfile = () => {
  initialAddUserInFirestore();
  const fragment = document.createDocumentFragment();
  const section = document.createElement('section');
  section.classList.add('editProfile');
  userDocDataInRealTime((docData) => {
    section.innerHTML = `
    <form id="profileForm" class="profileForm">
      <section class="formProfileBox">
        <div class="photoSection cover">
          <div class="coverPhotoContent" ><img class="photo" src="${(docData.coverPhotoURL || './assets/img/backgroung-mobile.svg')}"></div>
          <label class="profileLabel textPhoto"> Foto de portada</label>
        </div>
      </section>
      <secttion class="formProfileBox">  
        <div class="photoSection">
        <div class="circle profilePhoto"><img id="photo" src="${(docData.photoURL || './assets/img/perrito.jpg')}"></div>
        <label class="profileLabel textPhoto"> Foto de perfil
        <span class="spanProfile">${(docData.name || '')}</span></label>
        </div>
      </secttion>  
      <section class="formProfileBox">
        <label class="profileLabel"> Correo electrónico
          <span class="spanProfile" >${docData.email}</span>
        </label>
      </section>
      <section class="formProfileBox">
        <label class="profileLabel"> Nombre de usuario
          <input class="formBox inputProfile inputs" id="profileUserName" value="${(docData.name || '')}"/>
        </label>
      </section>
      <section class="formProfileBox">
        <h2>Información de tu mascota</h2>
      </section>
      <section class="formProfileBox">
        <label class="profileLabel"> Cambiar foto de perfil
            <input class="inputProfilePhoto inputs" id="photoFile" type="file" name="photo"/>
        </label>
      </section>
      <section class="formProfileBox">
        <label class="profileLabel"> Cambiar foto de portada
          <input class="inputProfilePhoto inputs" id="coverPhoto" type="file" name="photo"/>
        </label>
      </section>
      <section class="formProfileBox">
        <label class="profileLabel" for="petName"> Nombre de mascota
          <input class="formBox inputProfile inputs" id="petName" value="${(docData.petName || '')}" placeholder="Firulais"/>
        </label>
      </section>
      <section class="formProfileBox">
        <label class="profileLabel"> Presentación de Mascota
          <textarea class="formBox inputProfile textArea inputs" id="description" name="Presentación de Mascota" rows="4" maxlength="300" placeholder="Hola bienvenidxs a mi perfil....">${(docData.profileDescription || '')}</textarea>
        </label>
      </section>
      <section class="formProfileBox">
        <label class="profileLabel"> Raza
          <input class="formBox inputProfile inputs" id="breed" value="${(docData.breed || '')}" placeholder="Mestizx"/>
        </label>
      </section>
      <section class="formProfileBox">
        <label class="profileLabel"> Ubicación
          <input class="formBox inputProfile inputs" id="location" value="${(docData.location || '')}" placeholder="Ciudad, País">
        </label>
      </section>
      <section class="formProfileBox buttonProfile">
      <button class="formButton"id="updateProfile">Editar Perfil</button>
      </section>
    </form>`;
    const [nameI, photoFileI, coverPhotoI, petNameI, descriptionI, breedI, locationI] = section.querySelectorAll('.inputs');
    const profileForm = section.querySelector('#profileForm');
    updateDataUser(nameI, photoFileI, coverPhotoI, petNameI,
      descriptionI, breedI, locationI, profileForm, section);
  });
  fragment.appendChild(section);
  return fragment;
};

const postsDocDataInRealTime = () => {
  const user = firebase.auth().currentUser;
  const posts = document.createElement('section');
  posts.classList.add('posts');
  posts.classList.add('profilePosts');
  getPostsWithOnSnapshot(user.uid, (querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        posts.appendChild(addViewPost(change.doc.id, change.doc.data(), user));
        likePost(change.doc.id, change.doc.data(), user);
        if (user.uid === change.doc.data().uid) {
          addMoreActions(change.doc.id, change.doc.data());
        }
      }
      if (change.type === 'modified') {
        const idPost = document.getElementById(change.doc.id);
        idPost.innerHTML = templatePost(user, change.doc.data());
        likePost(change.doc.id, change.doc.data(), user);
        if (user.uid === change.doc.data().uid) {
          addMoreActions(change.doc.id, change.doc.data());
        }
      }
      if (change.type === 'removed') {
        document.getElementById(change.doc.id).remove();
      }
    });
  });
  return posts;
};

export const profile = () => {
  const fragment = document.createDocumentFragment();
  const section = document.createElement('section');
  section.classList.add('profile');
  userDocDataInRealTime((docData) => {
    section.innerHTML = `
      <section class="header">
        <section class="headerProfile">
        <img id="mainImgProfile" class="mainImgProfile" src=${(docData.coverPhotoURL || './assets/img/backgroung-mobile.svg')}>
        <a id="toEditProfile" href="#/home/profile/editprofile"><img class="icon pen" src="./assets/img/pen.svg" alt="pen icon"/></i></a>
        <a><img id="close" class="icon signOut" src="./assets/img/signout.svg" alt="signout icon"/></i></a>
        <div class="circleContent"><div class="circle"><img id="circleImgProfile" src="${(docData.photoURL || './assets/img/perrito.jpg')}"></div>
        </div>
        <h1 class="petNameDesktop">${(docData.name || '')}</h1>
        </section>
        <section class="profileDescription">
            <h1 class="petNameMobile profileDescriptionBox" id="petName">${(docData.petName || '')}</h1>
            <label class="followSection profileDescriptionBox">
                <span id="numberFollowers" class="profileNumbers">100</span><span class="textProfile">Seguidores</span>
                <span id="numberFollowing" class="profileNumbers">120</span><span class="textProfile">Siguiendo</span>
            </label>
            <p id="profileDescription" class="textProfile profileDescriptionBox">${(docData.profileDescription || '')}</p>
            <span class="textProfile profileDescriptionBox">Sigue mis aventuras en este perfil</span>
            <p id="profileUbication" class="textProfile">${(docData.location || '')}</p>
            <a href="#/home/profile/editprofile" class="formButton">Editar Perfil</a>
        </section>
      </section>
        <section id="mainProfile" class="mainProfile">
      </section>`;
    logOut(section);
    section.querySelector('#mainProfile').appendChild(postsDocDataInRealTime());
  });
  fragment.appendChild(section);
  return fragment;
};
